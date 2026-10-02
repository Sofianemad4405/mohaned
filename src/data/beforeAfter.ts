// Raw → final comparisons from the Drive's "before after" folder. Each reel shows
// the final edit with the raw take inset; both panels are cropped from it, so
// they stay frame-locked. Files: public/media/before-after/<key>-{after,before,full}.mp4
export interface BeforeAfterClip {
  key: string;
  label: string;
  durationSec: number;
}

export const beforeAfter: BeforeAfterClip[] = [
  { key: 'ba', label: 'Chips', durationSec: 9 },
  { key: 'ba2', label: 'League invite', durationSec: 15 },
  { key: 'ba3', label: 'Team sheet', durationSec: 14.9 },
  { key: 'ba4', label: 'Prizes', durationSec: 28.4 },
];
