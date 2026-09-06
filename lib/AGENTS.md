# lib/ guidance

`lib/` owns reusable domain logic and server integrations:

- `blog-taxonomy.ts` and `content.ts`: blog categories, publication filtering, and content selection
- `seo.ts` and `structured-data.ts`: metadata URLs and JSON-LD data
- `rss.ts`: feed generation
- `services/github.ts`: GitHub integration
- `services/prisma.ts`: PostgreSQL adapter and the shared Prisma client
- `utils/`: small general utilities and the client fetcher

## Boundaries

- Keep modules independent of page rendering; `lib/` must not become a second component directory.
- Centralize content filtering and taxonomy here instead of duplicating route-specific predicates.
- Keep secrets, Prisma, and authenticated external calls in server-only paths. Client Components access them through route handlers.
- Reuse the Prisma singleton from `services/prisma.ts`; do not construct clients per request.
- Throw or return errors with enough context for the API layer to map them to an honest response. Do not silently convert failures into successful empty data.
- Avoid broad utility dumping grounds. A helper with domain meaning belongs in a named module.
- Follow actual exports: the Prisma service currently exports a default client generated from `prisma/generated/client` and uses `@prisma/adapter-pg`.

Run scoped ESLint for pure helpers and affected consumers. Run `pnpm build` when changing server/client boundaries, Contentlayer helpers, SEO/RSS output, or shared service contracts.
