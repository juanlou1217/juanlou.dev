import Link from '@/components/ui/Link';

interface PopularTag {
  slug: string;
  label: string;
  count: number;
}

const PopularTags = ({ tags }: { tags: PopularTag[] }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 py-6 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          热门标签
        </h1>
        <p className="mt-2! text-lg leading-7 text-gray-500 dark:text-gray-400">这里展示当前文章里真实存在的标签。</p>
      </div>

      <div className="grid gap-3 py-6 sm:grid-cols-2 xl:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-sky-500 dark:hover:text-sky-400"
          >
            <span className="font-medium">{tag.label}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{tag.count} 篇</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
