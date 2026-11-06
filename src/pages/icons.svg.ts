import { ICONS } from "../lib/icons";
export const GET = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg">${Object.entries(ICONS).map(([k, d]) => `<symbol id="${k}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`).join("")}</svg>`,
    { headers: { "content-type": "image/svg+xml" } },
  );
