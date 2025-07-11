
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RefreshCw, Zap } from "lucide-react";
import { type Client, type ClientRiskInsight, type Credentials } from "@/lib/types";
import { predictClientRisk } from "@/ai/flows/predict-client-risk";
import { generatePersonalizedInsights } from "@/ai/flows/generate-personalized-insights";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ConfigPanel, credentialsSchema, apiSchema } from "@/components/features/config-panel";
import { ClientDataTable } from "@/components/features/client-data-table";
import { RiskInsightTable } from "@/components/features/risk-insight-table";
import { fetchClients } from "@/services/client-data-service";
import { cn } from "@/lib/utils";
import { initialClients } from "@/lib/mock-data";

export default function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [insights, setInsights] = useState<ClientRiskInsight[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  const credentialsForm = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      domain: "",
      email: "",
      password: "",
    },
  });

  const apiForm = useForm<z.infer<typeof apiSchema>>({
    resolver: zodResolver(apiSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const generateInsightsForClients = async (clientsToProcess: Client[]) => {
    if (clientsToProcess.length === 0) {
      setInsights([]);
      return;
    }

    try {
      const riskPredictions = await Promise.allSettled(
        clientsToProcess.map((client) =>
          predictClientRisk({
            clientId: client.clientId,
            workoutsCompleted: client.workoutsCompleted,
            exerciseCompliance: client.exerciseCompliance.thisWeek,
            nutritionCompliance: client.nutritionCompliance.percentage,
          })
        )
      );

      const successfulPredictions = riskPredictions
        .filter((result): result is PromiseFulfilledResult<{ clientId: string; riskStatus: 'dropout' | 'committed' }> => {
          if (result.status === 'rejected') {
            console.error("AI risk prediction failed for a client:", result.reason);
            return false;
          }
          return true;
        })
        .map((result) => result.value);
        
      const insightPromises = successfulPredictions.map(async (prediction) => {
        const client = clientsToProcess.find(c => c.clientId === prediction.clientId);
        if (!client) return null;

        const insightResult = await generatePersonalizedInsights({
          ...prediction,
          workoutsCompleted: client.workoutsCompleted,
          exerciseCompliance: client.exerciseCompliance.thisWeek,
          nutritionCompliance: client.nutritionCompliance.percentage,
        });

        return {
            ...prediction,
            insight: insightResult.insight,
        };
      });

      const settledInsights = await Promise.allSettled(insightPromises);

      const newInsights: ClientRiskInsight[] = settledInsights
        .filter((result): result is PromiseFulfilledResult<ClientRiskInsight | null> => {
            if (result.status === 'rejected') {
                console.error("AI insight generation failed for a client:", result.reason);
                return false;
            }
            return result.value !== null;
        })
        .map((result) => result.value!);
      
      setInsights(newInsights);

    } catch (error) {
      console.error("Failed to generate AI insights:", error);
      toast({
        title: "AI Error",
        description: "Could not generate AI insights.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    const processInitialData = async () => {
      setIsInitialLoading(true);
      await generateInsightsForClients(initialClients);
      setIsInitialLoading(false);
    }
    processInitialData();
  }, [])


  const handleRefresh = async (creds: Credentials) => {
    if (!creds.apiKey && (!creds.domain || !creds.email || !creds.password)) {
      toast({
        title: "Configuration Needed",
        description: "Please provide your credentials or API key before refreshing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setClients([]);
    setInsights(null); 
    const { dismiss } = toast({
      title: "Refreshing Data...",
      description: "Fetching client data. This may take a moment.",
    });

    try {
      const fetchedClients = await fetchClients(creds);
      setClients(fetchedClients);
      
      if (fetchedClients.length === 0) {
        dismiss(); // Dismiss the "fetching" toast
        toast({
          title: "No Clients Found",
          description: "Could not fetch client data. Please check your credentials and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      const { dismiss: dismissAIToast } = toast({
        title: "Generating AI Insights...",
        description: "This may take a few minutes for a large number of clients.",
      });
      
      await generateInsightsForClients(fetchedClients);

      dismiss();
      dismissAIToast();

      toast({
        title: "Success!",
        description: "Client data and AI insights have been refreshed.",
        variant: 'default'
      });

    } catch (error) {
      console.error("Failed to refresh data:", error);
      dismiss(); // Dismiss the "fetching" toast
      toast({
        title: "Error",
        description: "Could not refresh client data. Please check your credentials and try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRefreshClick = () => {
    // Combine values from both forms. The fetch logic will decide which to use.
    const combinedCreds = {
      ...credentialsForm.getValues(),
      ...apiForm.getValues(),
    };
    handleRefresh(combinedCreds);
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
        <Button onClick={onRefreshClick} disabled={isLoading}>
          <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <ConfigPanel credentialsForm={credentialsForm} apiForm={apiForm} />
        </div>
        <div className="lg:col-span-2 space-y-8">
            <ClientDataTable clients={clients} isLoading={isLoading} />
            <RiskInsightTable insights={insights} isLoading={isLoading || isInitialLoading} />
        </div>
      </div>
    </div>
  );
}
