// Renders the looping website hero background into ../media/ (no audio, web-optimised).
//   npm run render:hero              -> final files
//   npm run render:hero -- --check   -> stills at a few frames into out/hero-check/
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteMedia = path.resolve(root, '..', 'media');
const check = process.argv.includes('--check');
const browserCandidates = [process.env.REMOTION_BROWSER, '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'];
const browserExecutable = browserCandidates.find(p => p && fs.existsSync(p)) ?? null;

const TARGETS = [
  { comp: 'HeroLoop-16x9', name: 'hero-loop-16x9', scale: 1, crf: 30 },
  { comp: 'HeroLoop-9x16', name: 'hero-loop-9x16', scale: 2 / 3, crf: 30 },
];

const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'assets') });
fs.mkdirSync(siteMedia, { recursive: true });

for (const t of TARGETS) {
  const composition = await selectComposition({ serveUrl, id: t.comp, browserExecutable });
  if (check) {
    const dir = path.join(root, 'out', 'hero-check');
    fs.mkdirSync(dir, { recursive: true });
    for (const frame of [0, 150, 300, 450, composition.durationInFrames - 1]) {
      await renderStill({ serveUrl, composition, frame, scale: 0.5, output: path.join(dir, `${t.name}-${frame}.png`), browserExecutable });
    }
    continue;
  }
  const raw = path.join(root, 'out', `${t.name}.raw.mp4`);
  console.log(`Rendering ${t.name}`);
  await renderMedia({ serveUrl, composition, codec: 'h264', crf: t.crf, scale: t.scale, muted: true, outputLocation: raw, browserExecutable });
  const out = path.join(siteMedia, `${t.name}.mp4`);
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', raw, '-an', '-c:v', 'copy', '-movflags', '+faststart', out]);
  fs.rmSync(raw);
  await renderStill({ serveUrl, composition, frame: 0, scale: t.scale, imageFormat: 'jpeg', jpegQuality: 80, output: path.join(siteMedia, `${t.name}.jpg`), browserExecutable });
  console.log(`  -> media/${t.name}.mp4 (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
}
