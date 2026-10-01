const millions = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const thousands = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 0 });

/** 3286049 → "3.3M", 905479 → "905K" */
export const compact = (n: number) => (n >= 1e6 ? millions : thousands).format(n);

/** 6772 → "1:52:52", 118 → "1:58" */
export function duration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

/** 6772 → "1 h 53 min" */
export function durationWords(sec: number) {
  const mins = Math.round(sec / 60);
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)} h ${String(mins % 60).padStart(2, '0')} min`;
}

export const monthYear = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const longDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Seconds → broadcast timecode "00:00:08:12" at 25 fps. */
export function timecode(sec: number, fps = 25) {
  const f = Math.floor((sec % 1) * fps);
  const t = Math.floor(sec);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}:${p(f)}`;
}

/** True when a copy string is an unfilled placeholder like "[EMAIL NEEDED]". */
export const isPlaceholder = (s: string | undefined | null) => !!s && /^\[.*\]$/s.test(s.trim());
