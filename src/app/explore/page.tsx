import { Suspense } from 'react';
import { getAllCountries, getCountryDetails } from '@/lib/data';
import { DestinationGrid } from './_components/destination-grid';
import { CountryDetailView } from './_components/country-detail-view';
import { CountrySearch } from '@/components/country-search';
import { LoadingSpinner } from './_components/loading-spinner';

async function CountryData({ countryQuery }: { countryQuery?: string }) {
  const countries = getAllCountries();
  let countryDetails = null;

  if (countryQuery) {
    // Attempt to get details (either from static file or by generating)
    countryDetails = await getCountryDetails(countryQuery);
  }

  if (countryDetails) {
    return (
      <>
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            {countryDetails.name}
          </h1>
          <div className='max-w-2xl mx-auto'>
              {/* No search bar when viewing details */}
          </div>
        </div>
        <CountryDetailView details={countryDetails} />
      </>
    );
  }

  if (countryQuery) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold">No data available for "{countryQuery}" yet.</h2>
        <p className="text-muted-foreground mt-2">Why not explore one of these amazing destinations?</p>
        <div className="mt-8">
          <DestinationGrid countries={countries.slice(0, 3)} />
        </div>
      </div>
    )
  }

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
