# layouts/ - Page Layout Components

## Overview

`layouts/` 目录包含不同类型页面的布局组件。职责：

- 为博客文章提供不同的布局样式
- 为作者页面提供专用布局
- 为列表页面提供分页和标签过滤布局
- 统一页面结构和样式

**依赖**: React 19, Contentlayer (MDX 数据), components (UI 组件)

**不负责**: 路由逻辑（在 `app/`）、数据获取（在页面组件）

---

## Setup Commands

```bash
# Development (from project root)
pnpm dev

# View layouts in action
open http://localhost:3000/blog/my-post    # PostLayout
open http://localhost:3000/blog            # ListLayout
open http://localhost:3000/about           # AuthorLayout
```

---

## Code Style

### 目录结构

```
layouts/
├── AuthorLayout.tsx        # Author/about page layout
├── ListLayout.tsx          # Blog list layout (simple)
├── ListLayoutWithTags.tsx  # Blog list with tag filter
├── PostLayout.tsx          # Default post layout
├── PostSimple.tsx          # Simple post layout (no sidebar)
├── PostBanner.tsx          # Post with banner image
└── index.ts                # Unified exports
```

### 命名规范

- **文件名**: PascalCase (`PostLayout.tsx`)
- **组件**: 与文件名相同
- **Props**: `LayoutProps` interface

---

## Usage Examples

### 在 MDX 中指定布局

```mdx
---
title: 'My Blog Post'
date: '2024-03-20'
layout: PostBanner
---

Content here...
```

### 在页面中使用布局

```typescript
// app/blog/[...slug]/page.tsx
import { PostLayout, PostBanner } from '@/layouts'
import { allBlogs } from 'contentlayer/generated'

export default function BlogPost({ params }) {
  const post = allBlogs.find((p) => p.slug === params.slug.join('/'))
  
  const Layout = post.layout === 'PostBanner' ? PostBanner : PostLayout
  
  return <Layout content={post}>{/* Post content */}</Layout>
}
```

### 列表布局

```typescript
// app/blog/page.tsx
import { ListLayoutWithTags } from '@/layouts'
import { allBlogs } from 'contentlayer/generated'

export default function BlogPage() {
  const posts = allBlogs.filter((p) => !p.draft)
  
  return (
    <ListLayoutWithTags
      posts={posts}
      title="All Posts"
    />
  )
}
```

---

## Configuration

### PostLayout (默认文章布局)

包含：
- 文章标题和元信息
- 目录（Table of Contents）
- 文章内容
- 标签
- 作者信息
- 评论区
- 相关文章推荐

```typescript
interface PostLayoutProps {
  content: Blog
  authorDetails: Authors[]
  next?: Blog
  prev?: Blog
  children: React.ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: PostLayoutProps) {
  return (
    <article>
      <header>
        <h1>{content.title}</h1>
        <BlogMeta date={content.date} slug={content.slug} />
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px]">
        <div>{children}</div>
        <aside>
          <TableOfContents />
        </aside>
      </div>
      
      <footer>
        <BlogTags tags={content.tags} />
        <Comments />
      </footer>
    </article>
  )
}
```

### PostBanner (带横幅布局)

在 PostLayout 基础上添加：
- 顶部横幅图片
- 全宽布局
- 更大的标题

### PostSimple (简单布局)

精简版布局：
- 无侧边栏
- 无目录
- 适合短文章

### ListLayoutWithTags (带标签的列表)

包含：
- 标签过滤器
- 搜索框
- 分页
- 文章卡片列表

---

## Common Tasks

### 创建新布局

```typescript
// layouts/MyCustomLayout.tsx
import { Blog } from 'contentlayer/generated'

interface MyCustomLayoutProps {
  content: Blog
  children: React.ReactNode
}

export default function MyCustomLayout({
  content,
  children,
}: MyCustomLayoutProps) {
  return (
    <div className="custom-layout">
      <header>
        <h1>{content.title}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

// Export in layouts/index.ts
export { default as MyCustomLayout } from './MyCustomLayout'
```

### 修改现有布局

