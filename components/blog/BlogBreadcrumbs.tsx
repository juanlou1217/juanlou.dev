import type { Blog } from 'contentlayer/generated';

import Link from '@/components/ui/Link';
import { getBlogCategoryDetails } from '@/lib/blog-taxonomy';

interface BlogBreadcrumbsProps {
  category?: Blog['category'];
  title: string;
}

export default function BlogBreadcrumbs({ category, title }: BlogBreadcrumbsProps) {
  const categoryDetails = getBlogCategoryDetails(category);

  return (
    <nav aria-label="面包屑" className="mb-5 text-sm text-gray-500 dark:text-gray-400">
      <ol className="flex min-w-0 items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary-500 transition-colors">
            首页
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/blog" className="hover:text-primary-500 transition-colors">
            博客
          </Link>
        </li>
        {categoryDetails.path !== '/blog' && (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryDetails.path} className="hover:text-primary-500 transition-colors">
                {categoryDetails.label}
              </Link>
            </li>
          </>
        )}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="truncate text-gray-700 dark:text-gray-200">
          {title}
        </li>
      </ol>
    </nav>
  );
}
