'use server';

import { getRelevantTravelArticles } from '@/ai/flows/travel-blog-relevant-articles';
import type { RelevantTravelArticlesOutput } from '@/ai/flows/travel-blog-relevant-articles';
import { getCountryDetailsFlow } from '@/ai/flows/explore-country-details';
import type { CountryDetails } from '@/types';

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

export async function getCountryDetailsAction(country: string): Promise<CountryDetails | null> {
    if (!country) {
        return null;
    }
    try {
        const result = await getCountryDetailsFlow({ country });
        return result;
    } catch (error) {
        console.error(`Error fetching details for ${country}:`, error);
        return null;
    }
}
