import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Captions } from '../../components/Captions';
import { Cursor, CursorKey } from '../../components/Cursor';
import { DifiraMark } from '../../components/DifiraMark';
import { AppWindow, Fit, Kicker, Phone, RevealText, ScreenOrMock, Shot, useVertical } from '../../components/Layout';
import { Voiceover } from '../../components/Voiceover';
import { count, ease, enter, pop, scaleIn } from '../../lib/anim';
import { C, F, sec } from '../../theme';
import {
  Add,
  CASHIER,
  CashierMock,
  ChatScreen,
  Cup,
  HourlyBars,
  InventoryMock,
  PAY_BUTTON,
  PAYMENT,
  PaymentMock,
  PayrollCard,
  Receipt,
  ReportBody,
  ShiftMock,
  StockGauge,
  TehposWordmark,
  TopItems,
  methodCenter,
  tileCenter,
} from './mocks';
import { PRODUCTS, TEHPOS_LINES } from './script';

export const TEHPOS_DURATION = sec(40);

/** Fits a w x h design into the main stage area for the current aspect ratio. */
const Stage: React.FC<{ w: number; h: number; children: React.ReactNode; fill?: number; cy?: number }> = ({ w, h, children, fill = 1, cy }) => {
  const vertical = useVertical();
  const box = vertical ? { w: 960, h: 1060, cy: 900 } : { w: 1640, h: 760, cy: 515 };
  const scale = Math.min(box.w / w, box.h / h) * fill;
  return (
    <Fit w={w} h={h} scale={scale} cy={cy ?? box.cy}>
      {children}
    </Fit>
  );
};

const Label: React.FC<{ text: string; dark?: boolean }> = ({ text, dark }) => {
  const vertical = useVertical();
  return (
    <div style={vertical ? { position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center' } : { position: 'absolute', top: 58, left: 120 }}>
      <Kicker text={text} dark={dark} />
    </div>
  );
};

// ---------- Hook ----------
const BusyCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const tickets = ['Milk Tea ×2', 'Lemon Tea', 'Thai Tea ×3', 'Matcha Latte', 'Butter Toast', 'Iced Jasmine Tea ×2'];
  return (
    <Shot>
      <Label text="Open · all day" />
      <Stage w={1500} h={760}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 210, borderRadius: 32, background: C.ink }} />
        <div style={{ position: 'absolute', left: 60, bottom: 210, display: 'flex', gap: 34, alignItems: 'flex-end' }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{ ...scaleIn(frame, 2 + i * 4, 0.4), transformOrigin: 'bottom' }}>
              <Cup size={150} fill={i % 2 ? C.accent : C.card} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', right: 40, top: 20, width: 560, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tickets.map((t, i) => (
            <div
              key={t}
              style={{
                padding: '18px 26px',
                borderRadius: 18,
                background: C.card,
                fontFamily: F.sans,
                fontSize: 30,
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(11,18,32,.08)',
                ...enter(frame, i * 5, 80, 'x', 8),
              }}
            >
              <span>{t}</span>
              <span style={{ color: C.body }}>#{41 + i}</span>
            </div>
          ))}
        </div>
      </Stage>
    </Shot>
  );
};

const PaperPile: React.FC = () => {
  const frame = useCurrentFrame();
  const notes = [
    { x: 80, y: 120, r: -8 },
    { x: 420, y: 60, r: 6 },
    { x: 760, y: 140, r: -4 },
    { x: 200, y: 380, r: 5 },
    { x: 560, y: 360, r: -7 },
    { x: 900, y: 420, r: 9 },
  ];
  return (
    <Shot bg={C.bg}>
      <Label text="End of day" />
      <Stage w={1500} h={760}>
        {notes.map((n, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: n.x,
              top: n.y,
              width: 360,
              height: 260,
              borderRadius: 14,
              background: C.card,
              padding: 28,
              boxShadow: '0 16px 40px rgba(11,18,32,.12)',
              transform: `rotate(${n.r}deg) translateY(${(1 - pop(frame, i * 3)) * -120}px)`,
              opacity: Math.min(1, pop(frame, i * 3) * 2),
            }}
          >
            {[0.8, 0.55, 0.7, 0.4].map((w, j) => (
              <div key={j} style={{ width: `${w * 100}%`, height: 14, borderRadius: 7, background: j === 0 ? C.ink : C.muted, marginBottom: 22 }} />
            ))}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            right: 20,
            bottom: 40,
            width: 470,
            padding: '34px 40px',
            borderRadius: 28,
            background: C.ink,
            color: C.onDark,
            fontFamily: F.sans,
            ...scaleIn(frame, 20, 0.7),
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 600, color: C.muted }}>Today's earnings</div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 96, lineHeight: 1.1, color: C.accent }}>Rp ?</div>
        </div>
      </Stage>
    </Shot>
  );
};

