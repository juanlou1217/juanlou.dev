<h1 align="center">卷娄的折腾日记</h1>
<p align="center"><i>知其卷娄之患，故守其不卷不娄之身</i></p>

<div align="center">
    <a href="https://github.com/juanlou1217/juanlou.dev/stargazers"><img src="https://img.shields.io/github/stars/juanlou1217/juanlou.dev" alt="Stars Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/network/members"><img src="https://img.shields.io/github/forks/juanlou1217/juanlou.dev" alt="Forks Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/pulls"><img src="https://img.shields.io/github/issues-pr/juanlou1217/juanlou.dev" alt="Pull Requests Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/issues"><img src="https://img.shields.io/github/issues/juanlou1217/juanlou.dev" alt="Issues Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/juanlou1217/juanlou.dev?color=2b9348"></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/blob/master/LICENSE"><img src="https://img.shields.io/github/license/juanlou1217/juanlou.dev?color=2b9348" alt="License Badge"/></a>
</div>
<br>
<p align="center"><i>一位迷茫的折腾日记，分享代码，也写生活</i></p>
<br>

## 网站

- 国内残缺版本: [juanlou.top](https://juanlou.top)
- Vercel 地址: [juanlou-dev.vercel.app](https://juanlou-dev.vercel.app/)


## 项目概览

这是一个基于 **Next.js 16 + React 19 + TypeScript** 构建的个人博客系统，采用 App Router 架构，以 MDX 内容驱动为主线，并在静态内容之外补充少量运行时能力。

当前主线能力包括：

- 使用 `Contentlayer 2` 处理 `data/blog/**/*.mdx` 和 `data/authors/**/*.mdx`
- 使用 `PostgreSQL + Prisma 7` 存储文章浏览量与互动统计
- 使用 GitHub API 展示仓库信息
- 集成 Giscus 评论系统
- 使用 `Tailwind CSS 4` 构建响应式界面

这是一个适合长期写作、个人表达和持续维护的工程化博客仓库，而不是后台驱动 CMS。

## 技术栈

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url] [![Typescript][Typescript]][Typescript-url] [![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]

- 前端框架: `Next.js 16.1.1`、`React 19.2.3`
- 内容系统: `MDX`、`Contentlayer 2`、`remark / rehype`、`Pliny`
- 样式系统: `Tailwind CSS 4`
- 数据层: `PostgreSQL`、`Prisma 7`
- 数据获取与交互: `SWR`、GitHub API、Giscus
- 工程化: `TypeScript`、`ESLint`、`Prettier`、`Husky`、`Docker`

## 快速开始

### 1. 安装依赖

要求：

- Node.js `24.x`
- pnpm `10.x`
- PostgreSQL

安装依赖：

```bash
pnpm install
```

### 2. 配置环境变量

复制示例配置：

```bash
cp .env.example .env.local
```

至少需要配置数据库连接：

```bash
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/blog_db
```

推荐额外配置：

```bash
GITHUB_API_TOKEN=your_github_token
NEXT_PUBLIC_GISCUS_REPO=your_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=your_category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### 3. 初始化数据库

本地已有 PostgreSQL 时：

```bash
pnpm prisma:migrate
```

如果使用 Docker 启动数据库：

```bash
docker compose up -d postgres
pnpm prisma:migrate
```

### 4. 启动开发服务器

```bash
pnpm dev
```

启动过程中会先执行 Contentlayer 构建，再启动 Next.js 开发服务器。默认访问地址为 [http://localhost:3000](http://localhost:3000)。

## Docker 部署

使用 Docker 以独立输出模式运行博客，适合本地联调和自托管部署。

```bash
docker compose up -d
docker compose exec app pnpm prisma:migrate:deploy
```

## 项目文档

这个仓库把文档拆成两块：一套给 GitHub 访客和普通读者，一套给 AI coding agents 和维护者。

### 公开项目文档

- [项目详细介绍](docs/project/PROJECT_INTRODUCTION.md)
- [博客项目搭建拆解](docs/project/BLOG_BUILDING_GUIDE.md)
- [搭建与启动指南](docs/project/SETUP_GUIDE.md)
- [项目结构说明](docs/project/PROJECT_STRUCTURE_GUIDE.md)
- [AI 协作规范](docs/project/AI_COLLABORATION_GUIDE.md)
- `docs/style/`
- [文档中心](docs/README.md)

### Harness 工作文档

- [Harness 文档区](docs/harness/README.md)
- [Canonical Facts](docs/harness/canonical/README.md)
- [Specs](docs/harness/specs/README.md)
- [Contracts](docs/harness/contracts/README.md)
- [Verification](docs/harness/verification/README.md)
- [Traces](docs/harness/traces/README.md)

## 内容与路由

当前公开主线围绕博客展开：

- `/` 首页
- `/blog` 博客列表
- `/blog/tech`、`/blog/life`、`/blog/essay` 分类列表
- `/blog/[...slug]` 文章详情页
- `/tags`、`/tags/[tag]` 标签页
- `/about` 关于页
- `/feed.xml` RSS
- `/api/stats` 文章统计接口
- `/api/github` GitHub 仓库信息接口

## 表达您的支持

如果这个项目对您有帮助，欢迎给个 `Star`。

## 图片来源

本博客使用的图片来自 [Unsplash](https://unsplash.com/)，GIF 来自 [GIPHY](https://giphy.com/)，插图来自 [Storyset](https://storyset.com/)。

---

<p align="center"><b>版权所有 © 2026 - 赵康（卷娄）</b></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind CSS-url]: https://tailwindcss.com/
[MDX]: https://img.shields.io/badge/MDX-000000?style=for-the-badge&logo=mdx&logoColor=white
[MDX-url]: https://mdxjs.com/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
