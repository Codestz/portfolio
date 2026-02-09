'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * use3DInteraction Hook
 * Tracks mouse position relative to viewport for 3D scene interactions
 * Returns normalized coordinates (-1 to 1)
 */
export function use3DInteraction() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}
