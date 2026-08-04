import { notFound } from 'next/navigation';
import { sortPosts } from 'pliny/utils/contentlayer';
import { EssayTimelineLayout } from 'layouts';
import {
  getEssayBlogs,
  getPageNumber,
  getPaginationStaticParams,
  getTotalPages,
  isPageOutOfRange,
  POSTS_PER_PAGE,
} from '@/lib/content';
import { BLOG_CATEGORY_DETAILS } from '@/lib/blog-taxonomy';
import { genPaginationMetadata } from '@/lib/seo';

const CATEGORY = BLOG_CATEGORY_DETAILS.essay;

export const generateStaticParams = async () => {
  const totalPages = getTotalPages(getEssayBlogs().length, POSTS_PER_PAGE);
  return getPaginationStaticParams(totalPages);
};

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params;
  const pageNumber = getPageNumber(page);
  const totalPages = getTotalPages(getEssayBlogs().length, POSTS_PER_PAGE);

  if (Number.isNaN(pageNumber) || isPageOutOfRange(pageNumber, totalPages)) notFound();

  return genPaginationMetadata({
    title: CATEGORY.label,
    description: CATEGORY.description,
    basePath: CATEGORY.path,
    pageNumber,
  });
}

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
    basePath: CATEGORY.path,
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
