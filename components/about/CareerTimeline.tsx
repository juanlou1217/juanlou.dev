import TimelineItem from './TimelineItem';

export const EXPERIENCES = [
  {
    org: 'JobRight',
    url: 'https://jobright.ai',
    logo: '/static/images/experiences/jobright.svg',
    start: '2026年3月',
    end: '2026年9月',
    title: '前端开发实习生',
    icon: 'man-technologist',
    event: 'career-jobright',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            <strong>硅谷 AI 求职平台</strong>，服务北美市场，为求职者提供智能化的职位匹配和简历优化服务。
          </li>
          <li>
            参与浏览器插件开发，使用 <strong>React、TypeScript</strong>{' '}
            实现跨站点表单自动填充，帮助用户更高效地完成职位申请。
          </li>
          <li>
            参与官网多个业务模块的开发与维护，覆盖职位推荐、用户引导和产品落地页等场景，并参与{' '}
            <strong>Orion AI 智能助手</strong>的重构与持续迭代。
          </li>
        </ul>
      );
    },
  },
  {
    org: '中国科学院软件研究所 · 旋武社区',
    url: 'https://xuanwu.openatom.cn/',
    logo: '/static/images/experiences/xuanwu.png',
    start: '2025年9月',
    end: '2026年3月',
    title: '前端开发实习生',
    icon: 'man-technologist',
    event: 'career-xuanwu',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            参与 <strong>Mega 代码托管平台</strong>客户端开发，基于 <strong>Rust + Next.js</strong>{' '}
            构建的现代化代码托管解决方案。
          </li>
          <li>
            负责 <strong>Moon 项目</strong>日常开发，使用 <strong>React、TypeScript、Next.js</strong>{' '}
            实现代码审查、分支管理等核心功能。
          </li>
          <li>参与旋武开源社区网站维护，进行项目优化和技术迁移。</li>
        </ul>
      );
    },
  },
];

const CareerTimeline = () => (
  <ul className="m-0 list-none p-0">
    {EXPERIENCES.map((experience, idx) => (
      <li key={experience.url} className="m-0 p-0">
        <TimelineItem exp={experience} last={idx === EXPERIENCES.length - 1} />
      </li>
    ))}
  </ul>
);

export default CareerTimeline;
