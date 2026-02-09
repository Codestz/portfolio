'use client';

import { useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/primitives';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { ExperienceTimelineProps, Experience } from './ExperienceTimeline.types';

const EXPERIENCES: Experience[] = [
  {
    company: 'Recurly',
    role: 'Software Engineer II',
    duration: 'July 2025 - Present',
    current: true,
    achievements: [
      'Building scalable subscription management features',
      'Optimizing React application performance',
      'Implementing modern frontend architecture patterns',
      'Collaborating on system design decisions',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Performance Optimization'],
  },
  {
    company: 'Archie Labs',
    role: 'Senior Software Developer',
    duration: '2024 - 2025',
    achievements: [
      'Led AI-powered web application development',
      'Integrated autonomous agents into production systems',
      'Built responsive UIs with React and Next.js',
      'Designed robust APIs for AI-driven workflows',
    ],
    technologies: ['TypeScript', 'Python', 'React', 'Next.js', 'AI Integration', 'Autonomous Agents'],
  },
  {
    company: '8base',
    role: 'Full Stack Developer',
    duration: '2023 - 2025',
    achievements: [
      'Developed microservices architecture with AI capabilities',
      'Implemented real-time data processing systems',
      'Built scalable frontend features in React',
      'Enhanced system modularity and maintainability',
    ],
    technologies: ['React', 'Node.js', 'Microservices', 'AI Integration', 'TypeScript'],
  },
  {
    company: 'Kualty',
    role: 'Full Stack Developer',
    duration: '2022 - 2023',
    achievements: [
      'Built cross-platform marketplace (PWA & Mobile)',
      'Implemented offline-capable Progressive Web App',
      'Developed React Native mobile application',
      'Optimized app performance and user experience',
    ],
    technologies: ['React', 'React Native', 'TypeScript', 'PWA', 'Mobile Development'],
  },
];

/**
 * ExperienceTimeline Component
 * Interactive timeline of work experience
 */
export function ExperienceTimeline({ className }: ExperienceTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!timelineRef.current || prefersReducedMotion()) {
      return;
    }

    const cards = Array.from(timelineRef.current.children);
    gsap.set(cards, {
      opacity: 0,
      x: -60,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !timelineRef.current || prefersReducedMotion()) {
      return;
    }

    const cards = Array.from(timelineRef.current.children);
    gsap.to(cards, {
      opacity: 1,
      x: 0,
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
      {/* Heading */}
      <h2 className="font-heading text-5xl md:text-6xl uppercase mb-12 leading-tight">
        Experience_Timeline
      </h2>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[4px] bg-foreground" />

        {/* Experience Cards */}
        <div ref={timelineRef} className="space-y-12 pl-8 md:pl-24">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-8 md:-left-24 top-6 w-8 h-8 bg-primary border-[3px] border-foreground" />

              {/* Card */}
              <div
                className={cn(
                  'border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground p-6 md:p-8',
                  'transition-all duration-200',
                  'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px] hover:shadow-foreground',
                  exp.current ? 'bg-primary/10' : 'bg-bg-elevated'
                )}
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-heading text-2xl md:text-3xl uppercase font-bold">
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <Badge variant="primary" className="text-xs">
                        CURRENT
                      </Badge>
                    )}
                  </div>
                  <div className="text-xl font-bold text-foreground/90">{exp.role}</div>
                  <div className="text-sm font-mono text-foreground/60 mt-1">{exp.duration}</div>
                </div>

                {/* Achievements */}
                <ul className="space-y-2 mb-6">
                  {exp.achievements.map((achievement, aidx) => (
                    <li key={aidx} className="flex items-start gap-3 text-foreground/90">
                      <span className="text-primary font-bold mt-1">&gt;</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, tidx) => (
                    <Badge key={tidx} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
