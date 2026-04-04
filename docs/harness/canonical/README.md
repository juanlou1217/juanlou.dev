# Canonical Facts

这里是当前仓库的 AI / 维护协作事实层，保存不应该分散在聊天记录里的稳定信息。

## 这个目录放什么

- 项目定位和产品边界
- 技术栈和架构约束
- 内容模型和运行时关键假设
- 对外公开时最值得阅读的项目说明

## 推荐先读

1. [Harness 入口](../README.md)
2. [Repo-Specific 协作规则](./REPO_SPECIFIC_RULES.md)
3. [组件清单与职责](./COMPONENT_INVENTORY.md)
4. [能力状态矩阵](./CAPABILITY_STATUS_MATRIX.md)
5. [项目详细介绍](../../project/PROJECT_INTRODUCTION.md)
6. [项目结构说明](../../../PROJECT_STRUCTURE.md)
7. [API 接口文档](../../../API_DOCUMENTATION.md)

## 与其他目录的分工

- `canonical/` 负责“项目是什么”
- `specs/` 负责“这次要做什么”
- `contracts/` 负责“什么算符合边界”
- `verification/` 负责“怎么证明它可用”
- `traces/` 负责“这次改动留下什么证据”

## 维护规则

- 这里优先记录长期有效的信息，不记录一次性的实现过程
- 内容要可被 GitHub 访客直接阅读，不依赖私有上下文
- 关键事实变更后，应同步更新相关的 spec、contract 或 verification 文档
