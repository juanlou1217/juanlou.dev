import { allBlogs, type Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';

export const POSTS_PER_PAGE = 5;

export function getPublishedBlogs(): Blog[] {
  return allBlogs.filter((post) => !post.draft);
}

export function isEssayBlog(post: Pick<Blog, 'category' | 'tags'>) {
  return post.category === 'essay' || post.tags?.includes('essay');
}

export function getBlogsByCategory(category: Blog['category']): Blog[] {
  return getPublishedBlogs().filter((post) => post.category === category || post.tags?.includes(category));
}

export function getEssayBlogs(): Blog[] {
  return getPublishedBlogs().filter((post) => isEssayBlog(post));
}

export function getBlogsByTag(tag: string): Blog[] {
  return getPublishedBlogs().filter((post) => post.tags?.some((postTag) => slug(postTag) === tag));
}

export function getRelatedBlogs(currentPost: Pick<Blog, 'slug' | 'tags' | 'category'>, limit = 3): Blog[] {
  const currentTags = new Set(currentPost.tags || []);

  return getPublishedBlogs()
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTagCount = post.tags?.filter((tag) => currentTags.has(tag)).length || 0;
      const sameCategory = post.category === currentPost.category ? 1 : 0;
      return { post, score: sharedTagCount * 2 + sameCategory };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getTotalPages(totalItems: number, pageSize = POSTS_PER_PAGE) {
  return Math.ceil(totalItems / pageSize);
}

export function getPageNumber(value: string) {
  if (!/^\d+$/.test(value)) {
    return Number.NaN;
  }

  return Number(value);
}

export function getPaginationStaticParams(totalPages: number) {
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export function isPageOutOfRange(pageNumber: number, totalPages: number) {
  return pageNumber < 1 || totalPages < 1 || pageNumber > totalPages;
}
