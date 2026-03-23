# 国际化 (i18n) 实施指南

## 概述

本指南说明如何在 Next.js 16 + React 19 项目中实现国际化，使用 `next-intl` v3 库。

## 技术选型

- **库**: `next-intl` v3.x
- **原因**: 
  - 原生支持 App Router 和 Server Components
  - 类型安全的翻译
  - 支持动态路由和中间件
  - 零客户端 JavaScript（Server Components）

## 实施步骤

### 第一步：安装依赖

```bash
pnpm add next-intl
```

### 第二步：创建翻译文件

创建 `messages/` 目录存放翻译文件：

```
messages/
├── en.json          # 英文翻译
├── zh-CN.json       # 简体中文翻译
└── zh-TW.json       # 繁体中文翻译（可选）
```

**示例：`messages/zh-CN.json`**

```json
{
  "common": {
    "home": "首页",
    "blog": "博客",
    "tags": "标签",
    "projects": "项目",
    "about": "关于"
  },
  "blog": {
    "readMore": "阅读更多",
    "publishedOn": "发布于",
    "readingTime": "{minutes} 分钟阅读",
    "views": "{count} 次浏览",
    "loves": "{count} 个赞"
  },
  "footer": {
    "builtWith": "使用 {tech} 构建",
    "copyright": "© {year} {author}. 保留所有权利。"
  }
}
```

**示例：`messages/en.json`**

```json
{
  "common": {
    "home": "Home",
    "blog": "Blog",
    "tags": "Tags",
    "projects": "Projects",
    "about": "About"
  },
  "blog": {
    "readMore": "Read more",
    "publishedOn": "Published on",
    "readingTime": "{minutes} min read",
    "views": "{count, plural, =0 {No views} =1 {1 view} other {# views}}",
    "loves": "{count, plural, =0 {No loves} =1 {1 love} other {# loves}}"
  },
  "footer": {
    "builtWith": "Built with {tech}",
    "copyright": "© {year} {author}. All rights reserved."
  }
}
```

### 第三步：配置 next-intl

**创建 `i18n/request.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// 支持的语言列表
export const locales = ['en', 'zh-CN'] as const
export type Locale = (typeof locales)[number]

// 默认语言
export const defaultLocale: Locale = 'zh-CN'

export default getRequestConfig(async ({ locale }) => {
  // 验证语言是否支持
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

**更新 `next.config.mjs`**

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... 其他配置
}

export default withNextIntl(nextConfig)
```

### 第四步：创建中间件

**创建 `middleware.ts`**

```typescript
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/request'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // 默认语言不显示前缀
  localeDetection: true, // 自动检测用户语言
})

export const config = {
  // 匹配所有路径，除了 API、静态文件等
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

### 第五步：重构目录结构

将 `app/` 目录改为支持语言路由：

**之前的结构**：
```
app/
├── page.tsx
├── blog/
│   └── page.tsx
└── layout.tsx
```

**之后的结构**：
```
app/
├── [locale]/              # 动态语言路由
│   ├── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   └── layout.tsx
└── layout.tsx             # 根布局（不变）
```

**迁移步骤**：

```bash
# 1. 创建 [locale] 目录
mkdir -p app/[locale]

# 2. 移动所有页面到 [locale] 下
mv app/page.tsx app/[locale]/
mv app/blog app/[locale]/
mv app/tags app/[locale]/
mv app/projects app/[locale]/
mv app/about app/[locale]/

# 3. 移动布局文件
mv app/layout.tsx app/[locale]/layout.tsx

# 4. 创建新的根布局
```

**创建 `app/layout.tsx`（根布局）**

```typescript
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
```

**更新 `app/[locale]/layout.tsx`**

```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/request'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // 验证语言
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // 获取翻译消息
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

### 第六步：使用翻译

**在 Server Components 中**

```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('common')
  
  return (
    <div>
      <h1>{t('home')}</h1>
    </div>
  )
}
```

**在 Client Components 中**

```typescript
// components/blog/ViewCounter.tsx
'use client'

import { useTranslations } from 'next-intl'

export function ViewCounter({ count }: { count: number }) {
  const t = useTranslations('blog')
  
  return <span>{t('views', { count })}</span>
}
```

**带参数的翻译**

```typescript
const t = useTranslations('blog')

// 简单参数
t('readingTime', { minutes: 5 }) // "5 分钟阅读"

// 复数形式
t('views', { count: 0 })  // "No views"
t('views', { count: 1 })  // "1 view"
t('views', { count: 10 }) // "10 views"
```

### 第七步：语言切换器

**创建 `components/LanguageSwitcher.tsx`**

