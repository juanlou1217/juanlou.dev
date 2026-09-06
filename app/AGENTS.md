# app/ guidance

`app/` owns App Router routes, metadata, route handlers, and page composition. Keep reusable rendering in `components/`, layouts in `layouts/`, and domain/service logic in `lib/`.

## Route rules

- Use Server Components by default. Add `'use client'` only when the route itself needs client state, effects, handlers, or browser APIs.
- In Next.js 16 dynamic routes, type `params` and `searchParams` as promises and await them. Follow `app/blog/[...slug]/page.tsx` as the local example.
- Resolve missing or unpublished content with `notFound()` rather than rendering a misleading empty page.
- Use `lib/content.ts` and `lib/blog-taxonomy.ts` for blog selection and categories instead of repeating filters in route files.
- Build metadata with `lib/seo.ts`; build JSON-LD with `lib/structured-data.ts` and render it through `components/seo/JsonLd`.
- Route handlers validate input and shape HTTP responses. Database and external-service details stay in `lib/services/`.

## Current capability boundaries

- Mainline: homepage, about, blog/category/essay/detail pages, tags, RSS, search, comments, stats, and GitHub data.
- Limited: `/lab` currently lists lightweight Skills assets.
- Disabled: `/projects` calls `notFound()`; newsletter `GET` and `POST` return `501`; complex lab demos, i18n, and Spotify are not active product surfaces.

Do not expose a disabled capability as active without an explicit product change. If its status changes, update `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md` in the same task.

## Validation

Run scoped ESLint for isolated route changes. Run `pnpm build` for dynamic routes, metadata, route handlers, MDX/Contentlayer integration, or changes spanning multiple routes.
