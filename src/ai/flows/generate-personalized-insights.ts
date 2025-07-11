// src/ai/flows/generate-personalized-insights.ts
'use server';

/**
 * @fileOverview Generates personalized motivational insights for clients based on their activity and compliance data.
 *
 * - generatePersonalizedInsights - A function that generates personalized insights for a client.
 * - PersonalizedInsightsInput - The input type for the generatePersonalizedInsights function.
 * - PersonalizedInsightsOutput - The return type for the generatePersonalizedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInsightsInputSchema = z.object({
  clientId: z.string().describe('The ID of the client.'),
  workoutsCompleted: z.number().describe('The number of workouts completed by the client.'),
  exerciseCompliance: z
    .number()
    .describe('The exercise compliance percentage of the client.'),
  nutritionCompliance:
    z.number().describe('The nutrition compliance percentage of the client.'),
  riskStatus: z
    .string()
    .describe(
      "The client's risk status, predicted as 'dropout' or 'committed'."
    ),
});
export type PersonalizedInsightsInput = z.infer<typeof PersonalizedInsightsInputSchema>;

const PersonalizedInsightsOutputSchema = z.object({
  insight: z.string().describe('A personalized motivational message for the client.'),
});
export type PersonalizedInsightsOutput = z.infer<typeof PersonalizedInsightsOutputSchema>;

export async function generatePersonalizedInsights(
  input: PersonalizedInsightsInput
): Promise<PersonalizedInsightsOutput> {
  return generatePersonalizedInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedInsightsPrompt',
  input: {schema: PersonalizedInsightsInputSchema},
  output: {schema: PersonalizedInsightsOutputSchema},
  prompt: `You are an AI assistant for a fitness trainer, tasked with generating personalized motivational insights for clients.

  Based on the client's data, provide a concise and encouraging message to help them stay motivated and engaged with their fitness plan.
  Tailor the message to their specific situation, highlighting their successes and addressing areas where they can improve.

  Client ID: {{clientId}}
  Workouts Completed: {{workoutsCompleted}}
  Exercise Compliance: {{exerciseCompliance}}%
  Nutrition Compliance: {{nutritionCompliance}}%
  Risk Status: {{riskStatus}}

  Insight:`,
});

const generatePersonalizedInsightsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedInsightsFlow',
    inputSchema: PersonalizedInsightsInputSchema,
    outputSchema: PersonalizedInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
