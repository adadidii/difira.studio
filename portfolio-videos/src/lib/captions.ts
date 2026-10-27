import { VO } from '../vo/manifest';
import { FPS } from '../theme';

export type Line = {
  /** Start and end in frames, from the script timings. */
  from: number;
  to: number;
  text: string;
  /** Word or phrase drawn in the accent color. */
  keyword?: string;
  /** Spoken lines get voiceover when available. Defaults to true. */
  spoken?: boolean;
};

export type Token = { word: string; hot: boolean };
export type Chunk = { from: number; to: number; tokens: Token[] };

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, '');

function markKeyword(words: string[], keyword?: string): Token[] {
  const tokens = words.map(word => ({ word, hot: false }));
  if (!keyword) return tokens;
  const key = keyword.split(/\s+/).map(norm);
  for (let i = 0; i + key.length <= words.length; i++) {
    if (key.every((k, j) => norm(words[i + j]) === k)) {
      for (let j = 0; j < key.length; j++) tokens[i + j].hot = true;
      break;
    }
  }
  return tokens;
}

function splitTokens(tokens: Token[], maxWords: number): Token[][] {
  const groups: Token[][] = [];
  let current: Token[] = [];
  tokens.forEach((token, i) => {
    current.push(token);
    const endsSentence = /[.?!:]$/.test(token.word);
    const nextIsHot = tokens[i + 1]?.hot && token.hot;
    if ((current.length >= maxWords && !nextIsHot) || (endsSentence && current.length >= 2)) {
      groups.push(current);
      current = [];
    }
  });
  if (current.length) {
    // Avoid a dangling single word.
    if (current.length === 1 && groups.length) groups[groups.length - 1].push(...current);
    else groups.push(current);
  }
  return groups;
}

/**
 * Turns script lines into on-screen caption chunks. When a voiceover exists for a line
 * (src/vo/manifest.ts), chunk timing comes from its word timestamps; otherwise the line's
 * window is split by character count.
 */
export function buildChunks(videoId: string, lines: Line[], maxWords: number): Chunk[] {
  const chunks: Chunk[] = [];
  lines.forEach((line, index) => {
    const words = line.text.split(/\s+/).filter(Boolean);
    const groups = splitTokens(markKeyword(words, line.keyword), maxWords);
    const vo = VO[`${videoId}-${index}`];
    let starts: number[];
    if (vo && vo.words.length >= words.length) {
      let w = 0;
      starts = groups.map(group => {
        const start = line.from + Math.round(vo.words[w].start * FPS);
        w += group.length;
        return start;
      });
    } else {
      const total = groups.reduce((n, g) => n + g.map(t => t.word).join(' ').length, 0);
      const span = line.to - line.from;
      let acc = 0;
      starts = groups.map(group => {
        const start = line.from + Math.round((acc / total) * span);
        acc += group.map(t => t.word).join(' ').length;
        return start;
      });
    }
    groups.forEach((tokens, i) => {
      chunks.push({ from: starts[i], to: i + 1 < groups.length ? starts[i + 1] : line.to, tokens });
    });
  });
  return chunks;
}
