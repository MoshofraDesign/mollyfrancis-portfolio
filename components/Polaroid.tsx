"use client";

import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  caption?: string;
  /** Tilt in degrees. Default 0. */
  rotate?: number;
  /** Aspect ratio of the photo area. Default 1 (square). */
  aspect?: number;
  className?: string;
  /** Lift-on-hover effect. Default true. */
  hover?: boolean;
  /** Solid color shown if no src is provided. Falls back to a soft cream. */
  placeholderColor?: string;
};

/**
 * White-framed polaroid card. Falls back to a tasteful color block if no image
 * is provided — so the layout reads cleanly even before assets are dropped in.
 */
export default function Polaroid({
  src,
  alt = "",
  caption,
  rotate = 0,
  aspect = 1,
  className = "",
  hover = true,
  placeholderColor = "#e9e3d6",
}: Props) {
  return (
    <figure
      className={`relative bg-white p-3 pb-5 shadow-[0_8px_24px_-12px_rgba(20,20,20,0.25)] transition-all duration-500 will-change-transform ${
        hover ? "hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_16px_36px_-12px_rgba(20,20,20,0.32)]" : ""
      } ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspect, background: placeholderColor }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink/30">
            <span className="text-xs uppercase tracking-[0.15em]">
              {alt || "photo"}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 px-1 text-center text-xs font-serif italic text-ink/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
