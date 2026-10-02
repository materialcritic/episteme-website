// Builds the editor panel's preview stylesheet from the site's fonts and styles,
// so the live preview matches the real site.
import { readFileSync, writeFileSync } from 'node:fs';
writeFileSync(
  'public/admin/preview.css',
  readFileSync('src/styles/fonts.css', 'utf8') + readFileSync('src/styles/global.css', 'utf8'),
);
