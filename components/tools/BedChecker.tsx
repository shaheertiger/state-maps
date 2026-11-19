"use client";
import { useState } from "react";
import { BEDS } from "@/lib/sizing";

type Kind = "mattress-frame" | "sheet-mattress";

export function BedChecker() {
  const [kind, setKind] = useState<Kind>("mattress-frame");
  const [a, setA] = useState("queen");
  const [b, setB] = useState("full");
  const A = BEDS.find((x) => x.id === a)!, B = BEDS.find((x) => x.id === b)!;
  const dw = A.w - B.w, dl = A.l - B.l;
  const what = kind === "mattress-frame" ? ["mattress", "bed frame"] : ["fitted sheet", "mattress"];
  let verdict: "yes" | "no" | "loosely";
  if (dw === 0 && dl === 0) verdict = "yes";
  else if (dw < 0 || dl < 0) verdict = kind === "mattress-frame" && dw <= 0 && dl <= 0 ? "loosely" : "no";
  else verdict = kind === "sheet-mattress" && dw <= 6 && dl <= 6 ? "loosely" : "no";
  const diffs = [dw && `${Math.abs(dw)} in ${dw > 0 ? "wider" : "narrower"}`, dl && `${Math.abs(dl)} in ${dl > 0 ? "longer" : "shorter"}`].filter(Boolean).join(" and ");
  const explain =
    verdict === "yes"
      ? "They're the same size, so it's a proper fit."
      : kind === "mattress-frame"
        ? verdict === "no"
          ? "The mattress overhangs the frame, so it won't be supported at the edges and the slats may not carry it."
          : "The mattress fits inside the frame but leaves gaps, so it can slide around. A frame of the matching size fits properly."
        : verdict === "no"
          ? dw < 0 || dl < 0
            ? "The sheet is smaller than the mattress in at least one direction, so its corners won't stretch over."
            : "The sheet is too big to stay tucked; it will bunch and pull loose."
          : "It goes on, but the extra fabric bunches. Tuck the excess under the mattress or use sheet straps.";
  return (
    <div className="tool">
      <div className="row">
        <div className="seg" role="group" aria-label="What are you checking?">
          <button type="button" aria-pressed={kind === "mattress-frame"} onClick={() => setKind("mattress-frame")}>Mattress on a frame</button>
          <button type="button" aria-pressed={kind === "sheet-mattress"} onClick={() => setKind("sheet-mattress")}>Sheets on a mattress</button>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="bed-a">{what[0][0].toUpperCase() + what[0].slice(1)} size</label>
          <select id="bed-a" value={a} onChange={(e) => setA(e.target.value)}>
            {BEDS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="bed-b">{what[1][0].toUpperCase() + what[1].slice(1)} size</label>
          <select id="bed-b" value={b} onChange={(e) => setB(e.target.value)}>
            {BEDS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </div>
      </div>
      <div className="result" aria-live="polite">
        <div className={`result-big verdict verdict-${verdict}`}>{{ yes: "Yes", no: "No", loosely: "Yes, loosely" }[verdict]}</div>
        <p>
          A {A.name.toLowerCase()} {what[0]} is {A.w} × {A.l} in ({Math.round(A.w * 2.54)} × {Math.round(A.l * 2.54)} cm)
          {diffs ? `, ${diffs} than ` : ", the same as "}a {B.name.toLowerCase()} {what[1]} ({B.w} × {B.l} in). {explain}
        </p>
      </div>
    </div>
  );
}
