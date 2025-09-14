# Repository Guidelines

## Project Structure & Module Organization
- `app/` Next.js App Router pages, layouts, API routes, sitemap/robots.
- `components/` Reusable UI and feature components.
- `lib/` Utilities (metadata, analytics, MDX helpers) and constants.
- `data/` Content: `apps/*.mdx`, `blog/*.mdx`, JSON indexes, profile data.
- `public/` Static assets (`public/images/...`).
- `config/` Site, SEO, and navigation; `types/` shared TypeScript types.
- Root configs: `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `middleware.ts`.

## Build, Test, and Development Commands
- `npm ci` Install dependencies (uses `package-lock.json`).
- `npm run dev` Start the Next.js dev server.
- `npm run lint` Run ESLint with Next.js rules.
- `npx tsc --noEmit` Type‑check the project.
- `npm run build` Create a production build in `.next/`.
- `npm run start` Serve the built app locally.

## Coding Style & Naming Conventions
- TypeScript‑first with strict types.
- Indentation 2 spaces; include semicolons.
- Filenames kebab‑case (`app-card.tsx`, `use-analytics.ts`).
- Components/Types: PascalCase; functions/vars: camelCase; constants: UPPER_SNAKE.
- Prefer single‑responsibility modules. Run `npm run lint` before pushing; fix or justify.

## Testing Guidelines
- No formal suite yet. Prefer Jest + React Testing Library for new tests.
- Name tests `*.test.ts(x)`; colocate near source or under `__tests__/`.
- Minimum CI checks: `npm run lint` and `npx tsc --noEmit` must pass.

## Commit & Pull Request Guidelines
- Conventional Commits: `type(scope): subject`.
  - Examples: `feat(apps): add Chrome extension card`, `fix(seo): correct OG image`.
- PRs include: summary, rationale, linked issues, screenshots for UI, and checklist results (lint, type‑check, build).
- Keep diffs focused; update docs/content in `data/` when applicable.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` and production envs (`NEXT_PUBLIC_SITE_URL`, GA/Cloudflare tokens, `REVALIDATE_SECRET`).
- Maintain CSP in `middleware.ts`; validate external domains for images/fonts.
- Keep assets under `public/`; avoid remote imports without justification.

## Agent‑Specific Notes
- Scope is entire repo. Follow these conventions for generated files.
- Prefer minimal, targeted changes aligned to layout and naming.

