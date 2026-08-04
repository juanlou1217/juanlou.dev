import { genPageMetadata } from '@/lib/seo';
import skillsData from '@/data/skillsData';
import SkillAssetCard from '@/components/lab/SkillAssetCard';

export const metadata = genPageMetadata({
  title: '实验室',
  description: '查看 Juanlou（卷娄）整理的轻量 AI Skills 资产与仍在探索的小型实验。',
  path: '/lab',
});

export default function Lab() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          实验室
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">这里会逐步放一些实验性功能和小工具。</p>
      </div>

      <div className="py-8">
        <div className="grid gap-4">
          {skillsData.map((item) => (
            <SkillAssetCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
