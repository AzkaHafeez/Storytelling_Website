import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function EvolutionComplex() {
  const container = useRef(null);

  useGSAP(
    () => {
      const { ease, slow } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=3200',
          scrub: 1,
          pin: true
        }
      });

      // The Cinematic Ascent (Scene 3 -> 4)
      tl.fromTo('.cinematic-water-deep', { opacity: 1 }, { opacity: 0, duration: slow * 1.5, ease }, 0);
      tl.fromTo('.cinematic-water-bright', { opacity: 0 }, { opacity: 1, duration: slow * 1.5, ease }, 0);
      
      tl.fromTo(
        '.god-rays-smooth',
        { opacity: 0, yPercent: 10 },
        { opacity: 0.6, yPercent: -5, duration: slow * 1.5, ease },
        0
      );

      tl.fromTo(
        '.surface-ripples',
        { opacity: 0, yPercent: -10, scale: 1.1 },
        { opacity: 1, yPercent: 0, scale: 1, duration: slow * 1.2, ease },
        0.5
      );

      // Parallax Fish Silhouettes
      tl.fromTo('.sil-1', { xPercent: -50, yPercent: 20 }, { xPercent: 150, yPercent: -10, duration: slow * 1.8, ease }, 0);
      tl.fromTo('.sil-2', { xPercent: 120, yPercent: -30 }, { xPercent: -80, yPercent: 10, duration: slow * 1.6, ease }, 0.2);

      // Text discovery
      tl.fromTo('.water-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: slow, ease }, 0.6);
      tl.fromTo('.water-body', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: slow, ease }, 1.2);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade no-section-fade relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 cinematic-water-bright" />
      <div className="absolute inset-0 cinematic-water-deep" />
      <div className="absolute inset-0 god-rays-smooth" />
      <div className="absolute inset-0 surface-ripples" />

      <div className="fish-silhouette sil-1" style={{ top: '30%', left: '-10%', transform: 'scale(1.2)', filter: 'blur(2px)' }} />
      <div className="fish-silhouette sil-2" style={{ top: '60%', right: '-10%', transform: 'scale(0.8)', filter: 'blur(1px)' }} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 3</p>
        <h2 className="water-title mt-4 text-[clamp(2rem,6vw,4.5rem)] font-semibold text-white">
          Life in Water
        </h2>
        <p className="water-body mt-6 max-w-xl text-base text-white/70">
          The oceans become laboratories. Movement, sight, and instinct form in the pressure of the
          deep.
        </p>
      </div>
    </section>
  );
}
