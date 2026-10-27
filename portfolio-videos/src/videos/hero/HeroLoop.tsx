// Seamless background loop for the website hero. Every motion repeats exactly once per
// HERO_DURATION, so the first and last frame match. The centre stays calm for the headline.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../../theme';

export const HERO_DURATION = 600; // 20 s at 30 fps

const TAU = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);

// ---------- Floating UI fragments ----------
const Bar: React.FC<{ w: number | string; hot?: boolean; h?: number }> = ({ w, hot, h = 10 }) => (
  <div style={{ width: w, height: h, borderRadius: h / 2, background: hot ? C.accent : C.panelLine, marginBottom: 12 }} />
);

const Card: React.FC<{ children: React.ReactNode; w: number; h: number }> = ({ children, w, h }) => (
  <div style={{ width: w, height: h, borderRadius: 22, background: C.panel, border: `2px solid ${C.panel2}`, padding: 22, overflow: 'hidden' }}>{children}</div>
);

const CodeCard = () => (
  <Card w={300} h={190}>
    <Bar w="40%" />
    <Bar w="78%" />
    <Bar w="62%" hot />
    <Bar w="85%" />
    <Bar w="50%" />
  </Card>
);

const ChartCard = () => (
  <Card w={280} h={200}>
    <Bar w="45%" />
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 110, marginTop: 14 }}>
      {[0.4, 0.65, 0.5, 0.9, 0.7].map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${v * 100}%`, borderRadius: '8px 8px 0 0', background: i === 3 ? C.accent : C.panelLine }} />
      ))}
    </div>
  </Card>
);

const ChatCard = () => (
  <Card w={300} h={180}>
    <div style={{ width: '70%', height: 42, borderRadius: 16, background: C.panel2, marginBottom: 14 }} />
    <div style={{ marginLeft: 'auto', width: '58%', height: 42, borderRadius: 16, background: C.accent, opacity: 0.9, marginBottom: 14 }} />
    <div style={{ width: '45%', height: 30, borderRadius: 14, background: C.panel2 }} />
  </Card>
);

const ChecklistCard = () => (
  <Card w={280} h={200}>
    {[true, false, false].map((done, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, border: `3px solid ${done ? C.accent : C.panelLine}`, background: done ? C.accent : 'transparent' }} />
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: C.panelLine }} />
      </div>
    ))}
  </Card>
);

const BrowserCard = () => (
  <Card w={320} h={210}>
    <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: C.panelLine }} />
      ))}
    </div>
    <div style={{ height: 60, borderRadius: 12, background: C.panel2, marginBottom: 14 }} />
    <div style={{ display: 'flex', gap: 12 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ flex: 1, height: 54, borderRadius: 10, background: i === 1 ? C.accent : C.panel2 }} />
      ))}
    </div>
  </Card>
);

const ToggleCard = () => (
  <Card w={260} h={150}>
    {[true, false].map((on, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26 }}>
        <div style={{ width: '50%', height: 10, borderRadius: 5, background: C.panelLine }} />
        <div style={{ width: 54, height: 30, borderRadius: 15, background: on ? C.accent : C.panel2, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: on ? 28 : 4, width: 22, height: 22, borderRadius: 11, background: C.onDark }} />
        </div>
      </div>
    ))}
  </Card>
);

/** A column of cards that drifts and wraps. The column repeats the same cards, so moving by
 *  one copy per loop is seamless. */
const Column: React.FC<{ x: number; cards: React.FC[]; dir: 1 | -1; gap: number; heights: number[]; phase: number }> = ({ x, cards, dir, gap, heights, phase }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const half = heights.reduce((a, h) => a + h + gap, 0);
  const shift = frac(frame / HERO_DURATION + phase) * half;
  const offset = dir === -1 ? -shift : shift - half;
  const copies = Math.ceil(height / half) + 1;
  const items = Array.from({ length: copies }, () => cards).flat();
  return (
    <div style={{ position: 'absolute', left: x, top: offset, display: 'flex', flexDirection: 'column', gap }}>
      {items.map((Item, i) => (
        <Item key={i} />
      ))}
    </div>
  );
};

// ---------- Rings, roots and pulses ----------
const Rings: React.FC<{ cx: number; cy: number; scale: number }> = ({ cx, cy, scale }) => {
  const frame = useCurrentFrame();
  const t = frame / HERO_DURATION;
  const rings = [
    { r: 250, dash: '', speed: 1, nodes: [0.1, 0.6], hot: 0 },
    { r: 390, dash: '6 14', speed: -1, nodes: [0.3, 0.75], hot: 1 },
    { r: 540, dash: '', speed: 2, nodes: [0.05, 0.45, 0.8], hot: 2 },
    { r: 700, dash: '2 18', speed: -1, nodes: [0.2], hot: -1 },
  ];
  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      {/* One pulse every 4 s (5 per loop) */}
      <circle cx={cx} cy={cy} r={(200 + frac(t * 5) * 620) * scale} fill="none" stroke={C.accent} strokeWidth={2} opacity={0.3 * (1 - frac(t * 5))} />
      {rings.map((ring, ri) => {
        const r = ring.r * scale;
        const rot = t * 360 * ring.speed;
        return (
          <g key={ri} transform={`rotate(${rot} ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={ri % 2 ? C.panel2 : C.panel} strokeWidth={2} strokeDasharray={ring.dash || undefined} />
            {ring.nodes.map((n, ni) => {
              const a = n * TAU;
              const hot = ni === 0 && ring.hot >= 0;
              return <circle key={ni} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={hot ? 8 : 6} fill={hot ? C.accent : C.panelLine} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

/** Roots grow from the bottom edge to the inner rings, then fade: the root of the problem. */
const Roots: React.FC<{ cx: number; cy: number; scale: number }> = ({ cx, cy, scale }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const roots = [
    { x0: cx - 520 * scale, end: 125, phase: 0 },
    { x0: cx - 180 * scale, end: 105, phase: 0.2 },
    { x0: cx + 60 * scale, end: 82, phase: 0.4 },
    { x0: cx + 330 * scale, end: 62, phase: 0.6 },
    { x0: cx + 640 * scale, end: 45, phase: 0.8 },
  ];
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
      {roots.map((root, i) => {
        const a = (root.end * Math.PI) / 180;
        const ex = cx + Math.cos(a) * 390 * scale;
        const ey = cy + Math.sin(a) * 390 * scale;
        const y0 = height + 20;
        const midY = (y0 + ey) / 2;
        const d = `M ${root.x0} ${y0} C ${root.x0} ${midY}, ${ex + (root.x0 - ex) * 0.2} ${midY + 60 * scale}, ${ex} ${ey}`;
        const t = frac(frame / HERO_DURATION + root.phase);
        const draw = Math.min(1, t / 0.35);
        const fade = t < 0.6 ? 1 : Math.max(0, 1 - (t - 0.6) / 0.3);
        const head = t < 0.35;
        return (
          <g key={i} opacity={fade}>
            <path d={d} fill="none" stroke={C.panelLine} strokeWidth={2.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
            {!head && <circle cx={ex} cy={ey} r={9} fill={C.accent} />}
          </g>
        );
      })}
    </svg>
  );
};

const DotGrid: React.FC = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <pattern id="dots" width="44" height="44" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill={C.panel} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const LEFT = [CodeCard, ChartCard, ChatCard];
const LEFT_H = [190, 200, 180];
const RIGHT = [BrowserCard, ChecklistCard, ToggleCard];
const RIGHT_H = [210, 200, 150];

export const HeroLoop: React.FC = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const cx = width / 2;
  const cy = height / 2;
  const scale = vertical ? 0.95 : 1;
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <DotGrid />
      <Rings cx={cx} cy={cy} scale={scale} />
      <Roots cx={cx} cy={cy} scale={scale} />
      <AbsoluteFill style={{ opacity: vertical ? 0.55 : 0.85 }}>
        <Column x={vertical ? -150 : 90} cards={LEFT} heights={LEFT_H} gap={70} dir={-1} phase={0} />
        <Column x={vertical ? width - 160 : width - 410} cards={RIGHT} heights={RIGHT_H} gap={80} dir={1} phase={0.3} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
