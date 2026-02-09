'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useScrollTrigger } from '@/lib/hooks';
import { cardEntrance, prefersReducedMotion } from '@/lib/utils/animation.utils';
import { STAGGER } from '@/lib/config/animation.config';
import gsap from 'gsap';
import type { CardListProps } from './CardList.types';

/**
 * CardList Component
 * Generic list component in a card container with Neo-Brutalist styling
 * Features scroll-triggered entrance animation
 *
 * @example
 * <CardList
 *   title="Latest Posts"
 *   icon={<div className="w-3 h-3 bg-primary rounded-full" />}
 *   items={[
 *     { id: '1', content: 'Post 1', href: '/post-1' },
 *     { id: '2', content: 'Post 2', href: '/post-2' }
 *   ]}
 *   footer={<Link href="/all">View All</Link>}
 * />
 */
export function CardList({
  title,
  icon,
  items,
  footer,
  className,
  variant = 'default',
  animated = true,
}: CardListProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 80%',
  });

  // Animate card when in view
  useEffect(() => {
    if (!animated || !isInView || !cardRef.current || prefersReducedMotion()) return;

    const listItems = cardRef.current.querySelectorAll('li');

    gsap.fromTo(
      cardRef.current,
      cardEntrance(),
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
      }
    );

    if (listItems.length > 0) {
      gsap.fromTo(
        listItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: STAGGER.list,
          delay: 0.2,
        }
      );
    }
  }, [animated, isInView]);

  const variantStyles = {
    default: 'bg-bg-elevated',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-secondary-text',
  };

  return (
    <div ref={triggerRef} className="w-full h-full">
      <div
        ref={cardRef}
        className={cn(
          'brutal-card p-8 border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground',
          'w-full h-full flex flex-col',
          variantStyles[variant],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          {icon}
          <h2 className="text-2xl font-bold uppercase font-heading">{title}</h2>
        </div>

        {/* List */}
        <ul className="space-y-4 flex-1">
          {items.map((item) => {
            const itemClasses = cn(
              'group flex justify-between items-center border-b-2 border-foreground pb-2 transition-transform',
              !item.disabled && 'cursor-pointer hover:translate-x-2',
              item.disabled && 'opacity-50',
              item.className
            );

            return item.href ? (
              <li key={item.id}>
                <Link href={item.href} className={itemClasses}>
                  {item.content}
                </Link>
              </li>
            ) : (
              <li key={item.id} className={itemClasses}>
                {item.content}
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}
