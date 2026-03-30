import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => setProgress(self.progress || 0)
    });

    return () => trigger.kill();
  }, []);

  const percent = Math.round(progress * 100);
  const years = (progress * 3.8).toFixed(2);

  return (
    <div className="progress-indicator">
      <div className="progress-line">
        <div className="progress-fill" style={{ height: `${percent}%` }} />
      </div>
      <div className="progress-readout">
        <span>{percent}%</span>
        <span className="progress-years">{years}B yrs</span>
      </div>
    </div>
  );
}
