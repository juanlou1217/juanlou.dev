import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { genPageMetadata } from '@/lib/seo';
import { getBlogsByCategory, POSTS_PER_PAGE } from '@/lib/content';
import { BLOG_CATEGORY_DETAILS } from '@/lib/blog-taxonomy';

export const metadata = genPageMetadata({
  title: BLOG_CATEGORY_DETAILS.tech.label,
  description: BLOG_CATEGORY_DETAILS.tech.description,
  path: BLOG_CATEGORY_DETAILS.tech.path,
});

export default function TechBlogPage() {
  const posts = allCoreContent(sortPosts(getBlogsByCategory('tech')));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    basePath: '/blog/tech',
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="技术分享" />
  );
}
