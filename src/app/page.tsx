import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CountrySearch } from '@/components/country-search';

const quickDestinations = ['India', 'Japan', 'USA', 'UK', 'South Korea'];

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-80px)] min-h-[500px] flex-col items-center justify-center text-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Travel background"
        data-ai-hint="travel landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-4 max-w-3xl text-white">
        <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 text-lg text-gray-200 md:text-xl">
          Explore amazing destinations around the world with TripEase
        </p>
        <CountrySearch />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {quickDestinations.map((dest) => (
            <Button asChild key={dest} variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full">
              <Link href={`/explore?country=${dest}`}>{dest}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
