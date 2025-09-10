import type { Country, CountryDetails, BlogPost } from '@/types';
import countriesData from '@/data/countries.json';
import blogPostsData from '@/data/blog-posts.json';
import { generateCountryDetails as generateCountryDetailsFlow } from '@/ai/flows/generate-country-details-flow';
import * as fs from 'fs/promises';
import * as path from 'path';

const countryDetailsCache: { [key: string]: CountryDetails } = {};

export function getAllCountries(): Country[] {
  return countriesData;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countriesData.find((c) => c.slug === slug);
}

function toSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
}

async function generateAndCacheCountryDetails(countryName: string, slug: string): Promise<CountryDetails | null> {
    console.log(`Generating details for ${countryName}...`);
    try {
        const generatedData = await generateCountryDetailsFlow(countryName);
        countryDetailsCache[slug] = generatedData;
        
        // Save the generated data to a file
        const filePath = path.join(process.cwd(), 'src', 'data', `${slug}.json`);
        try {
            await fs.writeFile(filePath, JSON.stringify(generatedData, null, 2), 'utf-8');
            console.log(`Successfully saved generated data for ${countryName} to ${filePath}`);
        } catch (writeError) {
            console.error(`Failed to write file for ${countryName}:`, writeError);
        }

        return generatedData;
    } catch (genError) {
        console.error(`Failed to generate details for ${countryName}:`, genError);
        return null;
    }
}


export async function getCountryDetails(countryIdentifier: string): Promise<CountryDetails | null> {
    const country = countriesData.find(c => c.name === countryIdentifier || c.slug === countryIdentifier);

    if (!country) {
      const slug = toSlug(countryIdentifier);
      if (slug in countryDetailsCache) {
          return countryDetailsCache[slug];
      }
      try {
        // Last resort: check for a file that might not be in countries.json
        const staticData = require(`@/data/${slug}.json`);
        countryDetailsCache[slug] = staticData;
        return staticData;
      } catch (e) {
        return generateAndCacheCountryDetails(countryIdentifier, slug);
      }
    }

    const { name, slug } = country;

    if (slug in countryDetailsCache) {
        return countryDetailsCache[slug];
    }

    try {
        const staticData = require(`@/data/${slug}.json`);
        // Only populate cache if content is not empty
        if (staticData.content.documents.content !== "") {
          countryDetailsCache[slug] = staticData;
          return staticData;
        }
        // If content is empty, fall through to generate
    } catch (e) {
         // File does not exist, fall through to generate
    }

    return generateAndCacheCountryDetails(name, slug);
}


export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}
