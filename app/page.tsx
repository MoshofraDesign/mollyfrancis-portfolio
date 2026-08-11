import Link from "next/link";
import { projects } from "@/lib/projects";
import CareGrid from "@/components/CareGrid";
import RotatingHero from "@/components/RotatingHero";
import Reveal from "@/components/Reveal";
import ScrollToWork from "@/components/ScrollToWork";

export default function Home() {
  return (
    <div className="page-shell min-h-screen bg-white">
      {/* Landing on "/" with a #work hash (Close buttons, Nav "Work" link
          from another page, footer, etc.) no longer snaps straight past
          the hero — see ScrollToWork for why. */}
      <ScrollToWork />

      {/* HERO ---------------------------------------------------------- */}
      <RotatingHero />

      {/* AI WORKFLOWS --------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal as="div" className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
              How I work, 2026
            </p>
            <h2 className="font-serif text-h1">
              Design plus a working AI stack.
            </h2>
          </Reveal>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "AI-augmented research",
                body: "Cluster, synthesize, and tag interview transcripts in hours, not weeks. I keep the rigor — the model handles the volume.",
              },
              {
                title: "Generative prototyping",
                body: "Lo-fi to hi-fi in a single afternoon. Faster discovery rounds; more options shown to stakeholders.",
              },
              {
                title: "Design system ops",
                body: "Token audits, accessibility checks, and component documentation generated and reviewed weekly.",
              },
              {
                title: "Workflow design for AI",
                body: "I also design the AI itself — surfacing trust, explainability, and fallbacks in products that use it.",
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                as="div"
                delay={i * 80}
                className="p-7 rounded-md bg-white/60 border border-ink/10 hover:border-ink/30 transition-colors"
              >
                <p className="font-mono text-[18px] text-ochre mb-3 leading-none">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl mb-3">{c.title}</h3>
                <p className="text-ink/70 leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK GRID -------------------------------------------------------
          Anchor for the "Work" nav item — jumps here instead of a separate
          /work route. Tiles are capped at 375px with gutters between them,
          so this shares the page's padded container like every other section. */}
      <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
        <div className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ink/50">
            Selected work, 2014 — 2026
          </p>
          <h2 className="font-serif text-h1">Case studies</h2>
        </div>
        <CareGrid projects={projects} />
      </section>

      {/* CTA STRIP ------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-12">
        <Reveal as="div" className="relative rounded-md bg-ink text-cream p-10 lg:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-ochre/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-6">
              Currently
            </p>
            <h3 className="font-serif text-h1 mb-6">
              Open to <em className="not-italic font-light text-ochre">Lead</em>,{" "}
              <em className="not-italic font-light text-ochre">Principal</em>, and{" "}
              <em className="not-italic font-light text-ochre">Staff</em> design roles.
            </h3>
            <p className="text-cream/80 mb-8 leading-relaxed">
              Healthcare, AI-native products, design system leadership, or anything where the right
              interaction quietly changes how someone&rsquo;s day goes. Let&rsquo;s talk.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:yo@mollyfrancis.com" className="magnetic bg-cream text-ink hover:bg-cream/90">
                yo@mollyfrancis.com →
              </a>
              <Link href="/contact" className="magnetic ghost border-cream/30 text-cream">
                Project inquiry
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
