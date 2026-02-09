import {
  HeroIntroduction,
  ProfessionalStory,
  ExperienceTimeline,
  SkillsBreakdown,
  BeyondCode,
} from '@/components/about';
import { LetsConnectSection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me - Esteban Estrada',
  description: 'Software Engineer II specializing in AI integration, full-stack development, and performance optimization. Based in Medellín, Colombia.',
};

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
