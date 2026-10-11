import { requireProfessor } from "@/lib/admin";
import { ProfessorEditor } from "@/components/professor-editor";
export default async function NewSongPage({searchParams}:{searchParams:Promise<{error?:string}>}) { await requireProfessor(); const {error}=await searchParams; return <ProfessorEditor error={error}/>; }
