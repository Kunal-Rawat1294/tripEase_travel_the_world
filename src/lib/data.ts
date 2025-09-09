import type { Country, CountryDetails } from '@/types';
import countriesData from '@/data/countries.json';
import japanData from '@/data/japan.json';
import indiaData from '@/data/india.json';
import usaData from '@/data/usa.json';
import ukData from '@/data/uk.json';
import southKoreaData from '@/data/south-korea.json';

const countryDetailsMap: { [key: string]: CountryDetails } = {
  japan: japanData,
  india: indiaData,
  usa: usaData,
  uk: ukData,
  'south-korea': southKoreaData,
};

export function getAllCountries(): Country[] {
  return countriesData;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countriesData.find((c) => c.slug === slug);
}

export function getCountryDetails(slug: string): CountryDetails | null {
  return countryDetailsMap[slug] || null;
}
