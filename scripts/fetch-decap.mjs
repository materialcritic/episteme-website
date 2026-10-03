// Copies the Decap CMS editor panel into public/admin/decap/ so it is served from our own domain
// instead of a third-party CDN. The download comes from the npm registry and is checked against the
// SHA-512 checksum the registry publishes for this exact version; if it does not match, nothing is
// installed and the build stops. Runs automatically before `npm run dev` and `npm run build`.
//
// To upgrade Decap: set VERSION, then set INTEGRITY to the output of
//   npm view decap-cms@<VERSION> dist.integrity
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const VERSION = '3.16.3';
const INTEGRITY = 'sha512-hf+dPlCh7TJmWl8+6VRzHYOWhri5xgUknrZbDewaWe4s9B7xJ8PQugp2QHeSldMUKzav6+z0oIpwUYhUJDYtYw==';
const OUT = 'public/admin/decap';
const STAMP = `${OUT}/VERSION`;
const devOnly = process.env.npm_lifecycle_event === 'predev';

if (existsSync(STAMP) && readFileSync(STAMP, 'utf8').trim() === VERSION) process.exit(0);

let tgz;
try {
  const res = await fetch(`https://registry.npmjs.org/decap-cms/-/decap-cms-${VERSION}.tgz`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  tgz = Buffer.from(await res.arrayBuffer());
} catch (err) {
  // Offline during local development: the site still runs, only /admin/ is unavailable.
  if (devOnly) {
    console.warn(`Could not download Decap CMS (${err.message}); /admin/ will not work until you are online.`);
    process.exit(0);
  }
  throw new Error(`Could not download Decap CMS ${VERSION}: ${err.message}`);
}

const actual = `sha512-${createHash('sha512').update(tgz).digest('base64')}`;
if (actual !== INTEGRITY) {
  throw new Error(`Decap CMS ${VERSION} failed its checksum (expected ${INTEGRITY}, got ${actual}). Not installed.`);
}

// npm packages are gzipped tar archives; read the entries directly and keep only the panel's scripts.
const tar = gunzipSync(tgz);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
let copied = 0;
for (let offset = 0; offset + 512 <= tar.length; ) {
  const header = tar.subarray(offset, offset + 512);
  if (header.every((byte) => byte === 0)) break;
  const field = (start, end) => header.subarray(start, end).toString('utf8').replace(/\0[\s\S]*$/, '');
  const prefix = field(345, 500);
  const name = (prefix ? `${prefix}/` : '') + field(0, 100);
  const size = parseInt(field(124, 136).trim() || '0', 8);
  const isFile = header[156] === 0 || header[156] === 48; // '0' or NUL = regular file
  const match = name.match(/^package\/dist\/((?:\d+\.)?decap-cms\.js)$/);
  if (isFile && match) {
    writeFileSync(`${OUT}/${match[1]}`, tar.subarray(offset + 512, offset + 512 + size));
    copied++;
  }
  offset += 512 + Math.ceil(size / 512) * 512;
}
if (!copied) throw new Error('No Decap CMS files were found in the download.');
writeFileSync(STAMP, `${VERSION}\n`);
console.log(`Decap CMS ${VERSION}: checksum verified, ${copied} files copied to ${OUT}/`);
