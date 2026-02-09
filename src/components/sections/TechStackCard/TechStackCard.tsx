'use client';

import { BadgeGrid } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import type { TechStackCardProps } from './TechStackCard.types';

export type { TechStackCardProps };

const defaultTechnologies = ['Next.js 16', 'TS', 'GSAP', 'R3F', 'MDX'];

/**
 * TechStackCard Component
 * Section component that uses BadgeGrid primitive for displaying tech stack
 */
export function TechStackCard({ technologies = defaultTechnologies, className }: TechStackCardProps) {
  return (
    <div
      className={cn(
        'brutal-card p-8 bg-primary text-white border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground',
        'flex flex-col',
        className
      )}
    >
      <h2 className="text-xl font-bold mb-4 uppercase">Tech_Stack</h2>
      <div className="flex-1 flex items-center">
        <BadgeGrid badges={technologies} variant="inverse" />
      </div>
    </div>
  );
}
