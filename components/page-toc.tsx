'use client';
import { useEffect, useState } from 'react';

type Item = { id: string; label: string };
/** Sticky "On this page" navigation that highlights the section being read. */
export default function PageToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.3;
        let current = items[0]?.id;
        for (const i of items) { const el = document.getElementById(i.id); if (el && el.getBoundingClientRect().top <= line) current = i.id; }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, [items]);
  return <nav className="toc" aria-label="On this page">
    <p className="toc-title">On this page</p>
    {items.map(i => <a href={`#${i.id}`} key={i.id} aria-current={active === i.id ? 'location' : undefined}>{i.label}</a>)}
  </nav>;
}
