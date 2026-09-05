"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

// Individual case-study pages (/work/<slug>) and the About page all own
// their full-viewport horizontal-scroll chrome now — this matches any
// single path segment under /work/ (govos-esubmission's dedicated route
// included) plus /about exactly, but excludes the /work listing page
// itself, which still uses the shared nav/footer.
const FULL_BLEED_PATTERN = /^\/(work\/[^/]+|about)\/?$/;

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isV2 = pathname?.startsWith("/v2");
  const isFullBleed = pathname ? FULL_BLEED_PATTERN.test(pathname) : false;

  if (isV2 || isFullBleed) {
    // /v2 is a fully separate design language, and full-bleed case studies
    // are horizontal 100dvh scrollers — neither can live inside the shared
    // nav + footer + page-shell padding. Each owns its own chrome.
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <PageTransition>
        {/* Tracks the nav's h-32: 128px of bar plus the 16px gap the page
            has always had under it. Went to 96 briefly and the 64px lockup
            read cramped, so it is back. */}
      <main className="page-shell pt-36">{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
