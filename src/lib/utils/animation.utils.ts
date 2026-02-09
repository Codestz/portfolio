import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AnimationConfig, ScrollTriggerConfig, TimelineConfig } from '@/lib/types/animation.types';
import { DURATION, EASING, SCROLL_TRIGGER_DEFAULTS } from '@/lib/config/animation.config';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a scroll trigger with consistent defaults
 */
export function createScrollTrigger(config: ScrollTriggerConfig = {}) {
  return {
    scrollTrigger: {
      ...SCROLL_TRIGGER_DEFAULTS,
      ...config,
    },
  };
}

/**
 * Create a GSAP timeline with default settings
 */
export function createTimeline(config: TimelineConfig = {}) {
  return gsap.timeline({
    defaults: {
      duration: DURATION.normal,
      ease: EASING.default,
      ...config.defaults,
    },
    ...config,
  });
}

/**
 * Kill all animations on an element and its children
 */
export function killAnimations(element: Element | string) {
  gsap.killTweensOf(element);
  if (typeof element !== 'string') {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === element) {
        trigger.kill();
      }
    });
  }
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animation Presets
 * Reusable animation configurations
 */

/**
 * Fade in with upward motion
 */
export function fadeInUp(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    y: 40,
    duration: DURATION.normal,
    ease: EASING.default,
    ...config,
  };
}

/**
 * Fade in with scale effect
 */
export function fadeInScale(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    scale: 0.95,
    duration: DURATION.normal,
    ease: EASING.default,
    ...config,
  };
}

/**
 * Slide in from left
 */
export function slideInLeft(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    x: -60,
    duration: DURATION.normal,
    ease: EASING.default,
    ...config,
  };
}

/**
 * Slide in from right
 */
export function slideInRight(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    x: 60,
    duration: DURATION.normal,
    ease: EASING.default,
    ...config,
  };
}

/**
 * Reveal text with stagger
 */
export function revealText(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    y: 20,
    duration: DURATION.fast,
    ease: EASING.snap,
    stagger: 0.03,
    ...config,
  };
}

/**
 * Bounce in effect
 */
export function bounceIn(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    scale: 0.5,
    duration: DURATION.slow,
    ease: EASING.bounce,
    ...config,
  };
}

/**
 * Card entrance animation (fade + scale + lift)
 */
export function cardEntrance(config: AnimationConfig = {}): AnimationConfig {
  return {
    opacity: 0,
    y: 30,
    scale: 0.95,
    duration: DURATION.normal,
    ease: EASING.default,
    ...config,
  };
}

/**
 * Utility to add will-change and remove after animation
 */
export function withWillChange(
  element: Element | string,
  properties: string[],
  duration: number = 200
) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el || !(el instanceof HTMLElement)) return;

  el.style.willChange = properties.join(', ');

  setTimeout(() => {
    el.style.willChange = 'auto';
  }, duration);
}

/**
 * Refresh ScrollTrigger instances
 * Useful after DOM changes
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Get animation duration based on reduced motion preference
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Disable all animations if reduced motion is preferred
 */
export function maybeDisableAnimations(): boolean {
  const shouldDisable = prefersReducedMotion();
  if (shouldDisable) {
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
  return shouldDisable;
}
