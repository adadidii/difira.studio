import { continueRender, delayRender, staticFile } from 'remotion';

// Fonts are bundled in assets/fonts (SIL Open Font License) so renders work offline.
const FONTS: [string, string, string][] = [
  ['Sora', '700', 'fonts/Sora-wght-700.woff2'],
  ['Manrope', '400', 'fonts/Manrope-wght-400.woff2'],
  ['Manrope', '600', 'fonts/Manrope-wght-600.woff2'],
];
if (typeof document !== 'undefined') {
  const handle = delayRender('Loading fonts');
  Promise.all(
    FONTS.map(([family, weight, file]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch(err => {
      console.error(err);
      continueRender(handle);
    });
}

export const C = {
  bg: '#EEF2F6',
  card: '#FFFFFF',
  ink: '#0B1220',
  panel: '#1A2333',
  panel2: '#243045',
  panelLine: '#3A4760',
  accent: '#22D3A6',
  body: '#4A5568',
  muted: '#A0AEC0',
  onDark: '#F5F7FA',
  line: 'rgba(11,18,32,.12)',
};

export const F = {
  display: "'Sora', sans-serif",
  sans: "'Manrope', sans-serif",
};

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);
