import type { MotionPiece } from './types';

// Clips from the "mg" folder in the Drive, re-encoded for the web (see raw/drive).
export const motion: MotionPiece[] = [
  {
    slug: 'jersey-podium',
    title: 'Jersey podium',
    description: 'A World Cup 26 kit reveal: the cut leaves the host for a retro “26” backdrop, the shirt fades up on a plinth and a callout zooms into the detail.',
    video: 'motion/mg-jersey-podium.mp4',
    poster: 'mg-jersey-podium-poster',
    width: 1280,
    height: 720,
    durationSec: 4.6,
  },
  {
    slug: 'fpl-transition',
    title: '“تكبتن مين” sting',
    description: 'A branded segment transition for the FPL show: diagonal slash wipes in, the captain badge lands, and the wipe carries back out to the host.',
    video: 'motion/mg-fpl-transition.mp4',
    poster: 'mg-fpl-transition-poster',
    width: 1280,
    height: 720,
    durationSec: 1.5,
  },
  {
    slug: 'scoreboards',
    title: 'Scoreboard package',
    description: 'Four animated score bugs in four visual languages: Egyptian League, AFCON, World Cup and Premier League.',
    video: 'motion/mg-scoreboards.mp4',
    poster: 'mg-scoreboards-poster',
    width: 1280,
    height: 974,
    durationSec: 2.2,
  },
];

export const getMotion = (slug: string) => motion.find((m) => m.slug === slug);
