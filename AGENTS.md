# AGENTS.md

## Overview

这是一个基于 **Next.js 16 + React 19 + TypeScript** 构建的个人博客系统，采用 App Router 架构。核心职责：

- 使用 Contentlayer 2 管理 MDX 博客内容，提供类型安全的内容查询
- 通过 PostgreSQL + Prisma 7 存储文章统计数据（浏览量、点赞数）
- 集成 GitHub GraphQL API 展示仓库信息
- 使用 Tailwind CSS 4 实现响应式设计

**不负责**：内容编辑器（MDX 文件需手动编写）、用户认证系统。

---

## Setup Commands

### 第一步：创建配置文件

项目需要两个核心配置文件才能运行。

#### 1. 环境变量配置 (`.env.local`)

复制 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

然后按照以下指南填写配置：

**必需配置 - 数据库**

```bash
# PostgreSQL 数据库连接字符串
# 格式：postgresql://用户名:密码@主机:端口/数据库名
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/blog_db
```

获取方式：
- 本地开发：使用 Docker Compose（见下方命令）
- 生产环境：使用 [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)、[Supabase](https://supabase.com/)、[Neon](https://neon.tech/) 等服务

**推荐配置 - Giscus 评论系统**

```bash
# 基于 GitHub Discussions 的评论系统
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

获取方式：
1. 访问 [giscus.app](https://giscus.app/zh-CN)
2. 输入你的 GitHub 仓库地址
3. 启用 GitHub Discussions（仓库 Settings → Features → Discussions）
4. 按照页面提示获取配置参数

**可选配置 - GitHub 仓库统计**

```bash
# 在项目页面展示 GitHub 仓库信息（星标数、Fork 数）
GITHUB_API_TOKEN=ghp_xxxxx
```

获取方式：
1. 访问 [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. 创建 Personal Access Token (Classic)
3. 权限只需勾选 `public_repo`

#### 2. 网站元数据配置 (`data/siteMetadata.js`)

编辑 `data/siteMetadata.js` 文件，修改为你的信息：

```javascript
const siteMetadata = {
  title: '你的博客名称',
  author: '你的名字',
  headerTitle: '博客标题',
  description: '博客描述',
  // 注意：如果启用国际化，title 和 description 应改为对象格式
  // title: { 'zh-CN': '我的博客', en: 'My Blog' }
  theme: 'system', // 'light' | 'dark' | 'system'
  siteUrl: 'https://yourdomain.com',
  siteRepo: 'https://github.com/username/repo',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/banner.png',
  email: 'your@email.com',
  github: 'https://github.com/username',
  locale: 'zh-CN', // 默认语言（如启用 i18n，此字段将被动态语言替代）
  
  // Analytics (可选)
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: '', // Umami 网站 ID
      shareUrl: '',       // Umami 分享链接
    },
  },
  
  // 评论系统配置（使用环境变量）
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light_protanopia',
      darkTheme: 'transparent_dark',
      lang: 'zh-CN',
    },
  },
}

module.exports = siteMetadata
```

**关键配置项说明**：

- `siteUrl`: 你的域名（用于 SEO 和 sitemap）
- `siteRepo`: GitHub 仓库地址（用于页脚显示）
- `siteLogo`: 网站 Logo 路径（放在 `public/static/images/`）
- `socialBanner`: 社交媒体分享图片（用于 Twitter Card、Open Graph）
- `locale`: 语言代码（影响日期格式、SEO）
- 注意：如果需要国际化支持，请参考 `docs/guides/I18N_GUIDE.md`

#### 3. 导航菜单配置 (`data/navigation.ts`)

编辑 `data/navigation.ts` 自定义导航菜单：

```typescript
export const navigation = [
  { href: '/', title: '首页' },
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
]
```

### 第二步：安装依赖

确保已安装 Node.js 24.x 和 pnpm：

```bash
# 检查版本
node -v  # 应该是 v24.x
pnpm -v  # 应该是 10.x

# 如果没有 pnpm，安装它
npm install -g pnpm
```

安装项目依赖：

```bash
# 安装所有依赖（包括 Prisma、Next.js、React 等）
pnpm install
```

### 第三步：初始化数据库

**方式 1：使用 Docker（推荐本地开发）**

```bash
# 启动 PostgreSQL 容器
docker compose up -d postgres

# 等待数据库启动（约 5 秒）
sleep 5

# 运行数据库迁移
pnpm prisma:migrate

