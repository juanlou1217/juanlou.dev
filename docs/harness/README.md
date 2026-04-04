# Harness 文档区

这里是面向 AI coding agents 和维护者的工作文档区，不承担对外项目介绍职责。

## 作用

这个区域用于支撑需求澄清、边界约束、验证和交付留痕，帮助协作者或 AI agent 在较少口头沟通的情况下持续推进项目。

## 目录说明

- [canonical/](./canonical/README.md)
  维护协作事实层和长期稳定约束。
- [specs/](./specs/README.md)
  功能需求、缺陷修复需求和任务入口。
- [contracts/](./contracts/README.md)
  内容、数据、接口和运行边界契约。
- [verification/](./verification/README.md)
  测试、构建、发布前检查和验证标准。
- [traces/](./traces/README.md)
  实施记录、交付证据和问题复盘。

## 使用建议

1. 先读 [AGENTS.md](../../AGENTS.md)
2. 再读 [canonical/README.md](./canonical/README.md)
3. 再读 [Repo-Specific 协作规则](./canonical/REPO_SPECIFIC_RULES.md)
4. 再读 [组件清单与职责](./canonical/COMPONENT_INVENTORY.md)
5. 再读 [能力状态矩阵](./canonical/CAPABILITY_STATUS_MATRIX.md)
6. 开始新任务前先过 [任务开始检查清单](./verification/TASK_START_CHECKLIST.md)
7. 再根据 [任务类型与文档要求](./specs/WORK_ITEM_TYPE_GUIDE.md) 判断是否补 `specs/`
8. 改动边界时同步更新 `contracts/`
9. 完成后把验证和过程留在 `verification/` 或 `traces/`
