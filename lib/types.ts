export type Annotation = {
  id: string;
  body: string;
  citationUrl: string | null;
};
export type LyricLine = {
  id: string;
  position: number;
  text: string;
  annotations: Annotation[];
};
export type Song = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  themes: string[];
  summary: string;
  sourceUrl: string | null;
  youtubeUrl: string | null;
  spotifyUrl: string | null;
  published: boolean;
  lines: LyricLine[];
};
