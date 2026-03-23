# 内容更新指南

## 概述

本指南说明如何在博客系统中进行内容的增删改查操作，主要涵盖：
- 博客文章管理
- 作者信息管理
- 网站配置更新

---

## 一、博客文章管理

### 📁 文件位置

所有博客文章存放在：**`data/blog/`**

```
data/blog/
├── my-first-post.mdx           # 单篇文章
├── nested-folder/              # 支持嵌套目录
│   └── another-post.mdx
└── essay-spring-thoughts.mdx   # 现有文章示例
```

### ➕ 新增文章

**步骤 1：创建 MDX 文件**

在 `data/blog/` 目录下创建新的 `.mdx` 文件：

```bash
# 文件名会成为 URL slug
# 例如：my-new-post.mdx → /blog/my-new-post
touch data/blog/my-new-post.mdx
```

**步骤 2：填写 Frontmatter**

在文件开头添加元数据（必需）：

```mdx
---
title: '文章标题'
date: '2024-03-20'
tags: ['nextjs', 'typescript', 'react']
draft: false
summary: '文章摘要，会显示在列表页'
images: ['/static/images/banner.jpg']
authors: ['default']
layout: PostLayout
---

这里开始写正文内容...

## 标题

段落内容...
```

**Frontmatter 字段说明**：

| 字段 | 必需 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 文章标题 | `'我的第一篇博客'` |
| `date` | ✅ | 发布日期（YYYY-MM-DD） | `'2024-03-20'` |
| `tags` | ✅ | 标签数组 | `['nextjs', 'react']` |
| `draft` | ✅ | 是否为草稿（true 不会显示） | `false` |
| `summary` | ✅ | 文章摘要 | `'这是一篇关于...'` |
| `images` | ❌ | 封面图片数组 | `['/static/images/cover.jpg']` |
| `authors` | ❌ | 作者 ID 数组 | `['default']` |
| `layout` | ❌ | 布局模板 | `PostLayout` 或 `PostBanner` |
| `canonicalUrl` | ❌ | 原文链接（转载时使用） | `'https://example.com/post'` |

**步骤 3：编写内容**

使用 Markdown 语法编写文章：

```mdx
---
title: 'Next.js 15 新特性解析'
date: '2024-03-20'
tags: ['nextjs', 'react']
draft: false
summary: '深入了解 Next.js 15 带来的重大更新'
authors: ['default']
layout: PostLayout
---

## 引言

Next.js 15 带来了许多激动人心的新特性...

## 新特性 1：Turbopack

Turbopack 是新一代的打包工具...

```typescript
// 代码示例
export default function Page() {
  return <div>Hello World</div>
}
```

## 总结

本文介绍了...
```

**步骤 4：添加图片（可选）**

将图片放在 `public/static/images/` 目录：

```bash
# 添加图片
cp my-image.jpg public/static/images/

# 在 MDX 中引用
![图片描述](/static/images/my-image.jpg)
```

**步骤 5：预览文章**

```bash
# 启动开发服务器
pnpm dev

# 访问文章
open http://localhost:3000/blog/my-new-post
```

### ✏️ 修改文章

**直接编辑 MDX 文件**：

```bash
# 找到要修改的文章
vim data/blog/my-post.mdx

# 或使用编辑器打开
code data/blog/my-post.mdx
```

**常见修改场景**：

1. **更新标题或摘要**：修改 frontmatter 中的 `title` 或 `summary`
2. **添加/删除标签**：修改 `tags` 数组
3. **修改正文内容**：直接编辑 frontmatter 下方的 Markdown 内容
4. **设为草稿**：将 `draft` 改为 `true`

**示例：将文章设为草稿**

```diff
---
title: '我的文章'
date: '2024-03-20'
tags: ['nextjs']
- draft: false
+ draft: true
summary: '文章摘要'
---
```

### 🔍 查询文章

**方式 1：直接查看文件**

