// Copies the site stylesheet next to the editor panel so its live preview matches the real site.
import { copyFileSync } from 'node:fs';
copyFileSync('src/styles/global.css', 'public/admin/preview.css');
