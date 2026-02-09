'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';

/**
 * Enhanced GSAP hook with automatic cleanup
 * Context-aware animation registration to prevent memory leaks
 */
export function useGSAP(
  callback: (context: gsap.Context) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Skip animations if reduced motion is preferred
    if (prefersReducedMotion()) {
      return;
    }

    // Create GSAP context for automatic cleanup
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    // Cleanup function
    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
