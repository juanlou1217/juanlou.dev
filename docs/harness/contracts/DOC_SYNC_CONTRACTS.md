# 文档同步契约

这份契约描述：当代码发生某类变化时，哪些 harness 文档必须同步更新。

目标是避免出现：

- 代码已经变了，canonical 事实没变
- 产品状态变了，公开项目文档还停留在旧描述
- 关闭能力被恢复了，但 harness 仍写着禁用

## 1. 功能开放状态变化

如果某个能力从以下状态发生变化：

- `DISABLED` -> `LIMITED`
- `LIMITED` -> `OPEN`
- `OPEN` -> `LIMITED`
- `OPEN` / `LIMITED` -> `DISABLED`

必须同步更新：

- `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md`
- `docs/harness/canonical/REPO_SPECIFIC_RULES.md`

如果该变化对外可见，还应同步更新：

- `docs/project/PROJECT_INTRODUCTION.md`
- `docs/project/PROJECT_STRUCTURE_GUIDE.md`
- `docs/README.md`

## 2. 复用规则变化

如果新增了新的推荐复用组件、统一入口或 layout 约束，必须同步更新：

- `docs/harness/contracts/REUSE_AND_STRUCTURE_CONTRACTS.md`
- `docs/harness/canonical/COMPONENT_INVENTORY.md`

## 3. 数据来源变化

如果某块能力的数据来源发生变化，例如：

- 从手写数组改为真实内容数据
- 从静态文件改为构建产物
- 从 API 拉取改为本地计算

必须同步更新：

- 对应 contract 文档
- 相关 spec 文档

如该变化会影响外部读者理解，还应同步更新：

- `docs/project/PROJECT_STRUCTURE_GUIDE.md`

## 4. 路由公开性变化

如果新增、关闭或重定向了公开路由，必须同步更新：

- `docs/harness/contracts/REUSE_AND_STRUCTURE_CONTRACTS.md`
- `docs/harness/canonical/CAPABILITY_STATUS_MATRIX.md`
- 必要时更新 `app/sitemap.ts`

如果路由面向外部读者，还应同步更新：

- `docs/project/PROJECT_INTRODUCTION.md`
- `docs/project/PROJECT_STRUCTURE_GUIDE.md`

## 5. 验证方式变化

如果验证路径、构建方式、发布前检查项发生明显变化，必须同步更新：

- `docs/harness/verification/RELEASE_CHECKLIST.md`
- 必要时更新 `docs/harness/verification/TASK_START_CHECKLIST.md`

## 6. 任务实施后最低留痕

以下情况建议至少新增一个 trace：

- 大范围重构
- 功能状态切换
- 关闭或恢复某项对外能力
- 修复过一次明显的 repo-specific 偏差

推荐位置：

- `docs/harness/traces/`
