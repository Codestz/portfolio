'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { MobileMenuProps } from './Header.types';

/**
 * MobileMenu Component
 * Hamburger menu with full-screen overlay and GSAP animations
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLAnchorElement[]>([]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/experiments', label: 'Experiments' },
    { href: '/experience', label: 'Experience' },
    { href: '/about', label: 'About' },
  ];

  // Close menu on pathname change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // GSAP animation for menu open/close
  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Animate in
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      ).fromTo(
        menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      ).fromTo(
        navItemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      );
    } else {
      // Re-enable body scroll
      document.body.style.overflow = '';

      // Animate out
      if (menuRef.current && overlayRef.current) {
        const tl = gsap.timeline();
        tl.to(navItemsRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in',
        })
          .to(
            menuRef.current,
            { x: '100%', duration: 0.3, ease: 'power2.in' },
            '-=0.1'
          )
          .to(
            overlayRef.current,
            { opacity: 0, duration: 0.2, ease: 'power2.in' },
            '-=0.2'
          );
      }
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'md:hidden p-3',
          'border-[3px] border-foreground',
          'bg-bg-elevated',
          'transition-all duration-100',
          'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
          'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          className
        )}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l-[3px] border-foreground z-50 md:hidden"
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  'p-3',
                  'border-[3px] border-foreground',
                  'bg-bg-elevated',
                  'transition-all duration-100',
                  'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
                  'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                )}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 px-6 py-8" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  ref={(el) => {
                    if (el) navItemsRef.current[index] = el as unknown as HTMLAnchorElement;
                  }}
                >
                  <NavLink
                    href={item.href}
                    active={pathname === item.href}
                    className="text-2xl py-4 block"
                  >
                    {item.label}
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
