import clsx from 'clsx';

import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';

interface ExcalidrawFigureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  sourceHref?: string;
  sourceLabel?: string;
  downloadSource?: boolean;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export default function ExcalidrawFigure({
  src,
  alt,
  width,
  height,
  caption,
  sourceHref,
  sourceLabel = '下载 Excalidraw 源文件',
  downloadSource = true,
  className,
  loading = 'lazy',
}: ExcalidrawFigureProps) {
  const isSvg = src.toLowerCase().endsWith('.svg');

  return (
    <figure
      className={clsx(
        'not-prose my-10 overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-sm dark:border-gray-700 dark:bg-gray-900/80',
        className
      )}
    >
      <div className="bg-linear-to-br from-slate-50 via-white to-sky-50 p-3 sm:p-4 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          unoptimized={isSvg}
          style={{ objectFit: 'contain' }}
          className="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      {(caption || sourceHref) && (
        <figcaption className="flex flex-col gap-3 px-4 pt-3 pb-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between dark:text-gray-300">
          <span>{caption || alt}</span>

          {sourceHref && (
            <Button
              as="a"
              href={sourceHref}
              download={downloadSource ? '' : undefined}
              className="dark:bg-primary-500 inline-flex self-start text-sm"
            >
              {sourceLabel}
            </Button>
          )}
        </figcaption>
      )}
    </figure>
  );
}
