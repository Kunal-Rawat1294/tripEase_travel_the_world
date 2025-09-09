'use server';

import { getRelevantTravelArticles } from '@/ai/flows/travel-blog-relevant-articles';
import type { RelevantTravelArticlesOutput } from '@/ai/flows/travel-blog-relevant-articles';

export async function getArticlesAction(country: string): Promise<RelevantTravelArticlesOutput> {
  if (!country) {
    return { articles: [] };
  }
  try {
    const result = await getRelevantTravelArticles({ country });
    return result;
  } catch (error) {
    console.error('Error fetching relevant articles:', error);
    // In a real app, you'd want more robust error handling
    return { articles: [] };
  }
}
