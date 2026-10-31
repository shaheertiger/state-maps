"use client";
import * as Accordion from "@radix-ui/react-accordion";
export default function FAQ({items}:{items:{q:string,a:string}[]}){return <Accordion.Root type="single" collapsible>{items.map((item,i)=><Accordion.Item className="faq" value={String(i)} key={item.q}><Accordion.Header><Accordion.Trigger>{item.q} <span aria-hidden="true">＋</span></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{item.a}</p></Accordion.Content></Accordion.Item>)}</Accordion.Root>}
