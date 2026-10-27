import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { Line } from '../lib/captions';
import { VO } from '../vo/manifest';

/** Places each voiceover line at its scripted start. Renders nothing when no voiceover was made. */
export const Voiceover: React.FC<{ videoId: string; lines: Line[] }> = ({ videoId, lines }) => (
  <>
    {lines.map((line, i) => {
      const vo = VO[`${videoId}-${i}`];
      if (!vo || line.spoken === false) return null;
      return (
        <Sequence key={i} from={line.from} layout="none">
          <Audio src={staticFile(vo.file)} />
        </Sequence>
      );
    })}
  </>
);
