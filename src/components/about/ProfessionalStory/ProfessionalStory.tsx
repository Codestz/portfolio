'use client';

import { useRef, useEffect } from 'react';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import gsap from 'gsap';
import type { ProfessionalStoryProps } from './ProfessionalStory.types';

/**
 * ProfessionalStory Component
 * Narrative bio section with career journey
 */
export function ProfessionalStory({ className }: ProfessionalStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) {
      return;
    }

    gsap.set(containerRef.current.children, {
      opacity: 0,
      y: 50,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !containerRef.current || prefersReducedMotion()) {
      return;
    }

    gsap.to(containerRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  return (
    <section ref={triggerRef} className={className}>
      <div className="border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-foreground p-4 sm:p-6 md:p-8 lg:p-12">
        <div ref={containerRef} className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-6 sm:mb-8 leading-tight">
            My_Journey
          </h2>

          {/* Story Paragraphs */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
            My journey into software engineering started with a fascination for building things that
            solve real problems. Over the past 5+ years, I&apos;ve evolved from a full-stack
            generalist into a specialist at the intersection of{' '}
            <strong className="text-primary font-bold">AI integration</strong> and{' '}
            <strong className="text-primary font-bold">frontend architecture</strong>.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
            Currently at <strong className="font-bold text-foreground">Recurly</strong>, I work on
            building scalable, high-performance applications that handle complex subscription
            management. Previously, at{' '}
            <strong className="font-bold text-foreground">Archie Labs</strong> and{' '}
            <strong className="font-bold text-foreground">8base</strong>, I specialized in
            integrating AI agents and autonomous systems into production web applications—pushing
            the boundaries of what&apos;s possible when AI meets modern frontend.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
            What drives me? The thrill of{' '}
            <strong className="font-bold underline decoration-secondary decoration-2">
              experimentation
            </strong>
            . Whether it&apos;s exploring the Model Context Protocol (MCP), optimizing React
            Compiler performance, or designing Neo-Brutalist interfaces with GSAP—I&apos;m
            constantly learning, building, and sharing through tutorials and case studies. This
            portfolio is my digital garden, where code meets creativity.
          </p>

          {/* Philosophy Highlight */}
          <div className="mt-6 sm:mt-8 border-l-[4px] sm:border-l-[6px] border-secondary bg-secondary/10 p-4 sm:p-6">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-foreground italic">
              &quot;Ship fast, iterate faster. Build in public, learn from everything.&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
