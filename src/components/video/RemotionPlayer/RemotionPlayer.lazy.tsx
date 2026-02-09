'use client';

import { lazy, Suspense } from 'react';
import type { RemotionPlayerProps } from './RemotionPlayer.types';

// Lazy load the Remotion player to reduce initial bundle size
const RemotionPlayer = lazy(() =>
  import('./RemotionPlayer').then((mod) => ({ default: mod.RemotionPlayer }))
);

/**
 * Skeleton Loader
 * Displays while Remotion player is loading
 */
function PlayerSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-foreground/10 animate-pulse border-[3px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground">
      <div className="text-secondary text-xs font-mono">
        Loading Video Player...
      </div>
    </div>
  );
}

/**
 * RemotionPlayerLazy Component
 * Lazy-loaded Remotion player with loading fallback
 */
export function RemotionPlayerLazy(props: RemotionPlayerProps) {
  return (
    <Suspense fallback={<PlayerSkeleton />}>
      <RemotionPlayer {...props} />
    </Suspense>
  );
}
