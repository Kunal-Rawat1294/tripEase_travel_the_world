import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Calendar, User } from 'lucide-react';

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl leading-tight text-center">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-6 text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{post.date}</span>
            </div>
          </div>
      </header>

      <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={post.image}
          alt={`Image for ${post.title}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-custom max-w-none text-foreground prose-a:text-primary prose-headings:font-headline">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
