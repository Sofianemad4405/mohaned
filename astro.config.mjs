// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL to the production domain before deploying (used for canonical
// URLs, Open Graph and the sitemap).
const site = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
