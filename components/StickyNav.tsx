"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** id of the first panel — the logo rides in as this scrolls away. */
  watch: string;
  /** Slides in with the second panel, then parks in the corner. */
  logo?: React.ReactNode;
  /** Always visible, so there's a way out from the very first panel. */
  action?: React.ReactNode;
  /**
   * Parked left inset at lg+ (px). Default 50 — deliberately tighter than
   * the 100px the hero marks sit at, so the parked mark reads as chrome
   * rather than as the hero mark left behind. (It was briefly 100 to match
   * them exactly; Molly preferred the tighter inset.)
   */
  parkLeft?: number;
  /**
   * Parked top inset (px). Defaults to the --nav-park-top token, which
   * is height-aware (clamp(1.25rem, 5vh, 4.75rem)) so the band shrinks on
   * short viewports. Overriding this with a raw number opts out of that,
   * and out of the --nav-clear inset panels size themselves against —
   * so keep any override at or below the token's 76px ceiling.
   */
  parkTop?: number;
  /**
   * Show the logo parked from the very first panel instead of riding in
   * with the second — for a page whose own mark should just be present
   * throughout, not "arrive" as a reveal.
   */
  parkImmediately?: boolean;
};

/**
 * Fixed top bar for horizontal case studies.
 *
 * At lg+ the logo slides 1:1 with `[data-hscroll]` scrollLeft, then parks.
 * Below lg the page is a vertical stack with no horizontal scroll to ride,
 * so it simply fades in once the title section has left the viewport.
 *
 * Renders the logo node once — dual mobile/desktop copies caused a visible
 * double mark when both wrappers briefly painted.
 */
export default function StickyNav({
  watch,
  logo,
  action,
  parkLeft = 50,
  parkTop,
  parkImmediately = false,
}: Props) {
  const [offset, setOffset] = useState<number | null>(null);
  const [pastTitle, setPastTitle] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-hscroll]");
    const title = document.getElementById(watch);

    const io = title
      ? new IntersectionObserver(([entry]) => setPastTitle(!entry.isIntersecting), {
          threshold: 0,
        })
      : null;
    io?.observe(title!);

    if (!scroller) return () => io?.disconnect();

    const update = () => {
      if (parkImmediately) {
        setOffset(0);
        return;
      }
      const pad = window.innerWidth >= 1024 ? parkLeft : window.innerWidth >= 640 ? 32 : 20;
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
      io?.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [watch, parkLeft, parkImmediately]);

  const logoStyle: React.CSSProperties = isLg
    ? {
        paddingLeft: parkLeft,
        paddingTop: parkTop ?? "var(--nav-park-top)",
        transform: `translateX(${offset ?? 0}px)`,
        visibility: offset === null ? "hidden" : "visible",
      }
    : {
        opacity: parkImmediately || pastTitle ? 1 : 0,
        transition: "opacity 400ms ease",
      };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between pr-5 sm:pr-8">
      <div className={isLg ? undefined : "pl-5 pt-5 sm:pl-8 sm:pt-7"} style={logoStyle}>
        {logo}
      </div>
      <div className="pt-5 sm:pt-7">{action}</div>
    </header>
  );
}
