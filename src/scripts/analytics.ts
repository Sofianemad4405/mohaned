/**
 * Provider-agnostic event hook. Nothing is tracked unless an analytics script
 * (Plausible, GA4 / gtag, or a dataLayer) is added to the page.
 */
type Props = Record<string, string | number | undefined>;
type W = Window & {
  plausible?: (e: string, o?: { props?: Props }) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function track(event: string, props: Props = {}) {
  const w = window as W;
  w.plausible?.(event, { props });
  w.gtag?.('event', event, props);
  w.dataLayer?.push({ event, ...props });
}

export function initAnalytics() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-track]');
    if (el) track(el.dataset.track!, { where: el.dataset.trackWhere });
  });
}
