# Kirara Blog

个人博客，用 [Astro](https://astro.build) 构建，输出纯静态页面，部署在 GitHub Pages。

线上地址：https://lizhanyiawa.github.io/kirara-blog/

## 环境要求

- Node.js **20.3 以上**（当前用的 Astro 5 不支持更老的 Node）
- npm

> 注意：`astro@7` 要求 Node ≥ 22.22。本项目锁定在 `astro@5`，先不要升级 Astro。

## 常用命令

```bash
npm install      # 首次安装依赖
npm run dev      # 本地开发，改文件后自动刷新
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
npm run new -- 文章短名   # 新建一篇文章
```

本地开发地址是 `http://localhost:4321/kirara-blog/`，注意要带 `/kirara-blog/` 前缀。

## 写文章

一条命令搞定：

```bash
npm run new -- my-first-post
```

它会创建 `src/content/blog/my-first-post.md`，带上日期和 frontmatter 骨架。文章地址自动是 `/kirara-blog/posts/my-first-post/`。

文件开头必须有的字段：

| 字段          | 类型   | 说明                                                           |
| ------------- | ------ | -------------------------------------------------------------- |
| `title`       | 字符串 | 文章标题                                                       |
| `pubDate`     | 日期   | `2026-10-22` 这种格式                                          |
| `description` | 字符串 | 一句话摘要，出现在列表和 RSS 里                                |
| `tags`        | 数组   | 例如 `['技术', 'CSS']`，会自动生成标签页                       |
| `draft`       | 布尔   | 默认 `false`。设为 `true` 后不进列表、不进 RSS，但本地仍可预览 |
| `updatedDate` | 日期   | 可选，有更新时填                                               |

正文就是普通 Markdown：`##` 二级标题会自动生成右侧目录，三个反引号包裹的代码块会带语法高亮。

## 目录结构

```
src/
├── config.ts            站点名称、描述、评论与统计的 ID
├── content.config.ts    文章字段的校验规则
├── content/blog/        文章（Markdown，只改这里）
├── assets/              需要被优化的图片（会自动转 webp）
├── styles/global.css    全站样式，手写 CSS
├── layouts/BaseLayout.astro
├── components/          Header / Footer / PostCard / Toc / Giscus / Analytics
├── lib/utils.ts         日期格式化、阅读时长
└── pages/               首页、文章列表、文章详情、标签、关于、404、RSS
public/                  原样拷贝的文件（favicon、robots.txt）
.github/workflows/       GitHub Actions 自动部署
```

## 站内链接必须走 `url()`

站点是 GitHub Pages 的**项目页**，多一层 `/kirara-blog/` 前缀。Astro 只给自己处理的资源自动加前缀，**不会给手写字符串加**。

```astro
---
import { url } from '../config';
---
<a href={url('about/')}>关于</a>
```

不要写 `href="/about/"`，构建不会报错，但线上会 404。

## 部署

推送到 `my-first-project` 分支会自动触发 GitHub Actions 构建并发布（也可以用 `workflow_dispatch` 手动触发）。

**首次部署前需要手动改一次仓库设置**：

1. 打开仓库 `Settings → Pages`
2. 把 `Build and deployment → Source` 改成 **GitHub Actions**
3. 保存后到 `Actions` 页面手动跑一次 `Deploy to GitHub Pages`

如果不改这个设置，Actions 里的部署会失败，站点仍会按旧的分支发布方式工作。

## 评论

评论用 giscus，把评论存进仓库的 Discussions，不需要后端和数据库。

1. 仓库 `Settings → General → Features` 勾选 **Discussions**
2. 安装 https://github.com/apps/giscus 并授权给这个仓库
3. 打开 https://giscus.app ，填入 `lizhanyiawa/kirara-blog`，拿到 `data-repo-id` 和 `data-category-id`
4. 把两个 ID 填进 `src/config.ts` 的 `GISCUS`

没填 ID 时评论区整块不渲染，站点照常构建。

## 统计

用 Umami。注册后把 `website-id` 填进 `src/config.ts` 的 `UMAMI.websiteId`，填了才会加载脚本。

> 如果 `cloud.umami.is` 在你那边访问不了，可以换成自建 Umami，或改用百度统计、51.la 等国内服务，脚本地址在 `UMAMI.src` 里改。

## 分支

| 分支               | 用途                                                |
| ------------------ | --------------------------------------------------- |
| `my-first-project` | 主分支，线上站点                                    |
| `astro-rebuild`    | 用 Astro 重写的工作分支                             |
| `lab-archive`      | 旧的手写 HTML 练习页（freeCodeCamp 作业），仅作存档 |
