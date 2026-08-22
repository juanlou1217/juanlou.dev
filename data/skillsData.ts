import type { SkillAsset } from '@/types/data';

const skillsData: SkillAsset[] = [
  {
    slug: 'crafting-resumes',
    title: 'Crafting Resumes',
    description:
      '把求职里最难讲清楚的部分，整理成一套可以反复打磨的表达系统：读懂 JD 真正在筛什么，找出简历里最有分量的经历，再把项目改写成有场景、有动作、有结果、有取舍的故事。它不替人编造经历，而是帮真实能力找到更有说服力的说法，让简历、内推沟通和面试追问能接成一条线。',
    href: 'https://github.com/juanlou1217/crafting-resumes',
    category: '求职材料 Skill',
    badge: '重点展示',
    featured: true,
    tags: ['求职', '简历', 'Career'],
  },
  {
    slug: 'sketchlings',
    title: 'Sketchlings',
    description:
      '一个运行在浏览器里的手绘角色生成器。输入一个名字，它会通过稳定种子生成一只专属小怪物，同一个名字始终对应同一个角色。角色由 Canvas 2D 实时绘制，再用 Three.js 组织眨眼、呼吸、视线跟随和表演动作，整个过程不依赖后端或运行时 AI。',
    href: 'https://github.com/juanlou1217/sketchlings',
    category: '创意编程实验',
    badge: '持续迭代',
    tags: ['React 19', 'TypeScript', 'Three.js', 'Canvas 2D'],
  },
];

export default skillsData;