# 验证数据库连接
pnpm prisma studio
```

**方式 2：使用云数据库**

如果使用 Vercel Postgres、Supabase 等云服务：

```bash
# 确保 .env.local 中的 POSTGRES_URL 已配置
# 运行迁移
pnpm prisma:migrate

# 或在生产环境
pnpm prisma:migrate:deploy
```

### 第四步：启动开发服务器

```bash
# 启动开发服务器（http://localhost:3000）
pnpm dev

# 首次启动会：
# 1. Contentlayer 处理 MDX 文件
# 2. 生成类型定义
# 3. 启动 Next.js dev server
```

访问 http://localhost:3000 查看博客。

### 生产部署

**构建生产版本**

```bash
# 构建优化后的生产版本
pnpm build

# 启动生产服务器
pnpm serve
```

**使用 Docker 部署**

```bash
# 构建并启动所有服务（应用 + 数据库）
docker compose up -d

# 运行数据库迁移
docker compose exec app pnpm prisma:migrate:deploy

# 查看日志
docker compose logs -f app
```

**部署到 Vercel（推荐）**

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量（从 `.env.local` 复制）
4. 部署完成后，Vercel 会自动运行构建和迁移

### Docker 部署

```bash
# Start services (app + PostgreSQL)
docker compose up -d

# Run database migrations
docker compose exec app pnpm prisma:migrate:deploy
```

---

## Code Style

### 目录约定

```
├── app/                    # Next.js App Router (routes and pages)
├── components/             # React components (organized by feature)
├── hooks/                  # Custom React Hooks
├── lib/                    # Utilities and services
│   ├── services/           # External API integrations
│   └── utils/              # Helper functions
├── types/                  # TypeScript type definitions
├── data/                   # MDX content (blog posts, authors)
├── prisma/                 # Database schema and migrations
├── layouts/                # Page layout components
└── public/static/          # Static assets
```

### 命名规范

- **组件**: PascalCase (`BlogCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useBlogStats.ts`)
- **工具函数**: camelCase (`fetcher.ts`)
- **类型**: PascalCase (`BlogPost`, `StatsType`)
- **API 路由**: `route.ts` (Next.js convention)

### 路径别名

```typescript
import { Button } from '@/components/ui/Button'
import { fetcher } from '@/lib/utils'
import siteMetadata from '@/data/siteMetadata'
import type { Stats } from '@/types/prisma'
```

---

## Usage Examples

### 读取博客文章

```typescript
import { allBlogs } from 'contentlayer/generated'

// Get all published posts
const posts = allBlogs
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Get single post by slug
const post = allBlogs.find((p) => p.slug === 'my-post-slug')
```

### 使用统计 Hook

```typescript
import { useBlogStats, useUpdateBlogStats } from '@/hooks/use-blog-stats'

function BlogPost({ slug }: { slug: string }) {
  const [stats, isLoading] = useBlogStats('blog', slug)
  const updateStats = useUpdateBlogStats()

  const handleLove = () => {
    updateStats('blog', slug, 'loves')
  }

  return <div>Views: {stats?.views || 0}</div>
}
```

### 调用 API

```typescript
import { fetcher } from '@/lib/utils'

// Get GitHub stats
const stats = await fetcher('/api/github')
```

---

## Configuration

### 网站元数据 (`data/siteMetadata.js`)

```javascript
const siteMetadata = {
  title: 'My Blog',
  author: 'Your Name',
  headerTitle: 'Blog',
  description: 'A blog about...',
  language: 'zh-CN',
  theme: 'system', // 'light' | 'dark' | 'system'
  siteUrl: 'https://yourdomain.com',
  siteRepo: 'https://github.com/username/repo',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'your@email.com',
  github: 'https://github.com/username',
  twitter: 'https://twitter.com/username',
  // ... more social links
}
```

### 导航配置 (`data/navigation.ts`)

```typescript
export const navigation = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]
```

### Contentlayer 配置 (`contentlayer.config.ts`)

定义 MDX 文档类型、字段验证、rehype/remark 插件。修改后需重启 dev server。

---

## Common Tasks

### 添加新博客文章

1. 在 `data/blog/` 创建 MDX 文件：

```mdx
---
title: 'My New Post'
date: '2024-03-20'
tags: ['nextjs', 'typescript']
draft: false
summary: 'Post summary'
images: ['/static/images/banner.jpg']
authors: ['default']
layout: PostLayout
---

Content here...
```

2. Contentlayer 自动处理，访问 `/blog/my-new-post`

### 添加新 API 路由

```bash
mkdir -p app/api/my-endpoint
touch app/api/my-endpoint/route.ts
```

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'Hello' })
}
```

