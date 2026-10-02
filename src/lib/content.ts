import { getCollection } from 'astro:content';

export async function getIssues() {
  const all = await getCollection('issues', (i) => !i.data.draft);
  return all.sort((a, b) => b.data.number - a.data.number);
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
  const events = all
    .map((e) => ({ entry: e, upcoming: e.data.date >= now }))
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
  return events;
}

export const monthYear = (d?: Date) =>
  d ? d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '';

export const fullDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export const pad = (n: number) => String(n).padStart(2, '0');
