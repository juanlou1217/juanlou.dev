# 项目结构文档

## 项目概述

这是一个基于 **Next.js 16 + React 19 + TypeScript** 构建的个人博客系统，采用 App Router 架构，使用 Contentlayer 管理 MDX 内容，PostgreSQL 存储统计数据，并集成 GitHub API。

## 技术栈

- **框架**: Next.js 16 (App Router + Turbopack)
- **UI**: React 19 + Tailwind CSS 4
- **内容**: Contentlayer 2 (MDX)
- **数据库**: PostgreSQL + Prisma 7
- **部署**: Vercel / Docker
- **包管理**: pnpm
- **代码质量**: ESLint + Prettier + Husky

---

## 目录结构总览

```
karhdo.dev/
├── app/                    # Next.js App Router（路由和页面）
├── components/             # React 组件
├── layouts/                # 页面布局组件
├── hooks/                  # 自定义 React Hooks
├── lib/                    # 工具函数和服务
├── types/                  # TypeScript 类型定义
├── data/                   # 内容数据（MDX 文章、配置）
├── public/                 # 静态资源
├── prisma/                 # 数据库 Schema 和迁移
├── providers/              # React Context Providers
├── css/                    # 全局样式
├── icons/                  # SVG 图标
├── scripts/                # 构建脚本
├── .contentlayer/          # Contentlayer 生成的文件
├── .next/                  # Next.js 构建输出
└── 配置文件                # 各种配置文件
```

---

## 核心目录详解

### 📁 `app/` - 应用路由（Next.js App Router）

Next.js 的文件系统路由，文件夹结构即 URL 结构。

```
app/
├── layout.tsx              # 根布局（全局布局）
├── page.tsx                # 首页 /
├── not-found.tsx           # 404 页面
├── robots.ts               # robots.txt 生成
├── sitemap.ts              # sitemap.xml 生成
├── tag-data.json           # 标签统计数据（构建时生成）
│
├── about/                  # 关于页面
│   └── page.tsx            # /about
│
├── blog/                   # 博客相关
│   ├── page.tsx            # /blog（博客列表）
│   ├── [...slug]/          # 动态路由
│   │   └── page.tsx        # /blog/文章slug（文章详情）
│   └── page/
│       └── [page]/
│           └── page.tsx    # /blog/page/1（分页）
│
├── projects/               # 项目展示
│   └── page.tsx            # /projects
│
├── tags/                   # 标签相关
│   ├── page.tsx            # /tags（标签列表）
│   └── [tag]/
│       └── page.tsx        # /tags/标签名（按标签筛选）
│
└── api/                    # API 路由
    ├── github/
    │   └── route.ts        # GET /api/github
    ├── stats/
    │   └── route.ts        # GET/POST /api/stats
    └── newsletter/
        └── route.ts        # GET/POST /api/newsletter
```

**关键文件说明**：
- `layout.tsx`: 定义全局布局（Header、Footer、Providers）
- `page.tsx`: 每个文件夹的页面组件
- `route.ts`: API 路由处理器

---

### 📁 `components/` - React 组件

按功能模块组织的 UI 组件。

