const siteMetadata = {
  title: '卷娄的小屋',
  author: '卷娄',
  fullName: '赵康',
  headerTitle: '卷娄的折腾日记',
  description: '一位迷茫的折腾日记，分享代码，也写生活。知其卷娄之患，故守其不卷不娄之身。',
  language: 'zh-CN',
  theme: 'system',
  siteUrl: 'https://juanlou.top',
  analyticsURL: '',
  siteRepo: 'https://github.com/juanlou1217/juanlou.dev',
  siteLogo: '/static/images/avatar_backup.jpg',
  image: '/static/images/avatar_backup.jpg',
  socialBanner: '/static/images/avatar_backup.jpg',
  email: '3106444523@qq.com',
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
  comments: {
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
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};

module.exports = siteMetadata;
