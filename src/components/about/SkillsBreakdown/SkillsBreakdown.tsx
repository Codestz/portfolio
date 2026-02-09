'use client';

import { useRef, useEffect } from 'react';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { SkillsBreakdownProps, SkillCategory } from './SkillsBreakdown.types';

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    color: 'bg-primary',
    skills: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS'],
  },
  {
    title: 'Frontend',
    color: 'bg-secondary',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'React Three Fiber'],
  },
  {
    title: 'AI & Agents',
    color: 'bg-[#FF6B6B]',
    skills: ['Model Context Protocol', 'Autonomous Agents', 'AI Integration', 'LLM Workflows'],
  },
  {
    title: 'Backend',
    color: 'bg-[#4CAF50]',
    skills: ['Node.js', 'Microservices', 'REST APIs', 'Real-time Systems'],
  },
  {
    title: 'Tools & Platforms',
    color: 'bg-[#9C27B0]',
    skills: ['Git', 'Docker', 'VS Code', 'Vercel', 'AWS'],
  },
  {
    title: 'Specializations',
    color: 'bg-[#FF9800]',
    skills: ['Performance Optimization', 'System Architecture', 'PWA Development', 'Mobile (React Native)'],
  },
];

/**
 * SkillsBreakdown Component
 * Grid of skill categories with badges
 */
export function SkillsBreakdown({ className }: SkillsBreakdownProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion()) {
      return;
    }

    const cards = Array.from(gridRef.current.children);
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.9,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !gridRef.current || prefersReducedMotion()) {
      return;
    }

    const cards = Array.from(gridRef.current.children);
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(1.3)',
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  return (
    <section ref={triggerRef} className={className}>
      {/* Heading */}
      <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-8 sm:mb-10 md:mb-12 leading-tight">
        Skills_&_Technologies
      </h2>

      {/* Skills Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div
            key={idx}
            className={cn(
              'border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground p-4 sm:p-5 md:p-6',
              'transition-all duration-200',
              'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px] hover:shadow-foreground',
              'bg-bg-elevated'
            )}
          >
            {/* Category Header */}
            <div className="mb-4">
              <div className={cn('inline-block px-3 py-1 border-[2px] border-foreground mb-3', category.color)}>
                <h3 className="font-bold uppercase text-sm text-white">{category.title}</h3>
              </div>
            </div>

            {/* Skills List */}
            <ul className="space-y-2">
              {category.skills.map((skill, sidx) => (
                <li key={sidx} className="flex items-center gap-2 text-foreground/90">
                  <span className="text-primary font-mono font-bold">&gt;</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