### 修改数据库 Schema

```bash
# Edit prisma/schema/schema.prisma
# Then run migration
pnpm prisma:migrate
```

### 添加新组件

```typescript
// components/ui/MyComponent.tsx
export function MyComponent() {
  return <div>Hello</div>
}

// Export in components/ui/index.ts
export { MyComponent } from './MyComponent'
```

### 启用国际化

如果需要支持多语言，请参考详细指南：

```bash
# 查看国际化实施指南
cat docs/guides/I18N_GUIDE.md

# 或直接开始实施
pnpm add next-intl
```

关键步骤：
1. 安装 `next-intl` 依赖
2. 创建 `messages/` 翻译文件（`zh-CN.json`, `en.json`）
3. 配置 `i18n/request.ts` 和 `middleware.ts`
4. 重构 `app/` 目录为 `app/[locale]/` 结构
5. 更新组件使用 `useTranslations()` Hook

详细步骤和代码示例请查看 `docs/guides/I18N_GUIDE.md`。

---

## Testing Instructions

### 本地验证

```bash
# Start dev server
pnpm dev

# Visit pages
open http://localhost:3000          # Homepage
open http://localhost:3000/blog     # Blog list
open http://localhost:3000/about    # About page

# Test API endpoints
curl http://localhost:3000/api/stats
curl http://localhost:3000/api/github
```

### 生产构建测试

```bash
pnpm build
pnpm serve
```

### Docker 测试

```bash
docker compose up -d
docker compose logs -f app
curl http://localhost:3000
```

### 数据库验证

```bash
# Open Prisma Studio
pnpm prisma studio

# Check migrations
pnpm prisma migrate status
```

---

## Troubleshooting

### Contentlayer 构建失败

**症状**: `contentlayer2 build` 报错或类型丢失

**检查**:
1. MDX frontmatter 是否符合 schema（必填字段、日期格式）
2. 删除 `.contentlayer` 缓存后重试
3. 检查 `contentlayer.config.ts` 插件配置

### 数据库连接失败

**症状**: Prisma 查询报错 `Can't reach database server`

**检查**:
1. `.env.local` 中 `POSTGRES_URL` 是否正确
2. PostgreSQL 服务是否运行
3. Docker 环境检查容器网络：`docker compose ps`

### GitHub API 无数据

**症状**: 组件显示空白或 loading 状态

**检查**:
1. 环境变量是否配置（`GITHUB_API_TOKEN`）
2. Token 是否正确且权限充足
3. 浏览器控制台查看 API 响应：`/api/github`

### 样式不生效

**症状**: Tailwind 类名无效或样式丢失

**检查**:
1. `tailwind.config.js` 的 `content` 路径是否包含组件目录
2. 是否导入了 `css/tailwind.css`
3. 清除 `.next` 缓存：`rm -rf .next && pnpm dev`

### 构建体积过大

**症状**: Docker 镜像 > 500MB 或 bundle 过大

**检查**:
1. 使用 `pnpm analyze` 查看 bundle 组成
2. 检查是否误导入整个库（如 `lodash` 应用 `lodash/xxx`）
3. 确认 `next.config.mjs` 启用了 `output: 'standalone'`

---

## Architecture Notes

### 整体架构设计

本项目采用现代化的 **Jamstack + SSG/ISR** 架构，结合 **Server Components** 和 **API Routes**，实现高性能、SEO 友好的博客系统。

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户浏览器                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  静态页面     │  │  客户端组件   │  │  API 调用     │          │
│  │  (SSG/ISR)   │  │  (交互逻辑)   │  │  (动态数据)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js 应用层                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  App Router (app/)                                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ 页面组件    │  │ 布局组件    │  │ API Routes │         │  │
│  │  │ (RSC)      │  │ (Layouts)  │  │ (route.ts) │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  组件层 (components/)                                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ UI 组件     │  │ 功能组件    │  │ 布局组件    │         │  │
│  │  │ (Button)   │  │ (Blog)     │  │ (Header)   │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  逻辑层 (hooks/ + lib/)                                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ Hooks      │  │ Services   │  │ Utils      │         │  │
│  │  │ (SWR)      │  │ (API 封装) │  │ (工具函数)  │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      数据层                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Contentlayer │  │ Prisma ORM   │  │ External APIs│         │
│  │ (MDX → JSON) │  │ (数据库访问)  │  │ (第三方服务)  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         ↓                  ↓                  ↓                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ MDX 文件     │  │ PostgreSQL   │  │ GitHub API   │         │
│  │ (data/blog/) │  │ (统计数据)    │  │ GitHub API   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### 核心架构特点

