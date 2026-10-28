// Scores and polishes the Indonesian copy in i18n.js with Perhalus (https://perhalus.com),
// so it reads like a person wrote it. Perhalus only handles Bahasa Indonesia; the English
// copy lives in the HTML and is edited by hand.
//
//   node scripts/perhalus.mjs --dry-run           list what would be sent, no API calls
//   node scripts/perhalus.mjs                     polish, write scripts/perhalus-report.json
//   node scripts/perhalus.mjs --mode nilai        score only, no rewrites
//   node scripts/perhalus.mjs --keys faq.a1,faq.a2
//   node scripts/perhalus.mjs --apply             copy polished text from the report into i18n.js
//
// Reads PERHALUS_API_KEY from the environment or the repo-root .env, and never prints it.
// Every call is charged per character to the key owner, so only strings Perhalus can judge
// are sent (40–5,000 characters, no HTML, used by a page), and strings already in the report
// are skipped unless --force is passed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const I18N_FILE = path.join(root, 'i18n.js');
const REPORT_FILE = path.join(root, 'scripts', 'perhalus-report.json');
const HTML_FILES = ['index.html', 'studio/index.html', 'karir.html', 'mulai/index.html', '404.html'];
const API = 'https://perhalus.com/api/v1/poles';
const MIN_CHARS = 40;
const MAX_CHARS = 5000;

export class PerhalusError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

// In multiline mode `^` and `$` also match next to a lone `\r`, so the line patterns below use
// `[ \t]*` rather than `\s*`: `\s*` would swallow line breaks in files with CRLF endings.

/** Reads the ID dictionary out of i18n.js: one `'key': 'value',` entry per line. */
export function parseIdStrings(source) {
  const entries = [];
  const re = /^[ \t]*'([^']+)':[ \t]*'((?:[^'\\]|\\.)*)',?[ \t]*$/gm;
  let m;
  while ((m = re.exec(source))) entries.push({ key: m[1], text: m[2].replace(/\\(.)/g, '$1') });
  return entries;
}

/** Collects the keys the pages reference through data-i18n, data-i18n-html and data-i18n-attr. */
export function usedKeys(htmlSources) {
  const keys = new Set();
  for (const html of htmlSources) {
    for (const m of html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)) keys.add(m[1]);
    for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
      m[1].split(',').forEach(pair => keys.add(pair.split(':')[1].trim()));
    }
  }
  return keys;
}

/**
 * Keeps the strings worth paying for: long enough to judge, plain text (no HTML, not a URL
 * such as the prefilled WhatsApp links), used by a page (when `used` is given), and
 * optionally limited to `keys`.
 */
export function selectTexts(entries, { keys, used } = {}) {
  return entries.filter(
    e =>
      (!keys || keys.includes(e.key)) &&
      (!used || used.has(e.key)) &&
      e.text.length >= MIN_CHARS &&
      e.text.length <= MAX_CHARS &&
      !/<[a-z]/i.test(e.text) &&
      !/^https?:\/\//.test(e.text),
  );
}

/** One call to POST /api/v1/poles. Resolves to the API's `result`, `cost` and `balanceIdr`. */
export async function poles(text, { apiKey, tone = 'netral', mode = 'poles', fetchImpl = fetch } = {}) {
  if (!apiKey) throw new PerhalusError('missing_key', 'PERHALUS_API_KEY is not set.');
  const response = await fetchImpl(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, tone, mode }),
    signal: AbortSignal.timeout(150_000),
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new PerhalusError('bad_response', `Perhalus answered HTTP ${response.status} without JSON.`);
  }
  if (!data.ok) throw new PerhalusError(data.error?.code || 'unknown', data.error?.message || `HTTP ${response.status}`);
  return { result: data.result, cost: data.cost, balanceIdr: data.balanceIdr };
}

/** Replaces the values of the given keys in i18n.js source, keeping everything else as is. */
export function applyPolished(source, polishedByKey) {
  return source.replace(/^([ \t]*'([^']+)':[ \t]*)'((?:[^'\\]|\\.)*)'(,?[ \t]*)$/gm, (line, head, key, _value, tail) => {
    if (!(key in polishedByKey)) return line;
    const escaped = polishedByKey[key].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `${head}'${escaped}'${tail}`;
  });
}

function readEnv(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/))
      .filter(Boolean)
      .map(m => [m[1], m[2]]),
  );
}

function readReport() {
  return fs.existsSync(REPORT_FILE) ? JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8')) : {};
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

async function main() {
  const flags = new Set(process.argv.slice(2));
  const source = fs.readFileSync(I18N_FILE, 'utf8');

  if (flags.has('--apply')) {
    const report = readReport();
    const polished = Object.fromEntries(
      Object.entries(report)
        .filter(([, r]) => r.polished && r.polished !== r.original)
        .map(([key, r]) => [key, r.polished]),
    );
    fs.writeFileSync(I18N_FILE, applyPolished(source, polished));
    console.log(`Applied ${Object.keys(polished).length} polished strings to i18n.js. Review the diff before committing.`);
    return;
  }

  const keys = arg('--keys')?.split(',');
  const mode = arg('--mode') || 'poles';
  const tone = arg('--tone') || 'netral';
  const report = readReport();
  const used = usedKeys(HTML_FILES.map(f => fs.readFileSync(path.join(root, f), 'utf8')));
  const todo = selectTexts(parseIdStrings(source), { keys, used }).filter(
    e => flags.has('--force') || (report[e.key]?.original !== e.text && report[e.key]?.polished !== e.text),
  );
  const chars = todo.reduce((sum, e) => sum + e.text.length, 0);
  console.log(`${todo.length} strings, ${chars} characters to send (mode: ${mode}, tone: ${tone}).`);

  if (flags.has('--dry-run')) {
    todo.forEach(e => console.log(`  ${e.key} (${e.text.length})`));
    return;
  }

  const env = { ...readEnv(path.join(root, '.env')), ...process.env };
  const apiKey = env.PERHALUS_API_KEY;
  if (!apiKey) {
    console.log('PERHALUS_API_KEY not set: nothing sent. Create a key at https://perhalus.com/app/developer.');
    process.exitCode = 1;
    return;
  }

  let spent = 0;
  for (const entry of todo) {
    try {
      const { result, cost, balanceIdr } = await poles(entry.text, { apiKey, tone, mode });
      spent += cost?.total || 0;
      report[entry.key] = {
        original: entry.text,
        score: result.score,
        level: result.level,
        polished: result.polished?.text ?? null,
        polishedScore: result.polished?.score ?? null,
        changes: result.polished?.changes ?? [],
      };
      const after = result.polished ? ` → ${result.polished.score}` : ' (already natural)';
      console.log(`  ${entry.key}: ${result.score}${after} · Rp${cost?.total ?? 0}, balance Rp${balanceIdr}`);
      fs.writeFileSync(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);
    } catch (error) {
      if (error.code === 'insufficient_credits') {
        console.log('Perhalus balance is too low. Top up at https://perhalus.com/app, then run again; finished strings are kept.');
        break;
      }
      console.log(`  ${entry.key}: failed (${error.code || 'error'}: ${error.message})`);
    }
  }
  console.log(`Done. Spent Rp${spent}. Report: scripts/perhalus-report.json. Run with --apply to use the polished text.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
