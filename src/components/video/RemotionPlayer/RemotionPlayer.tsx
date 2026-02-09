'use client';

import { Player } from '@remotion/player';
import { cn } from '@/lib/utils';
import type { RemotionPlayerProps } from './RemotionPlayer.types';

/**
 * RemotionPlayer Component
 * Wraps @remotion/player with Neo-Brutalist design system styling
 */
export function RemotionPlayer({
  component,
  compositionWidth = 1920,
  compositionHeight = 1080,
  fps = 30,
  durationInFrames = 90,
  inputProps = {},
  autoPlay = false,
  loop = true,
  controls = true,
  className,
}: RemotionPlayerProps) {
  return (
    <div className={cn('w-full h-full relative bg-zinc-900 rounded overflow-hidden', className)}>
      <Player
        component={component}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        fps={fps}
        durationInFrames={durationInFrames}
        inputProps={inputProps}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        style={{
          width: '100%',
          height: '100%',
        }}
        clickToPlay
      />
    </div>
  );
}
