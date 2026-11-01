'use client';
import {useState} from 'react';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
type Entry={slug:string;name:string;developer:string;category:string};
export default function AppCatalogSearch(){const [category,setCategory]=useState(''),[query,setQuery]=useState(''),[entries,setEntries]=useState<Entry[]|null>(null),[status,setStatus]=useState('');
 async function load(){if(entries||status==='Loading app index…')return;setStatus('Loading app index…');try{const r=await fetch('/app-directory-index.json');if(!r.ok)throw Error();setEntries(await r.json());setStatus('');}catch{setStatus('The search index could not load. Use the directory pages below.');}}
 const categories=entries?[...new Set(entries.map(a=>a.category))].sort():[];
 const matches=entries&&(query.trim().length>=2||category)?entries.filter(a=>(!category||a.category===category)&&`${a.name} ${a.developer} ${a.category}`.toLowerCase().includes(query.trim().toLowerCase())):[];
 return <section aria-label="Search sourced app records"><TextField fullWidth type="search" label="Find an app or developer" value={query} onFocus={()=>void load()} onChange={e=>{setQuery(e.target.value.slice(0,100));void load();}}/><label className="category-filter">Category<select value={category} onFocus={()=>void load()} onChange={e=>{setCategory(e.target.value);void load();}}><option value="">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label><p role="status">{status||(!query&&!category?'Search the full catalog, or browse the page tables below.':query.trim().length<2&&!category?'Enter at least two characters.':`${matches.length} matches${matches.length>30?'; showing the first 30':''}.`)}</p>{matches.length>0&&<ul className="app-search-results">{matches.slice(0,30).map(a=><li key={a.slug}><Link href={`/app-privacy/${a.slug}`}>{a.name}</Link><span> — {a.developer} · {a.category}</span></li>)}</ul>}</section>;
}
