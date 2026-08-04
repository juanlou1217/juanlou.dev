import type { Blog } from 'contentlayer/generated';

import Link from '@/components/ui/Link';
import { getRelatedBlogs } from '@/lib/content';

interface RelatedPostsProps {
  post: Pick<Blog, 'slug' | 'tags' | 'category'>;
}

export default function RelatedPosts({ post }: RelatedPostsProps) {
  const relatedPosts = getRelatedBlogs(post);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        继续阅读
      </h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {relatedPosts.map((relatedPost) => (
          <li key={relatedPost.slug}>
            <Link
              href={`/${relatedPost.path}`}
              className="block h-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-gray-800 dark:text-gray-200 dark:hover:border-sky-500 dark:hover:text-sky-400"
            >
              {relatedPost.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
