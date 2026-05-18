"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-cream/75 border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-24 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo variant="lockup" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                  active
                    ? "text-cream bg-ink"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 text-sm magnetic ghost"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
          Available for work
        </Link>

        {/* Mobile menu */}
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer w-10 h-10 grid place-items-center rounded-full border border-ink/20">
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block w-5 h-px bg-ink" />
              <span className="block w-5 h-px bg-ink" />
            </div>
          </summary>
          <div className="absolute right-0 mt-2 w-56 p-2 rounded-md bg-cream border border-ink/10 shadow-xl">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-3 py-2 rounded-sm text-sm hover:bg-ink hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </motion.header>
  );
}
