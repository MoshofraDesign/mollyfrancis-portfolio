"use client";

import { useEffect } from "react";

/**
 * Fixes the "jumps straight to work" bug: every Close/"Work" link across
 * the site points at "/#work" (see Nav, Footer, resume, not-found, and
 * every case-study page). Browsers scroll to a URL fragment natively on
 * page load, and that native jump ignores the CSS `scroll-behavior:
 * smooth` on <html> — it's instant, so landing here from another page
 * skipped straight past the hero. The inline script in layout.tsx cancels
 * that native jump (forces scrollTop back to 0 before paint); this effect
 * then does the smooth version itself once the page has settled, so
 * "clicking Work" reads as a deliberate scroll down to the grid instead of
 * a hard cut. A plain visit to "/" is unaffected — this only fires when
 * the URL actually carries #work.
 */
export default function ScrollToWork() {
  useEffect(() => {
    if (window.location.hash !== "#work") return;

    const id = window.setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);

    return () => window.clearTimeout(id);
  }, []);

  return null;
}
