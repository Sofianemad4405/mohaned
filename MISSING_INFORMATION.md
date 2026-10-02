# MISSING INFORMATION

Mohaned's answers (1 Oct 2026) are in. Placeholders are now off (`showPlaceholders: false` in `src/data/site.ts`), so nothing unfinished shows on the site.

## Done

- Email: `mohandg699@gmail.com` (confirmed)
- Role: Video editor & motion graphics designer; **Senior Video Editor at Arcade Films**
- Bio: "Video editor. Creating my own way. 🎬"
- Services: video editing, color grading, motion graphics
- Tools: Adobe Premiere Pro, Adobe After Effects
- Location: Cairo, Egypt
- Availability: available for freelance
- Socials: Instagram only (LinkedIn and WhatsApp removed)
- Case studies: removed at his request. Project rows link to their top video on YouTube.
- Brands (21): FIFA World Cup Qatar 2022, Google, Samsung, adidas, Red Bull, YouTube, Gemini, Gillette, Lenovo, OPPO, Rexona, Clear, Emaar, talabat, inDrive, General Entertainment Authority, B.TECH, Palm Hills, O West, Tornado, Fury. Logos are official files from Wikimedia Commons (originals in `raw/logos/`), recolored for the dark theme by `scripts/recolor-logos.py`
- Photo: in the hero and the About section

## Still needed

| What | Where it goes | Why | Format |
|---|---|---|---|
| **Instagram profile URL** | `site.socials` in `src/data/site.ts` | He asked for Instagram as the only social link, but the link wasn't included. It stays hidden until it's added | Full URL, e.g. `https://www.instagram.com/…` |
| **Name spelling**: his WhatsApp shows "Mohand Gamal"; the site says "Mohaned Gamal" | Nav, hero, footer, page titles, share image | It's the first thing anyone reads | The exact English spelling |
| **Production domain** (before going live) | `SITE_URL` at build time | Canonical links, social previews and the sitemap currently use `example.com` | `https://…` |

## Optional

| What | Where it goes | Format |
|---|---|---|
| Showreel | Hero ("Watch the showreel" button) | YouTube ID → `site.showreel.youtubeId` |
| Contact form endpoint | Contact form (otherwise it opens a pre-filled Gmail compose) | Formspree / Web3Forms URL → `PUBLIC_FORM_ENDPOINT` |
| Logos for O West, Tornado and Fury (shown as typeset names for now), and which "Fury" brand it is | Brand wall | Official logo files only | SVG or transparent PNG |
| Separate raw and final files for the before/after | Before/After slider (sharper raw side) | Two MP4s of the same section |