```typescript
'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales } from '@/i18n/request'

const languageNames: Record<string, string> = {
  en: 'English',
  'zh-CN': '简体中文',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    // 替换当前路径中的语言代码
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded border px-2 py-1"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {languageNames[loc]}
        </option>
      ))}
    </select>
  )
}
```

### 第八步：更新导航配置

**更新 `data/navigation.ts`**

```typescript
// 移除硬编码的标题，改用翻译键
export const navigation = [
  { href: '/', titleKey: 'common.home' },
  { href: '/blog', titleKey: 'common.blog' },
  { href: '/tags', titleKey: 'common.tags' },
  { href: '/projects', titleKey: 'common.projects' },
  { href: '/about', titleKey: 'common.about' },
]
```

**更新导航组件**

```typescript
// components/header/Navigation.tsx
import { useTranslations } from 'next-intl'
import { navigation } from '@/data/navigation'

export function Navigation() {
  const t = useTranslations()
  
  return (
    <nav>
      {navigation.map((item) => (
        <a key={item.href} href={item.href}>
          {t(item.titleKey)}
        </a>
      ))}
    </nav>
  )
}
```

### 第九步：处理 MDX 内容

**方案 1：单语言 MDX（推荐）**

保持 MDX 文件为单一语言，通过文件名区分：

```
data/
├── blog/
│   ├── my-post.zh-CN.mdx
│   └── my-post.en.mdx
```

**方案 2：多语言字段**

在 frontmatter 中添加多语言字段：

```mdx
---
title:
  zh-CN: "我的文章"
  en: "My Post"
summary:
  zh-CN: "这是摘要"
  en: "This is summary"
---
```

### 第十步：更新 siteMetadata

**修改 `data/siteMetadata.js`**

```javascript
const siteMetadata = {
  title: {
    'zh-CN': '我的博客',
    en: 'My Blog',
  },
  author: 'Your Name',
  description: {
    'zh-CN': '一个关于技术的博客',
    en: 'A blog about technology',
  },
  // 移除 language 字段，改用动态语言
  siteUrl: 'https://yourdomain.com',
  // ... 其他配置
}

module.exports = siteMetadata
```

**创建辅助函数**

```typescript
// lib/utils/i18n.ts
import siteMetadata from '@/data/siteMetadata'
import type { Locale } from '@/i18n/request'

export function getLocalizedMetadata(locale: Locale) {
  return {
    title: typeof siteMetadata.title === 'object' 
      ? siteMetadata.title[locale] 
      : siteMetadata.title,
    description: typeof siteMetadata.description === 'object'
      ? siteMetadata.description[locale]
      : siteMetadata.description,
  }
}
```

## 常见问题

### Q1: 如何处理 API 路由？

API 路由不受语言路由影响，保持在 `app/api/` 目录下。如需返回多语言内容，可通过请求头 `Accept-Language` 判断。

### Q2: 如何处理 SEO？

```typescript
// app/[locale]/blog/[...slug]/page.tsx
export async function generateMetadata({ params: { locale, slug } }) {
  const post = allBlogs.find((p) => p.slug === slug.join('/'))
  
  return {
    title: post.title,
    description: post.summary,
    alternates: {
      languages: {
        'en': `/en/blog/${slug.join('/')}`,
        'zh-CN': `/zh-CN/blog/${slug.join('/')}`,
      },
    },
  }
}
```

### Q3: 默认语言不显示前缀？

在 `middleware.ts` 中设置 `localePrefix: 'as-needed'`，这样：
- `/` → 中文首页（默认语言）
- `/en` → 英文首页
- `/blog` → 中文博客
- `/en/blog` → 英文博客

### Q4: 如何处理日期格式？

```typescript
import { useFormatter } from 'next-intl'

export function BlogDate({ date }: { date: string }) {
  const format = useFormatter()
  
  return (
    <time>
      {format.dateTime(new Date(date), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </time>
  )
}
```

## 迁移检查清单

- [ ] 安装 `next-intl`
- [ ] 创建 `messages/` 翻译文件
- [ ] 配置 `i18n/request.ts`
- [ ] 更新 `next.config.mjs`
- [ ] 创建 `middleware.ts`
- [ ] 重构 `app/` 目录结构
- [ ] 更新所有组件使用 `useTranslations`
- [ ] 添加语言切换器
- [ ] 更新 `siteMetadata.js`
- [ ] 测试所有页面和路由
- [ ] 更新 SEO 元数据
- [ ] 测试构建和部署

## 参考资源

- [next-intl 官方文档](https://next-intl-docs.vercel.app/)
- [Next.js 国际化指南](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU 消息格式](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
