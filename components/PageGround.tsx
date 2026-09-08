"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Paints <html> and <body> with the current page's own ground colour.
 *
 * Every project page sets its background on <main>, and body stayed white
 * underneath. Anywhere the viewport shows through past <main> — a macOS
 * rubber-band overscroll at the ends of a horizontal rail, a sub-pixel
 * rounding gap at the bottom edge, the area behind a rounded window corner —
 * what showed was white, which on a dark or saturated page reads as a pale
 * sliver in the corner.
 *
 * Reading the computed colour off <main> rather than passing it in keeps this
 * to one mount in the root layout: no page has to know about it, and a page
 * that changes its accent can't fall out of sync. Cleared on unmount so the
 * next route starts from the stylesheet's own value.
 */
export default function PageGround() {
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      const main = document.querySelector("main");
      if (!main) return;
      const bg = getComputedStyle(main).backgroundColor;
      // Transparent means the page is happy with the default ground.
      if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") return;
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
    };

    sync();
    // A page whose colour comes from an inline style on <main> can mount a
    // frame before that style lands; one late re-read covers it.
    const t = window.setTimeout(sync, 80);

    return () => {
      window.clearTimeout(t);
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [pathname]);

  return null;
}
