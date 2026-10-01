import { $, $$ } from './env';

export function initRails() {
  for (const rail of $$('[data-rail]')) {
    const track = $('[data-rail-track]', rail)!;
    const prev = $<HTMLButtonElement>('[data-rail-prev]', rail)!;
    const next = $<HTMLButtonElement>('[data-rail-next]', rail)!;
    const page = (dir: number) => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
    prev.addEventListener('click', () => page(-1));
    next.addEventListener('click', () => page(1));
    let queued = false;
    const state = () => {
      queued = false;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    track.addEventListener('scroll', () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(state);
      }
    }, { passive: true });
    state();
  }
}
