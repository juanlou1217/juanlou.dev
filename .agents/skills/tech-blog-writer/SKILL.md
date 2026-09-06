---
name: tech-blog-writer
description: Write or revise MDX posts in data/blog for technical tutorials, project walkthroughs, and personal reflections; not ordinary UI copy.
---

# Tech blog writer

Use this skill for new or existing blog posts in this repository. Preserve the author's ideas and voice while making the article clear, accurate, and compatible with the content pipeline.

## Load context progressively

1. Read the target draft, source notes, or nearby post that the user named.
2. Resolve one voice source in this order: `docs/style/PERSONA_PROFILE.md`, `docs/style/VOICE_AND_STYLE.md`, then `data/authors/default.mdx`. Do not load every style or project document.
3. Read `references/repo-content.md` for a new MDX file, frontmatter work, or claims about current repository capabilities.
4. Read `references/reflection-writing.md` only for personal reflection or spoken-note material.
5. Read `references/polish-checklist.md` only for the final editing pass.
6. Inspect relevant code or package scripts when the post makes implementation claims. Current code outranks prose documentation.

Read `docs/guides/CONTENT_UPDATE_GUIDE.md` only when the task includes publishing workflow or asset conventions.

## Writing workflow

1. Identify the article type, intended reader, one central takeaway, and the evidence available.
2. For an existing post, default to light-touch edits: preserve the thesis, factual claims that remain true, frontmatter shape, rhythm, humor, and useful imperfections.
3. For a new post, outline two to four main sections before drafting. Let the structure follow the material rather than forcing a universal template.
4. Ground technical writing in real paths, commands, decisions, and tradeoffs. Explain unfamiliar assumptions for beginner readers without padding the article with generic AI claims.
5. Verify every repository-specific claim that could have changed. Never describe disabled or placeholder capabilities as production-ready.
6. Polish only after the facts and main thread are stable.

## Voice baseline

The selected voice profile is authoritative. When it is absent or incomplete, write in a direct, practical, beginner-friendly voice with concrete first-person reasoning where useful.

Prefer short declarative sentences, specific tradeoffs, and natural transitions. Avoid marketing language, trend slogans, academic inflation, generic praise, and a uniformly polished tone that erases the author's personality.

## Output and validation

- New posts belong under `data/blog/` and must follow the current Contentlayer schema and nearby MDX conventions.
- Preserve valid user-supplied dates and facts; do not invent publication history, metrics, quotes, or personal experience.
- Confirm referenced paths and commands locally.
- Run `pnpm build` after creating or structurally changing MDX when feasible. For a wording-only edit, report a lighter validation if a full build adds no value.
- Local writing does not authorize publishing, committing, pushing, or creating a pull request.

The post is done when its main point is clear, its frontmatter is valid, repository claims are verified, the selected voice remains recognizable, and relevant validation has passed or its limitation is stated.
