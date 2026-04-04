# 项目详细介绍

## 项目是什么

这是一个基于 **Next.js 16 + React 19 + TypeScript** 构建的个人博客系统，面向“公开写作 + 轻量展示 + 可持续维护”场景设计。

它不是一个只负责渲染静态文章的简单站点，也不是一个强调后台运营能力的 CMS。当前项目更像一个围绕个人表达搭建的内容平台，兼顾以下三类能力：

- 内容发布：使用 MDX 编写技术文章、生活随笔和随想
- 个人展示：展示项目、个人信息、链接和实验页面
- 轻量动态能力：文章统计、GitHub 仓库数据

站点名称为“卷娄的小屋 / 卷娄的折腾日记”，公开地址为 [juanlou.top](https://juanlou.top)。

## 适合谁阅读这个仓库

- 想搭建个人博客或内容站点的开发者
- 想了解 `Next.js + Contentlayer + Prisma` 组合的读者
- 想把现有项目整理成 agent-ready repo 的协作者
- 需要快速接手维护本博客的开发者或 AI coding agent

## 核心能力

### 1. MDX 内容驱动

博客文章存放在 `data/blog/`，通过 Contentlayer 在构建阶段解析 frontmatter、生成类型定义、提取目录和阅读时长。

这意味着：

- 内容由文件系统管理，适合 Git 版本控制
- 页面生成偏静态，利于 SEO 和性能
- 文章结构具备较好的类型安全和可维护性

### 2. App Router 页面组织

项目采用 Next.js App Router，主要页面包括：

- `/`：首页
- `/blog`：博客列表页
- `/blog/[...slug]`：文章详情页
- `/blog/tech`、`/blog/life`、`/blog/essay`：分类列表页
- `/tags`：标签页
- `/about`：关于页
- `/lab`：实验室占位页

### 3. 运行时动态数据

虽然大部分页面以静态内容为主，但项目也接入了少量实时数据：

- `/api/stats`：文章浏览量与互动数据
- `/api/github`：仓库信息与最近提交等数据
- `/feed.xml`：RSS 订阅源

### 4. 面向公开访问的视觉站点

项目使用 Tailwind CSS 4 构建响应式界面，适合部署在 Vercel，也支持 Docker 独立部署。

## 技术栈

### 前端与渲染

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router

### 内容系统

- MDX
- Contentlayer 2
- rehype / remark 插件链
- Pliny 内容工具

### 数据与服务

- PostgreSQL
- Prisma 7
- GitHub GraphQL API
- Giscus 评论系统

### 工程化

- pnpm
- ESLint
- Prettier
- Husky
- Docker

## 系统架构概览

项目整体采用“静态内容为主，少量动态能力补充”的结构：

```text
MDX 内容文件
  -> Contentlayer 构建
  -> Next.js 页面渲染
  -> 用户访问静态或增量更新页面

用户交互
  -> Client Component / Hook
  -> API Route
  -> Prisma / 第三方服务
  -> 返回动态数据
```

这种架构的优点是：

- 博客文章加载快，SEO 友好
- 内容管理简单，不依赖复杂 CMS
- 需要动态能力时可以通过 API Routes 局部增强

## 内容模型

当前主要内容类型为博客文章和作者信息。

### 博客文章

文章采用 MDX 管理，关键字段包括：

- `title`
- `date`
- `tags`
- `category`
- `summary`
- `images`
- `authors`
- `layout`
- `draft`

其中 `category` 目前固定为：

- `tech`
- `life`
- `essay`

### 作者信息

作者信息存放在 `data/authors/`，用于文章页和站点展示。

## 运行时数据模型

数据库当前主要承担统计数据存储职责。

`Stats` 模型包含：

- `type`
- `slug`
- `views`
- `loves`
- `applauses`
- `ideas`
- `bullseye`

这个模型用于记录文章或片段的互动统计，主键是 `type + slug`。

## 仓库结构速览

```text
app/           页面路由和 API Routes
components/    React 组件
layouts/       页面布局
hooks/         自定义 Hook
lib/           服务和工具函数
data/          MDX 内容与站点配置
prisma/        数据库 schema
public/        静态资源
docs/          文档中心与 Harness 文档层
```

更详细的目录说明请查看 [项目结构说明](../../PROJECT_STRUCTURE.md)。

如果你更关心“如何跑起来”和“当前 AI 如何协作”，建议继续看：

- [搭建与启动指南](./SETUP_GUIDE.md)
- [项目结构说明](./PROJECT_STRUCTURE_GUIDE.md)
- [AI 协作规范](./AI_COLLABORATION_GUIDE.md)

## 这个项目不负责什么

为了保持边界清晰，当前仓库不承担以下职责：

- 富文本在线编辑器
- 用户登录和权限系统
- 多角色后台管理平台
- 复杂营销漏斗和商单流程

如果后续要扩展这些方向，建议明确作为新阶段需求，不要混入现有博客主线。

## 部署方式

当前项目支持三种主要部署模式：

### 1. 本地开发

- 使用 `pnpm dev`
- 数据库可配合本地 PostgreSQL 或 Docker Compose

### 2. Docker 部署

- 使用 `docker compose up -d`
- 适合自托管或统一打包部署

### 3. Vercel 部署

- 适合静态内容站点和 Serverless API Routes
- 数据库可配合 Vercel Postgres、Supabase、Neon 等服务

## 推荐阅读顺序

如果你是 GitHub 访客，建议按以下顺序阅读：

1. 本文档
2. [搭建与启动指南](./SETUP_GUIDE.md)
3. [项目结构说明](./PROJECT_STRUCTURE_GUIDE.md)
4. [AI 协作规范](./AI_COLLABORATION_GUIDE.md)
5. [API 接口文档](../../API_DOCUMENTATION.md)
6. [文档中心](../README.md)

如果你是维护者或 AI agent，建议再去看 [Harness 文档区](../harness/README.md) 和 [AGENTS.md](../../AGENTS.md)。
