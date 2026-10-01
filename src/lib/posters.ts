import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

// Poster frames extracted from the Drive clips (see raw/drive), optimised at build.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/media/*.jpg', { eager: true });

export function poster(name: string): ImageMetadata {
  const hit = Object.entries(files).find(([p]) => p.endsWith(`/${name}.jpg`));
  if (!hit) throw new Error(`Missing poster ${name}`);
  return hit[1].default;
}

/** A single optimised URL, for places that need a string (video poster attr). */
export async function posterUrl(name: string, width = 1280) {
  const img = await getImage({ src: poster(name), width, format: 'webp', quality: 72 });
  return img.src;
}
