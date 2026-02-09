'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Download } from 'lucide-react';
import { Button, Badge } from '@/components/ui/primitives';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import type { HeroIntroductionProps, StatCard } from './HeroIntroduction.types';

const STATS: StatCard[] = [
  { value: '5+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Shipped' },
  { value: '4', label: 'Companies' },
];

const TITLES = [
  'Software Engineer II',
  'AI Integration Specialist',
  'Full-Stack Developer',
  'Performance Optimizer',
];

/**
 * HeroIntroduction Component
 * About page hero with photo, animated titles, and stats
 */
export function HeroIntroduction({ className }: HeroIntroductionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [currentTitle, setCurrentTitle] = useState(0);

  // Entrance animation
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -60, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      );
  }, []);

  // Rotating title effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % TITLES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div ref={imageRef}>
          <div className="relative border-[4px] border-foreground shadow-[12px_12px_0px_0px] shadow-foreground bg-bg-elevated overflow-hidden">
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
        <div ref={contentRef}>
          {/* Location Badge */}
          <Badge variant="primary" className="mb-4">
            <MapPin className="w-4 h-4 inline mr-2" />
            Medellín, Colombia
          </Badge>

          {/* Name */}
          <h1 className="font-heading text-6xl md:text-7xl uppercase mb-4 leading-tight">
            Esteban_Estrada
          </h1>

          {/* Animated Title */}
          <div className="mb-6 h-12 flex items-center">
            <div className="text-2xl md:text-3xl font-bold text-primary font-mono">
              &gt;_{' '}
              <span
                key={currentTitle}
                className={cn(
                  'inline-block transition-all duration-500',
                  'animate-in fade-in slide-in-from-bottom-2'
                )}
              >
                {TITLES[currentTitle]}
              </span>
            </div>
          </div>

          {/* Intro */}
          <p className="text-xl text-foreground/90 mb-8 leading-relaxed">
            Building scalable, high-performance applications with modern full-stack technologies.
            Passionate about AI integration, autonomous agents, and creating exceptional user experiences.
          </p>

          {/* Download Resume */}
          <Button
            as="a"
            href="/profile.pdf"
            download
            variant="secondary"
            size="lg"
            rightIcon={<Download className="w-5 h-5" />}
          >
            Download_Resume
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="border-[3px] border-foreground bg-bg-elevated shadow-[6px_6px_0px_0px] shadow-foreground p-6 text-center"
          >
            <div className="text-5xl font-bold text-primary mb-2 font-mono">{stat.value}</div>
            <div className="text-lg font-bold uppercase text-foreground/80">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
