"use client";
import { useState } from "react";
import { ArrowUpRight, BookOpenText, MessageSquareText } from "lucide-react";
import type { LyricLine } from "@/lib/types";

export function AnnotationViewer({ lines }: { lines: LyricLine[] }) {
  const initial = lines.find(line => line.annotations.length > 0)?.id ?? null;
  const [selected, setSelected] = useState<string | null>(initial);
  const active = lines.find(line => line.id === selected);
  return <div className="grid lg:grid-cols-[1fr_325px] gap-7 items-start">
    <div className="panel p-5 md:p-8 min-h-[300px]"><div className="label-kicker mb-5">LYRICS / TEXT</div>
      {lines.length ? <div className="space-y-2">{lines.map(line => <div key={line.id}>
        {line.annotations.length > 0 ? <button type="button" onClick={()=>setSelected(line.id)} aria-pressed={selected===line.id} className={`line-button flex justify-between items-center gap-3 text-[1.05rem] leading-8 font-medium ${selected===line.id ? "active" : ""}`}><span>{line.text}</span><MessageSquareText size={17} className="shrink-0 text-[#718e52]"/></button> : <p className="text-[1.05rem] leading-8 py-[.43rem]">{line.text}</p>}
      </div>)}</div> : <p className="text-[#718078] leading-7">Lyrics or authorized excerpts will appear here once the professor adds them.</p>}
      {lines.some(line => line.annotations.length > 0) && <p className="text-xs text-[#7e8980] mt-6 pt-4 border-t border-[#e8e9e0]">Select a highlighted lyric to view the research annotation.</p>}
    </div>
    <aside className="panel p-6 lg:sticky lg:top-6"><div className="flex items-center gap-2 label-kicker mb-5"><BookOpenText size={16}/>RESEARCH NOTES</div>
      {active?.annotations.length ? <div className="space-y-5">{active.annotations.map(note=><div key={note.id}>
        <div className="text-xs font-bold text-[#749157] mb-2">LINE {active.position}</div>
        <blockquote className="border-l-4 border-[#d3ef55] pl-3 text-sm font-semibold leading-6 text-[#3d4d42] mb-4">“{active.text}”</blockquote>
        <p className="text-sm leading-7 text-[#43534a]">{note.body}</p>
        {note.citationUrl && <a className="mt-3 text-sm text-[#476c43] font-bold inline-flex gap-1 items-center underline" href={note.citationUrl} target="_blank" rel="noopener noreferrer">Read source <ArrowUpRight size={14}/></a>}
      </div>)}</div> : <p className="text-sm text-[#67736b] leading-6">Notes selected on the left appear here. A song can have multiple scholarly annotations.</p>}
    </aside>
  </div>;
}
