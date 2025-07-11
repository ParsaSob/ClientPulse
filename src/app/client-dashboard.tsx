"use client";

import { useState } from "react";
import { RefreshCw, Zap } from "lucide-react";
import { initialClients } from "@/lib/mock-data";
import { type Client, type ClientRiskInsight } from "@/lib/types";
import { predictClientRisk } from "@/ai/flows/predict-client-risk";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ConfigPanel } from "@/components/features/config-panel";
import { ClientDataTable } from "@/components/features/client-data-table";
import { RiskInsightTable } from "@/components/features/risk-insight-table";

export default function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [insights, setInsights] = useState<ClientRiskInsight[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsLoading(true);
    toast({
      title: "Refreshing Data...",
      description: "Fetching client data and generating AI insights. This may take a few minutes.",
    });

    try {
      const insightPromises = clients.map((client) =>
        predictClientRisk({
          clientId: client.clientId,
          workoutsCompleted: client.workoutsCompleted,
          exerciseCompliance: client.exerciseCompliance.thisWeek,
          nutritionCompliance: client.nutritionCompliance.percentage,
        })
      );

      const settledInsights = await Promise.allSettled(insightPromises);

      const newInsights: ClientRiskInsight[] = settledInsights
        .filter((result): result is PromiseFulfilledResult<ClientRiskInsight> => {
            if (result.status === 'rejected') {
                console.error("AI insight generation failed for a client:", result.reason);
                return false;
            }
            return true;
        })
        .map((result) => result.value);

      setInsights(newInsights);
      toast({
        title: "Success!",
        description: "Client data and AI insights have been refreshed.",
        variant: 'default'
      });

    } catch (error) {
      console.error("Failed to refresh data:", error);
      toast({
        title: "Error",
        description: "Could not refresh client data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-foreground">
                ClientPulse
            </h1>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <ConfigPanel />
        </div>
        <div className="lg:col-span-2 space-y-8">
            <ClientDataTable clients={clients} />
            <RiskInsightTable insights={insights} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: (string | boolean | undefined)[]) {
    return inputs.filter(Boolean).join(' ')
}