```typescript
// layouts/PostLayout.tsx

// Add new section
export default function PostLayout({ content, children }) {
  return (
    <article>
      {/* Existing sections */}
      
      {/* New section */}
      <section className="mt-8">
        <h2>Related Posts</h2>
        <RelatedPosts tags={content.tags} />
      </section>
    </article>
  )
}
```

### 条件渲染布局元素

```typescript
export default function PostLayout({ content, children }) {
  const showTOC = content.toc !== false
  const showComments = content.comments !== false
  
  return (
    <article>
      <div className={showTOC ? 'with-sidebar' : 'full-width'}>
        {children}
        {showTOC && <TableOfContents />}
      </div>
      
      {showComments && <Comments />}
    </article>
  )
}
```

---

## Testing Instructions

### 视觉测试

```bash
# Start dev server
pnpm dev

# Test different layouts
open http://localhost:3000/blog/post-with-banner    # PostBanner
open http://localhost:3000/blog/simple-post         # PostSimple
open http://localhost:3000/blog/default-post        # PostLayout

# Test responsive design
# Resize browser window to check mobile/tablet/desktop views
```

### 测试布局切换

创建测试文章：

```mdx
---
title: 'Test Post'
layout: PostBanner
---

Test content
```

访问并验证使用了正确的布局。

---

## Troubleshooting

### 布局不生效

**症状**: MDX 指定的 layout 未应用

**检查**:
1. `contentlayer.config.ts` 是否正确处理 `layout` 字段
2. 页面组件是否正确读取 `post.layout`
3. 布局组件是否正确导出

```typescript
// app/blog/[...slug]/page.tsx
import * as Layouts from '@/layouts'

const Layout = Layouts[post.layout] || Layouts.PostLayout
```

### 样式冲突

**症状**: 布局样式与全局样式冲突

**检查**:
1. 使用唯一的 class 名称
2. 检查 Tailwind 类名优先级
3. 使用 `@layer` 组织样式

```css
/* css/layouts.css */
@layer components {
  .post-layout {
    @apply max-w-4xl mx-auto;
  }
}
```

### 响应式问题

**症状**: 移动端布局错乱

**检查**:
1. 使用 Tailwind 响应式前缀（`sm:`, `md:`, `lg:`）
2. 测试不同屏幕尺寸
3. 检查侧边栏在移动端是否隐藏

```typescript
<div className="grid grid-cols-1 lg:grid-cols-[1fr_250px]">
  <main>{children}</main>
  <aside className="hidden lg:block">
    <TableOfContents />
  </aside>
</div>
```

### 目录不显示

**症状**: TableOfContents 组件为空

**检查**:
1. MDX 是否包含标题（`## Heading`）
2. `rehype-slug` 插件是否配置
3. 目录数据是否正确传递

---

## Architecture Notes

### 布局选择流程

```
MDX frontmatter (layout: PostBanner)
    ↓
Contentlayer processing
    ↓
Page component reads post.layout
    ↓
Dynamic import layout component
    ↓
Render with layout
```

### 布局组合

```
RootLayout (app/layout.tsx)
    ↓
Page Layout (layouts/PostLayout.tsx)
    ↓
Content Components (components/blog/*)
```

### 响应式策略

- **Mobile First**: 默认单列布局
- **Tablet (md)**: 可选双列
- **Desktop (lg)**: 主内容 + 侧边栏

### 与其他模块的边界

- **app/**: 页面组件使用布局
- **components/**: 布局导入 UI 组件
- **Contentlayer**: 提供文章数据和布局配置

---

---

## 文档管理规范

### 创建文档时的注意事项

当需要创建需求文档、设计文档、指南等文件时，请遵循以下规范：

**统一存放位置：`docs/` 目录**

```
docs/
├── requirements/    # 需求文档
├── guides/         # 使用指南
├── design/         # 设计文档
└── notes/          # 开发笔记
```

**命名规范**
- 需求：`FEATURE_<名称>.md` 或 `BUG_<问题>.md`
- 指南：`<主题>_GUIDE.md`
- 设计：`<模块>_DESIGN.md`

详细规范请参考：[根目录 AGENTS.md - 文档管理规范](../AGENTS.md#文档管理规范)

---

## Further Reading

- [MDX Layouts](https://mdxjs.com/guides/layout/)
- [Contentlayer Layouts](https://contentlayer.dev/docs/concepts/layout)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
