import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { C } from '../theme';

export type CursorKey = { f: number; x: number; y: number; click?: boolean };

/** Pointer that glides between keyframes (in the parent's coordinate space) and shows click rings. */
export const Cursor: React.FC<{ path: CursorKey[]; size?: number }> = ({ path, size = 44 }) => {
  const frame = useCurrentFrame();
  const opts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1) } as const;
  const frames = path.map(p => p.f);
  const x = path.length > 1 ? interpolate(frame, frames, path.map(p => p.x), opts) : path[0].x;
  const y = path.length > 1 ? interpolate(frame, frames, path.map(p => p.y), opts) : path[0].y;
  const lastClick = [...path].reverse().find(p => p.click && frame >= p.f);
  const since = lastClick ? frame - lastClick.f : 99;
  const press = since < 6 ? 0.86 + (since / 6) * 0.14 : 1;
  const opacity = interpolate(frame, [path[0].f - 6, path[0].f], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, opacity, zIndex: 50, pointerEvents: 'none' }}>
      {since < 14 && (
        <div
          style={{
            position: 'absolute',
            left: -(10 + since * 3),
            top: -(10 + since * 3),
            width: 2 * (10 + since * 3),
            height: 2 * (10 + since * 3),
            borderRadius: '50%',
            border: `4px solid ${C.accent}`,
            opacity: 1 - since / 14,
          }}
        />
      )}
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute', left: -4, top: -2, transform: `scale(${press})`, transformOrigin: '4px 2px' }}>
        <path d="M4 2l15 10.5-6.6 1.4 3.9 7.2-2.9 1.5-3.9-7.3L4 20z" fill={C.ink} stroke={C.card} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
