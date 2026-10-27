import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ease } from '../lib/anim';
import { C, sec } from '../theme';

export const MarkSvg: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="10" y="10" width="14" height="44" rx="3" fill={dark ? C.onDark : C.ink} />
    <path fill={C.accent} d="M30 10H32A22 22 0 0 1 32 54H30Z" />
  </svg>
);

/** Small Difira Studio mark, shown only in the last 2 seconds of a video. */
export const DifiraMark: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const start = durationInFrames - sec(2);
  if (frame < start) return null;
  const vertical = height > width;
  const t = ease(frame, start, 8);
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: vertical ? 64 : 48 }}>
      <div style={{ opacity: t, transform: `translateY(${(1 - t) * 10}px)` }}>
        <MarkSvg size={vertical ? 76 : 60} dark={dark} />
      </div>
    </AbsoluteFill>
  );
};
