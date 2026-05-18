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
        <div className="flex items-baseline justify-between mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
            Selected
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-ink/40 font-mono">
            {projects.filter((p) => p.featured).length} projects
          </p>
        </div>

        <div className="space-y-24 lg:space-y-36">
          {projects
            .filter((p) => p.featured)
            .map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={p.slug} as="article">
                  <Link
                    href={`/work/${p.slug}`}
                    className="group flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 items-center"
                  >
                    {/* image */}
                    <div
                      className={`relative aspect-square w-full max-w-[400px] flex-none overflow-hidden rounded-[8px] ${
                        reverse ? "lg:order-2" : ""
                      }`}
                    >
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="400px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* text */}
                    <div
                      className={`flex-1 min-w-0 ${
                        reverse ? "lg:order-1" : ""
                      }`}
                    >
                      <div className="flex items-baseline gap-4 mb-5">
                        <span className="font-mono text-[18px] text-ink/40 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
                          {p.client} · {p.year}
                        </span>
                      </div>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="pill">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-tight group-hover:text-ochre transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-5 text-lg text-ink/75 leading-relaxed max-w-prose">
                        {p.subtitle}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[0.22em]">
                        Read case study
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
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
