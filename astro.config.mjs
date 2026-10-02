// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL to the production domain before deploying (used for canonical
// URLs, Open Graph and the sitemap).
const site = process.env.SITE_URL || 'https://example.com';

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
