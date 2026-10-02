import { $, $$, canAutoplay, clamp, ensureSrc, safePlay, swapSrc, timecode } from './env';
import { track } from './analytics';

const describe = (p: number) =>
  p >= 100 ? 'All raw footage' : p <= 0 ? 'All final edit' : p === 50 ? 'Half raw, half final' : `${Math.round(p)}% raw, ${Math.round(100 - p)}% final`;

export function initBeforeAfter() {
  for (const root of $$('[data-ba]')) {
    const stage = $('[data-ba-stage]', root)!;
    const handle = $('[data-ba-handle]', root)!;
    const after = $<HTMLVideoElement>('[data-ba-after]', root)!;
    const before = $<HTMLVideoElement>('[data-ba-before]', root)!;
    const playBtn = $<HTMLButtonElement>('[data-ba-play]', root)!;
    const playLabel = $('[data-ba-play-label]', root)!;
    const soundBtn = $<HTMLButtonElement>('[data-ba-sound]', root)!;
    const tc = $('[data-ba-tc]', root);
    const segs = $$<HTMLButtonElement>('[data-ba-set]', root);

    // --- Position -------------------------------------------------------
    let pos = 50;
    let interacted = false;
    const set = (p: number, animate = false) => {
      pos = clamp(p, 0, 100);
      if (animate) {
        root.classList.add('is-animating');
        setTimeout(() => root.classList.remove('is-animating'), 540);
      }
      root.style.setProperty('--pos', `${pos}%`);
      root.dataset.at = String(Math.round(pos));
      handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      handle.setAttribute('aria-valuetext', describe(pos));
      segs.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.baSet) === Math.round(pos))));
      if (!interacted) {
        interacted = true;
        track('before_after_interact');
      }
    };
    const fromX = (x: number) => {
      const r = stage.getBoundingClientRect();
      set(((x - r.left) / r.width) * 100);
    };

    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      root.classList.add('is-dragging');
      stage.setPointerCapture(e.pointerId);
      fromX(e.clientX);
      handle.focus({ preventScroll: true });
    });
    stage.addEventListener('pointermove', (e) => stage.hasPointerCapture(e.pointerId) && fromX(e.clientX));
    const end = (e: PointerEvent) => {
      root.classList.remove('is-dragging');
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);

    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 5;
      const map: Record<string, number> = {
        ArrowLeft: pos - step,
        ArrowDown: pos - step,
        ArrowRight: pos + step,
        ArrowUp: pos + step,
        PageDown: pos - 20,
        PageUp: pos + 20,
        Home: 0,
        End: 100,
      };
      if (e.key in map) {
        e.preventDefault();
        set(map[e.key], e.key === 'Home' || e.key === 'End');
      }
    });
    segs.forEach((b) => b.addEventListener('click', () => set(Number(b.dataset.baSet), true)));

    // --- Playback (after is the master clock) -----------------------------
    let userPaused = !canAutoplay;
    let visible = false;
    let raf = 0;

    const loop = () => {
      if (Math.abs(before.currentTime - after.currentTime) > 0.08) before.currentTime = after.currentTime;
      if (tc) tc.textContent = timecode(after.currentTime);
      raf = after.paused ? 0 : requestAnimationFrame(loop);
    };
    const sync = () => {
      const playing = !after.paused;
      playBtn.setAttribute('aria-pressed', String(playing));
      playLabel.textContent = playing ? 'Pause comparison' : 'Play comparison';
      soundBtn.setAttribute('aria-pressed', String(!after.muted));
      if (playing && !raf) raf = requestAnimationFrame(loop);
    };
    const load = () => Promise.all([ensureSrc(after), ensureSrc(before)]);
    const play = async () => {
      await load();
      if (userPaused || !visible) return;
      before.currentTime = after.currentTime;
      await Promise.all([safePlay(after), safePlay(before)]);
    };
    const pause = () => {
      after.pause();
      before.pause();
    };
    const update = () => (visible && !userPaused ? play() : pause());

    after.addEventListener('play', sync);
    after.addEventListener('pause', sync);
    after.addEventListener('volumechange', sync);
    after.addEventListener('seeked', () => (before.currentTime = after.currentTime));
    after.addEventListener('waiting', () => before.pause());
    after.addEventListener('playing', () => safePlay(before));

    playBtn.addEventListener('click', () => {
      userPaused = !after.paused;
      if (userPaused) pause();
      else {
        track('video_play', { where: 'before-after' });
        visible = true;
        play();
      }
    });
    soundBtn.addEventListener('click', () => {
      after.muted = !after.muted;
      if (!after.muted && after.paused) {
        userPaused = false;
        play();
      }
    });

    // --- Clip switcher ----------------------------------------------------
    const clipBtns = $$<HTMLButtonElement>('[data-ba-clip]', root);
    const fullBtn = document.querySelector<HTMLElement>('[data-ba-full]');
    clipBtns.forEach((b) =>
      b.addEventListener('click', () => {
        if (b.getAttribute('aria-pressed') === 'true') return;
        clipBtns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        const d = b.dataset;
        swapSrc(after, d.after!, d.afterPoster);
        swapSrc(before, d.before!, d.beforePoster);
        if (tc) tc.textContent = timecode(0);
        if (fullBtn) {
          fullBtn.dataset.modalVideo = d.full;
          fullBtn.dataset.modalPoster = d.fullPoster;
        }
        track('before_after_clip', { clip: d.baClip ?? '' });
        if (!userPaused && visible) play();
        else sync();
      }),
    );

    // Fetch a little early, play only when mostly on screen.
    const pre = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load();
          pre.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    if (canAutoplay) pre.observe(root); // with Save-Data / reduced motion, load on play only
    new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        update();
      },
      { threshold: 0.4 },
    ).observe(stage);

    interacted = true; // don't count the initial state as an interaction
    set(50);
    interacted = false;
    sync();
  }
}
