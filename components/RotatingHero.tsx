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
    <section className="flex min-h-[80vh] items-center px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 sm:grid-cols-[minmax(0,340px)_1fr] sm:gap-12 lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:mx-0 sm:max-w-[575px]">
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
        </div>

        <div className="text-left">
          <p className="mb-3 flex items-center gap-1.5 text-[40px] font-semibold text-ink">
            Hello, I&rsquo;m Molly Francis
            <span aria-hidden="true">🖐️</span>
          </p>
          <h1
            className="max-w-xl font-jost text-[55px] font-normal leading-snug text-ink transition-opacity duration-[400ms] ease-out"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {headlines[index]}
          </h1>
        </div>
      </div>
    </section>
  );
}
