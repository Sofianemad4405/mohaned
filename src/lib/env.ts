import type { ImageOutputFormat } from 'astro';

/**
 * ARTIFACT builds (PUBLIC_ARTIFACT=1) target the claude.ai artifact viewer:
 * no third-party iframes (YouTube opens in a new tab), no mail hand-off,
 * one image size per picture, and no scroll-triggered hiding.
 */
export const ARTIFACT = import.meta.env.PUBLIC_ARTIFACT === '1';

/** Picture props: full responsive set on the real site, one WebP for the artifact. */
export function pic(widths: number[]): { widths: number[]; formats: ImageOutputFormat[]; fallbackFormat?: ImageOutputFormat } {
  if (!ARTIFACT) return { widths, formats: ['avif', 'webp'] };
  const one = [...widths].filter((w) => w <= 800).pop() ?? widths[0];
  return { widths: [one], formats: ['webp'], fallbackFormat: 'webp' };
}

/** In the artifact build a play control is a plain link to YouTube (new tab). */
export function ytOut(id: string, kind: 'long' | 'short') {
  return {
    href: kind === 'short' ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
    target: '_blank',
    rel: 'noopener',
    'data-cursor': 'YouTube ↗',
  } as const;
}
