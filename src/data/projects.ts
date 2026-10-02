import type { Project } from "./types";

// Curated order: strongest evidence of reach and craft first.
export const projects: Project[] = [
  {
    slug: "3x1-challenge",
    title: "3×1 Challenge",
    titleAr: "تحدي ٣ × ١",
    gloss: "Season 3",
    channel: "erza3",
    format: "Football quiz show",
    summary:
      "Marwan against two guests, one bell, a live score. Seven Season 3 episodes, 54 minutes to 1-2h ",
    episodes: [
      "8zRNRrIoiOk",
      "ZQ8n4urAA9c",
      "bUKBuH42ra0",
      "WMAPTKl3K_I",
      "PquvNV32UWs",
      "gb8-jS5FErE",
      "T9GO7I5T0lE",
    ],
    episodeLabels: {
      "8zRNRrIoiOk": "S3 · Ep 2",
      ZQ8n4urAA9c: "S3 · Ep 3",
      bUKBuH42ra0: "S3 · Ep 4",
      WMAPTKl3K_I: "S3 · Ep 5",
      PquvNV32UWs: "S3 · Ep 6",
      "gb8-jS5FErE": "S3 · Ep 7",
      T9GO7I5T0lE: "S3 · Ep 8",
    },
  },
  {
    slug: "world-cup-26",
    title: "Erza3 World Cup 26",
    titleAr: "رزع المونديال- Editing , color grading , motion graphics",
    gloss: "Tournament coverage",
    channel: "erza3",
    format: "Podcast & tournament coverage",
    summary:
      "A whole tournament, covered live: group breakdowns, round recaps, kit rankings and podcast episodes.",
    episodes: [
      "0aE7sjd6Eac",
      "m8kjJwTy3wk",
      "ZHzIuJ2zXyA",
      "BKy1JT41taw",
      "EFG7BG5r3L4",
      "SpNE9_6s1iA",
      "u-bKM1XcoxU",
      "J4vew30-r_g",
    ],
    episodeLabels: {
      "0aE7sjd6Eac": "Podcast · Group-by-group breakdown",
      m8kjJwTy3wk: "Podcast · The opening & the Arab teams’ start",
      ZHzIuJ2zXyA: "Round 1 recap",
      BKy1JT41taw: "Kit ranking · Best & worst five shirts",
      EFG7BG5r3L4: "Podcast · The best Arab team at the tournament",
      SpNE9_6s1iA: "Podcast · Africa’s run, Egypt v Australia",
      "u-bKM1XcoxU": "Podcast · Semi-final preview",
      "J4vew30-r_g": "Premier League 26/27 predictions",
    },
  },
  {
    slug: "fpl-weekly",
    title: "Who to Bring In, Who to Let Go",
    titleAr:
      "مين تجيبه و مين تسيبه - Editing , color grading , motion graphics",
    gloss: "Weekly Fantasy Premier League show",
    channel: "erza3",
    format: "Weekly FPL show",
    summary:
      "A weekly Fantasy Premier League show for the 2026/27 season — team sheets, transfer calls and sponsor segments, delivered in 4K every gameweek.",
    episodes: ["cxxfgnFlPCY", "8yGJYlnVwLE", "8Rf0ikr6dF8", "iGVa-1oP2d0"],
    episodeLabels: {
      cxxfgnFlPCY: "Gameweek 2",
      "8yGJYlnVwLE": "Gameweek 4",
      "8Rf0ikr6dF8": "Gameweek 5",
      "iGVa-1oP2d0": "Gameweek 6",
    },
  },
  {
    slug: "marwan-serry",
    title: "Marwan Serry",
    titleAr: "مروان سري - Editing color grade",
    gloss: "Personal channel",
    channel: "marwanSerry",
    format: "Challenge & personal episodes",
    summary:
      "An entertaining food show combining food challenges, fun conversations.",
    episodes: ["IfmGSM-uzvo", "rz8AXWZAXOM"],
    episodeLabels: {
      "IfmGSM-uzvo": "Egypt’s strongest chicken wings 2026",
      rz8AXWZAXOM: "Why YouTube is my favourite platform",
    },
  },
  {
    slug: "seven-dogs-interview",
    title: "Seven Dogs — Cast Interview",
    titleAr: "Seven Dogs Film - Editing , color grading , motion graphics",
    gloss: "Exclusive film interview",
    channel: "beta3Aflam",
    format: "Film interview",
    summary:
      "An exclusive with the cast of Seven Dogs — Giancarlo Esposito, Max Huang and the Bad Boys directors — cut for an Arabic audience.",
    episodes: ["Fu3KZOKqtG0"],
  },
  {
    slug: "shorts",
    title: "Shorts & Reels",
    gloss: "Vertical",
    channel: "erza3",
    format: "Vertical series",
    summary:
      "A collection of Shorts and Reels: a World Cup sticker-album challenge, FPL tips for Tornado, integrations for Rexona and Clear.",
    episodes: [
      "GO1aA_d1P2w",
      "uubSBKptqVo",
      "_nj6WhOQ3xg",
      "dXUluSnIIgI",
      "YWkpCe77CSY",
      "L34d514SoKU",
      "VpQMjg17030",
      "QpoF6OghisQ",
      "cy9SUImGU3E",
      "WjOSEjXkrPc",
    ],
    episodeLabels: {
      GO1aA_d1P2w: "Sticker album challenge · #1",
      uubSBKptqVo: "Sticker album challenge · #28, the finale",
      _nj6WhOQ3xg: "Team of the group stage",
      dXUluSnIIgI: "Sticker album challenge · #21",
      YWkpCe77CSY: "Sticker album challenge · #22",
      L34d514SoKU: "Sticker album challenge · #24",
      VpQMjg17030: "Triple Captain week",
      QpoF6OghisQ: "Play what wins you points",
      cy9SUImGU3E: "Nobody passed",
      WjOSEjXkrPc: "The surprise World Cup call",
    },
  },
];

/** The Instagram reel listed in eps.txt (not on YouTube, so it has no view count). */
export const instagramReel = {
  id: "DPZRoxLiBXm",
  url: "https://www.instagram.com/reel/DPZRoxLiBXm/",
  creator: "Omar Khaled",
  handle: "omarkhaled23",
  published: "2025-10-04",
  likes: 4923,
};

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
