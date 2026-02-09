import { cn } from '@/lib/utils';
import type { HighlightTextProps } from './HighlightText.types';

export type { HighlightTextProps };

/**
 * HighlightText Component
 * Inline text highlighting with Neo-Brutalist style
 */
export function HighlightText({ children, variant = 'secondary', className }: HighlightTextProps) {
  const variants = {
    secondary: 'bg-secondary text-secondary-text px-2',
    primary: 'bg-primary text-white px-2',
    underline: 'italic underline',
  };

  return <span className={cn(variants[variant], className)}>{children}</span>;
}
