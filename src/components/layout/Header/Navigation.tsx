'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import type { NavigationProps } from './Header.types';

/**
 * Navigation Component
 * Desktop horizontal navigation with active state indicators
 */
export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/experiments', label: 'Experiments' },
    { href: '/experience', label: 'Experience' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className={cn('hidden md:flex items-center gap-2', className)} aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          active={pathname === item.href}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
