import ListLayout from '@/layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';

const POSTS_PER_PAGE = 5;

export const generateStaticParams = async () => {
  const techPosts = allBlogs.filter((post) => post.category === 'tech' || post.tags?.includes('tech'));
  const totalPages = Math.ceil(techPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

export default async function TechPagePagination(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const techPosts = allBlogs.filter((post) => post.category === 'tech' || post.tags?.includes('tech'));
  const posts = allCoreContent(sortPosts(techPosts));
  const pageNumber = parseInt(params.page as string);
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    basePath: '/blog/tech/page',
  };

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="技术分享" />
  );
}
