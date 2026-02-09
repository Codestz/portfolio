/**
 * Application routes
 * Centralized route management for type safety and easy refactoring
 */

export const ROUTES = {
  home: '/',
  about: '/about',
  experiments: {
    index: '/experiments',
    post: (slug: string) => `/experiments/${slug}`,
    category: (category: string) => `/experiments/category/${category}`,
  },
  experience: {
    index: '/experience',
    detail: (slug: string) => `/experience/${slug}`,
  },
  // Legacy aliases for backwards compatibility
  blog: {
    index: '/experiments',
    post: (slug: string) => `/experiments/${slug}`,
    category: (category: string) => `/experiments/category/${category}`,
  },
  projects: {
    index: '/experience',
    detail: (slug: string) => `/experience/${slug}`,
  },
} as const;

export const EXTERNAL_ROUTES = {
  github: 'https://github.com/Codestz',
  linkedin: 'https://linkedin.com/in/esteban-estrada-01651b31b',
  email: 'mailto:esteban.estrada.col@gmail.com',
} as const;
