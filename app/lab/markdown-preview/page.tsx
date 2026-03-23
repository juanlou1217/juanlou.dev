import { genPageMetadata } from '@/lib/seo';
import Link from '@/components/ui/Link';

export const metadata = genPageMetadata({
  title: 'Markdown 预览工具',
  description: '实时预览 Markdown 文档，支持语法高亮和自定义主题',
});

export default function MarkdownPreviewLab() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/lab" className="text-primary hover:text-sky-600 dark:hover:text-sky-400" aria-label="返回实验室">
            ← 返回实验室
          </Link>
        </div>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Markdown 预览工具
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Markdown
          </span>
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Tool
          </span>
          <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Editor
          </span>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none py-8">
        <h2>项目概述</h2>
        <p>一个简洁实用的 Markdown 实时预览工具，支持标准 Markdown 语法、代码高亮、数学公式等功能。</p>

        <h2>核心功能</h2>
        <ul>
          <li>
            <strong>实时预览</strong>：边写边看，即时渲染 Markdown 内容
          </li>
          <li>
            <strong>语法高亮</strong>：支持多种编程语言的代码高亮显示
          </li>
          <li>
            <strong>主题切换</strong>：提供明暗两种主题，适应不同使用场景
          </li>
          <li>
            <strong>导出功能</strong>：支持导出为 HTML 或 PDF 格式
          </li>
          <li>
            <strong>本地存储</strong>：自动保存编辑内容，防止数据丢失
          </li>
        </ul>

        <h2>技术栈</h2>
        <ul>
          <li>React 19 - UI 框架</li>
          <li>remark / rehype - Markdown 处理</li>
          <li>Prism.js - 代码语法高亮</li>
          <li>Tailwind CSS - 样式框架</li>
        </ul>

        <h2>支持的 Markdown 语法</h2>

        <h3>基础语法</h3>
        <ul>
          <li>标题（H1-H6）</li>
          <li>粗体、斜体、删除线</li>
          <li>有序列表、无序列表</li>
          <li>链接和图片</li>
          <li>引用块</li>
          <li>代码块和行内代码</li>
        </ul>

        <h3>扩展语法</h3>
        <ul>
          <li>表格</li>
          <li>任务列表</li>
          <li>脚注</li>
          <li>数学公式（KaTeX）</li>
          <li>Emoji 表情</li>
          <li>自定义容器</li>
        </ul>

        <h2>使用场景</h2>
        <ul>
          <li>技术文档编写</li>
          <li>博客文章草稿</li>
          <li>会议记录整理</li>
          <li>学习笔记记录</li>
          <li>README 文件编辑</li>
        </ul>

        <h2>快捷键</h2>
        <table>
          <thead>
            <tr>
              <th>快捷键</th>
              <th>功能</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>Ctrl/Cmd + B</code>
              </td>
              <td>加粗</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl/Cmd + I</code>
              </td>
              <td>斜体</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl/Cmd + K</code>
              </td>
              <td>插入链接</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl/Cmd + S</code>
              </td>
              <td>保存</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl/Cmd + P</code>
              </td>
              <td>预览模式切换</td>
            </tr>
          </tbody>
        </table>

        <h2>未来计划</h2>
        <ul>
          <li>📋 添加协作编辑功能</li>
          <li>📋 支持 Mermaid 图表</li>
          <li>📋 集成 AI 写作助手</li>
          <li>📋 云端同步功能</li>
        </ul>

        <div className="not-prose mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 提示：这个工具目前还在开发中，完整版本即将推出！
          </p>
        </div>

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
