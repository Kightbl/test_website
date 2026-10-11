import Link from "next/link";
import { ArrowUpRight, CirclePlus, FilePenLine, Music2 } from "lucide-react";
import { logout } from "@/app/login/actions";
import { requireProfessor } from "@/lib/admin";
import { getSongs } from "@/lib/data";
export default async function AdminPage() {
  const { user } = await requireProfessor();
  const songs = await getSongs();
  return <div className="page-container py-14"><div className="flex justify-between items-center gap-4 flex-wrap"><div><div className="label-kicker">PROFESSOR WORKSPACE</div><h1 className="text-4xl font-black mt-2">Your song collection</h1><p className="text-[#657467] mt-3 text-sm">Signed in as {user.email}</p></div><div className="flex items-center gap-3"><form action={logout}><button type="submit" className="btn-dark">Sign out</button></form><Link href="/admin/songs/new" className="btn-primary"><CirclePlus size={17}/> Add a song</Link></div></div>
  <div className="grid sm:grid-cols-3 gap-4 mt-9 mb-7">{[{label:"Songs",number:songs.length},{label:"Published",number:songs.filter(s=>s.published).length},{label:"Drafts",number:songs.filter(s=>!s.published).length}].map(i=><div key={i.label} className="panel p-6"><p className="text-xs uppercase tracking-widest font-bold text-[#667c66]">{i.label}</p><p className="text-4xl font-black mt-2">{i.number}</p></div>)}</div>
  <div className="panel overflow-hidden"><div className="p-5 border-b border-[#e8e9e0] font-bold flex items-center gap-2"><Music2 size={18}/> All records</div>{songs.length ? songs.map(s=><div key={s.id} className="p-5 border-b last:border-0 border-[#ebede6] flex flex-wrap justify-between items-center gap-4"><div><p className="font-extrabold">{s.title}</p><p className="text-sm text-[#6a786b] mt-1">{s.artist} · {s.year} · <span className={s.published?"text-[#487a52]":"text-[#9b7832]"}>{s.published?"Published":"Draft"}</span></p></div><div className="flex gap-4 items-center text-sm font-bold"><Link href={`/admin/songs/${s.slug}`} className="flex gap-1.5 items-center text-[#456345]"><FilePenLine size={16}/> Edit</Link>{s.published && <Link target="_blank" href={`/songs/${s.slug}`} className="flex gap-1 items-center text-[#627364]">View <ArrowUpRight size={15}/></Link>}</div></div>) : <p className="p-7 text-sm text-[#6c796e]">No records yet. Use “Add a song” or run the optional sample seed.</p>}</div>
  <p className="text-xs text-[#7e8981] mt-6">Edits are stored in Supabase and are protected by both server-side checks and row-level security policies.</p>
  </div>;
}
