import { $, finePointer, prefersReducedMotion } from './env';

/** Contextual label that follows the pointer over [data-cursor] targets. The system cursor stays visible. */
export function initCursor() {
  const el = $('.cursor');
  if (!el || !finePointer || prefersReducedMotion) return;
  const label = $('.cursor__label', el)!;
  let x = -100;
  let y = -100;
  let queued = false;

  const paint = () => {
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    queued = false;
  };
  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    if (t) {
      label.textContent = t.dataset.cursor!;
      el.classList.add('is-on');
    } else el.classList.remove('is-on');
  });
  document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-on'));
}
