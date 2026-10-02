import { getCollection, type CollectionEntry } from 'astro:content';

export async function getIssues() {
  const all = await getCollection('issues', (i) => !i.data.draft);
  return all.sort((a, b) => b.data.number - a.data.number);
}

export async function getPosts() {
  const all = await getCollection('posts', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeatured() {
  const all = await getCollection('featured');
  return all.sort((a, b) => a.data.order - b.data.order);
}

// Events are sorted newest first. "Upcoming" is decided when the site is built,
// so the site is rebuilt on every content change (and can be rebuilt on a schedule).
export async function getEvents() {
  const all = await getCollection('events');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return all
    .map((e) => ({ entry: e, upcoming: e.data.date >= now }))
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

export const slugifyTag = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function readingTime(body = '') {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Posts that share the most tags with `post`, newest first on ties.
export function relatedPosts(post: CollectionEntry<'posts'>, all: CollectionEntry<'posts'>[], limit = 3) {
  const mine = new Set(post.data.tags.map(slugifyTag));
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(slugifyTag(t))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.getTime() - a.p.data.date.getTime())
    .slice(0, limit)
    .map((x) => x.p);
}

// Plain text of a markdown post, used by the blog search.
export function plainText(md = '') {
  return md
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[\^[^\]]+\]:?/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Dates in content are plain days (2026-03-12), stored as UTC midnight; format them in UTC
// so they never shift a day depending on where the site is built.
export const monthYear = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';

export const fullDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const pad = (n: number) => String(n).padStart(2, '0');
