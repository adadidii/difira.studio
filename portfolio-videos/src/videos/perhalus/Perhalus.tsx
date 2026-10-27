import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Captions } from '../../components/Captions';
import { Cursor } from '../../components/Cursor';
import { DifiraMark } from '../../components/DifiraMark';
import { AppWindow, Fit, Kicker, RevealText, ScreenOrMock, Shot } from '../../components/Layout';
import { Line } from '../../lib/captions';
import { ease, enter, mix, scaleIn } from '../../lib/anim';
import { C, F, sec } from '../../theme';

export const PERHALUS_DURATION = sec(20);

// No voiceover for this one: captions are on-screen text only.
export const PERHALUS_LINES: Line[] = [
  { from: sec(0), to: sec(4), text: "Your app's copy sounds like a manual.", keyword: 'manual.', spoken: false },
  { from: sec(4), to: sec(8), text: 'Perhalus finds the stiff lines,', keyword: 'stiff lines,', spoken: false },
  { from: sec(8), to: sec(12), text: 'and rewrites them in place.', keyword: 'in place.', spoken: false },
  { from: sec(12), to: sec(16), text: 'Same screen. Clearer words.', keyword: 'Clearer words.', spoken: false },
];

type SlotId = 'header' | 'empty' | 'button' | 'error';
const COPY: Record<SlotId, { before: string; after: string }> = {
  header: { before: 'Welcome to the platform. Configure your settings to proceed.', after: "Welcome in. Let's set up your workspace." },
  empty: { before: 'No records found. Please initiate the creation of a new entry.', after: 'Nothing here yet. Create your first project to get started.' },
  button: { before: 'Submit request', after: 'Create project' },
  error: { before: 'An error has occurred. Please try again later.', after: 'Something went wrong on our side. Try again in a minute.' },
};
const SLOTS: SlotId[] = ['header', 'empty', 'button', 'error'];

type Mode = 'before' | 'after';
/** Per-slot timing (frames, relative to the current shot). Infinity = never. */
type Timing = { hl?: Partial<Record<SlotId, number>>; rw?: Partial<Record<SlotId, number>>; mode?: Mode };

const UI = { w: 1400, h: 820 };
// Points of interest in window coordinates (title bar included).
const POI = { header: { x: 760, y: 200 }, empty: { x: 820, y: 470 }, toast: { x: 1060, y: 730 }, button: { x: 820, y: 572 } };

const SlotText: React.FC<{ id: SlotId; frame: number; t: Timing }> = ({ id, frame, t }) => {
  const { before, after } = COPY[id];
  if (t.mode) return <>{t.mode === 'after' ? after : before}</>;
  const hl = t.hl?.[id] ?? Infinity;
  const rw = t.rw?.[id] ?? Infinity;
  if (frame >= rw) {
    const n = Math.min(after.length, Math.floor((frame - rw) * 3));
    const typing = n < after.length;
    return (
      <span>
        {after.slice(0, n)}
        {typing && <span style={{ display: 'inline-block', width: '0.08em', height: '1em', background: C.accent, verticalAlign: '-0.12em', marginLeft: 2 }} />}
      </span>
    );
  }
  const a = Number.isFinite(hl) ? ease(frame, hl, 8) : 0;
  return (
    <span style={{ background: `rgba(34,211,166,${0.32 * a})`, boxShadow: `inset 0 ${-4 * a}px 0 ${C.accent}`, borderRadius: 4 }}>
      {before}
    </span>
  );
};

