import Link from "next/link";
import { projects } from "@/lib/projects";
import CareGrid, { WORK_THUMB_SECTION } from "@/components/CareGrid";
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

      {/* WORK GRID -------------------------------------------------------
          Anchor for the "Work" nav item — jumps here instead of a separate
          /work route. Tiles are capped at 375px with gutters between them,
          so this shares the page's padded container like every other section. */}
      <section id="work" className={`${WORK_THUMB_SECTION} scroll-mt-24 py-16`}>
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
