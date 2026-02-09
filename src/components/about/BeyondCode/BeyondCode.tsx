'use client';

import { useRef, useEffect } from 'react';
import { Gamepad2, Car, Tv, Code2 } from 'lucide-react';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { BeyondCodeProps, Interest } from './BeyondCode.types';

const INTERESTS: Interest[] = [
  {
    icon: Gamepad2,
    title: 'Video Games',
    description: 'Unwinding with gaming sessions. From strategy games to open-world adventures, it\'s my way to disconnect and recharge.',
    color: 'text-[#FF6B6B]',
  },
  {
    icon: Car,
    title: 'Driving',
    description: 'There\'s something therapeutic about hitting the road. Weekend drives through Colombian landscapes clear my mind.',
    color: 'text-primary',
  },
  {
    icon: Tv,
    title: 'Watching Series',
    description: 'Binge-watching quality shows. From sci-fi thrillers to tech documentaries, always looking for the next great story.',
    color: 'text-secondary',
  },
  {
    icon: Code2,
    title: 'Exploring Code',
    description: 'Diving into new frameworks, reading source code, and experimenting with emerging technologies. The learning never stops.',
    color: 'text-[#9C27B0]',
  },
];

/**
 * BeyondCode Component
 * Personal interests and side projects
 */
export function BeyondCode({ className }: BeyondCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!containerRef.current || !gridRef.current || prefersReducedMotion()) {
      return;
    }

    gsap.set(containerRef.current.querySelector('h2'), {
      opacity: 0,
      y: 40,
    });

    gsap.set(gridRef.current.children, {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !containerRef.current || !gridRef.current || prefersReducedMotion()) {
      return;
    }

    const tl = gsap.timeline();

    tl.to(containerRef.current.querySelector('h2'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(
      gridRef.current.children,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.3)',
      },
      '-=0.4'
    );

    hasAnimated.current = true;
  }, [isInView]);

  return (
    <section ref={triggerRef} className={className}>
      <div ref={containerRef} className="border-[4px] border-foreground bg-primary/10 shadow-[8px_8px_0px_0px] shadow-foreground p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Heading */}
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-8 sm:mb-10 md:mb-12 leading-tight text-center">
          Beyond_Code
        </h2>

        {/* Interests Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {INTERESTS.map((interest, idx) => {
            const Icon = interest.icon;
            return (
              <div
                key={idx}
                className="border-[3px] border-foreground bg-white shadow-[4px_4px_0px_0px] shadow-foreground p-4 sm:p-5 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground"
              >
                <div className={cn('mb-3 sm:mb-4', interest.color)}>
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl uppercase mb-2 text-black">{interest.title}</h3>
                <p className="text-sm sm:text-base text-black/80 leading-relaxed">{interest.description}</p>
              </div>
            );
          })}
        </div>

        {/* Philosophy */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl font-bold">
            Balance is key. Whether gaming, driving, or watching a great series, these moments away from the screen
            fuel creativity and fresh perspectives when I return to code.
          </p>
        </div>
      </div>
    </section>
  );
}
