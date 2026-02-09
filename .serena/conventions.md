# Portfolio Project - SERENA Memory

## Project Overview

**Name:** Neo-Brutalist Portfolio
**Purpose:** Senior software engineer portfolio showcasing SOLID principles, design patterns, and clean architecture
**Tech Stack:** Next.js 16, React 19, TypeScript (strict mode), Tailwind CSS 4

## Architecture Philosophy

### Core Principles

1. **Separation of Concerns** - Clear boundaries between UI, business logic, and data access
2. **SOLID Principles** - Every component demonstrates single responsibility and proper abstraction
3. **Design Patterns** - Repository, Strategy, Factory, Provider patterns
4. **Type Safety** - Strict TypeScript with generics and proper type inference
5. **Scalability** - Code structure designed to grow without becoming unmaintainable

### Directory Structure

```
src/
├── app/                    # Next.js App Router (Presentation Layer)
├── components/
│   ├── ui/                 # Atomic design system components
│   ├── layout/             # Layout components
│   ├── home/               # Page-specific components
│   └── mdx/                # MDX custom components
├── lib/
│   ├── config/             # Application configuration
│   ├── constants/          # Constants and enums
│   ├── repositories/       # Data access layer (Repository Pattern)
│   ├── services/           # Business logic layer
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Pure utility functions
│   └── types/              # TypeScript type definitions
├── content/                # MDX content (data layer)
└── styles/                 # Global styles and themes
```

## Implemented Patterns

### 1. Repository Pattern

**Location:** `src/lib/repositories/`
**Purpose:** Abstract data access logic from business logic
**Components:**

- `IPostRepository`, `IProjectRepository` - Interfaces defining data access contracts
- `PostRepository`, `ProjectRepository` - Implementations using file system
- `FileSystemAdapter` - Adapter pattern for file operations
- `ContentRepository` - Factory for repository instances

### 2. Result Type Pattern

**Location:** `src/lib/types/common.types.ts`
**Purpose:** Functional error handling without exceptions

```typescript
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };
```

### 3. Type Guards

**Location:** `src/lib/types/content.types.ts`
**Purpose:** Runtime type safety

- `isPost(obj)` - Validates Post type at runtime
- `isProject(obj)` - Validates Project type at runtime

### 4. Pure Functions

**Location:** `src/lib/utils/`
**Purpose:** Utility functions with no side effects

- String utilities (slugify, truncate, calculateReadingTime)
- Date utilities (formatDate, getRelativeTime)
- Style utilities (cn for Tailwind merging)

## Configuration

### TypeScript

- **Strict mode:** Enabled
- **Path aliases:** Configured for clean imports
  - `@/*` → `./src/*`
  - `@/lib/*` → `./src/lib/*`
  - `@/components/*` → `./src/components/*`
- **Strict checks:** noUnusedLocals, noImplicitReturns, strictNullChecks

### Constants

**Location:** `src/lib/constants/`

- `APP_CONFIG` - Application metadata and author info
- `CONTENT_CONFIG` - Content management settings
- `THEME_CONFIG` - Theme configuration
- `ROUTES` - Centralized route management

## Design Decisions

### Immutability

All type definitions use `readonly` properties to prevent mutation:

```typescript
export interface Post {
  readonly slug: string;
  readonly tags: readonly string[];
  // ...
}
```

### Dependency Inversion

Services and repositories depend on interfaces, not concrete implementations:

```typescript
class ContentService implements IContentService {
  // Uses contentRepository through interface
}
```

### Single Responsibility

Each module has one clear purpose:

- **Types:** Define data shapes
- **Utils:** Pure transformations
- **Repositories:** Data access
- **Services:** Business logic (to be implemented)
- **Components:** UI presentation (to be implemented)

## Next Steps

1. Implement Service Layer for business logic
2. Create custom design system (no libraries)
3. Build layout components
4. Implement MDX configuration
5. Create homepage with 3D elements
6. Add GSAP scroll animations

## Dependencies Installed

- **Animation:** gsap
- **3D:** three, @react-three/fiber, @react-three/drei
- **MDX:** @next/mdx, gray-matter, reading-time, next-mdx-remote
- **UI:** lucide-react, next-themes, clsx, tailwind-merge
- **Dev:** @tailwindcss/typography, @types/three, shiki

## Coding Conventions

1. Use `readonly` for all type properties
2. Prefer `const` over `let`
3. Use Result type for operations that can fail
4. Export interfaces for all public APIs
5. Use type guards for runtime validation
6. Follow Vercel React best practices
7. No external component libraries - custom design system only
8. Document public APIs with JSDoc comments
