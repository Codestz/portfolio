'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { IconButtonProps } from './IconButton.types';

/**
 * IconButton Component
 * Neo-Brutalist icon button for actions like theme toggle
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'default', size = 'md', className, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'border-[3px] border-foreground',
      'font-bold uppercase',
      'transition-all duration-100',
      'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
      'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    );

    const variantStyles = {
      default: 'bg-bg-elevated shadow-[2px_2px_0px_0px] shadow-foreground',
      primary: 'bg-primary text-white shadow-[2px_2px_0px_0px] shadow-foreground',
      secondary: 'bg-secondary text-secondary-text shadow-[2px_2px_0px_0px] shadow-foreground',
    };

    const sizeStyles = {
      sm: 'p-2 text-sm',
      md: 'p-3 text-base',
      lg: 'p-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
