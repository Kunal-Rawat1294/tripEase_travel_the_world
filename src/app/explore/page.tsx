import { getAllCountries, getCountryDetails } from '@/lib/data';
import { DestinationGrid } from './_components/destination-grid';
import { CountryDetailView } from './_components/country-detail-view';
import { CountrySearch } from '@/components/country-search';

export default function ExplorePage({
  searchParams,
}: {
  searchParams?: { country?: string };
}) {
  const countryQuery = searchParams?.country?.toLowerCase().trim();
  const countries = getAllCountries();

  let countryDetails = null;
  if (countryQuery) {
    const matchedCountry = countries.find(c => c.name.toLowerCase() === countryQuery);
    if(matchedCountry) {
        countryDetails = getCountryDetails(matchedCountry.slug);
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

      {countryDetails ? (
        <CountryDetailView details={countryDetails} />
      ) : countryQuery ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No data available for "{searchParams?.country}" yet.</h2>
          <p className="text-muted-foreground mt-2">Why not explore one of these amazing destinations?</p>
          <div className="mt-8">
            <DestinationGrid countries={countries.slice(0, 3)} />
          </div>
        </div>
      ) : (
        <DestinationGrid countries={countries} />
      )}
    </div>
  );
}
