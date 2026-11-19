"use client";
import { useState } from "react";
import { RING_SIZES, ringCirc, ringDiameter, ukRing, usFromDiameter } from "@/lib/sizing";

const half = (n: number) => Math.round(n * 2) / 2;
const show = (n: number) => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);

export function RingSizer() {
  const [mode, setMode] = useState<"circ" | "diam">("circ");
  const [v, setV] = useState("");
  const n = parseFloat(v);
  const d = mode === "circ" ? n / Math.PI : n;
  const us = d > 10 && d < 26 ? half(usFromDiameter(d)) : null;
  const inRange = us !== null && us >= 3 && us <= 13;
  return (
    <div className="tool no-print">
      <div className="row">
        <div className="seg" role="group" aria-label="What did you measure?">
          <button type="button" aria-pressed={mode === "circ"} onClick={() => setMode("circ")}>Finger circumference</button>
          <button type="button" aria-pressed={mode === "diam"} onClick={() => setMode("diam")}>Ring inside diameter</button>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="ring-mm">{mode === "circ" ? "Circumference" : "Inside diameter"} in millimeters</label>
          <input id="ring-mm" inputMode="decimal" value={v} onChange={(e) => setV(e.target.value)} placeholder={mode === "circ" ? "e.g. 54" : "e.g. 17.3"} />
        </div>
      </div>
      <div className="result" aria-live="polite">
        {us !== null && inRange ? (
          <>
            <div className="muted">Closest US size</div>
            <div className="result-big">{show(us)}</div>
            <ul className="status-list">
              <li><span>UK / Australia</span><strong>{ukRing(us)}</strong></li>
              <li><span>EU / ISO (circumference, mm)</span><strong>{Math.round(ringCirc(us))}</strong></li>
              <li><span>Inside diameter</span><strong>{ringDiameter(us).toFixed(1)} mm</strong></li>
            </ul>
            <p className="muted" style={{ marginTop: 10 }}>
              For a wide band (6 mm or more), or if your knuckle is much larger than the base of your finger, go up half a size.
            </p>
          </>
        ) : (
          <p className="muted">{v ? "That's outside the usual ring size range (US 3–13). Check the measurement is in millimeters." : "Enter a measurement to find your size."}</p>
        )}
      </div>
    </div>
  );
}

export function PrintableSizer() {
  return (
    <div className="print-sizer">
      <p className="print-cal">
        Before you use it: print at 100% (&ldquo;actual size&rdquo;, not &ldquo;fit to page&rdquo;), then check the line below is exactly
        85.6 mm, the width of a credit card.
      </p>
      <div className="cal-line" aria-hidden="true" />
      <div className="circles">
        {RING_SIZES.filter((s) => s >= 4 && s <= 12).map((s) => (
          <div key={s} className="circle-wrap">
            <div className="circle" style={{ width: `${ringDiameter(s)}mm`, height: `${ringDiameter(s)}mm` }} />
            <span>{show(s)}</span>
          </div>
        ))}
      </div>
      <p className="print-cal">Place a ring that fits on the circles. The size whose line runs just inside the ring&rsquo;s inner edge is your size.</p>
    </div>
  );
}
