'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CountrySearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?country=${encodeURIComponent(query.trim())}`);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a country name.",
        variant: "destructive",
      })
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-md mx-auto items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter a country name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 flex-1 rounded-full bg-white/90 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
      />
      <Button type="submit" size="icon" className="h-12 w-12 rounded-full">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
