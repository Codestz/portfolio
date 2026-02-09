'use client';

import { useEffect, useRef } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import gsap from 'gsap';

/**
 * 404 Not Found Page
 * Custom error page with Neo-Brutalist design
 */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current || !codeRef.current) return;

    const tl = gsap.timeline();

    // Animate in the error code
    tl.fromTo(
      codeRef.current,
      { opacity: 0, scale: 0.8, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
      .fromTo(
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
          className="mb-8 inline-block border-[6px] border-foreground bg-secondary shadow-[16px_16px_0px_0px] shadow-foreground p-8"
        >
          <h1 className="font-heading text-9xl md:text-[12rem] uppercase leading-none text-secondary-text">
            404
          </h1>
        </div>

        {/* Content */}
        <div ref={containerRef} className="space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl uppercase mb-4">
            Page_Not_Found
          </h2>

          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            Looks like this page took a wrong turn in the code garden. The route you&apos;re looking for
            doesn&apos;t exist... yet.
          </p>

          <div className="border-l-[4px] border-secondary bg-secondary/10 p-6 max-w-xl mx-auto">
            <p className="font-mono text-sm text-foreground/80">
              <span className="text-secondary font-bold">&gt;</span> Error: Cannot GET{' '}
              {typeof window !== 'undefined' && window.location.pathname}
              <br />
              <span className="text-secondary font-bold">&gt;</span> Status: 404
              <br />
              <span className="text-secondary font-bold">&gt;</span> Suggestion: Try navigating
              back to safety
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              as="a"
              href="/"
              variant="primary"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
            >
              Go_Home
            </Button>
            <Button
              as="button"
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Go_Back
            </Button>
          </div>

          {/* Fun Message */}
          <div className="pt-8">
            <p className="text-sm text-foreground/60 font-mono">
              Lost? Try the navigation above or search for what you need.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
