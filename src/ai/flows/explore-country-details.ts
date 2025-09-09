'use server';
/**
 * @fileOverview Generates detailed travel information for a given country.
 *
 * - getCountryDetailsFlow - A function that generates detailed information about a country.
 * - CountryDetailsFlowInput - The input type for the getCountryDetailsFlow function.
 * - CountryDetailsFlowOutput - The return type for the getCountryDetailsFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getSherpaDataTool, getTravelDocDataTool } from '../tools/travel-docs-tools';

const InfoSectionSchema = z.object({
  title: z.string().describe('The title of the information section.'),
  description: z.string().describe('A brief description of the section.'),
  points: z.array(z.string()).describe('An array of key points or tips for the section.'),
});

const DocsSectionSchema = z.object({
    title: z.string().describe("The title of the section, which should be 'Travel Documents & Visas'."),
    description: z.string().describe("A brief, 2-3 sentence overview of the country's entry requirements."),
    passportRequirements: z.object({
        title: z.literal("Passport Requirements"),
        validity: z.string().describe("Required passport validity period (e.g., '6 months beyond travel date')."),
        blankPages: z.string().describe("Number of blank passport pages required."),
        ePassport: z.boolean().describe("Whether an e-Passport is required."),
    }),
    visaRequirements: z.object({
        title: z.literal("Visa Information"),
        visaFreeEntry: z.string().describe("Details on visa-free entry, including duration and eligible nationalities if available."),
        e-visa: z.string().describe("Information on e-Visa availability, eligibility, and application process."),
        visaOnArrival: z.string().describe("Information on Visa on Arrival availability and process."),
        embassyProcessing: z.string().describe("When and why embassy processing is required."),
    }),
    entryExit: z.object({
        title: z.literal("Entry and Exit Requirements"),
        customsDeclaration: z.string().describe("Details about customs declaration forms."),
        healthCertificates: z.string().describe("Required health certificates (e.g., Yellow Fever, COVID-19)."),
        specialPermits: z.string().describe("Any special permits needed for restricted zones."),
    }),
    officialLinks: z.object({
        title: z.literal("Official Resources"),
        embassyUrl: z.string().url().describe("A valid URL to the country's official embassy or immigration website."),
    }),
});


const CountryDetailsFlowInputSchema = z.object({
  country: z.string().describe('The country for which to generate details.'),
});
export type CountryDetailsFlowInput = z.infer<typeof CountryDetailsFlowInputSchema>;

const CountryDetailsFlowOutputSchema = z.object({
  name: z.string().describe('The name of the country.'),
  docs: DocsSectionSchema.describe('Information about travel documents and visas.'),
  culture: InfoSectionSchema.describe('Information about the local culture and traditions.'),
  safety: InfoSectionSchema.describe('Information about safety and precautions.'),
  health: InfoSectionSchema.describe('Information about health and common diseases.'),
  money: InfoSectionSchema.describe('Information about currency, money, and budgeting.'),
  connectivity: InfoSectionSchema.describe('Information about internet, mobile connectivity, and transport.'),
  adaptation: InfoSectionSchema.describe('Information about adapting to the local environment and mindset.'),
});
export type CountryDetailsFlowOutput = z.infer<typeof CountryDetailsFlowOutputSchema>;


export async function getCountryDetailsFlow(input: CountryDetailsFlowInput): Promise<CountryDetailsFlowOutput> {
  return countryDetailsFlow(input);
}


const countryDetailsPrompt = ai.definePrompt({
  name: 'countryDetailsPrompt',
  input: { schema: CountryDetailsFlowInputSchema },
  output: { schema: CountryDetailsFlowOutputSchema },
  tools: [getSherpaDataTool, getTravelDocDataTool],
  prompt: `You are a world travel expert tasked with creating an exhaustive travel guide for {{{country}}}.

  Your response must be incredibly detailed and comprehensive.

  For the "Travel Documents & Visas" section, you MUST use the provided tools (getSherpaDataTool, getTravelDocDataTool) to get real-time, accurate information. Synthesize the data from the tools to fill out all the fields in the 'docs' schema. Provide detailed, practical information for each field.

  For all other sections (Culture, Safety, etc.), provide a thorough description (3-4 sentences) and at least 8-10 detailed, practical bullet points. The goal is to create a rich resource that is between 100 and 200 lines long in its final JSON format.

  Sections to cover:
  - Travel Documents & Visas (use tools)
  - Culture & Traditions
  - Safety & Precautions
  - Health & Diseases
  - Money & Budget
  - Connectivity & Transport
  - Adaptation & Mindset

  Ensure the entire output is a single, valid JSON object that strictly adheres to the requested output schema. All fields must be populated with high-quality, accurate, and extensive information.
  `,
});


const countryDetailsFlow = ai.defineFlow(
  {
    name: 'countryDetailsFlow',
    inputSchema: CountryDetailsFlowInputSchema,
    outputSchema: CountryDetailsFlowOutputSchema,
  },
  async (input) => {
    const { output } = await countryDetailsPrompt(input);
    return output!;
  }
);