import { videos } from '../data/videos';
import { projects } from '../data/projects';
import { channels } from '../data/channels';
import type { Project, VideoRecord } from '../data/types';

const byId = new Map(videos.map((v) => [v.id, v]));

export const getVideo = (id: string): VideoRecord => {
  const v = byId.get(id);
  if (!v) throw new Error(`Unknown video id: ${id}`);
  return v;
};

export function projectStats(p: Project) {
  const eps = p.episodes.map(getVideo);
  const views = eps.reduce((a, v) => a + v.views, 0);
  const top = eps.reduce((a, v) => (v.views > a.views ? v : a));
  const durations = eps.map((v) => v.durationSec);
  const dates = eps.map((v) => v.published).sort();
  return {
    count: eps.length,
    views,
    top,
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    channel: channels[p.channel],
  };
}

export const totals = {
  videos: videos.length,
  views: videos.reduce((a, v) => a + v.views, 0),
  channels: Object.keys(channels).length,
  topVideo: videos.reduce((a, v) => (v.views > a.views ? v : a)),
  longForm: videos.filter((v) => v.kind === 'long').length,
  shorts: videos.filter((v) => v.kind === 'short').length,
  hours: Math.round(videos.reduce((a, v) => a + v.durationSec, 0) / 3600),
};

export const projectsInOrder = projects;
