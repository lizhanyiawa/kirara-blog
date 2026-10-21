import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { BASE, SITE, url } from "../config";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const origin = context.site ?? new URL("https://lizhanyiawa.github.io");
  const feedSite = new URL(BASE, origin).href;

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: feedSite,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: url(`posts/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
