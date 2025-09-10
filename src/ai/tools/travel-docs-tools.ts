'use server';
/**
 * @fileOverview Tool for fetching travel document information from MongoDB.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMongoDocsForCountry } from '@/services/mongodb';

// A more flexible schema that can handle any data returned from MongoDB.
const TravelDocToolOutputSchema = z.any().describe("The complete travel document information for a country from the database.");


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
                console.log(`No document found for country: ${input.country}`);
                return null; // Return null if no document is found
            }
            console.log(`Successfully found document for ${input.country} in MongoDB.`);
            // Return the entire document so the AI has all the information.
            return docs;
        } catch (error) {
            console.error(`Error fetching docs from MongoDB for ${input.country}:`, error);
            // Return null to let the AI know the tool failed
            return null;
        }
    }
);
