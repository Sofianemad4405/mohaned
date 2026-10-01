import { $, $$ } from './env';
import { track } from './analytics';

const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function makeIframe(id: string, title: string) {
  const f = document.createElement('iframe');
  f.src = embedUrl(id);
  f.title = title;
  f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  f.allowFullscreen = true;
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  return f;
}

function load(root: HTMLElement, id: string, label: string) {
  const frame = $('.yt__frame', root)!;
  const existing = $<HTMLIFrameElement>('iframe', frame);
  root.dataset.yt = id;
  const ext = $<HTMLAnchorElement>('[data-yt-ext]', root);
  if (ext) ext.href = `https://www.youtube.com/watch?v=${id}`;
  track('video_play', { where: id });
  if (existing) {
    existing.src = embedUrl(id);
    existing.title = `YouTube player: ${label}`;
    return;
  }
  root.classList.add('is-loading');
  const iframe = makeIframe(id, `YouTube player: ${label}`);
  iframe.addEventListener('load', () => root.classList.remove('is-loading'), { once: true });
  $('[data-yt-play]', frame)?.remove();
  frame.prepend(iframe);
  iframe.focus();
}

/** The button's spoken name lives in its visually-hidden span. */
const nameOf = (el: Element) => el.querySelector('.visually-hidden')?.textContent?.trim() || 'video';

export function initYouTube() {
  document.addEventListener('click', (e) => {
    const target = e.target as Element;

    const play = target.closest<HTMLElement>('[data-yt-play]');
    if (play) {
      const root = play.closest<HTMLElement>('[data-yt]')!;
      load(root, root.dataset.yt!, nameOf(play));
      return;
    }

    const sw = target.closest<HTMLButtonElement>('[data-yt-switch]');
    if (sw) {
      const group = sw.dataset.ytSwitch!;
      const root = $<HTMLElement>(`[data-yt-group="${group}"]`);
      if (!root) return;
      $$(`[data-yt-switch="${group}"]`).forEach((b) => b.setAttribute('aria-pressed', String(b === sw)));
      load(root, sw.dataset.ytId!, nameOf(sw));
      const r = root.getBoundingClientRect();
      if (r.top < 0 || r.bottom > innerHeight) root.scrollIntoView({ block: 'center' });
    }
  });
}
