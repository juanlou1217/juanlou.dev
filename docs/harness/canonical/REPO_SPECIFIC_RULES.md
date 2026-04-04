# Repo-Specific 协作规则

这份文档面向 AI coding agents 和维护者，记录本仓库里最容易被误判、最容易重复造轮子的 repo-specific 规范。

如果只读一份仓库专属规则，优先读这一份。

## 1. 先确认当前产品面，再决定是否实现

当前仓库不是“功能越多越好”的状态，而是“先把博客主线收紧，再逐步扩展”的状态。

当前对外主线是：

- `/` 首页
- `/blog` 文章列表
- `/blog/[...slug]` 文章详情
- `/blog/tech`、`/blog/life`、`/blog/essay` 分类列表
- `/tags` 与 `/tags/[tag]`
- `/about`
- `/lab` 占位页

当前明确不应被 agent 擅自恢复或扩展为完整功能的区域：

- `/projects`
- 复杂实验室子页面
- 邮件 newsletter
- 国际化多语言
- Spotify / now playing 一类展示能力

如果用户没有明确要求，不应重新激活这些功能。

## 2. 不要重复造按钮、卡片、空状态

这个仓库已经有一批基础组件，新增视觉元素前要先复用：

- 按钮优先复用 `components/ui/Button.tsx`
- 内部链接优先复用 `components/ui/Link.tsx`
- 图片优先复用 `components/ui/Image.tsx`
- 页面标题优先复用 `components/ui/PageTitle.tsx`
- 页面容器优先复用 `components/ui/Container.tsx` 或 `components/ui/SectionContainer.tsx`

禁止因为“只差一点样式”就手写一套新按钮或新链接。

正确做法：

- 先复用已有组件
- 必要时通过 `className` 做轻量覆盖
- 只有复用明显不成立时，才新增通用组件

## 3. 改页面前先搜现有实现

任何 agent 在新增页面片段、交互或 UI 之前，至少要先搜索：

- 是否已有同类组件
- 是否已有同类文案或空状态
- 是否已有同类路由处理方式
- 是否已有同类 API 或服务封装

建议最低搜索范围：

- `components/ui/`
- `components/blog/`
- `components/homepage/`
- `layouts/`
- `lib/`
- `app/`

如果没有做这一步，就很容易出现：

- 404 页和实验室页各写一套“返回首页”按钮
- 列表分页逻辑在不同页面各写各的
- 明明已有 RSS / sitemap / metadata 机制，却又单独造一套

## 4. 页面级逻辑优先沿用现有模式

本仓库的页面实现有明确倾向：

- 文章列表页优先复用 `layouts/ListLayout.tsx`
- 标签侧边栏列表才考虑 `layouts/ListLayoutWithTags.tsx`
- 文章详情优先走 `layouts/PostLayout.tsx`、`layouts/PostSimple.tsx`、`layouts/PostBanner.tsx`
- SEO metadata 优先走 `lib/seo.ts`

如果一个功能能通过补齐现有 layout 或 util 解决，不应新起一套 page-local 逻辑。

## 5. 内容驱动优先于手写展示数据

这个仓库的主数据源是内容文件和构建产物，不是手写前端常量。

优先级应该是：

1. `data/blog/*.mdx`
2. Contentlayer 生成内容
3. 构建期生成文件，例如 `app/tag-data.json`
4. 最后才是手写静态展示数组

因此：

- 热门标签应该从真实文章标签统计，不应手写一个可能失真的 `popularTags`
- 分类文章数量、标签页、RSS 内容都应来自真实文章数据
- 如果手写数据只是占位，要明确标注，不要伪装成真实功能

## 6. 遇到“预留功能”默认收口，不默认完善

这个仓库里有一些历史上或文档里出现过的预留能力。agent 不应默认把它们继续做大。

典型例子：

- newsletter API 存在，不代表应该继续接邮件服务
- lab 目录存在，不代表应该继续加 demo
- i18n 指南存在，不代表应该立刻引入 `next-intl`

判断原则：

- 如果用户明确要做，再扩展
- 如果用户没有明确要做，优先收口成占位或关闭状态

## 7. 修改 repo-specific 事实时要同步更新 harness

以下变化发生时，不能只改代码：

- 页面是否对外开放
- 哪些功能被正式下线或占位
- 哪些模块禁止恢复
- 哪些组件成为统一复用入口
- 哪些目录是当前推荐扩展点

至少同步更新其中之一：

- `docs/harness/canonical/`
- `docs/harness/contracts/`
- `docs/harness/verification/`

## 8. 最小任务前置检查

开始任何非微小改动前，建议按这个顺序确认：

1. 这个功能现在是“开放状态”还是“预留状态”？
2. 仓库里有没有现成组件、layout、service、route 可以复用？
3. 这次改动的数据源应该来自内容、构建产物，还是手写常量？
4. 这次改动会不会让已下线功能重新暴露？
5. 需要补哪份 harness 文档来固化这次判断？

如果这 5 个问题没有想清楚，就很容易在这个仓库里做出“看似可用、实际上偏离产品状态”的实现。
