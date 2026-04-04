---
name: tech-blog-writer
description: Draft, polish, and validate technical blog posts for this repository. Use when writing or revising blog articles, installation guides, project walkthroughs, AI collaboration articles, or MDX content for data/blog. Optimized for this blog's structure, category rules, and the active author style profile when available.
---

# Tech Blog Writer

Use this skill when the task is to write, rewrite, polish, or structure a blog post for this repository, especially for:

- technical sharing posts
- project walkthroughs
- installation/setup articles
- AI collaboration or workflow articles
- MDX posts under `data/blog/`

This skill is repo-specific. It assumes the output should fit this blog's existing content model and the author's tone.

## Style profile resolution

Before writing, resolve the author's style in this order:

1. `docs/style/PERSONA_PROFILE.md` if it exists
2. `docs/style/VOICE_AND_STYLE.md` if it exists
3. `data/authors/default.mdx`
4. homepage self-introduction components and public project docs

Rules:

- Only read private or shared style contracts from `docs/style/`
- Do not scan other docs directories for style files
- Use `data/authors/default.mdx` and homepage/project copy only as fallback context

Treat the highest-priority existing file in `docs/style/` as the main style contract for tone, rhythm, taste, and what the writing should feel like.

This lets the same skill adapt across different repositories and different authors without hardcoding one voice.

## What to check first

Before drafting or editing, read only the files you need:

- the resolved style profile file from `Style profile resolution`
- `AGENTS.md`
- `docs/project/PROJECT_INTRODUCTION.md`
- `docs/project/SETUP_GUIDE.md`
- `docs/project/AI_COLLABORATION_GUIDE.md`
- `docs/project/BLOG_BUILDING_GUIDE.md` when the topic is project setup or technical sharing
- `docs/guides/CONTENT_UPDATE_GUIDE.md` when creating a new MDX post

If the article describes implementation details, also inspect the relevant code paths before writing. Do not invent repository behavior.

## Output targets

### When creating a new post

Write an MDX file under `data/blog/` with valid frontmatter. Follow current repo conventions:

- `title`
- `date`
- `tags`
- `category`
- `draft`
- `summary`
- `authors`
- `layout`

Category should usually be:

- `tech` for technical sharing
- `life` for reflection or personal growth
- `essay` for shorter essays

Default technical articles to `category: 'tech'`.

Use:

- `authors: ['default']`
- `layout: PostLayout`

unless the user explicitly wants something else.

### When polishing an existing post

Preserve:

- the original thesis
- factual claims that match the repo
- frontmatter shape unless there is a clear issue

Improve:

- structure
- clarity
- paragraph rhythm
- heading hierarchy
- readability for the intended audience

## Author voice and style adaptation

First follow the resolved style profile. Use the rules below as the fallback baseline when the profile is missing or incomplete.

Fallback voice:

- direct
- practical
- grounded in real tradeoffs
- clear enough for beginners
- technical without showing off

Prefer:

- short declarative sentences
- concrete reasoning
- explicit tradeoffs
- natural first-person reflections when useful

Avoid:

- inflated marketing tone
- vague praise of tools
- generic “AI will change everything” filler
- overly academic or overly sales-like phrasing
- stacking too many buzzwords in one paragraph

Good fit:

- “我为什么这样选”
- “这件事真正解决了什么问题”
- “如果你是刚接触 AI 的同学，可以先这样做”

Bad fit:

- “革命性提升生产力”
- “颠覆式工作流”
- empty trend-chasing claims with no repo context

When a style profile exists, extract and respect:

- preferred level of warmth vs restraint
- whether the author likes first-person reflection
- whether the author prefers tutorial tone, essay tone, or mixed tone
- what the author considers too templated, too official, or too commercial
- visual and structural taste when describing projects or page sections

Do not flatten the output into a generic “good technical article” if the style profile asks for something more personal or more opinionated.

## Writing workflow

### 1. Lock the article goal

Identify:

- target reader
- article type
- one primary takeaway
- 2 to 4 supporting sections

If the request is broad, narrow it before drafting. A good article usually has one core thread, not five.

### 2. Build the outline first

For technical posts in this repo, prefer:

1. Problem or motivation
2. Architecture or structure
3. Setup or implementation steps
4. Rules, tradeoffs, or lessons learned
5. Closing reflection

For beginner-friendly AI posts, explicitly include:

- what AI can help with
- what AI should not guess
- how to give repo context
- how to iterate safely

### 3. Draft from facts, not from abstraction

Anchor the article in:

- actual directories
- actual routes
- actual commands
- actual docs
- actual constraints from this repo

If a statement depends on current code, verify it locally before writing it.

### 4. Polish for readability

During revision, tighten:

- long openings
- repetitive sentence starts
- sections that drift away from the core point
- jargon that a newcomer would not understand

Add short transition lines when a section jump feels abrupt.

### 5. Validate the post against the repo

Before finishing:

- confirm paths exist
- confirm commands match package scripts
- confirm features described as open are actually open
- confirm disabled or placeholder features are not described as production-ready

If you create or edit MDX, run a content build when feasible.

## Repo-specific guardrails

Do not casually describe these as active product areas unless the user explicitly asks to revive them:

- `/projects`
- complex `lab` demos
- newsletter
- i18n

When discussing the product surface, align with the current public mainline:

- homepage
- blog list
- blog detail
- category pages
- tags
- about
- RSS
- comments
- stats
- GitHub repo info

## Structure patterns

### Pattern A: Project walkthrough

Use this for “这个项目是怎么搭起来的” posts:

1. Why I built it this way
2. Core stack and why
3. Project structure
4. Data flow
5. Local setup
6. AI collaboration rules
7. Lessons learned

### Pattern B: Beginner-friendly AI workflow post

Use this for “AI 小白怎么上手” posts:

1. Common beginner mistake
2. What context AI actually needs
3. Minimal repo docs to provide
4. Safe step-by-step collaboration pattern
5. Example prompts
6. What to verify manually

### Pattern C: Installation guide article

Use this for setup-heavy content:

1. What the project is
2. Required environment
3. Install dependencies
4. Configure environment variables
5. Initialize database
6. Start dev server
7. Verify pages and APIs
8. Common issues

## MDX style rules

Prefer:

- `##` and `###` headings with clear progression
- fenced code blocks with language tags
- short bullet lists when enumerating steps or rules
- short intro and short conclusion

Avoid:

- very deep heading nesting
- giant bullet walls with no prose
- oversized code dumps unless the code is central to the point

## Editing checklist

Before finishing, review for:

- Does the title make a concrete promise
- Does the summary match the real content
- Is the opening clear within the first 2 paragraphs
- Does each section earn its place
- Does the final tone match the resolved style profile instead of a generic template voice
- Are repo-specific facts accurate
- Would a newcomer know what to do next

## Example asks this skill should handle well

- “为技术分享栏目写一篇介绍博客结构和安装的文章”
- “把这篇技术文章润色得更像我自己的口吻”
- “基于当前仓库写一篇 AI 协作入门文章”
- “把这篇草稿整理成可发布的 MDX 博文”
