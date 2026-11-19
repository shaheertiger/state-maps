"use client";
import { useMemo, useState } from "react";

export type Airline = {
  id: string;
  name: string;
  region: string;
  carryOn: { in: [number, number, number]; cm: [number, number, number] };
  personalItem?: { in: [number, number, number]; cm: [number, number, number] };
  weightKg?: number;
  note?: string;
  source: string;
  checked: string;
};

const fits = (bag: number[], limit: number[]) => {
  const b = [...bag].sort((x, y) => y - x), l = [...limit].sort((x, y) => y - x);
  return b.every((v, i) => v <= l[i]);
};

export function CarryOnChecker({ airlines }: { airlines: Airline[] }) {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [dims, setDims] = useState(["", "", ""]);
  const bag = dims.map((d) => parseFloat(d));
  const ready = bag.every((n) => n > 0);
  const regions = useMemo(() => [...new Set(airlines.map((a) => a.region))], [airlines]);
  const set = (i: number, v: string) => setDims((d) => d.map((x, j) => (j === i ? v : x)));
  const fmt = (t: number[]) => `${t.join(" × ")} ${unit}`;
  return (
    <div className="tool">
      <div className="row">
        <div className="seg" role="group" aria-label="Unit">
          <button type="button" aria-pressed={unit === "in"} onClick={() => setUnit("in")}>Inches</button>
          <button type="button" aria-pressed={unit === "cm"} onClick={() => setUnit("cm")}>Centimeters</button>
        </div>
      </div>
      <div className="row">
        {["Height", "Width", "Depth"].map((label, i) => (
          <div className="field" key={label}>
            <label htmlFor={`bag-${i}`}>{label} ({unit})</label>
            <input id={`bag-${i}`} inputMode="decimal" value={dims[i]} onChange={(e) => set(i, e.target.value)} placeholder={unit === "in" ? ["22", "14", "9"][i] : ["55", "35", "23"][i]} />
          </div>
        ))}
      </div>
      <p className="muted" style={{ marginTop: -6 }}>Measure the outside of the bag, including wheels and handles, with the bag packed.</p>
      <div className="result" aria-live="polite">
        {!ready && <p className="muted">Enter your bag&rsquo;s three measurements to check it against each airline.</p>}
        {ready && (
          <p>
            <strong>{airlines.filter((a) => fits(bag, a.carryOn[unit])).length}</strong> of {airlines.length} airlines accept a {fmt(bag)} bag as a carry-on.
          </p>
        )}
        {regions.map((r) => (
          <div key={r}>
            <h3>{r}</h3>
            <ul className="status-list">
              {airlines
                .filter((a) => a.region === r)
                .map((a) => {
                  const ok = ready && fits(bag, a.carryOn[unit]);
                  const pi = ready && a.personalItem && fits(bag, a.personalItem[unit]);
                  return (
                    <li key={a.id}>
                      <span>
                        <a href={a.source} rel="noopener" target="_blank">{a.name}</a>
                        <span className="muted" style={{ display: "block", fontSize: "0.85rem" }}>
                          Carry-on {fmt(a.carryOn[unit])}
                          {a.weightKg ? `, ${a.weightKg} kg` : ""}
                          {a.personalItem ? `. Personal item ${fmt(a.personalItem[unit])}` : ""}
                          {a.note ? `. ${a.note}` : ""}
                        </span>
                      </span>
                      {ready && <span className={ok ? "ok" : "bad"}>{ok ? (pi ? "Fits, even as a personal item" : "Fits") : "Too big"}</span>}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
