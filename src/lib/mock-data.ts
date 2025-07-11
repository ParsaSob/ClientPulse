import { type Client } from './types';

export const initialClients: Client[] = [
  {
    clientId: 'C001',
    age: 28,
    addedOn: '2023-01-10',
    lastSignedIn: '2024-07-20',
    workoutsCompleted: 52,
    totalCardioActivities: 30,
    nutritionCompliance: {
      percentage: 85,
      details: '2200 Cal, P 35%, C 40%, F 25%',
    },
    exerciseCompliance: {
      twoWeeksAgo: 100,
      oneWeekAgo: 100,
      thisWeek: 75,
    },
  },
  {
    clientId: 'C002',
    age: 45,
    addedOn: '2022-11-20',
    lastSignedIn: '2024-07-21',
    workoutsCompleted: 150,
    totalCardioActivities: 120,
    nutritionCompliance: {
      percentage: 95,
      details: '2000 Cal, P 30%, C 40%, F 30%',
    },
    exerciseCompliance: {
      twoWeeksAgo: 100,
      oneWeekAgo: 100,
      thisWeek: 100,
    },
  },
  {
    clientId: 'C003',
    age: 22,
    addedOn: '2024-05-01',
    lastSignedIn: '2024-06-10',
    workoutsCompleted: 0,
    totalCardioActivities: 1,
    nutritionCompliance: {
      percentage: 14,
      details: '1500 Cal, P 20%, C 50%, F 30%',
    },
    exerciseCompliance: {
      twoWeeksAgo: 25,
      oneWeekAgo: 0,
      thisWeek: 0,
    },
  },
  {
    clientId: 'C004',
    age: 34,
    addedOn: '2023-09-15',
    lastSignedIn: '2024-07-18',
    workoutsCompleted: 25,
    totalCardioActivities: 15,
    nutritionCompliance: {
      percentage: 60,
      details: '1800 Cal, P 30%, C 45%, F 25%',
    },
    exerciseCompliance: {
      twoWeeksAgo: 75,
      oneWeekAgo: 50,
      thisWeek: 50,
    },
  },
];
