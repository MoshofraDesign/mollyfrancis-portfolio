"use client";

import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement | null>(null);

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
      if (blob.style.opacity === "0") {
        blob.style.opacity = "1";
      }
    };

    const onEnterInteractive = () => {
      blob.style.width = "60px";
      blob.style.height = "60px";
      blob.style.opacity = "0.7";
    };
    const onLeaveInteractive = () => {
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

    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={blobRef} className="cursor-blob" style={{ opacity: 0 }} aria-hidden />;
}
