import type { Shape } from "./schema";

/**
 * Inline SVG fit diagrams, generated from each guide's checklist.
 * Every shape is a simple line drawing on a 240 × 240 grid with named anchor
 * points; the checklist's `anchor` values decide where the numbered pins go.
 */

type Pt = [number, number];
type ShapeDef = { paths: string[]; dashed?: string[]; anchors: Record<string, Pt>; label: string };

export const SHAPES: Record<Shape, ShapeDef> = {
  jacket: {
    label: "Front view of a jacket",
    paths: [
      "M100 30 L64 46 Q54 52 52 66 L38 178 L60 182 L72 96 L74 206 L166 206 L168 96 L180 182 L202 178 L188 66 Q186 52 176 46 L140 30 Q120 38 100 30 Z",
      "M100 30 L112 74 L104 80 L120 130 L136 80 L128 74 L140 30",
      "M120 130 L120 206",
      "M86 160 L104 160 M136 160 L154 160",
    ],
    dashed: ["M72 96 Q66 76 64 50", "M168 96 Q174 76 176 50"],
    anchors: { collar: [120, 36], shoulders: [64, 50], chest: [96, 100], button: [120, 140], waist: [150, 140], sleeve: [52, 120], cuff: [48, 178], hem: [96, 204], armhole: [174, 82] },
  },
  shirt: {
    label: "Front view of a shirt",
    paths: [
      "M102 28 L66 42 Q56 48 54 62 L40 172 L60 176 L74 94 L76 210 L164 210 L166 94 L180 176 L200 172 L186 62 Q184 48 174 42 L138 28 Q120 34 102 28 Z",
      "M102 28 L112 46 L120 40 L128 46 L138 28",
      "M120 40 L120 210",
    ],
    dashed: ["M74 94 Q68 74 66 46", "M166 94 Q172 74 174 46", "M42 160 L60 164 M198 160 L180 164"],
    anchors: { collar: [120, 38], shoulders: [66, 46], chest: [100, 96], armhole: [172, 80], sleeve: [52, 120], cuff: [48, 168], waist: [146, 150], hem: [96, 208] },
  },
  torso: {
    label: "Front view of a sleeveless garment",
    paths: [
      "M100 30 Q120 46 140 30 L170 42 Q164 70 168 98 L166 204 L74 204 L72 98 Q76 70 70 42 Z",
      "M100 30 L120 96 L140 30",
      "M120 96 L120 204",
    ],
    dashed: ["M72 98 Q90 92 94 60", "M168 98 Q150 92 146 60"],
    anchors: { neck: [120, 40], shoulders: [74, 44], chest: [100, 110], armhole: [166, 80], waist: [146, 156], hem: [96, 202], sides: [74, 150] },
  },
  pants: {
    label: "Front view of trousers",
    paths: [
      "M70 28 L170 28 L172 44 L180 222 L134 222 L122 100 L118 100 L106 222 L60 222 L68 44 Z",
      "M68 44 L172 44",
      "M120 44 L120 100",
    ],
    dashed: ["M84 44 Q86 70 106 72", "M156 44 Q154 70 134 72"],
    anchors: { waist: [120, 34], rise: [120, 86], seat: [156, 70], thigh: [88, 110], knee: [86, 156], leg: [154, 170], hem: [84, 220] },
  },
  shorts: {
    label: "Front view of shorts",
    paths: ["M66 50 L174 50 L176 66 L188 170 L136 176 L122 120 L118 120 L104 176 L52 170 L64 66 Z", "M64 66 L176 66", "M120 66 L120 120"],
    dashed: ["M70 100 L96 100 L98 140 L66 140"],
    anchors: { waist: [120, 56], rise: [120, 106], seat: [160, 90], thigh: [82, 120], hem: [78, 170] },
  },
  shoe: {
    label: "Side view of a shoe on a foot",
    paths: [
      "M26 176 L220 176 Q232 174 230 162 Q226 150 206 146 L168 136 Q150 118 120 102 L92 100 Q76 112 58 108 L40 104 Q28 120 26 150 Z",
      "M26 176 L26 186 L222 186 Q232 184 230 176",
    ],
    dashed: ["M44 168 Q40 120 60 112 Q100 112 140 126 Q190 140 208 156 Q214 166 204 170 L50 170 Z"],
    anchors: { toe: [214, 160], ball: [172, 150], instep: [128, 112], arch: [104, 184], heel: [32, 146], collar: [64, 106], length: [222, 168] },
  },
  boot: {
    label: "Side view of a boot",
    paths: [
      "M30 182 L216 182 Q228 180 226 168 Q222 156 202 152 L166 142 Q146 128 124 120 L104 116 L100 30 L36 30 L38 120 Q30 150 30 182 Z",
      "M30 182 L30 192 L218 192 Q228 190 226 182",
      "M36 46 L100 46",
    ],
    dashed: ["M48 174 Q44 128 54 104 Q60 60 62 34 M86 34 Q90 96 112 126 Q170 146 200 162 Q210 170 198 176 L52 176"],
    anchors: { toe: [210, 166], ball: [168, 156], instep: [116, 122], arch: [110, 190], heel: [34, 160], shaft: [100, 70], calf: [40, 50] },
  },
  sandal: {
    label: "Side view of a sandal on a foot",
    paths: [
      "M24 178 Q24 168 34 166 L214 166 Q228 168 226 178 L224 186 L26 186 Z",
      "M58 166 Q60 140 86 132 M120 166 Q122 120 136 116 M176 166 Q176 146 192 142",
    ],
    dashed: ["M34 164 Q26 120 54 112 Q100 104 140 116 Q192 132 214 152 Q218 162 210 164"],
    anchors: { toe: [214, 156], edge: [120, 186], strap: [134, 120], arch: [96, 176], heel: [30, 150], length: [226, 172] },
  },
  bra: {
    label: "Front view of a bra",
    paths: [
      "M40 140 Q46 92 82 80 Q110 86 116 140 Z",
      "M124 140 Q130 86 158 80 Q194 92 200 140 Z",
      "M24 140 L216 140 L216 164 L24 164 Z",
      "M82 80 L70 30 M158 80 L170 30",
      "M116 140 L120 128 L124 140",
    ],
    dashed: ["M44 140 Q48 104 82 92 Q106 98 112 140", "M128 140 Q134 98 158 92 Q192 104 196 140"],
    anchors: { band: [196, 152], cups: [80, 112], underwire: [44, 132], gore: [120, 134], straps: [168, 44], neckline: [120, 104] },
  },
  ring: {
    label: "A ring on a finger",
    paths: [
      "M92 236 L92 60 Q92 30 120 30 Q148 30 148 60 L148 236",
      "M86 150 Q120 140 154 150 L154 166 Q120 156 86 166 Z",
    ],
    dashed: ["M90 110 Q120 100 150 110"],
    anchors: { band: [120, 160], finger: [120, 70], knuckle: [148, 108], gap: [92, 160] },
  },
  wrist: {
    label: "A watch on a wrist",
    paths: [
      "M10 92 L230 82 M10 156 L230 162",
      "M150 70 L150 176 M178 70 L178 178",
      "M140 98 L188 98 L188 146 L140 146 Z",
    ],
    dashed: ["M96 84 Q104 76 112 84"],
    anchors: { wrist: [60, 124], bone: [104, 82], gap: [164, 170], clasp: [164, 176], case: [164, 122] },
  },
  glasses: {
    label: "Front view of glasses",
    paths: [
      "M20 96 Q22 88 34 88 L96 88 Q108 88 106 100 L102 134 Q100 148 84 148 L46 148 Q28 148 24 132 Z",
      "M220 96 Q218 88 206 88 L144 88 Q132 88 134 100 L138 134 Q140 148 156 148 L194 148 Q212 148 216 132 Z",
      "M106 98 Q120 86 134 98",
      "M20 96 L8 100 M220 96 L232 100",
    ],
    dashed: ["M54 118 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0", "M186 118 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0"],
    anchors: { frame: [24, 120], lens: [66, 128], bridge: [120, 92], temple: [216, 92], ear: [232, 108] },
  },
  hat: {
    label: "Side view of a hat on a head",
    paths: ["M70 128 Q66 60 120 52 Q174 60 170 128", "M20 130 Q120 116 220 130 Q120 142 20 130 Z"],
    dashed: ["M70 128 Q70 196 120 206 Q170 196 170 128"],
    anchors: { crown: [120, 58], brim: [206, 128], brow: [84, 138], sides: [168, 110], back: [70, 110] },
  },
  helmet: {
    label: "Side view of a helmet on a head",
    paths: ["M46 140 Q40 50 128 42 Q206 48 206 124 L190 134 L150 128 Q120 128 92 150 Z", "M100 146 L150 204 M176 132 L150 204"],
    dashed: ["M66 140 Q60 214 128 220 Q182 214 186 140"],
    anchors: { brow: [196, 128], forehead: [176, 76], sides: [110, 96], ears: [124, 160], back: [50, 120], strap: [150, 200] },
  },
  glove: {
    label: "A gloved hand",
    paths: [
      "M80 220 L80 150 Q66 140 58 124 L36 94 Q34 82 46 84 L74 112 L74 46 Q74 36 84 36 Q94 36 94 46 L96 100 L100 30 Q100 20 110 20 Q120 20 120 30 L120 100 L126 36 Q126 26 136 26 Q146 26 146 36 L142 104 L152 56 Q154 46 164 48 Q172 52 170 62 L162 140 Q160 158 152 166 L152 220 Z",
    ],
    dashed: ["M80 196 L152 196", "M90 100 Q120 108 150 104"],
    anchors: { fingertips: [110, 24], fingers: [136, 60], palm: [118, 150], thumb: [44, 90], knuckles: [120, 104], wrist: [116, 204] },
  },
  leg: {
    label: "Side view of a lower leg and foot",
    paths: ["M96 20 Q90 70 98 120 Q104 160 104 180 Q100 196 64 206 Q40 212 42 224 L188 224 Q196 210 160 200 Q140 192 138 176 Q132 120 144 70 Q148 40 144 20"],
    dashed: ["M96 34 L144 34", "M98 152 L138 152"],
    anchors: { toe: [180, 216], heel: [52, 216], ankle: [140, 182], calf: [100, 90], knee: [120, 26], top: [144, 40] },
  },
  dog: {
    label: "Side view of a dog wearing a harness",
    paths: [
      "M40 120 Q34 92 52 78 L60 52 L72 72 Q86 70 96 82 L104 108 Q150 100 184 108 Q206 112 210 92 L216 96 Q214 124 196 132 L198 196 L184 196 L178 144 L118 146 L112 196 L98 196 L96 140 Q70 136 60 130 Z",
    ],
    dashed: ["M92 82 L104 126", "M132 104 L132 146", "M100 112 Q118 118 132 110"],
    anchors: { neck: [92, 86], chest: [96, 134], girth: [132, 126], shoulders: [118, 104], legs: [106, 170] },
  },
  diaper: {
    label: "Front view of a diaper",
    paths: ["M40 60 L200 60 L196 98 Q160 112 150 180 L90 180 Q80 112 44 98 Z", "M40 60 L40 82 L58 82 M200 60 L200 82 L182 82"],
    dashed: ["M52 70 L188 70", "M64 104 Q86 124 92 172 M176 104 Q154 124 148 172"],
    anchors: { waist: [120, 64], tabs: [196, 72], legs: [74, 120], rise: [120, 176], back: [44, 64] },
  },
  generic: {
    label: "Fit checkpoints",
    paths: ["M20 104 L220 104 L220 136 L20 136 Z"],
    dashed: [],
    anchors: { p1: [36, 120], p2: [62, 120], p3: [88, 120], p4: [114, 120], p5: [140, 120], p6: [166, 120], p7: [192, 120], p8: [212, 120] },
  },
};

