import React from 'react';
import { AbsoluteFill, getStaticFiles, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ease, pop, mix } from '../lib/anim';
import { C, F } from '../theme';

export const useVertical = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

/** Full-frame shot with a background color and a short scale/fade entrance. */
export const Shot: React.FC<{ bg?: string; children: React.ReactNode; zoom?: [number, number]; style?: React.CSSProperties }> = ({
  bg = C.bg,
  children,
  zoom,
  style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = pop(frame, 0);
  const z = zoom ? mix(frame / Math.max(1, durationInFrames), zoom[0], zoom[1]) : 1;
  return (
    <AbsoluteFill style={{ background: bg, overflow: 'hidden', ...style }}>
      <AbsoluteFill style={{ transform: `scale(${mix(t, 1.04, 1) * z})`, opacity: Math.min(1, t * 2) }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Renders a fixed-size design (w x h) scaled to `scale`, centered at (cx, cy) in the frame. */
export const Fit: React.FC<{ w: number; h: number; scale: number; cx?: number; cy?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  w,
  h,
  scale,
  cx,
  cy,
  children,
  style,
}) => {
  const { width, height } = useVideoConfig();
  const x = (cx ?? width / 2) - w / 2;
  const y = (cy ?? height / 2) - h / 2;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: `scale(${scale})`, ...style }}>
      {children}
    </div>
  );
};

/** Big headline label used above panels. */
export const Kicker: React.FC<{ text: string; delay?: number; dark?: boolean; size?: number; style?: React.CSSProperties }> = ({ text, delay = 2, dark, size, style }) => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const t = ease(frame, delay, 9);
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <div
        style={{
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: size ?? (vertical ? 40 : 30),
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: dark ? C.muted : C.body,
          transform: `translateY(${(1 - t) * 100}%)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Masked line reveal for headlines. */
export const RevealText: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, delay, 10);
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
      <div style={{ transform: `translateY(${(1 - t) * 105}%)`, ...style }}>{children}</div>
    </div>
  );
};

/** Desktop app window chrome. */
export const AppWindow: React.FC<{ w: number; h: number; title?: string; children: React.ReactNode; dark?: boolean }> = ({ w, h, title, children, dark }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 28,
      overflow: 'hidden',
      background: dark ? C.panel : C.card,
      border: `2px solid ${dark ? C.panelLine : C.line}`,
      boxShadow: '0 40px 90px rgba(11,18,32,.16)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: F.sans,
      color: dark ? C.onDark : C.ink,
    }}
  >
    <div style={{ height: 56, flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', borderBottom: `2px solid ${dark ? C.panelLine : C.line}` }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: dark ? C.panelLine : C.muted }} />
      ))}
      {title && <span style={{ marginLeft: 14, fontSize: 20, fontWeight: 600, color: dark ? C.muted : C.body }}>{title}</span>}
    </div>
    <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>{children}</div>
  </div>
);

/** Phone frame (drawn, no brand). Screen is 390 x 844 design units. */
export const Phone: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <div style={{ width: 430, height: 884, borderRadius: 64, background: C.ink, padding: 20, boxShadow: '0 40px 90px rgba(11,18,32,.22)' }}>
    <div style={{ position: 'relative', width: 390, height: 844, borderRadius: 46, overflow: 'hidden', background: dark ? C.panel : C.bg, fontFamily: F.sans }}>
      <div style={{ position: 'absolute', top: 12, left: '50%', marginLeft: -58, width: 116, height: 34, borderRadius: 20, background: C.ink, zIndex: 5 }} />
      {children}
    </div>
  </div>
);

/** Uses a real screenshot from assets/ when present, otherwise the coded mockup. */
export const ScreenOrMock: React.FC<{ file: string; children: React.ReactNode }> = ({ file, children }) => {
  const exists = getStaticFiles().some(f => f.name === file);
  if (!exists) return <>{children}</>;
  return <Img src={staticFile(file)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
};

export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  bg = C.accent,
  color = C.ink,
  size = 20,
  style,
}) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: `${size * 0.35}px ${size * 0.8}px`, borderRadius: 999, background: bg, color, fontFamily: F.sans, fontWeight: 600, fontSize: size, ...style }}>
    {children}
  </span>
);
