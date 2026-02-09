'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollTriggerConfig } from '@/lib/types/animation.types';
import { SCROLL_TRIGGER_DEFAULTS } from '@/lib/config/animation.config';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Declarative scroll trigger hook
 * Returns ref and isInView state for conditional rendering
 */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  config: Omit<ScrollTriggerConfig, 'trigger'> = {}
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Skip if reduced motion is preferred
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInView(true);
      return;
    }

    // Create ScrollTrigger instance
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      ...SCROLL_TRIGGER_DEFAULTS,
      ...config,
      onEnter: () => {
        setIsInView(true);
        config.onEnter?.();
      },
      onLeave: () => {
        setIsInView(false);
        config.onLeave?.();
      },
      onEnterBack: () => {
        setIsInView(true);
        config.onEnterBack?.();
      },
      onLeaveBack: () => {
        setIsInView(false);
        config.onLeaveBack?.();
      },
    });

    // Cleanup
    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [config]);

  return { ref, isInView };
}
