# Next.js 16 博客 SEO 官方研究笔记

## 研究口径

- 研究日期：2026-08-01
- 适用范围：本仓库的 Next.js 16 App Router 个人博客
- 来源范围：仅采用 Google Search Central / Search Console、Chrome / web.dev、Next.js 与 Schema.org 的一手官方资料
- 标记说明：
  - **[规则]**：搜索引擎或协议明确要求、限制或定义
  - **[建议]**：官方推荐做法
  - **[仓库判断]**：结合本仓库现状形成的实施建议，不是 Google 的直接承诺
  - **[推断]**：基于官方原则作出的合理判断，需要上线数据验证

> 重要边界：满足技术要求不保证页面一定被抓取、索引或展示；通过结构化数据校验只代表具备相应展示资格，不保证富结果或排名提升。[Google Search Essentials](https://developers.google.com/search/docs/essentials) · [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## 结论与实施优先级

### P0：先解决可抓取、可索引与 URL 信号一致性

1. 保证正式页面对 Googlebot 可访问、返回 HTTP `200`，并含有可索引内容；草稿、404、重定向和内部结果页不要进入 sitemap。**[规则]** [Google 技术要求](https://developers.google.com/search/docs/essentials/technical)
2. 每个正式页面输出绝对、自引用 canonical；站内链接、重定向、canonical 和 sitemap 必须指向同一首选 URL。**[建议]** [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
3. 从已发布 MDX 自动生成 sitemap，并在 robots 中声明 sitemap 地址。**[仓库判断]** [Google sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Next.js sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) · [Next.js robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
4. 验证 Search Console Domain Property，提交 sitemap，用 URL Inspection 核验首页和代表性文章。**[建议]** [Search Console 入门](https://developers.google.com/search/docs/monitor-debug/search-console-start)

### P1：补齐页面语义、品牌与结构化数据

1. 首页、列表、标签、关于页和每篇文章使用唯一且准确的 title、H1、description 与 canonical。**[建议]** [标题链接指南](https://developers.google.com/search/docs/appearance/title-link) · [摘要指南](https://developers.google.com/search/docs/appearance/snippet)
2. 在首页建立 `Juanlou`、`卷娄` 与 `juanlou.top` 的一致品牌关系，并加入首页 `WebSite` JSON-LD。**[仓库判断]** [Google 站点名称指南](https://developers.google.com/search/docs/appearance/site-names)
3. 文章详情输出 `BlogPosting`，列表到文章的真实层级输出 `BreadcrumbList`。**[建议]** [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article) · [Google Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
4. 为每篇文章提供相关、可抓取的正文主图及一致的 Open Graph / Twitter 分享信息。**[建议]** [Google 图片 SEO](https://developers.google.com/search/docs/appearance/google-images) · [Next.js OG/Twitter image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

### P2：通过真实数据持续优化

1. 用真实用户数据监控 LCP、INP、CLS，不以单次 Lighthouse 满分作为目标。**[建议]** [web.dev Web Vitals](https://web.dev/articles/vitals)
2. 每月及每次模板大改后检查 Search Console 的 Page Indexing、Performance、Core Web Vitals、增强功能、手动处置和安全问题。**[建议]** [Search Console 入门](https://developers.google.com/search/docs/monitor-debug/search-console-start)
3. 用 Performance 按查询和页面观察曝光、点击、CTR，再调整标题、摘要、内链和内容，而不是凭关键词密度猜测。**[仓库判断]** [Search Console Performance](https://support.google.com/webmasters/answer/7576553)

## 1. Search Essentials 与内容质量

- Google 的最低索引资格是：Googlebot 未被阻止、页面返回 HTTP `200`、页面含有可索引内容。满足这些条件仍不保证索引。**[规则]** [Google 技术要求](https://developers.google.com/search/docs/essentials/technical)
- 内容应可靠、对人有帮助，并自然使用读者会搜索的词；这些词可以出现在 title、主标题、正文、链接文字和图片 `alt` 中。**[建议]** [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [以人为本的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- 禁止关键词堆砌、隐藏文本、门页、批量低价值内容和操纵排名的链接等做法。**[规则]** [Google 垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies)
- 对个人技术博客，稳定作者身份、原创案例、可验证代码、引用来源、真实发布时间/修改时间和相关文章内链，比机械重复关键词更符合官方原则。**[推断]**

## 2. robots、sitemap 与抓取

### robots.txt

- `robots.txt` 管理的是抓取，不是可靠的去索引机制；被 `Disallow` 的 URL 仍可能只凭外链出现在结果中。需要排除普通公开页面时，应允许抓取并使用 `noindex`；私密内容应使用登录或密码保护。**[规则]** [robots.txt 指南](https://developers.google.com/search/docs/crawling-indexing/robots/intro) · [robots meta 规范](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- 不要屏蔽渲染正文所需的 CSS、JavaScript、字体和正文图片。**[建议]** [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- Next.js 16 可用 `app/robots.ts` 返回 `MetadataRoute.Robots`，并声明绝对 sitemap URL。**[建议/Next.js]** [Next.js robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

### sitemap

- sitemap 只列希望进入搜索结果的 canonical URL；使用完整绝对 URL。**[建议]** [Google sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- `<lastmod>` 只应在正文、结构化数据或链接等发生显著更新时变化，并且必须持续、可验证地准确。Google 忽略 `<priority>` 和 `<changefreq>`。**[规则]** [Google sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- 单个 sitemap 上限为 50,000 URL 或未压缩 50 MB，超过才需要 sitemap index。**[规则]** [Google sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- sitemap 是发现与 canonical 的提示，不保证抓取或索引。**[规则]** [Google sitemap 概览](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- 本仓库应从 `data/blog/*.mdx` / Contentlayer 的已发布文章生成 URL 与真实修改日期，排除草稿、404、重定向、重复 URL、内部搜索结果和被关闭的路由。**[仓库判断]**

## 3. canonical 与 hreflang

- 重定向和 `rel="canonical"` 是强 canonical 信号，sitemap 是弱信号；Google 最终仍会自行选择 canonical。**[规则]** [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- 每个正式 HTML 页面应输出绝对、自引用 canonical；HTTP/HTTPS、www/非 www、旧 slug 和其他重复 URL 应用永久重定向收敛，站内链接始终链接 canonical。**[建议]** [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) · [Google 重定向指南](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- 不要用 robots.txt、URL Removal 或 `noindex` 解决站内重复页 canonical 问题。**[规则]** [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- 只有存在真实语言/地区版本时才使用 `hreflang`；每个版本必须列出自己和全部对应版本，使用完整 URL 并双向返回，canonical 指向同语言版本，可提供 `x-default` 回退。**[规则]** [Google 本地化版本指南](https://developers.google.com/search/docs/specialty/international/localized-versions)
- 本仓库 Harness 明确将 i18n 标为 `DISABLED`，当前不要输出虚假英文 hreflang；等同一内容真正有翻译页后再通过 `alternates.languages` 或 sitemap 实施。**[仓库判断]**
- Next.js 根布局应设置准确的 `metadataBase`，页面通过 `alternates.canonical` 输出 canonical；若未来启用 i18n，再使用 `alternates.languages`。**[建议/Next.js]** [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

## 4. metadata、品牌词 `Juanlou` 与可发现性

### 页面 metadata

- 每页应有描述性、简洁、唯一的 `<title>`；主标题应在视觉和语义上明确，避免关键词堆砌与重复模板词。Google可能根据 H1、页面正文、锚文本、`og:title` 等来源重写结果标题。**[建议]** [Google 标题链接指南](https://developers.google.com/search/docs/appearance/title-link)
- 每页应提供准确、唯一、面向读者的 meta description；Google 可能采用，也可能根据具体查询从正文生成摘要，所以它是展示建议而不是固定文案或排名保证。**[建议]** [Google 摘要指南](https://developers.google.com/search/docs/appearance/snippet)
- 本仓库应继续以 `lib/seo.ts` 为统一入口：根布局设置站点级 metadata，文章页由 MDX `title`、`summary`、`date`、`lastmod`、`images`、作者和 slug 生成页面级 metadata。**[仓库判断]**

### `Juanlou` 是否能被 Google 搜到

- 截至 2026-08-01 的一次公开搜索观察中，没有看到 `juanlou.top` 出现在 `juanlou` 的结果里。**[观察，不是结论]** 单次查询会受地域、语言、数据中心和结果变化影响，不能据此断言网站未被 Google 收录。
- 可靠验证顺序：
  1. 在 Search Console URL Inspection 输入首页完整 URL，查看已索引版本、抓取状态、用户声明 canonical 与 Google 选择 canonical。实时测试“可索引”也不保证已经或一定会被索引。**[规则]** [URL Inspection](https://support.google.com/webmasters/answer/9012289)
  2. 在 Page Indexing 查看首页和文章的索引/排除原因。**[建议]** [Page Indexing report](https://support.google.com/webmasters/answer/7440203)
  3. 在 Performance 的查询维度筛选 `juanlou`、`卷娄`、`juanlou.top`，看 impressions 和 clicks；这是判断 Google 是否已把查询与站点建立联系的直接站点数据。**[建议]** [Performance report](https://support.google.com/webmasters/answer/7576553)
  4. `site:juanlou.top` 或普通公开搜索只能用于快速排查，不能替代 Search Console。**[仓库判断]**
- Google 的站点名称是自动生成的，主要参考首页 `WebSite` 结构化数据，也参考首页的 `og:site_name`、`<title>`、标题与正文；官方要求这些信号保持一致。**[规则]** [Google 站点名称指南](https://developers.google.com/search/docs/appearance/site-names)
- 建议首页自然、可见地表述一次“Juanlou（卷娄）”，并统一站点 Logo 旁文字、首页 title/H1、`og:site_name` 和 `WebSite` JSON-LD；结构化数据可使用 `name` 表示首选名称，`alternateName` 按真实偏好列出 `Juanlou`、`卷娄`、`juanlou.top`。**[仓库判断]** 这能帮助 Google 理解品牌关系，但不保证品牌词排名或展示名称。
- 当前 metadata 与首页正文没有清晰建立英文 `Juanlou` 和中文“卷娄”的关联，这可能削弱品牌实体的一致性，但不能单独解释未出现的原因。**[仓库观察 + 推断]**

## 5. `BlogPosting` 与 `BreadcrumbList`

### BlogPosting

- Google 的 Article 功能支持 `Article`、`NewsArticle` 和 `BlogPosting`；个人博客最匹配 `BlogPosting`。截至研究日期，Article 没有必填属性，但应提供所有真实适用的推荐属性。**[规则]** [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article) · [Schema.org BlogPosting](https://schema.org/BlogPosting)
- 每篇文章建议输出 JSON-LD：
  - `@context`、`@type: "BlogPosting"`
  - `headline`
  - 可抓取、代表文章的 `image`
  - 带时区的 `datePublished` 和真实 `dateModified`
  - `author` 的 `@type`、`name`、稳定 `url`
  - 与 canonical 一致的 `mainEntityOfPage` / URL
  - 真实适用时再补充 `publisher`、`description`、`keywords` 或 `articleSection`

  **[建议]** [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article) · [Schema.org BlogPosting](https://schema.org/BlogPosting)

- JSON-LD 必须描述用户可见的真实内容；作者、时间、图片和标题应与页面显示一致。**[规则]** [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### BreadcrumbList

- 面包屑应表达用户理解的典型层级，不必机械复制 URL 结构。**[建议]** [Google Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- `BreadcrumbList` 要具备 Google 面包屑增强展示资格，应有至少两个 `ListItem`，并提供连续的 `position`、`name` 和适用的 `item` URL。**[规则]** [Google Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) · [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- 可按内容类型形成 `首页 > 博客 > 分类 > 文章` 或 `首页 > 博客 > 文章`；可见面包屑与 JSON-LD 使用相同层级。**[仓库判断]**
- 使用 Rich Results Test 校验，部署后通过 URL Inspection 查看 Google 获得的 HTML 与结构化数据。**[建议]** [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

> **资格边界：** 合法 JSON-LD 让页面具备相关富结果资格，并帮助搜索引擎理解页面；Google 明确不保证富结果一定展示，也没有把正确结构化数据定义为排名保证。**[规则]** [结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## 6. 图片与社交元数据

- 正文图片使用标准 `<img>` 或 `next/image`；Google能从 `src` 发现图片，但不会把 CSS 背景图当作正文图片索引。提供准确 `alt`、描述性文件名、相关邻近文字和可抓取 URL。**[规则/建议]** [Google 图片 SEO](https://developers.google.com/search/docs/appearance/google-images)
- Article 图片应与文章相关而不是通用 Logo。Google建议提供多张高分辨率图片，至少 50K 像素，并覆盖 16:9、4:3、1:1，以适配不同展示面。**[建议]** [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- 文章 JSON-LD `image`、Open Graph `og:image` 和页面主图应指向一致的代表性内容；这些信息可影响 Google 的候选预览图选择，但最终由 Google 自动决定。**[建议 + 边界]** [Google 图片 SEO](https://developers.google.com/search/docs/appearance/google-images)
- Next.js 16 可使用路由级 `opengraph-image` / `twitter-image` 静态文件或动态生成图片，并提供对应 alt。它们主要改善社交网络与消息应用的分享卡片，不能宣称为直接排名信号。**[建议/Next.js]** [Next.js OG/Twitter image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- `next/image` 应提供 `width`/`height` 或 `fill`，响应式图片提供准确 `sizes`；这有助于避免布局偏移和下载过大的图片。**[建议/Next.js]** [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)

## 7. Core Web Vitals

- “良好”阈值按移动端和桌面端分别评估第 75 百分位：LCP ≤ 2.5 秒、INP ≤ 200 毫秒、CLS ≤ 0.1。**[规则口径]** [web.dev Web Vitals](https://web.dev/articles/vitals)
- Core Web Vitals 被 Google 排名系统使用，但好分数不保证高排名；内容相关性仍然优先，不应只为 SEO 追求工具满分。**[规则边界]** [Google Page Experience](https://developers.google.com/search/docs/appearance/page-experience)
- 优先用 CrUX、PageSpeed Insights 和 Search Console 的现场数据判断；Lighthouse 适合实验室诊断，不能替代真实用户数据。**[建议]** [web.dev Web Vitals](https://web.dev/articles/vitals) · [CWV 工具工作流](https://web.dev/articles/vitals-tools)
- 对真实 LCP 主图，可根据 Next.js 16 文档选择 `fetchPriority="high"`、`loading="eager"` 或谨慎使用 `preload`；不要让多张图片争抢高优先级，其余图片保持懒加载。Next.js 16 已弃用图片 `priority` 属性，改用更明确的加载策略。**[建议/Next.js]** [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- 博客常见改善点是：让首屏主图尽早可发现；为图片、Giscus 和嵌入内容预留尺寸；减少客户端 JavaScript 与第三方脚本；拆分长任务；避免字体加载造成布局偏移。**[推断]** 应先用真实数据确认瓶颈再实施。

## 8. Search Console 上线闭环

1. 验证 Domain Property，提交 `/sitemap.xml` 并查看解析错误和读取时间。**[建议]** [Search Console 入门](https://developers.google.com/search/docs/monitor-debug/search-console-start) · [Sitemaps report](https://support.google.com/webmasters/answer/7451001)
2. 发布或修改模板后，抽检首页、博客列表、标签页和文章页；在 URL Inspection 中核对 HTTP 状态、robots、渲染资源、结构化数据、用户声明 canonical 和 Google 选择 canonical。**[建议]** [URL Inspection](https://support.google.com/webmasters/answer/9012289)
3. 在 Page Indexing 重点处理误 `noindex`、robots 阻挡、软 404、重定向、重复页和 canonical 不一致；“未索引”并不总是错误，应结合 URL 价值判断。**[建议]** [Page Indexing report](https://support.google.com/webmasters/answer/7440203)
4. 在 Performance 按查询与页面看 clicks、impressions、CTR，尤其跟踪 `juanlou`、`卷娄`、核心技术主题和高曝光低点击页面。**[建议]** [Performance report](https://support.google.com/webmasters/answer/7576553)
5. 结构化数据模板发布后查看相关增强报告；每月检查 CWV、索引、安全问题和手动处置。请求重新抓取只用于少量重要新页面或显著更新页面，处理可能需要数天到数周。**[建议]** [请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## 验收清单

- [ ] `/robots.txt` 可访问，允许抓取公开页面并声明绝对 sitemap URL
- [ ] `/sitemap.xml` 只含 `200`、可索引、已发布的 canonical URL
- [ ] sitemap `lastmod` 与真实显著更新时间一致，不依赖 `priority` / `changefreq`
- [ ] 所有公开页面有唯一 title、description、绝对自引用 canonical
- [ ] 首页统一显示 `Juanlou（卷娄）`，并有合法 `WebSite` `name` / `alternateName` / `url`
- [ ] 文章页有与可见内容一致的 `BlogPosting` JSON-LD
- [ ] 需要的层级页面有与界面一致的 `BreadcrumbList`
- [ ] 文章主图可抓取，有准确 alt、尺寸、响应式 `sizes` 和分享图
- [ ] 移动端/桌面端第 75 百分位目标为 LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1
- [ ] Search Console 已验证、已提交 sitemap，并建立月度监控节奏

## 主要官方来源索引

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google 技术要求](https://developers.google.com/search/docs/essentials/technical)
- [Google sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google robots.txt 指南](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google 本地化版本指南](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Article 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Breadcrumb 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google 结构化数据总则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google 站点名称指南](https://developers.google.com/search/docs/appearance/site-names)
- [Google 图片 SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Google Search Console 入门](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [web.dev Web Vitals](https://web.dev/articles/vitals)
- [Next.js 16 Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js 16 sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js 16 robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js 16 Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Schema.org BlogPosting](https://schema.org/BlogPosting)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
