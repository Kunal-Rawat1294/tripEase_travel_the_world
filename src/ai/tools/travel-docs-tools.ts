'use server';
/**
 * @fileOverview Tool for fetching travel document information from MongoDB.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMongoDocsForCountry } from '@/services/mongodb';

const TravelDocToolOutputSchema = z.object({
    passport_requirements: z.any().describe("Passport requirements details."),
    visa_information: z.any().describe("Visa information details."),
    health_and_vaccinations: z.any().describe("Health and vaccination details."),
}).optional();

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
                return undefined;
            }
            // Return a subset of the data relevant to the prompt
            return {
                passport_requirements: docs.passport_requirements,
                visa_information: docs.visa_information,
                health_and_vaccinations: docs.health_and_vaccinations,
            };
        } catch (error) {
            console.error(`Error fetching docs from MongoDB for ${input.country}:`, error);
            // Return undefined or an empty object to let the AI know the tool failed
            return undefined;
        }
    }
);
