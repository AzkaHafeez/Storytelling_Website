import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function ExtinctionEvent() {
  const container = useRef(null);

  useGSAP(
    () => {
      const { ease, slow, fast } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=3200',
          pin: true,
          scrub: 1
        }
      });

      // Meteor strike
      tl.fromTo(
        '.meteor-strike',
        { x: '110vw', y: '-60vh', scale: 0.2, opacity: 0 },
        { x: '10vw', y: '40vh', scale: 1.4, opacity: 1, duration: fast, ease },
        0
      );

      // Flash and glitch
      tl.to('.global-flash', { opacity: 1, duration: fast }, 0.9);
      tl.to('.glitch-overlay', { opacity: 0.6, duration: fast }, 1);

      tl.to(
        '.extinction-effects',
        { x: 16, y: 10, repeat: 10, yoyo: true, duration: 0.05, ease: 'power1.inOut' },
        1
      );

      // Ash settles
      tl.to('.global-flash', { backgroundColor: 'rgba(40, 0, 0, 0.95)', duration: slow, ease }, 1.4);
      tl.to('.meteor-strike', { opacity: 0, duration: fast }, 1.4);

      // Text reveal
      tl.fromTo('.extinction-title', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: slow, ease }, 1.9);
      tl.fromTo('.extinction-desc', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: slow, ease }, 2.2);

      tl.to('.glitch-overlay', { opacity: 0.2, duration: slow, ease }, 2.4);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden bg-[var(--color-bg-base)]">
      <div className="overlay-image scene6-bg" aria-hidden="true" />
      <div className="theme-tint" />

      <div className="extinction-effects absolute inset-0 z-10 pointer-events-none">
        <div className="meteor-strike absolute z-[6]">
          <div className="h-20 w-20 rounded-full bg-white shadow-[0_0_150px_80px_rgba(255,170,0,0.8)]" />
        </div>

        <div className="global-flash absolute -inset-[10%] z-[8] bg-white opacity-0" />
        <div className="glitch-overlay absolute -inset-[10%] z-[7] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08)_2px,transparent_2px,transparent_6px)] opacity-0" />
      </div>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 6</p>
        <h2 className="extinction-title mt-4 text-[clamp(3rem,12vw,10rem)] font-black tracking-[0.2em]">
          COLLAPSE
        </h2>
        <p className="extinction-desc mt-6 max-w-2xl text-base text-white/80">
          A single impact rewrites the planet. The sky ignites, then falls silent. The age of giants
          ends in a heartbeat.
        </p>
      </div>
    </section>
  );
}
