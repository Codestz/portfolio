import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section } from '@/components/sections';
import { Button, Badge } from '@/components/ui';
import { contentService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postResult = await contentService.getPostBySlug(slug);

  if (!postResult.success || !postResult.data) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = postResult.data;

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const postsResult = await contentService.getAllPosts();
  const posts = postsResult.success ? postsResult.data : [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ExperimentPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postResult = await contentService.getPostBySlug(slug);

  if (!postResult.success || !postResult.data) {
    notFound();
  }

  const post = postResult.data;

  return (
    <main>
      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Link href={ROUTES.experiments.index}>
            <Button
              as="a"
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-3 w-3" />}
              className="mb-8"
            >
              Back to Experiments
            </Button>
          </Link>

          {/* Article Header */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="not-prose mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="primary">Featured</Badge>
                )}
              </div>

              <h1 className="mb-4 font-mono text-4xl font-bold uppercase leading-tight tracking-wider text-foreground md:text-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" pill>
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="mt-8">
              <MDXRemote source={post.content} />
            </div>
          </article>
        </div>
      </Section>
    </main>
  );
}