// ---------- Problems ----------
const ProblemCard: React.FC<{ index: number; title: string; icon: React.ReactNode }> = ({ index, title, icon }) => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  return (
    <Shot bg={index === 1 ? C.card : C.bg}>
      <Label text={`Problem ${index + 1} of 3`} />
      <Stage w={1100} h={640}>
        <div
          style={{
            width: 1100,
            height: 640,
            borderRadius: 40,
            background: index === 1 ? C.bg : C.card,
            padding: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            ...enter(frame, 0, 140, 'x', 9),
          }}
        >
          <div style={{ width: 180, height: 180, borderRadius: 40, background: C.ink, display: 'grid', placeItems: 'center', ...scaleIn(frame, 5, 0.5) }}>{icon}</div>
          <RevealText delay={6} style={{ fontFamily: F.display, fontWeight: 700, fontSize: vertical ? 104 : 96, letterSpacing: '-0.02em', color: C.ink }}>
            {title}
          </RevealText>
        </div>
      </Stage>
    </Shot>
  );
};

const NoteIcon = (
  <svg width="100" height="100" viewBox="0 0 48 48" fill="none" stroke={C.onDark} strokeWidth="3" strokeLinejoin="round">
    <path d="M10 6h20l8 8v28H10z" />
    <path d="M16 20h16M16 27h16M16 34h10" />
    <path d="M30 6v8h8" stroke={C.accent} />
  </svg>
);
const BoxIcon = (
  <svg width="100" height="100" viewBox="0 0 48 48" fill="none" stroke={C.onDark} strokeWidth="3" strokeLinejoin="round">
    <path d="M6 15l18-9 18 9v20l-18 9-18-9z" />
    <path d="M6 15l18 9 18-9M24 24v20" />
    <text x="31" y="41" fontSize="16" fontFamily="sans-serif" fill={C.accent} stroke="none" fontWeight="700">?</text>
  </svg>
);
const ChatIcon = (
  <svg width="100" height="100" viewBox="0 0 48 48" fill="none" stroke={C.onDark} strokeWidth="3" strokeLinejoin="round">
    <path d="M6 8h26v18H16l-8 6v-6H6z" />
    <path d="M36 16h6v18h-2v6l-8-6H20v-4" stroke={C.accent} />
  </svg>
);

// ---------- Cashier ----------
const ADDS: Add[] = [
  { f: 16, id: 0 },
  { f: 34, id: 1 },
  { f: 50, id: 1 },
  { f: 66, id: 5 },
];
const FINAL_ITEMS = [
  { id: 0, qty: 1 },
  { id: 1, qty: 2 },
  { id: 5, qty: 1 },
];
const FINAL_TOTAL = FINAL_ITEMS.reduce((n, l) => n + PRODUCTS[l.id].price * l.qty, 0);

const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  return (
    <Shot bg={C.ink}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 40 }}>
        <div style={{ ...scaleIn(frame, 0, 0.6) }}>
          <div style={{ width: vertical ? 240 : 200, height: vertical ? 240 : 200, borderRadius: 56, background: C.accent, display: 'grid', placeItems: 'center' }}>
            <Cup size={vertical ? 150 : 124} fill={C.card} />
          </div>
        </div>
        <RevealText delay={8}>
          <TehposWordmark size={vertical ? 170 : 150} dark />
        </RevealText>
        <div style={{ ...enter(frame, 22, 20), fontFamily: F.sans, fontWeight: 600, fontSize: vertical ? 42 : 34, color: C.muted }}>Point of sale for shops and cafes</div>
      </AbsoluteFill>
    </Shot>
  );
};

