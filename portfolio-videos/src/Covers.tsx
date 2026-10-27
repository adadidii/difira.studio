// 4:3 cover images (1600x1200) for Contra service cards.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AppWindow, Phone } from './components/Layout';
import { C, F } from './theme';
import { CashierMock, Cup, TehposWordmark } from './videos/tehpos/mocks';

const Title: React.FC<{ kicker: string; title: React.ReactNode; dark?: boolean }> = ({ kicker, title, dark }) => (
  <div>
    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 30, letterSpacing: '.14em', textTransform: 'uppercase', color: dark ? C.muted : C.body, marginBottom: 22 }}>{kicker}</div>
    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 96, lineHeight: 1.05, letterSpacing: '-0.02em', color: dark ? C.onDark : C.ink }}>{title}</div>
  </div>
);

export const CoverTehPOS: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg, padding: 100 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Title kicker="Launch video · 40 sec" title={<>Launch video<br />for a <span style={{ boxShadow: `inset 0 -0.3em 0 ${C.accent}` }}>POS app</span></>} />
      <div style={{ width: 150, height: 150, borderRadius: 40, background: C.ink, display: 'grid', placeItems: 'center' }}>
        <Cup size={94} fill={C.accent} stroke={C.onDark} />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 100, top: 560, width: 1400, height: 820 }}>
      <AppWindow w={1400} h={820} title="TehPOS · Cashier">
        <CashierMock frame={200} adds={[{ f: 0, id: 0 }, { f: 0, id: 1 }, { f: 0, id: 1 }, { f: 0, id: 5 }]} />
      </AppWindow>
    </div>
    <div style={{ position: 'absolute', right: 100, top: 400 }}>
      <TehposWordmark size={60} />
    </div>
  </AbsoluteFill>
);

export const CoverPerhalus: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink, padding: 100 }}>
    <Title dark kicker="Product motion · 20 sec" title={<>Interface copy,<br /><span style={{ color: C.accent }}>rewritten in place</span></>} />
    <div style={{ position: 'absolute', left: 100, right: 100, bottom: 100, display: 'flex', gap: 40 }}>
      {[
        ['Before', 'No records found. Please initiate the creation of a new entry.'],
        ['After', 'Nothing here yet. Create your first project to get started.'],
      ].map(([k, v], i) => (
        <div key={k} style={{ flex: 1, padding: 48, borderRadius: 32, background: i ? C.accent : C.panel, border: `2px solid ${i ? C.accent : C.panelLine}`, color: i ? C.ink : C.onDark }}>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 26, letterSpacing: '.14em', textTransform: 'uppercase', color: i ? C.ink : C.muted, marginBottom: 20 }}>{k}</div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 46, lineHeight: 1.25, letterSpacing: '-0.02em' }}>{v}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

export const CoverPhoneTips: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg, padding: 100 }}>
    <div style={{ width: 860 }}>
      <Title kicker="Short-form · 9:16" title={<>3 phone settings<br />for when it <span style={{ boxShadow: `inset 0 -0.3em 0 ${C.accent}` }}>gets stolen</span></>} />
      <div style={{ marginTop: 70, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {['Remote lock & erase', 'SIM card PIN', 'Hidden previews'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 28px', borderRadius: 24, background: C.card, width: 700 }}>
            <span style={{ width: 70, height: 70, borderRadius: 35, background: C.accent, display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 700, fontSize: 38 }}>{i + 1}</span>
            <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: 'absolute', right: 110, top: 150, transform: 'rotate(4deg)' }}>
      <Phone dark>
        <div style={{ position: 'absolute', inset: 0, color: C.onDark, fontFamily: F.sans }}>
          <div style={{ position: 'absolute', top: 130, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.onDark} strokeWidth="2" strokeLinecap="round">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 18, right: 18, top: 300, padding: '18px 20px', borderRadius: 22, background: C.panel2, border: `1px solid ${C.panelLine}` }}>
            <div style={{ fontSize: 15, color: C.muted }}>Messages</div>
            <div style={{ fontSize: 19, fontWeight: 600 }}>Notification</div>
            <div style={{ fontSize: 18, color: C.accent }}>Content hidden</div>
          </div>
        </div>
      </Phone>
    </div>
  </AbsoluteFill>
);
