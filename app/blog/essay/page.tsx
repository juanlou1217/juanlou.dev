import { sortPosts } from 'pliny/utils/contentlayer';
import { genPageMetadata } from '@/lib/seo';
import { EssayTimelineLayout } from 'layouts';
import { getEssayBlogs, POSTS_PER_PAGE } from '@/lib/content';

export const metadata = genPageMetadata({ title: '随笔' });

export default function EssayBlogPage() {
  const posts = sortPosts(getEssayBlogs());
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    basePath: '/blog/essay',
  };

  return (
    <EssayTimelineLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="随笔时间线"
    />
  );
}
