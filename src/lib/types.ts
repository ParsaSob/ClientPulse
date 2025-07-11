export interface Client {
  clientId: string;
  age: number;
  dob: string;
  height: string;
  addedOn: string;
  lastSignedIn: string;
  workoutsCompleted: number;
  totalCardioActivities: number;
  nutritionCompliance: {
    percentage: number;
    details: string;
  };
  exerciseCompliance: {
    twoWeeksAgo: number;
    oneWeekAgo: number;
    thisWeek: number;
  };
}

export interface ClientRiskInsight {
  clientId: string;
  riskStatus: 'dropout' | 'committed';
  insight: string;
}

export interface Credentials {
    domain?: string;
    email?: string;
    password?: string;
    apiKey?: string;
}