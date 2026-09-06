# hooks/ guidance

`hooks/` contains reusable client-side state and data behavior. The current public hooks cover blog stats and image-loaded state.

- Hook files use kebab-case with a `use-` prefix; exported hooks use the `useX` convention.
- Preserve an existing hook's tuple/object return contract unless all consumers are updated deliberately.
- Prefer SWR for client data that needs caching or revalidation, following `use-blog-stats.ts`.
- Keep SWR keys and mutation keys identical and stable. Handle loading and failure states without inventing placeholder success data.
- Hooks may call route handlers, but must not import Prisma, secrets, or server-only services.
- Put UI in `components/` and HTTP/service implementation in `app/api/` or `lib/services/`.
- Add exports to `hooks/index.ts` only when a stable shared entry point is useful; direct imports are also acceptable when that is the nearby pattern.

Run scoped ESLint for the hook and inspect at least one real consumer. Exercise the associated route handler when data or mutation behavior changes.
