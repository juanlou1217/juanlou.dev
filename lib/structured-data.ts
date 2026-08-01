import type { Authors, Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import { absoluteUrl } from '@/lib/seo';
import { getBlogCategoryDetails } from '@/lib/blog-taxonomy';

type AuthorContent = Pick<Authors, 'name' | 'slug' | 'github'>;

function getPostImages(images: Blog['images']): string[] {
  if (!images) {
    return [absoluteUrl(siteMetadata.socialBanner)];
  }

  const imageList = typeof images === 'string' ? [images] : Array.isArray(images) ? images : [];
  return imageList.length > 0
    ? imageList.map((image) => absoluteUrl(String(image)))
    : [absoluteUrl(siteMetadata.socialBanner)];
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    url: `${siteMetadata.siteUrl}/`,
    name: siteMetadata.title,
    alternateName: siteMetadata.alternateNames,
    description: siteMetadata.description,
    inLanguage: siteMetadata.language,
    publisher: {
      '@id': `${siteMetadata.siteUrl}/about#person`,
    },
  };
}

export function getProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteMetadata.siteUrl}/about#profile-page`,
    url: `${siteMetadata.siteUrl}/about`,
    name: `关于${siteMetadata.fullName}（${siteMetadata.author}）`,
    description: `了解 ${siteMetadata.brandName} 的作者${siteMetadata.fullName}，以及他的技术实践、学习方式与写作动机。`,
    inLanguage: siteMetadata.language,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/about#person`,
      name: siteMetadata.fullName,
      alternateName: [siteMetadata.author, 'Juanlou'],
      url: `${siteMetadata.siteUrl}/about`,
      image: absoluteUrl(siteMetadata.image),
      sameAs: [siteMetadata.github],
      jobTitle: '软件工程师',
    },
  };
}

export function getBlogPostingJsonLd(post: Blog, authorDetails: AuthorContent[]) {
  const url = absoluteUrl(`/${post.path}`);
  const category = getBlogCategoryDetails(post.category);
  const authors =
    authorDetails.length > 0 ? authorDetails : [{ name: siteMetadata.author, slug: 'default', github: '' }];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blog-posting`,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.summary || siteMetadata.description,
    image: getPostImages(post.images),
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    inLanguage: siteMetadata.language,
    articleSection: category.label,
    keywords: post.tags,
    isBasedOn: post.sourceUrl || undefined,
    author: authors.map((author) => ({
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/about#person`,
      name: author.name,
      url: `${siteMetadata.siteUrl}/about`,
      sameAs: author.github ? [author.github] : [siteMetadata.github],
    })),
    publisher: {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/about#person`,
      name: siteMetadata.fullName,
      alternateName: siteMetadata.author,
      url: `${siteMetadata.siteUrl}/about`,
    },
  };
}

export function getBlogBreadcrumbJsonLd(post: Blog) {
  const category = getBlogCategoryDetails(post.category);
  const items = [
    { name: '首页', url: `${siteMetadata.siteUrl}/` },
    { name: '博客', url: `${siteMetadata.siteUrl}/blog` },
    ...(category.path === '/blog' ? [] : [{ name: category.label, url: absoluteUrl(category.path) }]),
    { name: post.title, url: absoluteUrl(`/${post.path}`) },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
