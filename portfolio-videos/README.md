# Difira Studio portfolio videos

Three sample videos built in code with [Remotion](https://www.remotion.dev). Every text, timing and
screen lives in `src/`, so you can change copy and re-render.

| Video | Composition | Size | Length |
| --- | --- | --- | --- |
| TehPOS launch | `TehPOS-16x9`, `TehPOS-9x16` | 1920x1080, 1080x1920 | 40 s |
| Perhalus product motion | `Perhalus` | 1920x1080 | 20 s |
| Phone theft tips (short) | `PhoneTips` | 1080x1920 | 30 s |
| Website hero loop | `HeroLoop-16x9`, `HeroLoop-9x16` | 1920x1080, 720x1280 | 20 s, seamless |

## Commands

```bash
npm install
npm run studio      # live preview in the browser
npm run voiceover   # optional: ElevenLabs voiceover (needs ELEVENLABS_API_KEY in .env)
npm run draft       # low-res TehPOS 16:9 draft + contact sheet in out/draft/
npm run render      # all finals into out/ (add -- --only=tehpos|perhalus|phonetips)
npm run render:hero # website hero loop into ../media/ (add -- --check for test stills)
```

`npm run render` writes, per video: the MP4, a poster PNG (`*-poster.png`), a 1 fps contact sheet
(`*-contact-sheet.png`) and a 1600x1200 cover for Contra (`*-cover.png`).

## Where to edit

- Spoken lines and caption keywords: `src/videos/tehpos/script.ts`, `PERHALUS_LINES` in
  `src/videos/perhalus/Perhalus.tsx`, `PHONETIPS_LINES` in `src/videos/phonetips/PhoneTips.tsx`.
  If you change a spoken line, change it in `scripts/voiceover.mjs` too.
- Shot order and timing: the `SHOTS` array at the bottom of each video file.
- Colors and fonts: `src/theme.ts`. Fonts are bundled in `assets/fonts/` (Sora, Manrope; OFL).
- Covers: `src/Covers.tsx`.

## Screenshots

Screens are coded mockups until you drop real screenshots in `assets/<product>/`. Each mockup is
marked with a `TODO` naming the file it looks for; when the file exists it is used instead:

- `assets/tehpos/cashier.png`, `inventory.png`, `shifts.png` (1400x764), `report-chat.png` (390x844)
- `assets/tehpos/logo.svg`, `assets/perhalus/logo.svg` (logos are text wordmarks for now)
- `assets/perhalus/app-before.png` (1400x764)

## Audio

With `ELEVENLABS_API_KEY` set, `npm run voiceover` generates each line with word timestamps;
captions follow the word timings and each line starts at its scripted time. The render then
normalises to -14 LUFS with a -1 dBTP true-peak ceiling (two-pass `loudnorm`). Without a key the
videos get a silent stereo track.
