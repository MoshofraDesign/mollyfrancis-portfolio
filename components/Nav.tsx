"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaDribbble, FaInstagram, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  // Jumps straight to the thumbnail grid on the homepage rather than a
  // separate work-list route.
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

// Same set as the footer's social row (mollyfrancis.com), mirrored here so
// they're reachable without scrolling all the way down.
const socials = [
  { href: "https://www.linkedin.com/in/molly-francis-89041515/", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://dribbble.com/mollyfrancis", label: "Dribbble", icon: FaDribbble },
  { href: "https://www.instagram.com/moshofra/", label: "Instagram", icon: FaInstagram },
  { href: "mailto:yo@mollyfrancis.com", label: "Email", icon: FaEnvelope },
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
          ? "backdrop-blur-md bg-white/90 border-b border-ink/5"
          : "bg-white"
      }`}
    >
      <div className="w-full px-6 lg:px-10 h-24 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo variant="lockup" size={64} />
        </Link>

        {/* Menu, CTA, and mobile trigger travel together as one right-justified
            cluster rather than spreading across the bar. */}
        <div className="flex items-center gap-3">
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
                  className={`relative px-4 py-2 text-base rounded-full transition-colors ${
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

          {/* Social row — same links as the footer, kept reachable from the
              top on every page. */}
          <div className="hidden md:flex items-center gap-1 border-l border-ink/10 pl-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

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
              <div className="mt-1 flex items-center gap-1 border-t border-ink/10 px-3 pt-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink hover:text-cream"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </motion.header>
  );
}
