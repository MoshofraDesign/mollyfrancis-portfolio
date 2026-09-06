import { gridProjects, rootsProjects } from "@/lib/projects";
import CareGrid from "@/components/CareGrid";
import AiChallengesBand from "@/components/AiChallengesBand";
import { WORK_THUMB_SECTION } from "@/lib/workGrid";
import RotatingHero from "@/components/RotatingHero";
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
      <section id="work" className={`${WORK_THUMB_SECTION} scroll-mt-24 py-10 md:scroll-mt-28 md:py-12 lg:scroll-mt-32 lg:py-16`}>
        <CareGrid projects={gridProjects} />
      </section>

      {/* AI CHALLENGES ---------------------------------------------------
          Under the grid rather than in it: the side work gets a band of its
          own so it reads as separate from the client work. See
          AiChallengesBand, and offGrid in lib/projects.ts. */}
      <AiChallengesBand />

      {/* DESIGN ROOTS -----------------------------------------------------
          The graphic and web design work, in its own group. Same tiles at
          the same size as the grid above — a heading and the spacing do the
          separating, because the point of keeping this work on the site is
          range, and shrinking it would argue the opposite. The main grid
          deliberately has no heading of its own: this is the section that
          needs naming. */}
      <section
        id="roots"
        className={`${WORK_THUMB_SECTION} scroll-mt-24 pb-12 pt-14 md:scroll-mt-28 md:pb-16 md:pt-20 lg:scroll-mt-32 lg:pb-20 lg:pt-24`}
      >
        <div className="mb-8 max-w-[46rem] md:mb-10">
          <h2 className="font-jost text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
            Design Roots
          </h2>
          <p className="mt-2 font-jost text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.5] text-ink/70 [text-wrap:pretty]">
            Before product design I was a graphic and web designer &mdash;
            logos, storefronts and print. It&rsquo;s on the site because that
            craft still shapes how I work, and because when a project needs
            it, I don&rsquo;t have to hand it off.
          </p>
        </div>
        <CareGrid projects={rootsProjects} />
      </section>

    </div>
  );
}
