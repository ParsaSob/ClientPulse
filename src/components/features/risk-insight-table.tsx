"use client";

import { type ClientRiskInsight } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

interface RiskInsightTableProps {
  insights: ClientRiskInsight[] | null;
  isLoading: boolean;
}

export function RiskInsightTable({ insights, isLoading }: RiskInsightTableProps) {
  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell>
          <Skeleton className="h-4 w-16 rounded" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-24 rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 mt-2 rounded" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <CardTitle className="font-headline">AI Risk & Insight Analysis</CardTitle>
        </div>
        <CardDescription>
          AI-powered predictions on client dropout risk and personalized insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Client ID</TableHead>
                <TableHead className="w-[150px]">Risk Status</TableHead>
                <TableHead>Insight</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    renderSkeletons()
                ) : insights && insights.length > 0 ? (
                    insights.map((insight) => (
                        <TableRow key={insight.clientId}>
                            <TableCell className="font-medium font-code">{insight.clientId}</TableCell>
                            <TableCell>
                                <Badge
                                    className={cn(
                                    "capitalize text-white shadow",
                                    insight.riskStatus === 'dropout'
                                        ? "bg-destructive hover:bg-destructive/90"
                                        : "bg-green-500 hover:bg-green-500/90"
                                    )}
                                >
                                    {insight.riskStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{insight.insight}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            No insights generated yet. Click "Refresh Data" to begin.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
