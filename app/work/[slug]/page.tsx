import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

// govos-esubmission has its own dedicated page at /app/work/govos-esubmission/
// so we exclude it here to avoid a duplicate build.
const customSlugs = new Set(["govos-esubmission"]);

export function generateStaticParams() {
  return projects
    .filter((p) => !customSlugs.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.client} — Molly Francis`,
    description: p.aiSummary,
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="page-shell">
      {/* HERO */}
      <header
        className="relative pt-8 pb-20 lg:pb-28 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${project.accent}18 0%, transparent 90%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-8 text-sm">
            <Link href="/work" className="link-underline text-ink/60">
              ← Back to work
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-ink/60">{project.client}</span>
          </div>

          <Reveal as="div">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
              {project.client} · {project.year}
            </p>
            <h1 className="font-serif text-hero max-w-4xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl text-ink/75 leading-relaxed">
              {project.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* META BAR */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 -mt-8 lg:-mt-12 mb-16">
        <Reveal
          as="div"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 p-6 lg:p-8 rounded-md bg-white border border-ink/10"
        >
          {[
            { l: "Role", v: project.role },
            { l: "Client", v: project.client },
            { l: "Year", v: project.year },
            {
              l: "Discipline",
              v: project.tags.slice(0, 2).join(" · "),
            },
          ].map((m) => (
            <div key={m.l}>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40 mb-2">
                {m.l}
              </p>
              <p className="font-serif text-lg leading-tight">{m.v}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* AI SUMMARY */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <Reveal
          as="div"
          className="relative p-8 lg:p-12 rounded-md bg-ink text-cream overflow-hidden"
        >
          <div
            className="absolute -top-10 -right-10 w-72 h-72 rounded-full blur-3xl opacity-60"
            style={{ background: project.accent }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-cream/15 text-xs font-mono">
                AI
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-cream/60">
                Generated summary
              </p>
            </div>
            <p className="font-serif text-2xl lg:text-3xl leading-snug max-w-3xl">
              {project.aiSummary}
            </p>
          </div>
        </Reveal>
      </section>

      {/* HERO IMAGE */}
      {project.hero && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
          <Reveal as="div" className="rounded-md overflow-hidden">
            <Image
              src={project.hero}
              alt={`${project.title} hero`}
              width={1600}
              height={1000}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="w-full h-auto"
              priority
            />
          </Reveal>
        </section>
      )}

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Overview
            </p>
          </Reveal>
          <Reveal as="div" className="lg:col-span-8 space-y-5">
            <p className="font-serif text-2xl leading-snug">
              {project.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM / APPROACH / OUTCOME */}
      {(project.problem || project.approach || project.outcome) && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <div className="grid lg:grid-cols-3 gap-10">
            {project.problem && (
              <Reveal as="div">
                <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
                  Problem
                </p>
                <p className="text-lg text-ink/80 leading-relaxed">
                  {project.problem}
                </p>
              </Reveal>
            )}
            {project.approach && (
              <Reveal as="div" delay={80}>
                <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
                  Approach
                </p>
                <p className="text-lg text-ink/80 leading-relaxed">
                  {project.approach}
                </p>
              </Reveal>
            )}
            {project.outcome && (
              <Reveal as="div" delay={160}>
                <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
                  Outcome
                </p>
                <p className="text-lg text-ink/80 leading-relaxed">
                  {project.outcome}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* METRICS */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <Reveal as="div">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-8">
              Impact
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.metrics.map((m, i) => (
                <Reveal
                  key={m.label}
                  as="div"
                  delay={i * 80}
                  className="p-7 rounded-md border border-ink/10 bg-white"
                >
                  <div className="font-serif text-4xl lg:text-5xl mb-3 leading-none">
                    {m.value}
                  </div>
                  <p className="text-sm text-ink/60">{m.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* RESEARCH */}
      {project.research && project.research.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Research methods
              </p>
              <h2 className="font-serif text-h1">What we learned, how.</h2>
            </Reveal>
            <Reveal as="div" className="lg:col-span-8">
              <ul className="space-y-3">
                {project.research.map((r, i) => (
                  <li
                    key={r}
                    className="flex gap-4 py-4 border-b border-ink/10"
                  >
                    <span className="font-mono text-[18px] text-ochre leading-none mt-1">
                      0{i + 1}
                    </span>
                    <span className="text-lg text-ink/80">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* IMAGES */}
      {project.images && project.images.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-8">
            Selected screens
          </p>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {project.images.map((img, i) => (
              <Reveal key={img.src} as="figure" delay={i * 60} className="space-y-3">
                <div className="rounded-md overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.caption || `${project.title} screen ${i + 1}`}
                    width={1200}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-auto"
                  />
                </div>
                {img.caption && (
                  <figcaption className="text-sm text-ink/60">
                    {img.caption}
                  </figcaption>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PROTOTYPE */}
      {project.prototype && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <Reveal
            as="div"
            className="rounded-md bg-ochre/10 p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Try it
              </p>
              <h3 className="font-serif text-h2">Live Figma prototype</h3>
            </div>
            <MagneticButton href={project.prototype} external>
              Open prototype ↗
            </MagneticButton>
          </Reveal>
        </section>
      )}

      {/* NEXT PROJECT */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 border-t border-ink/10">
        <Reveal as="div">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            Up next
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="group block py-12 border-y border-ink/15"
          >
            <div className="flex items-center justify-between gap-8">
              <div>
                <p className="text-sm text-ink/60 mb-2">{next.client}</p>
                <h2 className="font-serif text-hero group-hover:text-ochre transition-colors">
                  {next.title}
                </h2>
              </div>
              <span className="font-serif text-6xl lg:text-8xl group-hover:translate-x-4 transition-transform">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
