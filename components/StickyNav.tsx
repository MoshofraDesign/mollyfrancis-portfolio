"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** id of the first panel — the logo rides in as this scrolls away. */
  watch: string;
  /** Slides in with the second panel, then parks in the corner. */
  logo: React.ReactNode;
  /** Always visible, so there's a way out from the very first panel. */
  action?: React.ReactNode;
};

/**
 * Fixed top bar for the GovOS case study.
 *
 * At lg+ (1024px, where the case study horizontally scroll-jacks) the logo
 * is pinned to the title panel's leading edge: it slides on screen with
 * that panel at exactly the speed you scroll, as if printed on it, then
 * stops once the edge reaches the corner. Reads `[data-hscroll]`'s
 * scrollLeft (set by HorizontalScroll) rather than window scroll, since the
 * panels live in an overflow container there.
 *
 * Below lg the page is a normal vertical scroll (see HorizontalScroll) and
 * scrollLeft never moves, so that mechanic has nothing to key off. Instead
 * an IntersectionObserver on the title panel does the equivalent job for a
 * vertical page: the small logo simply fades in once the title section has
 * scrolled out of view, like any ordinary sticky nav.
 *
 * Both versions of the logo are rendered and toggled with lg:/hidden so the
 * choice between them is pure CSS, not JS — no risk of picking the wrong
 * one before hydration settles.
 */
export default function StickyNav({ watch, logo, action }: Props) {
  const [offset, setOffset] = useState<number | null>(null);
  const [pastTitle, setPastTitle] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-hscroll]");
    const title = document.getElementById(watch);

    if (!title) return;

    const io = new IntersectionObserver(([entry]) => setPastTitle(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(title);

    if (!scroller) {
      return () => io.disconnect();
    }

    const update = () => {
      // Matches the logo wrapper's own left inset below (pl-5 / sm:pl-8 /
      // lg:pl-[48px]) so the slide lands exactly on the resting position,
      // not short of or past it.
      const pad = window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 32 : 20;
      // Parked just off the right edge while the title panel is up, then moves
      // left 1:1 with the scroll — so it slides in with the second section
      // rather than sitting on screen waiting. Stops dead in the corner.
      setOffset(Math.max(0, window.innerWidth - pad - scroller.scrollLeft));
    };

    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [watch]);

  return (
    // Left and right insets are independent on purpose: the Close action
    // just hugs the corner, while the logo's left inset is intentionally
    // tighter than the section text columns (pl-[100px]) — once it's
    // parked, it reads as nav chrome hugging the corner, not another text
    // column that needs to line up with the page's content grid.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between py-5 pr-5 sm:py-7 sm:pr-8">
      {/* Below lg: plain fade-in once the title section is scrolled past. */}
      <div
        className="pl-5 sm:pl-8 lg:hidden"
        style={{ opacity: pastTitle ? 1 : 0, transition: "opacity 400ms ease" }}
      >
        {logo}
      </div>
      {/* lg+: slides in 1:1 with horizontal scrollLeft, as before. */}
      <div
        className="hidden lg:block lg:pl-12"
        style={{
          // Hidden until measured on the client — `window` isn't available
          // during SSR, and this avoids a flash in the corner on first paint.
          transform: `translateX(${offset ?? 0}px)`,
          visibility: offset === null ? "hidden" : "visible",
        }}
      >
        {logo}
      </div>
      {action}
    </header>
  );
}
