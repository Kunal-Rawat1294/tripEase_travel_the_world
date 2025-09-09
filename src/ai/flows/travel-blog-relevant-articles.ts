'use server';
/**
 * @fileOverview Retrieves relevant travel articles for a given country and returns previews with links to external websites.
 *
 * - getRelevantTravelArticles - A function that fetches relevant travel articles for a given country.
 * - RelevantTravelArticlesInput - The input type for the getRelevantTravelArticles function.
 * - RelevantTravelArticlesOutput - The return type for the getRelevantTravelArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelevantTravelArticlesInputSchema = z.object({
  country: z.string().describe('The country for which to retrieve travel articles.'),
});
export type RelevantTravelArticlesInput = z.infer<typeof RelevantTravelArticlesInputSchema>;

const RelevantTravelArticlesOutputSchema = z.object({
  articles: z.array(
    z.object({
      title: z.string().describe('The title of the article.'),
      url: z.string().url().describe('The URL of the article.'),
      description: z.string().describe('A short description of the article.'),
      category: z.string().describe('The category of the article (e.g., Travel Tips, Budget Travel, Eco Travel).'),
      author: z.string().describe('The author of the article.'),
      date: z.string().describe('The date the article was published.'),
    })
  ).describe('An array of relevant travel articles.'),
});
export type RelevantTravelArticlesOutput = z.infer<typeof RelevantTravelArticlesOutputSchema>;

export async function getRelevantTravelArticles(input: RelevantTravelArticlesInput): Promise<RelevantTravelArticlesOutput> {
  return travelBlogRelevantArticlesFlow(input);
}

const getRelevantArticle = ai.defineTool({
  name: 'getRelevantArticle',
  description: 'Retrieves a relevant travel article URL for a given country and topic.',
  inputSchema: z.object({
    country: z.string().describe('The country to search for.'),
    topic: z.string().describe('The topic of the article (e.g., Travel Tips, Budget Travel, Eco Travel).'),
  }),
  outputSchema: z.object({
    title: z.string().describe('The title of the article.'),
    url: z.string().url().describe('The URL of the article.'),
    description: z.string().describe('A short description of the article.'),
    category: z.string().describe('The category of the article (e.g., Travel Tips, Budget Travel, Eco Travel).'),
    author: z.string().describe('The author of the article.'),
    date: z.string().describe('The date the article was published.'),
  }),
  async (input) => {
    // Placeholder implementation - replace with actual article retrieval logic
    return {
      title: `Sample Article about ${input.topic} in ${input.country}`,
      url: 'https://example.com/article',
      description: `This is a sample article about ${input.topic} in ${input.country}.`,
      category: input.topic,
      author: 'Sample Author',
      date: '2024-01-01',
    };
  },
});

const travelBlogRelevantArticlesPrompt = ai.definePrompt({
  name: 'travelBlogRelevantArticlesPrompt',
  input: {schema: RelevantTravelArticlesInputSchema},
  output: {schema: RelevantTravelArticlesOutputSchema},
  tools: [getRelevantArticle],
  prompt: `You are a travel expert. Find three relevant travel articles for the country {{{country}}}.

    Return the title, URL, a short description, the category, the author, and the date for each article.

    Use the getRelevantArticle tool to find the article information.

    Format the output as a JSON object with an array of articles. Each article should have the fields: title, url, description, category, author, and date.

    Consider these categories: Travel Tips, Budget Travel, Eco Travel.
    `,
});

const travelBlogRelevantArticlesFlow = ai.defineFlow(
  {
    name: 'travelBlogRelevantArticlesFlow',
    inputSchema: RelevantTravelArticlesInputSchema,
    outputSchema: RelevantTravelArticlesOutputSchema,
  },
  async input => {
    const {output} = await travelBlogRelevantArticlesPrompt(input);
    return output!;
  }
);
