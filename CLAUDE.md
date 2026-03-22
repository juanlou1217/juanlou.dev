# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在处理此仓库代码时提供指导。

## 项目概述

这是一个使用 Next.js 16、React 19、TypeScript 和 Tailwind CSS 构建的个人博客。博客使用 Contentlayer 进行 MDX 内容管理，并部署在 Vercel 上。它基于 Tailwind Nextjs Starter Blog 模板，并进行了自定义增强，包括 Tokyonight 主题色彩以及与外部服务（Spotify、GitHub、PostgreSQL）的集成。

## 命令

### 开发

```bash
pnpm dev                 # 使用 cross-env 启动开发服务器
pnpm start              # 备用开发命令（纯 next dev）
```

### 构建与生产

```bash
pnpm build              # 生产环境构建（运行 postbuild 脚本）
pnpm serve              # 启动生产服务器
pnpm analyze            # 启用 bundle analyzer 进行构建
```

### 代码质量

```bash
pnpm lint               # 在 app、components、lib、layouts、scripts 上运行 ESLint 自动修复
```

### 数据库

```bash
pnpm postinstall        # 生成 Prisma 客户端（安装后自动运行）
pnpm migrate:postgres   # 使用 .env.local 运行 Prisma 迁移
```

## 架构

### 内容管理（Contentlayer）

博客使用 **Contentlayer** 将 MDX 文件转换为类型安全的数据。关键要点：

- **内容位置**：MDX 文件位于 `data/blog/` 和 `data/authors/`
- **文档类型**：在 `contentlayer.config.ts` 中定义
  - `Blog`：带有 frontmatter 的博客文章（标题、日期、标签、草稿、摘要等）
  - `Authors`：作者资料
- **处理流程**：Contentlayer 使用 remark/rehype 插件处理 MDX：
  - Remark：GFM、数学公式、代码标题、图片 JSX 转换、GitHub 警告
  - Rehype：Slug 生成、自动链接标题、Prism 语法高亮、KaTeX 数学公式、引用
- **构建产物**：
  - `app/tag-data.json`：所有博客文章的标签计数
  - `public/search.json`：kbar 搜索索引（如果在 siteMetadata 中启用）
  - `.contentlayer/`：生成的类型安全内容数据

### 应用结构（Next.js App Router）

- **App 目录** (`app/`)：使用 Next.js 16 App Router
  - `app/layout.tsx`：根布局，包含主题提供者、分析、搜索、页眉/页脚
  - `app/page.tsx`：首页
  - `app/blog/[...slug]/page.tsx`：动态博客文章页面
  - `app/blog/page.tsx` 和 `app/blog/page/[page]/page.tsx`：带分页的博客列表
  - `app/tags/[tag]/page.tsx`：基于标签的过滤
  - `app/about/page.tsx`：关于页面
  - `app/projects/page.tsx`：项目展示
  - `app/api/`：外部集成的 API 路由

- **布局** (`layouts/`)：可复用的页面布局
  - `PostLayout.tsx`、`PostSimple.tsx`、`PostBanner.tsx`：博客文章布局
  - `ListLayout.tsx`、`ListLayoutWithTags.tsx`：博客列表布局
  - `AuthorLayout.tsx`：作者资料布局

- **组件** (`components/`)：按功能组织
  - `about/`、`analytics/`、`blog/`、`footer/`、`header/`、`homepage/`、`project/`、`ui/`

### 数据与配置

- **网站元数据** (`data/siteMetadata.js`)：网站标题、作者、社交链接、分析（Umami）、评论（Giscus）、搜索（kbar）、订阅（Buttondown）的中心配置
- **导航** (`data/headerNavLinks.ts`)：页眉导航链接
- **项目** (`data/projectsData.ts`)：项目作品集数据
- **热门标签** (`data/popularTags.ts`)：精选标签列表

### 外部集成

博客通过 API 路由和服务器工具与外部服务集成：

