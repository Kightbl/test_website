import "server-only";
import { sampleSongs } from "@/lib/demo-data";
import { createClient, hasSupabase } from "@/lib/supabase/server";
import type { Song } from "@/lib/types";

// Public catalog is read-only. Supabase RLS decides which records are visible.
export async function getSongs(): Promise<Song[]> {
  if (!hasSupabase()) return sampleSongs;
  const supabase = await createClient();
  const { data, error } = await supabase.from("songs")
    .select("id,slug,title,artist,year,genre,themes,summary,source_url,youtube_url,spotify_url,published,lyric_lines(id,position,text,annotations(id,body,citation_url))")
    .order("title", { ascending: true });
  if (error) throw new Error(`Unable to fetch songs: ${error.message}`);
  return (data ?? []).map((row) => ({
    id: row.id, slug: row.slug, title: row.title, artist: row.artist,
    year: row.year, genre: row.genre, themes: row.themes ?? [], summary: row.summary ?? "",
    sourceUrl: row.source_url, youtubeUrl: row.youtube_url, spotifyUrl: row.spotify_url,
    published: row.published,
    lines: (row.lyric_lines ?? []).map(line => ({
      id: line.id, position: line.position, text: line.text,
      annotations: (line.annotations ?? []).map(note => ({ id: note.id, body: note.body, citationUrl: note.citation_url }))
    })).sort((a, b) => a.position - b.position)
  }));
}
export async function getSong(slug: string) {
  return (await getSongs()).find(song => song.slug === slug) ?? null;
}
