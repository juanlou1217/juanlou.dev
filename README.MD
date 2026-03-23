<h1 align="center">卷娄的折腾日记</h1>
<p align="center"><i>知其卷娄之患，故守其不卷不娄之身</i></p>

<div align="center">
    <a href="https://github.com/juanlou1217/juanlou.dev/stargazers"><img src="https://img.shields.io/github/stars/juanlou1217/juanlou.dev" alt="Stars Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/network/members"><img src="https://img.shields.io/github/forks/juanlou1217/juanlou.dev" alt="Forks Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/pulls"><img src="https://img.shields.io/github/issues-pr/juanlou1217/juanlou.dev" alt="Pull Requests Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/issues"><img src="https://img.shields.io/github/issues/juanlou1217/juanlou.dev" alt="Issues Badge"/></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/juanlou1217/juanlou.dev?color=2b9348"></a>
    <a href="https://github.com/juanlou1217/juanlou.dev/blob/master/LICENSE"><img src="https://img.shields.io/github/license/juanlou1217/juanlou.dev?color=2b9348" alt="License Badge"/></a>
</div>
<br>
<p align="center"><i>一位迷茫的折腾日记，分享代码，也写生活</i></p>
<br>

## 网站

访问 [juanlou.top](https://juanlou.top) 查看博客

## 技术栈

本博客托管在 [Vercel](https://vercel.com/)，使用 [Next.js](https://nextjs.org/) 和 [Tailwind CSS](https://tailwindcss.com/) 构建，基于 **Tailwind Nextjs Starter Blog** 模板。

[![Next][Next.js]][Next-url] [![MDX][MDX]][MDX-url] [![Vercel][Vercel]][Vercel-url] [![React][React]][React-url] [![Typescript][Typescript]][Typescript-url] [![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url] 

本博客网站的灵感来自 [lehuynh.dev](https://leohuynh.dev/)。感谢 [Leo Huynh](https://twitter.com/hta218_) 和 [Timothy Lin](https://twitter.com/timlrxx) 对这个简洁、轻量且高度可定制的博客启动器的贡献。

相比原始仓库的几个主要改进：

- ⚛️ 升级到 **React 19**、**NextJS 16**
- 🎉 采用 **Typescript**，使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范提交
- 👀 使用 [Tokyonight Neovim](https://github.com/folke/tokyonight.nvim) 主题色彩的深色模式，提供更好的对比度
- 👨‍💻 我的网站参考了 [lehuynh.dev](https://leohuynh.dev/) 仓库的设计和代码，并整合了 tailwind-nextjs-starter-blog 模板 1.0 版本
- 📥 将 `mdx-bundler`、`rehype`/`remark` 插件和依赖项升级到最新版本

## Docker 部署

使用 Docker 以独立输出模式运行博客，优化镜像大小（约 200-300MB）。

### 快速开始

1. 创建包含必需环境变量的 `.env` 文件：
```bash
POSTGRES_URL=postgresql://postgres:postgres@postgres:5432/karhdo_blog
GITHUB_API_TOKEN=your_github_token
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
NEXT_PUBLIC_GISCUS_REPO=your_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=your_category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

2. 启动服务：
```bash
docker compose up -d
```

3. 运行数据库迁移：
```bash
docker compose exec app pnpm prisma:migrate:deploy
```

4. 访问 http://localhost:3000

**Docker 镜像：** 基于 Node.js 24 Alpine，采用多阶段构建（deps → builder → runner），以非 root 用户运行。

## 表达您的支持

如果这个项目对您有帮助，请给个 ⭐ 表示支持

## 图片来源

本博客使用的图片来自 [Unsplash](https://unsplash.com/)，GIF 来自 [GIPHY](https://giphy.com/)，插图来自 [Storyset](https://storyset.com/)。

衷心感谢这些优秀的资源 🙏

---

<p align="center"><b>版权所有 © 2026 - 赵康（卷娄）</b></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind CSS-url]: https://tailwindcss.com/
[MDX]: https://img.shields.io/badge/MDX-000000?style=for-the-badge&logo=mdx&logoColor=white
[MDX-url]: https://mdxjs.com/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
