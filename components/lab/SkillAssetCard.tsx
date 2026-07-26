import clsx from 'clsx';

import Link from '@/components/ui/Link';
import type { SkillAsset } from '@/types/data';

interface SkillAssetCardProps {
  item: SkillAsset;
}

const SkillAssetCard = ({ item }: SkillAssetCardProps) => {
  return (
    <article
      className={clsx(
        'flex w-full flex-col rounded-lg border border-gray-200 bg-white p-6 transition-colors sm:p-7 dark:border-gray-800 dark:bg-gray-900',
        item.featured
          ? 'focus-within:border-sky-300 hover:border-sky-300 hover:shadow-sm hover:shadow-sky-100 dark:focus-within:border-sky-700 dark:hover:border-sky-700 dark:hover:shadow-none'
          : 'focus-within:border-gray-300 hover:border-gray-300 dark:focus-within:border-gray-700 dark:hover:border-gray-700'
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {item.category}
            </span>
            <span
              className={clsx(
                'rounded-md px-2.5 py-1 text-xs font-medium',
                item.featured
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              )}
            >
              {item.badge}
            </span>
          </div>

          <h2 className="mt-4 text-2xl leading-8 font-bold text-gray-900 dark:text-gray-100">
            <Link href={item.href} aria-label={`查看 ${item.title}`}>
              {item.title}
            </Link>
          </h2>
        </div>

        <Link
          href={item.href}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 shrink-0 text-sm leading-6 font-medium"
          aria-label={`查看 ${item.title}`}
        >
          查看 GitHub
        </Link>
      </div>

      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">{item.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default SkillAssetCard;
