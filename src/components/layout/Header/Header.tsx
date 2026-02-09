'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/primitives';
import { SearchModal } from '@/components/search';
import { useGSAP } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { DURATION, EASING, STAGGER } from '@/lib/config/animation.config';
import gsap from 'gsap';
import type { HeaderProps } from './Header.types';

/**
 * Header Component
 * Terminal-aesthetic navigation with brutal card logo and theme toggle
 * Features GSAP slide-down entrance animation
 */
export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Entrance animation
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline();

    // Slide down from top with stagger
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASING.default }
    )
      .fromTo(
        navRef.current?.children || [],
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.fast,
          ease: EASING.default,
          stagger: STAGGER.fast,
        },
        '-=0.3'
      )
      .fromTo(
        searchRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: DURATION.fast, ease: EASING.bounce },
        '-=0.2'
      )
      .fromTo(
        themeToggleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: DURATION.fast, ease: EASING.bounce },
        '-=0.2'
      );
  }, []);

  const navLinks = [
    { href: '/', label: 'KNOWLEDGE_BASE' },
    { href: '/experiments', label: 'EXPERIMENTS' },
    { href: '/experience', label: 'EXPERIENCE' },
    { href: '/about', label: 'ABOUT_ME' },
  ];

  // Helper function to check if link is active (handles nested routes)
  const isLinkActive = (href: string) => {
    if (href === '/') {
      // Home should only be active on exact match
      return pathname === '/';
    }
    // For other routes, check if pathname starts with the href
    return pathname.startsWith(href);
  };

  const isDark = theme === 'dark';

  return (
    <>
    <nav
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50',
        'flex flex-wrap justify-between items-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-12 py-4 sm:py-5 md:py-6',
        'transition-all duration-300',
        scrolled
          ? 'bg-bg-elevated/95 backdrop-blur-sm border-b-[3px] border-foreground shadow-[0_4px_0px_0px] shadow-foreground/20'
          : 'bg-transparent',
        className
      )}
    >
      {/* Logo - Brutal Card */}
      <Link
        ref={logoRef}
        href="/"
        className={cn(
          'brutal-card bg-secondary text-secondary-text px-4 sm:px-5 md:px-6 py-1.5 sm:py-2',
          'text-base sm:text-lg md:text-xl font-bold italic',
          'border-[3px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground',
          'hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px] hover:shadow-foreground',
          'transition-all duration-100'
        )}
      >
        CODESTZ_V1.0
      </Link>

      {/* Desktop Navigation Links + Theme Toggle */}
      <div className="hidden md:flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Navigation Links - Terminal Style */}
        <div ref={navRef} className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-10 font-bold uppercase tracking-tighter text-xs sm:text-sm md:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-1.5 sm:px-2 py-1 transition-colors duration-100',
                isLinkActive(link.href)
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search Button */}
        <div ref={searchRef}>
          {mounted && (
            <IconButton
              icon={<Search className="w-5 h-5" aria-hidden="true" />}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              variant="default"
              size="md"
            />
          )}
        </div>

        {/* Theme Toggle */}
        <div ref={themeToggleRef}>
          {mounted && (
            <IconButton
              icon={
                <div
                  className={cn(
                    'transition-transform duration-300',
                    isDark ? 'rotate-180' : 'rotate-0'
                  )}
                >
                  {isDark ? (
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Sun className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
              }
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              variant="default"
              size="md"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {mounted && (
          <IconButton
            icon={
              <div className="w-5 h-5 flex items-center justify-center">
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" strokeWidth={2.5} />
                )}
              </div>
            }
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            variant="default"
            size="md"
          />
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>

    {/* Full-Screen Mobile Menu - Rendered via Portal */}
    {mounted && mobileMenuOpen && createPortal(
      <div className="md:hidden fixed inset-0 z-[100] bg-bg-elevated">
        <div className="flex flex-col h-full">
          {/* Menu Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b-[3px] border-foreground">
            <span className="font-heading text-xl uppercase font-bold text-foreground">Menu</span>
            <IconButton
              icon={<X className="w-6 h-6" aria-hidden="true" />}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              variant="default"
              size="md"
            />
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center items-center gap-6 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'font-heading text-3xl uppercase font-bold px-6 py-3 transition-colors duration-100',
                  'border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground',
                  'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px] hover:shadow-foreground',
                  'w-full max-w-md text-center',
                  isLinkActive(link.href)
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated hover:bg-primary hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Actions */}
          <div className="flex justify-center items-center gap-4 pb-8">
            <IconButton
              icon={<Search className="w-5 h-5" aria-hidden="true" />}
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Search"
              variant="default"
              size="md"
            />
            <IconButton
              icon={
                <div
                  className={cn(
                    'transition-transform duration-300',
                    isDark ? 'rotate-180' : 'rotate-0'
                  )}
                >
                  {isDark ? (
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Sun className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
              }
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              variant="default"
              size="md"
            />
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
