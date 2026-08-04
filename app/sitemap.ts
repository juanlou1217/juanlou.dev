import { MetadataRoute } from 'next';
import { slug } from 'github-slugger';
import { sortPosts } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { BLOG_CATEGORY_DETAILS } from '@/lib/blog-taxonomy';
import { getBlogsByCategory, getEssayBlogs, getPublishedBlogs, getTotalPages, POSTS_PER_PAGE } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function getLatestModified(posts: Blog[]): string | undefined {
  return posts.reduce<string | undefined>((latest, post) => {
    const modified = post.lastmod || post.date;
    if (!latest || new Date(modified).getTime() > new Date(latest).getTime()) {
      return modified;
    }
    return latest;
  }, undefined);
}

function createEntry(path: string, posts: Blog[] = []): MetadataRoute.Sitemap[number] {
  const lastModified = getLatestModified(posts);
  return {
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
  };
}

function createPaginationEntries(posts: Blog[], basePath: string): MetadataRoute.Sitemap {
  const sortedPosts = sortPosts(posts);
  const totalPages = getTotalPages(sortedPosts.length, POSTS_PER_PAGE);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
    const pageNumber = index + 2;
    const pagePosts = sortedPosts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
    return createEntry(`${basePath}/page/${pageNumber}`, pagePosts);
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedBlogs = getPublishedBlogs();
  const techBlogs = getBlogsByCategory('tech');
  const lifeBlogs = getBlogsByCategory('life');
  const essayBlogs = getEssayBlogs();

  const tagBlogs = new Map<string, Blog[]>();
  publishedBlogs.forEach((post) => {
    post.tags?.forEach((tag) => {
      const tagSlug = slug(tag);
      tagBlogs.set(tagSlug, [...(tagBlogs.get(tagSlug) || []), post]);
    });
  });

  const primaryRoutes: MetadataRoute.Sitemap = [
    createEntry('/'),
    createEntry('/about'),
    createEntry('/blog', publishedBlogs),
    createEntry(BLOG_CATEGORY_DETAILS.tech.path, techBlogs),
    createEntry(BLOG_CATEGORY_DETAILS.life.path, lifeBlogs),
    createEntry(BLOG_CATEGORY_DETAILS.essay.path, essayBlogs),
    createEntry('/lab'),
    createEntry('/tags', publishedBlogs),
  ];

  const articleRoutes = publishedBlogs.map((post) => createEntry(`/${post.path}`, [post]));
  const tagRoutes = Array.from(tagBlogs.entries()).map(([tag, posts]) => createEntry(`/tags/${tag}`, posts));
  const paginationRoutes = [
    ...createPaginationEntries(publishedBlogs, '/blog'),
    ...createPaginationEntries(techBlogs, BLOG_CATEGORY_DETAILS.tech.path),
    ...createPaginationEntries(lifeBlogs, BLOG_CATEGORY_DETAILS.life.path),
    ...createPaginationEntries(essayBlogs, BLOG_CATEGORY_DETAILS.essay.path),
  ];

  return [...primaryRoutes, ...articleRoutes, ...tagRoutes, ...paginationRoutes];
}
