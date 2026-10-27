// Generates voiceover lines with ElevenLabs (word timestamps included) and writes
// assets/vo/<video>-<line>.mp3 plus src/vo/manifest.ts. Captions then follow the
// word timings, and each line plays at its scripted start time.
//
//   ELEVENLABS_API_KEY=... [ELEVENLABS_VOICE_ID=...] node scripts/voiceover.mjs
//
// Reads the key from the environment, portfolio-videos/.env or the repo-root .env.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readEnv(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(file, 'utf8')
      .split('\n')
      .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/))
      .filter(Boolean)
      .map(m => [m[1], m[2]]),
  );
}
const env = { ...readEnv(path.join(root, '..', '.env')), ...readEnv(path.join(root, '.env')), ...process.env };
const key = env.ELEVENLABS_API_KEY;
if (!key) {
  console.log('ELEVENLABS_API_KEY not set: skipping voiceover. Videos render with captions and a silent track.');
  process.exit(0);
}
const voice = env.ELEVENLABS_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb';

// Spoken lines, in the same order as the Line arrays in src/videos/*. Keep them in sync.
const SCRIPTS = {
  tehpos: [
    'Your shop sells all day. Do you know what you actually earned?',
    'Paper notes.',
    'Guesswork stock.',
    'Shifts on a group chat.',
    'TehPOS rings up a sale in seconds,',
    'with every payment method your customers use.',
    'Stock updates itself.',
    'Shifts and payroll stay organized.',
    'And every evening,',
    'your daily report lands in Telegram.',
    'TehPOS.',
    'Run your shop, not your spreadsheet.',
  ],
  phonetips: [
    'Phone stolen? These 3 settings protect you.',
    'One: turn on remote lock and erase.',
    'Find it, lock it, or wipe it from any browser.',
    'Two: add a PIN to your SIM card.',
    'So nobody can use your number to get your login codes.',
    'Three: hide message previews on your lock screen.',
    'Your codes stay hidden, even when the phone is locked.',
    'Save this, and follow for more tips.',
  ],
};

/** Groups ElevenLabs character timings into words. */
function toWords(alignment) {
  const words = [];
  let current = null;
  alignment.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (current) words.push(current);
      current = null;
      return;
    }
    if (!current) current = { text: '', start: alignment.character_start_times_seconds[i], end: 0 };
    current.text += ch;
    current.end = alignment.character_end_times_seconds[i];
  });
  if (current) words.push(current);
  return words;
}

const outDir = path.join(root, 'assets', 'vo');
fs.mkdirSync(outDir, { recursive: true });
const manifest = {};

for (const [video, lines] of Object.entries(SCRIPTS)) {
  for (const [i, text] of lines.entries()) {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    });
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const file = `vo/${video}-${i}.mp3`;
    fs.writeFileSync(path.join(root, 'assets', file), Buffer.from(data.audio_base64, 'base64'));
    const duration = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(root, 'assets', file)]).toString());
    manifest[`${video}-${i}`] = { file, duration, words: toWords(data.alignment) };
    console.log(`${video}-${i}: ${duration.toFixed(2)}s  "${text}"`);
  }
}

fs.writeFileSync(
  path.join(root, 'src', 'vo', 'manifest.ts'),
  `// Written by scripts/voiceover.mjs. Empty means no voiceover: videos render with captions and a silent track.
export type VoWord = { text: string; start: number; end: number };
export type VoLine = { file: string; duration: number; words: VoWord[] };
export const VO: Record<string, VoLine> = ${JSON.stringify(manifest, null, 2)};
`,
);
console.log('Wrote src/vo/manifest.ts. Check that no line runs past its scripted window, then npm run render.');
