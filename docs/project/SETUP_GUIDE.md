# 搭建与启动指南

这份文档面向第一次把项目跑起来的读者，也适合拿来作为“这套博客是怎么落地的”操作参考。

重点回答：

- 本地最少需要准备什么
- 哪些配置是必须的，哪些是增强项
- 开发环境启动后实际发生了什么
- 怎样把博客从代码仓库变成可访问的网站

## 1. 环境要求

建议先准备下面这些基础环境：

- Node.js `24.x`
- pnpm `10.x`
- PostgreSQL

先确认版本：

```bash
node -v
pnpm -v
```

如果还没有 `pnpm`：

```bash
npm install -g pnpm
```

## 2. 安装依赖

在仓库根目录执行：

```bash
pnpm install
```

安装完成后会自动执行：

- Prisma Client 生成
- 项目里的后处理脚本

也就是说，第一次安装依赖后，数据库访问层相关代码就已经准备好了。

## 3. 准备环境变量

复制示例文件：

```bash
cp .env.example .env.local
```

### 必需配置

最少要有数据库连接：

```bash
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/blog_db
```

原因很直接：

- 文章统计依赖数据库
- `lib/services/prisma.ts` 会在运行时读取这个变量
- 如果缺少它，相关 API 会直接报错

### 推荐配置

如果你希望仓库信息和评论区正常工作，建议再补齐：

