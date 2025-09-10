/**
 * @fileOverview Initializes and configures the Genkit AI instance.
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
      generationConfig: {
        model: 'gemini-1.5-flash-latest',
      }
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
