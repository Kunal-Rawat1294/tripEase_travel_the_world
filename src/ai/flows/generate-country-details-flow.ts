'use server';
/**
 * @fileOverview A flow that generates a detailed travel guide for a given country.
 *
 * - generateCountryDetails - A function that calls the Genkit flow to generate content.
 * - GenerateCountryDetailsInput - The input type for the flow (country name).
 * - GenerateCountryDetailsOutput - The output type for the flow (structured travel guide).
 */

import { ai } from '@/ai/genkit';
import type { CountryDetails, ContentSection } from '@/types';
import { z } from 'genkit';

const GenerateCountryDetailsInputSchema = z.string();
export type GenerateCountryDetailsInput = z.infer<typeof GenerateCountryDetailsInputSchema>;

const ContentSectionSchema = z.object({
  title: z.string().describe('The title of the content section.'),
  content: z.string().describe('The detailed content for this section, formatted as Markdown.'),
});

const GenerateCountryDetailsOutputSchema = z.object({
  name: z.string().describe("The name of the country."),
  content: z.object({
    documents: ContentSectionSchema.describe('Information about visas, passports, and entry requirements.'),
    culture: ContentSectionSchema.describe('Information about local culture, etiquette, festivals, and food.'),
    safety: ContentSectionSchema.describe('Information about general safety, crime, scams, and emergency services.'),
    health: ContentSectionSchema.describe('Information about healthcare, vaccinations, and food/water safety.'),
    money: ContentSectionSchema.describe('Information about currency, payments, costs, and tipping.'),
    connectivity: ContentSectionSchema.describe('Information about mobile data, Wi-Fi, and essential apps.'),
    adaptation: ContentSectionSchema.describe('Information about climate, transportation, and cultural adaptation.'),
  }).describe("The structured content of the travel guide, divided into categories."),
});

export type GenerateCountryDetailsOutput = z.infer<typeof GenerateCountryDetailsOutputSchema>;

export async function generateCountryDetails(countryName: GenerateCountryDetailsInput): Promise<GenerateCountryDetailsOutput> {
    const flowOutput = await generateCountryDetailsFlow(countryName);
    // Ensure the output matches the CountryDetails type structure
    return {
        name: flowOutput.name,
        content: flowOutput.content,
    };
}


const prompt = ai.definePrompt({
  name: 'generateCountryDetailsPrompt',
  input: { schema: GenerateCountryDetailsInputSchema },
  output: { schema: GenerateCountryDetailsOutputSchema },
  prompt: `
    You are a world-class travel expert. Your task is to generate a comprehensive, well-structured, and practical travel guide for international tourists visiting {{prompt}}.

    The guide must be organized into the following seven sections:
    1.  **Documents**: Visa requirements, passport validity, customs, and travel insurance.
    2.  **Culture**: Etiquette, social norms, language, festivals, and food.
    3.  **Safety**: General crime, common scams, emergency numbers, and transportation safety.
    4.  **Health**: Healthcare system, recommended vaccinations, food/water safety, and environmental health.
    5.  **Money**: Currency, payment methods, budgeting, and tipping customs.
    6.  **Connectivity**: Mobile data/SIM cards, Wi-Fi availability, and essential apps.
    7.  **Adaptation**: Climate, cultural adjustment, transportation within the country, and daily life tips.

    For each section, provide a concise title and detailed, practical content formatted in Markdown. Use headings, bullet points, and bold text to make the information easy to scan and digest.
  `,
});

const generateCountryDetailsFlow = ai.defineFlow(
  {
    name: 'generateCountryDetailsFlow',
    inputSchema: GenerateCountryDetailsInputSchema,
    outputSchema: GenerateCountryDetailsOutputSchema,
  },
  async (countryName) => {
    const { output } = await prompt(countryName);
    if (!output) {
      throw new Error('Failed to generate country details.');
    }
    return output;
  }
);
