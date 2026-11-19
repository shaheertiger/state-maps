/**
 * Size maths shared by the tools. These are the same conventions the guides
 * describe (approximate; brands vary), so tools and articles agree.
 */

export const IN = 2.54;

// ---------- Shoes (foot length in inches) ----------
export type ShoeSystem = "usMen" | "usWomen" | "uk" | "eu" | "cm" | "usKids";
export const SHOE_SYSTEMS: { id: ShoeSystem; label: string }[] = [
  { id: "usMen", label: "US men's" },
  { id: "usWomen", label: "US women's" },
  { id: "uk", label: "UK" },
  { id: "eu", label: "EU" },
  { id: "cm", label: "Foot length (cm)" },
  { id: "usKids", label: "US kids' / youth" },
];
const roundHalf = (n: number) => Math.round(n * 2) / 2;
export function shoeFromLength(L: number) {
  const usMen = 3 * L - 22;
  const kids = 3 * L - 9.6; // children's scale; youth sizes restart at 1 after 13.5
  return {
    usMen: roundHalf(usMen),
    usWomen: roundHalf(usMen + 1.5),
    uk: roundHalf(usMen - 0.5),
    eu: roundHalf(1.5 * (L * IN + 2)),
    cm: Math.round(L * IN * 10) / 10,
    usKids: kids < 14 ? `${roundHalf(Math.max(kids, 0))}C` : `${roundHalf(kids - 13)}Y`,
  };
}
export function lengthFromShoe(system: ShoeSystem, v: number, youth = false): number {
  switch (system) {
    case "usMen": return (v + 22) / 3;
    case "usWomen": return (v - 1.5 + 22) / 3;
    case "uk": return (v + 0.5 + 22) / 3;
    case "eu": return (v / 1.5 - 2) / IN;
    case "cm": return v / IN;
    case "usKids": return ((youth ? v + 13 : v) + 9.6) / 3;
  }
}
export const fraction = (n: number) => {
  const whole = Math.floor(n), f = n - whole;
  const s = f < 0.25 ? "" : f < 0.75 ? "½" : "";
  const w = f >= 0.75 ? whole + 1 : whole;
  return `${w || (s ? "" : "0")}${s}`;
};

// ---------- Rings ----------
export const ringDiameter = (us: number) => 11.63 + 0.8128 * us; // mm
export const ringCirc = (us: number) => Math.PI * ringDiameter(us);
export const usFromDiameter = (mm: number) => (mm - 11.63) / 0.8128;
const UK_LETTERS = ["F", "G", "H", "I", "J½", "K½", "L½", "M½", "N½", "O½", "P½", "Q½", "R½", "S½", "T½", "U½", "V½", "W½", "Y", "Z", "Z+1"];
export const ukRing = (us: number) => UK_LETTERS[Math.round((us - 3) * 2)] ?? "—";
export const RING_SIZES = Array.from({ length: 21 }, (_, i) => 3 + i * 0.5);

// ---------- Bras ----------
export const US_CUPS = ["AA", "A", "B", "C", "D", "DD", "DDD (F)", "G", "H", "I", "J", "K"];
export const UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H"];
export const EU_CUPS = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
export function braSize(underbustIn: number, bustIn: number, plusFour = false) {
  // Modern method: underbust rounded to the nearest inch, odd numbers rounded up to the next even band.
  // Older "plus four" method: add 4 in (5 if odd) to the rounded underbust.
  const rounded = Math.round(underbustIn);
  const band = plusFour ? rounded + (rounded % 2 ? 5 : 4) : rounded % 2 ? rounded + 1 : rounded;
  const diff = Math.round(bustIn - band);
  const cup = Math.max(0, Math.min(diff, US_CUPS.length - 1));
  const euBand = band * 2.5 - 10; // 32 → 70, 34 → 75 …
  return {
    band,
    cupIndex: cup,
    diff,
    us: `${band}${US_CUPS[cup]}`,
    uk: `${band}${UK_CUPS[cup]}`,
    eu: `${euBand}${EU_CUPS[cup]}`,
    fr: `${euBand + 15}${EU_CUPS[cup]}`,
    sisters: [
      [band - 2, cup + 1],
      [band + 2, cup - 1],
    ]
      .filter(([b, c]) => b >= 26 && c >= 0 && c < US_CUPS.length)
      .map(([b, c]) => `${b}${US_CUPS[c]}`),
  };
}

// ---------- Beds ----------
export const BEDS = [
  { id: "twin", name: "Twin", w: 38, l: 75 },
  { id: "twin-xl", name: "Twin XL", w: 38, l: 80 },
  { id: "full", name: "Full (double)", w: 54, l: 75 },
  { id: "queen", name: "Queen", w: 60, l: 80 },
  { id: "king", name: "King", w: 76, l: 80 },
  { id: "cal-king", name: "California king", w: 72, l: 84 },
] as const;
