# Portfolio Project Overview

## Project Description

A modern, responsive personal portfolio website showcasing software engineering projects, experiments, and professional experience. Built with cutting-edge web technologies and featuring a distinctive **Neo-Brutalist design system** characterized by bold borders, dramatic shadows, and high contrast aesthetics.

## Key Features

### Design System

- **Neo-Brutalist Aesthetic**: 3px borders, 8px shadows, sharp edges (no border-radius)
- **Color Palette**: Purple primary (#7C3AED), Green/Cyan secondary (#00FF41 light / #00E5CC dark)
- **Typography**: Syne (headings), Space Mono (body)
- **High Contrast**: Optimized for both light and dark modes
- **Uppercase Treatment**: Strategic use of uppercase text for emphasis

### Responsive Design

- **Mobile-First Approach**: Tailwind CSS with responsive breakpoints
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Viewport Range**: 320px - 2560px fully supported
- **Touch Targets**: Minimum 44×44px for mobile accessibility
- **Full-Screen Mobile Menu**: React Portal-based navigation for mobile devices

### Interactive Components

- **Slot Machine**: GSAP-powered animation with responsive symbol heights
- **Terminal Simulation**: Animated terminal with typing effects and progress bars
- **Animated Grids**: GSAP ScrollTrigger animations for content sections
- **Theme Toggle**: Seamless light/dark mode switching

### Content Sections

- **Hero**: Animated introduction with code garden theme
- **About**: Professional story, skills breakdown, and personal interests
- **Experience**: Timeline of professional work with detailed achievements
- **Experiments**: Grid of personal projects and technical explorations
- **Connect**: Social links and contact information

## Technology Stack

### Core Framework

- **Next.js 16**: Latest React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety and IntelliSense

### Styling & Animation

- **Tailwind CSS 4**: Mobile-first utility CSS framework
- **GSAP**: Professional-grade animations and scroll effects
- **CSS Custom Properties**: Semantic design tokens

### Development Tools

- **pnpm**: Fast, disk-efficient package manager
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Staged file linting

### CI/CD & Quality

- **GitHub Actions**: Automated testing and deployment
- **Pre-commit Hooks**: Automated linting and formatting
- **Pull Request Templates**: Structured contribution process
- **Issue Templates**: Bug reports and feature requests

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── about/             # About page sections
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, SlotMachine, etc.
│   │   └── ui/                # Reusable UI primitives
│   ├── data/                  # Static content (MDX, JSON)
│   ├── lib/                   # Utilities and helpers
│   └── styles/                # Global styles and tokens
├── .github/                   # GitHub workflows and templates
├── .husky/                    # Git hooks
└── .serena/                   # Project memories and config
```

## Design Philosophy

### User Experience

- **Performance First**: Optimized bundle sizes and lazy loading
- **Accessibility**: WCAG compliance, semantic HTML, keyboard navigation
- **Progressive Enhancement**: Core functionality without JavaScript
- **Responsive**: Seamless experience across all device sizes

### Code Quality

- **Type Safety**: Comprehensive TypeScript coverage
- **Component Architecture**: Compound components and composition
- **Separation of Concerns**: Clean component/data/style separation
- **Documentation**: JSDoc comments and inline documentation

### Development Workflow

- **Git Flow**: Feature branches with PR reviews
- **Automated Quality**: Pre-commit hooks and CI/CD pipelines
- **Semantic Commits**: Conventional commit messages
- **Incremental Improvement**: Continuous refactoring and optimization

## Key Achievements

- Comprehensive responsive design (320px - 2560px)
- Full-screen mobile navigation with React Portal
- GSAP animations with responsive calculations
- Neo-Brutalist design system with semantic tokens
- GitHub infrastructure with workflows and templates
- Automated code quality with Husky and lint-staged
- MDX content management for dynamic experiments/experience
- Dark mode support with theme persistence

## Future Enhancements

- Advanced animations and micro-interactions
- Blog functionality with MDX
- Enhanced accessibility features
- Performance monitoring and analytics
- Internationalization (i18n)
- CMS integration for easier content management
