import {
  CodeGardenHero,
  LatestExperimentsCard,
  TechStackCard,
  CurrentlyBuildingCard,
  AnimatedContentGrid,
  AboutMeSection,
  LetsConnectSection,
  SlotMachine,
} from '@/components/sections';
import { contentService } from '@/lib/services';
import { generatePageMetadata } from '@/lib/utils';
import { getCurrentWork } from '@/lib/utils/current-work.utils';

/**
 * Static metadata for the home page
 * For dynamic pages (with [slug]), use generateMetadata() instead
 */
export const metadata = generatePageMetadata({
  path: '/',
});

export default async function HomePage() {
  // Fetch latest blog posts
  const postsResult = await contentService.getAllPosts();
  const posts = postsResult.success ? Array.from(postsResult.data) : [];

  // Fetch current work data
  const currentWork = await getCurrentWork();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8">
      {/* Hero Section - Code Garden Branding */}
      <CodeGardenHero />

      {/* Content Grid - Blog Focused (50% / 25% / 25%) */}
      <AnimatedContentGrid
        id="latest"
        className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24 md:items-stretch"
      >
        {/* Latest Tutorials - 50% (2 of 4 columns) */}
        <div className="md:col-span-2 flex">
          <LatestExperimentsCard posts={posts} animated={false} className="w-full" />
        </div>

        {/* Tech Stack - 25% (1 of 4 columns) */}
        <div className="md:col-span-1 flex">
          <TechStackCard className="w-full h-full" />
        </div>

        {/* Currently Building - 25% (1 of 4 columns) */}
        <div className="md:col-span-1 flex">
          <CurrentlyBuildingCard currentWork={currentWork} className="w-full h-full" />
        </div>
      </AnimatedContentGrid>

      {/* About Me Section */}
      <AboutMeSection className="mb-24" />

      {/* Slot Machine - Fun Interactive Element */}
      <SlotMachine className="mb-24" />

      {/* Let's Connect Section */}
      <LetsConnectSection className="mb-24" />
    </main>
  );
}
