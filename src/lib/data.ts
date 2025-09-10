import type { Country, CountryDetails, BlogPost } from '@/types';
import countriesData from '@/data/countries.json';
import blogPostsData from '@/data/blog-posts.json';
import { generateCountryDetails } from '@/ai/flows/generate-country-details-flow';
import {notFound} from 'next/navigation';

const countryDetailsCache: { [key: string]: CountryDetails } = {};

export function getAllCountries(): Country[] {
  return countriesData;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countriesData.find((c) => c.slug === slug);
}

function toSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export async function getCountryDetails(countryIdentifier: string): Promise<CountryDetails | null> {
    const slug = toSlug(countryIdentifier);

    if (slug in countryDetailsCache) {
        return countryDetailsCache[slug];
    }

    try {
        // Try to load a static file first
        const staticData = require(`@/data/${slug}.json`);
        countryDetailsCache[slug] = staticData;
        return staticData;
    } catch (e) {
        // If static file doesn't exist, try to find country name from main list
        const countryInfo = countriesData.find(c => c.name.toLowerCase() === countryIdentifier.toLowerCase() || c.slug === slug);
        const countryName = countryInfo ? countryInfo.name : countryIdentifier;

        try {
            console.log(`Generating details for ${countryName}...`);
            const generatedData = await generateCountryDetails(countryName);
            countryDetailsCache[slug] = generatedData;
            return generatedData;
        } catch (genError) {
            console.error(`Failed to generate details for ${countryName}:`, genError);
            return null;
        }
    }
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}
