
import { getAllCountries, getCountryDetails } from '@/lib/data';
import { DestinationGrid } from './_components/destination-grid';
import { CountryDetailView } from './_components/country-detail-view';
import { CountrySearch } from '@/components/country-search';
import { getCountryDetailsAction } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';


export default async function ExplorePage({
  searchParams,
}: {
  searchParams?: { country?: string };
}) {
  const countryQuery = searchParams?.country?.trim();
  const countries = getAllCountries();

  let countryDetails = null;
  let error = null;

  if (countryQuery) {
    // First, try to get data from local static files
    const staticCountry = countries.find(c => c.name.toLowerCase() === countryQuery.toLowerCase());
    if (staticCountry) {
        countryDetails = getCountryDetails(staticCountry.slug);
    }
    
    // If no static data, then call the AI
    if (!countryDetails) {
        try {
          countryDetails = await getCountryDetailsAction(countryQuery);
        } catch (e) {
          console.error(e);
          error = 'An unexpected error occurred or API rate limits were exceeded. Please try again later.';
        }
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          {countryDetails ? countryDetails.name : 'Explore Destinations'}
        </h1>
        <div className='max-w-2xl mx-auto'>
            {!countryDetails && <CountrySearch />}
        </div>
      </div>

      {error && (
         <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {countryDetails ? (
        <CountryDetailView details={countryDetails} />
      ) : countryQuery && !error ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No data available for "{searchParams?.country}" yet.</h2>
          <p className="text-muted-foreground mt-2">Why not explore one of these amazing destinations?</p>
          <div className="mt-8">
            <DestinationGrid countries={countries.slice(0, 3)} />
          </div>
        </div>
      ) : !countryQuery && !error ? (
        <DestinationGrid countries={countries} />
      ) : null}
    </div>
  );
}