```bash
# 列出所有文章
ls -la data/blog/

# 搜索包含特定关键词的文章
grep -r "关键词" data/blog/
```

**方式 2：通过网站查看**

- 访问 `/blog` 查看所有文章列表
- 访问 `/tags` 查看按标签分类的文章
- 访问 `/blog/[slug]` 查看单篇文章

**方式 3：通过代码查询**

```typescript
// 在任何 Server Component 中
import { allBlogs } from 'contentlayer/generated'

// 获取所有已发布文章
const posts = allBlogs.filter(post => !post.draft)

// 按日期排序
const sortedPosts = posts.sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
)

// 按标签筛选
const nextjsPosts = posts.filter(post => 
  post.tags?.includes('nextjs')
)

// 查找特定文章
const post = allBlogs.find(p => p.slug === 'my-post')
```

### 🗑️ 删除文章

**直接删除 MDX 文件**：

```bash
# 删除单篇文章
rm data/blog/my-post.mdx

# 删除整个目录
rm -rf data/blog/old-posts/
```

**注意事项**：
- 删除文章后，需要重启开发服务器才能生效
- 生产环境需要重新构建：`pnpm build`
- 如果只是暂时隐藏，建议使用 `draft: true` 而不是删除

---

## 二、作者信息管理

### 📁 文件位置

作者信息存放在：**`data/authors/`**

```
data/authors/
├── default.mdx    # 默认作者（你自己）
└── guest.mdx      # 客座作者示例
```

### ➕ 新增作者

**步骤 1：创建作者文件**

```bash
# 文件名会成为作者 ID
touch data/authors/john-doe.mdx
```

**步骤 2：填写作者信息**

```mdx
---
name: John Doe
avatar: /static/images/avatar-john.jpg
occupation: Software Engineer
company: Tech Company
email: john@example.com
twitter: https://twitter.com/johndoe
github: https://github.com/johndoe
---

这里可以写作者的详细介绍...

## 关于我

我是一名全栈开发者...
```

### ✏️ 修改作者信息

编辑 `data/authors/default.mdx`（你的个人信息）：

```mdx
---
name: 你的名字
avatar: /static/images/avatar.jpg
occupation: 你的职位
company: 你的公司
email: your@email.com
twitter: https://twitter.com/yourhandle
github: https://github.com/yourusername
linkedin: https://linkedin.com/in/yourprofile
---

更新你的个人简介...
```

### 🔗 在文章中使用作者

在文章的 frontmatter 中引用作者 ID：

```mdx
---
title: '我的文章'
authors: ['default', 'john-doe']  # 可以有多个作者
---
```

---

## 三、网站配置更新

### 📁 文件位置

网站全局配置：**`data/siteMetadata.js`**

### ✏️ 修改网站信息

编辑 `data/siteMetadata.js`：

```javascript
const siteMetadata = {
  // 基本信息
  title: '你的博客名称',              // 修改网站标题
  author: '你的名字',                 // 修改作者名
  headerTitle: '博客',                // 修改页头标题
  description: '这是一个关于...',     // 修改网站描述
  
  // 网站链接
  siteUrl: 'https://yourdomain.com',  // 修改域名
  siteRepo: 'https://github.com/username/repo',
  
  // 社交媒体链接
  email: 'your@email.com',            // 修改邮箱
  github: 'https://github.com/username',
  twitter: 'https://twitter.com/username',
  linkedin: 'https://linkedin.com/in/username',
  
  // 主题设置
  theme: 'system', // 'light' | 'dark' | 'system'
  
  // 评论系统配置
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      // ... 其他配置
    },
  },
}
```

**常见修改场景**：

1. **更新个人信息**：修改 `author`, `email`, 社交媒体链接
2. **更换域名**：修改 `siteUrl`
3. **修改网站标题**：修改 `title`, `headerTitle`
4. **更换 Logo**：修改 `siteLogo` 路径，并将新 Logo 放到 `public/static/images/`

