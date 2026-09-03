"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * At lg (1024px) and up this is the full-viewport horizontal scroller: it
 * converts vertical wheel / trackpad input into horizontal movement so the
 * case study can be navigated the way karinasirqueira.com does — mouse
 * wheel down = scroll right. Native horizontal trackpad swipes and
 * drag-scrolling still work as-is. Snap is additionally gated on
 * `(pointer: coarse)` for the rare large touch device that lands at
 * desktop width.
 *
 * Below lg — tablets and phones — it renders as a normal vertical stack:
 * no overflow-x, no snap, no wheel handling, and the page scrolls top to
 * bottom like any other site. Horizontal scroll-jacking fights the OS's
 * own vertical gesture on touch, and a fixed 100dvh panel has nowhere to
 * put media once the viewport gets short. Each panel mirrors the split
 * (see Panel/TextPanel in CaseStudyKit): full-width, natural-height blocks
 * below lg; fixed-height viewport panels at lg+.
 */
export default function HorizontalScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

    const onWheel = (e: WheelEvent) => {
      // Below lg the container is a normal vertical stack — let the wheel
      // event drive native vertical scroll instead of hijacking it.
      if (!isDesktop()) return;
      // Let native horizontal gestures (shift+wheel, trackpad swipe) pass through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    // At lg+ panels are exactly one viewport wide (see VIEW in CaseStudyKit).
    // Resizing while scrolled past the first panel — dragging a desktop
    // window narrower, rotating a tablet — leaves the old pixel scrollLeft
    // pointing between two panel boundaries, so two panels render half on
    // screen at once. Track the panel index rather than the raw offset and
    // re-snap to it. Below lg there is no horizontal overflow, so park it
    // back at 0 instead: that's also what makes crossing the breakpoint
    // land cleanly on the top of the vertical stack.
    let prevWidth = window.innerWidth;
    const onResize = () => {
      const newWidth = window.innerWidth;
      if (!isDesktop()) {
        el.scrollLeft = 0;
      } else if (prevWidth > 0 && newWidth !== prevWidth) {
        const index = Math.round(el.scrollLeft / prevWidth);
        el.scrollLeft = index * newWidth;
      }
      prevWidth = newWidth;
    };
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      // data-hscroll lets fixed chrome (e.g. StickyNav) read this element's
      // scrollLeft so it can travel in step with the panels at lg+.
      data-hscroll=""
      // momentum-scroll is a plain CSS class (not a Tailwind utility), so it
      // can't take an `lg:` prefix — Tailwind only varies its own generated
      // utilities. Left unconditional instead: -webkit-overflow-scrolling
      // has no effect on an element that isn't actually overflow-scrolling,
      // which is only true at lg+ anyway, so it's inert below lg.
      className={`no-scrollbar momentum-scroll flex w-full flex-col lg:h-[100dvh] lg:w-[100dvw] lg:flex-row lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-contain lg:[@media(pointer:coarse)]:snap-x lg:[@media(pointer:coarse)]:snap-mandatory ${className}`}
    >
      {children}
    </div>
  );
}
