"use client";

import { useEffect, useRef, createElement } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "figure" | "header" | "article" | "ul" | "li";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return createElement(
    as,
    {
      ref: ref as React.RefObject<HTMLElement>,
      className: `reveal ${className}`,
    },
    children
  );
}
