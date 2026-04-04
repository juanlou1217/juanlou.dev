# 内容与运行时契约

## 1. 内容源契约

### 博客文章来源

- 博客文章必须放在 `data/blog/` 下
- 文件格式为 `.mdx`
- 由 Contentlayer 在构建阶段解析

### 文章 frontmatter 最低要求

博客文章至少应包含以下字段：

- `title`
- `date`

建议同时提供以下字段以保证展示完整：

- `summary`
- `tags`
- `category`
- `authors`
- `layout`

### 分类字段约束

`category` 当前只允许以下值：

- `tech`
- `life`
- `essay`

如果要增加新分类，应同步调整：

- Contentlayer schema
- 博客列表与分类页面
- 文档说明和内容维护指南

## 2. 运行时统计契约

### Stats 主键

统计数据以 `type + slug` 作为唯一标识。

### StatsType 约束

当前 `type` 只允许：

- `blog`
- `snippet`

### 统计字段

当前支持的统计字段包括：

- `views`
- `loves`
- `applauses`
- `ideas`
- `bullseye`

如果新增统计字段，应同步调整：

- Prisma schema
- API route
- 前端 hooks 和展示组件

## 3. API 路由契约

### `/api/stats`

- `GET` 依赖 `slug` 和 `type`
- `POST` 依赖请求体中的 `slug` 和 `type`
- 返回值应与 `Stats` 模型保持一致

### `/api/github`

- 依赖查询参数 `repo`
- 当 `repo` 缺失时返回 400

## 4. 环境变量契约

### 必需

- `POSTGRES_URL`

### 常用可选

- `GITHUB_API_TOKEN`
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## 5. 部署契约

- Node.js 版本应保持在 `24.x`
- 包管理器为 `pnpm`
- 生产部署需先完成 Contentlayer 构建和 Prisma client 生成

## 6. 变更原则

当改动影响上面任何契约时，应至少同步更新以下其中一项：

- 对应 contract 文档
- 相关 spec 文档
- 验证清单或发布说明
