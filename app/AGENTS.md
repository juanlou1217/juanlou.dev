# app/ - Next.js App Router

## Overview

`app/` 目录是 Next.js 16 App Router 的核心，负责：

- 定义应用路由结构（文件系统路由）
- 实现页面组件（Server Components 优先）
- 提供 API 端点（Route Handlers）
- 管理全局布局和元数据

**依赖**: React 19, Next.js 16, Contentlayer (内容查询), Prisma (数据库)

**不负责**: UI 组件实现（在 `components/`）、业务逻辑（在 `lib/`）

---

## Setup Commands

```bash
# Development (from project root)
pnpm dev

# Access routes
open http://localhost:3000              # Homepage
open http://localhost:3000/blog         # Blog list
open http://localhost:3000/blog/my-post # Post detail
open http://localhost:3000/tags         # Tags page
open http://localhost:3000/about        # About page

# Test API endpoints
curl http://localhost:3000/api/stats
curl http://localhost:3000/api/github
curl http://localhost:3000/api/newsletter
```

---

## Code Style

### 路由结构

```
app/
├── layout.tsx              # Root layout (applies to all pages)
├── page.tsx                # Homepage route: /
├── not-found.tsx           # 404 page
├── robots.ts               # robots.txt generator
├── sitemap.ts              # sitemap.xml generator
│
├── blog/
│   ├── page.tsx            # /blog
│   ├── [...slug]/
│   │   └── page.tsx        # /blog/post-slug (dynamic)
│   └── page/[page]/
│       └── page.tsx        # /blog/page/2 (pagination)
│
├── tags/
│   ├── page.tsx            # /tags
│   └── [tag]/
│       └── page.tsx        # /tags/nextjs (dynamic)
│
├── about/
│   └── page.tsx            # /about
│
├── projects/
│   └── page.tsx            # /projects
│
└── api/                    # API routes
    ├── stats/route.ts      # GET/POST /api/stats
    ├── github/route.ts     # GET /api/github
    └── newsletter/route.ts # POST /api/newsletter
```

### 命名约定

- **页面**: `page.tsx` (Next.js convention)
- **布局**: `layout.tsx`
- **API 路由**: `route.ts`
- **动态路由**: `[param]/page.tsx` 或 `[...slug]/page.tsx`

### Server vs Client Components

- **默认**: Server Components (无 `'use client'`)
- **需要交互**: 添加 `'use client'` 指令
- **数据获取**: 优先在 Server Components 中进行

---

## Usage Examples

### 创建新页面

```typescript
// app/my-page/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
}

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
    </div>
  )
}
```

### 动态路由

```typescript
// app/blog/[...slug]/page.tsx
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const post = allBlogs.find((p) => p.slug === slug)

  if (!post) notFound()

  return <article>{/* Render post */}</article>
}
```

### API 路由

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  return NextResponse.json({ data: query })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  return NextResponse.json({ success: true })
}
```

---

## Configuration

### 根布局 (`layout.tsx`)

全局布局，包含：
- HTML 结构
- 字体加载
- Theme Provider
- Analytics
- Header/Footer

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
```

### 元数据生成

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'My Page',
}

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.summary,
  }
}
```

---

## Common Tasks

### 添加新路由

```bash
# Create page directory
mkdir -p app/my-route

# Create page component
cat > app/my-route/page.tsx << 'EOF'
export default function MyRoute() {
  return <div>My Route</div>
}
EOF
```

### 添加 API 端点

```bash
mkdir -p app/api/my-api
cat > app/api/my-api/route.ts << 'EOF'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}
EOF
```

### 实现分页

```typescript
// app/blog/page/[page]/page.tsx
const POSTS_PER_PAGE = 10

export default function BlogPage({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page)
  const posts = allBlogs.slice(
    (pageNumber - 1) * POSTS_PER_PAGE,
    pageNumber * POSTS_PER_PAGE
  )

  return <PostList posts={posts} />
}
```

---

## Testing Instructions

### 页面测试

```bash
# Start dev server
pnpm dev

# Test routes manually
open http://localhost:3000/blog
open http://localhost:3000/tags/nextjs
open http://localhost:3000/about

# Check 404 handling
open http://localhost:3000/non-existent
```

### API 测试

```bash
# GET request
curl http://localhost:3000/api/stats?type=blog&slug=my-post

# POST request
curl -X POST http://localhost:3000/api/stats \
  -H "Content-Type: application/json" \
  -d '{"type":"blog","slug":"my-post","action":"loves"}'
```

### 构建验证

```bash
# Build and check for errors
pnpm build

# Check generated routes
ls -la .next/server/app
```

---

## Troubleshooting

### 路由不生效

**症状**: 访问页面返回 404

**检查**:
1. 文件名是否为 `page.tsx`（不是 `Page.tsx` 或其他）
2. 是否在正确的目录层级
3. 动态路由参数名是否匹配
4. 重启 dev server

### 动态路由参数错误

**症状**: `params` 为 undefined 或类型错误

**检查**:
1. 使用 `[param]` 单段或 `[...slug]` 多段
2. `generateStaticParams` 返回的对象键名与文件夹名匹配
3. TypeScript 类型定义正确

### API 路由 CORS 错误

**症状**: 浏览器报 CORS 错误

**解决**:
```typescript
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { data: 'Hello' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    }
  )
}
```

### 元数据不更新

**症状**: SEO 标签显示旧内容

**检查**:
1. 清除 `.next` 缓存
2. 检查 `generateMetadata` 是否正确返回
3. 验证 `layout.tsx` 没有覆盖子页面元数据

---

## Architecture Notes

### 渲染策略

- **Static Generation (SSG)**: 默认，构建时生成 HTML
- **Dynamic Rendering**: 使用 `cookies()`, `headers()` 等动态 API
- **ISR**: 使用 `revalidate` 配置增量静态再生成

### 数据获取模式

```typescript
// Server Component (recommended)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

### 与其他模块的边界

- **components/**: 导入 UI 组件进行渲染
- **lib/**: 调用工具函数和服务
- **layouts/**: 使用布局组件包裹内容
- **Contentlayer**: 导入 `allBlogs`, `allAuthors` 等生成的数据

---

---

## 文档管理规范

### 创建文档时的注意事项

当需要创建需求文档、设计文档、指南等文件时，请遵循以下规范：

**1. 统一存放位置：`docs/` 目录**

```
docs/
├── requirements/    # 需求文档 (FEATURE_*.md, BUG_*.md)
├── guides/         # 使用指南 (*_GUIDE.md)
├── design/         # 设计文档 (*_DESIGN.md)
└── notes/          # 开发笔记 (*_LOG.md, *_NOTES.md)
```

**2. 命名规范**

- 需求文档：`FEATURE_<功能名>.md` 或 `BUG_<问题>.md`
- 指南文档：`<主题>_GUIDE.md`
- 设计文档：`<模块>_DESIGN.md`
- 开发笔记：`<主题>_LOG.md`

**3. 示例**

```bash
# ✅ 正确
docs/guides/I18N_GUIDE.md
docs/requirements/FEATURE_USER_AUTH.md
docs/design/API_DESIGN.md

# ❌ 错误（不要在根目录或模块目录创建文档）
I18N_GUIDE.md
app/FEATURE_USER_AUTH.md
```

详细规范请参考：[根目录 AGENTS.md - 文档管理规范](../AGENTS.md#文档管理规范)

---

## Further Reading

- [Next.js App Router](https://nextjs.org/docs/app)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
