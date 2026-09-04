import { projects } from "@/lib/projects";
import CareGrid from "@/components/CareGrid";
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
      <section id="work" className={`${WORK_THUMB_SECTION} scroll-mt-32 py-16`}>
        <CareGrid projects={projects} />
      </section>

    </div>
  );
}
