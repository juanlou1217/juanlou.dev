# AI 协作规范

这份文档用于说明：如果把这个仓库交给 AI coding agent，它需要遵守哪些当前有效的 repo-specific 规则。

这是项目文档区里的摘要版说明。更完整的工作规则请看：

- [Harness 入口](../harness/README.md)
- [Repo-Specific 协作规则](../harness/canonical/REPO_SPECIFIC_RULES.md)
- [组件清单与职责](../harness/canonical/COMPONENT_INVENTORY.md)

## 1. 当前最重要的原则

### 先理解当前产品面

AI 不应看到目录存在，就默认功能处于开放状态。

当前主线是：

- 博客内容
- 分类与标签
- 关于页
- RSS
- 实验室占位页

当前默认不要擅自恢复：

- `/projects`
- 邮件 newsletter
- 国际化
- 复杂实验室 demo

### 先复用，再新增

这是这个仓库里最重要的工程规则之一。

AI 在新增页面元素、交互或逻辑前，应先查：

- 是否已有现成组件
- 是否已有现成 layout
- 是否已有现成 route / service / util

尤其是：

- 按钮优先复用 `components/ui/Button.tsx`
- 链接优先复用 `components/ui/Link.tsx`
- 图片优先复用 `components/ui/Image.tsx`
- 博客列表优先复用 `layouts/ListLayout.tsx`

### 优先使用真实内容数据

如果能力和博客内容相关，数据源优先级应是：

1. `data/blog/*.mdx`
2. Contentlayer 生成内容
3. 构建期生成文件
4. 最后才是手写静态数组

因此：

- 热门标签不应手写一个独立数组
- RSS 不应手写内容
- 分类文章列表不应靠前端假数据拼装

## 2. AI 开工前最低动作

开始较大改动前，至少应完成：

1. 确认该能力当前是否属于开放状态
2. 搜索 `components/ui/`、`components/homepage/`、`components/blog/`、`layouts/`、`lib/`、`app/`
3. 说明这次要复用哪些现有实现
4. 说明这次明确不做什么

## 3. 为什么要这样约束

这个仓库以前已经出现过一些典型问题：

- 不同页面各写一套“返回首页”按钮
- 明明已有分页模式，又在分类页单独造逻辑
- 首页标签使用手写数组，和真实文章内容脱节
- 关闭能力还在文案或入口上表现得像已经上线

这些问题对人类开发者来说只是“小重复”，对 AI 来说会很快放大成维护成本。

## 4. 当前推荐阅读顺序

如果 AI 要接手这个仓库，建议按这个顺序读：

1. [AGENTS.md](../../AGENTS.md)
2. [Harness 入口](../harness/README.md)
3. [Repo-Specific 协作规则](../harness/canonical/REPO_SPECIFIC_RULES.md)
4. [组件清单与职责](../harness/canonical/COMPONENT_INVENTORY.md)
5. [复用与结构契约](../harness/contracts/REUSE_AND_STRUCTURE_CONTRACTS.md)
6. [任务开始检查清单](../harness/verification/TASK_START_CHECKLIST.md)
