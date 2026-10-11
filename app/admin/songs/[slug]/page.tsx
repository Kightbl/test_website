import { notFound } from "next/navigation";
import { requireProfessor } from "@/lib/admin";
import { getSong } from "@/lib/data";
import { ProfessorEditor } from "@/components/professor-editor";
export default async function EditSongPage({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{error?:string}>}) { await requireProfessor(); const {slug}=await params; const {error}=await searchParams; const song=await getSong(slug); if(!song) notFound(); return <ProfessorEditor song={song} error={error}/>; }
