import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function BeginningOfLife() {
  const container = useRef(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2
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
          end: '+=4200',
          scrub: 1,
          pin: true
        }
      });

      // Void to particles
      tl.fromTo(
        '.void-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: slow, ease },
        0.2
      );
      tl.to(
        '.void-particle',
        { opacity: 1, scale: 1, stagger: 0.03, duration: slow, ease },
        0.4
      );

      // Proto-cell appears
      tl.fromTo(
        '.proto-cell',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: slow, ease },
        1.2
      );

      // Zoom into microscopic world
      tl.to('.void-zoom', { scale: 5, duration: slow * 1.6, ease }, 2.2);
      tl.to('.void-text', { opacity: 0, duration: fast }, 2.4);
      tl.to('.void-vignette', { opacity: 0.2, duration: slow }, 2.2);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 void-space" />
      <div className="absolute inset-0">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="void-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>

      <div className="void-zoom absolute inset-0 flex items-center justify-center">
        <div className="proto-cell" />
      </div>
      <div className="void-vignette" />

      <div className="void-text relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Scene 1</p>
        <h2 className="void-title mt-4 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-tight">
          Void into Beginning
        </h2>
        <p className="mt-6 max-w-xl text-base text-white/70">
          In absolute darkness, the smallest sparks gather. Nothing is alive yet, but everything is
          possible.
        </p>
        <p className="mt-10 text-xs uppercase tracking-[0.4em] text-white/50">Scroll to descend</p>
      </div>
    </section>
  );
}
