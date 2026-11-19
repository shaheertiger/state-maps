import { JsonLd } from "./JsonLd";

export function Faq({ items, id = "faq", heading = "Questions people ask" }: { items: { q: string; a: string }[]; id?: string; heading?: string }) {
  if (!items.length) return null;
  return (
    <section className="faq" aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
