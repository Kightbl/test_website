"use server";
import { redirect } from "next/navigation";
import { createClient, hasSupabase } from "@/lib/supabase/server";
export async function login(formData: FormData) {
  if (!hasSupabase()) redirect("/login?reason=setup");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?reason=credentials");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?reason=credentials");
  redirect("/admin");
}
export async function logout() {
  if (hasSupabase()) { const supabase = await createClient(); await supabase.auth.signOut(); }
  redirect("/");
}
