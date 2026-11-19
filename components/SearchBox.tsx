export function SearchBox({ compact = false, autoFocus = false, defaultValue = "" }: { compact?: boolean; autoFocus?: boolean; defaultValue?: string }) {
  return (
    <form className={`search-form${compact ? " compact" : ""}`} action="/search/" method="get" role="search">
      <label htmlFor={compact ? "q-header" : "q-main"} className="skip">
        Search fit guides
      </label>
      <input
        id={compact ? "q-header" : "q-main"}
        name="q"
        type="search"
        placeholder={compact ? "Search guides" : "Try “suit jacket”, “queen sheets”, “Birkenstock”"}
        autoComplete="off"
        autoFocus={autoFocus}
        defaultValue={defaultValue}
      />
      <button type="submit">Search</button>
    </form>
  );
}
