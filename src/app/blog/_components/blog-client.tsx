'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { getArticlesAction } from '@/lib/actions';
import type { RelevantTravelArticlesOutput } from '@/ai/flows/travel-blog-relevant-articles';
import { BlogCard } from './blog-card';
import { useToast } from '@/hooks/use-toast';

export function BlogClient() {
  const [country, setCountry] = useState('');
  const [articles, setArticles] = useState<RelevantTravelArticlesOutput['articles']>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country.trim()) {
      toast({
        title: 'Search Error',
        description: 'Please enter a country to find articles.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setArticles([]);
    try {
      const result = await getArticlesAction(country);
      if (result.articles.length === 0) {
        toast({
          title: 'No Articles Found',
          description: `We couldn't find any articles for ${country}. Please try another country.`,
        });
      }
      setArticles(result.articles);
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: 'Failed to fetch articles. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mx-auto mb-12 flex max-w-lg items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter a country to find articles..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-11 flex-1 text-base"
        />
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          <span>Search</span>
        </Button>
      </form>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <BlogCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
