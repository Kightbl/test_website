import type { Song } from "@/lib/types";

// All titles, artists and lyric excerpts here are ORIGINAL fictional examples.
// They are not recordings attributed to real artists.
const demo = [
  { slug: "river-of-memory", title: "River of Memory", artist: "The Lantern Collective", year: 1968, genre: "Folk", themes: ["Collective Memory", "Migration"], summary: "A fictional field-song study of place, generational memory, and movement through changing landscapes.", lines: [
    ["The river keeps the names we gave", "The river serves as a metaphor for a community's shared historical record."],
    ["To every stone and passing wave", "The natural imagery invites analysis of location, displacement, and continuity."],
    ["We carry maps inside our hands", "The line connects bodily experience to inherited knowledge of place."],
    ["And leave our stories in the sand", "An example of ephemeral archives and the difficulty of preserving oral history."]
  ] },
  { slug: "after-the-last-train", title: "After the Last Train", artist: "Mara Vale", year: 1974, genre: "Soul", themes: ["Urban Life", "Labor"], summary: "An imagined late-night narrative about work, the city, and routes home.", lines: [
    ["Under the lamps the platform glows", "Public transit frames the everyday rhythms of urban workers."],
    ["The clock knows things the city knows", "Personification portrays time as a system of social organization."],
    ["My tired shoes remember rain", "Concrete details make labor and fatigue legible."],
    ["Tomorrow I will ride again", "Repetition creates a theme of cyclic work."]
  ] },
  { slug: "satellite-letters", title: "Satellite Letters", artist: "Iris Atlas", year: 1987, genre: "Electronic", themes: ["Technology", "Communication"], summary: "A speculative pop composition exploring long-distance communication and isolation.", lines: [
    ["I send my voice through midnight air", "An image of electronically mediated intimacy."],
    ["A thousand miles and you are there", "Distance is collapsed by telecommunications."],
    ["The signal fades beyond the moon", "A chance to discuss technological metaphors and their limits."],
    ["I hope your answer reaches soon", "The song contrasts rapid transmission with emotional uncertainty."]
  ] },
  { slug: "garden-of-tomorrow", title: "Garden of Tomorrow", artist: "June & the Comets", year: 2003, genre: "Indie", themes: ["Environment", "Hope"], summary: "An original example about environmental restoration, communal care, and the future.", lines: [
    ["We planted seeds beneath the street", "Greening an urban landscape is used as an image of collective agency."],
    ["Where stone and summer used to meet", "This line sets constructed and natural environments in dialogue."],
    ["The smallest roots can split the ground", "Growth is a metaphor for incremental social change."],
    ["And turn the silent world to sound", "Sound links ecological life and musical expression."]
  ] },
  { slug: "paper-constellations", title: "Paper Constellations", artist: "Ada North", year: 2016, genre: "Jazz", themes: ["Identity", "Memory"], summary: "A fictitious jazz composition about piecing together family history from incomplete documents.", lines: [
    ["Old photographs beneath the light", "Photography is presented as a fragmentary documentary source."],
    ["Arrange themselves into the night", "The visual image suggests reconstruction and interpretation."],
    ["A hundred names upon a page", "The page invokes genealogical records and archival classification."],
    ["We read the spaces between age", "A prompt for discussing absences in historical archives."]
  ] },
  { slug: "market-street-morning", title: "Market Street Morning", artist: "The Common Hours", year: 1959, genre: "Blues", themes: ["Urban Life", "Community"], summary: "An imagined street-scene song designed for research into neighborhood sounds and social exchange.", lines: [
    ["The market wakes before the sun", "The song introduces ordinary work as a historical source."],
    ["A hundred mornings become one", "Repetition compresses routine into collective experience."],
    ["The voices cross from stall to stall", "A sonic account of public space and community."],
    ["Each name belongs to all of us", "A communal refrain invites interpretation around belonging."]
  ] },
  { slug: "beyond-the-border", title: "Beyond the Border", artist: "Elena Port", year: 1993, genre: "Folk", themes: ["Migration", "Identity"], summary: "A fictional narrative about crossing borders and reconstructing a sense of home.", lines: [
    ["My suitcase holds a painted sky", "Portable belongings represent cultural memory."],
    ["The hills grow smaller as I fly", "Movement through space changes the narrator's perspective."],
    ["A language echoes in my dreams", "Language is positioned as a connection to heritage."],
    ["Home is more than what it seems", "The chorus complicates a singular idea of home."]
  ] },
  { slug: "tide-and-wire", title: "Tide & Wire", artist: "Noor & the Signals", year: 2021, genre: "Electronic", themes: ["Environment", "Technology"], summary: "An original mock research record contrasting ecological cycles with digital infrastructure.", lines: [
    ["The ocean hums beneath the screen", "Natural and digital soundscapes are brought together."],
    ["Between the blue and pixel green", "Color imagery signals the tension between ecosystems and technology."],
    ["A distant weather station sings", "Scientific infrastructure becomes musical material."],
    ["We tune our ears to changing things", "The final line links listening to environmental awareness."]
  ] }
];

export const sampleSongs: Song[] = demo.map((song, songIndex) => ({
  id: `demo-${songIndex}`,
  slug: song.slug,
  title: song.title,
  artist: song.artist,
  year: song.year,
  genre: song.genre,
  themes: song.themes,
  summary: song.summary,
  published: true,
  sourceUrl: null,
  youtubeUrl: null,
  spotifyUrl: null,
  lines: song.lines.map(([text, note], lineIndex) => ({
    id: `${song.slug}-line-${lineIndex}`,
    position: lineIndex + 1,
    text,
    annotations: [{ id: `${song.slug}-note-${lineIndex}`, body: note, citationUrl: null }]
  }))
}));
