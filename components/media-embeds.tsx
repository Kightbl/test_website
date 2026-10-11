import { ExternalLink, Headphones, Youtube } from "lucide-react";
import { spotifyEmbedUrl, youtubeEmbedUrl } from "@/lib/utils";
export function MediaEmbeds({ youtubeUrl, spotifyUrl }: { youtubeUrl: string | null; spotifyUrl: string | null }) {
  const youtube = youtubeEmbedUrl(youtubeUrl);
  const spotify = spotifyEmbedUrl(spotifyUrl);
  if (!youtube && !spotify) return <div className="panel p-6 text-[#5b6a61] text-sm leading-6"><Headphones size={22} className="mb-3 text-[#86a167]"/><strong>Listening links are coming.</strong><p className="mt-1">Authorized YouTube or Spotify links can be added in the professor dashboard. No media is hosted on this site.</p></div>;
  return <div className="space-y-5">
    {youtube && <div className="panel overflow-hidden"><div className="flex items-center gap-2 px-5 py-4 text-sm font-bold"><Youtube size={18} className="text-[#9f493f]"/> Video recording</div><iframe src={youtube} title="YouTube video player" className="w-full aspect-video" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
    {spotify && <div className="panel overflow-hidden"><div className="flex items-center gap-2 px-5 py-4 text-sm font-bold"><Headphones size={18} className="text-[#427c52]"/> Spotify player</div><iframe src={spotify} title="Spotify audio player" className="w-full h-40" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /></div>}
    <p className="flex items-center gap-1.5 text-xs text-[#7a857b]"><ExternalLink size={13}/>Playback depends on the content provider and geographic availability.</p>
  </div>;
}