#### 1. 混合渲染策略

```typescript
// 静态生成 (SSG) - 构建时生成 HTML
// 适用于：博客文章、标签页、关于页
export async function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug.split('/') }))
}

// 增量静态再生成 (ISR) - 定期更新静态页面
export const revalidate = 3600 // 每小时重新生成

// 动态渲染 - 每次请求时生成
// 适用于：API 路由、实时数据
export const dynamic = 'force-dynamic'
```

#### 2. 数据流向

**内容数据流（构建时）**

```
MDX 文件 (data/blog/*.mdx)
    ↓ [Contentlayer 处理]
    ├─ 解析 frontmatter (title, date, tags)
    ├─ 转换 Markdown → HTML
    ├─ 提取目录 (TOC)
    ├─ 生成阅读时间
    └─ 输出类型安全的 JSON
    ↓
.contentlayer/generated/
    ├─ Blog/_index.json (所有文章数据)
    ├─ types.d.ts (TypeScript 类型)
    └─ index.mjs (导出函数)
    ↓
Next.js 页面组件
    ├─ import { allBlogs } from 'contentlayer/generated'
    ├─ 过滤、排序、分页
    └─ 渲染到页面
```

**统计数据流（运行时）**

```
用户交互 (点赞、浏览)
    ↓
Client Component (components/blog/Reactions.tsx)
    ↓
Custom Hook (hooks/use-blog-stats.ts)
    ├─ SWR 缓存管理
    ├─ 乐观更新 (Optimistic UI)
    └─ 自动重新验证
    ↓
API Route (app/api/stats/route.ts)
    ├─ 验证请求
    ├─ 调用 Service 层
    └─ 返回 JSON 响应
    ↓
Service Layer (lib/services/prisma.ts)
    ├─ Prisma Client 查询
    ├─ 事务处理
    └─ 错误处理
    ↓
PostgreSQL 数据库
    └─ tbl_stats 表 (type, slug, views, loves, ...)
```

#### 3. 组件分层策略

```
┌─────────────────────────────────────────────────────────┐
│  页面层 (app/)                                           │
│  - 路由定义                                              │
│  - 数据获取 (Server Components)                          │
│  - 元数据生成 (SEO)                                      │
│  - 布局组合                                              │
└─────────────────────────────────────────────────────────┘
                        ↓ 使用
┌─────────────────────────────────────────────────────────┐
│  布局层 (layouts/)                                       │
│  - PostLayout (默认文章布局)                             │
│  - PostBanner (带横幅布局)                               │
│  - ListLayout (列表布局)                                 │
│  - AuthorLayout (作者页布局)                             │
└─────────────────────────────────────────────────────────┘
                        ↓ 使用
┌─────────────────────────────────────────────────────────┐
│  功能组件层 (components/blog/, components/homepage/)     │
│  - BlogMeta (文章元信息)                                 │
│  - Reactions (点赞组件)                                  │
│  - ViewCounter (浏览量)                                  │
└─────────────────────────────────────────────────────────┘
                        ↓ 使用
┌─────────────────────────────────────────────────────────┐
│  UI 组件层 (components/ui/)                              │
│  - Button (按钮)                                         │
│  - Card (卡片)                                           │
│  - Link (链接)                                           │
│  - Tag (标签)                                            │
└─────────────────────────────────────────────────────────┘
```

#### 4. Server vs Client Components

**Server Components (默认)**
- 用于：数据获取、静态内容、SEO
- 优势：零 JavaScript 发送到客户端、直接访问后端资源
- 示例：博客列表、文章内容、关于页

```typescript
// app/blog/page.tsx (Server Component)
import { allBlogs } from 'contentlayer/generated'

export default async function BlogPage() {
  const posts = allBlogs.filter((p) => !p.draft)
  return <PostList posts={posts} />
}
```

**Client Components ('use client')**
- 用于：交互逻辑、状态管理、浏览器 API
- 优势：响应用户操作、实时更新
- 示例：点赞按钮、主题切换、搜索框

```typescript
// components/blog/Reactions.tsx (Client Component)
'use client'

import { useState } from 'react'
import { useUpdateBlogStats } from '@/hooks/use-blog-stats'

export function Reactions({ slug }) {
  const [count, setCount] = useState(0)
  const updateStats = useUpdateBlogStats()
  
  const handleLove = () => {
    setCount(count + 1)
    updateStats('blog', slug, 'loves')
  }
  
  return <button onClick={handleLove}>❤️ {count}</button>
}
```

