# prisma/ - Database Schema and Migrations

## Overview

`prisma/` 目录管理数据库 schema 定义和迁移历史。职责：

- 定义数据库表结构（Prisma Schema）
- 管理数据库迁移（版本控制）
- 生成类型安全的 Prisma Client
- 提供数据库访问接口

**依赖**: Prisma 7, PostgreSQL, pg (adapter)

**不负责**: 业务逻辑（在 `lib/services/`）、API 实现（在 `app/api/`）

---

## Setup Commands

### 初始化数据库

```bash
# Install dependencies
pnpm install

# Generate Prisma Client
pnpm prisma:generate

# Run migrations (development)
pnpm prisma:migrate

# Run migrations (production)
pnpm prisma:migrate:deploy
```

### 开发工具

```bash
# Open Prisma Studio (database GUI)
pnpm prisma studio

# Check migration status
pnpm prisma migrate status

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Format schema file
pnpm prisma format
```

---

## Code Style

### 目录结构

```
prisma/
├── schema/
│   ├── schema.prisma       # Main schema file
│   └── models/
│       └── Stats.prisma    # Stats model (if split)
│
├── migrations/             # Migration history
│   ├── 20230921142214_init_db/
│   │   └── migration.sql
│   └── 20241227070913_create_tbl_stats/
│       └── migration.sql
│
└── generated/              # Generated Prisma Client (auto-generated)
```

### Schema 约定

```prisma
// Use camelCase for model names
model Stats {
  // Use camelCase for field names
  type      StatsType @default(blog)
  slug      String
  views     Int       @default(0)
  
  // Composite primary key
  @@id([type, slug])
  
  // Indexes for performance
  @@index([type])
  @@index([slug])
}

// Use PascalCase for enum names
enum StatsType {
  blog
  project
}
```

---

## Usage Examples

### 查询数据

```typescript
import { prisma } from '@/lib/services/prisma'

// Find unique record
const stats = await prisma.stats.findUnique({
  where: {
    type_slug: {
      type: 'blog',
      slug: 'my-post',
    },
  },
})

// Find many records
const allStats = await prisma.stats.findMany({
  where: {
    type: 'blog',
  },
  orderBy: {
    views: 'desc',
  },
  take: 10,
})

// Aggregate
const totalViews = await prisma.stats.aggregate({
  _sum: {
    views: true,
  },
  where: {
    type: 'blog',
  },
})
```

### 更新数据

```typescript
// Update existing record
await prisma.stats.update({
  where: {
    type_slug: { type: 'blog', slug: 'my-post' },
  },
  data: {
    views: { increment: 1 },
  },
})

// Upsert (update or create)
await prisma.stats.upsert({
  where: {
    type_slug: { type: 'blog', slug: 'my-post' },
  },
  update: {
    loves: { increment: 1 },
  },
  create: {
    type: 'blog',
    slug: 'my-post',
    loves: 1,
  },
})
```

### 删除数据

```typescript
// Delete single record
await prisma.stats.delete({
  where: {
    type_slug: { type: 'blog', slug: 'my-post' },
  },
})

// Delete many records
await prisma.stats.deleteMany({
  where: {
    type: 'blog',
  },
})
```

---

## Configuration

### Schema 文件 (`schema/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model Stats {
  type      StatsType @default(blog)
  slug      String
  views     Int       @default(0)
  loves     Int       @default(0)
  applauses Int       @default(0)
  ideas     Int       @default(0)
  bullseye  Int       @default(0)
  
  @@id([type, slug])
  @@map("tbl_stats")
}

enum StatsType {
  blog
  project
}
```

### 环境变量

```bash
# .env.local
POSTGRES_URL=postgresql://user:password@localhost:5432/blog_db

# For connection pooling (optional)
POSTGRES_PRISMA_URL=postgresql://user:password@localhost:5432/blog_db?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://user:password@localhost:5432/blog_db
```

---

## Common Tasks

### 创建新 Model

1. 编辑 `schema/schema.prisma`：

```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  author    String
  postSlug  String
  createdAt DateTime @default(now())
  
  @@index([postSlug])
  @@map("tbl_comments")
}
```

2. 创建迁移：

```bash
pnpm prisma migrate dev --name add_comments
```

3. 生成 Client：

```bash
pnpm prisma:generate
```

### 修改现有 Model

1. 编辑 schema 文件
2. 创建迁移：

```bash
pnpm prisma migrate dev --name update_stats_add_field
```

### 添加索引

```prisma
model Stats {
  type StatsType
  slug String
  
  @@id([type, slug])
  @@index([type])        // Single field index
  @@index([slug, type])  // Composite index
}
```

### 数据库重置（开发环境）

```bash
# WARNING: This deletes all data
pnpm prisma migrate reset

