import { MetadataRoute } from 'next';
import siteMetadata from '@/data/siteMetadata';
import { getPublishedBlogs } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = getPublishedBlogs().map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }));

  const routes = ['', 'about', 'blog', 'blog/tech', 'blog/life', 'blog/essay', 'lab', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
