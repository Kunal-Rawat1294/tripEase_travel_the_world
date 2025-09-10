import type { Country, CountryDetails, BlogPost } from '@/types';
import countriesData from '@/data/countries.json';
import blogPostsData from '@/data/blog-posts.json';

// Dynamically import country details
const countryDetailsModules = {
  'japan': () => import('@/data/japan.json'),
  'india': () => import('@/data/india.json'),
  'usa': () => import('@/data/usa.json'),
  'south-korea': () => import('@/data/south-korea.json'),
  'china': () => import('@/data/china.json'),
  'australia': () => import('@/data/australia.json'),
  'new-zealand': () => import('@/data/new-zealand.json'),
};

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
    // We are using static imports here, but dynamic imports would be better
    // for performance in a real-world scenario with many countries.
    let countryData;
    switch (slug) {
        case 'japan':
            countryData = require('@/data/japan.json');
            break;
        case 'india':
            countryData = require('@/data/india.json');
            break;
        case 'usa':
            countryData = require('@/data/usa.json');
            break;
        case 'south-korea':
            countryData = require('@/data/south-korea.json');
            break;
        case 'china':
            countryData = require('@/data/china.json');
            break;
        case 'australia':
            countryData = require('@/data/australia.json');
            break;
        case 'new-zealand':
            countryData = require('@/data/new-zealand.json');
            break;
        default:
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
