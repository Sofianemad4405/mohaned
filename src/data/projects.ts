import type { CaseNote, Project } from './types';

/**
 * Case-study notes only the editor can answer. Kept as placeholders so the
 * page layout is final; replace the bracketed text when the answers arrive.
 */
const notesNeeded = (brief: string): CaseNote[] => [
  { label: 'The brief', body: `[BRIEF NEEDED — ${brief}]` },
  { label: 'Footage I received', body: '[RAW MATERIAL NEEDED — e.g. number of cameras, hours of footage per episode]' },
  { label: 'Key decisions', body: '[KEY EDITING DECISIONS NEEDED — 2–3 choices you made and why]' },
];

const ROLE_NEEDED = '[YOUR ROLE NEEDED — e.g. "Lead editor, graphics"]';

// Curated order: strongest evidence of reach and craft first.
export const projects: Project[] = [
  {
    slug: '3x1-challenge',
    title: '3×1 Challenge',
    titleAr: 'تحدي ٣ × ١',
    gloss: 'Season 3',
    channel: 'erza3',
    format: 'Football quiz show',
    tags: ['Long-form', 'Multicam', 'Score graphics'],
    summary:
      'Marwan against two guests, one bell, a live score. Seven Season 3 episodes, 54 minutes to almost two hours each — including the most-watched video in this portfolio.',
    episodes: ['8zRNRrIoiOk', 'ZQ8n4urAA9c', 'bUKBuH42ra0', 'WMAPTKl3K_I', 'PquvNV32UWs', 'gb8-jS5FErE', 'T9GO7I5T0lE'],
    episodeLabels: {
      '8zRNRrIoiOk': 'S3 · Ep 2',
      ZQ8n4urAA9c: 'S3 · Ep 3',
      bUKBuH42ra0: 'S3 · Ep 4',
      WMAPTKl3K_I: 'S3 · Ep 5',
      PquvNV32UWs: 'S3 · Ep 6',
      'gb8-jS5FErE': 'S3 · Ep 7',
      T9GO7I5T0lE: 'S3 · Ep 8',
    },
    onScreen: [
      'Three-person multicam around a single table, cut between wides and reaction close-ups',
      'Live score tracker with each player’s face, updating question by question',
      'Question lower-thirds tagged “خمن” (Guess)',
      'Show ident and Clear sponsor bug held on screen',
    ],
    notes: notesNeeded('what the channel asked for in Season 3'),
    role: ROLE_NEEDED,
  },
  {
    slug: 'world-cup-26',
    title: 'Erza3 World Cup 26',
    titleAr: 'رزع المونديال',
    gloss: 'Tournament coverage',
    channel: 'erza3',
    format: 'Podcast & tournament coverage',
    tags: ['Podcast', 'Long-form', 'Archive footage'],
    summary:
      'A whole tournament, covered as it happened: group breakdowns, round recaps, kit rankings and podcast episodes that run close to three hours.',
    episodes: ['0aE7sjd6Eac', 'm8kjJwTy3wk', 'ZHzIuJ2zXyA', 'BKy1JT41taw', 'EFG7BG5r3L4', 'SpNE9_6s1iA', 'u-bKM1XcoxU', 'J4vew30-r_g'],
    episodeLabels: {
      '0aE7sjd6Eac': 'Podcast · Group-by-group breakdown',
      m8kjJwTy3wk: 'Podcast · The opening & the Arab teams’ start',
      ZHzIuJ2zXyA: 'Round 1 recap',
      BKy1JT41taw: 'Kit ranking · Best & worst five shirts',
      EFG7BG5r3L4: 'Podcast · The best Arab team at the tournament',
      SpNE9_6s1iA: 'Podcast · Africa’s run, Egypt v Australia',
      'u-bKM1XcoxU': 'Podcast · Semi-final preview',
      'J4vew30-r_g': 'Premier League 26/27 predictions',
    },
    onScreen: [
      'Four-host sofa podcast, cut multicam across 90-minute to three-hour episodes',
      'Archive match footage cut in under branded bugs',
      'Tournament logo bug and social-handle lower-thirds',
      'Kit-reveal graphics — see the jersey podium below',
    ],
    notes: notesNeeded('how the World Cup schedule shaped turnaround'),
    role: ROLE_NEEDED,
    related: { motion: ['jersey-podium'] },
  },
  {
    slug: 'fpl-weekly',
    title: 'Who to Bring In, Who to Let Go',
    titleAr: 'مين تجيبه و مين تسيبه',
    gloss: 'Weekly Fantasy Premier League show',
    channel: 'erza3',
    format: 'Weekly FPL show',
    tags: ['Long-form', '4K', 'Sponsor integration'],
    summary:
      'A weekly Fantasy Premier League show for the 2026/27 season — team sheets, transfer calls and sponsor segments, delivered in 4K every gameweek.',
    episodes: ['cxxfgnFlPCY', '8yGJYlnVwLE', '8Rf0ikr6dF8', 'iGVa-1oP2d0'],
    episodeLabels: {
      cxxfgnFlPCY: 'Gameweek 2',
      '8yGJYlnVwLE': 'Gameweek 4',
      '8Rf0ikr6dF8': 'Gameweek 5',
      'iGVa-1oP2d0': 'Gameweek 6',
    },
    onScreen: [
      'Split screen: the live FPL team sheet beside the host',
      'In-show sponsor segments with app-store badges and phone mock-ups',
      'Branded “تكبتن مين” (who to captain) sting between segments',
      'Mastered and published in 4K',
    ],
    notes: notesNeeded('the weekly turnaround between deadline and upload'),
    role: ROLE_NEEDED,
    related: { motion: ['fpl-transition'], beforeAfter: true },
  },
  {
    slug: 'marwan-serry',
    title: 'Marwan Serry',
    titleAr: 'مروان سري',
    gloss: 'Personal channel',
    channel: 'marwanSerry',
    format: 'Challenge & personal episodes',
    tags: ['Long-form', 'Food challenge', 'Talking head'],
    summary:
      'Off the pitch: a three-way chicken-wings challenge and a sit-down on why YouTube is his favourite platform.',
    episodes: ['IfmGSM-uzvo', 'rz8AXWZAXOM'],
    episodeLabels: {
      'IfmGSM-uzvo': 'Egypt’s strongest chicken wings 2026',
      rz8AXWZAXOM: 'Why YouTube is my favourite platform',
    },
    onScreen: [
      'Three-host table challenge cut multicam with tight reaction inserts',
      'Tight inserts on the food, played against wide reactions',
    ],
    notes: notesNeeded('what Marwan wanted from his personal channel'),
    role: ROLE_NEEDED,
  },
  {
    slug: 'seven-dogs-interview',
    title: 'Seven Dogs — Cast Interview',
    titleAr: 'لقاء حصري مع ابطال فيلم Seven Dogs',
    gloss: 'Exclusive film interview',
    channel: 'beta3Aflam',
    format: 'Film interview',
    tags: ['Interview', 'Subtitles', 'Film'],
    summary:
      'An exclusive with the cast of Seven Dogs — Giancarlo Esposito, Max Huang and the Bad Boys directors — cut for an Arabic audience.',
    episodes: ['Fu3KZOKqtG0'],
    onScreen: [
      'Multi-camera sit-down with singles and two-shot coverage',
      'Arabic subtitles burnt in across the English conversation',
      'Film clips framed inside gold picture frames under the 7DOGS logo',
      'Name lower-thirds in the film’s red branding',
    ],
    notes: notesNeeded('what the channel needed from the junket footage'),
    role: ROLE_NEEDED,
  },
  {
    slug: 'shorts',
    title: 'Shorts & Reels',
    gloss: 'Vertical',
    channel: 'erza3',
    format: 'Vertical series',
    tags: ['Short-form', 'Captions', 'Sponsor integration'],
    summary:
      'Ten Shorts and a reel: a World Cup sticker-album challenge, FPL tips for Tornado, integrations for Rexona and Clear.',
    episodes: ['GO1aA_d1P2w', 'uubSBKptqVo', '_nj6WhOQ3xg', 'dXUluSnIIgI', 'YWkpCe77CSY', 'L34d514SoKU', 'VpQMjg17030', 'QpoF6OghisQ', 'cy9SUImGU3E', 'WjOSEjXkrPc'],
    episodeLabels: {
      GO1aA_d1P2w: 'Sticker album challenge · #1',
      uubSBKptqVo: 'Sticker album challenge · #28, the finale',
      _nj6WhOQ3xg: 'Team of the group stage',
      dXUluSnIIgI: 'Sticker album challenge · #21',
      YWkpCe77CSY: 'Sticker album challenge · #22',
      L34d514SoKU: 'Sticker album challenge · #24',
      VpQMjg17030: 'Triple Captain week',
      QpoF6OghisQ: 'Play what wins you points',
      cy9SUImGU3E: 'Nobody passed',
      WjOSEjXkrPc: 'The surprise World Cup call',
    },
    onScreen: [
      'Split screen: host above, an animated sticker-album page below',
      'Word-by-word Arabic captions',
      'Punch-in reframes pulled from horizontal studio footage',
      'Sponsor-led series for Tornado, Rexona and Clear',
    ],
    notes: notesNeeded('how Shorts were planned alongside the long-form uploads'),
    role: ROLE_NEEDED,
    related: { beforeAfter: true },
  },
];

/** The Instagram reel listed in eps.txt (not on YouTube, so it has no view count). */
export const instagramReel = {
  id: 'DPZRoxLiBXm',
  url: 'https://www.instagram.com/reel/DPZRoxLiBXm/',
  creator: 'Omar Khaled',
  handle: 'omarkhaled23',
  published: '2025-10-04',
  likes: 4923,
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
