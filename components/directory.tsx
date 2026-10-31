"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
type Item = { title: string; description: string; group: string; href: string };
export default function Directory({ items }: { items: Item[] }) {
  const [query, setQuery] = useState(""); const [group, setGroup] = useState("All");
  const groups = ["All", ...new Set(items.map(i => i.group))];
  const filtered = items.filter(i => (group === "All" || i.group === group) && `${i.title} ${i.description} ${i.group}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><div className="directory-controls"><TextField fullWidth label="Search this library" type="search" value={query} onChange={e => setQuery(e.target.value)} /><div className="filters" role="group" aria-label="Filter by topic">{groups.map(g => <Button key={g} variant={group === g ? "contained" : "outlined"} onClick={() => setGroup(g)} aria-pressed={group === g}>{g}</Button>)}</div></div><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "entry" : "entries"}</p><div className="grid">{filtered.map(i => <Link className="card" href={i.href} key={i.href}><small>{i.group}</small><h2>{i.title}</h2><p>{i.description}</p><span aria-hidden="true">Explore →</span></Link>)}</div>{filtered.length === 0 && <p>No matches. Try a shorter phrase or choose another topic.</p>}</>;
}
