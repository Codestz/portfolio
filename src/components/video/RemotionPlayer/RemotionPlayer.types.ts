/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * RemotionPlayer Component Props
 */
export interface RemotionPlayerProps {
  /**
   * The Remotion composition component to render
   */
  component: React.ComponentType<any>;

  /**
   * Width of the composition in pixels
   * @default 1920
   */
  compositionWidth?: number;

  /**
   * Height of the composition in pixels
   * @default 1080
   */
  compositionHeight?: number;

  /**
   * Frames per second
   * @default 30
   */
  fps?: number;

  /**
   * Duration of the composition in frames
   * @default 90
   */
  durationInFrames?: number;

  /**
   * Props to pass to the composition component
   * @default {}
   */
  inputProps?: Record<string, any>;

  /**
   * Auto-play the video on mount
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Loop the video
   * @default true
   */
  loop?: boolean;

  /**
   * Show player controls
   * @default true
   */
  controls?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
