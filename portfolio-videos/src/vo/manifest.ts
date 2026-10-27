// Written by scripts/voiceover.mjs. Empty means no voiceover: videos render with captions and a silent track.
export type VoWord = { text: string; start: number; end: number };
export type VoLine = { file: string; duration: number; words: VoWord[] };
export const VO: Record<string, VoLine> = {};
