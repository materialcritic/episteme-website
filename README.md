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

## 4. Files created (in this folder)
Three static HTML design mockups. Each is a single self-contained file (inline CSS, Google Fonts via link), responsive, with placeholder text in `[square brackets]`:

| File | Style |
|---|---|
| `option-a-classic.html` | **Classic Journal**: cream paper, Playfair Display and Source Serif, maroon accent, newspaper-style masthead |
| `option-b-modern.html` | **Modern Editorial**: white, big Fraunces headlines, orange accent, horizontally scrolling issue covers, event timeline |
| `option-c-scholar.html` | **Dark Scholar**: navy background, gold accents, Cormorant Garamond and Lora, framed issue covers |

Each has: header/nav, hero, Featured (Dr. Pogge slot as the primary card), About, Past Editions (3 placeholder issues plus "coming soon"), In the Department (photo, date, title and caption per event, past and upcoming), Reach Out (`editor@epistemejamia.in` placeholder), and a footer with Instagram / LinkedIn / X / YouTube placeholders. If this handoff is used in a chat without file access, the user should attach these three HTML files.

Claude's recommendation: **Option A or C** (serious, journal-like, good for an official university site). B is the freshest but reads more startup-like. The user has **not yet picked** an option.

## 5. Open questions and next steps
1. **Which university?** Jamia Millia Islamia or Jamia Hamdard?
2. **Which design** (A, B, C, or a mix, e.g. A's layout with C's colours)?
3. **Issues as PDF or web-readable articles?** PDF is faster to set up. Web articles are better for search and sharing.
4. How comfortable are the student editors with tech (decides the CMS choice)?
5. Real content needed: About text, advisor's name, issue titles and covers, PDFs or articles, event photos and captions, social handles, logo, colour preferences.
6. Confirm the domain purchase is done (Spaceship, department email, 2FA, auto-renew).
7. Next technical steps: create the GitHub and Cloudflare accounts under the department email with 2FA, add the domain to Cloudflare and point the nameservers, build the chosen design as an Astro project with Decap CMS, connect the domain, set up email forwarding (test both ways), and write a handover doc (logins, how to publish an issue, who renews the domain and when).

## 6. Working notes for the next Claude
- The user wants to be guided step by step and is building the site with Claude only.
- Priority: permanence and reliability (official site); avoid fragile or personally-owned setups. Ownership should sit with the department and a faculty advisor should hold the credentials in a handover doc.
- Do not enter payment or credentials on the user's behalf. The user makes purchases and account signups themselves.
- Prices in this document are estimates from a web search and the user's screenshots. Re-verify at checkout.
