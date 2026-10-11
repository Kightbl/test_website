import Link from "next/link";
import { ArrowUpRight, AudioLines } from "lucide-react";
import type { Song } from "@/lib/types";
import { niceDecade } from "@/lib/utils";
const hues = ["#c5d7ad", "#d9b9a7", "#b9cfcc", "#c8c4e0", "#e1d4a3", "#b8c8dc"];
export function SongCard({ song, index = 0 }: { song: Song; index?: number }) {
  return <Link href={`/songs/${song.slug}`} className="panel card-hover overflow-hidden group flex flex-col">
    <div className="relative h-[158px] p-5 flex items-end overflow-hidden" style={{ background: hues[index % hues.length] }}>
      <div className="absolute -right-9 -top-12 w-48 h-48 rounded-full bg-white/25" />
      <div className="absolute right-7 top-4 w-32 h-32 rounded-full bg-[#1e2b28] flex items-center justify-center border-[12px] border-[#253430] shadow-2xl"><div className="w-12 h-12 rounded-full bg-[#d7e6bc] border-[5px] border-[#8b9a7e] grid place-items-center"><div className="w-2.5 h-2.5 bg-[#1a2923] rounded-full"/></div></div>
      <span className="z-10 bg-white/80 rounded-full p-2.5 text-[#264435]"><AudioLines size={20}/></span>
      <span className="absolute bottom-5 right-5 z-10 bg-white/70 px-2 py-1 rounded-lg text-xs font-bold">{niceDecade(song.year)}</span>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start gap-2"><h3 className="font-black text-[1.12rem] group-hover:text-[#547439]">{song.title}</h3><ArrowUpRight className="shrink-0 text-[#718472]" size={18}/></div>
      <p className="text-sm text-[#6d7973] mt-1">{song.artist} · {song.year}</p>
      <p className="text-[.82rem] text-[#51615d] leading-6 mt-3 line-clamp-2">{song.summary}</p>
      <div className="flex gap-1.5 flex-wrap mt-auto pt-4"><span className="tag">{song.genre}</span>{song.themes.slice(0,1).map(theme => <span key={theme} className="tag">{theme}</span>)}</div>
    </div>
  </Link>;
}
