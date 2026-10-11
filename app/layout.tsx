import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Disc3, LibraryBig, LockKeyhole } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Songlines | Music Research Archive", template: "%s | Songlines" },
  description: "Explore musical histories through annotated lyrics, research categories, and listening links."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased min-h-screen">
    <header className="bg-[#111c1b] text-white border-b border-white/10">
      <div className="page-container h-[76px] flex items-center justify-between gap-6">
        <Link href="/" className="flex gap-3 items-center shrink-0" aria-label="Songlines homepage">
          <span className="w-10 h-10 rounded-xl bg-[#d3ef55] grid place-items-center text-[#192324]"><Disc3 size={23} strokeWidth={2.5}/></span>
          <span className="text-2xl font-black tracking-tight">songlines<span className="text-[#d3ef55]">.</span></span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-7 text-sm font-semibold text-white/75">
          <Link className="hover:text-white" href="/songs">Explore songs</Link>
          <Link className="hover:text-white hidden sm:block" href="/topics">Research topics</Link>
          <Link className="hover:text-white hidden md:block" href="/#about">About</Link>
          <Link className="rounded-full border border-white/30 px-3 py-2 hover:bg-white/10 flex items-center gap-2" href="/admin"><LockKeyhole size={14}/><span className="hidden sm:inline">Professor</span></Link>
        </nav>
      </div>
    </header>
    <main className="min-h-[68vh]">{children}</main>
    <footer className="bg-[#111c1b] text-white/70 mt-20">
      <div className="page-container py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div><Link href="/" className="text-white font-black text-xl flex items-center gap-2"><Disc3 size={21} className="text-[#d3ef55]"/> songlines.</Link><p className="max-w-md mt-2 text-sm leading-6">A customizable, public-facing archive for music scholarship. Demo records are fictional and use original illustrative lyrics.</p></div>
        <div className="flex flex-wrap gap-5 text-sm"><Link href="/songs" className="hover:text-white flex items-center gap-1"><LibraryBig size={15}/> Catalog</Link><Link href="/admin" className="hover:text-white flex items-center gap-1"><LockKeyhole size={15}/> Admin</Link><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">Built with Next.js <ArrowUpRight size={14}/></a></div>
      </div>
      <div className="border-t border-white/10 py-5 text-xs text-white/45 text-center">Version 0.1 • Research-first design • Use only material you have permission to publish.</div>
    </footer>
  </body></html>;
}
