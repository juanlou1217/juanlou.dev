import type { LabItem } from '@/types/data';

const labData: LabItem[] = [
  {
    category: 'experiment',
    title: 'React 19 并发特性实验',
    description: '探索 React 19 的并发渲染、Suspense 和 Transitions 特性',
    imgSrc: 'https://placehold.co/1088x612/4F46E5/FFFFFF/png?text=React+19+Concurrent',
    url: '/lab/react-concurrent',
    status: 'in-progress',
    tags: ['React', 'Concurrent', 'Performance'],
  },
  {
    category: 'demo',
    title: '3D 卡片交互效果',
    description: '基于鼠标位置的 3D 旋转卡片效果，使用纯 CSS 和 React 实现',
    imgSrc: 'https://placehold.co/1088x612/EC4899/FFFFFF/png?text=3D+Card+Demo',
    url: '/lab/3d-card-demo',
    status: 'completed',
    tags: ['CSS', '3D', 'Animation'],
  },
  {
    category: 'tool',
    title: 'Markdown 预览工具',
    description: '实时预览 Markdown 文档，支持语法高亮和自定义主题',
    imgSrc: 'https://placehold.co/1088x612/10B981/FFFFFF/png?text=Markdown+Preview',
    url: '/lab/markdown-preview',
    status: 'completed',
    tags: ['Markdown', 'Tool', 'Editor'],
  },
  // 在这里添加更多实验室项目
  // {
  //   category: 'experiment', // 'experiment' | 'demo' | 'tool'
  //   title: '项目名称',
  //   description: '项目描述',
  //   imgSrc: '/static/images/lab/your-project.png',
  //   url: '/lab/your-project',
  //   status: 'in-progress', // 'completed' | 'in-progress' | 'planned'
  //   tags: ['标签1', '标签2'],
  // },
];

export default labData;
