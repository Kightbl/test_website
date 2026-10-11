-- Songlines v0.1 — run once in Supabase SQL editor.
-- Published song records are publicly readable. Only assigned professors may write.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('viewer', 'professor'))
);

create or replace function public.is_professor() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where user_id = (select auth.uid()) and role = 'professor'
  );
$$;

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  artist text not null,
  year integer not null check (year between 1000 and 2100),
  genre text not null,
  themes text[] not null default '{}',
  summary text not null default '',
  source_url text,
  youtube_url text,
  spotify_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists songs_published_idx on public.songs (published);
create index if not exists songs_genre_idx on public.songs (genre);
create index if not exists songs_year_idx on public.songs (year);

create table if not exists public.lyric_lines (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  position integer not null check (position > 0),
  text text not null,
  unique(song_id, position)
);
create index if not exists lyric_lines_song_id_idx on public.lyric_lines (song_id);

create table if not exists public.annotations (
  id uuid primary key default gen_random_uuid(),
  lyric_line_id uuid not null references public.lyric_lines(id) on delete cascade,
  body text not null,
  citation_url text,
  created_at timestamptz not null default now()
);
create index if not exists annotations_lyric_line_id_idx on public.annotations (lyric_line_id);

alter table public.profiles enable row level security;
alter table public.songs enable row level security;
alter table public.lyric_lines enable row level security;
alter table public.annotations enable row level security;

-- Authentication role assignment is done via SQL/service-role only.
create policy "Account holders can view their own role" on public.profiles
for select to authenticated using (user_id = (select auth.uid()));

create policy "Public can view published songs" on public.songs
for select to anon, authenticated
using (published = true or (select public.is_professor()));
create policy "Professors can insert songs" on public.songs
for insert to authenticated with check ((select public.is_professor()));
create policy "Professors can update songs" on public.songs
for update to authenticated using ((select public.is_professor()))
with check ((select public.is_professor()));
create policy "Professors can delete songs" on public.songs
for delete to authenticated using ((select public.is_professor()));

create policy "Public can view published lyric lines" on public.lyric_lines
for select to anon, authenticated using (
  exists (select 1 from public.songs s where s.id = song_id and (s.published or (select public.is_professor())))
);
create policy "Professors can insert lyric lines" on public.lyric_lines
for insert to authenticated with check ((select public.is_professor()));
create policy "Professors can update lyric lines" on public.lyric_lines
for update to authenticated using ((select public.is_professor())) with check ((select public.is_professor()));
create policy "Professors can delete lyric lines" on public.lyric_lines
for delete to authenticated using ((select public.is_professor()));

create policy "Public can view published annotations" on public.annotations
for select to anon, authenticated using (
  exists (
    select 1 from public.lyric_lines l
    join public.songs s on s.id = l.song_id
    where l.id = lyric_line_id and (s.published or (select public.is_professor()))
  )
);
create policy "Professors can insert annotations" on public.annotations
for insert to authenticated with check ((select public.is_professor()));
create policy "Professors can update annotations" on public.annotations
for update to authenticated using ((select public.is_professor())) with check ((select public.is_professor()));
create policy "Professors can delete annotations" on public.annotations
for delete to authenticated using ((select public.is_professor()));

-- One atomic transaction for song metadata, replacement lyric lines, and annotations.
-- SECURITY INVOKER means underlying RLS policies still apply.
create or replace function public.save_song_record(
  p_id uuid, p_slug text, p_title text, p_artist text,
  p_year integer, p_genre text, p_themes text[], p_summary text,
  p_source_url text, p_youtube_url text, p_spotify_url text,
  p_published boolean, p_lines jsonb
) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_id uuid;
  v_line_id uuid;
  v_line jsonb;
  v_pos integer := 0;
begin
  if not (select public.is_professor()) then
    raise exception 'Professor access required';
  end if;
  if p_id is null then
    insert into public.songs (slug,title,artist,year,genre,themes,summary,source_url,youtube_url,spotify_url,published)
    values (p_slug,p_title,p_artist,p_year,p_genre,coalesce(p_themes,'{}'),coalesce(p_summary,''),p_source_url,p_youtube_url,p_spotify_url,p_published)
    returning id into v_id;
  else
    update public.songs set title=p_title,artist=p_artist,year=p_year,genre=p_genre,
      themes=coalesce(p_themes,'{}'),summary=coalesce(p_summary,''),source_url=p_source_url,
      youtube_url=p_youtube_url,spotify_url=p_spotify_url,published=p_published,updated_at=now()
    where id=p_id and slug=p_slug returning id into v_id;
    if v_id is null then raise exception 'Song not found'; end if;
  end if;
  delete from public.lyric_lines where song_id = v_id;
  for v_line in select value from jsonb_array_elements(coalesce(p_lines,'[]'::jsonb)) loop
    v_pos := v_pos + 1;
    insert into public.lyric_lines(song_id,position,text)
    values(v_id,v_pos,coalesce(v_line->>'text','')) returning id into v_line_id;
    if length(trim(coalesce(v_line->>'note',''))) > 0 then
      insert into public.annotations(lyric_line_id,body)
      values(v_line_id,trim(v_line->>'note'));
    end if;
  end loop;
  return v_id;
end;
$$;

-- Users can call the RPC, but the function and RLS enforce professor-only writes.
revoke all on function public.save_song_record(uuid,text,text,text,integer,text,text[],text,text,text,text,boolean,jsonb) from public, anon;
grant execute on function public.save_song_record(uuid,text,text,text,integer,text,text[],text,text,text,text,boolean,jsonb) to authenticated;
