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

const InfoSectionSchema = z.object({
  title: z.string().describe('The title of the information section.'),
  description: z.string().describe('A brief description of the section.'),
  points: z.array(z.string()).describe('An array of key points or tips for the section.'),
});

const CountryDetailsFlowInputSchema = z.object({
  country: z.string().describe('The country for which to generate details.'),
});
export type CountryDetailsFlowInput = z.infer<typeof CountryDetailsFlowInputSchema>;

const CountryDetailsFlowOutputSchema = z.object({
  name: z.string().describe('The name of the country.'),
  docs: InfoSectionSchema.describe('Information about travel documents and visas.'),
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
  prompt: `You are a world travel expert tasked with creating an exhaustive travel guide for {{{country}}}.

  Your response must be incredibly detailed and comprehensive. For each of the sections below, provide a thorough description (3-4 sentences) and at least 8-10 detailed, practical bullet points. The goal is to create a rich resource that is between 100 and 200 lines long in its final JSON format.

  Sections to cover:
  - Travel Documents & Visas
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
