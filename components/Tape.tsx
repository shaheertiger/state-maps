/**
 * The measuring-tape strip across the top of every page: inch marks with 1/8 in ticks.
 * Drawn as a CSS background (public/tape.svg) so its numbers are not text in the page:
 * crawlers and screen readers start reading at the H1, not at "1 2 3 … 47".
 */
export function Tape() {
  return <div className="tape" aria-hidden="true" />;
}
