import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorAura() {
  const auraRef = useRef(null);

  useEffect(() => {
    const aura = auraRef.current;
    if (!aura) return;

    const xTo = gsap.quickTo(aura, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(aura, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMove = (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <div ref={auraRef} className="cursor-aura" />;
}
