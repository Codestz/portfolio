import { Section, ExperimentsGrid } from '@/components/sections';
import { contentService } from '@/lib/services';
import { generatePageMetadata } from '@/lib/utils';
import { Metadata } from 'next';

/**
 * Static metadata for the Experiments listing page
 * For dynamic pages (with [slug]), use generateMetadata() instead
 */
export const metadata: Metadata = generatePageMetadata({
  title: 'Experiments',
  description: 'Exploring AI integration, performance optimization, and software architecture through tutorials and experiments',
  path: '/experiments',
});

export default async function ExperimentsPage() {
  const allPostsResult = await contentService.getAllPosts();
  const posts = allPostsResult.success ? Array.from(allPostsResult.data) : [];

  return (
    <main>
      <Section
        title="Experiments"
        description="Exploring AI integration, performance optimization, and software architecture through tutorials and experiments"
      >
        {posts.length > 0 ? (
          <ExperimentsGrid posts={posts} />
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-foreground/60">
              No experiments yet. Check back soon!
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
