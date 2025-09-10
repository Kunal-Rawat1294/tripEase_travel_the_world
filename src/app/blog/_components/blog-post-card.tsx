import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={post.image}
              alt={`Image for ${post.title}`}
              data-ai-hint="travel"
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <CardTitle className="font-headline text-xl leading-snug">{post.title}</CardTitle>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="link" className="p-0 h-auto">Read More</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
