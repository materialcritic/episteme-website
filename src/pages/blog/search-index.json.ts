import type { APIRoute } from 'astro';
import { getPosts, plainText } from '../../lib/content';

// Loaded by the blog page the first time someone uses the search box.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const index = posts.map((p) => ({
    id: p.id,
    text: [p.data.title, p.data.author, p.data.tags.join(' '), p.data.summary, plainText(p.body)]
      .join(' ')
      .toLowerCase(),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
