import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { buildChunks, Line } from '../lib/captions';
import { ease } from '../lib/anim';
import { C, F } from '../theme';

/** Burned-in captions. Keyword words are drawn in the accent color. */
export const Captions: React.FC<{ videoId: string; lines: Line[]; bottom?: number }> = ({ videoId, lines, bottom }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const chunks = useMemo(() => buildChunks(videoId, lines, vertical ? 4 : 7), [videoId, lines, vertical]);
  const chunk = chunks.find(c => frame >= c.from && frame < c.to);
  if (!chunk) return null;
  const t = ease(frame, chunk.from, 5);
  const size = vertical ? 66 : 50;
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: bottom ?? (vertical ? 360 : 64), pointerEvents: 'none' }}>
      <div
        style={{
          maxWidth: vertical ? 940 : 1500,
          padding: vertical ? '22px 34px' : '16px 30px',
          borderRadius: vertical ? 28 : 22,
          background: C.ink,
          color: C.onDark,
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          opacity: t,
          transform: `translateY(${(1 - t) * 14}px) scale(${0.96 + t * 0.04})`,
        }}
      >
        {chunk.tokens.map((token, i) => (
          <span key={i} style={{ color: token.hot ? C.accent : undefined }}>
            {token.word}
            {i < chunk.tokens.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
