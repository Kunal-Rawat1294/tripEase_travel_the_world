'use server';
/**
 * @fileOverview Tools for fetching real-time travel document and visa information.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getSherpaData } from '@/services/sherpa';
import { getTravelDocData } from '@/services/traveldoc';

const SherpaDataSchema = z.object({
    passportValidity: z.string().describe("Required passport validity period."),
    blankPages: z.string().describe("Number of blank passport pages required."),
    visaFreeEntry: z.string().describe("Details on visa-free entry."),
    eVisa: z.string().describe("Information on e-Visa availability."),
    visaOnArrival: z.string().describe("Information on Visa on Arrival."),
    embassyUrl: z.string().url().describe("Official embassy or immigration website URL."),
});

const TravelDocDataSchema = z.object({
    customsDeclaration: z.string().describe("Details about customs declaration forms."),
    healthCertificates: z.string().describe("Required health certificates."),
    specialPermits: z.string().describe("Any special permits needed for restricted zones."),
});

export const getSherpaDataTool = ai.defineTool(
    {
        name: 'getSherpaDataTool',
        description: 'Retrieves visa, passport, and entry requirements from the Sherpa API.',
        inputSchema: z.object({
            country: z.string().describe("The destination country (use ISO 3166-1 alpha-2 code if possible)."),
            nationality: z.string().describe("The traveler's nationality (use ISO 3166-1 alpha-2 code). Defaults to US citizen."),
        }),
        outputSchema: SherpaDataSchema,
    },
    async (input) => getSherpaData(input)
);

export const getTravelDocDataTool = ai.defineTool(
    {
        name: 'getTravelDocDataTool',
        description: 'Retrieves customs, health, and permit requirements from the TravelDoc API.',
        inputSchema: z.object({
            country: z.string().describe("The destination country."),
        }),
        outputSchema: TravelDocDataSchema,
    },
    async (input) => getTravelDocData(input)
);