```
components/
├── about/                  # 关于页面组件
│   ├── AboutCard.tsx
│   ├── AboutContent.tsx
│   └── ...
│
├── analytics/              # 分析统计组件
│   └── umami.tsx           # Umami 分析
│
├── blog/                   # 博客相关组件
│   ├── BlogMeta.tsx        # 文章元信息
│   ├── BlogNav.tsx         # 文章导航
│   ├── BlogTags.tsx        # 文章标签
│   ├── Reactions.tsx       # 用户反应（点赞等）
│   ├── TableOfContents.tsx # 目录
│   ├── ViewCounter.tsx     # 浏览量计数器
│   └── index.ts
│
├── footer/                 # 页脚组件
│   ├── Footer.tsx          # 主页脚
│   ├── FooterBottom.tsx    # 页脚底部
│   ├── FooterMeta.tsx      # 页脚元信息
│   ├── FooterNav.tsx       # 页脚导航
│   ├── BuildWith.tsx       # 技术栈展示
│   ├── LastCommit.tsx      # 最后提交信息
│   ├── LogoAndRepo.tsx     # Logo 和仓库链接
│   └── index.tsx
│
├── header/                 # 页头组件
│   ├── Header.tsx          # 主页头
│   ├── Logo.tsx            # Logo
│   ├── MobileNav.tsx       # 移动端导航
│   ├── SearchButton.tsx    # 搜索按钮
│   ├── ThemeSwitch.tsx     # 主题切换
│   ├── AnalyticsLink.tsx   # 分析链接
│   └── index.ts
│
├── homepage/               # 首页组件
│   ├── HomeContent.tsx     # 首页内容
│   ├── Avatar.tsx          # 头像
│   ├── Greeting.tsx        # 问候语
│   ├── Heading.tsx         # 标题
│   ├── ProfileCard.tsx     # 个人资料卡片
│   ├── ProfileInfo.tsx     # 个人信息
│   ├── ShortDescription.tsx # 简短描述
│   ├── TypedBios.tsx       # 打字机效果简介
│   ├── BlogLinks.tsx       # 博客链接
│   ├── PopularTags.tsx     # 热门标签
│   └── index.ts
│
├── project/                # 项目展示组件
│   ├── ProjectCard.tsx     # 项目卡片
│   └── ...
│
└── ui/                     # 通用 UI 组件
    ├── Button.tsx          # 按钮
    ├── Card.tsx            # 卡片
    ├── Link.tsx            # 链接
    ├── Image.tsx           # 图片
    ├── Tag.tsx             # 标签
    ├── Container.tsx       # 容器
    ├── PageTitle.tsx       # 页面标题
    ├── SectionContainer.tsx # 区块容器
    ├── Comments.tsx        # 评论组件
    ├── Zoom.tsx            # 图片放大
    ├── TableWrapper.tsx    # 表格包装器
    ├── BrandIcon.tsx       # 品牌图标
    ├── Twemoji.tsx         # Emoji 组件
    ├── GrowingUnderline.tsx # 下划线动画
    ├── TiltedGridBackground.tsx # 倾斜网格背景
    ├── ScrollTopAndComment.tsx # 滚动到顶部和评论
    ├── MDXComponents.tsx   # MDX 自定义组件
    └── index.ts
```

**组件设计原则**：
- 按功能模块分组（about、blog、homepage 等）
- 通用组件放在 `ui/` 目录
- 每个模块有 `index.ts` 统一导出

---

### 📁 `layouts/` - 页面布局

不同类型页面的布局组件。

```
layouts/
├── AuthorLayout.tsx        # 作者页面布局
├── ListLayout.tsx          # 列表布局（博客列表）
├── ListLayoutWithTags.tsx  # 带标签的列表布局
├── PostLayout.tsx          # 文章布局（默认）
├── PostSimple.tsx          # 简单文章布局
├── PostBanner.tsx          # 带横幅的文章布局
└── index.ts
```

**使用方式**：
在 MDX 文章的 frontmatter 中指定：
```yaml
---
title: 我的文章
layout: PostBanner
---
```

---

### 📁 `hooks/` - 自定义 Hooks

封装可复用的逻辑。

```
hooks/
├── use-blog-stats.ts       # 博客统计 Hook
│   ├── useBlogStats()      # 获取统计数据
│   └── useUpdateBlogStats() # 更新统计数据
├── use-image-loaded-state.ts # 图片加载状态 Hook
└── index.ts
```

**使用示例**：
```typescript
import { useBlogStats } from '@/hooks';

// 获取文章统计
const [stats, isLoading] = useBlogStats('blog', 'my-post');

```

---

### 📁 `lib/` - 工具函数和服务

业务逻辑和工具函数。

```
lib/
├── services/               # 外部服务集成
│   ├── github.ts           # GitHub API 服务
│   └── prisma.ts           # Prisma 数据库客户端
│
├── utils/                  # 工具函数
│   └── index.ts            # 通用工具（fetcher 等）
│
└── seo.ts                  # SEO 相关工具
```

**服务层说明**：
- `github.ts`: 封装 GitHub GraphQL API 调用
- `prisma.ts`: 导出 Prisma 客户端实例

---

### 📁 `data/` - 内容数据

博客文章、作者信息、配置等。

