import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    // Cover colour (hex). Used until a real cover image is uploaded.
    color: z.string().default('#7a1f2b'),
    cover: z.string().optional(),
    // Link to the PDF of the issue (e.g. /uploads/issue-03.pdf). Optional: an issue can also be web-only.
    pdf: z.string().optional(),
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

export const collections = { issues, featured, events, pages };
