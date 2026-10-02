// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL for canonical links, Open Graph and the sitemap. SITE_URL wins;
// on Vercel it falls back to the project's production domain.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL || (vercel ? `https://${vercel}` : 'https://example.com');

export default defineConfig({
  site,
  // The artifact build (PUBLIC_ARTIFACT=1) goes to its own folder; see scripts/make-artifact.py
  outDir: process.env.PUBLIC_ARTIFACT === '1' ? './dist-artifact' : './dist',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
