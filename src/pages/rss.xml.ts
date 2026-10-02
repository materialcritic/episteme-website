import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPosts } from '../lib/content';

// Blog feed. Feed readers use it, and newsletter tools (e.g. MailerLite) can email new posts from it automatically.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name} · Blog`,
    description: SITE.tagline,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      author: p.data.author,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
