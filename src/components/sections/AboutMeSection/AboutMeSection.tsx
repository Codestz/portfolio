'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/primitives';
import { ArrowRight } from 'lucide-react';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import gsap from 'gsap';

export interface AboutMeSectionProps {
  className?: string;
}

/**
 * AboutMeSection Component
 * Personal introduction section with image and bio
 */
export function AboutMeSection({ className }: AboutMeSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!imageRef.current || !contentRef.current || prefersReducedMotion()) {
      return;
    }

    // Set initial state
    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.95,
    });
  }, []);

  useEffect(() => {
    if (
      !isInView ||
      hasAnimated.current ||
      !imageRef.current ||
      !contentRef.current ||
      prefersReducedMotion()
    ) {
      return;
    }

    // Animate image and content with stagger
    gsap.to([imageRef.current, contentRef.current], {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      stagger: 0.25,
      ease: 'power3.out',
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  return (
    <section ref={triggerRef} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* Image */}
        <div ref={imageRef} className="order-2 md:order-1">
          <div className="relative border-[4px] border-foreground shadow-[8px_8px_0px_0px] shadow-foreground bg-bg-elevated overflow-hidden">
            <Image
              src="/me.jpg"
              alt="Esteban Estrada"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="order-1 md:order-2">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-4 sm:mb-6 leading-tight">
            About_Me
          </h2>

          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-foreground/90 mb-6 sm:mb-8">
            <p>
              <strong className="font-bold text-foreground">Senior Software Engineer</strong> at
              Recurly with a passion for building scalable, high-performance applications that solve
              real-world problems.
            </p>

            <p>
              I specialize in{' '}
              <strong className="font-bold underline decoration-secondary decoration-2">
                AI integration
              </strong>
              , modern web development, and creating exceptional user experiences. Currently
              exploring the intersection of autonomous agents and frontend architecture.
            </p>

            <p>
              Based in <strong className="font-bold text-foreground">Medellín, Colombia</strong>,
              I&apos;m constantly experimenting with cutting-edge technologies and sharing what I
              learn through tutorials and case studies.
            </p>
          </div>

          <Button
            as="a"
            href="/about"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Read Full Story
          </Button>
        </div>
      </div>
    </section>
  );
}
