import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SongCard } from "@/components/song-card";
import { getSongs } from "@/lib/data";
import { slugify } from "@/lib/utils";
export default async function ArtistPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const all=(await getSongs()).filter(s=>s.published); const artist=all.map(s=>s.artist).find(name=>slugify(name)===slug); if(!artist) notFound();const songs=all.filter(s=>s.artist===artist);return <div className="page-container py-14"><Link href="/songs" className="flex gap-2 items-center text-sm text-[#567858] font-bold"><ArrowLeft size={16}/> All songs</Link><div className="label-kicker mt-7">ARTIST CATALOG</div><h1 className="text-4xl md:text-5xl font-black mt-2">{artist}</h1><p className="text-[#667669] mt-3 mb-9">{songs.length} song records in this collection.</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{songs.map((s,i)=><SongCard key={s.id} song={s} index={i}/>)}</div></div>;}
