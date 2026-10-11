export function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}
export function niceDecade(year: number) {
  return `${Math.floor(year / 10) * 10}s`;
}
export function normalizeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return (url.protocol === "https:" || url.protocol === "http:") ? url.toString() : null; }
  catch { return null; }
}
export function youtubeEmbedUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : (url.pathname.match(/^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/)?.[1] ?? null);
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}
export function spotifyEmbedUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "open.spotify.com") return null;
    const match = url.pathname.match(/^\/(?:embed\/)?(track|album|playlist|episode)\/([A-Za-z0-9]+)\/?$/);
    return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
  } catch { return null; }
}
