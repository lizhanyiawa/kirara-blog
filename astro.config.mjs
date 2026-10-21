import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 项目页：站点根为 /kirara-blog/，因此必须同时设置 site 与 base。
// 所有站内链接请使用 src/config.ts 里的 url() 助手，不要硬编码 "/about/" 这类路径。
export default defineConfig({
  site: 'https://lizhanyiawa.github.io',
  base: '/kirara-blog',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
});
