import V2Chrome from "@/components/v2/V2Chrome";
import HorizontalScroll from "@/components/v2/HorizontalScroll";

const opportunities = [
  "Lead / Principal / Staff design role",
  "Design system or design ops leadership",
  "0 → 1 product engagement (fractional)",
  "AI / agentic product strategy",
  "Workshop, audit, or expert review",
  "Speaking, panels, or mentorship",
];

const elsewhere = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/molly-francis-89041515/" },
  { label: "Dribbble", href: "https://dribbble.com/mollyfrancis" },
  { label: "Instagram", href: "https://www.instagram.com/moshofra/" },
];

export default function V2Contact() {
  return (
    <main className="relative bg-[#141414] text-[#f2f1ec]">
      <V2Chrome />

      <HorizontalScroll>
        {/* STATEMENT */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[64vw] shrink-0 flex-col justify-center gap-8 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Get in touch
          </p>
          <h1 className="font-display uppercase leading-[0.88] text-[13vw] sm:text-[6vw]">
            Tell me about
            <br />
            the problem.
          </h1>
          <p className="max-w-lg text-sm sm:text-base text-[#f2f1ec]/70">
            I&rsquo;ll tell you if I&rsquo;m the right designer for it. I read
            every message personally — no automated replies.
          </p>
        </section>

        {/* EMAIL CTA */}
        <a
          href="mailto:mfrancis7@mac.com"
          className="group flex h-[100dvh] w-[92vw] sm:w-[54vw] shrink-0 flex-col justify-center gap-4 border-l border-[#f2f1ec]/10 px-8 sm:px-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Or just email
          </p>
          <span className="font-display uppercase leading-[0.9] text-[9vw] sm:text-[3.6vw] transition-transform group-hover:translate-x-2">
            mfrancis7@mac.com →
          </span>
          <p className="text-sm text-[#f2f1ec]/50">
            Based in Austin, Texas (CT). Comfortable async, on-site for the
            right team.
          </p>
        </a>

        {/* INTERESTED IN */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[54vw] shrink-0 flex-col justify-center gap-8 border-l border-[#f2f1ec]/10 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Especially interested in
          </p>
          <ul className="space-y-3">
            {opportunities.map((o) => (
              <li
                key={o}
                className="font-display uppercase leading-[1] text-[6vw] sm:text-[2.2vw]"
              >
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* ELSEWHERE */}
        <section className="flex h-[100dvh] w-[86vw] sm:w-[38vw] shrink-0 flex-col justify-center gap-6 border-l border-[#f2f1ec]/10 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Elsewhere
          </p>
          <ul className="space-y-4">
            {elsewhere.map((e) => (
              <li key={e.label}>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display uppercase text-[8vw] sm:text-[2.8vw] leading-none hover:opacity-60 transition-opacity"
                >
                  {e.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </HorizontalScroll>
    </main>
  );
}
