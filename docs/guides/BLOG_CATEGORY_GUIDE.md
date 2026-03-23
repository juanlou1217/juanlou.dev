# 博客分类使用指南

## 概述

本博客系统支持三种文章分类：
- `tech` - 技术分享
- `life` - 生活感悟
- `essay` - 随笔

## 如何使用

### 1. 在 MDX 文件中添加分类

在博客文章的 frontmatter 中添加 `category` 字段：

```mdx
---
title: '我的技术文章'
date: '2024-03-20'
tags: ['javascript', 'react']
category: 'tech'
summary: '这是一篇技术分享文章'
---

文章内容...
```

### 2. 可用的分类值

- **tech** (技术分享)
  - 适用于：技术教程、代码分享、技术总结、开发经验
  - 示例标签：javascript, typescript, react, nestjs, database

- **life** (生活感悟)
  - 适用于：生活随想、人生感悟、旅行记录、读书笔记
  - 示例标签：life, reading, travel, thinking

- **essay** (随笔)
  - 适用于：短篇随笔、日常记录、碎片化思考
  - 示例标签：essay, daily, thoughts

### 3. 默认分类

如果不指定 `category` 字段，文章将默认归类为 `tech`（技术分享）。

### 4. 访问分类页面

- 技术分享：`/blog/tech`
- 生活感悟：`/blog/life`
- 随笔：`/blog/essay`
- 所有文章：`/blog`

## 示例文章

### 技术分享示例

```mdx
---
title: 'React 19 新特性详解'
date: '2024-03-20'
tags: ['react', 'javascript']
category: 'tech'
summary: '深入了解 React 19 带来的新特性和改进'
---

## 介绍

React 19 带来了许多令人兴奋的新特性...
```

### 生活感悟示例

```mdx
---
title: '关于时间管理的思考'
date: '2024-03-20'
tags: ['life', 'thinking']
category: 'life'
summary: '分享我在时间管理方面的一些心得体会'
---

## 前言

最近在思考如何更好地管理时间...
```

### 随笔示例

```mdx
---
title: '春日随想'
date: '2024-03-20'
tags: ['essay', 'daily']
category: 'essay'
summary: '春天来了，记录一些碎片化的想法'
---

今天天气很好，阳光明媚...
```

## 技术实现

### 分类过滤逻辑

系统会根据 `category` 字段过滤文章：

```typescript
// 过滤技术分享文章
const techPosts = allBlogs.filter((post) => post.category === 'tech')

// 过滤生活感悟文章
const lifePosts = allBlogs.filter((post) => post.category === 'life')

// 过滤随笔文章
const essayPosts = allBlogs.filter((post) => post.category === 'essay')
```

### 兼容性处理

为了向后兼容，系统也支持通过 `tags` 字段进行分类：

```typescript
const techPosts = allBlogs.filter(
  (post) => post.category === 'tech' || post.tags?.includes('tech')
)
```

这意味着即使没有 `category` 字段，只要文章的 `tags` 中包含对应的分类标签，也会被归类到相应的分类页面。

## 注意事项

1. 每篇文章只能属于一个分类
2. 分类字段是可选的，默认为 `tech`
3. 分类值必须是 `tech`、`life` 或 `essay` 之一
4. 建议在创建新文章时明确指定分类，避免依赖默认值

## 迁移现有文章

如果你有现有的文章需要添加分类，可以按以下步骤操作：

1. 打开 MDX 文件
2. 在 frontmatter 中添加 `category` 字段
3. 根据文章内容选择合适的分类值
4. 保存文件

示例：

```diff
---
title: '我的文章'
date: '2024-03-20'
tags: ['javascript']
+ category: 'tech'
summary: '文章摘要'
---
```

## 相关文件

- 分类页面：
  - `app/blog/tech/page.tsx`
  - `app/blog/life/page.tsx`
  - `app/blog/essay/page.tsx`
- 配置文件：`contentlayer.config.ts`
- 导航配置：`data/navigation.ts`
