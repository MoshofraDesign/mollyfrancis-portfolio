"use client";

import { createElement, useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms — let a heading land before its body copy follows. */
  delay?: number;
  /** How far it travels, in px. */
  distance?: number;
  /** Element to render as — use "li" inside a list to keep the HTML valid. */
  as?: "div" | "li" | "span";
  /** Merged with the animation's own inline style (e.g. a dynamic max-width
   *  that can't be expressed as a static Tailwind class). */
  style?: React.CSSProperties;
};

/**
 * Slides content in from the right and fades it up as it enters the viewport,
 * then resets when it leaves so the move replays on the way back.
 *
 * Built for the horizontal case study: panels come in from the right, so the
 * copy drifting in along the same axis reads as part of the scroll rather than
 * a separate effect. Honors prefers-reduced-motion by rendering static.
 */
export default function SlideIn({
  children,
  className = "",
  delay = 0,
  distance = 56,
  as = "div",
  style: styleProp,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref: ref as React.RefObject<HTMLElement>,
      className,
      style: reduced
        ? styleProp
        : {
            ...styleProp,
            opacity: shown ? 1 : 0,
            transform: shown ? "translateX(0)" : `translateX(${distance}px)`,
            transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            willChange: "opacity, transform",
          },
    },
    children
  );
}
