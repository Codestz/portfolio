'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ParallaxConfig } from '@/lib/types/animation.types';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Parallax effect hook
 * Returns ref and transform styles for smooth parallax scrolling
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  config: ParallaxConfig = {}
) {
  const { speed = 0.5, direction = 'vertical', disabled = false } = config;

  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    // Skip if reduced motion is preferred or on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion() || isMobile) {
      return;
    }

    const element = ref.current;

    // Create ScrollTrigger for parallax
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const distance = (progress - 0.5) * 100 * speed;

        if (direction === 'vertical') {
          setTransform(`translate3d(0, ${distance}px, 0)`);
        } else {
          setTransform(`translate3d(${distance}px, 0, 0)`);
        }
      },
    });

    // Cleanup
    return () => {
      scrollTriggerRef.current?.kill();
      setTransform('translate3d(0, 0, 0)');
    };
  }, [speed, direction, disabled]);

  return {
    ref,
    style: {
      transform,
      willChange: disabled ? 'auto' : 'transform',
    },
  };
}
