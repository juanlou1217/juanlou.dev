# Repository content reference

Read this reference when creating MDX, editing frontmatter, or describing juanlou.dev's current product surface.

## Content model

`contentlayer.config.ts` is the schema source of truth. Blog documents live at `data/blog/**/*.mdx`.

Required fields:

- `title`: string
- `date`: date

Common repository conventions:

- `tags`: string list
- `category`: `tech`, `life`, or `essay`; defaults to `tech`
- `draft`: boolean
- `summary`: concise description used by lists and metadata
- `authors`: usually `['default']`
- `layout`: usually `PostLayout`; current post layouts also include `PostSimple` and `PostBanner`

Optional schema fields include `lastmod`, `images`, `bibliography`, and `sourceUrl`. Do not add optional fields without a real need. Essay posts are selected by category and rendered with the essay layout by the blog route.

Use a nearby current post as the formatting example. Fenced code blocks need language tags. Prefer `##` and `###` headings with a clear progression; avoid deep heading trees and long walls of bullets.

## Capability facts

Open public areas include the homepage, about, blog list/detail, tech and life categories, essays, tags, RSS, search, comments, stats, and GitHub repository data.

`/lab` is limited to lightweight Skills assets and small experiments.

Do not describe these as active unless the user is explicitly restoring them:

- `/projects`
- complex lab demos
- newsletter subscriptions
- i18n
- Spotify or now-playing

For exact or changing status, check `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md` and the route implementation. Code wins if the two disagree, and the matrix should then be corrected.

## Accuracy checks

- Commands come from `package.json`.
- Route behavior comes from `app/`.
- Content selection comes from `lib/content.ts` and `lib/blog-taxonomy.ts`.
- Frontmatter fields come from `contentlayer.config.ts`.
- Database behavior comes from `prisma/` and `lib/services/prisma.ts`.
- Edge routing, TLS, and cross-application infrastructure live in the private `juanlou-infra` repository, not this one.
