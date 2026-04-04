import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { genPageMetadata } from '@/lib/seo';
import { getBlogsByCategory, POSTS_PER_PAGE } from '@/lib/content';

export const metadata = genPageMetadata({ title: '随笔' });

export default function EssayBlogPage() {
  const posts = allCoreContent(sortPosts(getBlogsByCategory('essay')));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    basePath: '/blog/essay',
  };

  return <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="随笔" />;
}
