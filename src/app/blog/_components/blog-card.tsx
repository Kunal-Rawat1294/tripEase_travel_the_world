import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { RelevantTravelArticlesOutput } from '@/ai/flows/travel-blog-relevant-articles';

interface BlogCardProps {
  article: RelevantTravelArticlesOutput['articles'][0];
}

export function BlogCard({ article }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={`https://picsum.photos/seed/${article.title}/600/400`}
            alt={article.title}
            data-ai-hint="travel blog"
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="default" className="mb-2 bg-accent text-accent-foreground">{article.category}</Badge>
        <h3 className="font-headline text-lg font-semibold leading-snug">{article.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
        <div className="w-full text-xs text-muted-foreground">
          <p>By {article.author}</p>
          <p>{new Date(article.date).toLocaleDateString()}</p>
        </div>
        <Button asChild variant="secondary" className="w-full">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
