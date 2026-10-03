import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Links and file paths typed into the editor panel. Only site paths (/blog/my-post/, /uploads/x.pdf)
// and web or email links are accepted, so a pasted "javascript:" link fails the build instead of
// reaching a reader's browser.
const safeUrl = z
  .string()
  .trim()
  .refine((v) => /^(\/(?!\/)|https?:\/\/|mailto:)/i.test(v), {
    message: 'Use a site path such as /blog/my-post/ or a full https:// link',
  });
// Cover colours go into a style attribute, so only plain hex colours are allowed.
const hexColor = z.string().regex(/^#[0-9a-fA-F]{3,8}$/, 'Use a hex colour such as #7a1f2b');

// Past issues: shown as a grid of covers. Clicking one opens the PDF in a new tab.
const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    // Cover colour (hex), used until a cover image is added.
    color: hexColor.default('#7a1f2b'),
    cover: safeUrl.optional(),
    // Path to the PDF, e.g. /uploads/issue-03.pdf. Without it the card shows "PDF coming soon".
    pdf: safeUrl.optional(),
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
    cover: safeUrl.optional(),
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
    link: safeUrl.optional(),
    order: z.number().default(10),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    speaker: z.string().optional(),
    image: safeUrl.optional(),
    imageAlt: z.string().optional(),
  }),
});

// Resources page: reading lists, book suggestions and course outlines.
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['reading-list', 'book', 'course']),
    author: z.string().optional(),
    description: z.string().optional(),
    // A link to the book, an article, or a PDF of the course outline.
    link: safeUrl.optional(),
    order: z.number().default(10),
  }),
});

// Editorial board: one file per academic year (e.g. 2026-27.yml). The newest year is shown as the
// current team (older years are kept as a record but not shown).
const team = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/team' }),
  schema: z.object({
    term: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        group: z.enum(['Faculty Advisor', 'Editorial Board', 'Team']).default('Editorial Board'),
        photo: safeUrl.optional(),
        bio: z.string().optional(),
      }),
    ),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    pullQuote: z.string().optional(),
  }),
});

export const collections = { issues, posts, featured, events, resources, team, pages };
