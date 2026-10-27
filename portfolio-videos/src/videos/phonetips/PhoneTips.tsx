import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Captions } from '../../components/Captions';
import { Cursor } from '../../components/Cursor';
import { DifiraMark } from '../../components/DifiraMark';
import { Fit, Phone, RevealText, Shot } from '../../components/Layout';
import { Voiceover } from '../../components/Voiceover';
import { Line } from '../../lib/captions';
import { ease, enter, pop, scaleIn } from '../../lib/anim';
import { C, F, sec } from '../../theme';

export const PHONETIPS_DURATION = sec(30);

// Every number shown on screen (3, 1, 2, 3) is spoken in these lines.
export const PHONETIPS_LINES: Line[] = [
  { from: sec(0), to: sec(2.5), text: 'Phone stolen? These 3 settings protect you.', keyword: '3 settings' },
  { from: sec(2.5), to: sec(6), text: 'One: turn on remote lock and erase.', keyword: 'remote lock and erase.' },
  { from: sec(6), to: sec(10), text: 'Find it, lock it, or wipe it from any browser.', keyword: 'any browser.' },
  { from: sec(10), to: sec(13.5), text: 'Two: add a PIN to your SIM card.', keyword: 'SIM card.' },
  { from: sec(13.5), to: sec(17.5), text: 'So nobody can use your number to get your login codes.', keyword: 'login codes.' },
  { from: sec(17.5), to: sec(21), text: 'Three: hide message previews on your lock screen.', keyword: 'hide message previews' },
  { from: sec(21), to: sec(25), text: 'Your codes stay hidden, even when the phone is locked.', keyword: 'stay hidden,' },
  { from: sec(25), to: sec(30), text: 'Save this, and follow for more tips.', keyword: 'follow' },
];

const STEPS = ['Remote lock & erase', 'SIM card PIN', 'Hidden previews'];

const StepBadge: React.FC<{ n: number; size?: number }> = ({ n, size = 120 }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: C.accent, color: C.ink, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 700, fontSize: size * 0.55 }}>{n}</div>
);

/** Small badge + step name pinned to the top of every shot in a step. */
const StepHeader: React.FC<{ n: number; dark?: boolean }> = ({ n, dark }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, ...enter(frame, 0, -30) }}>
      <StepBadge n={n} size={84} />
      <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 54, letterSpacing: '-0.02em', color: dark ? C.onDark : C.ink }}>{STEPS[n - 1]}</span>
    </div>
  );
};

const PhoneStage: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => {
  const frame = useCurrentFrame();
  return (
    <Fit w={430} h={884} scale={1.35} cy={870}>
      <div style={{ ...enter(frame, 0, 120, 'y', 10) }}>
        <Phone dark={dark}>{children}</Phone>
      </div>
    </Fit>
  );
};

// ---------- Phone screens (generic, no platform branding) ----------
const ScreenTitle: React.FC<{ back?: string; title: string; dark?: boolean }> = ({ back, title, dark }) => (
  <div style={{ padding: '70px 24px 14px', color: dark ? C.onDark : C.ink }}>
    {back && <div style={{ fontSize: 16, fontWeight: 600, color: dark ? C.muted : C.body, marginBottom: 6 }}>‹ {back}</div>}
    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em' }}>{title}</div>
  </div>
);

const Switch: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 62, height: 36, borderRadius: 18, background: on > 0.5 ? C.accent : C.muted, position: 'relative', flex: 'none' }}>
    <div style={{ position: 'absolute', top: 3, left: 3 + on * 26, width: 30, height: 30, borderRadius: 15, background: C.card, boxShadow: '0 2px 6px rgba(11,18,32,.2)' }} />
  </div>
);

const Row: React.FC<{ label: string; sub?: string; right?: React.ReactNode; hot?: boolean }> = ({ label, sub, right, hot }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '18px 20px', background: hot ? 'rgba(34,211,166,.16)' : C.card, borderBottom: `1px solid ${C.line}` }}>
    <div>
      <div style={{ fontSize: 19, fontWeight: 600, color: C.ink }}>{label}</div>
      {sub && <div style={{ fontSize: 15, color: C.body, marginTop: 2 }}>{sub}</div>}
    </div>
    {right}
  </div>
);

