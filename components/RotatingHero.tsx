"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
        <div className="halftone-sweep relative mx-auto aspect-square w-full max-w-[210px] sm:max-w-[300px] md:mx-0 md:max-w-none lg:max-w-[570px]">
          {/* unoptimized: the optimizer only passes SVGs through with
              dangerouslyAllowSVG set, and this is our own trusted asset.
              halftone-sweep (globals.css) adds a subtle diagonal fade that
              sweeps across the dots on hover. */}
          <Image
            src="/hero-halftone.svg"
            alt="Halftone portrait of Molly Francis"
            fill
            unoptimized
            priority
            className="object-contain"
          />
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
