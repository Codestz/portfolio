'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SocialLinksProps } from './Footer.types';

/**
 * SocialLinks Component
 * Social media and contact links with hover effects
 */
export function SocialLinks({ className }: SocialLinksProps) {
  const socialLinks = [
    {
      href: 'https://github.com/esteban-estrada',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://linkedin.com/in/esteban-estrada-01651b31b',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'mailto:esteban.estrada.col@gmail.com',
      label: 'Email',
      icon: Mail,
    },
  ];

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={cn(
            'flex items-center gap-2',
            'font-bold uppercase text-sm',
            'px-3 py-2',
            'border-[3px] border-foreground',
            'bg-bg-elevated',
            'transition-all duration-100',
            'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground hover:text-primary',
            'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
        >
          <link.icon className="w-4 h-4" aria-hidden="true" />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