- **Spotify** (`app/api/spotify/route.ts`、`servers/spotify.server.ts`)：获取当前播放的曲目
  - 需要：`SPOTIFY_CLIENT_ID`、`SPOTIFY_CLIENT_SECRET`、`SPOTIFY_REFRESH_TOKEN`

- **GitHub** (`app/api/github/route.ts`、`servers/github.server.ts`)：为项目页面获取仓库数据
  - 需要：`GITHUB_API_TOKEN`
  - 使用 `@octokit/graphql` 进行 GraphQL API 查询

- **PostgreSQL/Prisma** (`app/api/stats/route.ts`、`servers/prisma.server.ts`、`prisma/schema.prisma`)：
  - 存储博客文章统计数据（浏览量、反应：喜欢、鼓掌、想法、靶心）
  - Schema：`Stats` 模型，复合键 `[type, slug]`
  - 需要：`POSTGRES_URL`

- **Giscus 评论**：通过环境变量配置的基于 GitHub 的评论
  - 需要：`NEXT_PUBLIC_GISCUS_REPO`、`NEXT_PUBLIC_GISCUS_REPOSITORY_ID`、`NEXT_PUBLIC_GISCUS_CATEGORY`、`NEXT_PUBLIC_GISCUS_CATEGORY_ID`

### 样式与主题

- **Tailwind CSS**：在 `tailwind.config.js` 中自定义配置
- **主题系统**：通过 `next-themes` 支持深色模式
  - 主题提供者：`app/theme-providers.tsx`
  - 颜色：Tokyonight Neovim 主题调色板
- **自定义字体**：在 `app/layout.tsx` 中加载 Google Fonts 的 Outfit 字体
- **全局样式**：`css/tailwind.css`、`css/twemoji.css`

### 构建流程

- **构建工具**：Turbopack 是 Next.js 16 的默认打包器（使用 `--webpack` 标志切换到 Webpack）
- **Contentlayer 集成**：`next.config.js` 使用 `withContentlayer` 包装 Next.js 配置
- **构建后脚本** (`scripts/postbuild.mjs`)：在 Next.js 构建后运行
- **RSS Feed** (`scripts/rss.mjs`)：生成 RSS 订阅源
- **Bundle Analyzer**：通过 `ANALYZE=true` 环境变量可选启用
- **安全头**：在 `next.config.js` 中配置 CSP、referrer policy、X-Frame-Options
- **SVG 处理**：Turbopack 配置了 SVGR 加载器用于 SVG React 组件（`next.config.js` 中的 `turbopack`）

## 重要模式

### 添加新博客文章

1. 在 `data/blog/` 中创建 MDX 文件
2. 包含必需的 frontmatter：`title`、`date`
3. 可选的 frontmatter：`tags`、`draft`、`summary`、`images`、`authors`、`layout`
4. Contentlayer 将在下次 dev/build 时自动生成类型和构建产物

### 使用统计/反应

- 统计数据按 slug 存储在 PostgreSQL 中的每篇博客文章
- API 端点：`app/api/stats/route.ts` 处理 CRUD 操作
- 前端组件可以通过此 API 获取/更新统计数据

### 环境变量

完整功能所需：

- **数据库**：`POSTGRES_URL`
- **GitHub 集成**：`GITHUB_API_TOKEN`
- **Spotify 集成**：`SPOTIFY_CLIENT_ID`、`SPOTIFY_CLIENT_SECRET`、`SPOTIFY_REFRESH_TOKEN`
- **评论**：`NEXT_PUBLIC_GISCUS_*` 变量
- **分析**：`UMAMI_WEBSITE_ID`（可选）

完整列表请参见 `.env.local.example`。

## 约定

- **提交信息**：使用 Conventional Commits 格式
- **代码风格**：ESLint + Prettier 配合 Tailwind 插件
- **预提交钩子**：Husky + lint-staged 用于代码检查和格式化
- **TypeScript**：启用严格模式
- **React**：在 Next.js 配置中启用严格模式
