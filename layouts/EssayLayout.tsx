import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import { allAuthors } from 'contentlayer/generated';
import { formatDate } from 'pliny/utils/formatDate';
import type { Blog, Authors } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import type { StatsType } from '@/types/prisma';

import Reactions from '@/components/blog/Reactions';
import ViewCounter from '@/components/blog/ViewCounter';
import Comments from '@/components/ui/Comments';
import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import ScrollTopAndComment from '@/components/ui/ScrollTopAndComment';
import SectionContainer from '@/components/ui/SectionContainer';

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function EssayLayout(props: LayoutProps) {
  const { content, next, prev, children } = props;
  const { date, slug, title, summary, readingTime, type } = content;
  const defaultAuthor = allAuthors.find((author) => author.slug === 'default');

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article className="pb-16">
        <header className="border-b border-gray-200 pt-8 pb-6 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/blog/essay" className="transition-colors hover:text-primary-500">
              ← 返回随笔流
            </Link>
            {siteMetadata.comments && (
              <Link href="#comment" className="transition-colors hover:text-primary-500">
                跳到评论区
              </Link>
            )}
          </div>
        </header>

        <main className="pt-8">
          <div className="flex items-start gap-4">
            <div className="pt-1">
              {defaultAuthor?.avatar ? (
                <Image
                  src={defaultAuthor.avatar}
                  alt={defaultAuthor.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full bg-gray-100 dark:bg-gray-900"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                  卷
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{defaultAuthor?.name || siteMetadata.author}</span>
                <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(date, siteMetadata.locale)}
                </time>
                <span className="text-sm text-gray-400 dark:text-gray-500">·</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{Math.max(1, Math.ceil(readingTime.minutes))} 分钟阅读</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">·</span>
                <ViewCounter className="text-sm text-gray-500 dark:text-gray-400" slug={slug} type={type.toLowerCase() as StatsType} />
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-gray-950/70">
                <p className="text-xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{title}</p>
                {summary && <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{summary}</p>}
                <div className="prose prose-gray mt-4 max-w-none dark:prose-invert lg:prose-lg">{children}</div>
              </div>

              <div className="space-y-4 rounded-2xl border border-gray-200 px-5 py-4 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">这条记录可以直接评论，也可以留一个反应。</p>
                <Reactions className="flex-wrap" type={type.toLowerCase() as StatsType} slug={slug} />
              </div>
            </div>
          </div>
        </main>

        <footer className="pt-12">
          {siteMetadata.comments && (
            <div className="pt-6 text-gray-700 dark:text-gray-300" id="comment">
              <Comments />
            </div>
          )}

          {(next || prev) && (
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-500 dark:text-gray-400">
              {next && (
                <Link href={`/${next.path}`} className="transition-colors hover:text-primary-500">
                  更新一点的上一条
                </Link>
              )}
              {prev && (
                <Link href={`/${prev.path}`} className="transition-colors hover:text-primary-500">
                  更早一点的下一条
                </Link>
              )}
            </div>
          )}
        </footer>
      </article>
    </SectionContainer>
  );
}
