import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function AgeOfDinosaurs() {
  const container = useRef(null);

  useGSAP(
    () => {
      const { ease, slow, fast } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=4200',
          pin: true,
          scrub: 1
        }
      });

      // Camera zoom and pan to build scale
      tl.fromTo(
        '.dino-bg',
        { scale: 1.5, xPercent: 0, filter: 'blur(5px)' },
        { scale: 1.05, xPercent: 0, filter: 'blur(0px)', duration: slow * 1.6, ease },
        0
      );

      // Title impact
      tl.fromTo(
        '.dino-title',
        { scale: 4, opacity: 0, letterSpacing: '0.8em' },
        { scale: 1, opacity: 1, letterSpacing: '0.15em', duration: slow, ease },
        0.2
      );

      tl.to('.dino-title', { y: -80, opacity: 0.8, duration: fast, ease }, 1.8);

      // Description fades in
      tl.fromTo(
        '.dino-desc',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: slow, ease },
        2.2
      );

      // Brief tension shake
      tl.to(
        container.current,
        { x: 10, repeat: 6, yoyo: true, duration: 0.1, ease: 'power1.inOut' },
        3.4
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden">
      <div className="overlay-image dino-bg scene5-bg" aria-hidden="true" />
      <div className="theme-tint" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 5</p>
        <h2 className="dino-title mt-4 text-[clamp(3rem,12vw,12rem)] font-black text-transparent" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>
          DOMINANCE
        </h2>
        <div className="dino-desc mt-6 max-w-2xl rounded-[var(--ui-radius)] border border-[color:var(--ui-border)] bg-black/50 px-6 py-6 text-left text-base text-white/80 shadow-[var(--ui-shadow)]">
          Massive creatures command the planet. Claws, armor, and speed rule the land while the
          Earth trembles beneath their weight.
        </div>
      </div>
    </section>
  );
}
