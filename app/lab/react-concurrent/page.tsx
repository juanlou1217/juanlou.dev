import { genPageMetadata } from '@/lib/seo';
import Link from '@/components/ui/Link';

export const metadata = genPageMetadata({
  title: 'React 19 并发特性实验',
  description: '探索 React 19 的并发渲染、Suspense 和 Transitions 特性',
});

export default function ReactConcurrentLab() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/lab" className="text-primary hover:text-sky-600 dark:hover:text-sky-400" aria-label="返回实验室">
            ← 返回实验室
          </Link>
        </div>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          React 19 并发特性实验
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            React
          </span>
          <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Concurrent
          </span>
          <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Performance
          </span>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none py-8">
        <h2>项目概述</h2>
        <p>这是一个探索 React 19 并发特性的实验性项目。我们将深入研究以下核心概念：</p>

        <ul>
          <li>
            <strong>并发渲染（Concurrent Rendering）</strong>：允许 React 在渲染过程中暂停和恢复，提升用户体验
          </li>
          <li>
            <strong>Suspense</strong>：优雅地处理异步数据加载和代码分割
          </li>
          <li>
            <strong>Transitions</strong>：区分紧急更新和非紧急更新，优化性能
          </li>
          <li>
            <strong>useTransition & useDeferredValue</strong>：新的 Hook 用于优化渲染性能
          </li>
        </ul>

        <h2>技术栈</h2>
        <ul>
          <li>React 19</li>
          <li>Next.js 16</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>

        <h2>实验目标</h2>
        <ol>
          <li>理解并发渲染的工作原理</li>
          <li>对比传统渲染和并发渲染的性能差异</li>
          <li>探索 Suspense 的最佳实践</li>
          <li>构建流畅的用户交互体验</li>
        </ol>

        <h2>当前进度</h2>
        <div className="not-prose">
          <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">进行中</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-blue-200 dark:bg-blue-800">
              <div className="h-2 w-3/5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
            </div>
          </div>
        </div>

        <h3>已完成</h3>
        <ul>
          <li>✅ 基础项目搭建</li>
          <li>✅ Suspense 基础示例</li>
          <li>✅ useTransition 性能对比</li>
        </ul>

        <h3>进行中</h3>
        <ul>
          <li>🚧 复杂场景下的并发渲染测试</li>
          <li>🚧 性能指标收集和分析</li>
        </ul>

        <h3>计划中</h3>
        <ul>
          <li>📋 编写详细的技术文档</li>
          <li>📋 制作交互式演示</li>
        </ul>

        <h2>相关资源</h2>
        <ul>
          <li>
            <Link href="https://react.dev/blog/2024/04/25/react-19">React 19 官方发布说明</Link>
          </li>
          <li>
            <Link href="https://react.dev/reference/react/Suspense">React Suspense 文档</Link>
          </li>
          <li>
            <Link href="https://react.dev/reference/react/useTransition">useTransition Hook 文档</Link>
          </li>
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
  );
}
