import { Easing, interpolate, spring } from 'remotion';
import { FPS } from '../theme';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.bezier(0.2, 0.75, 0.25, 1);

/** 0 -> 1 eased progress starting at `delay`, lasting `dur` frames. */
export const ease = (frame: number, delay = 0, dur = 10) =>
  interpolate(frame, [delay, delay + dur], [0, 1], { ...clamp, easing: out });

/** Snappy spring 0 -> 1 with no visible overshoot. */
export const pop = (frame: number, delay = 0) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping: 18, stiffness: 180, mass: 0.6 } });

/** Map a 0..1 progress to a range. */
export const mix = (t: number, a: number, b: number) => a + (b - a) * t;

/** Numeric counter value between keyframes. */
export const count = (frame: number, delay: number, dur: number, from: number, to: number) =>
  Math.round(mix(ease(frame, delay, dur), from, to));

/** Slide + fade style for entering elements. */
export const enter = (frame: number, delay = 0, dist = 40, axis: 'x' | 'y' = 'y', dur = 10) => {
  const t = ease(frame, delay, dur);
  const d = (1 - t) * dist;
  return { opacity: t, transform: axis === 'x' ? `translateX(${d}px)` : `translateY(${d}px)` };
};

/** Scale-in style. */
export const scaleIn = (frame: number, delay = 0, from = 0.9) => {
  const t = pop(frame, delay);
  return { opacity: Math.min(1, t * 1.6), transform: `scale(${mix(t, from, 1)})` };
};

export const fmt = (n: number) => n.toLocaleString('en-US');
