import type { CompatPage } from "@/lib/compat";

const hi = (r?: number | [number, number]) => (r === undefined ? undefined : Array.isArray(r) ? r[1] : r);
const lo = (r?: number | [number, number]) => (r === undefined ? undefined : Array.isArray(r) ? r[0] : r);

/** Both outlines drawn to the same scale: A filled (tape yellow), B dashed (chalk blue). */
export function Overlay({ p }: { p: CompatPage }) {
  const { a, b } = p;
  const W = 520, H = 300, pad = 28;
  if (p.pair.mode === "round" && a.d && b.d) {
    const max = Math.max(hi(a.d)!, hi(b.d)!);
    const s = (H - pad * 2) / max;
    const cx = W / 2, cy = H / 2;
    return (
      <figure className="overlay">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${a.name} base compared with ${b.name} opening, to scale`}>
          <circle cx={cx} cy={cy} r={(hi(b.d)! * s) / 2} className="ov-b" />
          {Array.isArray(b.d) && <circle cx={cx} cy={cy} r={(lo(b.d)! * s) / 2} className="ov-b" />}
          <circle cx={cx} cy={cy} r={(hi(a.d)! * s) / 2} className="ov-a" />
        </svg>
        <Legend p={p} />
      </figure>
    );
  }
  if (p.pair.mode === "standard" || !a.w || !a.l || !b.w || !b.l) return null;
  // Top-down footprint: width across, length down. Ranges draw the max outline.
  const aw = hi(a.w)!, al = hi(a.l)!, bw = hi(b.w)!, bl = hi(b.l)!;
  const scale = Math.min((W - pad * 2) / Math.max(al, bl), (H - pad * 2) / Math.max(aw, bw));
  // Centre both outlines on each other so any overhang shows on every side.
  const cx = W / 2, cy = H / 2;
  const box = (w: number, l: number) => ({ x: cx - (l * scale) / 2, y: cy - (w * scale) / 2, width: l * scale, height: w * scale });
  const A = box(aw, al), B = box(bw, bl);
  const Bmin = Array.isArray(b.w) || Array.isArray(b.l) ? box(lo(b.w)!, lo(b.l)!) : null;
  return (
    <figure className="overlay">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Top view of ${a.name} over ${b.name}, drawn to scale`}>
        <rect {...A} className="ov-a" />
        <rect {...B} className="ov-b" />
        {Bmin && <rect {...Bmin} className="ov-b" style={{ opacity: 0.5 }} />}
        <text x={A.x + 8} y={A.y + 18} className="ov-label">
          {a.name}
        </text>
      </svg>
      <Legend p={p} />
    </figure>
  );
}

function Legend({ p }: { p: CompatPage }) {
  return (
    <figcaption className="ov-legend">
      <span>
        <span className="swatch" aria-hidden="true" />
        {p.a.name}
      </span>
      <span>
        <span className="swatch swatch-b" aria-hidden="true" />
        {p.b.name}
        {Array.isArray(p.b.w) || Array.isArray(p.b.d) ? " (typical range)" : ""}
      </span>
      <span className="muted">Drawn to scale, top view</span>
    </figcaption>
  );
}
