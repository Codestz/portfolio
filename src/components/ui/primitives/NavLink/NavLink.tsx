import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from './NavLink.types';

/**
 * NavLink Component
 *
 * Navigation link with Neo-Brutalist hover effects
 *
 * @example
 * <NavLink href="/blog">Blog</NavLink>
 * <NavLink href="/projects" active>Projects</NavLink>
 *
 * Features:
 * - Next.js Link integration
 * - Active state
 * - Hover animations
 */

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, active = false, className, children, ...props }, ref) => {
    const linkClasses = cn(
      'font-bold uppercase tracking-tighter',
      'px-2 transition-colors duration-200',
      'hover:bg-primary hover:text-white',
      active && 'bg-primary text-white',
      className
    );

    return (
      <Link
        ref={ref}
        href={href}
        className={linkClasses}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';
