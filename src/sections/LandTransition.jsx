import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function LandTransition() {
  const container = useRef(null);

  useGSAP(
    () => {
      const { ease, slow } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=3400',
          scrub: 1,
          pin: true
        }
      });

      // Calm shoreline reveal
      tl.fromTo(
        '.shoreline-haze',
        { opacity: 0.2 },
        { opacity: 0.4, duration: slow * 1.6, ease },
        0
      );

      tl.fromTo(
        '.pullout-content',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: slow, ease },
        1.1
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade no-section-fade relative min-h-screen w-full overflow-hidden bg-[#061826] isolate">
      <div className="shoreline-stage" aria-hidden="true" />
      <div className="shoreline-haze" aria-hidden="true" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 4</p>
        <div className="pullout-content">
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold text-white">
            The Land Transition
          </h2>
          <div className="boundary-divider mx-auto" aria-hidden="true" />
          <p className="mt-6 max-w-md text-base text-white mx-auto">
            The ocean shrinks into a shoreline. Fins touch mud, then limbs carry life onto land.
          </p>
        </div>
      </div>
    </section>
  );
}
