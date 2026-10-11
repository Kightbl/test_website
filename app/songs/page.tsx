import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/catalog-explorer";
import { getSongs } from "@/lib/data";
export const metadata: Metadata = { title: "Explore Songs" };
export default async function SongsPage({ searchParams }: { searchParams: Promise<{q?:string}> }) {
  const songs = (await getSongs()).filter(song=>song.published);
  const {q} = await searchParams;
  return <div className="page-container py-14"><div className="label-kicker">RESEARCH COLLECTION</div><h1 className="font-black tracking-tight text-4xl md:text-5xl mt-2">Explore the songs</h1><p className="text-[#68766c] mt-3 mb-9 max-w-2xl leading-7">Find songs by title, artist, lyric excerpt, decade, genre, or research theme. Select a record to explore its annotations.</p><CatalogExplorer songs={songs} initialQuery={typeof q==="string" ? q : ""}/></div>;
}
