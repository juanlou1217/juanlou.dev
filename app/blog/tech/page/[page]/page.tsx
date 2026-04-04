import ListLayout from '@/layouts/ListLayout';
import { notFound } from 'next/navigation';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { getBlogsByCategory, getPageNumber, getTotalPages, isPageOutOfRange, POSTS_PER_PAGE } from '@/lib/content';

export const generateStaticParams = async () => {
  const totalPages = getTotalPages(getBlogsByCategory('tech').length, POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

export default async function TechPagePagination(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const posts = allCoreContent(sortPosts(getBlogsByCategory('tech')));
  const pageNumber = getPageNumber(params.page);
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);

  if (Number.isNaN(pageNumber) || isPageOutOfRange(pageNumber, totalPages)) {
    notFound();
  }

  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages,
    basePath: '/blog/tech',
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="技术分享" />
  );
}
