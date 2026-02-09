import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface HighlightTextProps {
  children: ReactNode;
  variant?: 'secondary' | 'primary' | 'underline';
  className?: string;
}

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
