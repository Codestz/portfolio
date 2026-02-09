'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LogoProps } from './Header.types';

/**
 * Logo Component
 * Text-based logo with Neo-Brutalist hover effects
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'font-bold uppercase tracking-tighter text-xl',
        'px-4 py-2',
        'border-[3px] border-foreground',
        'bg-bg-elevated',
        'transition-all duration-100',
        'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
        'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
    >
      Codestz
    </Link>
  );
}
