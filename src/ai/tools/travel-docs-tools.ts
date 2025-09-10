'use server';
/**
 * @fileOverview Tool for fetching travel document information from MongoDB.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMongoDocsForCountry } from '@/services/mongodb';

// A more flexible schema that can handle any data returned from MongoDB.
const TravelDocToolOutputSchema = z.string().describe("A JSON string containing the complete travel document information for a country from the database.");


export const getTravelDocsFromMongoTool = ai.defineTool(
    {
        name: 'getTravelDocsFromMongoTool',
        description: 'Retrieves travel document, visa, and health requirements for a country from the internal MongoDB database.',
        inputSchema: z.object({
            country: z.string().describe("The destination country."),
        }),
        outputSchema: TravelDocToolOutputSchema,
    },
    async (input) => {
        try {
            const docs = await getMongoDocsForCountry(input.country);
            if (!docs) {
                console.log(`[Tool] No document found for country: ${input.country}`);
                return JSON.stringify({ error: "No document found in the database." });
            }
            // Remove the complex _id object before stringifying
            const { _id, ...rest } = docs;
            const response = JSON.stringify(rest);
            console.log(`[Tool] Successfully found document for ${input.country} and returning as JSON string.`);
            return response;
        } catch (error: any) {
            console.error(`[Tool] Error fetching docs from MongoDB for ${input.country}:`, error);
            return JSON.stringify({ error: "Failed to fetch data from the database.", details: error.message });
        }
    }
);
