"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

const HOTSPOTS = [
  {
    id: "brain",
    label: "🧠 Currently running 12 browser tabs and one very good idea.",
    // forehead
    style: { top: "10%", left: "36%", width: "28%", height: "12%" },
    bubble: { bottom: "auto", top: "-18%", left: "30%", transformOrigin: "bottom left" },
    dotA: { bottom: "-8%", left: "38%", width: 10, height: 10 },
    dotB: { bottom: "-13%", left: "46%", width: 6, height: 6 },
  },
  {
    id: "eye-l",
    label: "👁 That spacing is off by 4px. I can't unsee it.",
    style: { top: "31%", left: "28%", width: "18%", height: "8%" },
    bubble: { top: "14%", left: "-55%", transformOrigin: "bottom right" },
    dotA: { bottom: "-8%", right: "20%", width: 10, height: 10 },
    dotB: { bottom: "-13%", right: "12%", width: 6, height: 6 },
  },
  {
    id: "eye-r",
    label: "👁 Is that a drop shadow on a drop shadow?",
    style: { top: "31%", left: "52%", width: "18%", height: "8%" },
    bubble: { top: "14%", left: "30%", transformOrigin: "bottom left" },
    dotA: { bottom: "-8%", left: "20%", width: 10, height: 10 },
    dotB: { bottom: "-13%", left: "12%", width: 6, height: 6 },
  },
  {
    id: "ear",
    label: "👂 \"We'll just add it in dev.\" — heard that before.",
    style: { top: "42%", left: "10%", width: "10%", height: "14%" },
    bubble: { top: "0%", left: "110%", transformOrigin: "bottom left" },
    dotA: { top: "50%", left: "-8%", width: 10, height: 10 },
    dotB: { top: "50%", left: "-14%", width: 6, height: 6 },
  },
  {
    id: "mouth",
    label: "💬 \"Can we make the logo bigger?\" No. No we cannot.",
    style: { top: "63%", left: "32%", width: "24%", height: "8%" },
    bubble: { top: "auto", bottom: "-160%", left: "10%", transformOrigin: "top left" },
    dotA: { top: "-8%", left: "30%", width: 10, height: 10 },
    dotB: { top: "-13%", left: "40%", width: 6, height: 6 },
  },
] as const;

// Two-column hero — halftone portrait on the left, left-justified intro
// text on the right: a static "Hello, I'm Molly Francis" line, then a
// larger line that cycles through a short rotation of taglines, each held
// on screen for a beat then crossfaded for the next.
const headlines = [
  "I'm a UI/UX product designer, artist & collector of many things.",
  "I turn complex healthcare and fintech problems into simple experiences.",
  "20+ years designing — now augmented with a working AI stack.",
];

const ROTATE_MS = 3400;

export default function RotatingHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      // Wait for the fade-out to finish before swapping copy, then fade in.
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % headlines.length);
        setVisible(true);
      }, 400);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center px-6 py-16 sm:min-h-[75vh] sm:py-0 lg:min-h-[80vh] lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-10 lg:grid-cols-[minmax(0,570px)_1fr] lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[210px] sm:max-w-[300px] md:mx-0 md:max-w-none lg:max-w-[570px]">
          {/* unoptimized: the optimizer only passes SVGs through with
              dangerouslyAllowSVG set, and this is our own trusted asset. */}
          <Image
            src="/hero-halftone.svg"
            alt="Halftone portrait of Molly Francis"
            fill
            unoptimized
            priority
            className="object-contain"
          />

          {/* Thought bubble hotspots */}
          {HOTSPOTS.map((h) => (
            <div
              key={h.id}
              className="absolute cursor-pointer"
              style={h.style as React.CSSProperties}
              onMouseEnter={() => setActiveHotspot(h.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Thought bubble */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  ...(h.bubble as React.CSSProperties),
                  opacity: activeHotspot === h.id ? 1 : 0,
                  transform: activeHotspot === h.id ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  background: "white",
                  border: "2px solid #1a1a1a",
                  borderRadius: "14px",
                  padding: "9px 13px",
                  fontSize: "clamp(10px, 1.4vw, 13px)",
                  lineHeight: 1.45,
                  color: "#1a1a1a",
                  whiteSpace: "normal" as const,
                  boxShadow: "3px 3px 0 #1a1a1a",
                  minWidth: "160px",
                  maxWidth: "220px",
                }}
              >
                {h.label}
              </div>
              {/* Connector dots */}
              <div
                className="absolute z-10 pointer-events-none rounded-full bg-white border-2 border-[#1a1a1a]"
                style={{
                  ...(h.dotA as React.CSSProperties),
                  opacity: activeHotspot === h.id ? 1 : 0,
                  transition: "opacity 0.15s ease",
                }}
              />
              <div
                className="absolute z-10 pointer-events-none rounded-full bg-white border-2 border-[#1a1a1a]"
                style={{
                  ...(h.dotB as React.CSSProperties),
                  opacity: activeHotspot === h.id ? 1 : 0,
                  transition: "opacity 0.15s ease 0.05s",
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-left">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-normal text-ink sm:mb-3 sm:text-base md:text-lg lg:text-[20px]">
            Hello, I&rsquo;m Molly Francis
            <span aria-hidden="true">🖐️</span>
          </p>
          <h1
            className="max-w-3xl font-jost text-2xl font-medium leading-snug text-ink transition-opacity duration-[400ms] ease-out sm:text-3xl md:max-w-4xl md:text-4xl lg:max-w-5xl lg:text-[55px] lg:leading-[65px]"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {headlines[index]}
          </h1>
        </div>
      </div>
    </section>
  );
}
