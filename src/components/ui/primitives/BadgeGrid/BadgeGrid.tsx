'use client';

import { cn } from '@/lib/utils';
import type { BadgeGridItem, BadgeGridProps } from './BadgeGrid.types';

export type { BadgeGridItem, BadgeGridProps };

/**
 * BadgeGrid Component
 * Grid layout for displaying multiple badges
 * 
 * @example
 * <BadgeGrid badges={['Next.js', 'React', 'TypeScript']} />
 * <BadgeGrid badges={[{ label: 'Featured', variant: 'primary' }]} variant="inverse" />
 */
export function BadgeGrid({ badges, variant = 'default', className }: BadgeGridProps) {
  const variantStyles = {
    default: 'border-foreground bg-bg-elevated text-foreground',
    primary: 'border-foreground bg-primary text-white',
    inverse: 'border-white bg-white text-black',
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge, index) => {
        const label = typeof badge === 'string' ? badge : badge.label;
        const badgeId = typeof badge === 'string' ? `${label}-${index}` : badge.id || `badge-${index}`;
        const badgeClassName = typeof badge === 'string' ? '' : badge.className;

        return (
          <span
            key={badgeId}
            className={cn(
              'inline-block px-2 py-1 border-2 text-xs font-bold uppercase',
              variantStyles[variant],
              badgeClassName
            )}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
