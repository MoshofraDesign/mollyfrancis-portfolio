"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

// Routes that own their full-viewport chrome and opt out of the shared
// nav / footer / page-shell padding.
const FULL_BLEED_ROUTES = ["/work/govos-esubmission"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isV2 = pathname?.startsWith("/v2");
  const isFullBleed = FULL_BLEED_ROUTES.some((r) => pathname?.startsWith(r));

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
        <main className="page-shell pt-28">{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
