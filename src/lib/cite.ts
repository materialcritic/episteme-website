// Ready-made citations for blog posts: APA 7th edition and MLA 9th edition.
// Returns HTML (with italics) so it can be shown on the page and pasted into Word with formatting.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MLA_MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// "Ayesha Khan and Rohan Mehta" or "Ayesha Khan, Rohan Mehta" -> ["Ayesha Khan", "Rohan Mehta"]
function splitAuthors(author: string) {
  return author.split(/\s*(?:,|&|\band\b)\s*/).map((a) => a.trim()).filter(Boolean);
}

function parts(name: string) {
  const words = name.split(/\s+/);
  if (words.length === 1 || name.startsWith('[')) return { last: name, given: [] as string[] };
  return { last: words[words.length - 1], given: words.slice(0, -1) };
}

// APA: Khan, A. / Mehta, R. S.
function apaName(name: string) {
  const { last, given } = parts(name);
  if (!given.length) return last;
  return `${last}, ${given.map((g) => `${g[0].toUpperCase()}.`).join(' ')}`;
}

function apaAuthors(names: string[]) {
  const n = names.map(apaName);
  if (n.length === 1) return n[0];
  if (n.length === 2) return `${n[0]}, & ${n[1]}`;
  return `${n.slice(0, -1).join(', ')}, & ${n[n.length - 1]}`;
}

// MLA: Khan, Ayesha / Khan, Ayesha, and Rohan Mehta / Khan, Ayesha, et al.
function mlaAuthors(names: string[]) {
  const first = parts(names[0]);
  const lead = first.given.length ? `${first.last}, ${first.given.join(' ')}` : first.last;
  if (names.length === 1) return lead;
  if (names.length === 2) return `${lead}, and ${names[1]}`;
  return `${lead}, et al`;
}

const endWith = (s: string, ch: string) => (/[.?!]$/.test(s) ? s : s + ch);

export function citations(opts: { title: string; author: string; date: Date; url: string; site: string }) {
  const { title, author, date, url, site } = opts;
  const names = splitAuthors(author);
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();

  const apa = `${esc(endWith(apaAuthors(names), '.'))} (${y}, ${MONTHS[m]} ${d}). ${esc(endWith(title, '.'))} <em>${esc(site)}</em>. ${esc(url)}`;
  const mla = `${esc(endWith(mlaAuthors(names), '.'))} “${esc(endWith(title, '.'))}” <em>${esc(site)}</em>, ${d} ${MLA_MONTHS[m]} ${y}, ${esc(url.replace(/^https?:\/\//, ''))}.`;
  return { apa, mla };
}
