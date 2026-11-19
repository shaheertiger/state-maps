"use client";
import { useState } from "react";
import { braSize } from "@/lib/sizing";

export function BraCalculator() {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [under, setUnder] = useState("");
  const [bust, setBust] = useState("");
  const [plusFour, setPlusFour] = useState(false);
  const k = unit === "cm" ? 1 / 2.54 : 1;
  const u = parseFloat(under) * k, b = parseFloat(bust) * k;
  const valid = u > 20 && u < 60 && b > u;
  const r = valid ? braSize(u, b, plusFour) : null;
  const error = under && bust && !valid ? (b <= u ? "Your bust measurement should be larger than your underbust. Measure the fullest part of your bust, keeping the tape loose." : "Check the underbust measurement and the unit.") : "";
  return (
    <div className="tool">
      <div className="row">
        <div>
          <span className="skip" id="unit-l">Unit</span>
          <div className="seg" role="group" aria-labelledby="unit-l">
            <button type="button" aria-pressed={unit === "in"} onClick={() => setUnit("in")}>Inches</button>
            <button type="button" aria-pressed={unit === "cm"} onClick={() => setUnit("cm")}>Centimeters</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="under">Underbust ({unit})</label>
          <input id="under" inputMode="decimal" value={under} onChange={(e) => setUnder(e.target.value)} placeholder={unit === "in" ? "e.g. 31.5" : "e.g. 80"} />
        </div>
        <div className="field">
          <label htmlFor="bust">Bust ({unit})</label>
          <input id="bust" inputMode="decimal" value={bust} onChange={(e) => setBust(e.target.value)} placeholder={unit === "in" ? "e.g. 36" : "e.g. 92"} />
        </div>
      </div>
      <label style={{ fontWeight: 400, display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={plusFour} onChange={(e) => setPlusFour(e.target.checked)} style={{ width: "auto" }} />
        Use the older &ldquo;add 4 inches&rdquo; band method (some US department-store brands)
      </label>
      <div className="result" aria-live="polite">
        {r ? (
          <>
            <div className="muted">Your starting size</div>
            <div className="result-big">{r.us}</div>
            <ul className="status-list">
              <li><span>US</span><strong>{r.us}</strong></li>
              <li><span>UK</span><strong>{r.uk}</strong></li>
              <li><span>EU</span><strong>{r.eu}</strong></li>
              <li><span>France / Belgium</span><strong>{r.fr}</strong></li>
              <li><span>Sister sizes (same cup volume)</span><strong>{r.sisters.join(" or ") || "—"}</strong></li>
            </ul>
            <p className="muted" style={{ marginTop: 10 }}>
              Treat this as a starting point. Try it on: the band should sit level and feel snug on the loosest hook. If the band rides up,
              go down a band and up a cup (the first sister size); if it digs in, go up a band and down a cup.
            </p>
          </>
        ) : (
          <p className="muted">{error || "Enter both measurements to see your size."}</p>
        )}
      </div>
    </div>
  );
}
