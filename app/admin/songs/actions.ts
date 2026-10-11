"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireProfessor } from "@/lib/admin";
import { slugify, normalizeHttpUrl } from "@/lib/utils";

function read(formData: FormData, key: string, max = 1000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}
const isUuid = (s: string) => /^[\da-f]{8}-[\da-f]{4}-[1-8][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(s);
export async function saveSong(formData: FormData) {
  const { supabase } = await requireProfessor();
  const id = read(formData, "id", 40);
  const title = read(formData, "title", 200);
  const artist = read(formData, "artist", 200);
  const year = Number(read(formData, "year", 5));
  const genre = read(formData, "genre", 100);
  const summary = read(formData, "summary", 5000);
  const themes = read(formData, "themes", 500).split(",").map(x=>x.trim()).filter(Boolean).slice(0,20);
  const youtubeUrl = read(formData, "youtube_url", 500);
  const spotifyUrl = read(formData, "spotify_url", 500);
  const sourceUrl = read(formData, "source_url", 500);
  const published = formData.get("published") === "on";
  const lyrics = read(formData, "lyrics", 40000).split(/\r?\n/).filter(x=>x.trim()).slice(0,300).map(line => {
    const idx=line.indexOf("||");
    return { text: (idx === -1 ? line : line.slice(0,idx)).trim().slice(0,1000), note: (idx === -1 ? "" : line.slice(idx+2)).trim().slice(0,3000) };
  }).filter(l=>l.text);
  const oldSlug = read(formData, "slug", 100);
  const back = id ? `/admin/songs/${encodeURIComponent(oldSlug)}` : "/admin/songs/new";
  if ((!id || isUuid(id)) && title && artist && genre && Number.isInteger(year) && year>=1000 && year<=2100 && (!youtubeUrl || normalizeHttpUrl(youtubeUrl)) && (!spotifyUrl || normalizeHttpUrl(spotifyUrl)) && (!sourceUrl || normalizeHttpUrl(sourceUrl))) {
    const slug = id ? oldSlug : slugify(`${title}-${artist}`);
    if (!slug) redirect(`${back}?error=validation`);
    const { error } = await supabase.rpc("save_song_record", {
      p_id: id || null,
      p_slug: slug,
      p_title: title,
      p_artist: artist,
      p_year: year,
      p_genre: genre,
      p_themes: themes,
      p_summary: summary,
      p_source_url: sourceUrl || null,
      p_youtube_url: youtubeUrl || null,
      p_spotify_url: spotifyUrl || null,
      p_published: published,
      p_lines: lyrics
    });
    if (error) { console.error("Song save error:", error.message); redirect(`${back}?error=save`); }
    revalidatePath("/", "layout");
    redirect("/admin?success=saved");
  }
  redirect(`${back}?error=validation`);
}
