/**
 * Application-wide constants
 * Single source of truth for configuration values
 */

export const APP_CONFIG = {
  name: 'Esteban Estrada',
  title: 'Esteban Estrada | Senior Software Engineer',
  description: 'Senior Software Engineer specializing in AI integration, full-stack development, and performance optimization.',
  author: {
    name: 'Esteban Estrada',
    email: 'esteban.estrada.col@gmail.com',
    location: 'Medellín, Antioquia, Colombia',
    role: 'Senior Software Engineer',
    company: 'Recurly',
  },
  social: {
    github: 'https://github.com/Codestz',
    linkedin: 'https://linkedin.com/in/esteban-estrada-01651b31b',
  },
} as const;

export const CONTENT_CONFIG = {
  postsPerPage: 10,
  featuredPostsLimit: 3,
  featuredProjectsLimit: 3,
  readingSpeed: 200, // words per minute
  categories: ['general', 'ai', 'performance', 'architecture', 'tutorial'] as const,
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'system' as const,
  themes: ['light', 'dark', 'system'] as const,
} as const;