/** Generic web app screen with four pieces of interface copy. */
const AppScreen: React.FC<{ frame: number; t: Timing }> = ({ frame, t }) => (
  <div style={{ position: 'absolute', inset: 0, fontFamily: F.sans, color: C.ink }}>
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 240, background: C.bg, borderRight: `2px solid ${C.line}`, padding: '30px 24px' }}>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 28 }}>Workspace</div>
      {['Projects', 'Team', 'Billing', 'Settings'].map((n, i) => (
        <div key={n} style={{ marginTop: i ? 6 : 32, padding: '12px 14px', borderRadius: 12, fontSize: 20, fontWeight: 600, background: i === 0 ? C.ink : 'transparent', color: i === 0 ? C.onDark : C.body }}>
          {n}
        </div>
      ))}
    </div>
    <div style={{ position: 'absolute', left: 300, top: 40, width: 980 }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: C.body, letterSpacing: '.12em', textTransform: 'uppercase' }}>Projects</div>
      <div style={{ marginTop: 10, fontFamily: F.display, fontWeight: 700, fontSize: 36, lineHeight: 1.25, minHeight: 90 }}>
        <SlotText id="header" frame={frame} t={t} />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 300, top: 200, width: 1040, height: 340, borderRadius: 24, border: `3px dashed ${C.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 120px', textAlign: 'center' }}>
      <div style={{ width: 84, height: 84, borderRadius: 22, background: C.bg, display: 'grid', placeItems: 'center' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2">
          <path d="M3 7h7l2 2h9v10H3z" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontSize: 28, lineHeight: 1.35, minHeight: 76 }}>
        <SlotText id="empty" frame={frame} t={t} />
      </div>
      <div style={{ padding: '16px 34px', borderRadius: 999, background: C.ink, color: C.onDark, fontSize: 22, fontWeight: 600 }}>
        <SlotText id="button" frame={frame} t={t} />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 820, top: 590, width: 520, padding: '20px 26px', borderRadius: 20, background: C.panel, color: C.onDark, display: 'flex', gap: 16, alignItems: 'flex-start', fontSize: 20, lineHeight: 1.4 }}>
      <span style={{ flex: 'none', width: 14, height: 14, marginTop: 6, borderRadius: 7, background: C.muted }} />
      <span>
        <SlotText id="error" frame={frame} t={t} />
      </span>
    </div>
  </div>
);

/** Camera over the app window: zoom z centered on point p. */
const Camera: React.FC<{ frame: number; t: Timing; z?: [number, number]; p?: { x: number; y: number }; dur?: number; children?: React.ReactNode }> = ({
  frame,
  t,
  z = [1, 1],
  p = { x: UI.w / 2, y: UI.h / 2 },
  dur = 60,
  children,
}) => {
  const zoom = mix(ease(frame, 0, dur), z[0], z[1]);
  return (
    <Fit w={UI.w} h={UI.h} scale={0.98} cy={505}>
      <div style={{ width: UI.w, height: UI.h, overflow: 'hidden', borderRadius: 28, boxShadow: '0 40px 90px rgba(11,18,32,.16)' }}>
        <div style={{ transformOrigin: `${p.x}px ${p.y}px`, transform: `translate(${UI.w / 2 - p.x}px, ${UI.h / 2 - p.y}px) scale(${zoom})` }}>
          <AppWindow w={UI.w} h={UI.h} title="app.example.com/projects">
            {/* TODO: screenshot assets/perhalus/app-before.png (1400x764, a client screen before rewriting) */}
            <ScreenOrMock file="perhalus/app-before.png">
              <AppScreen frame={frame} t={t} />
            </ScreenOrMock>
          </AppWindow>
          {children}
        </div>
      </div>
    </Fit>
  );
};

const Label: React.FC<{ text: string; dark?: boolean }> = ({ text, dark }) => (
  <div style={{ position: 'absolute', top: 30, left: 120 }}>
    <Kicker text={text} dark={dark} size={26} />
  </div>
);

const PerhalusWordmark: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (
  // TODO: replace with the official Perhalus logo (assets/perhalus/logo.svg) when available.
  <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: size, letterSpacing: '-0.03em', color: dark ? C.onDark : C.ink }}>
    perhalus<span style={{ color: C.accent }}>.</span>
  </span>
);

const HL_ALL = { header: 6, empty: 12, button: 18, error: 24 };

const Wide: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="A typical app screen" />
      <div style={{ ...enter(frame, 0, 60) }}>
        <Camera frame={frame} t={{}} z={[1, 1.03]} />
      </div>
    </Shot>
  );
};

const ZoomEmpty: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Empty state" />
      <Camera frame={frame} t={{}} z={[1.5, 1.6]} p={POI.empty} />
    </Shot>
  );
};

const Highlights: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Scanning interface copy" />
      <Camera frame={frame} t={{ hl: HL_ALL }} z={[1, 1.02]} />
      <div style={{ position: 'absolute', right: 120, top: 22, ...scaleIn(frame, 30, 0.6) }}>
        <span style={{ display: 'inline-block', padding: '12px 26px', borderRadius: 999, background: C.ink, color: C.onDark, fontFamily: F.sans, fontWeight: 600, fontSize: 26 }}>
          4 stiff lines found
        </span>
      </div>
    </Shot>
  );
};

const PanelShot: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = ease(frame, 0, 10);
  return (
    <Shot>
      <Label text="Perhalus" />
      <Camera frame={60} t={{ hl: { header: 0, empty: 0, button: 0, error: 0 } }}>
        <div
          style={{
            position: 'absolute',
            top: 56,
            bottom: 0,
            right: 0,
            width: 470,
            background: C.card,
            borderLeft: `2px solid ${C.line}`,
            boxShadow: '-30px 0 60px rgba(11,18,32,.12)',
            transform: `translateX(${(1 - slide) * 100}%)`,
            padding: 30,
            fontFamily: F.sans,
          }}
        >
          <PerhalusWordmark size={34} />
          <div style={{ fontSize: 18, color: C.body, margin: '6px 0 22px' }}>4 suggestions on this screen</div>
          {SLOTS.map((id, i) => (
            <div key={id} style={{ padding: '14px 16px', borderRadius: 16, background: C.bg, marginBottom: 10, ...enter(frame, 6 + i * 3, 30, 'x', 8) }}>
              <div style={{ fontSize: 15, color: C.body, textDecoration: 'line-through', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{COPY[id].before}</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{COPY[id].after}</div>
            </div>
          ))}
          <div style={{ position: 'absolute', left: 30, right: 30, bottom: 30, height: 64, borderRadius: 999, background: C.accent, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 600, transform: frame >= 40 && frame < 46 ? 'scale(.96)' : 'none' }}>
            Rewrite in place
          </div>
        </div>
        <Cursor
          path={[
            { f: 14, x: 1000, y: 420 },
            { f: 40, x: 1165, y: 758, click: true },
          ]}
          size={52}
        />
      </Camera>
    </Shot>
  );
};

const RewriteTop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Rewriting in place" />
      <Camera frame={frame} t={{ hl: { header: -99, empty: -99, button: -99, error: -99 }, rw: { header: 4, empty: 22 } }} z={[1.35, 1.4]} p={{ x: 800, y: 330 }} />
    </Shot>
  );
};

const RewriteBottom: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Rewriting in place" />
      <Camera
        frame={frame}
        t={{ hl: { button: -99, error: -99 }, rw: { header: -99, empty: -99, button: 4, error: 14 } }}
        z={[1.5, 1.55]}
        p={{ x: 1000, y: 640 }}
      />
    </Shot>
  );
};

const Toggle: React.FC<{ mode: Mode; scale?: number }> = ({ mode, scale = 1 }) => (
  <div style={{ display: 'inline-flex', padding: 6 * scale, borderRadius: 999, background: C.card, border: `2px solid ${C.line}`, fontFamily: F.sans, fontWeight: 600, fontSize: 24 * scale }}>
    {(['before', 'after'] as Mode[]).map(m => (
      <span key={m} style={{ padding: `${10 * scale}px ${28 * scale}px`, borderRadius: 999, background: mode === m ? (m === 'after' ? C.accent : C.ink) : 'transparent', color: mode === m && m === 'before' ? C.onDark : C.ink }}>
        {m === 'before' ? 'Before' : 'After'}
      </span>
    ))}
  </div>
);

const ToggleShot: React.FC = () => {
  const frame = useCurrentFrame();
  const mode: Mode = frame >= 10 && frame < 42 ? 'before' : 'after';
  return (
    <Shot>
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 22 }}>
        <div style={{ ...scaleIn(frame, 0, 0.8) }}>
          <Toggle mode={mode} scale={1.4} />
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0, top: 70, transform: 'scale(.92)' }}>
        <Camera frame={frame} t={{ mode }} />
      </div>
      <Cursor
        path={[
          { f: 1, x: 1000, y: 140 },
          { f: 10, x: 845, y: 72, click: true },
          { f: 42, x: 1065, y: 72, click: true },
        ]}
        size={50}
      />
    </Shot>
  );
};

const SplitShot: React.FC = () => {
  const frame = useCurrentFrame();
  const card = (mode: Mode, delay: number) => (
    <div style={{ width: 760, padding: 48, borderRadius: 32, background: mode === 'before' ? C.card : C.ink, color: mode === 'before' ? C.ink : C.onDark, fontFamily: F.sans, ...enter(frame, delay, 60) }}>
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: mode === 'before' ? C.body : C.accent, marginBottom: 22 }}>{mode === 'before' ? 'Before' : 'After'}</div>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 44, lineHeight: 1.25, letterSpacing: '-0.02em', minHeight: 220 }}>{COPY.empty[mode]}</div>
      <div style={{ marginTop: 26, display: 'inline-block', padding: '14px 30px', borderRadius: 999, background: mode === 'before' ? C.ink : C.accent, color: mode === 'before' ? C.onDark : C.ink, fontSize: 24, fontWeight: 600 }}>{COPY.button[mode]}</div>
    </div>
  );
  return (
    <Shot>
      <AbsoluteFill style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40, paddingBottom: 90 }}>
        {card('before', 0)}
        {card('after', 6)}
      </AbsoluteFill>
    </Shot>
  );
};

const EndLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const tag = 60;
  return (
    <Shot bg={C.ink}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 40 }}>
        <div style={{ ...scaleIn(frame, 0, 0.75) }}>
          <PerhalusWordmark size={170} dark />
        </div>
        {frame >= tag && (
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 70, color: C.onDark, letterSpacing: '-0.02em', textAlign: 'center' }}>
            <RevealText delay={tag}>
              Copy that sounds like <span style={{ color: C.accent }}>your team.</span>
            </RevealText>
          </div>
        )}
      </AbsoluteFill>
    </Shot>
  );
};

const SHOTS: { from: number; dur: number; el: React.ReactNode }[] = [
  { from: 0, dur: 60, el: <Wide /> },
  { from: 60, dur: 60, el: <ZoomEmpty /> },
  { from: 120, dur: 60, el: <Highlights /> },
  { from: 180, dur: 60, el: <PanelShot /> },
  { from: 240, dur: 60, el: <RewriteTop /> },
  { from: 300, dur: 60, el: <RewriteBottom /> },
  { from: 360, dur: 60, el: <ToggleShot /> },
  { from: 420, dur: 60, el: <SplitShot /> },
  { from: 480, dur: 120, el: <EndLogo /> },
];

export const Perhalus: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {SHOTS.map(s => (
      <Sequence key={s.from} from={s.from} durationInFrames={s.dur}>
        {s.el}
      </Sequence>
    ))}
    <Captions videoId="perhalus" lines={PERHALUS_LINES} bottom={40} />
    <DifiraMark dark />
  </AbsoluteFill>
);

