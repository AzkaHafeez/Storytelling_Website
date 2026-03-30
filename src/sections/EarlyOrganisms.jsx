import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function EarlyOrganisms() {
  const container = useRef(null);
  const cells = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        size: Math.random() * 80 + 60
      })),
    []
  );

  useGSAP(
    () => {
      const { ease, slow, fast } = getMotionSettings();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=3400',
          scrub: 1,
          pin: true
        }
      });

      // Animate background drift
      tl.fromTo(
        '.life-ambient',
        { scale: 1.05, opacity: 0.2 },
        { scale: 1.25, opacity: 0.55, duration: slow * 1.6, ease },
        0
      );
      tl.to('.life-fluid', { backgroundPosition: '60% 40%', duration: slow * 1.2, ease }, 0);

      // Cells appear and pulse
      tl.fromTo(
        '.life-cell',
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, stagger: 0.15, duration: slow, ease },
        0.4
      );
      tl.to('.life-cell', { scale: 1.15, yoyo: true, repeat: 1, duration: fast, ease }, 1.6);
      tl.to('.life-cell', { y: -20, stagger: 0.08, duration: slow, ease }, 1.2);

      // Text emerges like discovery
      tl.fromTo(
        '.life-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: slow, ease },
        0.8
      );
      tl.fromTo(
        '.life-body',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: slow, ease },
        1.4
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="section-fade relative min-h-screen w-full overflow-hidden bg-[var(--color-bg-base)]"
    >
      <div className="overlay-image ambient-image life-ambient scene2-bg" aria-hidden="true" />
      <div className="absolute inset-0 life-fluid" />
      <div className="absolute inset-0">
        {cells.map((cell, index) => (
          <span
            key={index}
            className="life-cell"
            style={{
              left: `${cell.x}%`,
              top: `${cell.y}%`,
              width: `${cell.size}px`,
              height: `${cell.size}px`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 2</p>
        <h2 className="life-title mt-4 text-[clamp(2rem,6vw,4.5rem)] font-semibold text-[color:var(--color-text-main)]">
          Life Emerges
        </h2>
        <p className="life-body mt-6 max-w-xl text-base text-[color:var(--color-text-muted)]">
          Cells divide, multiply, and learn to collaborate. Complexity begins as an experiment in
          survival.
        </p>
      </div>
    </section>
  );
}
