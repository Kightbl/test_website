import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FileText, FolderOpen, Headphones, UserRound } from "lucide-react";
import { AnnotationViewer } from "@/components/annotation-viewer";
import { MediaEmbeds } from "@/components/media-embeds";
import { getSong } from "@/lib/data";
import { slugify } from "@/lib/utils";
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const song = await getSong(slug);
  return { title: song ? `${song.title} — ${song.artist}` : "Song not found", description: song?.summary };
}
export default async function SongPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const song = await getSong(slug);
  if (!song || !song.published) notFound();
  return <div className="page-container py-10">
    <Link href="/songs" className="text-sm font-bold flex items-center gap-2 text-[#587456] hover:text-[#24372c]"><ArrowLeft size={16}/> All songs</Link>
    <div className="mt-7 mb-9 relative rounded-[28px] bg-[#152421] overflow-hidden p-8 md:p-12 text-white"><div className="absolute w-64 h-64 border-[28px] border-[#2f4739] rounded-full -right-8 -top-10 opacity-80"/><div className="relative"><div className="text-xs font-bold tracking-[.16em] text-[#d3ef55] uppercase">ANNOTATED SONG RECORD</div><h1 className="font-black tracking-tight text-4xl md:text-6xl mt-3 max-w-3xl">{song.title}</h1><Link href={`/artists/${slugify(song.artist)}`} className="inline-flex items-center gap-2 text-lg text-white/75 hover:text-white mt-4"><UserRound size={18}/>{song.artist}</Link><div className="flex flex-wrap gap-2 mt-7"><span className="bg-white/10 px-3 py-2 rounded-full flex gap-2 items-center text-xs"><CalendarDays size={14}/>{song.year}</span><span className="bg-white/10 px-3 py-2 rounded-full flex gap-2 items-center text-xs"><Headphones size={14}/>{song.genre}</span>{song.themes.map(theme=><Link href={`/topics/${slugify(theme)}`} key={theme} className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-xs">{theme}</Link>)}</div></div></div>
    <div className="grid lg:grid-cols-[1fr_340px] gap-7 mb-11"><section className="panel p-7"><h2 className="text-2xl font-black">About this song</h2><p className="mt-3 leading-8 text-[#5a6b5f]">{song.summary}</p>{song.sourceUrl && <a target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#4b7347] underline mt-4 inline-flex" href={song.sourceUrl}>View catalog source ↗</a>}</section><section><MediaEmbeds youtubeUrl={song.youtubeUrl} spotifyUrl={song.spotifyUrl}/></section></div>
    <div className="flex items-start sm:items-center justify-between gap-4 mb-5 flex-col sm:flex-row"><div><div className="label-kicker">LYRICS & SCHOLARLY CONTEXT</div><h2 className="text-2xl md:text-3xl font-black mt-1">The words, explained.</h2></div><div className="flex items-center gap-2 text-sm text-[#667968]"><FileText size={16}/>{song.lines.length} lines <span className="mx-1">·</span><FolderOpen size={16}/>{song.lines.reduce((n,l)=>n+l.annotations.length,0)} notes</div></div>
    <AnnotationViewer lines={song.lines}/>
    <p className="mt-5 text-sm text-[#7c867d]">Scholarly annotations are interpretive. The database should include citations and rights-cleared lyric excerpts before public launch.</p>
  </div>;
}
