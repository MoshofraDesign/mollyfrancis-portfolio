import Link from "next/link";
import Image from "next/image";
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
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
          Selected
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center sm:justify-items-start">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <Reveal key={p.slug} as="div" className="w-full max-w-[375px]">
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      sizes="375px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-ink/50 mb-2">
                      {p.client} · {p.year}
                    </p>
                    <h3 className="font-serif text-2xl leading-tight group-hover:text-ochre transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-ink/60 text-sm">{p.subtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
          All projects
        </p>
        <div>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
