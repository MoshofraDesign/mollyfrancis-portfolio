"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import Link from "next/link";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
};

export default function MagneticButton({
  href = "#",
  children,
  variant = "solid",
  className = "",
  external = false,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "translate(0, 0)";
  };

  const klass = `magnetic ${variant === "ghost" ? "ghost" : ""} ${className}`;

  const inner = (
    <span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex"
      style={{
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      <span className={klass}>{children}</span>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {inner}
    </Link>
  );
}