const Group: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ margin: '10px 16px', borderRadius: 18, overflow: 'hidden', border: `1px solid ${C.line}` }}>{children}</div>
);

const FindDeviceSettings: React.FC<{ frame: number }> = ({ frame }) => {
  const on = ease(frame, 22, 6);
  return (
    <div>
      <ScreenTitle back="Settings" title="Security" />
      <Group>
        <Row label="Screen lock" sub="PIN" right={<span style={{ color: C.body }}>›</span>} />
        <Row label="Find your device" sub={on > 0.5 ? 'On' : 'Off'} right={<Switch on={on} />} hot={frame >= 22} />
        <Row label="Backup" right={<span style={{ color: C.body }}>›</span>} />
      </Group>
      <div style={{ padding: '6px 26px', fontSize: 15, color: C.body, lineHeight: 1.45 }}>Locate, lock or erase this phone from a browser if it is lost or stolen.</div>
    </div>
  );
};

const MapScreen: React.FC<{ frame: number; tap: number }> = ({ frame, tap }) => {
  const pulse = (frame % 30) / 30;
  const locked = frame >= tap + 6;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.card }}>
      {/* Simplified map: blocks and roads */}
      {[
        [30, 140, 140, 110], [200, 120, 160, 150], [40, 300, 120, 160], [190, 320, 170, 120], [60, 500, 150, 120], [240, 480, 120, 150],
      ].map(([x, y, w, h], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, background: C.bg }} />
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 280, height: 22, background: C.muted }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 170, width: 22, background: C.muted }} />
      <div style={{ position: 'absolute', left: 181, top: 291, width: 0, height: 0 }}>
        <div style={{ position: 'absolute', left: -60 * pulse - 14, top: -60 * pulse - 14, width: 28 + 120 * pulse, height: 28 + 120 * pulse, borderRadius: '50%', border: `3px solid ${C.accent}`, opacity: 1 - pulse }} />
        <div style={{ position: 'absolute', left: -16, top: -16, width: 32, height: 32, borderRadius: 16, background: C.accent, border: `5px solid ${C.ink}` }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px 22px 34px', borderRadius: '28px 28px 0 0', background: C.card, boxShadow: '0 -10px 30px rgba(11,18,32,.12)' }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26 }}>{locked ? 'Phone locked' : 'My phone'}</div>
        <div style={{ fontSize: 16, color: C.body, margin: '4px 0 18px' }}>{locked ? 'A message shows on its screen' : 'Seen just now'}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['Lock', 'Erase'].map(b => (
            <div key={b} style={{ flex: 1, height: 58, borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 600, background: b === 'Lock' ? (locked ? C.accent : C.ink) : C.bg, color: b === 'Lock' && !locked ? C.onDark : C.ink }}>
              {b === 'Lock' && locked ? 'Locked' : b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SimSettings: React.FC<{ frame: number }> = ({ frame }) => {
  const on = ease(frame, 16, 6);
  const dots = Math.min(4, Math.max(0, Math.floor((frame - 32) / 5)));
  return (
    <div>
      <ScreenTitle back="Mobile network" title="SIM card" />
      <Group>
        <Row label="SIM PIN" sub="Ask for a PIN when the phone starts" right={<Switch on={on} />} hot={frame >= 16} />
        <Row label="Change PIN" right={<span style={{ color: C.body }}>›</span>} />
      </Group>
      {frame >= 28 && (
        <div style={{ margin: '24px 16px', padding: 26, borderRadius: 22, background: C.card, border: `1px solid ${C.line}`, textAlign: 'center', ...scaleIn(frame, 28, 0.85) }}>
          <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 18 }}>Enter new SIM PIN</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
            {[0, 1, 2, 3].map(i => (
              <span key={i} style={{ width: 22, height: 22, borderRadius: 11, border: `3px solid ${C.ink}`, background: i < dots ? C.ink : 'transparent' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SimLocked: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, padding: 34, textAlign: 'center', color: C.onDark }}>
    <div style={{ position: 'relative', width: 150, height: 190, ...scaleIn(frame, 4, 0.7) }}>
      <svg width="150" height="190" viewBox="0 0 30 38">
        <path d="M4 2h15l9 9v23a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill={C.panel2} stroke={C.muted} strokeWidth="1.2" />
        <rect x="8" y="16" width="14" height="12" rx="2" fill="none" stroke={C.muted} strokeWidth="1.2" />
      </svg>
      <div style={{ position: 'absolute', right: -24, bottom: -10, width: 78, height: 78, borderRadius: 39, background: C.accent, display: 'grid', placeItems: 'center', ...scaleIn(frame, 14, 0.4) }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
    </div>
    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 32, ...enter(frame, 18, 20) }}>SIM locked</div>
    <div style={{ fontSize: 19, color: C.muted, lineHeight: 1.45, ...enter(frame, 24, 20) }}>No PIN, no calls, no texts, no login codes.</div>
  </div>
);

const PreviewSettings: React.FC<{ frame: number }> = ({ frame }) => {
  const chosen = frame >= 26 ? 1 : 0;
  return (
    <div>
      <ScreenTitle back="Notifications" title="Show previews" />
      <Group>
        {['Always', 'When unlocked', 'Never'].map((o, i) => (
          <Row key={o} label={o} hot={frame >= 26 && i === 1} right={i === chosen ? <span style={{ width: 28, height: 28, borderRadius: 14, background: C.accent, display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700 }}>✓</span> : null} />
        ))}
      </Group>
      <div style={{ padding: '6px 26px', fontSize: 15, color: C.body, lineHeight: 1.45 }}>Message text stays hidden on the lock screen.</div>
    </div>
  );
};

const LockScreen: React.FC<{ frame: number; flip: number }> = ({ frame, flip }) => {
  const hidden = frame >= flip;
  return (
    <div style={{ position: 'absolute', inset: 0, color: C.onDark }}>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke={C.onDark} strokeWidth="2" strokeLinecap="round">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 18, right: 18, top: 300, padding: '18px 20px', borderRadius: 22, background: C.panel2, border: `1px solid ${C.panelLine}`, ...enter(frame, 2, 30) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: C.muted, marginBottom: 6 }}>
          <span>Messages</span>
          <span>now</span>
        </div>
        <div style={{ fontSize: 19, fontWeight: 600 }}>{hidden ? 'Notification' : 'Your bank'}</div>
        <div style={{ fontSize: 18, color: hidden ? C.accent : C.onDark }}>{hidden ? 'Content hidden' : 'Your login code is ••••••'}</div>
      </div>
      {hidden && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', ...scaleIn(frame, flip, 0.6) }}>
          <span style={{ padding: '10px 22px', borderRadius: 999, background: C.accent, color: C.ink, fontSize: 18, fontWeight: 600 }}>Hidden until unlocked</span>
        </div>
      )}
    </div>
  );
};

// ---------- Shots ----------
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={C.ink}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 50, paddingBottom: 260 }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 130, color: C.onDark, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.05, transform: `scale(${1.3 - 0.3 * pop(frame, 0)})`, opacity: Math.min(1, pop(frame, 0) * 2) }}>
          Phone
          <br />
          stolen?
        </div>
        {frame >= 22 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 30, ...scaleIn(frame, 22, 0.5) }}>
            <StepBadge n={3} size={170} />
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 64, color: C.onDark, lineHeight: 1.1 }}>
              settings
              <br />
              <span style={{ color: C.accent }}>to turn on</span>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </Shot>
  );
};

