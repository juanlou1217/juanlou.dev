import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { formatDate } from 'pliny/utils/formatDate';
import { allAuthors, type Blog } from 'contentlayer/generated';

import components from '@/components/ui/MDXComponents';
import siteMetadata from '@/data/siteMetadata';
import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import SectionContainer from '@/components/ui/SectionContainer';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath?: string;
}

interface EssayTimelineLayoutProps {
  posts: Blog[];
  title: string;
  initialDisplayPosts?: Blog[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage, basePath = '/blog/essay' }: PaginationProps) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="border-t border-gray-200 pt-6 pb-12 dark:border-gray-800">
      <nav className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        {prevPage ? (
          <Link href={currentPage - 1 === 1 ? basePath : `${basePath}/page/${currentPage - 1}`} rel="prev">
            较新的记录
          </Link>
        ) : (
          <span className="opacity-40">较新的记录</span>
        )}

        <span>
          第 {currentPage} / {totalPages} 页
        </span>

        {nextPage ? (
          <Link href={`${basePath}/page/${currentPage + 1}`} rel="next">
            更早的记录
          </Link>
        ) : (
          <span className="opacity-40">更早的记录</span>
        )}
      </nav>
    </div>
  );
}

export default function EssayTimelineLayout(props: EssayTimelineLayoutProps) {
  const { posts, title, initialDisplayPosts = [], pagination } = props;
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;
  const defaultAuthor = allAuthors.find((author) => author.slug === 'default');

  return (
    <SectionContainer>
      <div className="space-y-3 pt-8 pb-6">
        <p className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
          Essay Timeline
        </p>
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-gray-50">{title}</h1>
          <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
            保留线性的时间感，但让时间退后一点。先看到最近写了什么，再决定要不要点进详情页和评论区。
          </p>
        </div>
      </div>

      {!displayPosts.length && (
        <div className="border-t border-gray-200 py-12 text-gray-500 dark:border-gray-800 dark:text-gray-400">
          这里还没有公开的随笔记录。
        </div>
      )}

      <div className="relative border-t border-gray-200 pt-2 dark:border-gray-800">
        <div className="absolute top-0 bottom-0 left-5 hidden w-px bg-gray-200 sm:block dark:bg-gray-800" />
        {displayPosts.map((post) => (
          <article key={post.path} className="relative py-7">
            <div className="flex items-start gap-4">
              <div className="relative z-10 pt-1">
                {defaultAuthor?.avatar ? (
                  <Image
                    src={defaultAuthor.avatar}
                    alt={defaultAuthor.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-900"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                    卷
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {defaultAuthor?.name || siteMetadata.author}
                  </span>
                  <time dateTime={post.date} className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                  <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
                  <Link
                    href={`/${post.path}`}
                    className="hover:text-primary-500 text-xs text-gray-500 transition-colors dark:text-gray-400"
                  >
                    详情 / 评论
                  </Link>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-[0_1px_0_rgba(15,23,42,0.02)] dark:border-gray-800 dark:bg-gray-950/70">
                  <h2 className="text-base font-semibold tracking-tight text-gray-950 dark:text-gray-50">
                    {post.title}
                  </h2>
                  <div className="prose prose-gray dark:prose-invert prose-p:my-3 prose-headings:mt-5 prose-headings:mb-3 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base mt-3 max-w-none">
                    <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          basePath={pagination.basePath}
        />
      )}
    </SectionContainer>
  );
}
