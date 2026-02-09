import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  /**
   * Section title
   */
  title?: string;

  /**
   * Optional description/subtitle
   */
  description?: string;

  /**
   * Section content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ID for anchor links
   */
  id?: string;

  /**
   * Section size variant
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
}

/**
 * Section Component
 * A semantic section wrapper with optional title and description.
 * Provides consistent spacing and layout for page sections.
 */
export function Section({
  title,
  description,
  children,
  className,
  id,
  size = 'default',
}: SectionProps) {
  const sizeStyles = {
    sm: 'py-8 md:py-12',
    default: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={cn(
        'max-w-7xl mx-auto px-6 md:px-12',
        sizeStyles[size],
        className
      )}
    >
      {/* Section Header */}
      {(title || description) && (
        <header className="mb-12">
          {title && (
            <h1 className="font-heading text-5xl md:text-7xl leading-tight uppercase mb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
              {description}
            </p>
          )}
        </header>
      )}

      {/* Section Content */}
      {children}
    </section>
  );
}