const CashierShot: React.FC = () => {
  const frame = useCurrentFrame();
  const path: CursorKey[] = [
    { f: 4, x: 900, y: 760 },
    ...ADDS.map(a => ({ f: a.f, x: tileCenter(a.id).x, y: tileCenter(a.id).y, click: true })),
    { f: 84, x: PAY_BUTTON.x - 60, y: PAY_BUTTON.y - 20 },
  ];
  return (
    <Shot>
      <Label text="Checkout" />
      <Stage w={CASHIER.w} h={CASHIER.h}>
        <AppWindow w={CASHIER.w} h={CASHIER.h} title="TehPOS · Cashier">
          {/* TODO: screenshot assets/tehpos/cashier.png (1400x764, cashier screen) */}
          <ScreenOrMock file="tehpos/cashier.png">
            <CashierMock frame={frame} adds={ADDS} />
          </ScreenOrMock>
        </AppWindow>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Cursor path={path} size={56} />
        </div>
      </Stage>
    </Shot>
  );
};

const PayClose: React.FC = () => {
  // Close-up of the bottom of the order panel: total and the pay button.
  const W = 560;
  const H = 470;
  return (
    <Shot zoom={[1, 1.05]}>
      <Label text="Order #048" />
      <Stage w={W} h={H} fill={0.92}>
        <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', borderRadius: 28, boxShadow: '0 40px 90px rgba(11,18,32,.16)' }}>
          <div style={{ position: 'absolute', left: W - CASHIER.w, top: H - CASHIER.h }}>
            <AppWindow w={CASHIER.w} h={CASHIER.h}>
              <CashierMock frame={200} adds={ADDS} />
            </AppWindow>
            <Cursor
              path={[
                { f: 2, x: PAY_BUTTON.x - 140, y: PAY_BUTTON.y - 200 },
                { f: 24, x: PAY_BUTTON.x, y: PAY_BUTTON.y, click: true },
              ]}
              size={40}
            />
          </div>
        </div>
      </Stage>
    </Shot>
  );
};

const PaymentShot: React.FC = () => {
  const frame = useCurrentFrame();
  const qr = methodCenter(2);
  return (
    <Shot bg={C.ink}>
      <Label text="Every payment method" dark />
      <Stage w={PAYMENT.w} h={PAYMENT.h}>
        <div style={{ position: 'relative', width: PAYMENT.w, height: PAYMENT.h }}>
          <PaymentMock frame={frame} pick={24} total={FINAL_TOTAL} />
          <Cursor
            path={[
              { f: 6, x: 900, y: 640 },
              { f: 24, x: qr.x, y: qr.y, click: true },
            ]}
            size={60}
          />
        </div>
      </Stage>
    </Shot>
  );
};

const ReceiptShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Receipt" />
      <Stage w={620} h={900}>
        <Receipt frame={frame} items={FINAL_ITEMS} />
      </Stage>
    </Shot>
  );
};

// ---------- Stock and shifts ----------
const InventoryShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Stock" />
      <Stage w={CASHIER.w} h={CASHIER.h}>
        <AppWindow w={CASHIER.w} h={CASHIER.h} title="TehPOS · Stock">
          {/* TODO: screenshot assets/tehpos/inventory.png (1400x764, stock list) */}
          <ScreenOrMock file="tehpos/inventory.png">
            <InventoryMock frame={frame} />
          </ScreenOrMock>
        </AppWindow>
      </Stage>
    </Shot>
  );
};

const GaugeShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={C.panel}>
      <Label text="Live stock" dark />
      <Stage w={900} h={560}>
        <div style={{ ...scaleIn(frame, 0, 0.9) }}>
          <StockGauge frame={frame} />
        </div>
      </Stage>
    </Shot>
  );
};

const ShiftShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot>
      <Label text="Shifts" />
      <Stage w={CASHIER.w} h={CASHIER.h}>
        <AppWindow w={CASHIER.w} h={CASHIER.h} title="TehPOS · Shifts">
          {/* TODO: screenshot assets/tehpos/shifts.png (1400x764, weekly shift schedule) */}
          <ScreenOrMock file="tehpos/shifts.png">
            <ShiftMock frame={frame} />
          </ScreenOrMock>
        </AppWindow>
      </Stage>
    </Shot>
  );
};

const PayrollShot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={C.card}>
      <Label text="Payroll" />
      <Stage w={860} h={520}>
        <div style={{ ...enter(frame, 0, 60) }}>
          <PayrollCard frame={frame} />
        </div>
      </Stage>
    </Shot>
  );
};

// ---------- Daily report ----------
const EveningShot: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const minutes = count(frame, 0, 40, 58, 60);
  const time = minutes >= 60 ? '21:00' : `20:${minutes}`;
  const ring = ease(frame, 0, 40);
  const r = 190;
  const circ = 2 * Math.PI * r;
  return (
    <Shot bg={C.ink}>
      <Label text="Closing time" dark />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: vertical ? 'column' : 'row', gap: 80 }}>
        <div style={{ position: 'relative', width: 440, height: 440, ...scaleIn(frame, 0, 0.8) }}>
          <svg width="440" height="440" viewBox="0 0 440 440" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="220" cy="220" r={r} fill="none" stroke={C.panelLine} strokeWidth="18" />
            <circle cx="220" cy="220" r={r} fill="none" stroke={C.accent} strokeWidth="18" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - ring)} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 700, fontSize: 104, color: C.onDark }}>{time}</div>
        </div>
        <div style={{ ...enter(frame, 26, 30), padding: '18px 34px', borderRadius: 999, background: C.panel, border: `2px solid ${C.panelLine}`, color: C.onDark, fontFamily: F.sans, fontWeight: 600, fontSize: 36 }}>
          Shop closed
        </div>
      </AbsoluteFill>
    </Shot>
  );
};

const ChatShot: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const arrive = 14;
  return (
    <Shot>
      <Label text="Daily report · 9:00 PM" />
      <Fit w={430} h={884} scale={vertical ? 0.92 : 0.84} cx={vertical ? 540 : 560} cy={vertical ? 740 : 520}>
        <div style={{ ...enter(frame, 0, 80) }}>
          <Phone>
            {/* TODO: screenshot assets/tehpos/report-chat.png (390x844, report message in chat) */}
            <ScreenOrMock file="tehpos/report-chat.png">
              <ChatScreen frame={frame} arrive={arrive} />
            </ScreenOrMock>
          </Phone>
        </div>
      </Fit>
      <Fit w={760} h={330} scale={vertical ? 1.15 : 1} cx={vertical ? 540 : 1280} cy={vertical ? 1250 : 500}>
        {frame >= arrive + 8 && (
          <div style={{ width: 760, padding: 40, borderRadius: 32, background: C.card, boxShadow: '0 40px 90px rgba(11,18,32,.16)', ...enter(frame, arrive + 8, 60, 'x', 9) }}>
            <ReportBody frame={frame - arrive - 8} />
          </div>
        )}
      </Fit>
    </Shot>
  );
};

const ReportCloseUp: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Shot bg={C.panel}>
      <Label text="Every evening" dark />
      <Stage w={1100} h={560} fill={0.95}>
        <div style={{ ...scaleIn(frame, 0, 0.9) }}>
          <HourlyBars frame={frame} />
        </div>
      </Stage>
    </Shot>
  );
};

const ReportSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  return (
    <Shot>
      <Label text="Sent to your chat" />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: vertical ? 'column' : 'row', gap: 40, paddingBottom: vertical ? 120 : 80 }}>
        <div style={{ width: 760, padding: 44, borderRadius: 32, background: C.card, boxShadow: '0 40px 90px rgba(11,18,32,.14)', ...enter(frame, 0, 60, 'x') }}>
          <ReportBody frame={frame} />
        </div>
        <div style={{ ...enter(frame, 6, 60, 'x') }}>
          <div style={{ zoom: vertical ? 0.95 : 0.75 }}>
            <TopItems frame={frame - 6} />
          </div>
        </div>
      </AbsoluteFill>
    </Shot>
  );
};

// ---------- End card ----------
const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const vertical = useVertical();
  const tag = 60;
  const url = 120;
  return (
    <Shot bg={C.bg}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: vertical ? 240 : 160 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, ...scaleIn(frame, 0, 0.7) }}>
          <div style={{ width: vertical ? 170 : 150, height: vertical ? 170 : 150, borderRadius: 40, background: C.ink, display: 'grid', placeItems: 'center' }}>
            <Cup size={vertical ? 106 : 94} fill={C.accent} stroke={C.onDark} />
          </div>
          <TehposWordmark size={vertical ? 150 : 140} />
        </div>
        {frame >= tag && (
          <div style={{ marginTop: 50, textAlign: 'center', fontFamily: F.display, fontWeight: 700, fontSize: vertical ? 76 : 70, letterSpacing: '-0.02em', color: C.ink, lineHeight: 1.15 }}>
            <RevealText delay={tag}>Run your shop,</RevealText>
            <RevealText delay={tag + 6}>
              <span style={{ boxShadow: `inset 0 -0.3em 0 ${C.accent}` }}>not your spreadsheet.</span>
            </RevealText>
          </div>
        )}
        {frame >= url && (
          <div style={{ marginTop: 40, padding: '16px 34px', borderRadius: 999, background: C.ink, color: C.onDark, fontFamily: F.sans, fontWeight: 600, fontSize: vertical ? 40 : 32, ...scaleIn(frame, url, 0.7) }}>
            tehpos.vercel.app
          </div>
        )}
      </AbsoluteFill>
    </Shot>
  );
};

type ShotDef = { from: number; dur: number; el: React.ReactNode };
const SHOTS: ShotDef[] = [
  { from: 0, dur: 45, el: <BusyCounter /> },
  { from: 45, dur: 45, el: <PaperPile /> },
  { from: 90, dur: 50, el: <ProblemCard index={0} title="Paper notes." icon={NoteIcon} /> },
  { from: 140, dur: 50, el: <ProblemCard index={1} title="Guesswork stock." icon={BoxIcon} /> },
  { from: 190, dur: 50, el: <ProblemCard index={2} title="Shifts on a group chat." icon={ChatIcon} /> },
  { from: 240, dur: 60, el: <BrandIntro /> },
  { from: 300, dur: 90, el: <CashierShot /> },
  { from: 390, dur: 50, el: <PayClose /> },
  { from: 440, dur: 55, el: <PaymentShot /> },
  { from: 495, dur: 45, el: <ReceiptShot /> },
  { from: 540, dur: 75, el: <InventoryShot /> },
  { from: 615, dur: 75, el: <GaugeShot /> },
  { from: 690, dur: 45, el: <ShiftShot /> },
  { from: 735, dur: 45, el: <PayrollShot /> },
  { from: 780, dur: 60, el: <EveningShot /> },
  { from: 840, dur: 90, el: <ChatShot /> },
  { from: 930, dur: 45, el: <ReportCloseUp /> },
  { from: 975, dur: 45, el: <ReportSummary /> },
  { from: 1020, dur: 180, el: <EndCard /> },
];

export const TehPOS: React.FC = () => {
  const { height, width } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {SHOTS.map(s => (
        <Sequence key={s.from} from={s.from} durationInFrames={s.dur}>
          {s.el}
        </Sequence>
      ))}
      <Captions videoId="tehpos" lines={TEHPOS_LINES} bottom={height > width ? 300 : 56} />
      <Voiceover videoId="tehpos" lines={TEHPOS_LINES} />
      <DifiraMark />
    </AbsoluteFill>
  );
};

