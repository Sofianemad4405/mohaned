import type { Service } from './types';

// The three services Mohaned offers, each linked to work on the page.
export const services: Service[] = [
  {
    title: 'Video editing',
    body: 'Long-form shows, podcasts up to three hours, interviews and vertical Shorts.',
    evidence: [
      { label: 'Selected work', href: '/#work' },
      { label: 'Every edit', href: '/work/' },
    ],
  },
  {
    title: 'Color grading',
    body: 'Matching cameras and setting the look, so every angle and every episode reads as one show.',
    evidence: [{ label: 'Before / After', href: '/#before-after' }],
  },
  {
    title: 'Motion graphics',
    body: 'Score bugs, segment stings, kit reveals and captions, designed and animated in After Effects.',
    evidence: [{ label: 'Motion', href: '/#motion' }],
  },
];
