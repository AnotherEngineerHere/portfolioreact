# AGENTS.md - Portfolio React

## Overview
Next.js 14 portfolio with TypeScript, TailwindCSS, and shadcn/ui. Supports EN/ES i18n and dark mode.

---

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run start        # Start production server

# Linting & Type Checking
npm run lint         # ESLint (next lint)
npm run lint -- --fix  # Auto-fix lint errors
npm run typecheck    # Full TypeScript check (tsc --noEmit)
```

> **Note**: No test framework is configured. Do not add tests unless explicitly requested.

---

## Code Style

### TypeScript

- **Strict mode enabled** - No implicit any, strict null checks
- Use explicit types for all function parameters and return values
- Prefer `type` over `interface` for simple shapes
- Use `as const` for literal types that shouldn't change
- All components return `JSX.Element`
- Every Project, Experience must have a unique `id` field

```typescript
// Good
type Language = 'en' | 'es'
const NAV_ITEMS = ['about', 'projects', 'experience', 'education'] as const

// Bad - avoid implicit types
const items = ['about', 'projects']
function handleClick(id) { }  // Missing type
```

### Component Naming

- **PascalCase** for components: `AboutMe.tsx`, `SkillsGrid.tsx`, `Section.tsx`
- **camelCase** for utilities and hooks: `useToastLimit.ts`, `cvDownload.ts`
- **kebab-case** for directories: `components/ui/`, `data/`

### File Structure

```
components/
├── [SectionName].tsx     # Main section components (AboutMe, Projects, etc.)
├── [Feature].tsx        # Feature-specific components (SkillsGrid, etc.)
├── Section.tsx          # Wrapper for sections with scroll tracking
├── ThemeToggle.tsx      # Theme switcher
└── ui/                  # shadcn/ui base components

config/
└── social.ts             # Centralized external URLs (OWASP)

data/
├── content.ts           # Projects, experiences, education, skills, certifications
└── translations.ts      # EN/ES translation strings

types/
└── index.ts             # All shared types and interfaces
```

---

## Import Organization

Group imports in this order, separated by blank lines:

```typescript
// 1. React / Next.js
import * as React from "react"
import Image from 'next/image'

// 2. Third-party libraries (alphabetical)
import { useState } from 'react'
import toast from 'react-hot-toast'

// 3. UI components (@/components/ui/*)
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 4. Project components (@/components/*)
import { Section } from './Section'
import { SkillsGrid } from './SkillsGrid'

// 5. Data / Types / Config (@/data/*, @/types/*, @/config/*)
import { translations } from '@/data/translations'
import { SOCIAL_LINKS } from '@/config/social'
import { BaseSectionProps } from '@/types'

// 6. Utils / Hooks (@/utils/*, @/hooks/*)
import { downloadCV } from '@/utils/cvDownload'
```

---

## Component Patterns

### Client Components
Mark components that use client-side features with `'use client'` at the top:
```typescript
'use client'

import { useState, useEffect } from 'react'
```

### forwardRef Pattern (for reusable UI components)
```typescript
import * as React from "react"

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
)
Component.displayName = "Component"

export { Component }
```

### CVA (Class Variance Authority) for Variants
```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "variant-default",
      secondary: "variant-secondary",
    },
    size: {
      default: "size-default",
      sm: "size-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

---

## Props & Types

### Prop Types
```typescript
// For base section components
export interface BaseSectionProps {
  setActiveSection: (section: string) => void
  language: Language
}

// For reusable components
export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary'
  children: React.ReactNode
}

// Data interfaces must include id for React keys
export interface Project {
  id: string
  title: string
  // ...other fields
}
```

### Map Keys
- Use unique identifiers (e.g., `id`) as keys, **never use index**
```typescript
// Good
{items.map((item) => (
  <Card key={item.id}>...</Card>
))}

// Bad
{items.map((item, index) => (
  <Card key={index}>...</Card>
))}
```

---

## CSS / Tailwind

### Class Merging
Always use `cn()` from `@/lib/utils`:
```typescript
import { cn } from "@/lib/utils"

// Good
className={cn("base-class", className)}

// Bad
className={`base-class ${className}`}
```

### Responsive Design
- Mobile-first approach
- Use breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Always provide mobile (`text-base sm:text-lg`) and desktop (`md:text-xl`) variants
- Use padding: `p-4 sm:p-6 lg:p-8` for sections
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <Card className="w-full md:w-1/2 p-4 sm:p-6" />
</div>
```

---

## Security (OWASP)

### External Links
Always include `rel="noopener noreferrer"` for external links:
```tsx
// Good
<a href="https://github.com/user" target="_blank" rel="noopener noreferrer">

// Bad
<a href="https://github.com/user" target="_blank">
```

### Environment Variables
- Public URLs go in `.env.local` with prefix `NEXT_PUBLIC_`
- Never commit `.env.local` - use `.env.example` as template
- Centralize external URLs in `config/social.ts`

```bash
# .env.example
NEXT_PUBLIC_GITHUB_URL=https://github.com/user
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/user
NEXT_PUBLIC_EMAIL=user@example.com
```

```typescript
// config/social.ts
export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL!,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL!,
  email: process.env.NEXT_PUBLIC_EMAIL!,
} as const
```

---

## Next.js Specific

### Images
- Use `next/image` for all images
- Always provide `alt` text
- Use `sizes` prop for responsive images
- Add `priority` prop for above-fold images
```tsx
<Image
  src="/profile.jpg"
  alt="Profile photo"
  width={200}
  height={200}
  priority  // Add for above-fold images
/>
```

### Server vs Client Components
- Default to server components
- Add `'use client'` only when needed (hooks, event handlers, browser APIs)

---

## ESLint Rules

Project extends `next/core-web-vitals` and `next/typescript`. Key rules:

- No unused variables
- Explicit return types for exports
- Prefer `const` over `let`
- No `any` types (strict mode)

---

## Pre-commit Checklist

Before committing, verify:
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] No hardcoded URLs (use `SOCIAL_LINKS` from config)
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No `console.log` statements
- [ ] All images have alt text
- [ ] All `.map()` use unique `id` as key
