"use client";

import { useEffect, useState } from "react";

// Centered, minimal hero — eyebrow line + a single big headline that cycles
// through a short rotation of taglines, each held on screen for a beat then
// crossfaded for the next. Mirrors the calm, single-focal-point hero pattern
// (logo/nav top, one big centered statement, contact + location anchored to
// the bottom corners) rather than the previous side-by-side portrait layout.
const headlines = [
  "Hello, I'm Molly Francis.",
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
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/50">
        Welcome! I&rsquo;m Molly <span aria-hidden="true">✦</span>
      </p>

      <h1
        className="max-w-4xl font-jost font-semibold text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-tight transition-opacity duration-[400ms] ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {headlines[index]}
      </h1>

      {/* Bottom-left: how to reach her. */}
      <div className="absolute bottom-8 left-6 hidden sm:block lg:left-10">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/50">
          Get in touch
        </p>
        <a
          href="mailto:yo@mollyfrancis.com"
          className="link-underline text-sm text-ink/70"
        >
          yo@mollyfrancis.com
        </a>
      </div>

      {/* Bottom-right: location. */}
      <div className="absolute bottom-8 right-6 hidden text-right sm:block lg:right-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
          Austin, TX
        </p>
      </div>
    </section>
  );
}
