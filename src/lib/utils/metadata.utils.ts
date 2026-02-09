import { Metadata } from 'next';
import { APP_CONFIG } from '@/lib/constants';

/**
 * SEO Metadata Configuration
 * Centralized metadata generation for consistent SEO across all pages
 */

export interface PageMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: readonly string[];
  tags?: readonly string[];
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://codestz.dev';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Generate comprehensive metadata for a page
 */
export function generatePageMetadata({
  title,
  description = APP_CONFIG.description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [APP_CONFIG.author.name],
  tags = [],
}: PageMetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_CONFIG.name}` : APP_CONFIG.title;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    authors: authors.map((name) => ({ name })),
    keywords: [
      'Software Engineer',
      'Full Stack Developer',
      'AI Integration',
      'Performance Optimization',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      ...tags,
    ],
    creator: APP_CONFIG.author.name,
    publisher: APP_CONFIG.author.name,
    applicationName: APP_CONFIG.name,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || APP_CONFIG.title,
        },
      ],
      locale: 'en_US',
      type,
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@estebanestrada',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogPostMetadata({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  tags = [],
  thumbnail,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: readonly string[];
  thumbnail?: string;
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    path: `/experiments/${slug}`,
    image: thumbnail || DEFAULT_OG_IMAGE,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
    tags,
  });
}

/**
 * Generate metadata for project pages
 */
export function generateProjectMetadata({
  title,
  description,
  slug,
  thumbnail,
  technologies = [],
}: {
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  technologies?: readonly string[];
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    path: `/experience/${slug}`,
    image: thumbnail || DEFAULT_OG_IMAGE,
    tags: technologies,
  });
}
