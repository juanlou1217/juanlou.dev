import type { LabItem } from '@/types/data';

import Zoom from '@/components/ui/Zoom';
import Link from '@/components/ui/Link';
import Image from '@/components/ui/Image';

interface LabCardProps {
  item: LabItem;
}

const statusConfig = {
  completed: {
    label: '已完成',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  'in-progress': {
    label: '进行中',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  planned: {
    label: '计划中',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  },
};

const LabCard = ({ item }: LabCardProps) => {
  const { title, description, imgSrc, url, status, tags } = item;
  const statusInfo = statusConfig[status];

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        } shadow-nextjs dark:shadow-nextjs-dark flex h-full flex-col overflow-hidden rounded-lg border border-transparent transition-all duration-300 hover:scale-[1.02]`}
      >
        <Zoom>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-60"
            width={1088}
            height={612}
          />
        </Zoom>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link href={url} aria-label={`查看 ${title}`}>
                {title}
              </Link>
            </h2>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
          </div>

          <p className="prose mb-4 max-w-none flex-1 text-gray-500 dark:text-gray-400">{description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={url}
            className="text-primary text-base leading-6 font-medium hover:text-sky-600 dark:hover:text-sky-400"
            aria-label={`查看 ${title}`}
          >
            查看详情 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LabCard;
