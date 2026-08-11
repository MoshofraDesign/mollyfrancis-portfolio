"use client";

import { useEffect } from "react";

/**
 * Only the actual "Work" navigation should land on the grid — the Nav
 * link, the footer's "Work" link, the résumé's "case studies" link, the
 * 404 page's "Browse work", and the old /work route's redirect all point
 * at "/#work" on purpose. Case-study "Close" buttons deliberately do NOT —
 * they link to plain "/" so leaving a project returns to the top of the
 * homepage, not back into the grid.
 *
 * For the links that do use "/#work": browsers scroll to a URL fragment
 * natively on page load, and that native jump ignores the CSS
 * `scroll-behavior: smooth` on <html> — it's instant. The inline script in
 * layout.tsx cancels that native jump (forces scrollTop back to 0 before
 * paint); this effect then does the smooth version itself once the page
 * has settled, so clicking "Work" reads as a deliberate scroll down to the
 * grid instead of a hard cut. A plain visit to "/" is unaffected — this
 * only fires when the URL actually carries #work.
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
