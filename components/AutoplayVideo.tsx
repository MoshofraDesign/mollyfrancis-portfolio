"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  /** Show native controls. Off by default for ambient, looping demo clips. */
  controls?: boolean;
};

/**
 * A muted, looping screen recording that plays only while it's on screen.
 *
 * Autoplaying every clip on mount would pull down every file at once — on a
 * horizontal case study that's several panels the visitor may never reach.
 * An IntersectionObserver starts playback when the panel scrolls into view
 * and pauses it on the way out, so only what's being looked at is loading.
 *
 * `muted` is required — browsers block autoplay with sound.
 */
export default function AutoplayVideo({
  src,
  className = "",
  controls = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect a visitor's reduced-motion preference: leave it paused and
    // give them controls implicitly via the element itself.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rewind so the clip always starts from the top when it comes back
          // into view, rather than resuming mid-flow from where it paused.
          el.currentTime = 0;
          // play() rejects if the browser still blocks autoplay — ignore.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
    />
  );
}
