import Link from "next/link";

const socials: {
  label: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/molly-francis-89041515/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-full h-full">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43A2.06 2.06 0 1 1 5.35 3.3a2.06 2.06 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/mollyfrancis",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-full h-full">
        <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm7.93 5.54a10.4 10.4 0 0 1 2.36 6.5c-.34-.07-3.78-.77-7.25-.34-.08-.18-.15-.35-.24-.53-.21-.5-.46-1.03-.71-1.54 3.83-1.56 5.58-3.81 5.84-4.09zm-1.37-1.5C18.34 4.42 16.74 6.5 13.1 7.9c-1.7-3.13-3.59-5.69-3.88-6.09 2.99-.72 6.13-.03 8.34 2.23zM7.65 2.55c.28.38 2.12 2.96 3.84 6.02-4.84 1.29-9.11 1.27-9.57 1.27a10.36 10.36 0 0 1 5.73-7.29zM1.62 12.02v-.31c.45.01 5.47.07 10.64-1.49.29.58.57 1.16.83 1.74-.13.04-.27.08-.4.12-5.34 1.72-8.18 6.43-8.42 6.83A10.34 10.34 0 0 1 1.62 12.02zm10.38 10.4c-2.34 0-4.5-.79-6.21-2.13.18-.39 2.32-4.49 8.16-6.52.02-.01.04-.01.07-.02 1.46 3.79 2.06 6.97 2.21 7.88-1.35.58-2.83.79-4.23.79zm5.8-1.65c-.1-.62-.66-3.66-2.02-7.4 3.27-.52 6.13.33 6.49.45a10.43 10.43 0 0 1-4.47 6.95z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/moshofra/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-full h-full">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.87 5.87 0 0 0-2.12 1.38A5.87 5.87 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.73 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.12c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.12A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:yo@mollyfrancis.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-full h-full">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    ),
  },
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
                <li><Link className="link-underline" href="/">Home</Link></li>
                <li><Link className="link-underline" href="/#work">Work</Link></li>
                <li><Link className="link-underline" href="/about">About</Link></li>
                <li><Link className="link-underline" href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink/50 mb-3">
                Social links
              </p>
              <ul className="flex items-center gap-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={s.href}
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex w-5 h-5 text-ochre hover:opacity-70 transition-opacity"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink/50">
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
