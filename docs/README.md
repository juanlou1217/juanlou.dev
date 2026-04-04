# 文档中心

这里汇总了当前仓库的公开项目文档、维护文档以及适配本项目的 Harness 文档层。

如果你是第一次进入这个仓库，建议按下面顺序阅读：

1. [项目详细介绍](./project/PROJECT_INTRODUCTION.md)
2. [博客项目搭建拆解](./project/BLOG_BUILDING_GUIDE.md)
3. [搭建与启动指南](./project/SETUP_GUIDE.md)
4. [项目结构说明](./project/PROJECT_STRUCTURE_GUIDE.md)
5. [AI 协作规范](./project/AI_COLLABORATION_GUIDE.md)
6. [API 接口文档](../API_DOCUMENTATION.md)
7. [内容维护指南](./guides/CONTENT_UPDATE_GUIDE.md)

## 两个独立文档区

### 公开项目文档区

- [项目详细介绍](./project/PROJECT_INTRODUCTION.md)
  说明这个博客项目是什么、当前能力边界是什么。
- [博客项目搭建拆解](./project/BLOG_BUILDING_GUIDE.md)
  从技术选型、数据流和工程取舍角度拆解这个博客是怎么搭起来的。
- [搭建与启动指南](./project/SETUP_GUIDE.md)
  说明本地开发、构建部署和基础环境配置。
- [项目结构说明](./project/PROJECT_STRUCTURE_GUIDE.md)
  说明当前仓库结构、核心目录和主数据流。
- [AI 协作规范](./project/AI_COLLABORATION_GUIDE.md)
  说明当前仓库对 AI coding agent 的 repo-specific 规则。

### Harness 工作文档区

- [harness/](./harness/README.md)
  面向 AI coding agents 和维护者，记录需求、边界、验证和留痕。

## Harness 文档层

为了让这个博客仓库更适合长期协作和 AI agent 接手开发，文档区新增了五类目录：

- [canonical/](./harness/canonical/README.md)
  记录项目的稳定事实、架构边界和长期有效的信息。
- [specs/](./harness/specs/README.md)
  存放功能需求、缺陷修复需求和执行前的任务定义。
- [contracts/](./harness/contracts/README.md)
  存放接口、数据模型、内容格式和运行约束等契约。
- [verification/](./harness/verification/README.md)
  存放测试清单、构建校验和发布前验证规则。
- [traces/](./harness/traces/README.md)
  存放变更记录、执行痕迹、问题复盘和交付证据。

## 现有文档分区

- [guides/](./guides/)：面向使用和维护的操作指南
- [notes/](./notes/)：实现记录和阶段性开发笔记

## 面向 GitHub 访客的推荐入口

如果这个仓库是用于公开展示，下面几个文件最适合放在 GitHub 上给读者浏览：

- [项目详细介绍](./project/PROJECT_INTRODUCTION.md)
- [博客项目搭建拆解](./project/BLOG_BUILDING_GUIDE.md)
- [搭建与启动指南](./project/SETUP_GUIDE.md)
- [项目结构说明](./project/PROJECT_STRUCTURE_GUIDE.md)
- [AI 协作规范](./project/AI_COLLABORATION_GUIDE.md)
- [API 接口文档](../API_DOCUMENTATION.md)

## 面向维护者和 AI agents 的推荐入口

- [AGENTS.md](../AGENTS.md)
- [Harness 入口](./harness/README.md)
- [Canonical Facts](./harness/canonical/README.md)
- [Specs](./harness/specs/README.md)
- [Verification](./harness/verification/README.md)
