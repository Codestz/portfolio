'use client';

import { forwardRef, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from './Button.types';
import { PolymorphicRef } from '@/lib/types/ui.types';

/**
 * Button Component
 *
 * A polymorphic, accessible button component following Neo-Brutalist design
 *
 * @example
 * // As button
 * <Button variant="primary">Click me</Button>
 *
 * // As link
 * <Button as="a" href="/about">About</Button>
 *
 * // As Next.js Link
 * <Button as={Link} href="/projects">Projects</Button>
 *
 * Features:
 * - Polymorphic (can render as any element)
 * - Full accessibility (ARIA, keyboard navigation)
 * - Loading state
 * - Icon support
 * - Type-safe variants
 */

 // Loading spinner component
 const LoadingSpinner = () => (
   <span role="status" className="inline-flex">
     <span className="sr-only">Loading...</span>
     <svg
       className="animate-spin h-4 w-4"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       aria-hidden="true"
     >
       <circle
         className="opacity-25"
         cx="12"
         cy="12"
         r="10"
         stroke="currentColor"
         strokeWidth="4"
       />
       <path
         className="opacity-75"
         fill="currentColor"
         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
       />
     </svg>
   </span>
 );

type ButtonComponent = <C extends ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

// Polymorphic forwardRef requires type assertion due to TypeScript limitations with generic components
// TypeScript cannot properly infer the relationship between the generic component type and forwardRef's
// ref parameter, so we need to use @ts-expect-error to suppress the type mismatch error
export const Button: ButtonComponent =
  forwardRef(
    // @ts-expect-error - forwardRef does not support generic component types with polymorphic refs
    <C extends ElementType = 'button'>(
      {
      as,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      type,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';

    // Base styles matching brutal-btn from globals.css
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-bold uppercase
      transition-all duration-100
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      border-[3px] border-foreground
    `;

    // Variant styles using semantic design tokens
    const variantStyles = {
      primary: `
        bg-primary text-white
        shadow-[4px_4px_0px_0px] shadow-foreground
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground
        active:translate-y-0 active:shadow-[2px_2px_0px_0px] active:shadow-foreground
      `,
      secondary: `
        bg-secondary text-secondary-text
        shadow-[4px_4px_0px_0px] shadow-foreground
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground
        active:translate-y-0 active:shadow-[2px_2px_0px_0px] active:shadow-foreground
      `,
      outline: `
        bg-bg-elevated text-foreground
        shadow-[4px_4px_0px_0px] shadow-foreground
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground
        active:translate-y-0 active:shadow-[2px_2px_0px_0px] active:shadow-foreground
      `,
      ghost: `
        border-transparent bg-transparent text-foreground shadow-none
        hover:bg-primary hover:text-white hover:border-foreground
        hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground
        active:shadow-none
      `,
    };

    // Size styles - responsive
    const sizeStyles = {
      sm: 'px-4 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm',
      md: 'px-6 py-2 text-sm sm:px-8 sm:py-3 sm:text-base',
      lg: 'px-6 py-2.5 text-base sm:px-8 sm:py-3 md:px-10 md:py-4 md:text-xl',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Combine all styles
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      className
    );

    // Build component props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic component requires dynamic props
    const componentProps: any = {
      ...props,
      ref,
      className: buttonClasses,
      'aria-busy': loading,
      'aria-disabled': disabled || loading,
      // Add type attribute for button elements
      ...(Component === 'button' && {
        type: type || 'button',
        disabled: disabled || loading,
      }),
      // Add disabled for input elements
      ...(Component === 'input' && {
        disabled: disabled || loading,
      }),
    };

    return (
      <Component {...componentProps}>
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </Component>
    );
    }
  ) as ButtonComponent;

// @ts-expect-error - ButtonComponent type doesn't include displayName property
Button.displayName = 'Button';
