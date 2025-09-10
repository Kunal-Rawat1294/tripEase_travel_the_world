import { Suspense } from 'react';
import { getAllCountries, getCountryDetails } from '@/lib/data';
import { DestinationGrid } from './_components/destination-grid';
import { CountryDetailView } from './_components/country-detail-view';
import { CountrySearch } from '@/components/country-search';
import { LoadingSpinner } from './_components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function CountryData({ countryQuery }: { countryQuery?: string }) {
  const countries = getAllCountries();

  if (countryQuery) {
    const countryDetails = await getCountryDetails(countryQuery);

    if (countryDetails) {
       // Case 1: We have the data, show the detail view.
      return (
        <>
          <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              {countryDetails.name}
            </h1>
          </div>
          <CountryDetailView details={countryDetails} />
        </>
      );
    } else {
        // Case 2: Data generation failed or country does not exist.
        const knownCountry = countries.find(c => c.name.toLowerCase() === countryQuery.toLowerCase());
        if(knownCountry) {
            // It's a known country, but generation failed.
            return (
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>The data is sleeping!</AlertTitle>
                    <AlertDescription>
                        We had trouble generating the guide for {knownCountry.name}. Please try again in a few moments.
                    </AlertDescription>
                </Alert>
            )
        } else {
            // It's not a known country in our list.
             return (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold">We are building the page for "{countryQuery}"!</h2>
                    <p className="text-muted-foreground mt-2">This might take a moment. Please refresh the page shortly. In the meantime, why not explore one of these amazing destinations?</p>
                    <div className="mt-8">
                        <DestinationGrid countries={countries.slice(0, 3)} />
                    </div>
                </div>
            )
        }
    }
  }

  // Default Case: No country query, show the main grid.
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Explore Destinations
        </h1>
        <div className='max-w-2xl mx-auto'>
          <CountrySearch />
        </div>
      </div>
      <DestinationGrid countries={countries} />
    </>
  );
}


export default function ExplorePage({
  searchParams,
}: {
  searchParams?: { country?: string };
}) {
  const countryQuery = searchParams?.country?.trim();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <CountryData countryQuery={countryQuery} />
      </Suspense>
    </div>
  );
}
