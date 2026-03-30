import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function RiseOfMammals() {
  const container = useRef(null);

  useGSAP(
    () => {
      const { ease, slow } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=3200',
          pin: true,
          scrub: 1
        }
      });

      // Calm return of light
      tl.fromTo(
        '.mammal-bg',
        { scale: 1.2, filter: 'grayscale(100%) brightness(0.4)' },
        { scale: 1.05, filter: 'grayscale(0%) brightness(1)', duration: slow * 1.4, ease },
        0
      );

      tl.to('.mammal-glow', { opacity: 1, duration: slow, ease }, 0.6);

      tl.fromTo(
        '.mammal-title',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: slow, ease },
        0.8
      );
      tl.fromTo(
        '.mammal-body',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: slow, ease },
        1.4
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden">
      <div className="overlay-image mammal-bg scene7-bg" aria-hidden="true" />
      <div className="mammal-glow absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,200,120,0.3),transparent_55%)] opacity-0" />
      <div className="theme-tint" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 7</p>
        <h2 className="mammal-title mt-4 text-[clamp(2rem,6vw,4.5rem)] font-semibold text-white">
          Rebuilding
        </h2>
        <p className="mammal-body mt-6 max-w-2xl text-base text-white/80">
          In the quiet aftermath, warm-blooded life emerges. Mammals adapt quickly, filling the
          spaces left behind.
        </p>
      </div>
    </section>
  );
}
