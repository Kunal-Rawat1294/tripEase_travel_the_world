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
    You are a world-class travel expert. Your task is to generate an in-depth, well-structured, and practical travel guide for international tourists visiting {{prompt}}. The guide must be organized into the seven sections detailed below.

    For each section, provide a concise title and detailed, practical content formatted in Markdown. The content for each section should be very comprehensive, aiming for approximately 50 lines of rich text. Use Markdown headings (###), bullet points, and bold text to structure the information for clarity and readability. Where possible, include links to official government or tourism websites.

    **1. Documents**:
    - **Visa Requirements**: Detail the visa policy for major tourist-sending countries (e.g., USA, UK, EU, Canada, Australia). Mention visa-free entry, e-visas (like ETA or K-ETA), or required tourist visas.
    - **Application Process**: Briefly explain how to apply for any required visa or travel authorization, including official websites.
    - **Passport Validity**: Specify passport validity requirements (e.g., valid for 6 months beyond stay).
    - **Customs and Declarations**: Explain rules for declaring currency, and list common prohibited or restricted items (food, agricultural products).
    - **Departure Taxes**: Mention any applicable departure taxes.

    **2. Culture**:
    - **Social Etiquette & Norms**: Describe key social customs, greetings (handshakes, bows), and rules of politeness. Discuss concepts of personal space, punctuality, and gift-giving.
    - **Dining Etiquette**: Explain customs for dining out, tipping culture (or lack thereof), how to pay, and table manners (e.g., use of chopsticks, hands).
    - **Indigenous & Local Culture**: If applicable, mention the role of indigenous peoples or distinct regional cultures and how to respectfully interact with them.
    - **Language**: State the official language(s). Provide a few essential phrases for travelers (e.g., Hello, Thank You, Please, Excuse Me).
    - **Major Festivals & Holidays**: List 2-3 major national holidays or festivals that might impact travel.

    **3. Safety**:
    - **General Safety & Crime**: Provide a realistic overview of safety. Detail common petty crimes (e.g., pickpocketing, scams) and where they occur. Mention violent crime rates if notably high or low.
    - **Common Scams**: Describe specific tourist scams to watch out for (e.g., 'tea ceremony' scam, 'gold ring' trick).
    - **Emergency Numbers**: List the primary emergency numbers (Police, Ambulance, Fire).
    - **Transportation Safety**: Offer tips for safely using taxis, ride-sharing, and public transport. Mention any specific road safety concerns.
    - **Natural Disasters & Environment**: Discuss potential natural disaster risks (e.g., earthquakes, hurricanes, monsoons) and the appropriate season. Mention any dangerous wildlife.

    **4. Health**:
    - **Healthcare System**: Describe the quality of the healthcare system for tourists. Mention if private clinics or hospitals with English-speaking staff are available.
    - **Travel Insurance**: Emphasize the importance of comprehensive travel health insurance and why it's needed.
    - **Vaccinations**: List any required or recommended vaccinations (e.g., Yellow Fever, Hepatitis A, Typhoid).
    - **Food & Water Safety**: Advise on the safety of tap water, street food, and general food hygiene practices. Mention common food-related illnesses.
    - **Environmental Health Risks**: Discuss climate-related risks like sun exposure, heatstroke, or air pollution.

    **5. Money**:
    - **Currency**: Name the local currency (e.g., Euro, Yen) and its symbol (€, ¥).
    - **Payment Methods**: Detail the acceptance of credit/debit cards (Visa, Mastercard, Amex), mobile payments, and the importance of carrying cash.
    - **ATMs & Money Exchange**: Explain where to find reliable ATMs and the best places to exchange currency.
    - **Costs & Budgeting**: Provide a general idea of daily costs for a mid-range traveler, including a sample cost for a meal or coffee.
    - **Tipping Customs**: Clearly state whether tipping is expected, optional, or not practiced for restaurants, taxis, and guides.

    **6. Connectivity**:
    - **Mobile & SIM Cards**: Explain how tourists can get mobile data. Mention major local telecom providers and the process for buying a prepaid SIM card. Discuss eSIM options.
    - **Wi-Fi Availability**: Describe the availability and reliability of free public Wi-Fi in places like airports, cafes, and hotels.
    - **Essential Apps**: Recommend 3-4 essential mobile apps for navigation (e.g., Google Maps, Naver Map), ride-hailing (e.g., Uber, Grab), or translation.
    - **Internet Censorship**: Mention if a VPN is needed to access certain websites or apps (e.g., in China).

    **7. Adaptation**:
    - **Climate & Seasons**: Describe the different seasons and the best time to visit. Advise on appropriate clothing for the climate.
    - **Transportation**: Explain the best ways to get around the country (e.g., high-speed trains, domestic flights, buses).
    - **Social Norms & Culture Shock**: Offer tips for adapting to the local pace of life, communication styles, and any significant cultural differences that might lead to culture shock.
    - **Shopping & Business Hours**: Mention typical opening hours for shops, banks, and restaurants, including any closures on specific days (e.g., Sundays).
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