export function FitDiagram({ shape, points, title }: { shape: Shape; points: { anchor: string; point: string }[]; title: string }) {
  const def = SHAPES[shape];
  const used = new Map<string, number>();
  const pins = points.map((p, i) => {
    const base = def.anchors[p.anchor] ?? def.anchors[Object.keys(def.anchors)[i % Object.keys(def.anchors).length]];
    const n = used.get(p.anchor) ?? 0;
    used.set(p.anchor, n + 1);
    return { n: i + 1, x: base[0] + n * 18, y: base[1] - n * 4, label: p.point };
  });
  return (
    <svg viewBox="0 0 240 240" role="img" aria-labelledby="diagram-title" className="diagram">
      <title id="diagram-title">{`${title}: ${pins.map((p) => `${p.n}. ${p.label}`).join(", ")}`}</title>
      {shape === "generic" &&
        Array.from({ length: 41 }, (_, i) => (
          <line key={i} x1={20 + i * 5} x2={20 + i * 5} y1={104} y2={i % 5 === 0 ? 116 : 110} className="diagram-tick" />
        ))}
      {def.paths.map((d, i) => (
        <path key={i} d={d} className="diagram-line" />
      ))}
      {def.dashed?.map((d, i) => (
        <path key={`d${i}`} d={d} className="diagram-dash" />
      ))}
      {pins.map((p) => (
        <g key={p.n} className="diagram-pin">
          <circle cx={p.x} cy={p.y} r={9} />
          <text x={p.x} y={p.y} dy="0.35em" textAnchor="middle">
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
