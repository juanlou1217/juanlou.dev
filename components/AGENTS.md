# components/ - React UI Components

## Overview

`components/` 目录包含所有可复用的 React UI 组件，按功能模块组织。职责：

- 提供页面级和通用 UI 组件
- 封装交互逻辑（Client Components）
- 实现响应式设计和主题切换
- 集成第三方组件（Giscus 评论、图片缩放等）

**依赖**: React 19, Tailwind CSS 4, Lucide Icons, next-themes

**不负责**: 数据获取（由页面或 hooks 处理）、路由逻辑（在 `app/`）

---

## Setup Commands

```bash
# Development (from project root)
pnpm dev

# View components in pages
open http://localhost:3000              # Homepage components
open http://localhost:3000/blog         # Blog components
open http://localhost:3000/about        # About components
```

---

## Code Style

### 目录结构

```
components/
├── about/              # About page components
├── analytics/          # Analytics integration (Umami)
├── blog/               # Blog-specific components
│   ├── BlogMeta.tsx
│   ├── BlogNav.tsx
│   ├── Reactions.tsx
│   ├── ViewCounter.tsx
│   └── index.ts
├── footer/             # Footer components
├── header/             # Header components
├── homepage/           # Homepage components
│   ├── Avatar.tsx
│   ├── Greeting.tsx
│   └── index.ts
├── project/            # Project showcase components
└── ui/                 # Generic UI components
    ├── Button.tsx
    ├── Card.tsx
    ├── Link.tsx
    ├── Tag.tsx
    ├── MDXComponents.tsx
    └── index.ts
```

### 命名规范

- **组件文件**: PascalCase (`BlogCard.tsx`)
- **导出文件**: `index.ts` (统一导出)
- **Client Components**: 文件顶部添加 `'use client'`
- **Props 类型**: `ComponentNameProps` interface

### 组件模式

```typescript
// Server Component (default)
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>
}

// Client Component (with interactivity)
'use client'

import { useState } from 'react'

interface MyInteractiveProps {
  initialValue: number
}

export function MyInteractive({ initialValue }: MyInteractiveProps) {
  const [count, setCount] = useState(initialValue)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## Usage Examples

### 导入组件

```typescript
// From specific module
import { BlogMeta, BlogNav, Reactions } from '@/components/blog'

// From UI components
import { Button, Card, Link, Tag } from '@/components/ui'

// From homepage
import { Avatar, Greeting, ProfileCard } from '@/components/homepage'
```

### 使用 UI 组件

```typescript
import { Button, Card, Link } from '@/components/ui'

export default function MyPage() {
  return (
    <Card>
      <h2>Title</h2>
      <Link href="/blog">Read Blog</Link>
      <Button onClick={() => console.log('clicked')}>Click Me</Button>
    </Card>
  )
}
```

### 使用博客组件

```typescript
import { BlogMeta, Reactions, ViewCounter } from '@/components/blog'

export default function BlogPost({ post }) {
  return (
    <article>
      <BlogMeta date={post.date} slug={post.slug} />
      <ViewCounter slug={post.slug} />
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      <Reactions slug={post.slug} />
    </article>
  )
}
```

### 使用 MDX 组件

```typescript
import { MDXComponents } from '@/components/ui'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

export default function Post({ post }) {
  return (
    <MDXLayoutRenderer
      code={post.body.code}
      components={MDXComponents}
    />
  )
}
```

---

## Configuration

### Tailwind 样式

所有组件使用 Tailwind CSS 类名：

```typescript
// Responsive design
<div className="flex flex-col md:flex-row lg:gap-8">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Custom utilities (defined in tailwind.config.js)
<div className="gradient-border">
```

### 主题切换

```typescript
// components/header/ThemeSwitch.tsx
'use client'

import { useTheme } from 'next-themes'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

### 图标使用

```typescript
import { Github, Twitter, Mail } from 'lucide-react'

export function SocialLinks() {
  return (
    <div>
      <Github className="h-5 w-5" />
      <Twitter className="h-5 w-5" />
      <Mail className="h-5 w-5" />
    </div>
  )
}
```

---

## Common Tasks

### 创建新组件

```bash
# Create component file
cat > components/ui/MyComponent.tsx << 'EOF'
interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
EOF

# Export in index.ts
echo "export { MyComponent } from './MyComponent'" >> components/ui/index.ts
```

### 添加 Client Component

```typescript
// components/ui/Counter.tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### 创建复合组件

```typescript
// components/ui/Card.tsx
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border p-4">{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// Usage
import { Card, CardHeader, CardContent } from '@/components/ui/Card'

<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## Testing Instructions

### 视觉测试

```bash
# Start dev server
pnpm dev

# Check components in different pages
open http://localhost:3000              # Homepage components
open http://localhost:3000/blog         # Blog list components
open http://localhost:3000/blog/my-post # Blog post components

# Test responsive design (resize browser)
# Test dark mode (toggle theme switch)
```

### 组件隔离测试

在页面中临时渲染组件：

```typescript
// app/test/page.tsx
import { Button, Card } from '@/components/ui'

export default function TestPage() {
  return (
    <div className="p-8">
      <Card>
        <Button>Test Button</Button>
      </Card>
    </div>
  )
}
```

---

## Troubleshooting

### Hydration 错误

**症状**: 控制台报 "Hydration failed" 或 "Text content does not match"

**检查**:
1. Server 和 Client 渲染内容是否一致
2. 使用 `useEffect` 处理仅客户端的逻辑
3. 避免在 Server Component 中使用 `Date.now()` 等动态值

```typescript
// Bad
export function Time() {
  return <div>{new Date().toISOString()}</div>
}

// Good
'use client'
import { useEffect, useState } from 'react'

export function Time() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toISOString())
  }, [])

  return <div>{time}</div>
}
```

### 样式不生效

**症状**: Tailwind 类名无效

**检查**:
1. `tailwind.config.js` 的 `content` 包含 `components/**/*.{js,ts,jsx,tsx}`
2. 类名拼写正确（无动态拼接）
3. 清除缓存：`rm -rf .next && pnpm dev`

```typescript
// Bad (dynamic class names)
<div className={`text-${color}-500`}>

// Good (use full class names)
<div className={color === 'red' ? 'text-red-500' : 'text-blue-500'}>
```

### 主题切换不工作

**症状**: Dark mode 切换无效

**检查**:
1. `layout.tsx` 包含 `<ThemeProviders>`
2. 使用 `dark:` 前缀定义暗色样式
3. `next-themes` 正确配置

### 图标不显示

**症状**: Lucide 图标不渲染

**检查**:
1. 导入路径正确：`import { Icon } from 'lucide-react'`
2. 添加 `className` 设置尺寸：`<Icon className="h-5 w-5" />`

---

## Architecture Notes

### 组件分层

```
ui/                 # 最底层：通用组件（Button, Card, Link）
    ↓
feature modules/    # 中间层：功能组件（blog/, homepage/, header/)
    ↓
pages (app/)        # 顶层：页面组合组件
```

### Server vs Client

- **Server Components**: 默认，用于静态内容、数据获取
- **Client Components**: 需要交互（`onClick`, `useState`, `useEffect`）

### 样式策略

- **Tailwind 优先**: 使用 utility classes
- **CSS Modules**: 仅在需要复杂动画或特殊样式时使用
- **内联样式**: 避免使用（除非动态计算）

### 与其他模块的边界

- **hooks/**: 导入自定义 hooks 处理状态和副作用
- **lib/**: 调用工具函数（格式化日期、URL 等）
- **types/**: 导入 TypeScript 类型定义
- **app/**: 被页面导入和使用

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

- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)
