# Excalidraw Blog Guide

## 简介

这份指南约定博客文章里使用 Excalidraw 手绘图的标准流程。

目标有三个：

- 图表在文章正文里稳定展示
- `.excalidraw` 源文件能随文章一起保存
- 作者插图时不用重复写样式和路径规则

## 资源约定

每篇文章的 Excalidraw 资源统一放到：

```text
public/static/images/blogs/excalidraw/<article-slug>/
```

建议同一张图至少保留两个文件：

- `diagram-name.excalidraw`
- `diagram-name.svg`

例如：

```text
public/static/images/blogs/excalidraw/building-an-ai-friendly-blog-with-nextjs-contentlayer-and-prisma/system-architecture.excalidraw
public/static/images/blogs/excalidraw/building-an-ai-friendly-blog-with-nextjs-contentlayer-and-prisma/system-architecture.svg
```

## 快速开始

### 第一步：生成脚手架

运行：

```bash
pnpm excalidraw:new <article-slug> <diagram-name>
```

例如：

```bash
pnpm excalidraw:new building-an-ai-friendly-blog-with-nextjs-contentlayer-and-prisma system-architecture
```

它会创建一个空白的 `.excalidraw` 文件，并在终端输出推荐的 SVG 导出路径和 MDX 片段。

### 第二步：编辑源文件

把生成的 `.excalidraw` 文件导入到 Excalidraw。

可选方式：

1. 打开 [excalidraw.com](https://excalidraw.com)
2. 选择 `Open` 或 `Import`
3. 载入脚手架生成的 `.excalidraw`

## 第三步：导出博客插图

导出时优先使用 `SVG`，原因是：

- 线条更锐利
- 缩放不会发虚
- 非常适合博客里的结构图、流程图、架构图

导出建议：

- 格式：`SVG`
- 背景：保留白底，避免透明背景叠到正文底色上
- 尺寸：宽高比尽量固定，例如 `1600 x 900`

把导出的文件保存到脚手架提示的同目录路径。

## 第四步：在 MDX 里引用

文章正文里直接使用 `ExcalidrawFigure`：

```mdx
<ExcalidrawFigure
  src="/static/images/blogs/excalidraw/building-an-ai-friendly-blog-with-nextjs-contentlayer-and-prisma/system-architecture.svg"
  alt="博客系统整体架构图"
  width={1600}
  height={900}
  caption="博客内容、页面渲染、运行时统计和外部服务的关系图。"
  sourceHref="/static/images/blogs/excalidraw/building-an-ai-friendly-blog-with-nextjs-contentlayer-and-prisma/system-architecture.excalidraw"
/>
```

组件能力：

- 渲染导出的 `svg/png`
- 显示图注
- 提供 `.excalidraw` 源文件下载入口

## 字段说明

- `src`: 导出的展示图路径，推荐 `svg`
- `alt`: 图的替代文本，给 SEO 和可访问性使用
- `width` / `height`: 展示图尺寸，建议和导出尺寸一致
- `caption`: 图注，可选
- `sourceHref`: Excalidraw 源文件路径，可选但推荐保留

## 推荐使用场景

- 博客架构图
- 功能流程图
- 技术选型对比图
- 学习笔记中的概念关系图
- 系统边界和数据流图

## 不推荐的做法

- 只保存导出的 `png/svg`，不保留 `.excalidraw` 源文件
- 把图散落到多个不一致目录
- 在 MDX 里直接手写重复样式，而不是复用 `ExcalidrawFigure`
- 导出透明背景的浅色图，导致正文里可读性下降

## 验证清单

- 图能在文章页正常显示
- 移动端下没有溢出正文容器
- 图注语义清楚，不只是重复标题
- `.excalidraw` 下载链接可访问
- 如果改图，只需要替换同名 `svg` 即可
