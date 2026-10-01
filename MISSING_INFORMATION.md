# MISSING INFORMATION

Everything the site still needs. Every item already has a styled placeholder on the page (dashed yellow-green box), so the site works today. To hide all placeholders before the answers arrive, set `showPlaceholders: false` in `src/data/site.ts`.

**Source of everything else on the site:** the Google Drive folder (`eps.txt`, `before after/1.mp4`, `mg/*.mp4`), plus public YouTube metadata for the 32 linked videos (snapshot taken 30 Sep 2026). Nothing has been invented. View counts are public numbers, labelled with their date.

---

## Critical: before publishing

| # | What's missing | Where it's used | Why it matters | Format |
|---|---|---|---|---|
| 1 | **Production domain** | Canonical URLs, Open Graph, sitemap, robots | Shared links and SEO currently point at `example.com` | Set `SITE_URL=https://…` at build time (see `.env.example`) |
| 2 | **Confirm the name spelling**: "Mohaned Gamal"? (The Drive owner is `mohandg699@…`, which could be "Mohand" or "Mohanad") | Nav, hero, footer, title tags, OG images, favicon | It's the first thing anyone reads | Exact English spelling. Arabic spelling too, if wanted on the site |
| 3 | **Confirm the public email**: currently `mohandg699@gmail.com`, taken from the Drive owner | Contact section, footer, form hand-off, JSON-LD | Clients will write here | The address to publish |
| 4 | **Role on each project**: what did he actually do? Full edit, graphics, Shorts only? | "My role" on all 6 case pages | Recruiters need to know his contribution, not just the channel's success | One line per project, e.g. "Lead editor + motion graphics" |
| 5 | **Confirm before/after source**: is `before after/1.mp4` his edit of a Tornado FPL Short? | Before/After section | It's the main proof of skill on the page | Yes/no, plus the YouTube link of the final Short if it's published |

## Recommended: makes it much stronger

| # | What's missing | Where it's used | Why it matters | Format |
|---|---|---|---|---|
| 6 | **Showreel** | Hero (replaces the motion-graphics loop), "Watch the showreel" button | The fastest way to judge an editor | 60–90 s on YouTube/Vimeo → paste the ID into `site.showreel.youtubeId` |
| 7 | **Short bio** in his own voice | About section | The current About text is factual, but nobody's voice | 2–3 sentences |
| 8 | **Software / tools** | About → Tools | Studios filter by it (Premiere, After Effects, Resolve…) | A plain list. No skill percentages |
| 9 | **Location / time zone** | About, footer | Clients need to know about remote vs on-site | City, country |
| 10 | **Availability** | About | Tells a recruiter whether to reach out now | e.g. "Open to full-time & freelance from Nov 2026" |
| 11 | **Instagram / LinkedIn / WhatsApp** | Contact, footer | Many clients will message rather than email | Full URLs; WhatsApp with country code |
| 12 | **Case notes** for each project: brief, footage received, key decisions | "Case notes" on every case page | This turns a list of videos into evidence of thinking | 2–4 short lines per project |
| 13 | **Employer / network**: the Seven Dogs video opens on an **Arcade Films** ident listing Erza3, Marwan Serry and Beta3 Aflam. Does he work for Arcade Films? Job title? | About, hero line, case pages | "Editor at Arcade Films" is stronger than a list of channels | Company, title, dates |
| 14 | **The other before/after material**: separate raw and final files at full resolution | Before/After slider | The raw panel currently comes from a small inset, so it is softer than the camera original | Raw + final MP4s of the same section, same length |
| 15 | **Contact form endpoint** | Contact form | Without it, the form opens the visitor's email app (works, but adds friction) | A Formspree / Web3Forms / Basin URL → `PUBLIC_FORM_ENDPOINT` |

## Optional: nice to have

| # | What's missing | Where it's used | Why it matters | Format |
|---|---|---|---|---|
| 16 | **Testimonial** from Marwan Serry or a producer | Could sit above Contact | Social proof from a named person carries weight | Quote + name + role, with permission |
| 17 | **Portrait photo** | About | Puts a face to the work | JPG, at least 1200 px, natural light |
| 18 | **Brand logos** (Clear, Rexona, Tornado, YouTube, inDrive) | "Brands I've worked with" | Currently set as type, on purpose. Only use logo files you're allowed to use | SVG, with permission |
| 19 | **What he did for each brand**: integration, ad, segment? | Brands row, Services | Makes the brand list concrete | One line each |
| 20 | **Retention / CTR data** from YouTube Studio | Case pages ("Result") | Views are reach; retention shows editing | Screenshots or numbers per video |
| 21 | **Budget ranges / currency** for the form | Contact form options | The current USD ranges are generic | List of ranges |
| 22 | **Analytics choice** (Plausible, GA4…) | Site-wide | Events are already wired up (showreel play, video play, project open, contact clicks, form submit) | Script snippet or site ID |
| 23 | **Where "mohand" (مهند) in 3×1 S3 Ep 7 is him** | 3×1 case page | If he appeared on screen as a guest, that's a great detail | Yes/no |

---

## Assets that could not be used directly

- **Instagram reel** (`DPZRoxLiBXm`, posted by Omar Khaled): shown with its cover and like count; it links out to Instagram (no embed). Instagram doesn't publish view counts, so none is shown.
- **All Drive videos were accessible.** The originals are kept in `raw/drive/` (git-ignored). The web versions in `public/media/` were re-encoded from them.
