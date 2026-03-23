import { genPageMetadata } from '@/lib/seo';
import Link from '@/components/ui/Link';
import ThreeDCardDemo from '@/components/lab/ThreeDCardDemo';

export const metadata = genPageMetadata({
  title: '3D 卡片交互效果',
  description: '基于鼠标位置的 3D 旋转卡片效果，使用纯 CSS 和 React 实现',
});

export default function ThreeDCardPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/lab" className="text-primary hover:text-sky-600 dark:hover:text-sky-400" aria-label="返回实验室">
            ← 返回实验室
          </Link>
        </div>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          3D 卡片交互效果
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            CSS
          </span>
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            3D
          </span>
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Animation
          </span>
        </div>
      </div>

      <div className="py-8">
        <div className="prose dark:prose-invert max-w-none">
          <h2>项目概述</h2>
          <p>
            这是一个基于鼠标位置的 3D 旋转卡片效果演示。当鼠标在卡片上移动时，卡片会根据鼠标位置进行 3D
            旋转，创造出立体的视觉效果。
          </p>

          <h2>技术实现</h2>
          <ul>
            <li>
              使用 CSS <code>transform</code> 和 <code>perspective</code> 实现 3D 效果
            </li>
            <li>通过 React Hooks 监听鼠标移动事件</li>
            <li>计算鼠标相对位置并转换为旋转角度</li>
            <li>
              使用 <code>transition</code> 实现平滑动画
            </li>
          </ul>

          <h2>交互演示</h2>
          <p className="text-gray-600 dark:text-gray-400">将鼠标移动到下方的卡片上，体验 3D 旋转效果：</p>
        </div>

        <div className="not-prose my-12 flex justify-center">
          <ThreeDCardDemo />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>核心代码</h2>
          <pre>
            <code>{`const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const { width, height, x, y } = ref.current.getBoundingClientRect();
  
  const mouseX = Math.abs(clientX - x);
  const mouseY = Math.abs(clientY - y);
  
  const rotateX = ((mouseY / height) - 0.5) * 30;
  const rotateY = ((mouseX / width) - 0.5) * -30;
  
  setStyle({
    transform: \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`
  });
};`}</code>
          </pre>

          <h2>应用场景</h2>
          <ul>
            <li>产品展示卡片</li>
            <li>个人作品集</li>
            <li>交互式图片画廊</li>
            <li>游戏卡牌效果</li>
          </ul>

          <div className="not-prose mt-8">
            <Link
              href="/lab"
              className="text-primary inline-block rounded-lg bg-gray-100 px-4 py-2 font-medium hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              ← 返回实验室
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
