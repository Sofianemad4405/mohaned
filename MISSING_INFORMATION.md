# MISSING INFORMATION

Mohanad's answers (1 Oct 2026) are in. Placeholders are now off (`showPlaceholders: false` in `src/data/site.ts`), so nothing unfinished shows on the site.

## Done

- Name: Mohanad Gamal
- Email: `mohandg699@gmail.com` (confirmed)
- Role: Video editor & motion graphics designer; **Senior Video Editor at Arcade Films**
- Bio: "Video editor. Creating my own way. 🎬"
- Services: video editing, color grading, motion graphics
- Tools: Adobe Premiere Pro, Adobe After Effects
- Location: Cairo, Egypt
- Availability: available for freelance
- Socials: Instagram only (LinkedIn and WhatsApp removed)
- Case studies: removed at his request. Project rows link to their top video on YouTube.
- Brands (21): FIFA World Cup Qatar 2022, Google, Samsung, adidas, Red Bull, YouTube, Gemini, Gillette, Lenovo, OPPO, Rexona, Clear, Emaar, talabat, inDrive, General Entertainment Authority, B.TECH, Palm Hills, O West, Tornado, Fury. Shown A–Z. 18 logos are official files from Wikimedia Commons, recolored by `scripts/recolor-logos.py`; Fury, O West and Tornado were supplied as JPEGs and traced to SVG by `scripts/trace-logos.py` (originals in `raw/logos/`)
- Photo: in the hero and the About section
- Site: live at https://mohanad-gamal.vercel.app/ (deploys on every push to `main`)
- Video order: his 7 picks lead the home page and /work/, in his order (`picks` in `src/data/projects.ts`)

## Still needed

| What                                                                                | Where it goes                               | Why                                                                                                            | Format                                       |
| ----------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Instagram profile URL**                                                           | `site.socials` in `src/data/site.ts`        | He asked for Instagram as the only social link, but the link wasn't included. It stays hidden until it's added | Full URL, e.g. `https://www.instagram.com/…` |
| **The other before/after videos**                                                   | `public/media/before-after/` + a switcher under the slider | Only one comparison reel (`before after/1.mp4`) is in the Drive. The switcher is built once there are two or more | Raw + final MP4 of the same section, or a side-by-side reel |
| **The other 10 motion graphics videos** (13 in total)                               | `public/media/motion/` + `src/data/motion.ts` | Only 3 are in the Drive's `mg` folder (jersey podium, FPL transition, scoreboards)                            | MP4, any size                                |

## Optional

| What                                                                                              | Where it goes                                                | Format                                             |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| Showreel                                                                                          | Hero ("Watch the showreel" button)                           | YouTube ID → `site.showreel.youtubeId`             |
| Contact form endpoint                                                                             | Contact form (otherwise it opens a pre-filled Gmail compose) | Formspree / Web3Forms URL → `PUBLIC_FORM_ENDPOINT` |
| Separate raw and final files for the before/after                                                 | Before/After slider (sharper raw side)                       | Two MP4s of the same section                       |
