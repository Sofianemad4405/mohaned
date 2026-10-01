import { $, $$ } from './env';

export function initNav() {
  const nav = $('[data-nav]');
  if (!nav) return;

  // Solid bar once the page moves.
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu.
  const toggle = $<HTMLButtonElement>('[data-nav-toggle]', nav)!;
  const menu = $('[data-nav-menu]', nav)!;
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) $<HTMLAnchorElement>('a', menu)?.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('[data-nav-close]', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && setOpen(false));

  // Active section (home page only).
  const links = $$<HTMLAnchorElement>('[data-nav-link]', nav);
  const sections = links
    .map((l) => document.getElementById(l.dataset.navLink!))
    .filter((s): s is HTMLElement => Boolean(s));
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((l) => (l.dataset.navLink === e.target.id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
