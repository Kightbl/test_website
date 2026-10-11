import { redirect } from "next/navigation";
import { createClient, hasSupabase } from "@/lib/supabase/server";

export async function requireProfessor() {
  if (!hasSupabase()) redirect("/login?reason=setup");
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).maybeSingle();
  if (profile?.role !== "professor") redirect("/login?reason=role");
  return { supabase, user };
}
