import {
  HeroIntroduction,
  ProfessionalStory,
  ExperienceTimeline,
  SkillsBreakdown,
  BeyondCode,
} from '@/components/about';
import { LetsConnectSection } from '@/components/sections';
import { generatePageMetadata } from '@/lib/utils';

/**
 * Static metadata for the About page
 * For dynamic pages (with [slug]), use generateMetadata() instead
 */
export const metadata = generatePageMetadata({
  title: 'About Me',
  description: 'Software Engineer II specializing in AI integration, full-stack development, and performance optimization. Based in Medellín, Colombia.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
      {/* Hero Introduction */}
      <HeroIntroduction className="mb-24" />

      {/* Professional Story */}
      <ProfessionalStory className="mb-24" />

      {/* Experience Timeline */}
      <ExperienceTimeline className="mb-24" />

      {/* Skills Breakdown */}
      <SkillsBreakdown className="mb-24" />

      {/* Beyond Code */}
      <BeyondCode className="mb-24" />

      {/* Let's Connect - Reuse from homepage */}
      <LetsConnectSection className="mb-24" />
    </main>
  );
}
