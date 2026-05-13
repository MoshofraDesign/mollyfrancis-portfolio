import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Work — Molly Francis",
  description:
    "Selected case studies across healthcare, fintech, telehealth, and SaaS — with AI-enhanced summaries of each project.",
};

export default function WorkPage() {
  return (
    <div className="page-shell">
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-16">
        <Reveal as="div">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            Selected work, 2014 — 2026
          </p>
          <h1 className="font-serif text-hero max-w-4xl">
            Case studies in <em className="not-italic font-light text-ochre">healthcare</em>,{" "}
            <em className="not-italic font-light text-ochre">commerce</em>, and{" "}
            <em className="not-italic font-light text-ochre">SaaS</em> — each with an AI-generated
            summary of what shipped and why.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {projects
            .filter((p) => p.featured)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
          All projects
        </p>
        <div>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} variant="row" />
          ))}
        </div>
      </section>
    </div>
  );
}