#### 5. 性能优化策略

**构建时优化**
- Contentlayer 预处理 MDX（避免运行时解析）
- 静态生成所有博客页面（SSG）
- 自动代码分割（Next.js）
- 图片优化（next/image）

**运行时优化**
- SWR 数据缓存和去重
- 乐观更新（Optimistic UI）
- 懒加载组件（dynamic import）
- 响应式图片（srcset）

**数据库优化**
- Prisma 连接池
- 复合主键索引
- Upsert 操作（减少查询）

### 扩展点

#### 添加新内容类型

```typescript
// contentlayer.config.ts
export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    github: { type: 'string' },
    demo: { type: 'string' },
  },
  computedFields,
}))
```

#### 添加新 API 集成

```typescript
// lib/services/twitter.ts
export async function getLatestTweet() {
  const response = await fetch('https://api.twitter.com/2/tweets', {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
    },
  })
  return response.json()
}

// app/api/twitter/route.ts
import { getLatestTweet } from '@/lib/services/twitter'

export async function GET() {
  const tweet = await getLatestTweet()
  return Response.json(tweet)
}
```

#### 添加新布局

```typescript
// layouts/ProjectLayout.tsx
export default function ProjectLayout({ content, children }) {
  return (
    <div className="project-layout">
      <header>
        <h1>{content.title}</h1>
        <a href={content.github}>GitHub</a>
        <a href={content.demo}>Demo</a>
      </header>
      <main>{children}</main>
    </div>
  )
}
```

### 与其他模块的边界

**明确的职责分离**

| 模块 | 职责 | 不负责 |
|------|------|--------|
| **Contentlayer** | MDX → JSON 转换、类型生成 | 渲染、路由、样式 |
| **Prisma** | 数据库访问、类型安全查询 | 业务逻辑、API 路由 |
| **API Routes** | HTTP 处理、请求验证 | UI 渲染、状态管理 |
| **Components** | UI 渲染、用户交互 | 数据获取、路由逻辑 |
| **Hooks** | 状态管理、副作用 | UI 渲染、API 实现 |
| **Services** | 外部 API 封装、业务逻辑 | HTTP 处理、UI 渲染 |

**数据流单向性**

```
数据源 (MDX, Database, APIs)
    ↓
Services (lib/services/)
    ↓
API Routes (app/api/) 或 Server Components
    ↓
Hooks (hooks/) [可选]
    ↓
Components (components/)
    ↓
用户界面
```

**避免循环依赖**

✅ 正确：`components/ → hooks/ → lib/utils → lib/services`  
❌ 错误：`lib/services → components/` (服务层不应导入组件)

✅ 正确：`app/api/ → lib/services → prisma`  
❌ 错误：`prisma → app/api/` (数据层不应导入 API 层)

---

---

## 文档管理规范

### 文档存放位置

所有项目相关的文档（需求文档、设计文档、指南、说明等）统一存放在 **`docs/`** 目录下。

```
docs/
├── project/               # 面向 GitHub 访客的公开项目文档
│   ├── PROJECT_INTRODUCTION.md  # 项目详细介绍（适合 GitHub 展示）
│   └── ...                # 项目背景、架构、使用说明
├── harness/               # 面向 AI 和维护者的工作文档区
│   ├── canonical/         # Harness facts / 协作事实层
│   ├── specs/             # Harness specs / 需求与任务入口
│   ├── contracts/         # Harness contracts / 数据与接口契约
│   ├── verification/      # Harness verification / 验证与回归检查
│   └── traces/            # Harness traces / 变更记录与复盘
├── requirements/           # 需求文档
│   ├── FEATURE_XXX.md     # 功能需求
│   └── BUG_XXX.md         # Bug 修复需求
├── guides/                # 使用指南
│   ├── DEPLOYMENT.md      # 部署指南
│   ├── I18N_GUIDE.md      # 国际化指南
│   └── CONTRIBUTING.md    # 贡献指南
├── design/                # 设计文档
│   ├── API_DESIGN.md      # API 设计
│   └── DATABASE_SCHEMA.md # 数据库设计
└── notes/                 # 开发笔记
    └── MIGRATION_LOG.md   # 迁移日志
```

### Harness 文档分层

