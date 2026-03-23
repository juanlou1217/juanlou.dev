import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { genPageMetadata } from '@/lib/seo';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: '生活感悟' });

export default function LifeBlogPage() {
  // 过滤出生活感悟类别的文章
  const lifePosts = allBlogs.filter((post) => post.category === 'life' || post.tags?.includes('life'));
  const posts = allCoreContent(sortPosts(lifePosts));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="生活感悟" />
  );
}
