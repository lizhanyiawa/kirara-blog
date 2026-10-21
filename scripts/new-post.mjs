import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const slug = process.argv[2];

if (!slug) {
  console.error("用法: npm run new -- 文章短名");
  console.error("例如: npm run new -- my-first-post");
  process.exit(1);
}

if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error("短名只能使用小写字母、数字和连字符，例如 my-first-post");
  process.exit(1);
}

const dir = join(process.cwd(), "src", "content", "blog");
mkdirSync(dir, { recursive: true });

const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`文件已存在: ${file}`);
  process.exit(1);
}

// 用本地时区生成日期，避免深夜写文章时日期退到前一天
const now = new Date();
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

const template = `---
title: 文章标题
description: 一句话摘要，会显示在文章列表和搜索结果里
pubDate: ${today}
tags: []
---

正文从这里开始。

## 第一个小标题

写点什么。
`;

writeFileSync(file, template, "utf8");

console.log(`已创建: ${file}`);
console.log(`文章地址: /kirara-blog/posts/${slug}/`);