为了让这个仓库更适合长期维护、公开展示和 AI coding agent 接手开发，`docs/` 下明确拆分为两个区域：

- `docs/project/`: 面向 GitHub 访客和公开读者，负责介绍项目本身
- `docs/harness/`: 面向 AI agents 和维护者，负责需求、契约、验证和交付留痕

其中：

- `docs/project/PROJECT_INTRODUCTION.md` 是公开项目介绍入口
- `docs/harness/README.md` 是 AI 工作文档入口

当前建议 AI 在进入非微小任务前，至少优先阅读：

- `docs/harness/canonical/REPO_SPECIFIC_RULES.md`
- `docs/harness/canonical/COMPONENT_INVENTORY.md`
- `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md`
- `docs/harness/verification/TASK_START_CHECKLIST.md`

### 文档命名规范

**1. 需求文档**
- 格式：`FEATURE_<功能名称>.md` 或 `BUG_<问题描述>.md`
- 示例：
  - `FEATURE_USER_AUTH.md` - 用户认证功能需求
  - `FEATURE_COMMENT_SYSTEM.md` - 评论系统需求
  - `BUG_HYDRATION_ERROR.md` - Hydration 错误修复

**2. 指南文档**
- 格式：`<主题>_GUIDE.md` 或 `<主题>.md`
- 示例：
  - `I18N_GUIDE.md` - 国际化指南
  - `DEPLOYMENT.md` - 部署指南
  - `CONTRIBUTING.md` - 贡献指南

**3. 设计文档**
- 格式：`<模块>_DESIGN.md` 或 `<模块>_SCHEMA.md`
- 示例：
  - `API_DESIGN.md` - API 设计文档
  - `DATABASE_SCHEMA.md` - 数据库设计
  - `COMPONENT_ARCHITECTURE.md` - 组件架构

**4. 开发笔记**
- 格式：`<主题>_LOG.md` 或 `<主题>_NOTES.md`
- 示例：
  - `MIGRATION_LOG.md` - 数据库迁移日志
  - `REFACTOR_NOTES.md` - 重构笔记
  - `PERFORMANCE_OPTIMIZATION.md` - 性能优化记录

### 文档模板

**需求文档模板** (`docs/requirements/TEMPLATE.md`)：

```markdown
# [功能名称] 需求文档

## 概述
简要描述功能的目的和价值。

## 用户故事
作为 [角色]，我希望 [功能]，以便 [目标]。

## 功能需求
1. 功能点 1
2. 功能点 2
3. 功能点 3

## 技术方案
- 技术选型
- 实现思路
- 数据结构

## 验收标准
- [ ] 标准 1
- [ ] 标准 2
- [ ] 标准 3

## 相关资源
- 设计稿：[链接]
- API 文档：[链接]
```

**指南文档模板** (`docs/guides/TEMPLATE.md`)：

```markdown
# [主题] 指南

## 简介
简要说明本指南的目的和适用场景。

## 前置条件
- 条件 1
- 条件 2

## 步骤

### 第一步：[步骤名称]
详细说明...

### 第二步：[步骤名称]
详细说明...

## 常见问题
Q: 问题 1？
A: 答案 1

## 参考资源
- [资源 1](链接)
- [资源 2](链接)
```

### 创建文档的最佳实践

**1. 使用 AI 创建文档时**

```bash
# 正确：在 docs/ 目录下创建
请在 docs/guides/ 创建一个国际化指南文档 I18N_GUIDE.md

# 错误：在根目录创建
请创建一个 I18N_GUIDE.md 文档  # ❌ 会污染根目录
```

**2. 文档内容要求**

- 使用清晰的标题层级（`#`, `##`, `###`）
- 包含代码示例（使用代码块）
- 添加目录（对于长文档）
- 保持更新日期和版本信息

**3. 文档引用**

在代码注释或其他文档中引用时：

```typescript
// 参考文档：docs/guides/I18N_GUIDE.md
// 需求文档：docs/requirements/FEATURE_USER_AUTH.md
```

### 根目录文档说明

根目录只保留以下核心文档：

- `README.md` - 项目介绍和快速开始
- `AGENTS.md` - AI 助手使用指南（本文件）
- `PROJECT_STRUCTURE.md` - 项目结构说明
- `API_DOCUMENTATION.md` - API 接口文档
- `CLAUDE.md` - Claude AI 特定指南
- `LICENSE` - 开源协议

**其他所有文档都应放在 `docs/` 目录下。**

---

## Further Reading

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Contentlayer Documentation](https://contentlayer.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
