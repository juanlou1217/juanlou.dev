# juanlou.dev repository guidance

## Product and stack

This repository is Juanlou's personal site and blog. It uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Contentlayer2/MDX, Prisma 7, PostgreSQL, and pnpm.

The current public surface is:

- homepage, about, blog list, blog detail, tech/life categories, essays, tags, RSS, search, comments, stats, and GitHub repository data
- `/lab` is limited to lightweight Skills assets and small experiments

The following capabilities are intentionally disabled or absent unless the user explicitly asks to restore them: `/projects`, complex lab demos, newsletter subscriptions, i18n, Spotify/now-playing.

When a task changes a route or public capability, check `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md` and update it if the status changes.

## Sources of truth

- Inspect the relevant implementation before changing it; examples in docs never override current code or package scripts.
- Blog and author content lives in `data/` and is transformed by Contentlayer2. Do not duplicate MDX content in static arrays.
- Shared route taxonomy and content selection belong in `lib/blog-taxonomy.ts` and `lib/content.ts`.
- SEO and structured data belong in `lib/seo.ts` and `lib/structured-data.ts`.
- Database access goes through `lib/services/prisma.ts`; generated Prisma files are build artifacts.
- Production edge routing, TLS, and cross-application infrastructure belong in the private `juanlou-infra` repository, not here.

Keep responsibilities narrow:

- `app/`: routes, metadata, route handlers, and page composition
- `components/`: reusable rendering and interaction
- `layouts/`: article, author, and list composition
- `hooks/`: reusable client state and SWR behavior
- `lib/`: domain helpers, services, SEO, RSS, and utilities
- `prisma/`: schema and migration history

Search for an existing component, helper, or local pattern before adding another one. Server Components are the default; add `'use client'` only for state, effects, event handlers, or browser APIs. In Next.js 16 route code, treat dynamic `params` and `searchParams` as promises and await them.

## Working rules

- Preserve unrelated user changes and untracked files.
- Make the smallest coherent change that satisfies the request; remove obsolete guidance rather than layering exceptions on top of it.
- Follow nearby naming, import, export, styling, and error-handling conventions.
- Keep secrets and server-only services out of client bundles.
- A local authoring or implementation request does not authorize commits, pushes, pull requests, deployments, migrations, or destructive database operations. Perform those only when explicitly requested.
- If a requested change materially affects dependencies, persistent data, a public route contract, or infrastructure ownership, call out the impact before applying the irreversible part.

## Validation

`package.json` is the command source of truth.

- For scoped TypeScript/React changes, run `pnpm exec eslint <affected paths>`.
- For route, Contentlayer, MDX, configuration, or broad integration changes, run `pnpm build` when feasible.
- For Prisma schema changes, run `pnpm exec prisma format`, `pnpm exec prisma validate`, and `pnpm prisma:generate`. Create or deploy migrations only when the task explicitly includes them and the target database is known.
- Documentation-only changes do not require a build unless they alter rendered MDX or executable examples.

Work is complete when the requested behavior is implemented, the affected path has been inspected, relevant scoped checks pass, and any check that could not be run is reported with its reason.

## Conditional references

Read supporting docs only when the task needs them:

- Public feature or route status: `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md`
- Shared UI reuse or a new component: `docs/harness/canonical/COMPONENT_INVENTORY.md`
- Repository/infrastructure ownership: `docs/harness/canonical/REPO_SPECIFIC_RULES.md`
- Content publishing or asset conventions: `docs/guides/CONTENT_UPDATE_GUIDE.md`
- Deployment work: `docs/guides/DEPLOYMENT.md`

Place durable project documentation under `docs/`. Update harness documents only when their facts or contracts actually change.
