import type { Country, CountryDetails, BlogPost } from '@/types';
import countriesData from '@/data/countries.json';
import blogPostsData from '@/data/blog-posts.json';

const countryDetailsCache: { [key: string]: CountryDetails } = {};

export function getAllCountries(): Country[] {
  return countriesData;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countriesData.find((c) => c.slug === slug);
}

export function getCountryDetails(slug: string): CountryDetails | null {
    if (slug in countryDetailsCache) {
        return countryDetailsCache[slug];
    }

    // This is a simplified approach for the sake of the example.
    // In a real app, you would fetch this data from a CMS or a database.
    let countryData;
    try {
        countryData = require(`@/data/${slug}.json`);
    } catch (e) {
        return null;
    }

    countryDetailsCache[slug] = countryData;
    return countryData;
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}
