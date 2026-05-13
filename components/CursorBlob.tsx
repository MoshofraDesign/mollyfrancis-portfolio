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

  return <div ref={blobRef} className="cursor-blob" aria-hidden />;
}
