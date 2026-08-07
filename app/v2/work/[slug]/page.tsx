import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import { contrastColor } from "@/lib/contrastColor";
import HorizontalScroll from "@/components/v2/HorizontalScroll";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.client} — Molly Francis`,
    description: p.aiSummary,
  };
}

function Statement({
  eyebrow,
  text,
  fg,
}: {
  eyebrow: string;
  text: string;
  fg: string;
}) {
  return (
    <section
      className="flex h-[100dvh] w-[92vw] sm:w-[56vw] shrink-0 flex-col justify-center gap-6 px-10 sm:px-16"
      style={{ color: fg }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
        {eyebrow}
      </p>
      <p className="font-display uppercase leading-[0.95] text-[9vw] sm:text-[4.2vw]">
        {text}
      </p>
    </section>
  );
}

// Heading + bullet list — used for Objective and any feature that lists
// discrete benefits instead of a paragraph (mirrors the Figma "Docsquad"
// deck's bulleted panels).
function BulletStatement({
  eyebrow,
  text,
  bullets,
  fg,
}: {
  eyebrow: string;
  text: string;
  bullets: string[];
  fg: string;
}) {
  return (
    <section
      className="flex h-[100dvh] w-[92vw] sm:w-[60vw] shrink-0 flex-col justify-center gap-8 px-10 sm:px-16"
      style={{ color: fg }}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
          {eyebrow}
        </p>
        <p className="mt-4 font-display uppercase leading-[0.95] text-[8vw] sm:text-[3.6vw]">
          {text}
        </p>
      </div>
      <ul className="space-y-3">
        {bullets.map((b, i) => (
          <li key={b} className="flex gap-4 text-base sm:text-xl">
            <span className="font-display opacity-50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="max-w-xl opacity-80">{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Full-bleed screenshot panel with a caption — used for problem/objective
// diagrams and feature screenshots.
function ImagePanel({
  src,
  alt,
  caption,
  fg,
}: {
  src: string;
  alt: string;
  caption?: string;
  fg: string;
}) {
  return (
    <section className="relative flex h-[100dvh] w-[92vw] sm:w-[60vw] shrink-0 flex-col justify-center gap-4 p-8 sm:p-14">
      <div className="relative h-[75%] w-full overflow-hidden rounded-2xl bg-white">
        <Image src={src} alt={alt} fill sizes="60vw" className="object-contain" />
      </div>
      {caption && (
        <p className="max-w-xl text-sm sm:text-base opacity-70" style={{ color: fg }}>
          {caption}
        </p>
      )}
    </section>
  );
}

// "Desktop Frame" video panel — a white rounded card with a macOS-style
// title bar, matching the Figma screen-recording panels. Falls back to a
// caption-only note if the video file hasn't been uploaded yet.
function VideoPanel({ src, caption }: { src: string; caption?: string }) {
  return (
    <section className="relative flex h-[100dvh] w-[92vw] sm:w-[66vw] shrink-0 flex-col items-center justify-center gap-4 p-8 sm:p-14">
      <div className="relative w-full max-w-[950px] overflow-hidden rounded-[10px] border border-white/20 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex h-9 items-center gap-2 border-b border-black/5 bg-[#f2f1ec] px-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <video
          src={src}
          className="aspect-[950/592] w-full bg-black"
          controls
          playsInline
          preload="metadata"
        />
      </div>
      {caption && <p className="max-w-xl text-center text-sm text-white/70">{caption}</p>}
    </section>
  );
}

export default function V2CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(project.accent);
  const fgSoft = fg === "#141414" ? "rgba(20,20,20,0.6)" : "rgba(242,241,236,0.65)";

  return (
    <main className="relative" style={{ background: project.accent }}>
      {/* HEADER — project name / close */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-5 sm:p-8"
        style={{ color: fg }}
      >
        <p className="font-display uppercase tracking-tight text-base sm:text-lg">
          {project.title}
        </p>
        <Link
          href="/v2"
          aria-label="Close case study"
          className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border transition-opacity hover:opacity-60"
          style={{ borderColor: fgSoft, color: fg }}
        >
          ×
        </Link>
      </div>

      <HorizontalScroll>
        {/* TITLE PANEL */}
        <section
          className="flex h-[100dvh] w-[92vw] sm:w-[70vw] shrink-0 flex-col justify-center gap-8 px-10 sm:px-16"
          style={{ color: fg }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
              {project.client} · {project.year}
            </p>
            <h1 className="mt-4 font-display uppercase leading-[0.88] text-[13vw] sm:text-[7vw]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg sm:text-xl opacity-80">
              {project.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.18em] opacity-60">
            <span>{project.role}</span>
            <span>{project.tags.slice(0, 3).join(" · ")}</span>
          </div>
        </section>

        {/* AI SUMMARY */}
        <Statement eyebrow="At a glance" text={project.aiSummary} fg={fg} />

        {/* OVERVIEW */}
        <Statement eyebrow="Overview" text={project.overview} fg={fg} />

        {/* PROBLEM */}
        {project.problem && (
          <Statement eyebrow="The problem" text={project.problem} fg={fg} />
        )}
        {(project.problemImages || []).map((img, i) => (
          <ImagePanel
            key={img.src}
            src={img.src}
            alt={img.caption || `${project.title} problem diagram ${i + 1}`}
            caption={img.caption}
            fg={fg}
          />
        ))}

        {/* OBJECTIVE */}
        {project.objective && (
          <BulletStatement
            eyebrow="The objective"
            text={project.objective}
            bullets={project.objectiveBullets || []}
            fg={fg}
          />
        )}

        {/* HERO IMAGE */}
        {project.hero && (
          <section className="relative flex h-[100dvh] w-[92vw] sm:w-[70vw] shrink-0 items-center justify-center p-8 sm:p-14">
            <div className="relative h-full w-full">
              <Image
                src={project.hero}
                alt={`${project.title} hero`}
                fill
                sizes="70vw"
                className="object-contain"
                priority
              />
            </div>
          </section>
        )}

        {/* APPROACH */}
        {project.approach && (
          <Statement eyebrow="The approach" text={project.approach} fg={fg} />
        )}

        {/* IMAGE PANELS (legacy flat list, used by projects without `features`) */}
        {(project.images || []).map((img, i) => (
          <ImagePanel
            key={img.src}
            src={img.src}
            alt={img.caption || `${project.title} screen ${i + 1}`}
            caption={img.caption}
            fg={fg}
          />
        ))}

        {/* FEATURES — text panel, optional screenshot, optional screen recording */}
        {(project.features || []).flatMap((f) => {
          const panels = [
            f.bullets && f.bullets.length > 0 ? (
              <BulletStatement
                key={`${f.heading}-text`}
                eyebrow={f.eyebrow}
                text={f.heading}
                bullets={f.bullets}
                fg={fg}
              />
            ) : (
              <section
                key={`${f.heading}-text`}
                className="flex h-[100dvh] w-[92vw] sm:w-[56vw] shrink-0 flex-col justify-center gap-6 px-10 sm:px-16"
                style={{ color: fg }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
                  {f.eyebrow}
                </p>
                <p className="font-display uppercase leading-[0.95] text-[8vw] sm:text-[3.6vw]">
                  {f.heading}
                </p>
                {f.body && <p className="max-w-xl text-base sm:text-lg opacity-80">{f.body}</p>}
              </section>
            ),
          ];
          if (f.image) {
            panels.push(
              <ImagePanel
                key={`${f.heading}-image`}
                src={f.image}
                alt={f.imageCaption || f.heading}
                caption={f.imageCaption}
                fg={fg}
              />
            );
          }
          if (f.video) {
            panels.push(
              <VideoPanel key={`${f.heading}-video`} src={f.video} caption={f.videoCaption} />
            );
          }
          return panels;
        })}

        {/* RESEARCH */}
        {project.research && project.research.length > 0 && (
          <section
            className="flex h-[100dvh] w-[92vw] sm:w-[56vw] shrink-0 flex-col justify-center gap-6 px-10 sm:px-16"
            style={{ color: fg }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
              How we learned it
            </p>
            <ul className="space-y-4">
              {project.research.map((r, i) => (
                <li key={r} className="flex gap-4 text-lg sm:text-2xl">
                  <span className="font-display opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-lg">{r}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* METRICS */}
        {project.metrics && project.metrics.length > 0 && (
          <section
            className="flex h-[100dvh] w-[92vw] sm:w-[60vw] shrink-0 flex-col justify-center gap-10 px-10 sm:px-16"
            style={{ color: fg }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
              Impact
            </p>
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display uppercase leading-none text-[9vw] sm:text-[3vw]">
                    {m.value}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm opacity-60">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OUTCOME */}
        {project.outcome && (
          <Statement eyebrow="The outcome" text={project.outcome} fg={fg} />
        )}

        {/* PROTOTYPE CTA */}
        {project.prototype && (
          <section
            className="flex h-[100dvh] w-[92vw] sm:w-[50vw] shrink-0 flex-col items-start justify-center gap-6 px-10 sm:px-16"
            style={{ color: fg }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-60">
              Try it
            </p>
            <h3 className="font-display uppercase text-[8vw] sm:text-[3.4vw] leading-[0.9]">
              Live Figma
              <br />
              prototype
            </h3>
            <a
              href={project.prototype}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
              style={{ borderColor: fgSoft }}
            >
              Open prototype ↗
            </a>
          </section>
        )}

        {/* NEXT PROJECT */}
        <Link
          href={`/v2/work/${next.slug}`}
          className="group relative flex h-[100dvh] w-[92vw] sm:w-[56vw] shrink-0 flex-col items-start justify-center gap-6 bg-[#141414] px-10 sm:px-16 text-[#f2f1ec]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Up next — {next.client}
          </p>
          <h2 className="font-display uppercase leading-[0.88] text-[11vw] sm:text-[5.5vw] transition-transform group-hover:translate-x-3">
            {next.title} →
          </h2>
        </Link>
      </HorizontalScroll>
    </main>
  );
}
