/**
 * Everything about the person lives here. Copy written as [SQUARE BRACKETS] is
 * a placeholder: hidden while `showPlaceholders` is false, and listed in
 * MISSING_INFORMATION.md.
 */
export const site = {
  showPlaceholders: false,

  name: 'Mohaned Gamal',
  initials: 'MG',
  role: 'Video Editor & Motion Graphics Designer',
  position: { title: 'Senior Video Editor', company: 'Arcade Films' },
  specialisation: 'Football & creator YouTube',
  positioning:
    'I cut football shows, marathon podcasts, film interviews and the Shorts that come out of them — for Arabic YouTube channels with 1.7M, 1.1M and 647K subscribers.',
  location: 'Cairo, Egypt',
  availability: 'Available for freelance',

  bio: 'Video editor. Creating my own way. 🎬',
  about:
    'Most of my timeline is football: quiz shows with live score graphics, weekly Fantasy Premier League breakdowns, World Cup podcasts that run close to three hours, and the vertical cuts that keep those shows alive between uploads.',
  tools: ['Adobe Premiere Pro', 'Adobe After Effects'],

  contact: {
    email: 'mohandg699@gmail.com',
  },

  // Only Instagram, per Mohaned. Paste the profile URL here to show it everywhere.
  socials: [{ label: 'Instagram', href: '' }] as { label: string; href: string }[],

  showreel: {
    // Leave empty until a showreel exists; the hero shows a motion-work loop meanwhile.
    youtubeId: '',
    placeholder: '[SHOWREEL NEEDED — 60–90s, hosted on YouTube or Vimeo]',
  },

  seo: {
    title: 'Mohaned Gamal — Video Editor & Motion Graphics Designer',
    description:
      'Senior video editor at Arcade Films, Cairo. Shows, podcasts, Shorts and motion graphics for brands including Google, Samsung, adidas, Red Bull and the FIFA World Cup 2022.',
  },
};

export type Site = typeof site;
