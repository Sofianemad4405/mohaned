import type { Channel, ChannelKey } from './types';

// Public subscriber counts from the same 2026-09-30 snapshot as videos.ts.
export const channels: Record<ChannelKey, Channel> = {
  erza3: {
    key: 'erza3',
    name: 'Erza3',
    nameAr: 'ارزع',
    url: 'https://www.youtube.com/@erza3ma3serry',
    subscribers: 1_700_000,
  },
  marwanSerry: {
    key: 'marwanSerry',
    name: 'Marwan Serry',
    nameAr: 'مروان سري',
    url: 'https://www.youtube.com/@Marwanserry',
    subscribers: 1_120_000,
  },
  beta3Aflam: {
    key: 'beta3Aflam',
    name: 'Beta3 Aflam',
    nameAr: 'بتاع افلام',
    url: 'https://www.youtube.com/@Beta3aflam',
    subscribers: 647_000,
  },
};
