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
   * Parked left inset at lg+ (px). Default 48 — tighter than content
   * columns. Pass 100 to match Figma marks that sit on the content grid.
   */
  parkLeft?: number;
  /**
   * Parked top inset at lg+ (px). Default follows the header padding
   * (~20 / 28). Pass 100 to match Figma panel logo guides.
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
 * The logo slides 1:1 with `[data-hscroll]` scrollLeft, then parks — the
 * same behavior at every breakpoint, since the horizontal scroller is now
 * the same behavior at every breakpoint too (see HorizontalScroll).
 */
export default function StickyNav({
  watch,
  logo,
  action,
  parkLeft = 48,
  parkTop,
  parkImmediately = false,
}: Props) {
  const [offset, setOffset] = useState<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("[data-hscroll]");

    if (!scroller) return;

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
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [watch, parkLeft, parkImmediately]);

  const logoStyle: React.CSSProperties = {
    paddingLeft: parkLeft,
    paddingTop: parkTop ?? 76,
    transform: `translateX(${offset ?? 0}px)`,
    visibility: offset === null ? "hidden" : "visible",
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between pr-5 sm:pr-8">
      <div style={logoStyle}>{logo}</div>
      <div className="pt-5 sm:pt-7">{action}</div>
    </header>
  );
}
