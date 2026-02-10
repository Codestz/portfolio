'use client';

import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useScrollTrigger } from '@/lib/hooks';

export interface AnimatedSectionProps {
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

  /**
   * Enable animations for this section
   * @default true
   */
  animate?: boolean;
}

/**
 * AnimatedSection Component
 * Section with coordinated GSAP animations for title, description, and children
 * Creates a harmonious reveal sequence
 */
export function AnimatedSection({
  title,
  description,
  children,
  className,
  id,
  size = 'default',
  animate = true,
}: AnimatedSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);
  const hasInitialized = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 75%',
  });

  const sizeStyles = {
    sm: 'py-6 sm:py-8 md:py-12',
    default: 'py-8 sm:py-12 md:py-16',
    lg: 'py-12 sm:py-16 md:py-24',
  };

  // Set initial hidden state
  useEffect(() => {
    if (!animate || hasInitialized.current || prefersReducedMotion()) {
      return;
    }

    const elements = [titleRef.current, descriptionRef.current].filter(Boolean);

    // Simple fade + subtle upward movement
    gsap.set(elements, {
      opacity: 0,
      y: 20,
    });

    hasInitialized.current = true;
  }, [animate]);

  // Animate in sequence when in view
  useEffect(() => {
    if (!animate || !isInView || hasAnimated.current || prefersReducedMotion()) {
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    // Title fades in first
    if (titleRef.current) {
      timeline.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Description follows (slight overlap)
    if (descriptionRef.current) {
      timeline.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3' // Start 0.3s before title finishes
      );
    }
  }, [isInView, animate]);

  return (
    <section
      ref={triggerRef}
      id={id}
      className={cn('max-w-7xl mx-auto px-4 sm:px-6 md:px-12', sizeStyles[size], className)}
    >
      {/* Section Header */}
      {(title || description) && (
        <header className="mb-8 sm:mb-12">
          {title && (
            <h1
              ref={titleRef}
              className="font-heading text-4xl sm:text-5xl md:text-7xl leading-tight uppercase mb-4"
            >
              {title}
            </h1>
          )}
          {description && (
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl"
            >
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
