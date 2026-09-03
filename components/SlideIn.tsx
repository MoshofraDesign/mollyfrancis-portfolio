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
 * Rolls content in along the scroll axis, holds it while the section sits in
 * the middle of the viewport, then rolls it out the far side as the section
 * leaves — so a panel arrives, settles, and departs in one continuous move
 * rather than sliding in and snapping back the way it came.
 *
 * Two things make that work:
 *
 * - Direction is read from where the element actually is, not from a
 *   scroll-direction guess. Content that hasn't arrived waits on the leading
 *   side; content that has already gone by sits on the trailing side. Scroll
 *   back and the motion runs in reverse for free.
 * - The observer's root is inset to the middle ~80% of the viewport, so the
 *   settled state covers the stretch where the section is centered, and the
 *   exit begins as it starts to leave rather than only once it's fully gone.
 *
 * The axis follows the layout: horizontal at lg+, where panels scroll side to
 * side, and vertical below lg, where the page is an ordinary vertical stack
 * (see HorizontalScroll) — a sideways drift there would fight the scroll.
 *
 * Honors prefers-reduced-motion by rendering static.
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
  // +1 = still to arrive (leading side), -1 = already gone by (trailing side).
  const [side, setSide] = useState(1);
  const [horizontal, setHorizontal] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setHorizontal(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting);

        // Which side is it on? Compare centers against the observed band so
        // the exit continues the way the scroll was going instead of
        // retreating back to where it came in from.
        const root = entry.rootBounds;
        if (!root) return;
        const box = entry.boundingClientRect;
        const past = horizontal
          ? box.left + box.width / 2 < root.left + root.width / 2
          : box.top + box.height / 2 < root.top + root.height / 2;
        setSide(past ? -1 : 1);
      },
      {
        // Inset to the middle of the viewport so "settled" means "centered".
        rootMargin: horizontal ? "0px -10% 0px -10%" : "-10% 0px -10% 0px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced, horizontal]);

  const offset = `${side * distance}px`;
  const rest = horizontal ? `translateX(${offset})` : `translateY(${offset})`;

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
            transform: shown ? "translate(0, 0)" : rest,
            transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            willChange: "opacity, transform",
          },
    },
    children
  );
}
