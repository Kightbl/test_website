"use client";
import { useMemo, useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { SongCard } from "@/components/song-card";
import type { Song } from "@/lib/types";
import { niceDecade } from "@/lib/utils";

export function CatalogExplorer({ songs, initialQuery = "" }: { songs: Song[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [genre, setGenre] = useState("All genres");
  const [decade, setDecade] = useState("All decades");
  const [theme, setTheme] = useState("All topics");
  const genres = [...new Set(songs.map(s => s.genre))].sort();
  const decades = [...new Set(songs.map(s => niceDecade(s.year)))].sort();
  const themes = [...new Set(songs.flatMap(s => s.themes))].sort();
  const results = useMemo(() => songs.filter(song => {
    const haystack = [song.title, song.artist, song.genre, song.summary, ...song.themes, ...song.lines.flatMap(line => [line.text, ...line.annotations.map(a => a.body)])].join(" ").toLowerCase();
    return haystack.includes(query.trim().toLowerCase()) && (genre === "All genres" || song.genre === genre) && (decade === "All decades" || niceDecade(song.year) === decade) && (theme === "All topics" || song.themes.includes(theme));
  }), [songs, query, genre, decade, theme]);
  const active = Boolean(query || genre !== "All genres" || decade !== "All decades" || theme !== "All topics");
  function clear() { setQuery(""); setGenre("All genres"); setDecade("All decades"); setTheme("All topics"); }
  return <>
    <div className="panel p-4 md:p-6 mb-8">
      <label htmlFor="catalog-search" className="sr-only">Search song archive</label>
      <div className="relative"><Search size={20} className="absolute top-1/2 -translate-y-1/2 left-4 text-[#819084]"/><input id="catalog-search" className="field !pl-12 !py-4" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search songs, artists, lyrics, or research themes..." /></div>
      <div className="flex gap-3 mt-4 flex-col sm:flex-row">
        <label className="flex-1"><span className="sr-only">Genre</span><select className="field" value={genre} onChange={e=>setGenre(e.target.value)}>{["All genres", ...genres].map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="flex-1"><span className="sr-only">Decade</span><select className="field" value={decade} onChange={e=>setDecade(e.target.value)}>{["All decades", ...decades].map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="flex-1"><span className="sr-only">Research topic</span><select className="field" value={theme} onChange={e=>setTheme(e.target.value)}>{["All topics", ...themes].map(x=><option key={x}>{x}</option>)}</select></label>
      </div>
      <div className="flex justify-between items-center gap-3 mt-4 text-sm text-[#67736b]"><span className="flex gap-2 items-center"><Filter size={15}/>{results.length} of {songs.length} songs</span>{active && <button type="button" onClick={clear} className="flex items-center gap-1.5 font-bold text-[#425c37] cursor-pointer"><X size={14}/>Clear filters</button>}</div>
    </div>
    {results.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{results.map((song,i)=><SongCard key={song.id} song={song} index={i}/>)}</div> : <div className="panel p-12 text-center"><Search className="mx-auto mb-3 text-[#b0baad]" size={35}/><h2 className="text-xl font-extrabold">No songs match these filters</h2><p className="text-[#67736b] mt-2">Try a different keyword, decade, or research topic.</p><button type="button" className="btn-dark mt-5" onClick={clear}>Reset search</button></div>}
  </>;
}
