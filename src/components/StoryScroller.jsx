import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProgressIndicator from './ProgressIndicator';

import BeginningOfLife from '../sections/BeginningOfLife';
import EarlyOrganisms from '../sections/EarlyOrganisms';
import EvolutionComplex from '../sections/EvolutionComplex';
import LandTransition from '../sections/LandTransition';
import AgeOfDinosaurs from '../sections/AgeOfDinosaurs';
import ExtinctionEvent from '../sections/ExtinctionEvent';
import RiseOfMammals from '../sections/RiseOfMammals';
import HumanEvolution from '../sections/HumanEvolution';
import FutureOfEvolution from '../sections/FutureOfEvolution';

gsap.registerPlugin(ScrollTrigger);

export default function StoryScroller({ theme, onReplay }) {
  const container = useRef();

  useLayoutEffect(() => {
    // Force a fresh calculation of all scroll positions
    // This is vital when the page structure changes or a theme is applied
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, container);
    
    return () => ctx.revert();
  }, [theme]);

  return (
    <div ref={container} className="story-wrapper">
      <ProgressIndicator />
      <BeginningOfLife />
      <EarlyOrganisms />
      <EvolutionComplex />
      <LandTransition />
      <AgeOfDinosaurs />
      <ExtinctionEvent />
      <RiseOfMammals />
      <HumanEvolution />
      <FutureOfEvolution onReplay={onReplay} />
    </div>
  );
}
