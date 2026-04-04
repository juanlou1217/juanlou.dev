# hooks/ - Custom React Hooks

## Overview

`hooks/` 目录包含自定义 React Hooks，封装可复用的状态逻辑和副作用。职责：

- 封装数据获取逻辑（SWR 集成）
- 管理组件状态和副作用
- 提供类型安全的 API 调用接口
- 处理加载、错误状态

**依赖**: React 19, SWR (数据获取), Next.js (API routes)

**不负责**: UI 渲染（在 `components/`）、API 实现（在 `app/api/`）

---

## Setup Commands

```bash
# Development (from project root)
pnpm dev

# Test hooks in components
# Hooks are used within React components, not standalone
```

---

## Code Style

### 目录结构

```
hooks/
├── use-blog-stats.ts       # Blog statistics (views, likes)
├── use-image-loaded-state.ts # Image loading state
└── index.ts                # Unified exports
```

### 命名规范

- **文件名**: kebab-case with `use-` prefix (`use-blog-stats.ts`)
- **Hook 函数**: camelCase with `use` prefix (`useBlogStats`)
- **返回值**: 数组或对象（保持一致性）

### Hook 模式

```typescript
// Simple hook (returns array)
export function useMyHook(param: string): [data: Data | null, isLoading: boolean] {
  const [data, setData] = useState<Data | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch data
  }, [param])

  return [data, isLoading]
}

// Complex hook (returns object)
export function useMyComplexHook(param: string) {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  })

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch: () => {/* ... */},
  }
}
```

---

## Usage Examples

### 使用博客统计 Hook

```typescript
import { useBlogStats, useUpdateBlogStats } from '@/hooks/use-blog-stats'

function BlogPost({ slug }: { slug: string }) {
  const [stats, isLoading] = useBlogStats('blog', slug)
  const updateStats = useUpdateBlogStats()

  const handleLove = () => {
    updateStats('blog', slug, 'loves')
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <p>Views: {stats?.views || 0}</p>
      <p>Loves: {stats?.loves || 0}</p>
      <button onClick={handleLove}>❤️ Love</button>
    </div>
  )
}
```

### 使用图片加载 Hook

```typescript
import { useImageLoadedState } from '@/hooks/use-image-loaded-state'

function MyImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useImageLoadedState()

  return (
    <img
      src={src}
      onLoad={() => setLoaded(true)}
      className={loaded ? 'opacity-100' : 'opacity-0'}
    />
  )
}
```

---

## Configuration

### SWR 配置

Hooks 使用 SWR 进行数据获取，配置在各 hook 内部：

```typescript
import useSWR from 'swr'
import { fetcher } from '@/lib/utils'

export function useMyData(key: string) {
  const { data, error, isLoading } = useSWR(
    `/api/my-endpoint?key=${key}`,
    fetcher,
    {
      refreshInterval: 30000,      // Refresh every 30s
      revalidateOnFocus: false,    // Don't refetch on window focus
      dedupingInterval: 10000,     // Dedupe requests within 10s
    }
  )

  return { data, error, isLoading }
}
```

### API 端点

Hooks 调用的 API 端点：

- `useBlogStats`: `/api/stats?type={type}&slug={slug}`
- 自定义 hook: 根据需求调用对应 API

---

## Common Tasks

### 创建新 Hook

```typescript
// hooks/use-my-feature.ts
import { useState, useEffect } from 'react'
import { fetcher } from '@/lib/utils'

interface MyData {
  id: string
  name: string
}

export function useMyFeature(id: string): [MyData | null, boolean, Error | null] {
  const [data, setData] = useState<MyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetcher(`/api/my-feature?id=${id}`)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  return [data, isLoading, error]
}

// Export in hooks/index.ts
export { useMyFeature } from './use-my-feature'
```

### 使用 SWR Hook

```typescript
// hooks/use-github-stats.ts
import useSWR from 'swr'
import { fetcher } from '@/lib/utils'

interface GitHubStats {
  stars: number
  forks: number
}

export function useGitHubStats() {
  const { data, error, isLoading } = useSWR<GitHubStats>(
    '/api/github',
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
    }
  )

  return {
    stats: data,
    isLoading,
    isError: error,
  }
}
```

