# layouts/ guidance

`layouts/` composes shared page structure for authors, lists, and MDX posts. Existing layouts include `AuthorLayout`, `EssayLayout`, `EssayTimelineLayout`, `ListLayout`, `ListLayoutWithTags`, `PostBanner`, `PostLayout`, and `PostSimple`.

- Preserve the prop contracts used by `app/` and Contentlayer-generated content.
- Keep route lookup, `params`, metadata, and content selection in `app/` or `lib/`; layouts receive prepared content and render it.
- Keep reusable leaf UI in `components/` rather than duplicating it across layouts.
- Use the established MDX layout names. When adding a layout, wire it into the actual route/layout lookup and validate a real post that selects it.
- Follow nearby responsive, typography, dark-mode, navigation, comments, and table-of-contents patterns.
- Do not add client boundaries to a whole layout when a smaller interactive child is sufficient.

Run scoped ESLint for isolated layout changes. Run `pnpm build` when changing layout selection, Contentlayer types, MDX integration, or shared post navigation.
