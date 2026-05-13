import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/molly-francis-89041515/" },
  { label: "Dribbble", href: "https://dribbble.com/mollyfrancis" },
  { label: "Instagram", href: "https://www.instagram.com/moshofra/" },
  { label: "Email", href: "mailto:yo@mollyfrancis.com" },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-32 border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-widest text-ink/50 mb-6">
              Have a problem worth designing?
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight">
              Let&rsquo;s build
              <br />
              <em className="not-italic font-light text-ochre">something useful.</em>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="mailto:yo@mollyfrancis.com" className="magnetic">
                yo@mollyfrancis.com
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="magnetic ghost">
                Project inquiry form
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50 mb-3">
                Sitemap
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link className="link-underline" href="/">Index</Link></li>
                <li><Link className="link-underline" href="/work">Work</Link></li>
                <li><Link className="link-underline" href="/about">About</Link></li>
                <li><Link className="link-underline" href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50 mb-3">
                Elsewhere
              </p>
              <ul className="space-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      className="link-underline"
                      target="_blank"
                      rel="noreferrer"
                      href={s.href}
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversize closing wordmark */}
        <div
          aria-hidden="true"
          className="mt-20 select-none overflow-hidden leading-none"
        >
          <p className="font-serif text-[clamp(4rem,18vw,18rem)] tracking-[-0.05em] text-ink/90 whitespace-nowrap">
            Molly<span className="italic font-light text-ochre">.</span>{" "}
            <span className="italic font-light text-ink/40">Francis</span>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink/50">
          <p>
            © {new Date().getFullYear()} Molly Francis. Designed &amp; built in Austin, TX.
          </p>
          <p className="font-mono tracking-tight">
            v2026.05 · refreshed with care &amp; a little AI
          </p>
        </div>
      </div>
    </footer>
  );
}
