"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export type UcmScreen = {
  title?: string;
  body?: string;
  src: string;
  alt?: string;
};

type Props = {
  screens: readonly UcmScreen[];
  headingClassName?: string;
  bodyClassName?: string;
  /** Small label under the screenshot, e.g. Internal Rewards Tool */
  caption?: string;
  label?: string;
  imageClassName?: string;
  frameClassName?: string;
  /**
   * Milliseconds per frame. Set it and the panel plays itself on a loop
   * instead of waiting to be clicked: no arrows, and the dots become
   * indicators you can still click to take over.
   */
  autoplayMs?: number;
};

/**
 * The authorization flow, step by step.
 *
 * Plays itself when `autoplayMs` is set — Molly asked for "an animated GIF
 * that auto loops instead of a carousel", and this is that behaviour without
 * the format: a GIF of UI screenshots is capped at 256 colours, which
 * dithers small text and flattens the purple step indicators, and five
 * 1024-wide frames would run to several megabytes. Crossfading the real
 * PNGs stays pixel-crisp at any size, weighs what the images already
 * weighed, and can be paused, which a GIF cannot.
 *
 * Every frame is mounted and stacked, with opacity doing the transition —
 * swapping one <img>'s src would flash on the first pass while the next
 * file downloaded, and would jump if two frames differed in height.
 *
 * Autoplay stops for good the moment someone clicks a dot (they've taken
 * over), and never starts if the reader has asked for reduced motion — in
 * which case the arrows come back so the panel is still navigable.
 */
export default function UcmScreensCarousel({
  screens,
  headingClassName = "",
  bodyClassName = "",
  caption,
  label = "Screens",
  imageClassName = "h-auto w-full max-h-[min(70dvh,calc(100dvh-8.5rem))] object-contain object-top",
  frameClassName = "overflow-hidden rounded-xl",
  autoplayMs,
}: Props) {
  const [index, setIndex] = useState(0);
  const [taken, setTaken] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = screens.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = Boolean(autoplayMs) && !taken && !reduced && total > 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % total),
      autoplayMs
    );
    return () => window.clearInterval(id);
  }, [playing, autoplayMs, total]);

  useEffect(() => {
    if (playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, prev, next]);

  const shot = screens[index];
  if (!shot) return null;

  return (
    <div
      className="mx-auto flex w-full max-w-[min(54rem,86vw)] flex-col gap-4"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {shot.title || shot.body ? (
        <div>
          {shot.title ? <h2 className={headingClassName}>{shot.title}</h2> : null}
          {shot.body ? <p className={`mt-2 ${bodyClassName}`}>{shot.body}</p> : null}
        </div>
      ) : null}

      <div className="relative">
        <div
          className={`relative mx-auto max-h-[min(70dvh,calc(100dvh-8.5rem))] w-full ${frameClassName}`}
        >
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt ?? s.title ?? `Screen ${i + 1}`}
              width={1024}
              height={1800}
              sizes="(max-width: 950px) 100vw, 950px"
              aria-hidden={i !== index}
              className={`${imageClassName} transition-opacity duration-500 motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
        </div>

        {!playing && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screen"
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/65 sm:left-4 sm:size-11"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next screen"
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/65 sm:right-4 sm:size-11"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {caption ? (
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-current/45">
          {caption}
        </p>
      ) : null}

      {/* bg-current, not bg-white: this panel sits on a light page now. */}
      <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="Screen indicators">
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.title ?? s.alt ?? `screen ${i + 1}`}`}
            onClick={() => {
              setTaken(true);
              setIndex(i);
            }}
            className={`h-2 rounded-full bg-current transition-all ${
              i === index ? "w-6 opacity-90" : "w-2 opacity-30 hover:opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
