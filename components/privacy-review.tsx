"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LinearProgress from "@mui/material/LinearProgress";
import { buildReview, defaultAnswers, normalizeAnswers, reviewActions, reviewQuestions, type ReviewAnswers } from "@/lib/privacy-review";
const storageKey = "photo-privacy-review-v1";
export default function PrivacyReview() {
  const [answers, setAnswers] = useState<ReviewAnswers>(defaultAnswers);
  const [done, setDone] = useState<string[]>([]); const [message, setMessage] = useState(""); const [share, setShare] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (reviewQuestions.some(q => p.has(q.id))) { setAnswers(normalizeAnswers(Object.fromEntries(reviewQuestions.map(q => [q.id, p.get(q.id) || ""])))); return; }
    try { const saved = JSON.parse(localStorage.getItem(storageKey) || "null"); if (saved && typeof saved === "object" && saved.answers && typeof saved.answers === "object") { setAnswers(normalizeAnswers(saved.answers)); setDone(Array.isArray(saved.done) ? saved.done.filter((id: unknown) => typeof id === "string" && reviewActions.some(a => a.id === id)) : []); } } catch { /* A blocked or invalid local record should not stop the tool. */ }
  }, []);
  const actions = buildReview(answers); const completed = actions.filter(a => done.includes(a.id)).length;
  const report = () => ["My iPhone privacy review", ...reviewQuestions.map(q => `${q.label} ${q.options.find(o => o[0] === answers[q.id])?.[1]}`), "", ...actions.map(a => `[${done.includes(a.id) ? "x" : " "}] ${a.title}\n${a.body}\n${window.location.origin}/blog/${a.slug}`)].join("\n\n");
  function save() { try { localStorage.setItem(storageKey, JSON.stringify({ answers, done })); setMessage("Review saved in this browser. Save again after making changes."); } catch { setMessage("This browser could not save the review. You can download a text copy instead."); } }
  function clear() { try { localStorage.removeItem(storageKey); } catch { /* Show the reset even when browser storage is unavailable. */ } setAnswers(defaultAnswers); setDone([]); setShare(""); window.history.replaceState(null, "", window.location.pathname); setMessage("Review reset. Any saved browser record was cleared where storage access is available."); }
  async function shareLink() { const url = new URL(window.location.pathname, window.location.origin); reviewQuestions.forEach(q => url.searchParams.set(q.id, answers[q.id])); setShare(url.href); try { await navigator.clipboard.writeText(url.href); setMessage("Link copied. It includes your choices, but not completed steps. Anyone with it can read those choices."); } catch { setMessage("Copy the link below. It includes your general choices, not completed steps."); } }
  function download() { const url = URL.createObjectURL(new Blob([report()], { type: "text/plain;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "iphone-privacy-review.txt"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  return <div className="review"><div className="review-inputs">{reviewQuestions.map((q, i) => <TextField select fullWidth key={q.id} label={`${i + 1}. ${q.label}`} value={answers[q.id]} onChange={e => { setAnswers(a => ({ ...a, [q.id]: e.target.value })); setShare(""); setMessage(""); }}>{q.options.map(o => <MenuItem key={o[0]} value={o[0]}>{o[1]}</MenuItem>)}</TextField>)}</div>
    <section aria-labelledby="review-results"><h2 id="review-results">Your action list</h2><p role="status" aria-live="polite">{completed} of {actions.length} checks completed</p><LinearProgress variant="determinate" value={completed / actions.length * 100} aria-label="Completed checks" />
    <ol className="review-list">{actions.map(a => <li key={a.id}><label><input type="checkbox" checked={done.includes(a.id)} onChange={e => setDone(prev => e.target.checked ? [...prev, a.id] : prev.filter(v => v !== a.id))} /> <strong>{a.title}</strong></label><p>{a.body}</p><Link href={`/blog/${a.slug}`}>Read the guide →</Link></li>)}</ol></section>
    <div className="actions no-print"><Button variant="contained" onClick={save}>Save on this device</Button><Button variant="outlined" onClick={download}>Download text</Button><Button variant="outlined" onClick={() => window.print()}>Print / save PDF</Button><Button variant="outlined" onClick={shareLink}>Share choices</Button><Button onClick={clear}>Clear saved review</Button></div>
    <p role="status" aria-live="polite">{message}</p>{share && <TextField fullWidth label="Share link — includes your choices" value={share} slotProps={{ input: { readOnly: true } }} />}
    <details><summary>All available checks</summary><p>Different answers select from these checks. This is a planning aid, not an inspection of your settings.</p>{reviewActions.map(a => <p key={a.id}><strong>{a.title}:</strong> {a.body}</p>)}</details>
  </div>;
}
