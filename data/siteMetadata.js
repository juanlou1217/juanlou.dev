const hasGiscusConfig = Boolean(
  process.env.NEXT_PUBLIC_GISCUS_REPO &&
  process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID &&
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY &&
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
);

const siteMetadata = {
  title: '卷娄的小屋',
  brandName: 'Juanlou（卷娄）',
  alternateNames: ['Juanlou', '卷娄', 'juanlou.top'],
  author: '卷娄',
  fullName: '赵康',
  headerTitle: 'Juanlou（卷娄）',
  description: 'Juanlou（卷娄）是赵康的个人博客，记录 AI Agent、前端工程、技术实践，以及一个年轻工程师的生活与成长。',
  language: 'zh-CN',
  theme: 'system',
  siteUrl: 'https://juanlou.top',
  analyticsURL: '',
  siteRepo: 'https://github.com/juanlou1217/juanlou.dev',
  siteLogo: '/static/images/logo-juanlou.svg',
  image: '/static/images/avatar_backup.jpg',
  socialBanner: '/static/images/avatar_backup.jpg',
  email: 'juanlou.zhao@gmail.com',
  github: 'https://github.com/juanlou1217',
  locale: 'zh-CN',
  stickyNav: false,
  socialAccounts: {
    github: 'juanlou1217',
    linkedin: '',
    facebook: '',
  },
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.UMAMI_WEBSITE_ID,
      shareUrl: process.env.UMAMI_SHARE_URL,
    },
  },
  comments: hasGiscusConfig
    ? {
        provider: 'giscus',
        giscusConfig: {
          repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
          category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
          mapping: 'pathname',
          reactions: '1',
          metadata: '0',
          theme: 'light_protanopia',
          darkTheme: 'transparent_dark',
          themeURL: '',
          lang: 'zh-CN',
          inputPosition: 'bottom',
        },
      }
    : null,
  search: {
    provider: 'kbar',
    kbarConfig: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};

module.exports = siteMetadata;
