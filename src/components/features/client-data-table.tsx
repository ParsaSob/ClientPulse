"use client";

import { type Client } from "@/lib/types";
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
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientDataTableProps {
  clients: Client[];
  isLoading: boolean;
}

export function ClientDataTable({ clients, isLoading }: ClientDataTableProps) {
    const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <TableRow key={`skeleton-client-${index}`}>
        <TableCell><Skeleton className="h-4 w-16 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-8 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24 rounded" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-4 w-12 rounded" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-4 w-12 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32 rounded" /></TableCell>
      </TableRow>
    ));
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6" />
          <CardTitle className="font-headline">Client Data</CardTitle>
        </div>
        <CardDescription>
          Comprehensive overview of your clients' profiles and activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client ID</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Last Signed In</TableHead>
                <TableHead className="text-right">Workouts</TableHead>
                <TableHead className="text-right">Cardio</TableHead>
                <TableHead>Nutrition Compliance</TableHead>
                <TableHead>Exercise Compliance (prev 2 wks)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && clients.length === 0 ? (
                    renderSkeletons()
                ) : clients.length > 0 ? (
                    clients.map((client) => (
                    <TableRow key={client.clientId}>
                        <TableCell className="font-medium font-code">{client.clientId}</TableCell>
                        <TableCell>{client.age}</TableCell>
                        <TableCell>{client.addedOn}</TableCell>
                        <TableCell>{client.lastSignedIn}</TableCell>
                        <TableCell className="text-right">{client.workoutsCompleted}</TableCell>
                        <TableCell className="text-right">{client.totalCardioActivities}</TableCell>
                        <TableCell>
                        <div>{client.nutritionCompliance.percentage}%</div>
                        <div className="text-xs text-muted-foreground">{client.nutritionCompliance.details}</div>
                        </TableCell>
                        <TableCell>
                        <div>
                            {client.exerciseCompliance.twoWeeksAgo}% → {client.exerciseCompliance.oneWeekAgo}% → {client.exerciseCompliance.thisWeek}%
                        </div>
                        <div className="text-xs text-muted-foreground">2 wks ago → 1 wk ago → This wk</div>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                     <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                            No client data. Submit your credentials and click "Refresh Data".
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
