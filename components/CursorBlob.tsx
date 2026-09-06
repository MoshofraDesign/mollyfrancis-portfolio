"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  /**
   * The dot is light on every page. It used to take the page's own text
   * colour, which made it white on the case studies but ink-dark on the
   * homepage and the light gallery pages — and a dark dot is the one thing
   * it can't be, since it rides over the work-grid tiles.
   *
   * So the fill is fixed and only the ring is derived: on a light ground a
   * white dot needs a dark hairline to exist at all, and on a dark ground it
   * needs the opposite (a barely-there light ring, which keeps its edge from
   * dissolving into a mid-tone accent). <main>'s computed text colour is the
   * cheapest read of which ground this is — every case study already sets it
   * from the page colour — so it still drives that one decision.
   */
  useEffect(() => {
    const blob = blobRef.current;
    const main = document.querySelector("main");
    if (!blob) return;
    blob.style.background = "#f7f7f7";
    if (!main) return;
    const nums = getComputedStyle(main).color.match(/[\d.]+/g);
    if (!nums) return;
    const [r, g, b] = nums.map(Number);
    const textLum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    // Light text means a dark page, and vice versa.
    blob.style.boxShadow =
      textLum > 0.5
        ? "0 0 0 1px rgba(255,255,255,0.28)"
        : "0 0 0 1px rgba(20,20,20,0.3)";
  }, [pathname]);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // First real cursor position wins — until then the blob stays
      // invisible instead of sitting at its viewport-center default (was
      // showing as a stray dot on any device that never fires mousemove,
      // e.g. a resized desktop window under trackpad-only test).
      if (blob.style.opacity === "0" && !inNoCursorZone) {
        blob.style.opacity = OPACITY_REST;
      }
    };

    /* One delegated listener instead of per-element mouseenter/mouseleave.

       Those were bound once, on first mount, from a querySelectorAll — and
       CursorBlob lives in the root layout, so a client-side navigation to the
       homepage swapped the DOM underneath it and the [data-cursor='none']
       node it had listened for was never there to bind. The blob then sat on
       the halftone reveal for anyone who arrived at home from a project page.

       mouseover bubbles and fires on every element the pointer crosses,
       including on the way back out of a child into its parent, so the state
       is recomputed from the event target each time — nothing to bind,
       nothing to keep in sync, and it covers nodes added later. */
    const SIZE_REST = "28px";
    const SIZE_HOVER = "40px";
    /* Both states are washes, not discs. At full opacity the dot read as a
       solid sticker sitting on the page — worst over the work-grid tiles,
       where it covered the artwork it was meant to point at. The hover state
       is the more transparent of the two, since that's when it's largest and
       has something underneath worth seeing. */
    const OPACITY_REST = "0.8";
    const OPACITY_HOVER = "0.35";

    let inNoCursorZone = false;

    const onOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;

      /* Over the portrait the reveal circle IS the cursor, so the blob goes
         away entirely — no dot riding on the reveal, none over the quote
         bubbles inside it. The quote hotspots are children of that region,
         which is why this is checked before the interactive test. */
      if (target?.closest("[data-cursor='none']")) {
        inNoCursorZone = true;
        blob.style.opacity = "0";
        return;
      }

      inNoCursorZone = false;
      const interactive = target?.closest("a, button, [data-cursor='hover']");
      blob.style.width = interactive ? SIZE_HOVER : SIZE_REST;
      blob.style.height = interactive ? SIZE_HOVER : SIZE_REST;
      blob.style.opacity = interactive ? OPACITY_HOVER : OPACITY_REST;
    };

    const tick = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      blob.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={blobRef} className="cursor-blob" style={{ opacity: 0 }} aria-hidden />;
}
