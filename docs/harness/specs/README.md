# Specs

这里存放功能需求、缺陷修复需求和计划执行前的任务定义。

## 适用场景

- 准备增加新功能
- 准备修复一个明确问题
- 准备做较大范围的重构
- 希望让协作者或 AI agent 基于统一输入开始工作

## 建议的文件命名

- `FEATURE_<NAME>.md`
- `BUG_<NAME>.md`
- `REFACTOR_<NAME>.md`

## 推荐流程

1. 先阅读 [任务开始检查清单](../verification/TASK_START_CHECKLIST.md)
2. 在这里创建需求文档
3. 明确目标、范围、验收标准、非目标和复用检查
4. 如有边界变化，同步更新 `contracts/`
5. 实施完成后在 `verification/` 和 `traces/` 留下验证与记录

## 模板

可直接基于 [TEMPLATE.md](./TEMPLATE.md) 新建文档。

## 辅助说明

在写 spec 之前，建议先看：

- [任务类型与文档要求](./WORK_ITEM_TYPE_GUIDE.md)
