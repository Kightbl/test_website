-- Optional research demo records. All lyrics below are original illustrative writing.
insert into public.songs (slug,title,artist,year,genre,themes,summary,published)
values
 ('river-of-memory','River of Memory','The Lantern Collective',1968,'Folk',array['Collective Memory','Migration'],'A fictional study of place, oral history, and movement through changing landscapes.',true),
 ('after-the-last-train','After the Last Train','Mara Vale',1974,'Soul',array['Urban Life','Labor'],'An imagined late-night narrative about work, the city, and routes home.',true),
 ('satellite-letters','Satellite Letters','Iris Atlas',1987,'Electronic',array['Technology','Communication'],'A speculative pop composition exploring long-distance communication.',true),
 ('garden-of-tomorrow','Garden of Tomorrow','June & the Comets',2003,'Indie',array['Environment','Hope'],'A fictional song about ecological restoration and communal care.',true)
on conflict (slug) do nothing;

-- Idempotent line inserts with one annotation attached to each line.
with lyric_input(slug,pos,line,note) as (values
 ('river-of-memory',1,'The river keeps the names we gave','The river serves as a metaphor for a shared historical record.'),
 ('river-of-memory',2,'To every stone and passing wave','Natural imagery connects memory to place.'),
 ('river-of-memory',3,'We carry maps inside our hands','The line links experience to inherited geographic knowledge.'),
 ('river-of-memory',4,'And leave our stories in the sand','The instability of material archives is foregrounded.'),
 ('after-the-last-train',1,'Under the lamps the platform glows','Transit infrastructure frames workers’ urban rhythms.'),
 ('after-the-last-train',2,'The clock knows things the city knows','Time becomes a social institution through personification.'),
 ('after-the-last-train',3,'My tired shoes remember rain','Embodied detail represents labor and fatigue.'),
 ('after-the-last-train',4,'Tomorrow I will ride again','Repetition emphasizes routine.'),
 ('satellite-letters',1,'I send my voice through midnight air','An image of technologically mediated intimacy.'),
 ('satellite-letters',2,'A thousand miles and you are there','Telecommunications collapse distance.'),
 ('satellite-letters',3,'The signal fades beyond the moon','Technical metaphors express the limits of connection.'),
 ('satellite-letters',4,'I hope your answer reaches soon','Emotional delay contrasts with electronic transmission.'),
 ('garden-of-tomorrow',1,'We planted seeds beneath the street','Urban gardening stands for collective agency.'),
 ('garden-of-tomorrow',2,'Where stone and summer used to meet','Natural and built landscapes are juxtaposed.'),
 ('garden-of-tomorrow',3,'The smallest roots can split the ground','Growth symbolizes incremental transformation.'),
 ('garden-of-tomorrow',4,'And turn the silent world to sound','Ecological restoration is framed sonically.')
), inserted as (
 insert into public.lyric_lines (song_id,position,text)
 select s.id,l.pos,l.line from lyric_input l join public.songs s on s.slug=l.slug
 on conflict (song_id,position) do nothing returning id,song_id,position
)
insert into public.annotations(lyric_line_id,body)
select i.id,l.note from inserted i join public.songs s on s.id=i.song_id join lyric_input l on l.slug=s.slug and l.pos=i.position;
