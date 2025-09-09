import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Country } from '@/types';
import { Badge } from '@/components/ui/badge';

interface DestinationCardProps {
  country: Country;
}

export function DestinationCard({ country }: DestinationCardProps) {
  return (
    <Link href={`/explore?country=${country.name}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={country.image}
              alt={`Image of ${country.name}`}
              data-ai-hint={`${country.name} landmark`}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl">{country.name}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">{country.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant="secondary">{country.continent}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
