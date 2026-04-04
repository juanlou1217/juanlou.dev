# 生产部署指南

## 概述

本项目支持在中国大陆服务器上通过 Docker Compose 自托管，同时使用 GitHub Actions 完成持续部署。

默认生产方案：

- 域名：`juanlou.top`
- 服务器：Linux 主机
- 反向代理：Caddy（自动申请 HTTPS 证书）
- 应用容器：Next.js standalone
- 数据库：PostgreSQL 16

## 仓库文件

- `.github/workflows/deploy.yml`
- `docker-compose.prod.yml`
- `deploy/Caddyfile`
- `scripts/deploy/remote-bootstrap.sh`

## 首次上线前提

1. `juanlou.top` 的 A 记录指向生产服务器
2. 服务器安全组放行 `22`、`80`、`443`
3. GitHub 仓库已配置以下 Secrets

必需：

- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_KEY`

可选：

- `PROD_PATH`
- `SITE_DOMAIN`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_URL`
- `GITHUB_API_TOKEN`
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- `UMAMI_WEBSITE_ID`
- `UMAMI_SHARE_URL`

## 推荐部署步骤

### 1. 准备服务器

首次部署时，workflow 会在远端自动完成以下动作：

- 安装 `git`
- 安装 Docker
- 拉取仓库代码到 `/opt/juanlou-dev`（默认）
- 生成 `.env.production`
- 启动 `docker-compose.prod.yml`

### 2. 配置 GitHub Secrets

至少写入：

```text
PROD_HOST=8.152.193.207
PROD_USER=root
SITE_DOMAIN=juanlou.top
```

`PROD_SSH_KEY` 需要填写可登录生产机的私钥全文。

### 3. 触发部署

以下任意方式都会触发生产部署：

- 向 `main` 分支 push
- 手动运行 GitHub Actions 里的 `Deploy Production`

## 环境变量说明

### 数据库

如果没有显式设置 `POSTGRES_URL`，workflow 默认使用容器内地址：

```text
postgresql://postgres:postgres@postgres:5432/juanlou_blog
```

### 评论

如果没有提供完整 Giscus 配置，站点会自动关闭评论区，不会阻塞上线。

## 运维命令

登录服务器后：

```bash
cd /opt/juanlou-dev
docker compose -f docker-compose.prod.yml --env-file .env.production ps
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f app
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f caddy
```

## 常见问题

### HTTPS 没签发

检查：

- 域名是否已解析到服务器公网 IP
- `80/443` 是否已放行
- Caddy 日志是否报证书申请失败

### 页面能打开，但统计接口报错

检查：

- `POSTGRES_URL` 是否可用
- `postgres` 容器是否正常启动

### 评论区空白

这是预期行为之一。未配置完整 Giscus 时，评论区会自动关闭。
