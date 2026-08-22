# JobRight 职业经历文案更新

## 背景

关于页当前只描述了 JobRight 的浏览器插件自动填充工作，没有体现官网多个业务模块以及 Orion AI 智能助手的开发经历。

## 当前产品状态

- `/about` 是当前对外开放页面。
- 职业经历由 `components/about/CareerTimeline.tsx` 中的静态数据渲染。
- 本次只调整 JobRight 条目的文字，不改变页面结构或公开能力。

## 目标

- 使用自然、简洁的博客语气介绍 JobRight 经历。
- 按“公司介绍、浏览器插件、官网业务”三条组织内容。
- 简要提及 Orion AI，同时避免把官网工作窄化为单一项目。

## 非目标

- 不把职业经历改写成量化简历。
- 不逐项罗列所有官网项目或技术细节。
- 不修改职位、任职时间、链接、Logo 或时间线样式。

## 范围

最终文案：

1. **硅谷 AI 求职平台**，服务北美市场，为求职者提供智能化的职位匹配和简历优化服务。
2. 参与浏览器插件开发，使用 **React、TypeScript** 实现跨站点表单自动填充，帮助用户更高效地完成职位申请。
3. 参与官网多个业务模块的开发与维护，覆盖职位推荐、用户引导和产品落地页等场景，并参与 **Orion AI 智能助手**的重构与持续迭代。

## 复用检查

- 已定位并复用现有 `CareerTimeline` 与 `TimelineItem` 实现。
- 不新增组件、布局、路由或服务。
- 继续使用现有 `<strong>` 标记突出平台、技术栈和 Orion AI 名称。

## 实现思路

- 仅替换 `CareerTimeline.tsx` 中 JobRight 的 `details` 列表内容。
- 保持现有三条列表的渲染结构以及中英文间距风格。
- 不引入新的依赖或数据结构。

## 数据源与边界

- 文案仍属于关于页的手写静态职业经历数据。
- 不涉及 MDX、Contentlayer、数据库、API、导航、sitemap 或公开路由变化。

## 验收标准

- [ ] JobRight 条目包含确认后的三条文案。
- [ ] Orion AI 被简要提及，但官网职责不只描述 Orion。
- [ ] React、TypeScript 与重点业务名称保持加粗展示。
- [ ] 旋武社区条目及其他页面内容不受影响。

## 相关文档

- Canonical: `docs/harness/canonical/REPO_SPECIFIC_RULES.md`
- Verification: `docs/harness/verification/TASK_START_CHECKLIST.md`
