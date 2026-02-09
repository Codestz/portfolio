'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThemeToggleProps } from './Header.types';

/**
 * ThemeToggle Component
 * Sun/Moon icon toggle with smooth rotation animation
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-12 h-12',
          'border-[3px] border-foreground',
          'bg-bg-elevated',
          className
        )}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'p-3',
        'border-[3px] border-foreground',
        'bg-bg-elevated',
        'transition-all duration-100',
        'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
        'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className={cn(
          'transition-transform duration-300',
          isDark ? 'rotate-180' : 'rotate-0'
        )}
      >
        {isDark ? (
          <Moon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Sun className="w-6 h-6" aria-hidden="true" />
        )}
      </div>
    </button>
  );
}
