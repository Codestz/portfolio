'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import gsap from 'gsap';

interface AnimatedContentGridProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * AnimatedContentGrid Component
 * Wraps content grid with scroll-triggered stagger animations
 */
export function AnimatedContentGrid({ children, className, id }: AnimatedContentGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const hasInitialized = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  // Set initial hidden state immediately
  useEffect(() => {
    if (!gridRef.current || hasInitialized.current || prefersReducedMotion()) {
      return;
    }

    const gridItems = Array.from(gridRef.current.children);

    // Set initial state immediately (hidden)
    gsap.set(gridItems, {
      opacity: 0,
      y: 80,
      scale: 0.9,
    });

    hasInitialized.current = true;
  }, []);

  // Animate grid items when in view
  useEffect(() => {
    if (!isInView || hasAnimated.current || !gridRef.current || prefersReducedMotion()) {
      return;
    }

    const gridItems = Array.from(gridRef.current.children);

    // Animate in with stagger
    gsap.to(gridItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.15,
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  return (
    <div ref={triggerRef}>
      <div ref={gridRef} id={id} className={className}>
        {children}
      </div>
    </div>
  );
}
