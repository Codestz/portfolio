'use client';

import { useRef } from 'react';
import { Badge, Button, HighlightText, Terminal } from '@/components/ui/primitives';
import { useGSAP } from '@/lib/hooks';
import { createTimeline, prefersReducedMotion } from '@/lib/utils/animation.utils';
import { DURATION, EASING, STAGGER } from '@/lib/config/animation.config';

/**
 * CodeGardenHero Component
 * Hero section with Code Garden branding and 3D scene placeholder
 * Features GSAP entrance animations
 */
export function CodeGardenHero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Entrance animation timeline
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = createTimeline();

    // Sequence: Badge → Heading → Mission → Buttons → Scene
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASING.default }
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: DURATION.slow, ease: EASING.snap },
        '-=0.3'
      )
      .fromTo(
        missionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.normal, ease: EASING.default },
        '-=0.4'
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.normal,
          ease: EASING.bounce,
          stagger: STAGGER.fast,
        },
        '-=0.3'
      )
      .fromTo(
        sceneRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: DURATION.normal, ease: EASING.default },
        '-=1.2'
      );
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
      <div className="lg:col-span-7">
        {/* Status Badge */}
        <div ref={badgeRef}>
          <Badge variant="primary" className="mb-4">
            Status: Building in public
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 ref={headingRef} className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.9] mb-6 sm:mb-8 uppercase">
          <HighlightText variant="secondary">Codestz</HighlightText> Code Garden
        </h1>

        {/* Mission Statement */}
        <p ref={missionRef} className="text-lg sm:text-xl md:text-2xl font-medium max-w-xl mb-8 sm:mb-10 leading-snug">
          <a href="/about" className="font-bold text-foreground transition-colors underline decoration-secondary decoration-2 underline-offset-4">
            Senior Software Engineer
          </a>{' '}
          Sharing experiments with{' '}
          <HighlightText variant="underline">autonomous agents</HighlightText>,{' '}
          <HighlightText variant="underline">Model Context Protocol</HighlightText>, and
          cutting-edge frontend patterns through tutorials and case studies.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap gap-4 sm:gap-6">
          <Button as="a" href="#latest" variant="secondary" size="lg">
            View_Experiments
          </Button>
          <Button as="a" href="/experience" variant="outline" size="lg">
            View_Experience
          </Button>
        </div>
      </div>

      {/* Terminal Simulation */}
      <div className="lg:col-span-5">
        <div ref={sceneRef}>
          <Terminal
            title="codestz_kernel_v1.0"
            lines={[
              { text: 'Initializing development environment...', color: 'cyan', prefix: '>' },
              { text: 'Loading AI modules (MCP v1.1)...', color: 'white', prefix: '>', suffix: '[OK]', suffixColor: 'yellow', delay: 400 },
              { text: 'Connecting with Neural Matrix...', color: 'white', prefix: '>', delay: 800 },
            ]}
            skills={[
              'Next.js 16 (React Compiler)',
              'Model Context Protocol (MCP)',
              'Generative AI Workflows',
              'Tailwind CSS 4',
              'Digital Garden Architecture',
            ]}
            finalCommand="ls -la research/ai_recommendations"
          />
        </div>
      </div>
    </section>
  );
}
