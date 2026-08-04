import ListLayout from '@/layouts/ListLayout';
import { notFound } from 'next/navigation';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import {
  getPageNumber,
  getPaginationStaticParams,
  getPublishedBlogs,
  getTotalPages,
  isPageOutOfRange,
  POSTS_PER_PAGE,
} from '@/lib/content';
import { genPaginationMetadata } from '@/lib/seo';

const BASE_PATH = '/blog';
const PAGE_TITLE = '博客';
const PAGE_DESCRIPTION = '浏览 Juanlou（卷娄）的全部公开文章。';

export const generateStaticParams = async () => {
  const totalPages = getTotalPages(getPublishedBlogs().length, POSTS_PER_PAGE);
  return getPaginationStaticParams(totalPages);
};

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params;
  const pageNumber = getPageNumber(page);
  const totalPages = getTotalPages(getPublishedBlogs().length, POSTS_PER_PAGE);

  if (Number.isNaN(pageNumber) || isPageOutOfRange(pageNumber, totalPages)) notFound();

  return genPaginationMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    basePath: BASE_PATH,
    pageNumber,
  });
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const posts = allCoreContent(sortPosts(getPublishedBlogs()));
  const pageNumber = getPageNumber(params.page);
  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);

  if (Number.isNaN(pageNumber) || isPageOutOfRange(pageNumber, totalPages)) {
    notFound();
  }

  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages,
    basePath: BASE_PATH,
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="所有文章" />
  );
}
