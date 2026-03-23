# 实验室页面

实验室是一个展示实验性项目、创意 Demo 和实用工具的地方。

## 页面结构

```
app/lab/
├── page.tsx                    # 实验室主页
├── react-concurrent/           # React 19 并发特性实验
│   └── page.tsx
├── 3d-card-demo/              # 3D 卡片交互效果
│   └── page.tsx
├── markdown-preview/          # Markdown 预览工具
│   └── page.tsx
└── README.md                  # 本文件
```

## 组件

- `components/lab/LabCard.tsx` - 实验室项目卡片组件
- `components/lab/ThreeDCardDemo.tsx` - 3D 卡片演示组件

## 数据配置

实验室项目数据在 `data/labData.ts` 中配置：

```typescript
{
  category: 'experiment' | 'demo' | 'tool',  // 项目类别
  title: string,                              // 项目标题
  description: string,                        // 项目描述
  imgSrc: string,                            // 封面图片
  url: string,                               // 项目链接
  status: 'completed' | 'in-progress' | 'planned',  // 项目状态
  tags: string[],                            // 标签
}
```

## 添加新项目

1. 在 `data/labData.ts` 中添加项目数据
2. 在 `app/lab/` 下创建项目页面目录
3. 添加项目封面图片到 `public/static/images/lab/`

## 项目分类

- **技术实验（experiment）**：探索新技术、新框架和新想法的实验性项目
- **创意 Demo（demo）**：有趣的交互效果、动画和视觉实验
- **实用工具（tool）**：提升开发效率的小工具和实用脚本

## 项目状态

- **已完成（completed）**：项目已完成，可以正常使用
- **进行中（in-progress）**：项目正在开发中
- **计划中（planned）**：项目还在计划阶段
