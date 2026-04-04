# API 接口文档

本项目提供以下 API 接口，用于客户端与服务端交互。

## 目录

- [1. GitHub 仓库信息](#1-github-仓库信息)
- [2. 博客统计](#2-博客统计)
- [3. Newsletter 订阅](#3-newsletter-订阅)

---

## 1. GitHub 仓库信息

获取 GitHub 仓库的详细信息（星标数、描述、语言等）。

### 请求

```http
GET /api/github?repo={owner}/{repo}
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| repo | string | 是 | GitHub 仓库路径，格式：`owner/repo` |

### 响应示例

```json
{
  "name": "karhdo.dev",
  "nameWithOwner": "Karhdo/karhdo.dev",
  "url": "https://github.com/Karhdo/karhdo.dev",
  "description": "My personal blog built with Next.js",
  "stargazerCount": 10,
  "forkCount": 2,
  "homepageUrl": "https://karhdo.dev",
  "owner": {
    "login": "Karhdo",
    "url": "https://github.com/Karhdo",
    "avatarUrl": "https://avatars.githubusercontent.com/u/..."
  },
  "languages": [
    { "name": "TypeScript", "color": "#3178c6" },
    { "name": "JavaScript", "color": "#f1e05a" }
  ],
  "repositoryTopics": ["nextjs", "blog", "typescript"],
  "lastCommit": {
    "id": "...",
    "abbreviatedOid": "abc123",
    "committedDate": "2024-03-20T10:00:00Z",
    "message": "feat: add new feature",
    "url": "https://github.com/Karhdo/karhdo.dev/commit/abc123",
    "status": { "state": "SUCCESS" }
  }
}
```

### 错误响应

```json
// 400 Bad Request - 缺少 repo 参数
{
  "message": "Missing repo parameter"
}

// 200 OK - repo 为 null 或 undefined
null
```

### 使用示例

```typescript
// 客户端调用
const response = await fetch('/api/github?repo=Karhdo/karhdo.dev');
const repoData = await response.json();
```

---

## 2. 博客统计

管理博客文章的浏览量和用户反应（点赞、鼓掌等）。

### 3.1 获取统计数据

```http
GET /api/stats?slug={slug}&type={type}
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| slug | string | 是 | 文章 slug（URL 路径） |
| type | StatsType | 是 | 统计类型：`blog` 或 `snippet` |

### 响应示例

```json
{
  "type": "blog",
  "slug": "exploring-module-in-nestjs",
  "views": 1234,
  "loves": 56,
  "applauses": 23,
  "ideas": 12,
  "bullseye": 8
}
```

### 3.2 更新统计数据

```http
POST /api/stats
Content-Type: application/json
```

### 请求体

```json
{
  "type": "blog",
  "slug": "exploring-module-in-nestjs",
  "views": 1235,
  "loves": 57
}
```

### 响应示例

```json
{
  "type": "blog",
  "slug": "exploring-module-in-nestjs",
  "views": 1235,
  "loves": 57,
  "applauses": 23,
  "ideas": 12,
  "bullseye": 8
}
```

### 错误响应

```json
// 400 Bad Request
{
  "message": "Missing or invalid `type` or `slug` parameter!"
}

// 500 Internal Server Error
{
  "message": "Internal Server Error!"
}
```

### 数据模型

```typescript
enum StatsType {
  blog = "blog",
  snippet = "snippet"
}

interface Stats {
  type: StatsType;      // 统计类型
  slug: string;         // 文章 slug
  views: number;        // 浏览量
  loves: number;        // 喜欢 ❤️
  applauses: number;    // 鼓掌 👏
  ideas: number;        // 想法 💡
  bullseye: number;     // 靶心 🎯
}
```

### 使用示例

```typescript
// 使用 Hook（推荐）
import { useBlogStats, useUpdateBlogStats } from '@/hooks';

function BlogPost({ slug }: { slug: string }) {
  const [stats, isLoading] = useBlogStats('blog', slug);
  const updateStats = useUpdateBlogStats();
  
  const handleLove = async () => {
    await updateStats({
      type: 'blog',
      slug,
      loves: stats.loves + 1
    });
  };
  
  return (
    <div>
      <p>浏览量: {stats.views}</p>
      <button onClick={handleLove}>❤️ {stats.loves}</button>
    </div>
  );
}
```

### 特性

- **自动创建**：如果统计记录不存在，会自动创建
- **防止负数**：更新时会检查，防止数值变为负数
- **原子操作**：使用数据库事务保证数据一致性

---

## 3. Newsletter 订阅

处理邮件列表订阅（使用 Pliny Newsletter API）。

### 请求

```http
GET /api/newsletter
POST /api/newsletter
```

### 说明

此接口由 `pliny/newsletter` 包提供，具体行为取决于 `siteMetadata.newsletter.provider` 配置。

### 配置

在 `data/siteMetadata.js` 中配置：

```javascript
export default {
  newsletter: {
    provider: 'buttondown', // 或其他提供商
  }
}
```

### 使用示例

```typescript
// 订阅 newsletter
const response = await fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

---

## 环境变量配置

### 必需配置

```env
# 数据库（用于统计功能）
POSTGRES_URL=postgresql://user:password@localhost:5432/karhdo_blog
```

### 可选配置

```env
# GitHub API（用于项目页面）
GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx

# Giscus 评论系统
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

---

## 错误处理

所有 API 遵循统一的错误响应格式：

```json
{
  "message": "错误描述信息"
}
```

### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 500 | 服务器内部错误 |

---

## 速率限制

- **Stats API**：无限制，但建议使用 SWR 做客户端缓存
- **GitHub API**：受 GitHub API 速率限制约束（每小时 5000 次）

---

## 安全性

- 所有敏感 Token（GitHub）仅在服务端使用
- API 路由不直接暴露 Token 给客户端
- 使用环境变量管理配置
- CSP 安全头配置在 `next.config.mjs`

---

## 相关文件

- API 路由：`app/api/*/route.ts`
- 服务层：`lib/services/*.ts`
- React Hooks：`hooks/*.ts`
- 类型定义：`types/*.ts`
- Prisma Schema：`prisma/schema/models/Stats.prisma`
