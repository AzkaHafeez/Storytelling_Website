import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getMotionSettings } from '../utils/motion';

export default function HumanEvolution() {
  const container = useRef(null);
  const scroller = useRef(null);

  useGSAP(
    () => {
      const { ease, slow } = getMotionSettings();
      const totalWidth = scroller.current.scrollWidth;
      const windowWidth = window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${totalWidth * 2.2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Horizontal scroll
      tl.to(
        scroller.current,
        {
          x: () => -(totalWidth - windowWidth),
          ease: 'none',
          duration: 10
        },
        0
      );

      // Animate timeline nodes
      const nodes = gsap.utils.toArray('.timeline-node');
      nodes.forEach((node, index) => {
        const offset = (index / nodes.length) * 10;
        tl.fromTo(
          node,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: slow, ease },
          offset
        );
      });
    },
    { scope: container }
  );

  const timelineItems = [
    {
      year: '7M BCE',
      title: 'Sahelanthropus',
      description: 'Early lineage stands between forest and savanna.'
    },
    {
      year: '3.2M BCE',
      title: 'Australopithecus',
      description: 'Upright walking changes the way we move and see.'
    },
    {
      year: '2M BCE',
      title: 'Homo Habilis',
      description: 'Tools appear. Hands begin to shape the environment.'
    },
    {
      year: '1.8M BCE',
      title: 'Homo Erectus',
      description: 'Fire, migration, and new horizons.'
    },
    {
      year: '300K BCE',
      title: 'Homo Sapiens',
      description: 'Language and imagination move evolution inside the mind.'
    }
  ];

  return (
    <section ref={container} className="section-fade relative min-h-screen w-full overflow-hidden bg-[var(--color-bg-base)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05),transparent_60%)]" />

      <div ref={scroller} className="relative z-10 flex h-full items-center gap-[10vw] px-[10vw]">
        <div className="min-w-[70vw] max-w-2xl">
          <p className="scene-label text-xs uppercase tracking-[0.6em] text-[color:var(--color-text-muted)]">Scene 8</p>
          <h2 className="mt-4 text-[clamp(2.2rem,7vw,5rem)] font-semibold text-[color:var(--color-text-main)]">
            The Human Chapter
          </h2>
          <p className="mt-6 text-base text-[color:var(--color-text-muted)]">
            Evolution accelerates when curiosity becomes a tool. This chapter moves sideways in time
            before it moves forward.
          </p>

          <div className="mt-12 flex items-center gap-4">
            {timelineItems.map((item, index) => (
              <span key={index} className="timeline-node h-2 w-2 rounded-full bg-[color:var(--color-primary)]" />
            ))}
            <div className="h-[1px] flex-1 bg-[color:var(--ui-border)]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-text-muted)]">
              Ape to human
            </span>
          </div>
        </div>

        {timelineItems.map((item, index) => (
          <div
            key={index}
            className="evo-card min-w-[280px] max-w-[520px] break-words rounded-[var(--ui-radius)] border border-[color:var(--ui-border)] bg-[color:var(--color-bg-surface)]/70 p-6 text-left shadow-[var(--ui-shadow)]"
          >
            <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-primary)]">
              {item.year}
            </div>
            <h3 className="mt-3 break-words text-[clamp(1.6rem,4vw,2.5rem)] font-semibold leading-tight text-[color:var(--color-text-main)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-text-muted)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
