import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** 列表页与搜索结果里显示的摘要 */
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** 设为 true 后不会出现在列表与 RSS 中，但仍可本地预览 */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
