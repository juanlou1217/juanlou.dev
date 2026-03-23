# Blog 目录结构说明

## 目录结构

```
app/blog/
├── page.tsx              # 所有文章列表页 (/blog)
├── tech/
│   ├── page.tsx          # 技术分享列表页 (/blog/tech)
│   └── page/
│       └── [page]/
│           └── page.tsx  # 技术分享分页 (/blog/tech/page/[page])
├── life/
│   ├── page.tsx          # 生活感悟列表页 (/blog/life)
│   └── page/
│       └── [page]/
│           └── page.tsx  # 生活感悟分页 (/blog/life/page/[page])
├── essay/
│   ├── page.tsx          # 随笔列表页 (/blog/essay)
│   └── page/
│       └── [page]/
│           └── page.tsx  # 随笔分页 (/blog/essay/page/[page])
├── [...slug]/
│   └── page.tsx          # 文章详情页 (/blog/[slug])
└── page/
    └── [page]/
        └── page.tsx      # 所有文章分页 (/blog/page/[page])
```

## 页面说明

### 1. 主博客页面 (`/blog`)
- 文件：`page.tsx`
- 功能：显示所有分类的文章列表
- 排序：按发布日期倒序
- 分页：每页 5 篇文章

### 2. 分类页面

#### 技术分享 (`/blog/tech`)
- 文件：`tech/page.tsx`
- 功能：只显示 `category: 'tech'` 的文章
- 适用：技术教程、代码分享、开发经验

#### 生活感悟 (`/blog/life`)
- 文件：`life/page.tsx`
- 功能：只显示 `category: 'life'` 的文章
- 适用：生活随想、人生感悟、读书笔记

#### 随笔 (`/blog/essay`)
- 文件：`essay/page.tsx`
- 功能：只显示 `category: 'essay'` 的文章
- 适用：短篇随笔、日常记录、碎片化思考

### 3. 文章详情页 (`/blog/[...slug]`)
- 文件：`[...slug]/page.tsx`
- 功能：显示单篇文章的完整内容
- 支持：MDX 渲染、代码高亮、目录导航

### 4. 分页页面

#### 所有文章分页 (`/blog/page/[page]`)
- 文件：`page/[page]/page.tsx`
- 功能：处理所有文章列表的分页
- 示例：`/blog/page/2`、`/blog/page/3`

#### 分类分页
每个分类都有独立的分页支持：

- 技术分享分页：`/blog/tech/page/[page]`
  - 文件：`tech/page/[page]/page.tsx`
  - 示例：`/blog/tech/page/2`

- 生活感悟分页：`/blog/life/page/[page]`
  - 文件：`life/page/[page]/page.tsx`
  - 示例：`/blog/life/page/2`

- 随笔分页：`/blog/essay/page/[page]`
  - 文件：`essay/page/[page]/page.tsx`
  - 示例：`/blog/essay/page/2`

## 如何添加新文章

1. 在 `data/blog/` 目录下创建 MDX 文件
2. 添加 frontmatter，指定 `category` 字段：

```mdx
---
title: '文章标题'
date: '2024-03-20'
tags: ['tag1', 'tag2']
category: 'tech'  # 或 'life' 或 'essay'
summary: '文章摘要'
---

文章内容...
```

3. 文章会自动出现在对应的分类页面

## 分类规则

- 每篇文章必须指定一个 `category` 字段
- 可选值：`tech`、`life`、`essay`
- 默认值：`tech`（如果未指定）
- 兼容性：也支持通过 `tags` 字段进行分类

## 导航配置

导航栏配置在 `data/navigation.ts`：

```typescript
export const HEADER_NAV_LINKS = [
  { href: '/', title: '首页' },
  { href: '/blog/tech', title: '技术分享' },
  { href: '/blog/life', title: '生活感悟' },
  { href: '/blog/essay', title: '随笔' },
  { href: '/lab', title: '实验室' },
  { href: '/about', title: '关于' },
];
```

## 相关文档

- [博客分类使用指南](../../docs/guides/BLOG_CATEGORY_GUIDE.md)
- [项目结构说明](../../PROJECT_STRUCTURE.md)
- [AGENTS.md](../../AGENTS.md)
