/**
 * Single place that turns media keys into URLs.
 *
 * Self-hosted clips live in /public/media and are addressed by a relative key
 * ("motion/mg-scoreboards.mp4"). To move them to a CDN (R2, S3, Bunny…), set
 * PUBLIC_MEDIA_BASE_URL — nothing else in the codebase changes.
 */
const base = (import.meta.env.PUBLIC_MEDIA_BASE_URL ?? '/media').replace(/\/$/, '');

export const mediaUrl = (key: string) => `${base}/${key.replace(/^\//, '')}`;

export const youtube = {
  watch: (id: string, kind: 'long' | 'short' = 'long') =>
    kind === 'short' ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
  embed: (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
};
