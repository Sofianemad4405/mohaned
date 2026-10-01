/**
 * Everything about the person lives here. Anything in [SQUARE BRACKETS] is a
 * placeholder: it renders with a visible "needs info" style and is listed in
 * MISSING_INFORMATION.md. Set `showPlaceholders: false` to hide every
 * placeholder on the live site without deleting it.
 */
export const site = {
  showPlaceholders: true,

  // Name taken from the project folder ("mohaned gamal"); the Drive owner is
  // mohandg699@gmail.com. Confirm the preferred English spelling.
  name: 'Mohaned Gamal',
  initials: 'MG',
  role: 'Video Editor',
  // Specialisation is derived from the work in the Drive, not from a CV.
  specialisation: 'Football & creator YouTube',
  positioning:
    'I cut football shows, marathon podcasts, film interviews and the Shorts that come out of them — for Arabic YouTube channels with 1.7M, 1.1M and 647K subscribers.',
  location: '[LOCATION NEEDED]',
  availability: '[AVAILABILITY NEEDED — e.g. "Open to full-time & freelance"]',

  bio: [
    'Most of my timeline is football: quiz shows with live score graphics, weekly Fantasy Premier League breakdowns, World Cup podcasts that run close to three hours, and the vertical cuts that keep those shows alive between uploads.',
    '[SHORT BIO NEEDED — 2–3 sentences in your own voice: how you started, what you care about in an edit, who you enjoy working with.]',
  ],
  tools: [] as string[], // e.g. ['Premiere Pro', 'After Effects'] — confirm before adding
  toolsPlaceholder: '[SOFTWARE YOU USE NEEDED]',

  contact: {
    // Owner address of the shared Google Drive. Confirm it is the public one.
    email: 'mohandg699@gmail.com',
    whatsapp: '', // e.g. '+20XXXXXXXXXX'
    whatsappPlaceholder: '[WHATSAPP NUMBER NEEDED]',
  },

  socials: [
    { label: 'Instagram', href: '', placeholder: '[INSTAGRAM LINK NEEDED]' },
    { label: 'LinkedIn', href: '', placeholder: '[LINKEDIN LINK NEEDED]' },
  ] as { label: string; href: string; placeholder: string }[],

  // Brands listed under "brands I worked with" in eps.txt, spelled as the brands do.
  brands: ['Clear', 'Rexona', 'Tornado', 'YouTube', 'inDrive'],

  showreel: {
    // Leave empty until a real showreel exists; the site shows a hero loop
    // assembled from the Drive motion clips in the meantime.
    youtubeId: '',
    placeholder: '[SHOWREEL NEEDED — 60–90s, hosted on YouTube or Vimeo]',
  },

  seo: {
    title: 'Mohaned Gamal — Video Editor',
    description:
      'Video editor behind football shows, podcasts, interviews and Shorts for Erza3, Marwan Serry and Beta3 Aflam. 32 edits, 14M+ public views.',
  },
};

export type Site = typeof site;