```
data/
├── blog/                   # 博客文章（MDX）
│   ├── exploring-module-in-nestjs.mdx
│   ├── how-to-prevent-overbooking-in-sql.mdx
│   └── problems-when-the-application-develops.mdx
│
├── authors/                # 作者信息（MDX）
│   └── default.mdx
│
├── siteMetadata.js         # 网站元数据配置
├── navigation.ts           # 导航链接配置
├── popularTags.ts          # 热门标签配置
├── projectsData.ts         # 项目数据
└── references-data.bib     # 引用数据（BibTeX）
```

**MDX 文章格式**：
```mdx
---
title: '文章标题'
date: '2024-03-20'
tags: ['nextjs', 'typescript']
draft: false
summary: '文章摘要'
images: ['/static/images/banner.jpg']
authors: ['default']
layout: PostLayout
---

文章内容...
```

---

### 📁 `prisma/` - 数据库

Prisma ORM 配置和数据库迁移。

```
prisma/
├── schema/                 # Schema 定义
│   ├── schema.prisma       # 主 Schema 文件
│   └── models/
│       └── Stats.prisma    # Stats 模型定义
│
├── migrations/             # 数据库迁移文件
│   ├── 20230921142214_init_db/
│   └── 20241227070913_create_tbl_stats/
│
└── generated/              # Prisma 生成的客户端
    └── prisma/
```

**Stats 模型**：
```prisma
model Stats {
  type      StatsType @default(blog)
  slug      String
  views     Int       @default(0)
  loves     Int       @default(0)
  applauses Int       @default(0)
  ideas     Int       @default(0)
  bullseye  Int       @default(0)
  
  @@id([type, slug])
}
```

---

### 📁 `types/` - TypeScript 类型

全局类型定义。

```
types/
├── index.ts                # 通用类型
├── components.ts           # 组件类型
├── data.ts                 # 数据类型
├── prisma.ts               # Prisma 类型
├── server.ts               # 服务端类型
└── giscus-configs.type.ts  # Giscus 配置类型
```

---

### 📁 `public/` - 静态资源

公开访问的静态文件。

```
public/
├── static/
│   ├── images/             # 图片资源
│   │   ├── avatar.png
│   │   ├── logo.svg
│   │   ├── projects/       # 项目截图
│   │   └── blog/           # 博客配图
│   │
│   ├── icons/              # 图标
│   │   ├── github.svg
│   │   ├── twitter.svg
│   │   └── ...
│   │
│   └── favicons/           # 网站图标
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── ...
│
└── search.json             # 搜索索引（构建时生成）
```

---

### 📁 `providers/` - Context Providers

React Context 提供者。

```
providers/
└── theme-providers.tsx     # 主题提供者（next-themes）
```

---

### 📁 `constants/` - 常量

全局常量定义。

```
constants/
└── index.ts                # API URLs、配置常量等
```

---

### 📁 `css/` - 样式文件

全局样式和主题。

```
css/
├── tailwind.css            # Tailwind 主样式
├── prism.css               # 代码高亮样式
├── twemoji.css             # Emoji 样式
└── docsearch.css           # 搜索样式
```

---

### 📁 `scripts/` - 构建脚本

自动化脚本。

```
scripts/
├── postbuild.mjs           # 构建后脚本
├── postgenerate.mjs        # Prisma 生成后脚本
└── rss.mjs                 # RSS Feed 生成
```

---

### 📁 `.contentlayer/` - Contentlayer 输出

Contentlayer 生成的类型和数据（自动生成，不要手动修改）。

```
.contentlayer/
├── generated/              # 生成的类型和数据
│   ├── index.d.ts
│   ├── index.mjs
│   ├── Blog/               # 博客文章数据
│   └── Authors/            # 作者数据
│
└── .cache/                 # 缓存
```

---

## 配置文件说明

### 核心配置

| 文件 | 说明 |
|------|------|
| `next.config.mjs` | Next.js 配置（Contentlayer、Bundle Analyzer、安全头） |
| `contentlayer.config.ts` | Contentlayer 配置（MDX 处理、插件） |
| `tailwind.config.js` | Tailwind CSS 配置（主题、颜色） |
| `tsconfig.json` | TypeScript 配置 |
| `eslint.config.mjs` | ESLint 配置 |
| `.prettierrc` | Prettier 配置 |
| `prisma.config.ts` | Prisma 配置 |
| `postcss.config.js` | PostCSS 配置 |