```bash
GITHUB_API_TOKEN=your_github_token
NEXT_PUBLIC_GISCUS_REPO=your_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=your_category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

这些配置对应的效果分别是：

- `GITHUB_API_TOKEN`
  让 `/api/github` 可以走 GraphQL 获取更完整的仓库信息；没配时会降级到公共 REST API
- `NEXT_PUBLIC_GISCUS_*`
  控制评论系统是否启用；如果没配齐，评论区会保持关闭

### 可选配置

```bash
UMAMI_WEBSITE_ID=your_umami_id
UMAMI_SHARE_URL=your_umami_share_url
```

这两项只影响统计分析集成，不影响主站启动。

## 4. 站点信息初始化

把项目跑起来之前，建议至少改一下站点配置，不然你看到的会还是仓库默认信息。

### `data/siteMetadata.js`

建议优先检查这些字段：

- `title`
- `author`
- `headerTitle`
- `description`
- `siteUrl`
- `siteRepo`
- `siteLogo`
- `socialBanner`
- `email`
- `github`

这份配置不仅影响页面显示，也会影响：

- SEO 元信息
- 社交分享图
- 页脚信息
- 搜索与评论配置

### `data/navigation.ts`

如果你准备把站点换成自己的信息，也建议顺手调整导航。

## 5. 初始化数据库

### 方式一：本地 PostgreSQL

先确保数据库实例已经运行，并创建好目标数据库，然后执行：

```bash
pnpm prisma:migrate
```

这个命令会：

- 根据当前 schema 应用迁移
- 创建统计表
- 让 `/api/stats` 背后的 Prisma 查询具备可用数据表

### 方式二：Docker Compose

如果你不想自己手动装 PostgreSQL，可以直接用仓库里的 Docker Compose：

```bash
docker compose up -d postgres
pnpm prisma:migrate
```

这是本地开发最省事的方式之一。

### 方式三：云数据库

如果你准备直接部署到线上，也可以先把 `.env.local` 指向：

- Vercel Postgres
- Supabase
- Neon

然后执行：

```bash
pnpm prisma:migrate
```

## 6. 启动开发环境

```bash
pnpm dev
```

这个命令背后不只是“启动 Next.js”。

在当前项目里，它会先执行 Contentlayer 构建，然后再启动开发服务器。也就是说启动过程会做几件事：

- 解析 `data/blog/*.mdx`
- 生成文章的类型信息和计算字段
- 统计标签并写入 `app/tag-data.json`
- 根据站点搜索配置生成 `public/search.json`
- 启动 Next.js 开发服务器

默认访问地址：

- [http://localhost:3000](http://localhost:3000)

## 7. 第一次启动后建议检查什么

项目成功跑起来以后，建议按这个顺序快速验证一遍：

### 页面验证

- 首页 `/`
- 博客列表 `/blog`
- 任意一篇文章详情页
- 标签页 `/tags`
- 关于页 `/about`
- 实验室占位页 `/lab`

### API 验证

```bash
curl "http://localhost:3000/api/stats?type=blog&slug=test-post"
curl "http://localhost:3000/api/github?repo=juanlou1217/juanlou.dev"
```

### 构建产物验证

确认下面两个文件已经生成：

- `app/tag-data.json`
- `public/search.json`

如果这些都正常，说明内容链路和基础动态链路已经跑通了。

## 8. 如何新增一篇文章

这个项目的内容入口不是后台，而是仓库里的 MDX 文件。

你只需要在 `data/blog/` 下新增一个 `.mdx` 文件，例如：

```mdx
---
title: '我的新文章'
date: '2026-04-04'
tags: ['nextjs', 'blog']
category: 'tech'
draft: false
summary: '这是一篇关于博客搭建的文章。'
authors: ['default']
layout: PostLayout
---

这里开始写正文。
```

保存后重新运行构建或刷新开发环境，文章就会自动进入：

- 博客列表
- 分类列表
- 标签聚合
- RSS
- 搜索索引

这正是“内容驱动型博客”的核心体验。

## 9. 生产构建

本地确认无误后，可以先测试生产构建：

```bash
pnpm build
pnpm serve
```

如果能正常构建并启动，说明：

- Contentlayer 构建链路没有问题
- Next.js 页面和 API 可以正常打包
- 生产环境需要的关键依赖基本齐全

## 10. Docker 部署

如果你倾向自托管，可以直接使用 Docker：

```bash
docker compose up -d
docker compose exec app pnpm prisma:migrate:deploy
```

这套方式适合：

- 自己的服务器
- 希望用容器统一管理博客和数据库
- 不打算依赖 Vercel 平台能力的场景

## 11. Vercel 部署

如果你希望用更省心的托管方式，Vercel 会更适合当前项目形态。

基本流程是：

1. 把仓库推到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 绑定数据库
5. 完成部署

为什么这个项目适合放在 Vercel：

- 内容页以静态构建为主
- API Routes 较轻
- App Router、SEO、静态内容与部署流程契合度高

## 12. 当前第一次搭建时不必急着处理什么

这个仓库里有一些历史区域或预留能力，但第一次启动时不建议把精力花在它们上面：

- `/projects`
- 邮件 newsletter
- 国际化
- 复杂 lab demos

更合理的顺序是：

1. 把博客内容链路跑通
2. 把站点信息换成自己的
3. 保证评论、统计、RSS、搜索工作正常
4. 再考虑视觉细节和后续扩展

## 13. 常见问题

### 启动时报 Contentlayer 或 MDX 相关错误

优先检查：

- frontmatter 字段是否缺失
- 日期格式是否正确
- `category` 是否仍在允许范围内

### `/api/stats` 报数据库连接错误

优先检查：

- `POSTGRES_URL` 是否存在
- 数据库是否已启动
- 迁移是否执行成功

### 评论区不显示

优先检查：

- Giscus 相关环境变量是否完整
- 仓库是否启用了 GitHub Discussions

### GitHub 仓库信息为空

优先检查：

- `repo` 参数是否正确
- `GITHUB_API_TOKEN` 是否已配置
- 即使没配置 Token，也要确认公共仓库接口访问是否正常

## 14. 推荐继续阅读

1. [博客项目搭建拆解](./BLOG_BUILDING_GUIDE.md)
2. [项目详细介绍](./PROJECT_INTRODUCTION.md)
3. [项目结构说明](./PROJECT_STRUCTURE_GUIDE.md)
4. [AI 协作规范](./AI_COLLABORATION_GUIDE.md)
5. [内容维护指南](../guides/CONTENT_UPDATE_GUIDE.md)
