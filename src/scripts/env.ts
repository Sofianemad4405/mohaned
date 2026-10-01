const mq = (q: string) => typeof matchMedia === 'function' && matchMedia(q).matches;

/** Motion and data preferences, read once per page. */
export const prefersReducedMotion = mq('(prefers-reduced-motion: reduce)');
export const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
/** True when background video may autoplay. */
export const canAutoplay = !prefersReducedMotion && !saveData;
export const finePointer = mq('(hover: hover) and (pointer: fine)');

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Broadcast timecode at 25 fps. */
export function timecode(sec: number) {
  const f = Math.floor((sec % 1) * 25);
  const t = Math.floor(sec);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}:${p(f)}`;
}

/** Assign a deferred data-src once. */
export function ensureSrc(video: HTMLVideoElement, src = video.dataset.src) {
  if (src && !video.getAttribute('src')) {
    video.src = src;
    video.preload = 'auto';
  }
}

/** play() that never throws (autoplay policies, missing files). */
export async function safePlay(video: HTMLVideoElement) {
  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
}
