# lib/ - Utilities and Services

## Overview

`lib/` 目录包含工具函数和外部服务集成。职责：

- 封装第三方 API 调用（GitHub）
- 提供数据库客户端（Prisma）
- 实现通用工具函数（fetcher, formatters）
- 处理 SEO 相关逻辑

**依赖**: Prisma, Octokit (GitHub API), PostgreSQL

**不负责**: UI 渲染（在 `components/`）、路由逻辑（在 `app/`）

---

## Setup Commands

```bash
# Development (from project root)
pnpm dev

# Test services (requires env vars)
# GitHub API
curl http://localhost:3000/api/github

# Database (Prisma)
pnpm prisma studio
```

---

## Code Style

### 目录结构

```
lib/
├── services/               # External service integrations
│   ├── prisma.ts           # Prisma database client
│   ├── github.ts           # GitHub GraphQL API
│   └── ...
│
├── utils/                  # Utility functions
│   └── index.ts            # Common utilities (fetcher, etc.)
│
└── seo.ts                  # SEO utilities
```

### 命名规范

- **服务文件**: 小写 (`github.ts`, `prisma.ts`)
- **函数**: camelCase (`getGitHubStats`, `getNowPlaying`)
- **常量**: UPPER_SNAKE_CASE (`GITHUB_QUERY`)
- **类型**: PascalCase (`GitHubStats`, `RepositoryData`)

---

## Usage Examples

### 使用 Prisma 客户端

```typescript
import { prisma } from '@/lib/services/prisma'

// Query stats
const stats = await prisma.stats.findUnique({
  where: {
    type_slug: {
      type: 'blog',
      slug: 'my-post',
    },
  },
})

// Update stats
await prisma.stats.upsert({
  where: {
    type_slug: { type: 'blog', slug: 'my-post' },
  },
  update: {
    views: { increment: 1 },
  },
  create: {
    type: 'blog',
    slug: 'my-post',
    views: 1,
  },
})
```

### 调用 GitHub API

```typescript
import { getGitHubStats } from '@/lib/services/github'

// Get repository stats
const stats = await getGitHubStats()
// Returns: { stars: 100, forks: 20, ... }
```

### 使用工具函数

```typescript
import { fetcher } from '@/lib/utils'

// Fetch data from API
const data = await fetcher('/api/stats?type=blog&slug=my-post')

// With SWR
import useSWR from 'swr'
const { data } = useSWR('/api/stats', fetcher)
```

---

## Configuration

### Prisma 客户端 (`services/prisma.ts`)

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### GitHub API (`services/github.ts`)

需要环境变量：
```bash
GITHUB_API_TOKEN=ghp_xxxxx
```

```typescript
import { graphql } from '@octokit/graphql'

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
})

export async function getGitHubStats() {
  const { repository } = await graphqlWithAuth(`
    query {
      repository(owner: "username", name: "repo") {
        stargazerCount
        forkCount
      }
    }
  `)

  return {
    stars: repository.stargazerCount,
    forks: repository.forkCount,
  }
}
```

## Common Tasks

### 添加新服务

```typescript
// lib/services/my-service.ts
interface MyServiceData {
  id: string
  value: number
}

export async function getMyServiceData(): Promise<MyServiceData> {
  const response = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.MY_SERVICE_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}
```

### 添加工具函数

```typescript
// lib/utils/index.ts

// Fetcher for SWR
export async function fetcher(url: string) {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  return res.json()
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Slugify text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}
```

### 数据库查询封装

```typescript
// lib/services/stats.ts
import { prisma } from './prisma'

export async function getStats(type: string, slug: string) {
  return prisma.stats.findUnique({
    where: {
      type_slug: { type, slug },
    },
  })
}

export async function incrementStat(
  type: string,
  slug: string,
  field: 'views' | 'loves' | 'applauses'
) {
  return prisma.stats.upsert({
    where: {
      type_slug: { type, slug },
    },
    update: {
      [field]: { increment: 1 },
    },
    create: {
      type,
      slug,
      [field]: 1,
    },
  })
}
```

---

## Testing Instructions

### 测试 Prisma 连接

```bash
# Open Prisma Studio
pnpm prisma studio

# Run query in code
node -e "
const { prisma } = require('./lib/services/prisma.ts');
prisma.stats.findMany().then(console.log);
"
```

### 测试 GitHub API

```bash
# Test via API route
curl http://localhost:3000/api/github

# Expected response
{"stars":100,"forks":20}
```

### 测试工具函数

```typescript
// app/test/page.tsx
import { formatDate, slugify } from '@/lib/utils'

export default function TestPage() {
  console.log(formatDate('2024-03-20'))  // "2024年3月20日"
  console.log(slugify('Hello World!'))   // "hello-world"

  return <div>Check console</div>
}
```

---

## Troubleshooting

### Prisma 连接失败

**症状**: `PrismaClientInitializationError: Can't reach database server`

**检查**:
1. `.env.local` 中 `POSTGRES_URL` 是否正确
2. PostgreSQL 服务是否运行：`docker compose ps` 或 `pg_isready`
3. 数据库迁移是否完成：`pnpm prisma migrate status`
4. 网络连接（Docker 容器网络）

```bash
# Test database connection
psql $POSTGRES_URL -c "SELECT 1"

# Check migrations
pnpm prisma migrate status
```

### GitHub API 限流

**症状**: API 返回 403 或 rate limit 错误

**检查**:
1. `GITHUB_API_TOKEN` 是否配置
2. Token 权限是否足够（需要 `public_repo` scope）
3. 检查 rate limit：`curl -H "Authorization: token $GITHUB_API_TOKEN" https://api.github.com/rate_limit`

**解决**:
- 使用认证 token（提高限额到 5000/hour）
- 添加缓存（SWR `refreshInterval`）
- 使用 GraphQL 减少请求次数

### Fetcher 错误处理

**症状**: `fetcher` 抛出错误但没有详细信息

**改进**:
```typescript
export async function fetcher(url: string) {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}
```

---

## Architecture Notes

### 服务层设计

```
API Routes (app/api/)
    ↓
Services (lib/services/)
    ↓
External APIs / Database
```

- **职责分离**: API routes 处理 HTTP，services 处理业务逻辑
- **可测试**: Services 可独立测试，不依赖 Next.js
- **可复用**: Services 可在多个 API routes 中使用

### Prisma 单例模式

```typescript
// Avoid multiple instances in development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

### 错误处理策略

1. **服务层**: 抛出明确的错误（带状态码和消息）
2. **API 层**: 捕获错误，返回适当的 HTTP 响应
3. **客户端**: 使用 SWR 的 `error` 状态显示 UI

### 与其他模块的边界

- **app/api/**: 调用 services 获取数据
- **hooks/**: 通过 API routes 间接使用 services
- **components/**: 不直接调用 services（通过 hooks）

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

- [Prisma Documentation](https://www.prisma.io/docs)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
