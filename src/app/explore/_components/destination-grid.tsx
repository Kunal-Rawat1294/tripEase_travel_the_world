import type { Country } from '@/types';
import { DestinationCard } from './destination-card';

interface DestinationGridProps {
  countries: Country[];
}

export function DestinationGrid({ countries }: DestinationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <DestinationCard key={country.slug} country={country} />
      ))}
    </div>
  );
}
