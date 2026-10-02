import { $, ensureSrc, safePlay } from './env';
import { makeIframe } from './youtube';
import { track } from './analytics';

/** Shared dialog for vertical Shorts and self-hosted reels. */
export function initModal() {
  const dialog = $<HTMLDialogElement>('[data-modal]');
  if (!dialog) return;
  const stage = $('[data-modal-stage]', dialog)!;
  const title = $('[data-modal-title]', dialog)!;
  const ext = $<HTMLAnchorElement>('[data-modal-ext]', dialog)!;
  let opener: HTMLElement | null = null;

  const close = () => dialog.open && dialog.close();

  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    document.documentElement.style.overflow = '';
    opener?.focus();
  });
  $('[data-modal-close]', dialog)!.addEventListener('click', close);
  // Click on the backdrop (the dialog box itself, outside the inner panel).
  dialog.addEventListener('click', (e) => e.target === dialog && close());

  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-modal-yt], [data-modal-video]');
    if (!el) return;
    e.preventDefault();
    opener = el;
    const label = el.dataset.modalLabel || 'Video';
    dialog.dataset.orient = el.dataset.modalOrient ?? 'wide';
    title.textContent = label;

    if (el.dataset.modalYt) {
      const id = el.dataset.modalYt;
      stage.replaceChildren(makeIframe(id, `YouTube player: ${label}`));
      ext.href = dialog.dataset.orient === 'tall' ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
      ext.hidden = false;
      track('video_play', { where: id });
    } else {
      const v = document.createElement('video');
      if (el.dataset.modalPoster) v.poster = el.dataset.modalPoster;
      v.controls = true;
      v.playsInline = true;
      v.setAttribute('aria-label', label);
      stage.replaceChildren(v);
      ensureSrc(v, el.dataset.modalVideo).then((ok) => {
        if (ok) return safePlay(v);
        const p = document.createElement('p');
        p.className = 'label';
        p.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;color:var(--muted)';
        p.textContent = 'This video could not be loaded. Please try again later.';
        stage.replaceChildren(p);
      });
      ext.hidden = true;
    }
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    $<HTMLElement>('[data-modal-close]', dialog)!.focus();
  });
}
