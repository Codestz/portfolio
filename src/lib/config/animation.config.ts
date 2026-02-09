import type { DurationScale, EasingPreset } from '@/lib/types/animation.types';

/**
 * Animation Configuration Constants
 * Central configuration for all GSAP animations across the application
 */

/**
 * Duration scales (in seconds)
 */
export const DURATION: Record<DurationScale, number> = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
} as const;

/**
 * Easing presets for Neo-Brutalist feel
 * Snappy, energetic animations
 */
export const EASING: Record<string, EasingPreset> = {
  default: 'power2.out',
  snap: 'power3.out',
  bounce: 'back.out',
  smooth: 'power1.out',
} as const;

/**
 * Stagger timings for sequential animations
 */
export const STAGGER = {
  cards: 0.1,
  list: 0.05,
  text: 0.03,
  fast: 0.02,
} as const;

/**
 * ScrollTrigger defaults
 */
export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  markers: false, // Set to true for debugging
} as const;

/**
 * Parallax speed multipliers
 */
export const PARALLAX_SPEED = {
  subtle: 0.1,
  normal: 0.3,
  strong: 0.5,
} as const;

/**
 * Common animation distances
 */
export const DISTANCE = {
  small: 20,
  medium: 40,
  large: 60,
} as const;

/**
 * Performance settings
 */
export const PERFORMANCE = {
  reducedMotionEnabled: true,
  willChangeTimeout: 200, // ms to remove will-change after animation
  throttleDelay: 16, // ~60fps
} as const;
