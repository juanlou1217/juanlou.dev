# 音乐播放器

`/music` 展示 Folia 上的 QQ 音乐个人普通合集「轻音乐」（8651475770）。页面只提供选曲、播放/暂停、上一首/下一首、进度及音量。没有音乐搜索或账号入口；保留站点本来的文章搜索。

博客服务端通过 `lib/services/music.ts` 请求内部 `blog-music:3100`。`MUSIC_GATEWAY_URL` 仅用于服务端配置/本地测试，不是 NEXT_PUBLIC 变量。公开路由只允许 `/api/music/collection`、`/api/music/tracks/:id/play`、`/api/music/tracks/:id/audio`，拒绝查询参数和写入方法，不转发访客凭据。

音乐服务、固定合集校验、加密凭据、管理员扫码及跨应用网络配置属于私有 `juanlou-infra/music/`。博客没有音乐 Cookie/Token、数据库表或迁移。具体凭据失效时显示“等待管理员重新登录”，访客无需登录。原 QQ 后端重启也可能使会话失效。

验证需要区分本地测试音频与真实线上 QQ 音频。本地可用 fixture 验证加载、空合集、不可播放、凭据失效与交互；线上必须在管理员配置完成后验证真实音频字节及播放进度、Range、权限边界和 HTTPS。

部署沿用 `.github/workflows/deploy.yml` 的镜像构建及校验下载流程。`remote-bootstrap.sh` 更新时只重建 app；已存在的 PostgreSQL 不停止。发布前先备份 `.env.production`、Compose 配置和原 app 镜像。回滚时用保存的原镜像和原配置仅重建 app，停止独立 `blog-music`，不操作数据库卷；随后通过正常流程回退功能提交。
