import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RotateCcw } from 'lucide-react';
import { getMotionSettings } from '../utils/motion';

export default function FutureOfEvolution({ onReplay }) {
  const [hover, setHover] = useState(false);
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

      // Digital shift
      tl.fromTo(
        '.future-bg',
        { filter: 'hue-rotate(0deg) contrast(1)', scale: 1 },
        { filter: 'hue-rotate(80deg) contrast(1.4)', scale: 1.1, duration: slow * 1.4, ease },
        0
      );

      // DNA transform
      tl.fromTo(
        '.dna-left',
        { rotate: -10, y: 40, opacity: 0.3 },
        { rotate: 10, y: -40, opacity: 1, duration: slow * 1.4, ease },
        0.8
      );
      tl.fromTo(
        '.dna-right',
        { rotate: 10, y: -40, opacity: 0.3 },
        { rotate: -10, y: 40, opacity: 1, duration: slow * 1.4, ease },
        0.8
      );

      // Title reveal
      tl.fromTo(
        '.future-title',
        { opacity: 0, scale: 0.7, letterSpacing: '-8px' },
        { opacity: 1, scale: 1, letterSpacing: '2px', duration: slow, ease },
        1
      );
      tl.fromTo(
        '.future-body',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: slow, ease },
        1.6
      );
      tl.fromTo(
        '.future-btn',
        { opacity: 0, scale: 0.5, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: slow, ease },
        2.2
      );
    },
    { scope: container }
  );

  const dots = Array.from({ length: 24 }, (_, index) => index);

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden bg-[var(--color-bg-base)]">
      <div className="overlay-image future-bg" aria-hidden="true" />
      <div className="theme-tint" />
      <div className="digital-grid absolute inset-0" />

      <div className="dna-strand dna-left absolute left-[15%] top-[20%]">
        {dots.map((dot) => (
          <span key={`left-${dot}`} className="dna-dot" />
        ))}
      </div>
      <div className="dna-strand dna-right absolute right-[15%] top-[20%]">
        {dots.map((dot) => (
          <span key={`right-${dot}`} className="dna-dot" />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="scene-label text-xs uppercase tracking-[0.6em] text-white/60">Final Scene</p>
        <h2 className="future-title mt-4 text-[clamp(2.5rem,7vw,6rem)] font-semibold text-white">
          Evolution never stops.
        </h2>
        <p className="future-body mt-6 max-w-2xl text-base text-white/80">
          Biology becomes code. DNA becomes data. The next leap is not behind us, it is ahead.
        </p>

        <div className="future-btn mt-10">
          <button
            type="button"
            onClick={onReplay}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="inline-flex items-center gap-3 border border-[color:var(--color-primary)] px-6 py-4 text-sm uppercase tracking-[0.4em]"
            style={{
              borderRadius: 'var(--ui-radius)',
              background: hover ? 'var(--color-primary)' : 'rgba(0,0,0,0.5)',
              color: hover ? 'var(--color-bg-base)' : 'var(--color-text-main)',
              boxShadow: hover ? '0 0 40px var(--glow-color)' : 'var(--ui-shadow)',
              transition: 'all 0.4s ease'
            }}
          >
            <RotateCcw size={20} />
            Replay the journey
          </button>
        </div>
      </div>
    </section>
  );
}
