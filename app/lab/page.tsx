import { genPageMetadata } from '@/lib/seo';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';

export const metadata = genPageMetadata({ title: '实验室' });

export default function Lab() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          实验室
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">这里会逐步放一些实验性功能和小工具。</p>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-gray-300 bg-white/70 px-8 py-16 text-center dark:border-gray-700 dark:bg-gray-900/60">
          <p className="text-sm font-medium tracking-[0.3em] text-gray-500 uppercase dark:text-gray-400">Coming Soon</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">实验室正在整理中</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
            当前先保留一个入口，后续有成熟 demo 或工具时再逐个补上。
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href="/"
              className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 border-transparent text-white! dark:text-white! dark:hover:bg-sky-400"
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
