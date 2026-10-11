import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SongCard } from "@/components/song-card";
import { getSongs } from "@/lib/data";
import { slugify } from "@/lib/utils";
export default async function TopicPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const all=(await getSongs()).filter(s=>s.published); const topic=all.flatMap(s=>s.themes).find(t=>slugify(t)===slug); if(!topic) notFound();const songs=all.filter(s=>s.themes.includes(topic));return <div className="page-container py-14"><Link href="/topics" className="flex gap-2 items-center text-sm text-[#567858] font-bold"><ArrowLeft size={16}/> All topics</Link><div className="label-kicker mt-7">RESEARCH TOPIC</div><h1 className="text-4xl md:text-5xl font-black mt-2">{topic}</h1><p className="text-[#667669] mt-3 mb-9">{songs.length} songs in this theme</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{songs.map((s,i)=><SongCard key={s.id} song={s} index={i}/>)}</div></div>;}
