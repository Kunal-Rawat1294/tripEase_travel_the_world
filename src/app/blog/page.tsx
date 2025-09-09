import { BlogClient } from './_components/blog-client';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Travel Blog
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AI-powered insights and articles for your next journey.
        </p>
      </div>
      <BlogClient />
    </div>
  );
}
