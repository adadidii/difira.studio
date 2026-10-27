// Coded UI mockups for TehPOS. Each one is drawn at a fixed design size so cursor
// coordinates stay stable; <ScreenOrMock> swaps in a real screenshot when it exists.
import React from 'react';
import { count, ease, enter, fmt, pop, scaleIn } from '../../lib/anim';
import { C, F } from '../../theme';
import { PRODUCTS, rp } from './script';

export const CASHIER = { w: 1400, h: 820 };

// Tile geometry inside the cashier window (design units, includes the 56px title bar).
const GRID_X = 220 + 32;
const GRID_Y = 56 + 32 + 78;
const TILE_W = 225;
const TILE_H = 236;
const GAP = 20;
export const tileCenter = (i: number) => ({
  x: GRID_X + (i % 3) * (TILE_W + GAP) + TILE_W / 2,
  y: GRID_Y + Math.floor(i / 3) * (TILE_H + GAP) + TILE_H / 2,
});
export const PAY_BUTTON = { x: 1200, y: 56 + 764 - 28 - 40 };

export const Cup: React.FC<{ size: number; fill?: string; stroke?: string }> = ({ size, fill = C.card, stroke = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M12 10h24l-3 32H15z" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
    <path d="M14 22h20" stroke={stroke} strokeWidth="3" />
    <path d="M26 10l4-7" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const TehposWordmark: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (
  // TODO: replace with the official TehPOS logo (assets/tehpos/logo.svg) when available.
  <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: size, letterSpacing: '-0.03em', color: dark ? C.onDark : C.ink }}>
    tehpos<span style={{ color: C.accent }}>.</span>
  </span>
);

const Sidebar: React.FC<{ active: string }> = ({ active }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 220, background: C.bg, borderRight: `2px solid ${C.line}`, padding: '30px 22px' }}>
    <TehposWordmark size={30} />
    <div style={{ marginTop: 34 }}>
      {['Cashier', 'Orders', 'Stock', 'Shifts', 'Reports'].map(item => (
        <div
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            marginBottom: 6,
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            background: item === active ? C.ink : 'transparent',
            color: item === active ? C.onDark : C.body,
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: 4, border: `2px solid currentColor` }} />
          {item}
        </div>
      ))}
    </div>
  </div>
);

export type Add = { f: number; id: number };

/** Cashier screen. `adds` are product taps (frame, product index) relative to the shot. */
export const CashierMock: React.FC<{ frame: number; adds: Add[] }> = ({ frame, adds }) => {
  const done = adds.filter(a => frame >= a.f);
  const lines: { id: number; qty: number; f: number }[] = [];
  done.forEach(a => {
    const line = lines.find(l => l.id === a.id);
    if (line) line.qty += 1;
    else lines.push({ id: a.id, qty: 1, f: a.f });
  });
  const total = lines.reduce((n, l) => n + PRODUCTS[l.id].price * l.qty, 0);
  const last = done[done.length - 1];
  const prevTotal = done.slice(0, -1).reduce((n, a) => n + PRODUCTS[a.id].price, 0);
  const shownTotal = last ? prevTotal + (total - prevTotal) * ease(frame, last.f, 8) : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: F.sans }}>
      <Sidebar active="Cashier" />
      <div style={{ position: 'absolute', left: 220, top: 0, width: 780, bottom: 0, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 58, marginBottom: 20 }}>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 30 }}>New order</div>
          <div style={{ background: C.bg, borderRadius: 999, padding: '10px 20px', fontSize: 18, color: C.body, fontWeight: 600 }}>Search menu</div>
        </div>
        {PRODUCTS.map((p, i) => {
          const tapped = adds.find(a => a.id === i && frame >= a.f && frame < a.f + 8);
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <div
              key={p.name}
              style={{
                position: 'absolute',
                left: 32 + col * (TILE_W + GAP),
                top: 32 + 78 + row * (TILE_H + GAP),
                width: TILE_W,
                height: TILE_H,
                borderRadius: 20,
                background: tapped ? C.accent : C.bg,
                padding: 16,
                transform: tapped ? 'scale(.96)' : 'none',
              }}
            >
              <div style={{ height: 128, borderRadius: 14, background: C.card, display: 'grid', placeItems: 'center' }}>
                <Cup size={70} fill={i % 2 ? C.card : C.bg} />
              </div>
              <div style={{ marginTop: 14, fontSize: 20, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 18, color: C.body }}>{rp(p.price)}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 400, borderLeft: `2px solid ${C.line}`, padding: 28, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 600 }}>
          <span>Order #048</span>
          <span style={{ color: C.body }}>Table 3</span>
        </div>
        <div style={{ marginTop: 18, flex: 1 }}>
          {lines.map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `2px solid ${C.line}`, fontSize: 20, ...enter(frame, l.f, 20, 'x', 7) }}>
              <span>
                <b style={{ fontWeight: 600 }}>{PRODUCTS[l.id].name}</b>
                <br />
                <span style={{ color: C.body, fontSize: 17 }}>
                  {l.qty} × {rp(PRODUCTS[l.id].price)}
                </span>
              </span>
              <b style={{ fontWeight: 600 }}>{rp(PRODUCTS[l.id].price * l.qty)}</b>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `2px solid ${C.ink}`, paddingTop: 16, marginBottom: 18 }}>
          <span style={{ fontSize: 20, color: C.body, fontWeight: 600 }}>Total</span>
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 38 }}>{rp(shownTotal)}</span>
        </div>
        <div style={{ height: 80, borderRadius: 999, background: C.accent, display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 600 }}>Pay now</div>
      </div>
    </div>
  );
};

