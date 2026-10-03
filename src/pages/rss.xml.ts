import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPosts } from '../lib/content';

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Blog feed. Feed readers use it, and newsletter tools (e.g. MailerLite) can email new posts from it automatically.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name} · Blog`,
    description: SITE.tagline,
    site: context.site!,
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      customData: `<dc:creator>${xml(p.data.author)}</dc:creator>`,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
