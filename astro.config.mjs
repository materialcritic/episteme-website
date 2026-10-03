import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';
import { JS_FLAG } from './src/js-flag.mjs';

const jsFlagHash = `sha256-${createHash('sha256').update(JS_FLAG).digest('base64')}`;

export default defineConfig({
  site: 'https://epistemejamia.in',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') })],
  security: {
    // Content-Security-Policy, added to every page by Astro. Astro fingerprints the site's own scripts
    // on each build, so they run, while any script that sneaks into content (for example HTML pasted
    // into a post) is refused by the browser.
    // If you add a new embed service, analytics, or a newsletter provider widget, allow its domain
    // below. (Cloudflare Web Analytics needs https://static.cloudflareinsights.com in script-src and
    // https://cloudflareinsights.com in connect-src.)
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        "frame-src https://www.youtube-nocookie.com https://open.spotify.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https:",
        "manifest-src 'self'",
      ],
      // Astro hashes its own scripts automatically; the small inline script from src/js-flag.mjs is allowed here.
      scriptDirective: { hashes: [jsFlagHash] },
      // Inline style="" attributes are used across the templates; styles cannot run code.
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
});
