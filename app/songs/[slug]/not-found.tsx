import Link from "next/link";
export default function NotFound() { return <div className="page-container py-24 text-center"><h1 className="text-4xl font-black">Song not found</h1><p className="mt-4 text-[#68766c]">This song may not exist or may be unpublished.</p><Link className="btn-dark mt-6" href="/songs">Back to catalog</Link></div>; }
