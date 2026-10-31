"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Button from "@mui/material/Button";
import Link from "next/link";
const key = "optional-measurement-v1";
const id = process.env.NEXT_PUBLIC_GTM_ID;
const configured = !!id && /^GTM-[A-Z0-9]+$/.test(id);
export default function MeasurementConsent() {
  const [choice, setChoice] = useState<string | null>(null); const [open, setOpen] = useState(false); const [restricted, setRestricted] = useState(false);
  useEffect(() => { const privacySignal = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl || navigator.doNotTrack === "1"; setRestricted(!!privacySignal); try { const saved = localStorage.getItem(key); setChoice(privacySignal ? "declined" : saved === "accepted" || saved === "declined" ? saved : null); } catch { setChoice(privacySignal ? "declined" : null); } }, []);
  function choose(value: string) { try { localStorage.setItem(key, value); } catch { /* Consent still applies for this page. */ } if (choice === "accepted" && value === "declined") { window.location.reload(); return; } setChoice(value); setOpen(false); }
  if (!configured) return null;
  return <><div className="measurement-control no-print"><Button size="small" onClick={() => setOpen(true)}>Measurement preferences</Button></div>{(choice === null || open) && <aside className="consent no-print" aria-label="Optional measurement"><p><strong>Optional site measurement</strong></p><p>Allow analytics configured through Google Tag Manager? Your photo review choices are not sent by this site. <Link href="/privacy">Read the privacy details.</Link></p>{restricted && <p>Your browser requests no tracking, so measurement stays off.</p>}<div className="actions"><Button variant="outlined" onClick={() => choose("declined")}>Decline</Button><Button variant="contained" disabled={restricted} onClick={() => choose("accepted")}>Allow measurement</Button></div></aside>}{choice === "accepted" && !restricted && <><Script id="gtm-start" strategy="afterInteractive">{"window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});window.dataLayer.push({event:'page_template_view',page_template:document.querySelector('main[data-page-template]')?.getAttribute('data-page-template')||'reference'});"}</Script><Script id="gtm-container" src={`https://www.googletagmanager.com/gtm.js?id=${id}`} strategy="afterInteractive" /></>}</>;
}
