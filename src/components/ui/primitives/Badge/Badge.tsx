import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { BadgeProps } from './Badge.types';

/**
 * Badge Component
 *
 * Small inline component for tags, status, categories with Neo-Brutalist design
 *
 * @example
 * <Badge variant="primary">Featured</Badge>
 * <Badge variant="success">New</Badge>
 * <Badge variant="secondary" pill>Hot</Badge>
 *
 * Features:
 * - Multiple semantic variants
 * - Pill shape option (still bold)
 * - Accessible inline element
 * - Bold Neo-Brutalist design with shadows
 */

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', pill = false, className, children, ...props }, ref) => {
    // Neo-Brutalist base styles - bold and brutal
    const baseStyles = `
      inline-flex items-center justify-center
      font-bold text-xs uppercase tracking-wider
      px-3 py-1.5
      border-[3px] border-foreground
      shadow-[2px_2px_0px_0px] shadow-foreground
      transition-all duration-100
    `;

    // Shape styles - Neo-Brutalist allows pills but they're still bold
    const shapeStyles = pill ? 'rounded-full' : 'rounded-none';

    // Variant styles - Bold, solid colors matching design system
    const variantStyles = {
      default: `
        bg-bg-elevated
        text-foreground
      `,
      primary: `
        bg-primary
        text-white
        border-primary
      `,
      secondary: `
        bg-secondary
        text-secondary-text
        border-foreground
      `,
      success: `
        bg-accent-2
        text-foreground
        border-foreground
      `,
      warning: `
        bg-secondary
        text-secondary-text
        border-foreground
      `,
      error: `
        bg-accent-1
        text-white
        border-accent-1
      `,
    };

    const badgeClasses = cn(baseStyles, shapeStyles, variantStyles[variant], className);

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
