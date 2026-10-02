import { $, canAutoplay, ensureSrc, safePlay, timecode } from './env';
import { track } from './analytics';

/** Hero loop: loads after the page is interactive, plays only while visible. */
export function initHero() {
  const root = $('[data-hero]');
  const video = $<HTMLVideoElement>('[data-hero-video]', root ?? document);
  if (!root || !video) return;
  const btn = $<HTMLButtonElement>('[data-hero-toggle]', root)!;
  const label = $('[data-hero-toggle-label]', root)!;
  const tc = $('[data-timecode]', root);

  let userPaused = !canAutoplay;
  let visible = true;

  const load = () => ensureSrc(video, matchMedia('(max-width: 768px)').matches ? video.dataset.srcSmall : video.dataset.srcLarge);
  const sync = () => {
    const paused = video.paused;
    btn.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Play background video' : 'Pause background video';
  };
  const update = async () => {
    if (!userPaused && visible) {
      await load();
      if (!userPaused && visible) await safePlay(video);
    } else video.pause();
    sync();
  };

  btn.hidden = false;
  sync();
  btn.addEventListener('click', () => {
    userPaused = !video.paused ? true : false;
    if (!userPaused) track('hero_play');
    update();
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);

  // Timecode follows the actual frame being shown.
  if (tc) {
    const tick = () => {
      tc.textContent = timecode(video.currentTime);
      if (!video.paused) schedule();
    };
    const v = video as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    const schedule = () => (v.requestVideoFrameCallback ? v.requestVideoFrameCallback(tick) : requestAnimationFrame(tick));
    video.addEventListener('play', schedule);
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    update();
  }).observe(root);

  // Keep the poster as the LCP; start the loop once the page has settled.
  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(() => update(), { timeout: 1500 }) : setTimeout(update, 600));
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
