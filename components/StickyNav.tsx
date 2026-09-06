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
   * Parked top inset (px). Defaults to the --nav-park-top token, which is
   * a flat 50px — the same inset as parkLeft, so the mark parks at 50,50.
   * Overriding this with a raw number opts out of the --nav-clear inset
   * panels size themselves against, which is how media ends up sliding
   * under the mark; prefer changing the token.
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
  // Measured so the ride can end when the mark clears the title panel by its
  // own width, rather than a viewport's worth of scrolling later.
  const markBox = useRef<HTMLDivElement | null>(null);

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
      const vw = window.innerWidth;

      /* The mark rides in from the right edge and parks at the rail. It used
         to travel 1:1 with scrollLeft, finishing only after a full viewport
         of scrolling — which assumes the panel after the title is also a
         full viewport wide. It often isn't: the panels that hug their media
         (Volusion's clips, athenaConnect's) are narrower, so they reach
         their resting position while the mark is still ~120px short of the
         rail, leaving it hanging in the field between the title's tail and
         the media. That's the "weird alignment" as the second section
         arrives.

         So the ride is measured against the title panel's own right edge and
         ends as soon as the mark clears it by the mark's own width — the
         moment it would otherwise start floating over the title's empty
         field. Same start (just off the right edge), same direction, just
         finished by the time the next panel settles, whatever its width. */
      const markW = markBox.current?.offsetWidth ?? 0;
      const titleRight = title
        ? title.getBoundingClientRect().right
        : vw - scroller.scrollLeft;
      const ride = Math.max(1, vw - pad - markW);
      const progress = Math.min(1, Math.max(0, (vw - titleRight) / ride));
      setOffset((vw - pad) * (1 - progress));
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
      <div
        ref={markBox}
        className={isLg ? undefined : "pl-5 pt-5 sm:pl-8 sm:pt-7"}
        style={logoStyle}
      >
        {logo}
      </div>
      <div className="pt-5 sm:pt-7">{action}</div>
    </header>
  );
}
