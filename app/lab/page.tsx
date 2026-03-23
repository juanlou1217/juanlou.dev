import { genPageMetadata } from '@/lib/seo';
import labData from '@/data/labData';
import LabCard from '@/components/lab/LabCard';

export const metadata = genPageMetadata({ title: '实验室' });

export default function Lab() {
  const description = '一些有趣的实验性项目、创意 Demo 和技术探索';

  // Combine filter operations (js-combine-iterations)
  const experiments: typeof labData = [];
  const demos: typeof labData = [];
  const tools: typeof labData = [];

  for (const item of labData) {
    if (item.category === 'experiment') {
      experiments.push(item);
    } else if (item.category === 'demo') {
      demos.push(item);
    } else if (item.category === 'tool') {
      tools.push(item);
    }
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            实验室
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        {experiments.length > 0 && (
          <div className="container py-12">
            <h3 className="mb-4 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              技术实验
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">探索新技术、新框架和新想法的实验性项目</p>
            <div className="-m-4 flex flex-wrap">
              {experiments.map((item) => (
                <LabCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        )}

        {demos.length > 0 && (
          <div className="container py-12">
            <h3 className="mb-4 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              创意 Demo
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">一些有趣的交互效果、动画和视觉实验</p>
            <div className="-m-4 flex flex-wrap">
              {demos.map((item) => (
                <LabCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        )}

        {tools.length > 0 && (
          <div className="container py-12">
            <h3 className="mb-4 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              实用工具
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">提升开发效率的小工具和实用脚本</p>
            <div className="-m-4 flex flex-wrap">
              {tools.map((item) => (
                <LabCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        )}

        {labData.length === 0 && (
          <div className="container py-12">
            <div className="text-center">
              <p className="text-xl text-gray-500 dark:text-gray-400">实验室正在筹备中，敬请期待...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
