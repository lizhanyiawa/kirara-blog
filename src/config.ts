/**
 * 全站配置集中在这里，平时只需要改这一个文件。
 */

export const SITE = {
  title: 'Kirara Blog',
  tagline: '前端学习笔记 · 项目实践',
  description: 'Kirara 的个人博客，记录前端学习、项目实践与日常思考。',
  author: 'Kirara',
  lang: 'zh-CN',
  github: 'https://github.com/lizhanyiawa',
  email: '',
  /** 首页每页显示的文章数 */
  postsPerPage: 10,
};

/**
 * GitHub Pages 项目页的 base 前缀（/kirara-blog）。
 * Astro 只会给打包资源自动加前缀，字符串 href 不会 —— 所以站内链接必须走 url()。
 */
const rawBase = import.meta.env.BASE_URL;
export const BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export function url(path = ''): string {
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

/**
 * 评论：把下面三个字段填上就会自动出现评论区。
 * repoId / categoryId 在 https://giscus.app 填仓库名后生成。
 * 留空则整块不渲染，站点照常构建。
 */
export const GISCUS = {
  repo: '',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
};

/**
 * 统计：填上 websiteId 就会加载 Umami。
 * 留空则不加载任何统计脚本。
 */
export const UMAMI = {
  websiteId: '',
  src: 'https://cloud.umami.is/script.js',
};