### 环境配置

| 文件 | 说明 |
|------|------|
| `.env.local` | 本地环境变量（不提交到 Git） |
| `.env.example` | 环境变量示例 |

### 部署配置

| 文件 | 说明 |
|------|------|
| `vercel.json` | Vercel 部署配置 |
| `Dockerfile` | Docker 镜像配置 |
| `docker-compose.yml` | Docker Compose 配置 |
| `.dockerignore` | Docker 忽略文件 |

### Git 配置

| 文件 | 说明 |
|------|------|
| `.gitignore` | Git 忽略文件 |
| `.gitattributes` | Git 属性配置 |
| `.husky/pre-commit` | Git 预提交钩子 |

### 包管理

| 文件 | 说明 |
|------|------|
| `package.json` | 项目依赖和脚本 |
| `pnpm-lock.yaml` | pnpm 锁文件 |

---

## 数据流向

### 1. 博客文章渲染流程

```
MDX 文件 (data/blog/*.mdx)
    ↓
Contentlayer 处理
    ↓
生成类型安全数据 (.contentlayer/generated)
    ↓
Next.js 页面组件 (app/blog/[...slug]/page.tsx)
    ↓
布局组件 (layouts/PostLayout.tsx)
    ↓
渲染到浏览器
```

### 2. 统计数据流程

```
用户交互（点赞、浏览）
    ↓
React Hook (hooks/use-blog-stats.ts)
    ↓
API 路由 (app/api/stats/route.ts)
    ↓
Prisma 服务 (lib/services/prisma.ts)
    ↓
PostgreSQL 数据库
```

---

## 路径别名

在 `tsconfig.json` 中配置了路径别名：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/data/*": ["data/*"],
      "@/types/*": ["types/*"]
    }
  }
}
```

**使用示例**：
```typescript
import { Button } from '@/components/ui/Button';
import { fetcher } from '@/lib/utils';
import siteMetadata from '@/data/siteMetadata';
import type { Stats } from '@/types/prisma';
```

---

## 开发工作流

### 1. 添加新博客文章

```bash
# 1. 在 data/blog/ 创建 MDX 文件
touch data/blog/my-new-post.mdx

# 2. 编写文章内容（包含 frontmatter）

# 3. 启动开发服务器（Contentlayer 自动处理）
pnpm dev

# 4. 访问 http://localhost:3000/blog/my-new-post
```

### 2. 添加新组件

```bash
# 1. 在对应目录创建组件
touch components/ui/MyComponent.tsx

# 2. 导出组件
echo "export { MyComponent } from './MyComponent';" >> components/ui/index.ts

# 3. 在页面中使用
import { MyComponent } from '@/components/ui';
```

### 3. 添加新 API 路由

```bash
# 1. 创建路由文件
mkdir -p app/api/my-api
touch app/api/my-api/route.ts

# 2. 实现 HTTP 方法
export async function GET(request: NextRequest) {
  return Response.json({ data: 'Hello' });
}

# 3. 访问 http://localhost:3000/api/my-api
```

---

## 构建和部署

### 本地构建

```bash
# 开发模式
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm serve
```

### Docker 部署

```bash
# 构建镜像
docker build -t karhdo-blog .

# 启动服务
docker compose up -d
```

### Vercel 部署

```bash
# 推送到 GitHub
git push origin main

# Vercel 自动部署
```

---

## 项目特点

✅ **类型安全**: 全面使用 TypeScript  
✅ **内容管理**: Contentlayer 处理 MDX，类型安全  
✅ **性能优化**: Next.js 16 + Turbopack，快速构建  
✅ **SEO 友好**: 自动生成 sitemap、robots.txt  
✅ **响应式设计**: Tailwind CSS，移动端适配  
✅ **代码质量**: ESLint + Prettier + Husky  
✅ **数据持久化**: PostgreSQL + Prisma  
✅ **实时数据**: SWR 缓存，自动刷新  
✅ **Docker 支持**: 容器化部署  

---

## 相关文档

- [API 接口文档](./API_DOCUMENTATION.md)
- [README](./README.MD)
- [CLAUDE.md](./CLAUDE.md) - AI 助手指南
