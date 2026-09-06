"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  /**
   * The dot takes the page's own text colour.
   *
   * A dark dot is invisible on Netspend's near-black and unreadable on
   * athenahealth's purple; a white one disappears on Bright's #f9f9f9 and on
   * the light gallery pages. Rather than keep a list of which project is
   * which — a list that goes stale the moment an accent changes — it reads
   * the computed colour of <main>, which every case study already sets from
   * contrastColor(accent). Whatever the page uses for type is by definition
   * readable on that page's ground, so the dot uses it too, with a ring in
   * the opposite direction so it never vanishes into the type.
   */
  useEffect(() => {
    const blob = blobRef.current;
    const main = document.querySelector("main");
    if (!blob || !main) return;
    const color = getComputedStyle(main).color;
    const nums = color.match(/[\d.]+/g);
    if (!nums) return;
    const [r, g, b] = nums.map(Number);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    blob.style.background = color;
    blob.style.boxShadow = `0 0 0 1.5px ${
      lum > 0.5 ? "rgba(20,20,20,0.55)" : "rgba(255,255,255,0.9)"
    }`;
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
        blob.style.opacity = "1";
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
      blob.style.opacity = interactive ? "0.7" : "1";
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
