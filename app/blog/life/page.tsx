import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { genPageMetadata } from '@/lib/seo';
import { getBlogsByCategory, POSTS_PER_PAGE } from '@/lib/content';
import { BLOG_CATEGORY_DETAILS } from '@/lib/blog-taxonomy';

export const metadata = genPageMetadata({
  title: BLOG_CATEGORY_DETAILS.life.label,
  description: BLOG_CATEGORY_DETAILS.life.description,
  path: BLOG_CATEGORY_DETAILS.life.path,
});

export default function LifeBlogPage() {
  const posts = allCoreContent(sortPosts(getBlogsByCategory('life')));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    basePath: '/blog/life',
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="生活感悟" />
  );
}
