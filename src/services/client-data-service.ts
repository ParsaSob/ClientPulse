// src/services/client-data-service.ts
'use server';

import { initialClients } from '@/lib/mock-data';
import { type Client, type Credentials } from '@/lib/types';

/**
 * Simulates fetching client data from an external API (e.g., Trainerize).
 * In a real application, this function would make an HTTP request.
 * For now, it returns mock data if the credentials are "valid".
 *
 * @param credentials The user's credentials for the service.
 * @returns A promise that resolves to an array of clients.
 */
export async function fetchClients(credentials: Credentials): Promise<Client[]> {
  console.log('Fetching clients with credentials:', credentials);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a check to see if credentials are provided and seem valid.
  // In a real app, you'd send these to the API for authentication.
  const areEmailCredsValid =
    credentials.domain &&
    credentials.email === 'you@example.com' &&
    credentials.password === 'password123';
    
  const isApiCredValid = credentials.apiKey === 'tr-api-12345';

  if (areEmailCredsValid || isApiCredValid) {
    console.log('Authentication successful, returning mock data.');
    // Return a copy of the mock data to prevent mutation
    return JSON.parse(JSON.stringify(initialClients));
  } else {
    console.log('Authentication failed.');
    // Return an empty array if authentication fails
    return [];
  }
}