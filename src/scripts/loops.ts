import { $, $$, canAutoplay, ensureSrc, safePlay } from './env';
import { track } from './analytics';

/** Motion clips: autoplay muted while on screen; full manual control. */
export function initLoops() {
  const loops = $$('[data-loop]');
  const videos: HTMLVideoElement[] = [];

  for (const root of loops) {
    const video = $<HTMLVideoElement>('[data-loop-video]', root)!;
    const playBtn = $<HTMLButtonElement>('[data-loop-play]', root)!;
    const playLabel = $('[data-loop-play-label]', root)!;
    const soundBtn = $<HTMLButtonElement>('[data-loop-sound]', root)!;
    const fsBtn = $<HTMLButtonElement>('[data-loop-fs]', root)!;
    const bar = $('[data-loop-progress]', root)!;
    const err = $('[data-loop-error]', root)!;
    const name = playLabel.textContent!.replace(/^Play /, '');
    videos.push(video);

    let userPaused = !canAutoplay;
    let visible = false;
    let raf = 0;

    const draw = () => {
      if (video.duration) bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
      raf = video.paused ? 0 : requestAnimationFrame(draw);
    };
    const sync = () => {
      playBtn.setAttribute('aria-pressed', String(!video.paused));
      playLabel.textContent = `${video.paused ? 'Play' : 'Pause'} ${name}`;
      soundBtn.setAttribute('aria-pressed', String(!video.muted));
      if (!video.paused && !raf) raf = requestAnimationFrame(draw);
    };
    const update = () => {
      if (visible && !userPaused) {
        ensureSrc(video);
        safePlay(video);
      } else video.pause();
    };

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('volumechange', sync);
    video.addEventListener('error', () => (err.hidden = false));

    playBtn.addEventListener('click', () => {
      userPaused = !video.paused;
      if (!userPaused) track('video_play', { where: name });
      if (!userPaused) {
        ensureSrc(video);
        safePlay(video);
      } else video.pause();
    });
    soundBtn.addEventListener('click', () => {
      const unmute = video.muted;
      if (unmute) videos.forEach((v) => v !== video && (v.muted = true));
      video.muted = !unmute;
      if (unmute && video.paused) {
        userPaused = false;
        ensureSrc(video);
        safePlay(video);
      }
    });
    fsBtn.addEventListener('click', () => {
      ensureSrc(video);
      const v = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      const frame = video.parentElement as HTMLElement;
      if (frame.requestFullscreen) frame.requestFullscreen().then(() => safePlay(video)).catch(() => v.webkitEnterFullscreen?.());
      else v.webkitEnterFullscreen?.();
    });

    new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        update();
      },
      { threshold: 0.35 },
    ).observe(root);
    sync();
  }
}
