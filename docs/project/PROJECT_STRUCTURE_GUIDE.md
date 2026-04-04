# 项目结构说明

这份文档用于帮助读者快速理解仓库怎么组织，不替代根目录的完整 [PROJECT_STRUCTURE.md](../../PROJECT_STRUCTURE.md)。

如果你只想先建立整体认知，先看这份。

## 1. 当前仓库在做什么

这是一个基于 **Next.js 16 + React 19 + TypeScript** 的个人博客项目，主线能力是：

- MDX 博客内容发布
- 博客分类与标签浏览
- 文章互动统计
- GitHub 仓库信息展示
- 评论与 RSS

## 2. 当前公开路由

当前推荐理解为“已经开放”的页面：

- `/`
- `/about`
- `/blog`
- `/blog/tech`
- `/blog/life`
- `/blog/essay`
- `/blog/[...slug]`
- `/tags`
- `/tags/[tag]`
- `/lab`
- `/feed.xml`

当前不属于对外主线能力：

- `/projects`
- 邮件 newsletter 订阅
- 复杂实验室 demo 子页
- 国际化多语言

## 3. 顶层目录职责

### `app/`

Next.js App Router 路由层。

负责：

- 页面路由
- API routes
- sitemap / robots / RSS 路由

### `components/`

按功能拆分的 React 组件。

重点目录：

- `components/ui/`：基础可复用组件
- `components/blog/`：文章页相关组件
- `components/homepage/`：首页展示组件
- `components/header/` / `components/footer/`：全局框架组件

### `layouts/`

页面布局层。

当前博客列表和文章详情优先复用这里，而不是在 page 文件里手写结构。

### `data/`

内容和站点配置。

重点内容：

- `data/blog/*.mdx`：博客文章
- `data/authors/*.mdx`：作者信息
- `data/siteMetadata.js`：站点元数据
- `data/navigation.ts`：导航配置

### `lib/`

工具函数和服务封装。

重点包括：

- `lib/services/`：数据库和 GitHub 等服务集成
- `lib/seo.ts`：页面 metadata 辅助
- `lib/rss.ts`：RSS 生成逻辑

### `docs/`

文档中心。

这里分成两块：

- `docs/project/`：面向普通读者和 GitHub 访客
- `docs/harness/`：面向 AI agents 和维护者

## 4. 内容到页面的数据流

博客内容主链路是：

```text
data/blog/*.mdx
  -> Contentlayer 构建
  -> app/ 路由读取内容
  -> layouts/ + components/ 渲染页面
```

运行时动态数据主链路是：

```text
用户访问或互动
  -> hooks / client components
  -> app/api/*
  -> lib/services/*
  -> PostgreSQL 或第三方服务
```

## 5. 当前推荐的理解顺序

如果你准备读代码，建议按这个顺序看：

1. `app/`
2. `layouts/`
3. `components/ui/`
4. `components/blog/` 与 `components/homepage/`
5. `data/`
6. `lib/`

## 6. 延伸阅读

- [项目详细介绍](./PROJECT_INTRODUCTION.md)
- [搭建与启动指南](./SETUP_GUIDE.md)
- [AI 协作规范](./AI_COLLABORATION_GUIDE.md)
- [完整项目结构文档](../../PROJECT_STRUCTURE.md)
