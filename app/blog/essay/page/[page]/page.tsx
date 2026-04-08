import { notFound } from 'next/navigation';
import { sortPosts } from 'pliny/utils/contentlayer';
import { EssayTimelineLayout } from 'layouts';
import { getEssayBlogs, getPageNumber, getTotalPages, isPageOutOfRange, POSTS_PER_PAGE } from '@/lib/content';

export const generateStaticParams = async () => {
  const totalPages = getTotalPages(getEssayBlogs().length, POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

export default async function EssayPagePagination(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const posts = sortPosts(getEssayBlogs());
  const pageNumber = getPageNumber(params.page);
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);

  if (Number.isNaN(pageNumber) || isPageOutOfRange(pageNumber, totalPages)) {
    notFound();
  }

  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages,
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
