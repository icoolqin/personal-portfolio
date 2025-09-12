# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It showcases applications and projects with MDX support for rich content. The site uses Next.js App Router and is designed to be deployed on Cloudflare Pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Internationalization (i18n)

The project supports bilingual content (Chinese/English) with the following structure:
- **Default locale**: English (`en`)
- **Supported locales**: Chinese (`zh`), English (`en`)
- **URL structure**: `/[lang]/` for localized routes
- **Configuration**: Defined in `next.config.ts` with `i18n` object

## Project Structure

### Core Directories
- `app/` - Next.js App Router pages and layouts
  - `app/[lang]/` - Localized routes with i18n support
  - `app/apps/` - Legacy non-localized app routes
- `components/` - React components organized by purpose
  - `components/ui/` - shadcn/ui base components
  - `components/layout/` - Header, footer, navigation
  - `components/app/` - App-specific components (cards, details, etc.)
  - `components/common/` - Shared utility components
- `data/` - JSON and MDX files for content management
  - `data/apps/` - App metadata and MDX content files
- `lib/` - Utility functions and helpers
- `public/` - Static assets (images, icons, etc.)
- `types/` - TypeScript type definitions

### Key Architecture Patterns
- **Content Management**: Uses MDX files in `data/apps/` for app details with JSON index
- **Styling**: Tailwind CSS with shadcn/ui component system and CSS custom properties
- **Routing**: Next.js App Router with dynamic routes for app details (`/apps/[slug]` and `/[lang]/apps/[slug]`)
- **Data Fetching**: Static generation with local JSON/MDX files
- **Internationalization**: Dynamic locale-based routing with metadata generation
- **Component Architecture**: Client components with `use client` directive where needed

## Content Management

### Adding New Applications
1. Create MDX file in `data/apps/` (e.g., `new-app.mdx`)
2. Add app metadata to `data/apps/index.json`
3. Add images to `public/images/`
4. Follow the existing structure for consistency

### App Data Structure
Apps in `data/apps/index.json` follow this structure:
```json
{
  "id": "unique-id",
  "slug": "url-slug",
  "name": "App Name",
  "shortDescription": "Brief description",
  "fullDescription": "Detailed description",
  "category": "Category",
  "platform": ["Platform1", "Platform2"],
  "tags": ["tag1", "tag2"],
  "icon": "/images/icon.png",
  "banner": "/images/banner.png",
  "screenshots": ["/images/screenshot1.png"],
  "links": {
    "download": "url",
    "demo": "url",
    "chrome": "chrome-store-url",
    "edge": "edge-store-url"
  },
  "version": "1.0.0",
  "releaseDate": "2024-01-01",
  "features": ["Feature 1", "Feature 2"],
  "techStack": ["Technology1", "Technology2"],
  "featured": true
}
```

## Component Organization

### UI Components (`components/ui/`)
- Base components from shadcn/ui system
- Reusable UI primitives (buttons, cards, etc.)

### Layout Components (`components/layout/`)
- Header, footer, navigation
- Mobile menu component

### App Components (`components/app/`)
- `app-card.tsx` - Individual app display cards with language-aware routing
- `app-detail.tsx` - Detailed app view
- `app-grid.tsx` - Grid layout for apps
- `featured-app.tsx` - Featured app showcase
- `featured-carousel.tsx` - Carousel for featured apps

### Common Components (`components/common/`)
- Shared utilities and components

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + shadcn/ui with CSS custom properties
- **Content**: MDX with frontmatter and gray-matter parsing
- **Images**: Next.js Image component with optimization
- **Icons**: Lucide React and React Icons
- **Deployment**: Cloudflare Pages with static site generation
- **Package Manager**: npm

## Configuration Files

- `next.config.ts` - Next.js configuration with i18n settings
- `tailwind.config.ts` - Tailwind CSS with custom theme and shadcn/ui tokens
- `eslint.config.mjs` - ESLint configuration extending Next.js rules using flat config
- `tsconfig.json` - TypeScript strict mode configuration
- `postcss.config.js` - PostCSS configuration for Tailwind CSS

## Development Notes

- Uses MDX for rich content in app descriptions with gray-matter frontmatter parsing
- Implements responsive design with Tailwind CSS and CSS custom properties
- No external database - content managed through local JSON and MDX files
- SEO optimized with proper metadata and Open Graph tags
- Images optimized through Next.js Image component
- Bilingual support with dynamic locale-based routing
- Client components use `use client` directive for interactivity
- Static site generation for optimal performance

## Build and Deployment

The project is configured for static site generation and deployment to Cloudflare Pages. Run `npm run build` to create the production build.