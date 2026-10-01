import type { ImageMetadata } from 'astro';

// Posters for every video, pulled from YouTube / Instagram at snapshot time.
// Vertical covers are stored as short_<id>.jpg, the Instagram reel as ig_<id>.jpg.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/thumbs/*.jpg', { eager: true });

const map = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.jpg$/, '');
  map.set(name, mod.default);
}

export function thumb(id: string, variant: 'wide' | 'tall' = 'wide'): ImageMetadata {
  const key = variant === 'tall' ? (map.has(`short_${id}`) ? `short_${id}` : `ig_${id}`) : id;
  const img = map.get(key);
  if (!img) throw new Error(`Missing thumbnail for ${key}`);
  return img;
}
