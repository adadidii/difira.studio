// Renders every video, poster, cover and contact sheet into out/.
//   npm run render                 -> all final videos
//   npm run render -- --only=tehpos
//   npm run draft                  -> low-res TehPOS 16:9 draft into out/draft/
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const draft = args.includes('--draft');
const only = args.find(a => a.startsWith('--only='))?.split('=')[1];

// Output name, composition, poster frame (a strong frame), cover still, voiceover id.
const VIDEOS = [
  { name: 'tehpos-launch-16x9', comp: 'TehPOS-16x9', poster: 1130, cover: 'Cover-TehPOS', vo: 'tehpos', group: 'tehpos' },
  { name: 'tehpos-launch-9x16', comp: 'TehPOS-9x16', poster: 1130, cover: null, vo: 'tehpos', group: 'tehpos' },
  { name: 'perhalus-product-motion', comp: 'Perhalus', poster: 300, cover: 'Cover-Perhalus', vo: null, group: 'perhalus' },
  { name: 'phone-theft-tips-short', comp: 'PhoneTips', poster: 50, cover: 'Cover-PhoneTips', vo: 'phonetips', group: 'phonetips' },
];

const outDir = path.join(root, 'out', draft ? 'draft' : '');
fs.mkdirSync(outDir, { recursive: true });

const browserCandidates = [process.env.REMOTION_BROWSER, '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'];
const browserExecutable = browserCandidates.find(p => p && fs.existsSync(p)) ?? null;

const ff = (...a) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...a], { stdio: ['ignore', 'pipe', 'pipe'] });
const hasVoiceover = id => id && fs.existsSync(path.join(root, 'assets', 'vo', `${id}-0.mp3`));

/** Two-pass EBU R128 normalisation to -14 LUFS, true peak -1 dBTP (below the -0.5 limit). */
function loudnormFile(input, output) {
  const target = 'I=-14:TP=-1.0:LRA=11';
  const log = execFileSync('bash', ['-c', `ffmpeg -hide_banner -i "$1" -af "loudnorm=${target}:print_format=json" -f null - 2>&1`, '_', input]).toString();
  const m = JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1));
  const second = `loudnorm=${target}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
  ff('-i', input, '-c:v', 'copy', '-af', second, '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', output);
}

function addSilentTrack(input, output) {
  ff('-i', input, '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', output);
}

/** One frame per second, tiled, with a timestamp under each frame. */
function contactSheet(video, output, vertical) {
  const w = vertical ? 216 : 384;
  const cols = vertical ? 10 : 8;
  const dur = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).toString());
  const rows = Math.ceil(Math.floor(dur) / cols);
  const font = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
  const label = fs.existsSync(font)
    ? `,pad=iw:ih+28:0:0:white,drawtext=fontfile=${font}:text='%{eif\\:t\\:d}s':x=8:y=h-23:fontsize=18:fontcolor=0x0B1220`
    : '';
  ff('-i', video, '-vf', `fps=1,scale=${w}:-2${label},tile=${cols}x${rows}:padding=6:margin=6:color=0xEEF2F6`, '-frames:v', '1', output);
}

const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'assets') });
const list = VIDEOS.filter(v => (only ? v.group === only : !draft || v.name === 'tehpos-launch-16x9'));

for (const v of list) {
  const composition = await selectComposition({ serveUrl, id: v.comp, browserExecutable });
  const vertical = composition.height > composition.width;
  const raw = path.join(outDir, `${v.name}.raw.mp4`);
  const final = path.join(outDir, `${v.name}.mp4`);
  console.log(`Rendering ${v.name} (${composition.width}x${composition.height}, ${composition.durationInFrames} frames)${draft ? ' [draft]' : ''}`);
  let lastPct = -1;
  await renderMedia({
    serveUrl,
    composition,
    codec: 'h264',
    crf: draft ? 30 : 18,
    scale: draft ? 0.4 : 1,
    outputLocation: raw,
    browserExecutable,
    muted: !hasVoiceover(v.vo),
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== lastPct) process.stdout.write(` ${(lastPct = pct)}%`);
    },
  });
  process.stdout.write('\n');
  if (hasVoiceover(v.vo)) loudnormFile(raw, final);
  else addSilentTrack(raw, final);
  fs.rmSync(raw);

  contactSheet(final, path.join(outDir, `${v.name}-contact-sheet.png`), vertical);
  if (!draft) {
    await renderStill({ serveUrl, composition, frame: v.poster, output: path.join(outDir, `${v.name}-poster.png`), browserExecutable });
    if (v.cover) {
      const cover = await selectComposition({ serveUrl, id: v.cover, browserExecutable });
      await renderStill({ serveUrl, composition: cover, output: path.join(outDir, `${v.name.replace(/-16x9$/, '')}-cover.png`), browserExecutable });
    }
  }
  console.log(`  -> ${path.relative(root, final)}${hasVoiceover(v.vo) ? ' (voiceover, -14 LUFS)' : ' (silent track, no voiceover)'}`);
}
