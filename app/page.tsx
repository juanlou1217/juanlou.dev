import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { slug } from 'github-slugger';

import { HomeContent } from '@/components/homepage/HomeContent';
import { getPublishedBlogs } from '@/lib/content';

export default async function Page() {
  const publishedBlogs = getPublishedBlogs();
  const sortedPosts = sortPosts(publishedBlogs);
  const posts = allCoreContent(sortedPosts);
  const tagCounts = new Map<string, { label: string; count: number }>();

  for (const post of publishedBlogs) {
    for (const tag of post.tags ?? []) {
      const key = slug(tag);
      const existing = tagCounts.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        tagCounts.set(key, { label: tag, count: 1 });
      }
    }
  }

  const popularTags = Array.from(tagCounts.entries())
    .sort(([, a], [, b]) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'))
    .slice(0, 6)
    .map(([key, tag]) => ({
      slug: key,
      label: tag.label,
      count: tag.count,
    }));

  return <HomeContent posts={posts} popularTags={popularTags} />;
}
