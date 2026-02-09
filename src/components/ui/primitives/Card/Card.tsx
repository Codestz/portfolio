import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './Card.types';

/**
 * Card Component (Compound Component Pattern)
 *
 * A flexible card component with subcomponents for composition
 *
 * @example
 * <Card variant="elevated">
 *   <Card.Header>
 *     <h3>Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Content</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 *
 * Features:
 * - Compound component pattern for flexibility
 * - Multiple variants
 * - Hoverable state
 * - Semantic HTML support
 * - Neo-Brutalist design
 */

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hoverable = false,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles matching brutal-card from globals.css
    const baseStyles = `
      border-[3px] border-foreground
      shadow-[8px_8px_0px_0px] shadow-foreground
      transition-all duration-150
    `;

    // Variant styles using semantic tokens
    const variantStyles = {
      default: `
        bg-bg-elevated
      `,
      elevated: `
        bg-bg-elevated
      `,
      outlined: `
        bg-transparent
      `,
    };

    // Hoverable styles
    const hoverStyles = hoverable
      ? `
        cursor-pointer
        hover:-translate-x-1 hover:-translate-y-1
        hover:shadow-[12px_12px_0px_0px] hover:shadow-primary
      `
      : '';

    const cardClasses = cn(
      baseStyles,
      variantStyles[variant],
      hoverStyles,
      className
    );

    return (
      <Component ref={ref} className={cardClasses} {...props}>
        {children}
      </Component>
    );
  }
);

CardRoot.displayName = 'Card';

/**
 * Card Header Subcomponent
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 pb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'Card.Header';

/**
 * Card Body Subcomponent
 */
const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'Card.Body';

/**
 * Card Footer Subcomponent
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 pt-4 flex items-center gap-3', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'Card.Footer';

/**
 * Compound Card Component
 * Export root component with subcomponents attached
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
