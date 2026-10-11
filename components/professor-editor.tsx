import Link from "next/link";
import { ArrowLeft, CheckCircle2, Music2 } from "lucide-react";
import type { Song } from "@/lib/types";
import { saveSong } from "@/app/admin/songs/actions";
export function ProfessorEditor({ song, error }: { song?: Song; error?: string }) {
  const lyrics = song?.lines.map(line => `${line.text}${line.annotations.length ? ` || ${line.annotations[0].body}` : ""}`).join("\n") || "";
  return <div className="page-container py-12 max-w-4xl"><Link className="text-sm flex items-center gap-2 text-[#527454] font-bold" href="/admin"><ArrowLeft size={16}/> Back to dashboard</Link><div className="label-kicker mt-7">EDITOR WORKSPACE</div><h1 className="text-4xl font-black mt-2">{song ? "Edit song record" : "Add a new song"}</h1><p className="text-sm text-[#6a7b6b] leading-7 mt-3 mb-8">Update catalog details, authorized lyric excerpts, research annotations, and playback links.</p>
  {error && <div role="alert" className="bg-[#fff0d9] border border-[#e1c7a1] rounded-xl p-4 mb-5 text-sm">{error==="validation" ? "Please check all required fields, year, and links." : "Couldn't save the song. Check for duplicate titles/artists, confirm the SQL migration, and try again."}</div>}
  <form action={saveSong} className="space-y-7"><input type="hidden" name="id" value={song?.id ?? ""}/><input type="hidden" name="slug" value={song?.slug ?? ""}/>
    <section className="panel p-6 md:p-8"><h2 className="font-black text-xl flex items-center gap-2"><Music2 size={20}/> Song information</h2><div className="grid sm:grid-cols-2 gap-5 mt-6">
      <label className="text-sm font-bold">Song title *<input name="title" className="field mt-2" defaultValue={song?.title} required maxLength={200}/></label>
      <label className="text-sm font-bold">Artist / performer *<input name="artist" className="field mt-2" defaultValue={song?.artist} required maxLength={200}/></label>
      <label className="text-sm font-bold">Year *<input name="year" type="number" min="1000" max="2100" className="field mt-2" defaultValue={song?.year ?? 2020} required/></label>
      <label className="text-sm font-bold">Genre *<input name="genre" className="field mt-2" defaultValue={song?.genre} required maxLength={100}/></label>
      <label className="text-sm font-bold sm:col-span-2">Themes / topics (comma separated)<input name="themes" className="field mt-2" defaultValue={song?.themes.join(", ")} placeholder="Migration, Identity, Memory" /></label>
      <label className="text-sm font-bold sm:col-span-2">Research summary<textarea name="summary" className="field mt-2 min-h-30" defaultValue={song?.summary} maxLength={5000} /></label>
    </div></section>
    <section className="panel p-6 md:p-8"><h2 className="font-black text-xl">Lyrics and annotations</h2><p className="text-sm text-[#657367] mt-2 leading-7">Enter one lyric or excerpt per line. Put <code className="bg-[#eaf0df] px-1.5 py-1 rounded">||</code> between the lyric and its annotation. Example: <code className="bg-[#eaf0df] px-1.5 py-1 rounded">A road of stars || Symbolism of travel</code>. Editing lines replaces the existing set when saved. Only publish rights-cleared text.</p><label className="sr-only" htmlFor="lyrics">Lyric and annotation lines</label><textarea id="lyrics" name="lyrics" className="field mt-5 font-mono text-sm min-h-64" defaultValue={lyrics} placeholder={"The river remembers || Represents community memory\nAnother lyric line || Research explanation"}/></section>
    <section className="panel p-6 md:p-8"><h2 className="font-black text-xl">Media and provenance</h2><p className="text-sm text-[#657367] mt-2">Paste authorized links. Only approved YouTube and Spotify hostnames are embedded.</p><div className="space-y-5 mt-5">
      <label className="text-sm font-bold block">YouTube video URL<input name="youtube_url" type="url" className="field mt-2" defaultValue={song?.youtubeUrl??""} placeholder="https://www.youtube.com/watch?v=..."/></label>
      <label className="text-sm font-bold block">Spotify track / album URL<input name="spotify_url" type="url" className="field mt-2" defaultValue={song?.spotifyUrl??""} placeholder="https://open.spotify.com/track/..."/></label>
      <label className="text-sm font-bold block">Research / source URL<input name="source_url" type="url" className="field mt-2" defaultValue={song?.sourceUrl??""} placeholder="https://university.edu/archive/..."/></label>
    </div></section>
    <div className="panel p-6 flex flex-wrap items-center justify-between gap-5"><div><label className="flex items-center gap-3 font-bold"><input type="checkbox" name="published" defaultChecked={song?.published ?? false} className="w-5 h-5 accent-[#627d45]"/> Publish this song publicly</label><p className="text-xs text-[#728174] mt-2">Leave unchecked to save as a professor-only draft.</p></div><button type="submit" className="btn-primary"><CheckCircle2 size={18}/> Save song</button></div>
  </form></div>;
}
