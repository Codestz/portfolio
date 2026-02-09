'use client';

import { useEffect, useState } from 'react';

/**
 * Reading Progress Bar
 * Shows reading progress as a horizontal bar at the top of the page
 * Neo-Brutalist style with solid color, no rounded corners
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate progress percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollPercentage)));
    };

    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-neutral-200 dark:bg-neutral-800"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
