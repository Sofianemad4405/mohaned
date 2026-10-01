import type { Service } from './types';

// Only services with proof in the portfolio. Each links to that proof.
export const services: Service[] = [
  {
    title: 'Long-form shows',
    body: 'Quiz and challenge formats cut from multicam studio footage, with the graphics that make a format readable.',
    evidence: [
      { label: '3×1 Challenge', href: '/work/3x1-challenge/' },
      { label: 'FPL weekly', href: '/work/fpl-weekly/' },
    ],
  },
  {
    title: 'Podcasts',
    body: 'Multi-host episodes up to three hours, kept moving with archive footage and clean camera choices.',
    evidence: [{ label: 'World Cup 26', href: '/work/world-cup-26/' }],
  },
  {
    title: 'Interviews & subtitles',
    body: 'Sit-down interviews cut for a different-language audience, with burnt-in Arabic subtitles.',
    evidence: [{ label: 'Seven Dogs', href: '/work/seven-dogs-interview/' }],
  },
  {
    title: 'Shorts & Reels',
    body: 'Vertical cuts with word-by-word captions, punch-in reframes and graphics that carry the joke.',
    evidence: [
      { label: 'Shorts', href: '/work/shorts/' },
      { label: 'Before / After', href: '/#before-after' },
    ],
  },
  {
    title: 'Motion graphics',
    body: 'Score bugs, segment stings and product reveals, built to match each show’s identity.',
    evidence: [{ label: 'Motion', href: '/#motion' }],
  },
  {
    title: 'Sponsor integrations',
    body: 'Brand segments that sit inside the show instead of interrupting it — for Tornado, Rexona, Clear and in-app partners.',
    evidence: [{ label: 'Shorts', href: '/work/shorts/' }],
  },
];
