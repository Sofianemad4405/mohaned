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

export interface Project {
  slug: string;
  title: string;
  titleAr?: string;
  /** Short English gloss of the Arabic show name. */
  gloss?: string;
  channel: ChannelKey;
  format: string;
  /** One-line summary for cards. Facts only. */
  summary: string;
  /** YouTube ids, in running order. */
  episodes: string[];
  /** Episode labels keyed by id (e.g. "S3 · Ep 8"). */
  episodeLabels?: Record<string, string>;
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
