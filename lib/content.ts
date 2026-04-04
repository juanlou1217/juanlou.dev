import { allBlogs, type Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';

export const POSTS_PER_PAGE = 5;

export function getPublishedBlogs(): Blog[] {
  return allBlogs.filter((post) => !post.draft);
}

export function getBlogsByCategory(category: Blog['category']): Blog[] {
  return getPublishedBlogs().filter((post) => post.category === category || post.tags?.includes(category));
}

export function getBlogsByTag(tag: string): Blog[] {
  return getPublishedBlogs().filter((post) => post.tags?.some((postTag) => slug(postTag) === tag));
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

export function isPageOutOfRange(pageNumber: number, totalPages: number) {
  return pageNumber < 1 || totalPages < 1 || pageNumber > totalPages;
}
