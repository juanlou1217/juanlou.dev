# 复用与结构契约

这份契约不描述业务输入输出，而是描述“这个仓库里代码应该如何组织，才算符合长期维护边界”。

## 1. 组件复用契约

### 基础 UI 组件优先

当需求只是：

- 新增按钮
- 新增跳转链接
- 新增图片展示
- 新增标题或容器

应先复用以下组件：

- `components/ui/Button.tsx`
- `components/ui/Link.tsx`
- `components/ui/Image.tsx`
- `components/ui/PageTitle.tsx`
- `components/ui/Container.tsx`
- `components/ui/SectionContainer.tsx`

只有同时满足以下条件，才允许新增新的通用 UI 组件：

- 现有组件无法表达目标结构
- 通过 `className` 覆盖会导致可读性明显变差
- 该抽象会在两个及以上位置复用

### 禁止的行为

- 为单个页面手写一个只差配色的按钮组件
- 因为文案不同就复制一份空状态卡片
- 在页面文件里长期保留大段重复样式字符串，而不是提取到已有通用组件

## 2. 页面布局复用契约

### 博客列表

博客列表和分类列表优先复用：

- `layouts/ListLayout.tsx`

`layouts/ListLayoutWithTags.tsx` 仅在确实需要标签侧栏时使用。

如果分页、搜索、排序或空状态的需求能通过补齐现有 layout 解决，不应重新创建新的列表 layout。

### 博客详情

博客详情页必须复用以下布局之一：

- `layouts/PostLayout.tsx`
- `layouts/PostSimple.tsx`
- `layouts/PostBanner.tsx`

不应在 `app/blog/[...slug]/page.tsx` 中直接堆叠新的详情结构。

## 3. 数据来源契约

### 内容与标签

以下内容必须优先来自真实内容数据，而不是手写数组：

- 标签列表
- 热门标签
- RSS 内容
- 分类文章列表
- 文章元信息

推荐来源顺序：

1. `data/blog/*.mdx`
2. Contentlayer 生成内容
3. 构建期生成文件

### 手写静态数据的适用范围

只有以下情况适合手写静态数组：

- 纯展示型外链集合
- 暂时性的占位数据
- 与内容系统无关的固定说明项

如果是占位数据，应明确标注其占位性质，避免被误认为真实业务源。

## 4. 预留功能契约

当前以下能力视为预留或关闭状态：

- `projects`
- newsletter 邮件订阅
- 复杂 lab demos
- 国际化

因此：

- 不应把这些能力继续包装成“已经上线”
- 不应新增导航入口引导用户进入未成型区域
- 不应在文案中暗示用户这些能力可立即使用

正确做法是：

- 返回 404
- 保持占位页
- 返回未启用状态

## 5. 路由公开性契约

以下路由属于对外公开能力，应保证可访问、可被 sitemap 感知：

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

以下能力若继续保持关闭状态，不应出现在 sitemap 主路由集合中：

- `/projects`

## 6. 修改触发条件

当出现以下改动时，必须回看这份契约：

- 新增页面
- 新增 layout
- 新增 UI 组件
- 新增首页展示区块
- 修改导航或 sitemap
- 恢复一个曾经关闭的功能
