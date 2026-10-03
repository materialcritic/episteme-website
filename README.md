# Episteme Website: Project Handoff

Context summary for continuing this project in another Claude chat. Date of summary: 2026-09-30.

## 1. Project
The user runs **Episteme**, the magazine of the **Department of Political Science, Jamia University** (Jamia Millia Islamia vs. Jamia Hamdard was asked but **not yet confirmed**). They want an official, **permanent, reliable** website, built with Claude's help, with an estimate of hosting and domain costs. Currency is INR.

## 2. Decisions made so far

### Domain
- Chosen domain: **`epistemejamia.in`**
- Availability checked on 2026-09-30 via the .in registry (NIXI) WHOIS: **available for registration**, no DNS records.
- Registrar comparison (from the user's screenshots):
  - **Hostgill:** ₹999 for 3 years, but **renews at ₹2,505/yr**. It only wins for the first 3 years, then costs about 5x more.
  - **Spaceship:** **$5.97/yr, renewal also $5.97/yr** (about ₹520–540). This was the recommended choice.
- Recommendation given: buy at **Spaceship**, register under a **department email** (not personal), consider registering 3–5 years, keep **auto-renew on**, enable **2FA**, decline all upsells (hosting, email, protection add-ons). Note USD billing, so the user's card needs international payments enabled and may have a forex fee of about 2–3.5%.
- **Status: the user said they will proceed with buying the domain.** Not confirmed complete.
- Earlier caution: confirm with the department or university IT whether they prefer an official subdomain (e.g. `episteme.jmi.ac.in`) and who legally owns the domain. `.ac.in` can only be issued to the institution.

### Hosting and stack (recommended, "static")
- Static site built with **Astro** (or Hugo), hosted on **Cloudflare Pages** (free, global CDN, free SSL, no server to hack).
- Code stored on **GitHub** under a department account.
- **Decap CMS** as a free editor panel so student editors can publish without code.
- DNS on **Cloudflare** (free): add the domain to Cloudflare, then change Spaceship's nameservers to Cloudflare's.
- Alternative considered: WordPress on managed hosting (about ₹3,000–10,000/yr, more maintenance). Not recommended.

### Cost estimate (static route)
| Item | Cost |
|---|---|
| Domain | about ₹400–600/yr (Spaceship) |
| Hosting, SSL, GitHub, Decap CMS, DNS | ₹0 |
| Custom email, optional | ₹0 for forwarding; about ₹1,000–2,500/yr for one paid mailbox |
| Logo/design, optional | ₹0 (text-based logo by Claude) or ₹1,000–2,000 one-off |

Total: about ₹400–600/yr without paid email, or about ₹1,500–3,000/yr with one paid mailbox. Prices are approximate and were not all verified live.

### Email plan
- The user wants a custom email (e.g. `editor@epistemejamia.in`) that forwards to Gmail.
- Explained: **forwarding to Gmail is free** (Cloudflare Email Routing, receive-only; replies would show the Gmail address unless SMTP "Send mail as" is set up). A **paid mailbox** (Zoho Mail about ₹1,000–1,500/user/yr, or Google Workspace about ₹1,700–2,500/user/yr) gives real send and receive, and can also forward to Gmail. Aliases (`submissions@`, `contact@`) are free on both.
- Suggested: check whether Jamia already has Google Workspace or Microsoft 365 for Education.
- Recommended path: start with free Cloudflare forwarding, and upgrade to a paid mailbox later if needed (DNS setup carries over).
- Setup order: buy domain, move DNS to Cloudflare, choose forwarding or mailbox (MX plus TXT verification), add SPF/DKIM/DMARC records, enable forwarding and Gmail "Send mail as", enable 2FA, test both directions.

### Domain ideas discussed (alternatives)
`episteme.in`, `episteme.org`, `episteme.press`, `epistemejamia.org`, `epistemepolsci.in`, `theepisteme.in`, `episteme.jamia.ac.in` (only if the university offers it).

## 3. Planned site sections (user's template)
1. **About Us:** how Episteme came about, the faculty advisor's association (the user called them "Dara sir"), info about the first issue.
2. **Past Editions:** links to all previous editions.
3. **In the Department:** events related to Episteme (webinars, speaker sessions, past and upcoming), with pictures and detailed captions.
4. **Footer:** links to all social media handles.
5. **Reach Out to Us:** the magazine's email for queries and suggestions.
6. Optional **Featured** section: selected work, e.g. the last issue featured work by **Dr. Pogge from Yale**, plus other notable articles from earlier editions.

## 4. What has been built (current state)
**Design A (Classic Journal)** is built as a real **Astro 7** static site in this repo. The three original HTML mockups are kept in `reference/`. University: **Jamia Millia Islamia** (confirmed by the user).

### Site structure (decided with the user)
- **Issues** (`/issues/`): a grid of cover thumbnails of all past issues. Clicking a cover **opens the issue PDF in a new tab**. An issue with no PDF yet shows "PDF coming soon". There are no per-issue pages and no web version of issues.
- **Blog** (`/blog/`): posts are **text hosted on the site (no PDFs)**. The list can be **sorted by date** (newest/oldest), **filtered by tag**, and **searched** (full text: title, author, tags, summary and body). Tag, search and sort state is kept in the URL (`/blog/?tag=interview&q=...`).
- **Posts** have a byline, date, reading time, tags, optional cover image, **footnotes** (`[^1]`), **pull-quotes** (blockquotes), **embedded video/podcast** (YouTube/Spotify via an editor-panel component), **share buttons** (WhatsApp, X, LinkedIn, Facebook, Email, Copy link; no comments) and **related posts** (by shared tags).
- **Submit** (`/submit/`): submission guidelines for the blog (3,000-4,000 words, APA 7 citations, email to the editors, what to send). Text is editable in the editor panel (Pages > Submission guidelines); the reply-time figure is a `[number]` placeholder.
- **Resources** (`/resources/`, after Submit in the nav): reading lists, book suggestions and course outlines, from the `resources` collection (`src/content/resources/`, editable in the panel). Currently placeholder entries only.
- **Newsletter:** signup box in the footer band of every page. Until a provider form URL is set in `src/config.ts` (`SITE.newsletter.action`; Buttondown, MailerLite or Brevo) it shows a working "Subscribe by email" button that emails the editors.
- **Issue cards** show the cover plus issue number, month and year, and title. Covers will be supplied by the user later.
- **Cite this post:** each blog post has a collapsible box with ready-made APA 7 and MLA 9 citations and Copy buttons (copies with italics for Word/Google Docs). Built by `src/lib/cite.ts` from the post's author, title and date. Authors must be entered as "First Last" (two authors: "First Last and First Last"). Titles are used exactly as written (APA prefers sentence case).
- **Editorial Board** (`/team/`, after About in the nav): from `src/content/team/`, **one YAML file per academic year** (e.g. `2026-27.yml`) listing members with name, role, group (Faculty Advisor / Editorial Board / Team), optional photo and bio. Only the newest year is shown on the page (there is no past-boards section, removed at the user's request). For handover, the new team adds a new year file instead of overwriting, so older boards are kept in the repo without appearing on the site. Currently placeholders for 2026–27 and 2025–26.
- **Fonts are self-hosted** (no Google requests): `scripts/build-fonts.mjs` copies the Latin and Latin Extended subsets of Playfair Display, Source Serif 4 and Inter from the `@fontsource` dev packages into `public/fonts/` and writes `src/styles/fonts.css`. Re-run it only if the font list changes.
- **Animations:** masthead fade-in; sections and cards fade up as they scroll into view (scroll-position based, not IntersectionObserver, which failed on pages opened through view transitions); hover lift on cards and covers; animated nav underline; cross-page fade (CSS view transitions); reading-progress bar on blog posts. All motion is off for users with "reduce motion" set, and nothing is hidden if JavaScript fails.
- **Phone menu:** under 820px the nav collapses behind a "Menu" button.
- **SEO and ops:** sitemap (`/sitemap-index.xml`), `robots.txt` (blocks `/admin/`), canonical and Open Graph tags, blog RSS feed (`/rss.xml`, also usable by newsletter tools to email new posts), Cloudflare `_headers` (security headers, long cache for built assets), Node pinned with `.nvmrc` and `engines`, Decap CMS pinned to 3.16.3. Print stylesheet: posts print without navigation or buttons, and fade-in content is never left blank on paper.
- **Security (audit of 2026-10-03):**
  - **Content-Security-Policy** on every page via Astro's `security.csp` in `astro.config.mjs`. Astro fingerprints the site's own scripts on each build, so any script that gets into content is refused by the browser. A new embed service, analytics or newsletter widget needs its domain added there (Cloudflare Web Analytics notes are in the file). Keep Cloudflare **Rocket Loader off**: it rewrites scripts and breaks the policy.
  - **`public/_headers`** adds HSTS, `frame-ancestors`, Cross-Origin-Opener-Policy (`same-origin-allow-popups`, which the GitHub login popup needs), Permissions-Policy, `script-src 'none'` for `/uploads/*` (uploaded files are displayed, never run; PDFs still open), a strict policy for `/admin/*`, and `noindex` for the `pages.dev` copies.
  - **Decap CMS is self-hosted**, not loaded from unpkg. `scripts/fetch-decap.mjs` downloads the pinned version from the npm registry, checks its SHA-512 against the registry checksum, and copies it to `public/admin/decap/` (gitignored) before every dev/build. To upgrade Decap, change `VERSION` and `INTEGRITY` in that script.
  - **Editor panel:** setup code lives in `public/admin/cms-setup.js` (no inline scripts). The Embed button only creates YouTube and Spotify players; other https links are inserted as plain links. `auth_scope: public_repo` limits editors' GitHub sign-in to public repositories.
  - **Link and file fields are validated** (`safeUrl` in `src/content.config.ts`, plus `pattern` on the link fields in `config.yml`): only `/paths`, `http(s)://` and `mailto:` are accepted, so a `javascript:` link fails the build. Cover colours must be hex.
  - `daily-rebuild.yml` runs with `permissions: {}`.
  - **The inline `js` flag script** (`src/js-flag.mjs`) is the one inline script Astro cannot fingerprint itself, so `astro.config.mjs` hashes it into the policy from the same text the page uses. Do not add other inline scripts without doing the same, or the browser will block them. Verified on the production build: menu, animations, blog search, citations and the editor panel all run with the policy active. `astro check` skips the downloaded `public/admin/decap/` bundle.
- **Daily rebuild:** `.github/workflows/daily-rebuild.yml` triggers a Cloudflare deploy hook every morning (06:00 IST) so events move from Upcoming to Past automatically. Needs a `CF_DEPLOY_HOOK` repo secret; it skips quietly until that is set. Caveat: GitHub pauses scheduled workflows in public repos after 60 days without a commit (e.g. over the summer break), and the schedule then has to be re-enabled in the Actions tab. A Cloudflare Worker cron trigger calling the same hook would avoid this.
- Other pages: Home (latest issue, Featured, From the Blog, Issues, In the Department, About teaser), About, In the Department (events), Reach Out, 404.

### Editing workflow (decided with the user)
Students submit by email; **editors post everything** through the editor panel at `/admin/` (Decap CMS). It uses an **editorial workflow** (Draft, In review, Ready, then Publish) with a **live preview** in the editor and a full **preview website per draft** (Cloudflare Pages builds each draft branch before it is published).

```
src/config.ts            site name, email, social links
src/content/posts/       blog posts (.md): title, date, author, summary, tags, cover; body = the post
src/content/issues/      one .md per issue: number, title, date, pdf, cover, color
src/content/featured/    Featured cards (can link to a blog post)
src/content/events/      "In the Department" events
src/content/pages/about.md
src/pages/               index, about, issues/, blog/ (+ [id], search-index.json), department, contact, 404
src/components, layouts  PostCard, ShareButtons, IssueCard, IssueCover, EventCard, Contact, Base
src/styles/global.css    all design-A styling
public/admin/            editor panel (index.html, cms-setup.js with live preview + embed component, config.yml)
public/uploads/          images and PDFs uploaded through the editor panel
reference/               original design mockups A, B, C
scripts/                 before dev/build: sync-preview-css.mjs (global.css -> public/admin/preview.css) and
                         fetch-decap.mjs (checksum-verified Decap CMS -> public/admin/decap/); build-fonts.mjs (manual)
```

Run it: `npm install`, then `npm run dev` (http://localhost:4321) or `npm run build` (output in `dist/`). It builds cleanly (13 pages). Verified in a browser: blog search, tag filter and sort, post page with footnote/pull-quote/share buttons, and all routes.

**All text in `[square brackets]` is placeholder**, including the three sample posts, three issues and three events. Event "Upcoming/Past" is decided at build time.

### Not done yet
- **Editor panel sign-in:** the GitHub backend needs a small OAuth proxy (e.g. a Cloudflare Worker) before editors can log in at `/admin/`. Set `base_url` in `public/admin/config.yml` once it exists. The live preview, embed component and editorial workflow are written but **untested** until login works. (In `npm run dev`, `/admin/` returns 404 because of the trailing-slash setting; `/admin/index.html` works.) If sign-in fails once the proxy exists, check the browser console for a domain blocked by the `/admin/*` policy in `public/_headers`. Note: before 2026-10-03, `config.yml` was invalid YAML (unquoted labels containing `:` or `,`) and the panel showed "Error loading the CMS configuration"; quote any label that contains those characters.
- **Not deployed:** no Cloudflare Pages project is connected and the domain is not pointed at it.
- **Issue thumbnails:** currently the cover image if provided, else a coloured placeholder cover. Auto-generating a thumbnail from each PDF's first page is not built yet (default offered to the user; not yet confirmed).
- Real content, logo, social handles, email DNS (SPF/DKIM/DMARC), pagination for a very long blog list.

## 5. Decisions and next steps
**Answered by the user:** university Jamia Millia Islamia; design A; issues are PDF-only, opened in a new tab, thumbnails show number + month/year + title, cover images to be supplied later, about 4-5 issues (PDFs can live in `public/uploads/` in the repo while each is under 25 MB); blog is text-only, English only, with sort/tags/search; editors post everything with draft/preview/publish; tags only; footnotes, pull-quotes, embeds; reading time and related posts; share buttons yes, comments no; Featured and In the Department kept, Featured links to posts (Claude's choice); submissions by email with guidelines; newsletter yes; permission to host outside contributors' work (e.g. Dr. Pogge) confirmed; default wordmark logo for now; **launch ASAP**.

**Still to do (in order):**
1. User creates the accounts (Cloudflare; GitHub ownership under a department account later) and deploys: Cloudflare Pages, connect the GitHub repo, build command `npm run build`, output `dist`, env var `NODE_VERSION=22.12.0` (Astro 7 needs Node >= 22.12).
2. Add the domain to Cloudflare and point the Spaceship nameservers at it; attach `epistemejamia.in` to the Pages project.
3. Editor-panel login: deploy a GitHub OAuth proxy (Cloudflare Worker), set `base_url` in `public/admin/config.yml`, then test the draft workflow, live preview and embeds.
4. Email: Spacemail DNS records (MX, SPF, DKIM, DMARC) in Cloudflare, forwarding to Gmail and Gmail "Send mail as"; test both ways.
5. Newsletter provider and its form URL; social handles; About text; real issues (PDFs and covers); event content; remove the placeholder posts, issues and events.
6. Handover document: logins, how to publish a post and an issue, who renews the domain and email, and when.

**Open:** has the user bought `epistemejamia.in` and Spacemail yet? Real About text and advisor name. Submission reply time.

## 6. Working notes for the next Claude
- The user wants to be guided step by step and is building the site with Claude only.
- Priority: permanence and reliability (official site); avoid fragile or personally-owned setups. Ownership should sit with the department and a faculty advisor should hold the credentials in a handover doc.
- Do not enter payment or credentials on the user's behalf. The user makes purchases and account signups themselves.
- Prices in this document are estimates from a web search and the user's screenshots. Re-verify at checkout.
