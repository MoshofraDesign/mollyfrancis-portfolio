import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * Minimal persistent chrome for the /v2 home / about / resume / contact
 * pages — a small wordmark top-left, a tight all-caps link cluster
 * top-right. Case-study pages (/v2/work/[slug]) use their own header
 * instead (project name + close ×), so this isn't rendered there.
 */
export default function V2Chrome() {
  return (
    <>
      {/* top-left brand mark, same as the main site's nav */}
      <Link
        href="/v2"
        className="fixed top-5 left-5 sm:top-8 sm:left-8 z-50 inline-flex items-center justify-center rounded-full bg-[#f2f1ec] p-2.5 shadow-sm transition-transform hover:scale-105"
        aria-label="Molly Francis — home"
      >
        <Logo variant="mark" size={22} />
      </Link>

      {/* top-right link cluster */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-end p-5 sm:p-8 pointer-events-none mix-blend-difference text-[#f2f1ec]">
        <nav className="pointer-events-auto flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
          <Link href="/v2/resume" className="hover:opacity-60 transition-opacity">
            Résumé
          </Link>
          <Link href="/v2/about" className="hover:opacity-60 transition-opacity">
            About Me
          </Link>
          <Link href="/v2/contact" className="hover:opacity-60 transition-opacity">
            Contact
          </Link>
          <Link
            href="/"
            className="hover:opacity-60 transition-opacity text-[10px] sm:text-[11px] opacity-70"
            title="Back to the main site"
          >
            Original site ↗
          </Link>
        </nav>
      </div>
    </>
  );
}
