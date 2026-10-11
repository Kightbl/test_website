# Songlines — professor's music research archive (v0.1)

A **working Next.js 16 + TypeScript + Tailwind CSS 4 + Supabase** starter for a public, Genius-inspired *research* website. All demo songs and sample lyrics are fictional/original. You can browse without configuring Supabase; use Supabase for persistent song editing and authenticated professor accounts.

## 1. Start in demo mode (no database required)

Requirements: Node.js 20.9+ (Node 22 recommended) and npm.

```bash
npm install
npm run dev
```

Visit **http://localhost:3000**. All eight original sample songs, catalog searches, filters, artist pages, research topics, and click-to-annotate lyrics work immediately. No external credentials are required.

> Demo mode is read-only. The professor dashboard becomes functional once Supabase is connected.

## 2. Connect your Supabase project

1. Create a new project at https://supabase.com/dashboard.
2. Open **SQL Editor** and run `supabase/migrations/001_initial.sql` (once, on a new project).
3. Optionally run `supabase/seed.sql` to insert four original example records into your database.
4. Copy `.env.example` to `.env.local` and fill in the Project URL and the **publishable key** from Supabase settings:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_yourkeyhere
   ```

5. Restart `npm run dev`. The site now queries Supabase rather than the TypeScript demo fixtures. If you skip the seed, the catalog will initially be empty.

Never commit `.env.local` and **never put a Supabase secret/service-role key in a `NEXT_PUBLIC_` variable**.

## 3. Give the professor editing access

1. In the Supabase dashboard, open **Authentication → Users** and create the professor's email/password user (or invite them and let them set a password; use a password-based sign-in for this starter).
2. Once that account exists, run the following in SQL Editor with the actual professor email:

   ```sql
   insert into public.profiles (user_id, role)
   select id, 'professor' from auth.users
   where email = 'professor@university.edu'
   on conflict (user_id) do update set role = 'professor';
   ```

3. Go to **http://localhost:3000/login** and sign in using that account. Use `/admin` to edit or create records.

**Security:** authorization is checked with `auth.getUser()` on the server and the `profiles` role, *and* in PostgreSQL RLS / an atomic `save_song_record` function. The public may read only published songs and their annotation lines. Site visitors cannot self-promote to professor. Supabase service-role keys are not needed.

## 4. Main routes

| URL | Purpose |
| --- | --- |
| `/` | Searchable homepage and featured songs |
| `/songs` | Catalog with live keyword, genre, decade, and topic filters |
| `/songs/[slug]` | Song details, playable embeds, and clickable annotations |
| `/artists/[slug]` | Songs by one performer |
| `/topics` and `/topics/[slug]` | Browse research categories |
| `/login` | Professor login |
| `/admin` | Protected editing dashboard |
| `/admin/songs/new` | Create a song |
| `/admin/songs/[slug]` | Edit an existing song |

### Song editor formatting

Each line in the lyrics textbox can contain one annotation separated by `||`:

```text
The river remembers || A metaphor for collective memory.
A second lyric line || Discuss the setting and social context.
A line without a note
```

Saving replaces the song's old lyric lines and their notes **atomically** via an SQL function. The database already supports multiple annotations per line, but this initial editor provides one note per line; extending it to multi-note editing is a future feature. The editor intentionally does not provide a delete-record action in v0.1.

### Audio / video

Paste a valid YouTube or Spotify URL in the editor. A allowlisted iframe conversion prevents arbitrary URLs from being embedded. The player displays only if it recognizes a supported URL; the demo fixtures intentionally contain no falsely attributed recordings. The hosting and playability of embedded media depend on the provider.

## 5. Database model

- `profiles`: authenticated user roles. Professor designation is assigned server-side via SQL.
- `songs`: title, artist, year, genre, themes, description, provenance URL, media URLs, publication status.
- `lyric_lines`: ordered lyric segments/excerpts attached to one song.
- `annotations`: research notes linked to lyric segments; optional citation URL.
- `public.save_song_record(...)`: atomic, role-checked song + lyric + annotation editor operation.

This intentionally flat **artist** and **genre** text schema keeps the first import simple. For a larger catalog, split artists, recordings, compositions, and taxonomies into normalized tables and add full-text indexing / pagination.

## 6. Before a public launch

- Obtain permission or a legally sound basis for any lyric excerpts, cover art, and audio/video. **Educational use alone does not authorize public republication.**
- Collect source and rights/provenance information for every song and annotation.
- Review privacy and access control, enable backups, and set a real domain in Supabase Auth settings.
- Test on mobile and keyboard navigation; verify search performance for the actual dataset size.
- Decide how CSV, Excel, Access, or other professor data should map to this schema.
- Add rate limiting/monitoring, accessibility checks, pagination and enhanced full-text search if traffic/data warrants it.

## 7. Validation

```bash
npm run typecheck
npm run lint
npm run build
```

This starter has **no automatic rights clearing**. All example lyrics are original and all artist identities are fictional. No Supabase project, user, or live deployment is bundled with this zip.
