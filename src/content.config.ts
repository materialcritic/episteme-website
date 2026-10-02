import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Past issues: shown as a grid of covers. Clicking one opens the PDF in a new tab.
const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    // Cover colour (hex), used until a cover image is added.
    color: z.string().default('#7a1f2b'),
    cover: z.string().optional(),
    // Path to the PDF, e.g. /uploads/issue-03.pdf. Without it the card shows "PDF coming soon".
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Blog posts: written as text on the site (the markdown body is the post).
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const featured = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/featured' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    affiliation: z.string().optional(),
    kind: z.string().default('Featured'),
    issue: z.number().optional(),
    // Where the card links to: a blog post (/blog/some-post/) or a PDF.
    link: z.string().optional(),
    order: z.number().default(10),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    speaker: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    pullQuote: z.string().optional(),
  }),
});

export const collections = { issues, posts, featured, events, pages };
