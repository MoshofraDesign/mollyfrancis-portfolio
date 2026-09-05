"use client";

import { useCallback, useEffect, useState } from "react";

type GalleryImage = { src: string; caption?: string };

/**
 * The Print page's masonry wall, with a click-to-enlarge overlay.
 *
 * CSS multi-column masonry: each piece keeps its own natural aspect ratio
 * (no forced crop) and the columns balance their heights the way a real
 * print portfolio wall would.
 *
 * Plain <img> rather than next/image, here and in the overlay: the true
 * source dimensions aren't available (the CDN isn't reachable from the build
 * environment), so letting the browser size each piece by its own aspect
 * ratio beats forcing every print piece into one guessed box.
 *
 * The overlay is a client concern — it needs state, Escape, and arrow keys —
 * which is why this whole section is a client component while the rest of
 * the page stays on the server.
 */
export default function PrintGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : images[open];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length]
  );

  // Escape closes, arrows page through. Bound only while the overlay is up,
  // so the page's own scroll keys are untouched the rest of the time.
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    // Freeze the page behind the overlay, and put the scrollbar's width back
    // as padding so the layout doesn't jump sideways as it disappears.
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open, close, step]);

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <figure key={img.src + i} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge ${img.caption || "print piece"}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-sm bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- see note above */}
              <img
                src={img.src}
                alt={img.caption || "Print piece"}
                loading="lazy"
                className="w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </button>
            {img.caption && (
              <figcaption className="mt-3 text-center text-xs text-[#141414]/60">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || "Print piece"}
          onClick={close}
          className="fixed inset-0 z-[60] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full text-2xl leading-none text-white/80 transition-opacity hover:opacity-60 sm:right-6 sm:top-6"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous piece"
                className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl leading-none text-white/70 transition-opacity hover:opacity-60 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next piece"
                className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl leading-none text-white/70 transition-opacity hover:opacity-60 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element -- see note above */}
          <img
            src={current.src}
            alt={current.caption || "Print piece"}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] cursor-default bg-white object-contain"
          />
          {current.caption && (
            <p className="max-w-[46rem] text-center text-sm text-white/70">
              {current.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
