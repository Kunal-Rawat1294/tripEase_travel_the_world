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
        // Try to load a static file first. This is a synchronous operation.
        const staticData = require(`@/data/${slug}.json`);
        countryDetailsCache[slug] = staticData;
        console.log(`Loaded static data for ${countryIdentifier}`);
        return staticData;
    } catch (e) {
        // If static file doesn't exist, proceed to generate details.
        // It's important to catch the error here so we can fall back to generation.
        console.log(`No static data for ${slug}, attempting to generate...`);
    }

    // Find the country name from the main list to ensure we use the canonical name for generation
    const countryInfo = countriesData.find(c => c.name.toLowerCase() === countryIdentifier.toLowerCase() || c.slug === slug);
    const countryNameToGenerate = countryInfo ? countryInfo.name : countryIdentifier;

    try {
        console.log(`Generating details for ${countryNameToGenerate}...`);
        const generatedData = await generateCountryDetails(countryNameToGenerate);
        if (generatedData) {
            countryDetailsCache[slug] = generatedData;
            return generatedData;
        }
        return null;
    } catch (genError) {
        console.error(`Failed to generate details for ${countryNameToGenerate}:`, genError);
        return null;
    }
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}
