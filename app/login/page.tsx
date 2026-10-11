import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { login } from "./actions";
import { hasSupabase } from "@/lib/supabase/server";
export default async function LoginPage({ searchParams }: { searchParams: Promise<{reason?:string}> }) {
  const {reason}=await searchParams;
  const configured=hasSupabase();
  return <div className="page-container py-18 max-w-xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#567858]"><ArrowLeft size={15}/> Return to homepage</Link><div className="panel p-8 md:p-10 mt-6"><div className="w-13 h-13 rounded-2xl grid place-items-center bg-[#e7f0d3] text-[#4e733f]"><LockKeyhole size={25}/></div><h1 className="text-3xl font-black mt-6">Professor sign in</h1><p className="text-sm leading-7 text-[#68766d] mt-2">This area is restricted to authorized professor accounts. Public visitors can browse the archive without signing in.</p>
  {!configured ? <div className="bg-[#fff1d7] border border-[#e8d6b2] rounded-xl p-4 mt-6 text-sm leading-6"><strong>Demo mode is active.</strong><p className="mt-1">Connect Supabase and run the SQL migration to enable professor login and editing. See README.md for instructions.</p></div> : <>
    {reason === "role" && <p role="alert" className="bg-[#fff1d7] p-4 rounded-xl text-sm mt-5">This account is not a professor. Assign its role in the Supabase SQL editor before using the dashboard.</p>}
    {reason === "credentials" && <p role="alert" className="bg-red-50 text-red-900 p-4 rounded-xl text-sm mt-5">Sign-in failed. Check your email and password.</p>}
    <form action={login} className="space-y-5 mt-7"><div><label htmlFor="email" className="block text-sm font-bold mb-2">Email</label><input id="email" name="email" type="email" autoComplete="email" required className="field" placeholder="professor@university.edu" /></div><div><label htmlFor="password" className="block text-sm font-bold mb-2">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required className="field" /></div><button type="submit" className="btn-primary w-full">Sign in to dashboard</button></form>
  </>}
  </div></div>;
}
