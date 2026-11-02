'use client';
import { useEffect, useState } from 'react';

/** Reading progress bar and back-to-top button. Purely visual; stores nothing. */
export default function PageChrome() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <>
    <div className="read-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
    <button type="button" className={`to-top${progress > 0.15 ? ' is-visible' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={progress > 0.15 ? 0 : -1}>↑</button>
  </>;
}
