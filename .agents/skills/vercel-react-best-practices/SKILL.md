---
name: vercel-react-best-practices
description: Audit or refactor React and Next.js code for a specific performance concern using the bundled Vercel rules; not for routine feature work.
license: MIT
metadata:
  author: vercel
  version: '1.0.0'
---

# Vercel React performance rules

Use this skill when the user explicitly asks for performance work or when a React/Next.js task has a concrete performance-sensitive path. It is a diagnostic reference, not a blanket mandate to rewrite ordinary components.

## Workflow

1. Identify the affected path and likely bottleneck from code, measurements, or the user's report.
2. Read only the matching files under `rules/`:
   - waterfalls and async sequencing: `async-*`
   - bundle size and heavy loading: `bundle-*`
   - server work, caching, or serialization: `server-*`
   - client fetching and global listeners: `client-*`
   - unnecessary renders or state: `rerender-*`
   - DOM, SVG, hydration, or long-list rendering: `rendering-*`
   - hot JavaScript paths: `js-*`
   - advanced callback/initialization patterns: `advanced-*`
3. Confirm that each candidate rule fits the repository's Next.js version, server/client boundary, and nearby design before applying it.
4. Prefer the smallest change with a plausible measurable benefit. Preserve behavior and existing public component contracts.
5. Validate the affected route and report the expected mechanism of improvement; distinguish measured results from inference.

## Repository-specific cautions

- Server Components remain the default, but do not move interactive code server-side merely to satisfy a rule.
- Start independent work together and defer awaits only when error handling and data dependencies remain correct.
- Treat `bundle-barrel-imports` primarily as guidance for costly package entry points or demonstrated tree-shaking problems. Project-local `index.ts` files are stable boundaries in this repository; do not remove them automatically.
- Add memoization, caching, dynamic imports, Suspense, or client state only when the affected path benefits. Each adds its own complexity and invalidation costs.
- Never weaken authentication, correctness, accessibility, or hydration consistency for a speculative speedup.

The individual `rules/*.md` files contain the detailed examples and sources. Do not load all 57 rules for a narrow task.