### 创建 Mutation Hook

```typescript
// hooks/use-update-stats.ts
import { mutate } from 'swr'

export function useUpdateStats() {
  return async (type: string, slug: string, action: string) => {
    // Optimistic update
    mutate(
      `/api/stats?type=${type}&slug=${slug}`,
      async (currentData: any) => {
        // Update local cache
        return { ...currentData, [action]: currentData[action] + 1 }
      },
      false // Don't revalidate immediately
    )

    // Send request to server
    await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, slug, action }),
    })

    // Revalidate after mutation
    mutate(`/api/stats?type=${type}&slug=${slug}`)
  }
}
```

---

## Testing Instructions

### 在组件中测试

```typescript
// app/test/page.tsx
'use client'

import { useBlogStats } from '@/hooks/use-blog-stats'

export default function TestPage() {
  const [stats, isLoading] = useBlogStats('blog', 'test-post')

  return (
    <div>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Views: {stats?.views || 0}</p>
    </div>
  )
}
```

### 检查 API 响应

```bash
# Test API endpoint that hook uses
curl http://localhost:3000/api/stats?type=blog&slug=test-post

# Expected response
{"views":10,"loves":5,"applauses":3}
```

### 验证 SWR 缓存

```typescript
// Check SWR cache in browser console
import { cache } from 'swr'

console.log(cache.get('/api/stats?type=blog&slug=test-post'))
```

---

## Troubleshooting

### Hook 返回 undefined

**症状**: Hook 返回的数据始终为 `undefined`

**检查**:
1. API 端点是否正常响应（用 `curl` 测试）
2. `fetcher` 函数是否正确处理响应
3. SWR key 是否正确（URL 拼写、参数）
4. 检查浏览器 Network 面板

```typescript
// Debug fetcher
export async function fetcher(url: string) {
  console.log('Fetching:', url)
  const res = await fetch(url)
  const data = await res.json()
  console.log('Response:', data)
  return data
}
```

### Hook 无限重新请求

**症状**: Network 面板显示同一请求不断发送

**检查**:
1. `useEffect` 依赖数组是否正确
2. SWR `dedupingInterval` 配置
3. 避免在 hook 内部创建新对象/数组作为依赖

```typescript
// Bad (creates new array every render)
useEffect(() => {
  fetchData()
}, [params.filter(x => x)])

// Good (stable dependency)
const filterKey = params.join(',')
useEffect(() => {
  fetchData()
}, [filterKey])
```

### 类型错误

**症状**: TypeScript 报类型不匹配

**检查**:
1. 定义明确的返回类型
2. 使用泛型约束 API 响应类型
3. 处理 `null` 和 `undefined` 情况

```typescript
// Define types
interface Stats {
  views: number
  loves: number
}

export function useBlogStats(
  type: string,
  slug: string
): [Stats | null, boolean] {
  // Implementation
}
```

### SWR 缓存不更新

**症状**: 数据更新后，UI 显示旧数据

**检查**:
1. 使用 `mutate()` 手动触发重新验证
2. 检查 `revalidateOnFocus` 配置
3. 确认 SWR key 一致

```typescript
import { mutate } from 'swr'

// After updating data
mutate('/api/stats?type=blog&slug=my-post')
```

---

## Architecture Notes

### Hook 设计原则

1. **单一职责**: 每个 hook 只做一件事
2. **可组合**: Hooks 可以互相调用
3. **类型安全**: 明确的 TypeScript 类型
4. **错误处理**: 返回错误状态供 UI 处理

### 数据流

```
Component
    ↓
Custom Hook (use-blog-stats.ts)
    ↓
SWR (caching + revalidation)
    ↓
Fetcher (lib/utils/fetcher.ts)
    ↓
API Route (app/api/stats/route.ts)
    ↓
Database (Prisma)
```

### 与其他模块的边界

- **components/**: 被组件导入和使用
- **lib/utils**: 使用 `fetcher` 等工具函数
- **app/api/**: 调用 API 端点获取数据
- **types/**: 导入类型定义

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

- [React Hooks](https://react.dev/reference/react/hooks)
- [SWR Documentation](https://swr.vercel.app/)
- [Custom Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