const StepIntro: React.FC<{ n: number }> = ({ n }) => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={n === 2 ? C.card : C.bg}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 50, paddingBottom: 300 }}>
        <div style={{ ...scaleIn(frame, 0, 0.3) }}>
          <StepBadge n={n} size={300} />
        </div>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 88, letterSpacing: '-0.02em', color: C.ink, textAlign: 'center', lineHeight: 1.1, padding: '0 60px' }}>
          <RevealText delay={8}>{STEPS[n - 1]}</RevealText>
        </div>
      </AbsoluteFill>
    </Shot>
  );
};

const PhoneShot: React.FC<{ n: number; dark?: boolean; bg?: string; screen: (frame: number) => React.ReactNode; cursor?: { f: number; x: number; y: number; click?: boolean }[] }> = ({
  n,
  dark,
  bg,
  screen,
  cursor,
}) => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={bg ?? C.bg}>
      <StepHeader n={n} dark={bg === C.ink} />
      <PhoneStage dark={dark}>
        {screen(frame)}
        {cursor && <Cursor path={cursor} size={40} />}
      </PhoneStage>
    </Shot>
  );
};

const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <AbsoluteFill style={{ justifyContent: 'center', padding: '0 90px', paddingBottom: 300, gap: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, ...enter(frame, 0, 30) }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill={C.accent} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round">
            <path d="M6 3h12v18l-6-4-6 4z" />
          </svg>
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 70, letterSpacing: '-0.02em' }}>Save this</span>
        </div>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '30px 34px', borderRadius: 28, background: C.card, ...enter(frame, 6 + i * 5, 80, 'x') }}>
            <StepBadge n={i + 1} size={90} />
            <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 52, letterSpacing: '-0.02em' }}>{s}</span>
          </div>
        ))}
      </AbsoluteFill>
    </Shot>
  );
};

const FollowCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={C.ink}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 60, paddingBottom: 300 }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 120, color: C.onDark, textAlign: 'center', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <RevealText delay={0}>Follow for</RevealText>
          <RevealText delay={5}>
            <span style={{ color: C.accent }}>more tips</span>
          </RevealText>
        </div>
        <div style={{ padding: '28px 70px', borderRadius: 999, background: C.accent, color: C.ink, fontFamily: F.sans, fontWeight: 600, fontSize: 52, ...scaleIn(frame, 14, 0.6) }}>Follow</div>
      </AbsoluteFill>
    </Shot>
  );
};

const SHOTS: { from: number; dur: number; el: React.ReactNode }[] = [
  { from: 0, dur: 75, el: <Hook /> },
  { from: 75, dur: 60, el: <StepIntro n={1} /> },
  { from: 135, dur: 75, el: <PhoneShot n={1} screen={f => <FindDeviceSettings frame={f} />} cursor={[{ f: 4, x: 240, y: 380 }, { f: 22, x: 335, y: 310, click: true }]} /> },
  { from: 210, dur: 90, el: <PhoneShot n={1} bg={C.card} screen={f => <MapScreen frame={f} tap={40} />} cursor={[{ f: 10, x: 260, y: 600 }, { f: 40, x: 105, y: 781, click: true }]} /> },
  { from: 300, dur: 60, el: <StepIntro n={2} /> },
  { from: 360, dur: 75, el: <PhoneShot n={2} screen={f => <SimSettings frame={f} />} cursor={[{ f: 2, x: 230, y: 330 }, { f: 16, x: 335, y: 210, click: true }]} /> },
  { from: 435, dur: 90, el: <PhoneShot n={2} dark bg={C.ink} screen={f => <SimLocked frame={f} />} /> },
  { from: 525, dur: 60, el: <StepIntro n={3} /> },
  { from: 585, dur: 75, el: <PhoneShot n={3} screen={f => <PreviewSettings frame={f} />} cursor={[{ f: 4, x: 260, y: 400 }, { f: 26, x: 200, y: 261, click: true }]} /> },
  { from: 660, dur: 90, el: <PhoneShot n={3} dark bg={C.ink} screen={f => <LockScreen frame={f} flip={40} />} /> },
  { from: 750, dur: 75, el: <Recap /> },
  { from: 825, dur: 75, el: <FollowCard /> },
];

export const PhoneTips: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {SHOTS.map(s => (
      <Sequence key={s.from} from={s.from} durationInFrames={s.dur}>
        {s.el}
      </Sequence>
    ))}
    <Captions videoId="phonetips" lines={PHONETIPS_LINES} bottom={250} />
    <Voiceover videoId="phonetips" lines={PHONETIPS_LINES} />
    <DifiraMark dark />
  </AbsoluteFill>
);
