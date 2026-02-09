import { VariantMap } from '@/lib/types/ui.types';
import { cn } from './style.utils';

/**
 * Create variant class name utility
 * Type-safe variant styling
 */

export function createVariants<T extends string>(
  baseClasses: string,
  variantMap: VariantMap<T>
): (variant: T) => string {
  return (variant: T) => {
    const variantClasses = variantMap[variant];
    return cn(baseClasses, variantClasses);
  };
}

/**
 * Create size class name utility
 */

export function createSizes<T extends string>(
  sizeMap: VariantMap<T>
): (size: T) => string {
  return (size: T) => sizeMap[size];
}

/**
 * Compose multiple class name functions
 */

export function composeClasses(
  ...classFns: Array<() => string>
): string {
  return classFns.map(fn => fn()).join(' ').trim();
}
