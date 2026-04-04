# 搭建与启动指南

这份文档面向第一次把项目跑起来的读者，重点回答：

- 需要准备什么
- 最少配置到什么程度能启动
- 本地怎么开发
- 生产怎么构建

## 1. 环境要求

- Node.js `24.x`
- pnpm `10.x`
- PostgreSQL

先确认版本：

```bash
node -v
pnpm -v
```

## 2. 安装依赖

```bash
pnpm install
```

## 3. 配置环境变量

复制示例文件：

```bash
cp .env.example .env.local
```

最少需要配置数据库连接：

```bash
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/blog_db
```

常用可选配置：

```bash
GITHUB_API_TOKEN=your_github_token
NEXT_PUBLIC_GISCUS_REPO=your_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=your_category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
UMAMI_WEBSITE_ID=your_umami_id
UMAMI_SHARE_URL=your_umami_share_url
```

说明：

- 没有 `POSTGRES_URL`，统计相关能力无法正常工作
- 没有 `GITHUB_API_TOKEN`，GitHub 仓库信息会为空
- 没有 Giscus 配置，评论区无法正常使用

## 4. 初始化数据库

### 方式一：本地 PostgreSQL

创建数据库后执行：

```bash
pnpm prisma:migrate
```

### 方式二：Docker Compose

```bash
docker compose up -d postgres
pnpm prisma:migrate
```

## 5. 启动开发环境

```bash
pnpm dev
```

启动后会同时完成几件事：

- Contentlayer 解析 `data/blog/*.mdx`
- 生成标签统计和搜索索引
- 启动 Next.js 开发服务器

默认访问地址：

- [http://localhost:3000](http://localhost:3000)

## 6. 生产构建

```bash
pnpm build
pnpm serve
```

## 7. Docker 部署

```bash
docker compose up -d
docker compose exec app pnpm prisma:migrate:deploy
```

## 8. 当前建议先关注哪些能力

当前仓库对外主线能力是：

- 首页
- 博客列表与文章详情
- 分类页与标签页
- 关于页
- 实验室占位页
- RSS 订阅

当前不建议第一次启动时就花精力处理的区域：

- `/projects`
- 邮件 newsletter
- 国际化
- 复杂 lab demos

## 9. 推荐继续阅读

1. [项目结构说明](./PROJECT_STRUCTURE_GUIDE.md)
2. [AI 协作规范](./AI_COLLABORATION_GUIDE.md)
3. [内容维护指南](../guides/CONTENT_UPDATE_GUIDE.md)
