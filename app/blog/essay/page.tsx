import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { genPageMetadata } from '@/lib/seo';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: '随笔' });

export default function EssayBlogPage() {
  // 过滤出随笔类别的文章
  const essayPosts = allBlogs.filter((post) => post.category === 'essay' || post.tags?.includes('essay'));
  const posts = allCoreContent(sortPosts(essayPosts));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="随笔" />;
}
