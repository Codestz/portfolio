'use client';

import { useEffect, useRef } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import gsap from 'gsap';

/**
 * Error Boundary Page
 * Catches runtime errors and displays friendly message
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log the error to console or error reporting service
    console.error('Application error:', error);
  }, [error]);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current || !codeRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      codeRef.current,
      { opacity: 0, scale: 0.8, rotate: -5 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }
    ).fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="max-w-3xl w-full text-center">
        {/* Error Code */}
        <div
          ref={codeRef}
          className="mb-8 inline-block border-[6px] border-foreground bg-primary shadow-[16px_16px_0px_0px] shadow-foreground p-8"
        >
          <h1 className="font-heading text-9xl md:text-[12rem] uppercase leading-none text-white">
            500
          </h1>
        </div>

        {/* Content */}
        <div ref={containerRef} className="space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl uppercase mb-4">
            Something_Went_Wrong
          </h2>

          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            Our code hit an unexpected snag. Don&apos;t worry, it&apos;s not you—it&apos;s us. The error has been
            logged and we&apos;ll fix it soon.
          </p>

          {/* Error Details */}
          <div className="border-l-[4px] border-primary bg-primary/10 p-6 max-w-xl mx-auto">
            <p className="font-mono text-sm text-foreground/80 text-left">
              <span className="text-primary font-bold">&gt;</span> Error: {error.message}
              <br />
              <span className="text-primary font-bold">&gt;</span> Status: 500
              {error.digest && (
                <>
                  <br />
                  <span className="text-primary font-bold">&gt;</span> ID: {error.digest}
                </>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              as="button"
              onClick={reset}
              variant="primary"
              size="lg"
              leftIcon={<RefreshCw className="w-5 h-5" />}
            >
              Try_Again
            </Button>
            <Button
              as="a"
              href="/"
              variant="outline"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
            >
              Go_Home
            </Button>
          </div>

          {/* Technical Info */}
          <div className="pt-8">
            <details className="text-left max-w-2xl mx-auto">
              <summary className="cursor-pointer font-mono text-sm text-foreground/60 hover:text-foreground">
                Show technical details
              </summary>
              <pre className="mt-4 p-4 bg-foreground/5 border-[2px] border-foreground/20 rounded text-xs overflow-x-auto">
                {error.stack || error.message}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}
