# components/ guidance

`components/` contains reusable UI grouped by feature (`about`, `blog`, `footer`, `header`, `homepage`, `lab`, `project`, `seo`) plus shared primitives in `ui`.

## Boundaries

- Search nearby feature folders and `ui/` before creating a new component. Extend the closest existing abstraction when its contract already fits.
- Keep components focused on rendering and interaction. Put cross-route content logic in `lib/`, browser data/state reuse in `hooks/`, and route composition in `app/`.
- Use Server Components by default. Add `'use client'` at the smallest boundary that needs state, effects, event handlers, or browser APIs.
- Never import Prisma, secrets, or server-only services into a Client Component. Client data access goes through route handlers and existing hooks.
- Follow nearby Tailwind, responsive, dark-mode, accessibility, prop, and export patterns; do not invent a parallel styling system.

## Imports and exports

Project-local `index.ts` files are intentional public boundaries in several folders. Follow the closest existing import style. Avoid adding deep re-export chains, but do not rewrite stable local barrels solely because a generic performance rule warns about large package barrels.

Components under `project/` support a disabled public route; components under `lab/` should match the current lightweight Skills surface unless the user explicitly expands those capabilities.

## Validation

Run scoped ESLint for the affected component and its direct consumers. For interaction or layout changes, inspect the relevant page at representative viewport sizes; use `pnpm build` when server/client boundaries or route composition changed.
