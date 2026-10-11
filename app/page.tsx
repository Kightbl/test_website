import Link from "next/link";
import { ArrowRight, ArrowUpRight, AudioLines, BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { SongCard } from "@/components/song-card";
import { getSongs } from "@/lib/data";
export default async function Home() {
  const songs = (await getSongs()).filter(s=>s.published);
  const topics = [...new Set(songs.flatMap(song => song.themes))];
  return <>
    <section className="bg-[#111c1b] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-160px] top-[-130px] w-[590px] h-[590px] rounded-full border-[90px] border-[#273b2e] opacity-70"/><div className="pointer-events-none absolute right-[5%] top-[30%] w-60 h-60 rounded-full bg-[#cde861] blur-[160px] opacity-20"/>
      <div className="page-container relative z-10 grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center py-19 md:py-26">
        <div><div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 px-3.5 py-2 text-xs text-[#e4f9ad] font-bold tracking-wide"><span className="w-2 h-2 bg-[#d3ef55] rounded-full"/>AN OPEN ARCHIVE FOR MUSIC SCHOLARSHIP</div>
          <h1 className="text-[clamp(3rem,6vw,5.1rem)] leading-[1.04] font-black tracking-[-.05em] mt-7">Every song<br/>has a <em className="text-[#d3ef55] not-italic">story.</em></h1>
          <p className="max-w-xl text-lg text-[#bac9c0] leading-8 mt-6">Discover musical histories, explore scholarly annotations, and follow the connections between lyrics, people, places, and time.</p>
          <form action="/songs" method="get" className="bg-white rounded-xl p-2 flex mt-9 max-w-xl shadow-[0_20px_70px_#0004]"><Search className="text-[#718177] ml-3 mt-3" size={22}/><input name="q" aria-label="Search songs, artists, or topics" className="min-w-0 flex-1 px-3 text-[#1c2b25] placeholder:text-[#87938a] outline-none" placeholder="Search the archive..."/><button className="btn-primary !rounded-lg" type="submit">Search <ArrowRight size={17}/></button></form>
          <div className="flex flex-wrap gap-4 mt-5 text-xs text-[#b5c4ba]"><span>Search by artist</span><span>•</span><span>Explore lyrics</span><span>•</span><span>Browse research themes</span></div>
        </div>
        <div className="hidden md:block relative h-[410px]">
          <div className="absolute top-8 left-7 w-[310px] h-[310px] rounded-[28px] bg-[#d3ef55] rotate-[-11deg] shadow-2xl"/>
          <div className="absolute top-8 left-8 w-[310px] h-[310px] rounded-[28px] bg-[#aac3af] rotate-[8deg] flex items-center justify-center shadow-2xl overflow-hidden"><div className="w-[250px] h-[250px] rounded-full bg-[#172a27] border-[18px] border-[#273a35] shadow-[0_0_0_4px_#55705e,0_24px_48px_#1117] flex items-center justify-center"><div className="w-24 h-24 rounded-full bg-[#d7ea78] grid place-items-center"><div className="w-4 h-4 rounded-full bg-[#263f31]"/></div></div></div>
          <div className="absolute bottom-6 -left-12 bg-white text-[#203027] rounded-2xl p-5 shadow-2xl w-64"><div className="text-xs text-[#7b8d80] font-bold uppercase tracking-widest">Research preview</div><div className="font-black text-xl mt-2">Words, in context.</div><div className="flex items-center gap-2 text-xs mt-3 text-[#517a55]"><BookOpen size={15}/> Line-by-line annotations</div></div>
        </div>
      </div>
    </section>
    <section className="page-container pt-16 pb-5"><div className="flex justify-between gap-6 items-end"><div><div className="label-kicker">CURATED DISCOVERIES</div><h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">Featured from the archive</h2><p className="text-[#68776c] mt-2">Start with these research-ready song entries.</p></div><Link href="/songs" className="hidden sm:flex items-center gap-2 font-bold text-sm hover:text-[#5c7e43]">View entire catalog <ArrowUpRight size={17}/></Link></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">{songs.slice(0,4).map((song,i)=><SongCard key={song.id} song={song} index={i}/>)}</div>
    </section>
    <section className="page-container pt-16 pb-8"><div className="bg-[#e8efdf] rounded-3xl p-7 md:p-10 grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-center"><div><div className="label-kicker">THINK BEYOND THE PLAYLIST</div><h2 className="text-3xl font-black tracking-tight mt-3">Follow a research question.</h2><p className="mt-3 text-sm leading-7 text-[#546653]">Explore the ideas connecting songs across artists, decades, and musical traditions.</p><Link href="/topics" className="btn-dark mt-6">Browse research topics <ArrowRight size={17}/></Link></div><div className="grid sm:grid-cols-2 gap-3">{topics.slice(0,6).map((t,i)=><Link href={`/topics/${encodeURIComponent(t.toLowerCase().replace(/[^a-z0-9]+/g,"-"))}`} key={t} className="bg-white/80 border border-[#dce5d3] rounded-2xl p-5 flex justify-between items-center font-bold hover:bg-white transition"><span className="flex gap-3 items-center"><span className="text-[#698657]">0{i+1}</span>{t}</span><ArrowUpRight size={17}/></Link>)}</div></div></section>
    <section id="about" className="page-container pt-14 pb-8"><div className="text-center max-w-2xl mx-auto"><div className="label-kicker">MORE THAN A LYRICS SITE</div><h2 className="text-3xl md:text-4xl font-black mt-2">Built for deeper listening.</h2><p className="mt-4 text-[#617166] leading-7">A research-focused destination with an emphasis on context, sources, and responsible sharing.</p></div><div className="grid md:grid-cols-3 gap-5 mt-9">{[{icon:<AudioLines/>,title:"Listen & discover",desc:"Connect song records to authorized audio and video players."},{icon:<BookOpen/>,title:"Read the annotations",desc:"Select lyrics to uncover historical, linguistic, and cultural interpretation."},{icon:<SlidersHorizontal/>,title:"Explore connections",desc:"Filter by decade, genre, and topic to trace ideas across the collection."}].map(f=><div key={f.title} className="panel p-7"><div className="w-12 h-12 bg-[#e8efdb] rounded-xl grid place-items-center text-[#527047]">{f.icon}</div><h3 className="text-lg font-extrabold mt-5">{f.title}</h3><p className="text-sm text-[#68766c] leading-7 mt-2">{f.desc}</p></div>)}</div></section>
  </>;
}
