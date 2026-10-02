/**
 * Everything about the person lives here. Copy written as [SQUARE BRACKETS] is
 * a placeholder: hidden while `showPlaceholders` is false, and listed in
 * MISSING_INFORMATION.md.
 */
export const site = {
  showPlaceholders: false,

  name: "Mohanad Gamal",
  initials: "MG",
  role: "Video Editor & Motion Graphics Designer",
  position: { title: "Senior Video Editor", company: "Arcade Films" },
  specialisation: "Football & creator YouTube",
  positioning:
    "Video editor turning raw footage into engaging stories, with experience across Arabic YouTube channels reaching 1.7M, 1.1M, and 647K+ subscribers.",
  location: "Cairo, Egypt",
  availability: "Available for freelance",

  bio: "Video editor. Creating my own way. ",
  about:
    "I’m a Video Editor focused on turning ideas, conversations, and stories into engaging content. My work spans long-form shows, podcasts, interviews, challenges, and short-form content — from fast-paced social cuts to full-length YouTube episodes.",
  tools: ["Adobe Premiere Pro", "Adobe After Effects"],

  contact: {
    email: "mohandg699@gmail.com",
  },

  // Only Instagram, per Mohanad.
  socials: [{ label: "Instagram", href: "https://www.instagram.com/mohandgamal23/" }] as {
    label: string;
    href: string;
  }[],

  // Footer signature for the person who built the site.
  credit: {
    name: "Sofian Emad",
    role: "Mobile developer",
    links: [
      { kind: "whatsapp", label: "WhatsApp", href: "https://wa.me/201002792637?text=" + encodeURIComponent("Hi Sofian, I saw Mohanad Gamal’s portfolio and want to talk about a project.") },
      { kind: "x", label: "X (Twitter)", href: "https://x.com/Bojjaan_Krikc" },
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/sofian_44/" },
    ],
  },

  showreel: {
    // Leave empty until a showreel exists; the hero shows a motion-work loop meanwhile.
    youtubeId: "",
    placeholder: "[SHOWREEL NEEDED — 60–90s, hosted on YouTube or Vimeo]",
  },

  seo: {
    title: "Mohanad Gamal — Video Editor & Motion Graphics Designer",
    description:
      "Senior video editor at Arcade Films, Cairo. Shows, podcasts, Shorts and motion graphics for brands including Google, Samsung, adidas, Red Bull and the FIFA World Cup 2022.",
  },
};

export type Site = typeof site;
