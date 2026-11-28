import { Breadcrumbs } from "./Breadcrumbs";

export function InfoPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <article className="prose">
        <h1>{title}</h1>
        <Breadcrumbs items={[{ name: title, href: path }]} />
        {children}
      </article>
    </div>
  );
}
