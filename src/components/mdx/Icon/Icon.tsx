import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IconProps } from './Icon.types';

/**
 * Icon Component
 * Allows using Lucide icons in MDX content
 * Usage: <Icon name="Check" /> or <Icon name="X" color="red" />
 */
export function Icon({ name, size = 20, color, className }: IconProps) {
  // Get the icon component from Lucide
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
  }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={cn('inline-block', className)}
    />
  );
}
