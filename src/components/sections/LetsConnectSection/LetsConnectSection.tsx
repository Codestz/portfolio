'use client';

import { useRef, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { useScrollTrigger } from '@/lib/hooks';
import { prefersReducedMotion } from '@/lib/utils/animation.utils';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

export interface LetsConnectSectionProps {
  className?: string;
}

/**
 * LetsConnectSection Component
 * CTA section with social links and contact information
 */
export function LetsConnectSection({ className }: LetsConnectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 70%',
  });

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) {
      return;
    }

    const children = Array.from(containerRef.current.children);

    // Set initial state
    gsap.set(children, {
      opacity: 0,
      y: 50,
      scale: 0.92,
    });
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !containerRef.current || prefersReducedMotion()) {
      return;
    }

    const children = Array.from(containerRef.current.children);

    // Animate with stagger
    gsap.to(children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(1.7)',
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  }, [isInView]);

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Codestz',
      icon: Github,
      username: '@Codestz',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/esteban-estrada-01651b31b',
      icon: Linkedin,
      username: 'Esteban Estrada',
    },
    {
      name: 'Email',
      href: 'mailto:esteban.estrada.col@gmail.com',
      icon: Mail,
      username: 'esteban.estrada.col@gmail.com',
    },
  ];

  return (
    <section ref={triggerRef} className={className}>
      <div className="bg-primary text-white border-[4px] border-foreground shadow-[12px_12px_0px_0px] shadow-foreground p-6 sm:p-10 md:p-12 lg:p-16">
        <div ref={containerRef} className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Heading */}
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase mb-3 sm:mb-4 leading-tight">
              Let&apos;s_Connect
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Interested in collaborating, have questions, or just want to chat about AI and web development?
            </p>
          </div>

          {/* Social Links */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 md:p-6',
                      'bg-white text-black',
                      'border-[3px] border-foreground',
                      'transition-all duration-100',
                      'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-foreground',
                      'active:translate-y-0 active:shadow-[2px_2px_0px_0px] active:shadow-foreground'
                    )}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    <div className="text-center">
                      <div className="font-bold text-xs sm:text-sm uppercase mb-1">{link.name}</div>
                      <div className="text-[10px] sm:text-xs text-black/70">{link.username}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Button
              as="a"
              href="/about"
              variant="outline"
              size="lg"
              className="bg-white text-black border-white hover:bg-black hover:text-white hover:border-white"
            >
              Learn More About Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
