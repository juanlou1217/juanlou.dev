import type { Project } from '@/types/data';

const projectsData: Project[] = [
  {
    type: 'self',
    title: '个人博客网站',
    description: '一个记录技术学习和生活思考的地方',
    imgSrc: '/static/images/projects/karhdo-blog.png',
    repo: 'juanlou1217/juanlou.dev',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'Prisma', 'PostgreSQL'],
  },
  // 在这里添加你自己的项目
  // {
  //   type: 'self',
  //   title: '项目名称',
  //   description: '项目描述',
  //   imgSrc: '/static/images/projects/your-project.png',
  //   repo: 'juanlou1217/your-repo',
  //   builtWith: ['技术栈1', '技术栈2'],
  // },
];

export default projectsData;