# Confirm and it will:
# 1. Drop database
# 2. Create database
# 3. Run all migrations
# 4. Run seed (if configured)
```

---

## Testing Instructions

### 验证 Schema

```bash
# Format and validate schema
pnpm prisma format
pnpm prisma validate
```

### 测试迁移

```bash
# Create migration (don't apply)
pnpm prisma migrate dev --create-only --name test_migration

# Review migration.sql file
cat prisma/migrations/*/migration.sql

# Apply migration
pnpm prisma migrate dev
```

### 测试查询

```bash
# Open Prisma Studio
pnpm prisma studio

# Or use Node REPL
node
> const { prisma } = require('./lib/services/prisma')
> await prisma.stats.findMany()
```

### 生产环境测试

```bash
# Deploy migrations (no interactive prompts)
pnpm prisma:migrate:deploy

# Check status
pnpm prisma migrate status
```

---

## Troubleshooting

### 迁移失败

**症状**: `prisma migrate dev` 报错

**检查**:
1. 数据库连接是否正常：`psql $POSTGRES_URL -c "SELECT 1"`
2. Schema 语法是否正确：`pnpm prisma validate`
3. 是否有未应用的迁移：`pnpm prisma migrate status`
4. 数据库是否有冲突的数据

**解决**:
```bash
# Reset and retry (development only)
pnpm prisma migrate reset

# Or manually fix migration SQL
# Edit prisma/migrations/*/migration.sql
pnpm prisma migrate resolve --applied <migration_name>
```

### Prisma Client 类型不匹配

**症状**: TypeScript 报 Prisma Client 类型错误

**检查**:
1. Schema 是否已修改但未重新生成 Client
2. 生成的 Client 路径是否正确

**解决**:
```bash
# Regenerate Prisma Client
pnpm prisma:generate

# Restart TypeScript server in IDE
```

### 连接池耗尽

**症状**: `Error: Can't reach database server` 或 `Too many connections`

**检查**:
1. 是否在每个请求中创建新的 Prisma Client（应使用单例）
2. 连接池配置是否合理

**解决**:
```typescript
// Use singleton pattern (already in lib/services/prisma.ts)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

### 迁移历史不一致

**症状**: 本地和生产环境迁移状态不同

**检查**:
```bash
# Check migration status
pnpm prisma migrate status

# List applied migrations
psql $POSTGRES_URL -c "SELECT * FROM _prisma_migrations"
```

**解决**:
```bash
# Mark migration as applied (if already manually applied)
pnpm prisma migrate resolve --applied <migration_name>

# Mark migration as rolled back
pnpm prisma migrate resolve --rolled-back <migration_name>
```

### 性能问题

**症状**: 查询缓慢

**检查**:
1. 是否缺少索引
2. 是否使用了 N+1 查询

**解决**:
```prisma
// Add indexes
model Stats {
  type StatsType
  slug String
  
  @@index([type])
  @@index([slug])
}
```

```typescript
// Use include/select to avoid N+1
const posts = await prisma.post.findMany({
  include: {
    author: true,  // Join in single query
  },
})
```

---

## Architecture Notes

### 迁移策略

- **开发环境**: 使用 `prisma migrate dev`（交互式）
- **生产环境**: 使用 `prisma migrate deploy`（非交互式）
- **CI/CD**: 在部署前运行 `prisma migrate deploy`

### Schema 组织

```
schema/
├── schema.prisma       # Main config + datasource + generator
└── models/
    ├── Stats.prisma    # Stats model
    └── User.prisma     # User model (if needed)
```

可以拆分 models，但需要在主 schema 中引用：

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

// Import models (if using split files)
// Note: Prisma doesn't support imports yet, keep in single file
```

### 数据库命名约定

- **表名**: `tbl_` 前缀 + 复数形式（`tbl_stats`）
- **字段名**: camelCase（`createdAt`）
- **枚举**: PascalCase（`StatsType`）

### 与其他模块的边界

- **lib/services/prisma.ts**: 导出 Prisma Client 实例
- **app/api/**: 通过 services 使用 Prisma
- **types/**: 导出 Prisma 生成的类型

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
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
