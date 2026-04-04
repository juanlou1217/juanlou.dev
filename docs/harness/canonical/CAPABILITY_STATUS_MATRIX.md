# 能力状态矩阵

这份文档用于明确当前仓库里各项能力的状态，避免 AI agent 或维护者看到目录、组件、路由存在，就误判为“功能已正式开放”。

## 状态定义

- `OPEN`
  已对外开放，属于当前主线能力。
- `LIMITED`
  仍然存在，但只保留轻量形式或占位形式。
- `DISABLED`
  当前明确不属于对外主线，不应被默认恢复。
- `INTERNAL`
  仅作为内部支撑能力，不直接作为公开产品能力表达。

## 当前能力矩阵

| 能力                  | 状态       | 当前说明                         | 典型入口                                |
| --------------------- | ---------- | -------------------------------- | --------------------------------------- |
| 首页                  | `OPEN`     | 对外主入口                       | `/`                                     |
| 博客列表              | `OPEN`     | 主线内容入口                     | `/blog`                                 |
| 博客分类              | `OPEN`     | 技术 / 生活 / 随笔分类           | `/blog/tech` `/blog/life` `/blog/essay` |
| 博客详情              | `OPEN`     | 内容主页面                       | `/blog/[...slug]`                       |
| 标签页                | `OPEN`     | 标签浏览与聚合                   | `/tags` `/tags/[tag]`                   |
| 关于页                | `OPEN`     | 作者与个人信息展示               | `/about`                                |
| 评论                  | `OPEN`     | 依赖 Giscus 配置                 | 文章页                                  |
| RSS                   | `OPEN`     | 当前推荐订阅方式                 | `/feed.xml`                             |
| 搜索                  | `OPEN`     | 本地搜索索引，依赖构建生成       | 搜索按钮 / `search.json`                |
| 文章统计              | `OPEN`     | 浏览量与互动统计                 | `/api/stats`                            |
| GitHub 仓库信息       | `OPEN`     | 页面展示的仓库动态信息           | `/api/github`                           |
| 实验室入口            | `LIMITED`  | 当前只保留占位页                 | `/lab`                                  |
| 实验室 demo 子页      | `DISABLED` | 不作为当前公开主线继续扩展       | `/lab/*`                                |
| Projects 页           | `DISABLED` | 当前返回 404                     | `/projects`                             |
| 邮件 newsletter       | `DISABLED` | 当前未启用，仅显式返回未启用状态 | `/api/newsletter`                       |
| 国际化                | `DISABLED` | 当前仅保留文档，不进入实现       | 文档层                                  |
| Spotify / now playing | `DISABLED` | 历史能力，当前不恢复             | 无                                      |
| sitemap / robots      | `INTERNAL` | 对搜索引擎和站点发现性提供支撑   | `/sitemap.xml` `/robots.txt`            |
| Contentlayer 构建链路 | `INTERNAL` | 内容解析与索引生成               | 构建过程                                |
| Prisma / PostgreSQL   | `INTERNAL` | 数据存储支撑层                   | 服务层                                  |

## 使用规则

### 1. 新任务开始前

先判断涉及能力属于哪一类：

- `OPEN`：可以直接增强，但仍然要先做复用检查
- `LIMITED`：默认保持轻量形式，除非用户明确要求扩展
- `DISABLED`：默认不能恢复
- `INTERNAL`：可以优化，但不要误包装成新用户功能

### 2. 用户未明确要求时

以下能力默认不得被 AI 自行恢复：

- `projects`
- 复杂 `lab` demos
- 邮件 newsletter
- 国际化
- Spotify / now playing

### 3. 状态变化时

当某项能力从 `LIMITED` 变为 `OPEN`，或从 `DISABLED` 被重新启用时，至少同步更新：

- 本文档
- `REPO_SPECIFIC_RULES.md`
- 对应 `contracts/` 文档
- 必要时更新 `docs/project/` 对外说明
