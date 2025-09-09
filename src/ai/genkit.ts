import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKeys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_FALLBACK].filter(
  (k): k is string => !!k
);

if (apiKeys.length === 0) {
  console.warn(
    'No Gemini API key found. Please provide GEMINI_API_KEY in your .env file.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKeys,
    }),
  ],
  model: 'googleai/gemini-1.5-pro-latest',
});
