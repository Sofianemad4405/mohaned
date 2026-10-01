# Mohaned Gamal: video editor portfolio

Static Astro site. No framework runtime: about 14 KB of vanilla JS in total, CSS inlined, and every image optimised to AVIF/WebP at build time.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview
npm run check      # type-check
```

Set `SITE_URL` before a production build (see `.env.example`). Deploy `dist/` to any static host (Cloudflare Pages, Netlify, Vercel). Use a host that serves gzip/brotli, because the HTML carries the inlined CSS.

## Where things live

| Change… | Edit |
|---|---|
| Name, bio, contact, socials, brands, showreel, SEO copy | `src/data/site.ts` |
| Projects, episode order, labels, case notes, role | `src/data/projects.ts` |
| Video titles and view counts (generated snapshot) | `src/data/videos.ts` |
| Channels and subscriber counts | `src/data/channels.ts` |
| Motion clips | `src/data/motion.ts` |
| Services (each links to its proof) | `src/data/services.ts` |
| Colours, type scale, spacing, motion timings | `src/styles/global.css` (`:root` tokens) |

**Placeholders.** Any copy written as `[LIKE THIS]` renders with a dashed "needs info" style. Set `showPlaceholders: false` in `site.ts` to hide them all. The full list is in `MISSING_INFORMATION.md`.

## Media

- **YouTube videos** use a click-to-load facade (`YouTubePlayer.astro`): just the poster until someone presses play, then a `youtube-nocookie` iframe. Thumbnails are self-hosted in `src/assets/thumbs/` (`short_<id>.jpg` for vertical covers).
- **Self-hosted clips** live in `public/media/{hero,before-after,motion}` and are referenced by key through `src/lib/media.ts`. To move them to a CDN (R2, S3, Bunny…), upload the folder and set `PUBLIC_MEDIA_BASE_URL`. No component changes.
- **Posters** for self-hosted clips are in `src/assets/media/` and optimised at build.
- **Originals** from the Google Drive are in `raw/drive/` (git-ignored, not deployed).

### Re-encoding (ffmpeg)

```bash
# Before/after: both panels are cropped from the same comparison reel, so they stay frame-locked
ffmpeg -i raw/drive/before-after-1.mp4 -vf "crop=708:830:344:240,scale=576:676" -c:v libx264 -crf 29 -c:a aac -b:a 96k -movflags +faststart public/media/before-after/ba-after.mp4
ffmpeg -i raw/drive/before-after-1.mp4 -vf "crop=347:407:86:1117,scale=576:676" -an -c:v libx264 -crf 30 -movflags +faststart public/media/before-after/ba-before.mp4
```

When separate raw and final files arrive, encode each to the same size and replace those two files.

### Refreshing view counts

`src/data/videos.ts` is a snapshot. Re-run with `yt-dlp --skip-download --print "%(id)s|%(duration)s|%(upload_date)s|%(view_count)s|…"` over the IDs, then update `STATS_SNAPSHOT_DATE`. Every view count on the site is labelled with this date.

### Social cards & icons

`scripts/make-brand-assets.py` builds the favicon, app icons and the `public/og/*.jpg` share cards from the site font and real thumbnails. Re-run it after changing the name or projects (needs `fonttools`, `brotli`, `pillow`).

## Behaviour notes

- Video only autoplays muted, only while on screen, and never with `prefers-reduced-motion` or Save-Data. Every autoplaying video has a pause control.
- The hero loop starts after the page has loaded, so the poster stays the LCP. Phones get the 480p file.
- Analytics: `src/scripts/analytics.ts` forwards `data-track` events to Plausible, `gtag` or `dataLayer` if one is installed. Otherwise it does nothing.
- Contact form: posts JSON to `PUBLIC_FORM_ENDPOINT` if set. Otherwise it opens the visitor's email app with the brief pre-filled. It has a honeypot field for spam.
