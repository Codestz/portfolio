'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import type { PostNavigationProps } from './PostNavigation.types';

/**
 * PostNavigation Component
 * Previous/Next navigation for blog posts
 */
export function PostNavigation({ previousPost, nextPost, className }: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {/* Previous Post */}
      {previousPost ? (
        <Link
          href={`/experiments/${previousPost.slug}`}
          className="group border-[3px] border-foreground bg-bg-elevated shadow-[4px_4px_0px_0px] shadow-foreground p-6 transition-all duration-200 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground"
        >
          <div className="flex items-start gap-3">
            <ArrowLeft className="w-5 h-5 mt-1 text-foreground/60 group-hover:text-primary transition-colors" />
            <div className="flex-1">
              <div className="text-xs font-mono text-foreground/60 uppercase mb-2">
                Previous Post
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {previousPost.title}
              </h3>
              <Badge variant="default" className="text-xs">
                {previousPost.category}
              </Badge>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={`/experiments/${nextPost.slug}`}
          className="group border-[3px] border-foreground bg-bg-elevated shadow-[4px_4px_0px_0px] shadow-foreground p-6 transition-all duration-200 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1 text-right">
              <div className="text-xs font-mono text-foreground/60 uppercase mb-2">
                Next Post
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {nextPost.title}
              </h3>
              <div className="flex justify-end">
                <Badge variant="default" className="text-xs">
                  {nextPost.category}
                </Badge>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 mt-1 text-foreground/60 group-hover:text-primary transition-colors" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