const METHODS = ['Cash', 'Card', 'QR code', 'Bank transfer'];
export const PAYMENT = { w: 1100, h: 700 };
export const methodCenter = (i: number) => ({ x: 60 + (i % 2) * 500 + 240, y: 190 + Math.floor(i / 2) * 210 + 90 });

const MethodIcon: React.FC<{ i: number }> = ({ i }) => (
  <svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke={C.ink} strokeWidth="3" strokeLinejoin="round">
    {i === 0 && (
      <>
        <rect x="4" y="12" width="40" height="24" rx="4" />
        <circle cx="24" cy="24" r="6" />
      </>
    )}
    {i === 1 && (
      <>
        <rect x="4" y="10" width="40" height="28" rx="5" />
        <path d="M4 19h40M11 30h10" />
      </>
    )}
    {i === 2 && (
      <>
        <rect x="6" y="6" width="14" height="14" rx="2" />
        <rect x="28" y="6" width="14" height="14" rx="2" />
        <rect x="6" y="28" width="14" height="14" rx="2" />
        <path d="M28 28h6v6h-6zM36 36h6v6h-6z" fill={C.ink} />
      </>
    )}
    {i === 3 && (
      <>
        <path d="M6 18L24 7l18 11z" />
        <path d="M10 22v14M19 22v14M29 22v14M38 22v14M6 40h36" />
      </>
    )}
  </svg>
);

