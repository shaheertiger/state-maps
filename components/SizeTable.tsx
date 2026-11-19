type T = { caption: string; headers: string[]; rows: string[][]; note?: string; source?: { name: string; url: string } };

export function SizeTable({ table, checked }: { table: T; checked?: string }) {
  return (
    <>
      <div className="data-table-wrap" tabIndex={0} role="region" aria-label={table.caption}>
        <table className="data-table">
          <caption>{table.caption}</caption>
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {c}
                    </th>
                  ) : (
                    <td key={j}>{c}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(table.note || table.source) && (
        <p className="table-note">
          {table.note}{" "}
          {table.source && (
            <>
              Source:{" "}
              <a href={table.source.url} rel="noopener" target="_blank">
                {table.source.name}
              </a>
              {checked ? `, last checked ${formatDate(checked)}` : ""}.
            </>
          )}
        </p>
      )}
    </>
  );
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
