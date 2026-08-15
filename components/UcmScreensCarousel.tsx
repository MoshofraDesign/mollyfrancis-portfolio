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
};

/**
 * Single-panel carousel for UCM HTML screenshots — title/body + image,
 * with prev/next arrows and dot indicators.
 */
export default function UcmScreensCarousel({
  screens,
  headingClassName = "",
  bodyClassName = "",
  caption,
  label = "Screens",
  imageClassName = "h-auto w-full max-h-[min(70dvh,calc(100dvh-8.5rem))] object-contain object-top",
  frameClassName = "overflow-hidden rounded-xl",
}: Props) {
  const [index, setIndex] = useState(0);
  const total = screens.length;
  const shot = screens[index];

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

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
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt ?? shot.title ?? `Screen ${index + 1}`}
            width={1024}
            height={1800}
            sizes="(max-width: 950px) 100vw, 950px"
            className={imageClassName}
            priority={index === 0}
          />
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous screen"
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/65 sm:left-4 sm:size-11"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next screen"
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/65 sm:right-4 sm:size-11"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {caption ? (
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          {caption}
        </p>
      ) : null}

      <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="Screen indicators">
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.title ?? s.alt ?? `screen ${i + 1}`}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-white"
                : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
