export type ChannelKey = 'erza3' | 'marwanSerry' | 'beta3Aflam';

export interface VideoRecord {
  id: string;
  /** Title exactly as published (Arabic). */
  title: string;
  channel: ChannelKey;
  kind: 'long' | 'short';
  durationSec: number;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  views: number;
  likes: number;
  comments: number;
  sourceRes: string;
}

export interface Channel {
  key: ChannelKey;
  name: string;
  nameAr: string;
  url: string;
  /** Public subscriber count at snapshot time. */
  subscribers: number;
}

/**
 * A placeholder is any string wrapped in square brackets, e.g. "[ROLE NEEDED]".
 * The <Text> component renders these with a visible "needs info" treatment,
 * and hides them entirely when `site.showPlaceholders` is false.
 */
export type Copy = string;

export interface CaseNote {
  label: string;
  body: Copy;
}

export interface Project {
  slug: string;
  title: string;
  titleAr?: string;
  /** Short English gloss of the Arabic show name. */
  gloss?: string;
  channel: ChannelKey;
  format: string;
  tags: string[];
  /** One-line summary for cards. Facts only. */
  summary: string;
  /** YouTube ids, in running order. */
  episodes: string[];
  /** Episode labels keyed by id (e.g. "S3 · Ep 8"). */
  episodeLabels?: Record<string, string>;
  /** What is visibly on screen in the edit — observed from the footage. */
  onScreen: string[];
  /** Case-study notes that only the editor can supply. */
  notes: CaseNote[];
  role: Copy;
  related?: { motion?: string[]; beforeAfter?: boolean };
  accent?: string;
}

export interface MotionPiece {
  slug: string;
  title: string;
  description: string;
  video: string;
  poster: string;
  width: number;
  height: number;
  durationSec: number;
}

export interface Service {
  title: string;
  body: string;
  evidence: { label: string; href: string }[];
}
