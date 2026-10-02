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

const ARTIFACT = import.meta.env.PUBLIC_ARTIFACT === '1';
const loading = new WeakMap<HTMLVideoElement, Promise<boolean>>();

/** Point the video at a URL and wait until it can show a frame. */
function tryUrl(video: HTMLVideoElement, url: string) {
  return new Promise<boolean>((resolve) => {
    const done = (ok: boolean) => {
      clearTimeout(timer);
      video.removeEventListener('loadeddata', onOk);
      video.removeEventListener('error', onErr);
      resolve(ok);
    };
    const onOk = () => done(true);
    const onErr = () => done(false);
    const timer = setTimeout(() => done(video.readyState >= 2), 15000);
    video.addEventListener('loadeddata', onOk);
    video.addEventListener('error', onErr);
    video.preload = 'auto';
    video.src = url;
    video.load();
  });
}

const toDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });

async function load(video: HTMLVideoElement, src: string) {
  if (!ARTIFACT) return tryUrl(video, src);
  // The artifact viewer blocks media URLs but allows fetch() of the page's own
  // files: play from a blob, then a data: URL, then the plain URL.
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(String(res.status));
    const raw = await res.blob();
    const blob = raw.type.startsWith('video/') ? raw : new Blob([raw], { type: 'video/mp4' });
    if (await tryUrl(video, URL.createObjectURL(blob))) return true;
    if (await tryUrl(video, await toDataUrl(blob))) return true;
  } catch {
    /* fall through */
  }
  return tryUrl(video, src);
}

/** Point a deferred video at a new source (and poster); the next ensureSrc loads it. */
export function swapSrc(video: HTMLVideoElement, src: string, poster?: string) {
  video.pause();
  loading.delete(video);
  video.dataset.src = src;
  if (poster) video.poster = poster;
  video.removeAttribute('src');
  video.load();
}

/** Load a deferred video source once; resolves true when it can play. */
export function ensureSrc(video: HTMLVideoElement, src = video.dataset.src) {
  if (!src) return Promise.resolve(false);
  let p = loading.get(video);
  if (!p) {
    p = load(video, src);
    loading.set(video, p);
  }
  return p;
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
