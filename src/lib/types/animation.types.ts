/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Animation Configuration Types
 * TypeScript interfaces for GSAP animations and scroll triggers
 */

export interface AnimationConfig {
  // GSAP properties
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number | StaggerConfig;

  // Transform properties
  x?: number | string;
  y?: number | string;
  z?: number | string;
  rotation?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;

  // Display properties
  opacity?: number;
  autoAlpha?: number;

  // Other properties
  [key: string]: any;
}

export interface StaggerConfig {
  each?: number;
  from?: 'start' | 'center' | 'end' | number;
  amount?: number;
}

export interface ScrollTriggerConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface ParallaxConfig {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

export interface TimelineConfig {
  defaults?: AnimationConfig;
  paused?: boolean;
  repeat?: number;
  yoyo?: boolean;
}

export type EasingPreset =
  | 'power1.out'
  | 'power2.out'
  | 'power3.out'
  | 'power4.out'
  | 'back.out'
  | 'elastic.out'
  | 'bounce.out'
  | 'expo.out';

export type DurationScale = 'fast' | 'normal' | 'slow';