### 🔗 修改导航菜单

编辑 `data/navigation.ts`：

```typescript
export const navigation = [
  { href: '/', title: '首页' },
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
  // 添加新菜单项
  { href: '/lab', title: '实验室' },
]
```

---

## 四、快速参考

### 常用命令

```bash
# 创建新文章
touch data/blog/my-new-post.mdx

# 查看所有文章
ls -la data/blog/

# 搜索文章内容
grep -r "关键词" data/blog/

# 删除文章
rm data/blog/old-post.mdx

# 启动开发服务器（查看效果）
pnpm dev

# 构建生产版本
pnpm build
```

### 文件路径速查

| 内容类型 | 文件位置 | 说明 |
|---------|---------|------|
| 博客文章 | `data/blog/*.mdx` | 所有博客文章 |
| 作者信息 | `data/authors/*.mdx` | 作者资料 |
| 网站配置 | `data/siteMetadata.js` | 全局配置 |
| 导航菜单 | `data/navigation.ts` | 顶部导航 |
| 静态图片 | `public/static/images/` | 图片资源 |
| 标签数据 | `app/tag-data.json` | 自动生成，无需手动编辑 |

### 文章 URL 规则

| 文件路径 | 访问 URL |
|---------|---------|
| `data/blog/hello-world.mdx` | `/blog/hello-world` |
| `data/blog/2024/my-post.mdx` | `/blog/2024/my-post` |
| `data/blog/tech/nextjs.mdx` | `/blog/tech/nextjs` |

### 常见问题

**Q: 新增文章后看不到？**
- 检查 `draft: false`（不是 `true`）
- 重启开发服务器：`Ctrl+C` 然后 `pnpm dev`
- 检查 frontmatter 格式是否正确

**Q: 图片显示不出来？**
- 确保图片在 `public/static/images/` 目录
- 使用绝对路径：`/static/images/xxx.jpg`（不是 `./static/...`）
- 检查文件名大小写是否匹配

**Q: 修改配置后不生效？**
- 重启开发服务器
- 清除缓存：`rm -rf .next && pnpm dev`
- 检查 `.env.local` 环境变量是否正确

**Q: 如何批量修改文章？**
```bash
# 批量替换标签
find data/blog -name "*.mdx" -exec sed -i '' 's/oldtag/newtag/g' {} +

# 批量添加字段（需要手动编辑）
grep -l "tags:" data/blog/*.mdx
```

---

## 五、最佳实践

### 文章命名

✅ 推荐：
- `how-to-use-nextjs.mdx`（小写，连字符分隔）
- `2024-03-20-my-post.mdx`（带日期前缀）

❌ 避免：
- `How To Use NextJS.mdx`（大写）
- `my_post.mdx`（下划线）
- `我的文章.mdx`（中文文件名）

### 标签管理

- 使用小写英文：`nextjs`, `typescript`
- 保持一致性：不要同时使用 `next-js` 和 `nextjs`
- 限制数量：每篇文章 3-5 个标签
- 常用标签：`nextjs`, `react`, `typescript`, `javascript`, `css`, `nodejs`

### 图片优化

- 使用 WebP 格式（更小的文件体积）
- 压缩图片（推荐工具：TinyPNG, ImageOptim）
- 使用描述性文件名：`nextjs-app-router.jpg`（不是 `IMG_1234.jpg`）
- 封面图建议尺寸：1200x630px（适配社交媒体分享）

### 内容组织

- 使用子目录分类：`data/blog/tech/`, `data/blog/life/`
- 相关文章放在一起
- 定期清理草稿文章

---

## 相关文档

- [AGENTS.md](../../AGENTS.md) - 项目整体说明
- [I18N_GUIDE.md](./I18N_GUIDE.md) - 国际化指南
- [Contentlayer 文档](https://contentlayer.dev/) - MDX 处理工具
