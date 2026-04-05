# 组件清单与职责

这份文档用于告诉 AI agent 和维护者：当前仓库里已经有哪些组件，它们大致负责什么，以及哪些是当前推荐复用入口。

目标是降低“不了解整个项目就重新造一套”的概率。

## 使用原则

- 先找现有组件，再决定是否新增
- 优先复用 `components/ui/` 作为基础层
- 页面型实现优先复用 `layouts/`
- 如果组件属于关闭能力或历史残留，不应默认继续扩展

## 1. `components/ui/`

最优先搜索的目录。

- `Button.tsx`
  通用按钮外观。需要按钮时优先从这里扩展，不要手写新的按钮样式。
- `Link.tsx`
  内外链统一入口。页面中跳转优先复用。
- `Image.tsx`
  对 `next/image` 的统一封装，带加载态处理。
- `PageTitle.tsx`
  页面标题展示组件。
- `Container.tsx`
  通用容器。
- `SectionContainer.tsx`
  页面段落级容器。
- `Comments.tsx`
  Giscus 评论封装。
- `Tag.tsx`
  标签链接渲染。
- `ExcalidrawFigure.tsx`
  博客 MDX 中的 Excalidraw 手绘图统一展示入口，负责图片渲染、图注和源文件下载链接。
- `ScrollTopAndComment.tsx`
  文章页右下角滚动与评论定位入口。
- `MDXComponents.tsx`
  MDX 渲染组件映射表。
- `TableWrapper.tsx`
  MDX 表格包装组件。
- `GrowingUnderline.tsx`
  悬停下划线效果。
- `BrandIcon.tsx`
  品牌图标映射。
- `Twemoji.tsx`
  Emoji 渲染。
- `Zoom.tsx`
  图片放大效果包装。
- `Card.tsx`
  基础卡片容器，可复用但目前不是所有卡片的统一入口。
- `TiltedGridBackground.tsx`
  背景装饰组件。

## 2. `components/header/`

头部导航相关组件。

- `Header.tsx`
  顶部导航总装。
- `Logo.tsx`
  站点 Logo。
- `MobileNav.tsx`
  移动端菜单。
- `SearchButton.tsx`
  搜索入口按钮，依赖站点搜索配置。
- `ThemeSwitch.tsx`
  明暗主题切换。
- `AnalyticsLink.tsx`
  分析看板链接，当前未在头部启用。

## 3. `components/footer/`

页脚信息与导航。

- `Footer.tsx`
  页脚主容器。
- `FooterBottom.tsx`
  页脚底部区域。
- `FooterMeta.tsx`
  仓库信息、位置、时间等元信息。
- `FooterNav.tsx`
  页脚导航。
- `LastCommit.tsx`
  最近提交信息。
- `LogoAndRepo.tsx`
  页脚 logo 与仓库链接。
- `BuildWith.tsx`
  技术栈展示。

## 4. `components/homepage/`

首页专属展示组件。

- `HomeContent.tsx`
  首页总装组件。
- `PopularTags.tsx`
  首页热门标签，当前应来自真实文章数据，而不是手写数组。
- `BlogLinks.tsx`
  首页分类入口链接。
- `ProfileCard.tsx`
  个人资料卡片。
- `ProfileInfo.tsx`
  资料卡片底部信息。
- `Avatar.tsx`
  头像展示。
- `Greeting.tsx`
  首页问候语。
- `Heading.tsx`
  首页大标题。
- `ShortDescription.tsx`
  简短说明。
- `TypedBios.tsx`
  打字机效果介绍。

## 5. `components/blog/`

博客详情页相关组件。

- `BlogMeta.tsx`
  发布时间、阅读时长、浏览量组合展示。
- `BlogNav.tsx`
  上下篇导航。
- `BlogTags.tsx`
  文章标签区域。
- `TableOfContents.tsx`
  文章目录。
- `ViewCounter.tsx`
  浏览量展示。
- `Reactions.tsx`
  互动反应组件。

## 6. `components/about/`

关于页相关。

- `CareerTimeline.tsx`
  经历时间线总装。
- `TimelineItem.tsx`
  单条经历项。

## 7. `components/project/`

项目页相关组件，但当前项目页处于关闭状态。

- `ProjectCard.tsx`
  项目卡片。
- `GithubRepo.tsx`
  GitHub 仓库信息展示。

注意：

- 这些组件目前不属于优先扩展区域
- 不应因为它们存在，就默认恢复 `/projects`

## 8. `components/lab/`

实验室相关组件，但当前实验室只保留占位页。

- `LabCard.tsx`
  实验项目卡片
- `ThreeDCardDemo.tsx`
  历史 demo 组件

注意：

- 这些组件目前属于保留实现，不是当前主线能力
- 用户未明确要求时，不应继续围绕它们扩展产品面

## 9. 复用决策建议

如果是以下需求，优先这样找：

- 按钮、链接、图片、容器：
  先看 `components/ui/`
- 文章列表或分页：
  先看 `layouts/`
- 文章详情附属能力：
  先看 `components/blog/`
- 首页新增展示块：
  先看 `components/homepage/`
- 页头页脚改动：
  先看 `components/header/` 和 `components/footer/`

如果搜索完这些目录仍然没有合适实现，再考虑新增组件。
