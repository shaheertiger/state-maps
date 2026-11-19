"use client";
import { useEffect, useRef, useState } from "react";

type Result = { url: string; meta: { title?: string }; excerpt: string };
type Pagefind = { search: (q: string) => Promise<{ results: { data: () => Promise<Result> }[] }> };

/** Static search: Pagefind's index is built into /pagefind/ after `next build`. */
export function SearchResults() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState("");
  const pf = useRef<Pagefind | null>(null);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    setQ(initial);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!q.trim()) return setResults(null);
      try {
        if (!pf.current) {
          const path = "/pagefind/pagefind.js";
          pf.current = (await import(/* webpackIgnore: true */ path)) as Pagefind;
        }
        const r = await pf.current.search(q);
        const data = await Promise.all(r.results.slice(0, 20).map((x) => x.data()));
        if (!cancelled) {
          setResults(data);
          setError("");
        }
      } catch {
        if (!cancelled) setError("Search isn't available in this preview. It works on the built site.");
      }
    };
    const t = setTimeout(run, 150);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  return (
    <div>
      <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q-page" className="skip">Search</label>
        <input id="q-page" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fit guides, brands and sizes" autoFocus />
        <button type="submit">Search</button>
      </form>
      <div aria-live="polite" style={{ marginTop: 24 }}>
        {error && <p className="muted">{error}</p>}
        {results && results.length === 0 && (
          <p>No guides match &ldquo;{q}&rdquo;. Try the item on its own, like &ldquo;boots&rdquo; or &ldquo;sheets&rdquo;.</p>
        )}
        {results && results.length > 0 && (
          <ul className="problems">
            {results.map((r) => (
              <li key={r.url}>
                <a href={r.url}>
                  <strong>{r.meta.title?.split(" | ")[0]}</strong>
                </a>
                <span className="muted" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
