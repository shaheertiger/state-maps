import type { APIRoute } from "astro";
import { APPS, level, hasTrackPage, hasLockPage, getTopic, getCategory } from "../lib/data";
import { SENSITIVITY } from "../lib/labels";

/** Compact index for the home widget, search page and tools. Data types are indices into `types`. */
export const GET: APIRoute = () => {
  const ix = (xs: string[]) => xs.map((x) => SENSITIVITY.indexOf(x));
  const rows = APPS.map((a) => ({
    s: a.slug,
    n: a.display,
    f: a.name !== a.display ? a.name : undefined,
    d: a.developer,
    k: `${getTopic(a.topic).name} ${getCategory(a.category).name}`,
    c: a.category,
    l: level(a),
    t: ix(a.track),
    i: ix(a.linked),
    u: ix(a.notLinked),
    r: a.rank,
    v: [hasTrackPage(a) ? 1 : 0, hasLockPage(a) ? 1 : 0],
  }));
  return new Response(JSON.stringify({ types: SENSITIVITY, apps: rows }), { headers: { "content-type": "application/json" } });
};
