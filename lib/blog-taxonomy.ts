export const BLOG_CATEGORY_DETAILS = {
  tech: {
    label: '技术分享',
    path: '/blog/tech',
    description: '关于 AI Agent、前端工程、Next.js、工程实践与技术思考的原创文章。',
  },
  life: {
    label: '生活感悟',
    path: '/blog/life',
    description: '记录实习、工作、选择与成长中的真实经历和长期思考。',
  },
  essay: {
    label: '随笔',
    path: '/blog/essay',
    description: '关于杭州、日常、情绪与生活片段的短篇记录。',
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORY_DETAILS;

export function getBlogCategoryDetails(category?: string) {
  if (category && category in BLOG_CATEGORY_DETAILS) {
    return BLOG_CATEGORY_DETAILS[category as BlogCategory];
  }

  return {
    label: '博客',
    path: '/blog',
    description: 'Juanlou（卷娄）的技术、生活与成长文章。',
  };
}