/** Payment method picker. `pick` is the frame the QR tile is chosen. */
export const PaymentMock: React.FC<{ frame: number; pick: number; total: number }> = ({ frame, pick, total }) => {
  const paid = frame >= pick + 10;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.card, borderRadius: 28, fontFamily: F.sans, padding: 60 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40 }}>Choose payment</div>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40 }}>{rp(total)}</div>
      </div>
      {METHODS.map((m, i) => {
        const chosen = i === 2 && frame >= pick;
        return (
          <div
            key={m}
            style={{
              position: 'absolute',
              left: 60 + (i % 2) * 500,
              top: 190 + Math.floor(i / 2) * 210,
              width: 480,
              height: 180,
              borderRadius: 24,
              background: chosen ? C.accent : C.bg,
              border: `3px solid ${chosen ? C.ink : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              padding: '0 36px',
              fontSize: 32,
              fontWeight: 600,
              ...scaleIn(frame, 2 + i * 3, 0.85),
            }}
          >
            <MethodIcon i={i} />
            {m}
          </div>
        );
      })}
      {paid && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'rgba(11,18,32,.82)', display: 'grid', placeItems: 'center', opacity: ease(frame, pick + 10, 5) }}>
          <div style={{ textAlign: 'center', color: C.onDark, ...scaleIn(frame, pick + 11, 0.7) }}>
            <div style={{ width: 150, height: 150, borderRadius: 75, background: C.accent, display: 'grid', placeItems: 'center', margin: '0 auto 26px' }}>
              <svg width="80" height="80" viewBox="0 0 24 24">
                <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={C.ink} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset={24 * (1 - ease(frame, pick + 13, 8))} />
              </svg>
            </div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 46 }}>Paid</div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Receipt printing out of a printer slot. */
export const Receipt: React.FC<{ frame: number; items: { id: number; qty: number }[] }> = ({ frame, items }) => {
  const total = items.reduce((n, l) => n + PRODUCTS[l.id].price * l.qty, 0);
  const t = ease(frame, 2, 26);
  return (
    <div style={{ position: 'relative', width: 620, height: 900 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, borderRadius: 30, background: C.ink, zIndex: 2 }}>
        <div style={{ position: 'absolute', left: 60, right: 60, bottom: 30, height: 14, borderRadius: 7, background: C.panelLine }} />
        <div style={{ position: 'absolute', right: 40, top: 34, width: 18, height: 18, borderRadius: 9, background: C.accent }} />
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 100, height: 780, overflow: 'hidden' }}>
        <div style={{ background: C.card, padding: '60px 44px 50px', transform: `translateY(${(t - 1) * 100}%)`, fontFamily: F.sans, fontSize: 24, boxShadow: '0 20px 50px rgba(11,18,32,.12)' }}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <TehposWordmark size={40} />
            <div style={{ color: C.body, fontSize: 20 }}>Order #048 · Table 3</div>
          </div>
          {items.map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `2px dashed ${C.line}` }}>
              <span>
                {l.qty} × {PRODUCTS[l.id].name}
              </span>
              <span>{rp(PRODUCTS[l.id].price * l.qty)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22, fontFamily: F.display, fontWeight: 700, fontSize: 34 }}>
            <span>Total</span>
            <span>{rp(total)}</span>
          </div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', color: C.body }}>
            <span>Paid with</span>
            <span style={{ color: C.ink, fontWeight: 600 }}>QR code</span>
          </div>
          <div style={{ marginTop: 36, height: 70, display: 'flex', gap: 5 }}>
            {Array.from({ length: 48 }, (_, i) => (
              <span key={i} style={{ flex: i % 3 === 0 ? 2 : 1, background: i % 5 === 4 ? 'transparent' : C.ink }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const STOCK = [
  { name: 'Jasmine tea leaves', unit: 'packs', from: 24, to: 21 },
  { name: 'Fresh milk', unit: 'L', from: 7, to: 5, low: true },
  { name: 'Lemons', unit: 'pcs', from: 40, to: 37 },
  { name: 'Matcha powder', unit: 'packs', from: 12, to: 11 },
  { name: 'Plastic cups', unit: 'pcs', from: 320, to: 312 },
];

/** Inventory list; counts tick down as sales come in. */
export const InventoryMock: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: 'absolute', inset: 0, fontFamily: F.sans }}>
    <Sidebar active="Stock" />
    <div style={{ position: 'absolute', left: 220, right: 0, top: 0, bottom: 0, padding: '32px 44px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 34 }}>Stock</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 600, color: C.body }}>
          <span style={{ width: 12, height: 12, borderRadius: 6, background: C.accent }} />
          Synced with sales
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px', padding: '14px 20px', fontSize: 18, fontWeight: 600, color: C.body, textTransform: 'uppercase', letterSpacing: '.08em' }}>
        <span>Item</span>
        <span>In stock</span>
        <span>Status</span>
      </div>
      {STOCK.map((s, i) => {
        const tick = 14 + i * 6;
        const value = count(frame, tick, 22, s.from, s.to);
        const flash = frame >= tick && frame < tick + 22;
        const lowShown = s.low && frame >= 46;
        return (
          <div
            key={s.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px 200px',
              alignItems: 'center',
              padding: '0 20px',
              height: 96,
              borderRadius: 16,
              marginBottom: 8,
              fontSize: 24,
              background: flash ? 'rgba(34,211,166,.18)' : C.bg,
              ...enter(frame, i * 3, 24),
            }}
          >
            <span style={{ fontWeight: 600 }}>{s.name}</span>
            <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 30 }}>
              {fmt(value)} <span style={{ fontFamily: F.sans, fontWeight: 400, fontSize: 20, color: C.body }}>{s.unit}</span>
            </span>
            <span>
              {lowShown ? (
                <span style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 999, background: C.ink, color: C.onDark, fontSize: 18, fontWeight: 600, ...scaleIn(frame, 46, 0.6) }}>Low · reorder</span>
              ) : (
                <span style={{ color: C.body, fontSize: 20 }}>OK</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/** Close-up of one stock item with a draining gauge. */
export const StockGauge: React.FC<{ frame: number }> = ({ frame }) => {
  const level = 0.42 - 0.18 * ease(frame, 8, 30);
  return (
    <div style={{ width: 900, padding: 56, borderRadius: 32, background: C.card, fontFamily: F.sans, boxShadow: '0 40px 90px rgba(11,18,32,.14)' }}>
      <div style={{ fontSize: 24, fontWeight: 600, color: C.body, textTransform: 'uppercase', letterSpacing: '.12em' }}>Fresh milk</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, margin: '14px 0 34px' }}>
        <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 130, lineHeight: 1 }}>{count(frame, 8, 30, 7, 5)}</span>
        <span style={{ fontSize: 34, color: C.body }}>litres left</span>
      </div>
      <div style={{ height: 28, borderRadius: 14, background: C.bg, overflow: 'hidden' }}>
        <div style={{ width: `${level * 100}%`, height: '100%', borderRadius: 14, background: C.accent }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
        <span style={{ fontSize: 24, color: C.body }}>Updated with every sale</span>
        <span style={{ padding: '12px 26px', borderRadius: 999, background: C.ink, color: C.onDark, fontSize: 22, fontWeight: 600, ...scaleIn(frame, 36, 0.6) }}>Reorder</span>
      </div>
    </div>
  );
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const STAFF = ['Ayu', 'Dimas', 'Rina'];
const SHIFTS: [number, number, 'AM' | 'PM'][] = [
  [0, 0, 'AM'], [0, 1, 'PM'], [0, 3, 'AM'], [0, 5, 'PM'],
  [1, 0, 'PM'], [1, 2, 'AM'], [1, 4, 'AM'], [1, 6, 'PM'],
  [2, 1, 'AM'], [2, 3, 'PM'], [2, 5, 'AM'], [2, 6, 'AM'],
];

/** Weekly shift schedule. */
export const ShiftMock: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: 'absolute', inset: 0, fontFamily: F.sans }}>
    <Sidebar active="Shifts" />
    <div style={{ position: 'absolute', left: 220, right: 0, top: 0, bottom: 0, padding: '32px 40px' }}>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 34, marginBottom: 26 }}>This week</div>
      <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(7, 1fr)', gap: 10 }}>
        <span />
        {DAYS.map(d => (
          <span key={d} style={{ fontSize: 20, fontWeight: 600, color: C.body, textAlign: 'center' }}>
            {d}
          </span>
        ))}
        {STAFF.map((s, r) => (
          <React.Fragment key={s}>
            <span style={{ fontSize: 24, fontWeight: 600, alignSelf: 'center' }}>{s}</span>
            {DAYS.map((_, c) => {
              const shiftIndex = SHIFTS.findIndex(([sr, sc]) => sr === r && sc === c);
              const shift = SHIFTS[shiftIndex];
              return (
                <div key={c} style={{ height: 150, borderRadius: 16, background: C.bg, padding: 8 }}>
                  {shift && (
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 12,
                        background: shift[2] === 'AM' ? C.ink : C.accent,
                        color: shift[2] === 'AM' ? C.onDark : C.ink,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 22,
                        fontWeight: 600,
                        ...scaleIn(frame, 4 + shiftIndex * 2, 0.5),
                      }}
                    >
                      {shift[2]}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

/** Payroll summary card. */
export const PayrollCard: React.FC<{ frame: number }> = ({ frame }) => {
  const rows = [
    { name: 'Ayu', hours: 32 },
    { name: 'Dimas', hours: 32 },
    { name: 'Rina', hours: 32 },
  ];
  return (
    <div style={{ width: 860, padding: 52, borderRadius: 32, background: C.card, fontFamily: F.sans, boxShadow: '0 40px 90px rgba(11,18,32,.14)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40 }}>Payroll</span>
        <span style={{ padding: '10px 22px', borderRadius: 999, background: C.accent, fontSize: 22, fontWeight: 600, ...scaleIn(frame, 30, 0.6) }}>Ready</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: `2px solid ${C.line}`, fontSize: 28, ...enter(frame, 3 + i * 4, 20, 'x') }}>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
          <span style={{ color: C.body }}>{count(frame, 4 + i * 4, 18, 0, r.hours)} hours</span>
        </div>
      ))}
    </div>
  );
};

/** Chat thread with the daily report message. */
export const ChatScreen: React.FC<{ frame: number; arrive: number }> = ({ frame, arrive }) => (
  <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
    <div style={{ height: 130, background: C.card, borderBottom: `2px solid ${C.line}`, display: 'flex', alignItems: 'flex-end', padding: '0 24px 18px', gap: 14 }}>
      <div style={{ width: 52, height: 52, borderRadius: 26, background: C.ink, display: 'grid', placeItems: 'center' }}>
        <Cup size={30} fill={C.accent} stroke={C.onDark} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 20 }}>TehPOS Reports</div>
        <div style={{ fontSize: 15, color: C.body }}>bot</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 18, right: 18, bottom: 30 }}>
      <div style={{ alignSelf: 'flex-start', width: 230, padding: '12px 16px', borderRadius: 18, background: C.card, fontSize: 16, color: C.body, marginBottom: 14 }}>Yesterday's report</div>
      {frame >= arrive && (
        <div style={{ borderRadius: 22, background: C.card, padding: 20, boxShadow: '0 12px 30px rgba(11,18,32,.1)', ...enter(frame, arrive, 60, 'y', 9) }}>
          <ReportBody frame={frame - arrive} compact />
        </div>
      )}
    </div>
  </div>
);

export const ReportBody: React.FC<{ frame: number; compact?: boolean }> = ({ frame, compact }) => {
  const s = compact ? 1 : 2.1;
  return (
    <div style={{ fontFamily: F.sans }}>
      <div style={{ fontSize: 15 * s, fontWeight: 600, color: C.body, textTransform: 'uppercase', letterSpacing: '.1em' }}>Daily report · Tuesday</div>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 34 * s, margin: `${6 * s}px 0 ${4 * s}px` }}>{rp(count(frame, 6, 20, 0, 2480000))}</div>
      <div style={{ fontSize: 16 * s, color: C.body }}>Sales today</div>
      <div style={{ display: 'flex', gap: 10 * s, marginTop: 14 * s }}>
        {[
          ['Orders', fmt(count(frame, 8, 20, 0, 136))],
          ['Top item', 'Iced Jasmine Tea'],
        ].map(([k, v]) => (
          <div key={k} style={{ flex: 1, background: C.bg, borderRadius: 12 * s, padding: `${10 * s}px ${12 * s}px` }}>
            <div style={{ fontSize: 13 * s, color: C.body }}>{k}</div>
            <div style={{ fontSize: 17 * s, fontWeight: 600 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Hourly sales bars for the report close-up. */
export const HourlyBars: React.FC<{ frame: number }> = ({ frame }) => {
  const bars = [0.3, 0.45, 0.7, 0.95, 0.6, 0.5, 0.75, 0.85, 0.4];
  const hours = ['8', '9', '10', '11', '12', '13', '14', '15', '16'];
  return (
    <div style={{ width: 1100, padding: 50, borderRadius: 32, background: C.card, fontFamily: F.sans, boxShadow: '0 40px 90px rgba(11,18,32,.14)' }}>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, marginBottom: 30 }}>Sales by hour</div>
      <div style={{ height: 380, display: 'flex', alignItems: 'flex-end', gap: 22, borderBottom: `3px solid ${C.ink}` }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, height: `${b * 100 * pop(frame, 2 + i * 2)}%`, borderRadius: '12px 12px 0 0', background: i === 3 ? C.accent : C.ink }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 14 }}>
        {hours.map(h => (
          <span key={h} style={{ flex: 1, textAlign: 'center', fontSize: 20, color: C.body }}>
            {h}:00
          </span>
        ))}
      </div>
    </div>
  );
};

/** Top sellers list. */
export const TopItems: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { id: 0, sold: 42 },
    { id: 1, sold: 31 },
    { id: 4, sold: 18 },
  ];
  return (
    <div style={{ width: 960, padding: 50, borderRadius: 32, background: C.card, fontFamily: F.sans, boxShadow: '0 40px 90px rgba(11,18,32,.14)' }}>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, marginBottom: 26 }}>Top items</div>
      {items.map((it, i) => (
        <div key={it.id} style={{ marginBottom: 26, ...enter(frame, 2 + i * 4, 30, 'x') }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>{PRODUCTS[it.id].name}</span>
            <span style={{ color: C.body }}>{count(frame, 4 + i * 4, 18, 0, it.sold)} sold</span>
          </div>
          <div style={{ height: 22, borderRadius: 11, background: C.bg }}>
            <div style={{ width: `${(it.sold / 42) * 100 * ease(frame, 4 + i * 4, 18)}%`, height: '100%', borderRadius: 11, background: i === 0 ? C.accent : C.ink }} />
          </div>
        </div>
      ))}
    </div>
  );
};
