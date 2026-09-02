"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Full-viewport horizontal scroller, the same at every breakpoint: it
 * converts vertical wheel / trackpad input into horizontal movement so the
 * case study can be navigated the way karinasirqueira.com does — mouse
 * wheel down = scroll right. Native horizontal trackpad swipes and
 * drag-scrolling / touch-swipe still work as-is. Snap is additionally
 * gated on `(pointer: coarse)` so touch devices (phone, tablet) snap
 * panel-to-panel on swipe, matching the mouse/trackpad experience at
 * desktop rather than free-scrolling.
 */
export default function HorizontalScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Let native horizontal gestures (shift+wheel, trackpad swipe) pass through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    // Panels are exactly one viewport wide at every breakpoint (see VIEW in
    // CaseStudyKit) — horizontal scroll is now the same behavior at every
    // size, not just lg+. If the window is resized while scrolled past the
    // first panel (rotating a phone, dragging a desktop window narrower),
    // the old pixel scrollLeft no longer lines up with a panel boundary and
    // two panels render half on screen at once. Track the panel index
    // instead of the raw pixel offset and re-snap to it on resize.
    let prevWidth = window.innerWidth;
    const onResize = () => {
      const newWidth = window.innerWidth;
      if (prevWidth > 0 && newWidth !== prevWidth) {
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
      className={`no-scrollbar momentum-scroll flex h-[100dvh] w-[100dvw] flex-row overflow-x-auto overflow-y-hidden overscroll-x-contain [@media(pointer:coarse)]:snap-x [@media(pointer:coarse)]:snap-mandatory ${className}`}
    >
      {children}
    </div>
  );
}
