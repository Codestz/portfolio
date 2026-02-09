'use client';

import Link from 'next/link';
import { CardList, Badge } from '@/components/ui/primitives';
import type { CardListItem } from '@/components/ui/primitives';
import type { Post } from '@/lib/types';
import type { ExperimentItem, LatestExperimentsCardProps } from './LatestExperimentsCard.types';

export type { ExperimentItem, LatestExperimentsCardProps };

/**
 * Transform Post data into ExperimentItem format
 * Filters to only show Experiment category posts
 */
function transformPostsToExperiments(posts: Post[]): ExperimentItem[] {
  // Filter to only Experiment posts
  const experimentPosts = posts.filter(post => post.type === 'experiment');

  return experimentPosts.slice(0, 3).map((post, index) => {
    // Determine badge based on index
    let badge: string | undefined;
    let badgeVariant: 'primary' | 'default' | 'secondary' | undefined;

    if (index === 0) {
      badge = 'New';
      badgeVariant = 'primary';
    } else {
      badge = 'Experiment';
      badgeVariant = 'default';
    }

    return {
      id: post.slug,
      title: `${String(index + 1).padStart(2, '0')}. ${post.title}`,
      badge,
      badgeVariant,
      href: `/experiments/${post.slug}`,
    };
  });
}

/**
 * LatestExperimentsCard Component
 * Section component that uses CardList primitive for displaying experiments
 */
export function LatestExperimentsCard({ posts, experiments, className, animated }: LatestExperimentsCardProps) {
  // Use posts if provided, otherwise fall back to experiments prop or empty array
  const displayExperiments = posts ? transformPostsToExperiments(posts) : experiments || [];

  // Transform experiments into CardList items
  const items: CardListItem[] = displayExperiments.map((Experiment) => ({
    id: Experiment.id,
    href: Experiment.href,
    disabled: Experiment.disabled,
    content: (
      <>
        <span className="font-bold">{Experiment.title}</span>
        {Experiment.badge && (
          <Badge variant={Experiment.badgeVariant || 'default'} className="shrink-0">
            {Experiment.badge}
          </Badge>
        )}
        {Experiment.date && <span className="text-sm">{Experiment.date}</span>}
      </>
    ),
  }));

  return (
    <CardList
      title="Latest_Experiments"
      icon={<div className="w-3 h-3 bg-accent-1 rounded-full" />}
      items={items}
      footer={
        <Link
          href="/experiments"
          className="inline-flex items-center gap-2 font-bold uppercase text-primary hover:underline"
        >
          View All Experiments →
        </Link>
      }
      className={className}
      animated={animated}
    />
  );
}
