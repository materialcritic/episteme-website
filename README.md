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
public/admin/            editor panel (index.html with live preview + embed component, config.yml)
public/uploads/          images and PDFs uploaded through the editor panel
reference/               original design mockups A, B, C
scripts/                 copies global.css to public/admin/preview.css (runs before dev/build)
```

Run it: `npm install`, then `npm run dev` (http://localhost:4321) or `npm run build` (output in `dist/`). It builds cleanly (10 pages). Verified in a browser: blog search, tag filter and sort, post page with footnote/pull-quote/share buttons, and all routes.

**All text in `[square brackets]` is placeholder**, including the three sample posts, three issues and three events. Event "Upcoming/Past" is decided at build time.

### Not done yet
- **Editor panel sign-in:** the GitHub backend needs a small OAuth proxy (e.g. a Cloudflare Worker) before editors can log in at `/admin/`. Set `base_url` in `public/admin/config.yml` once it exists. The live preview, embed component and editorial workflow are written but **untested** until login works. (In `npm run dev`, `/admin/` returns 404 because of the trailing-slash setting; `/admin/index.html` works.)
- **Not deployed:** no Cloudflare Pages project is connected and the domain is not pointed at it.
- **Issue thumbnails:** currently the cover image if provided, else a coloured placeholder cover. Auto-generating a thumbnail from each PDF's first page is not built yet (default offered to the user; not yet confirmed).
- Real content, logo, social handles, email DNS (SPF/DKIM/DMARC), pagination for a very long blog list.

## 5. Open questions and next steps
Answered by the user: university (Jamia Millia Islamia); design (A); issues are PDF-only, opened in a new tab; blog is text-only with sort, tags, search; editors post everything, with draft/preview/publish; tags only (no categories); footnotes, pull-quotes, embeds; reading time and related posts; share buttons yes, comments no; byline only (no author pages, chosen by Claude).

**Still to ask or confirm:**
1. Do cover images exist for each issue, or should thumbnails be generated from each PDF's first page (default)?
2. How many past issues exist and how large are the PDFs (repo vs. Cloudflare R2)?
3. What each issue thumbnail should show (default: number, month and year, title).
4. Language: English only (default), or Hindi/Urdu too (needs right-to-left support and fonts)?
5. Keep Featured and In the Department; should Featured link to blog posts (default: yes)?
6. How to submit: email (default) or a Google Form link.
7. Permission to host outside contributors' work (e.g. Dr. Pogge).
8. Newsletter box (default: skip); logo (default: keep the wordmark and maroon); launch deadline.
9. Real content: About text, advisor's name, issue PDFs and titles, event photos and captions, social handles.
10. Confirm the domain and Spacemail purchases are done.

**Next technical steps:** create the GitHub and Cloudflare accounts under the department email with 2FA; deploy to Cloudflare Pages; add the domain to Cloudflare and point the nameservers; connect the domain; set up the editor-panel OAuth login and test the editorial workflow and previews; set up email forwarding and DNS (SPF/DKIM/DMARC), test both ways; write a handover doc (logins, how to publish an issue and a post, who renews the domain and when).

## 6. Working notes for the next Claude
- The user wants to be guided step by step and is building the site with Claude only.
- Priority: permanence and reliability (official site); avoid fragile or personally-owned setups. Ownership should sit with the department and a faculty advisor should hold the credentials in a handover doc.
- Do not enter payment or credentials on the user's behalf. The user makes purchases and account signups themselves.
- Prices in this document are estimates from a web search and the user's screenshots. Re-verify at checkout.
