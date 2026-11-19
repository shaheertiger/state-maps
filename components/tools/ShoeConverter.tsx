"use client";
import { useState } from "react";
import { SHOE_SYSTEMS, type ShoeSystem, lengthFromShoe, shoeFromLength } from "@/lib/sizing";

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : `${Math.floor(n)}½`);

export function ShoeConverter() {
  const [sys, setSys] = useState<ShoeSystem>("usMen");
  const [v, setV] = useState("");
  const [youth, setYouth] = useState(false);
  const n = parseFloat(v);
  const L = Number.isFinite(n) ? lengthFromShoe(sys, n, youth) : NaN;
  const ok = L > 3 && L < 13.5;
  const r = ok ? shoeFromLength(L) : null;
  return (
    <div className="tool">
      <div className="row">
        <div className="field">
          <label htmlFor="sys">I know my size in</label>
          <select id="sys" value={sys} onChange={(e) => setSys(e.target.value as ShoeSystem)}>
            {SHOE_SYSTEMS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="size">{sys === "cm" ? "Foot length (cm)" : "Size"}</label>
          <input id="size" inputMode="decimal" value={v} onChange={(e) => setV(e.target.value)} placeholder={sys === "eu" ? "e.g. 42" : sys === "cm" ? "e.g. 26.5" : "e.g. 9.5"} />
        </div>
      </div>
      {sys === "usKids" && (
        <div className="row">
          <div className="seg" role="group" aria-label="Kids' size range">
            <button type="button" aria-pressed={!youth} onClick={() => setYouth(false)}>Little kids (C)</button>
            <button type="button" aria-pressed={youth} onClick={() => setYouth(true)}>Big kids / youth (Y)</button>
          </div>
        </div>
      )}
      <div className="result" aria-live="polite">
        {r ? (
          <ul className="status-list">
            <li><span>US men&rsquo;s</span><strong>{r.usMen >= 1 ? fmt(r.usMen) : "—"}</strong></li>
            <li><span>US women&rsquo;s</span><strong>{r.usWomen >= 3 ? fmt(r.usWomen) : "—"}</strong></li>
            <li><span>UK</span><strong>{r.uk >= 1 ? fmt(r.uk) : "—"}</strong></li>
            <li><span>EU</span><strong>{fmt(r.eu)}</strong></li>
            <li><span>US kids&rsquo; / youth</span><strong>{r.usMen < 7 ? r.usKids : "—"}</strong></li>
            <li><span>Foot length</span><strong>{r.cm} cm ({(r.cm / 2.54).toFixed(1)} in)</strong></li>
          </ul>
        ) : (
          <p className="muted">{v ? "That size is outside the range this converter covers. Check the system you picked." : "Pick your sizing system and enter a size."}</p>
        )}
        <p className="muted" style={{ marginTop: 10 }}>
          Conversions are approximate: brands differ by up to half a size, especially in EU sizing. Check the maker&rsquo;s own chart.
        </p>
      </div>
    </div>
  );
}
