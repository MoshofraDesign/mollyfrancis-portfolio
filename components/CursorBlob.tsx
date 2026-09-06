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

    /* Inside a [data-cursor="none"] region the blob hides completely — the
       hero portrait draws its own cursor (the halftone reveal circle), and
       two custom cursors on one pointer means the blob sits on top of the
       reveal and over the quote bubbles.

       The flag matters because the quote hotspots live INSIDE that region:
       without it, leaving a hotspot would run onLeaveInteractive and set
       opacity back to 1 while the pointer is still over the portrait. */
    let inNoCursorZone = false;

    const onEnterInteractive = () => {
      if (inNoCursorZone) return;
      blob.style.width = "60px";
      blob.style.height = "60px";
      blob.style.opacity = "0.7";
    };
    const onLeaveInteractive = () => {
      if (inNoCursorZone) return;
      blob.style.width = "28px";
      blob.style.height = "28px";
      blob.style.opacity = "1";
    };
    const onEnterNoCursor = () => {
      inNoCursorZone = true;
      blob.style.opacity = "0";
    };
    const onLeaveNoCursor = () => {
      inNoCursorZone = false;
      blob.style.width = "28px";
      blob.style.height = "28px";
      blob.style.opacity = "1";
    };

    const tick = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      blob.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document
      .querySelectorAll("a, button, [data-cursor='hover']")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });

    const noCursorZones = document.querySelectorAll("[data-cursor='none']");
    noCursorZones.forEach((el) => {
      el.addEventListener("mouseenter", onEnterNoCursor);
      el.addEventListener("mouseleave", onLeaveNoCursor);
    });

    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      noCursorZones.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterNoCursor);
        el.removeEventListener("mouseleave", onLeaveNoCursor);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={blobRef} className="cursor-blob" style={{ opacity: 0 }} aria-hidden />;
}
