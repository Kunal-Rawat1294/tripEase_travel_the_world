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
  prompt: `You are a world travel expert. Generate a comprehensive travel guide for {{{country}}}.

  Provide detailed information for the following sections:
  - Travel Documents & Visas
  - Culture & Traditions
  - Safety & Precautions
  - Health & Diseases
  - Money & Budget
  - Connectivity & Transport
  - Adaptation & Mindset

  For each section, provide a title, a short description, and at least 4-5 bullet points with practical advice.
  The entire output must be a single JSON object matching the requested schema. Ensure all fields are populated with high-quality, accurate information.
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
