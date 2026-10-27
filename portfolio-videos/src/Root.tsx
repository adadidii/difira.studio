import React from 'react';
import { Composition, Still } from 'remotion';
import { CoverPerhalus, CoverPhoneTips, CoverTehPOS } from './Covers';
import { FPS } from './theme';
import { Perhalus, PERHALUS_DURATION } from './videos/perhalus/Perhalus';
import { PhoneTips, PHONETIPS_DURATION } from './videos/phonetips/PhoneTips';
import { TehPOS, TEHPOS_DURATION } from './videos/tehpos/TehPOS';
import { HeroLoop, HERO_DURATION } from './videos/hero/HeroLoop';

export const Root: React.FC = () => (
  <>
    <Composition id="TehPOS-16x9" component={TehPOS} durationInFrames={TEHPOS_DURATION} fps={FPS} width={1920} height={1080} />
    <Composition id="TehPOS-9x16" component={TehPOS} durationInFrames={TEHPOS_DURATION} fps={FPS} width={1080} height={1920} />
    <Composition id="Perhalus" component={Perhalus} durationInFrames={PERHALUS_DURATION} fps={FPS} width={1920} height={1080} />
    <Composition id="PhoneTips" component={PhoneTips} durationInFrames={PHONETIPS_DURATION} fps={FPS} width={1080} height={1920} />
    <Composition id="HeroLoop-16x9" component={HeroLoop} durationInFrames={HERO_DURATION} fps={FPS} width={1920} height={1080} />
    <Composition id="HeroLoop-9x16" component={HeroLoop} durationInFrames={HERO_DURATION} fps={FPS} width={1080} height={1920} />
    <Still id="Cover-TehPOS" component={CoverTehPOS} width={1600} height={1200} />
    <Still id="Cover-Perhalus" component={CoverPerhalus} width={1600} height={1200} />
    <Still id="Cover-PhoneTips" component={CoverPhoneTips} width={1600} height={1200} />
  </>
);
