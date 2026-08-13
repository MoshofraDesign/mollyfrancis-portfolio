import { notFound } from "next/navigation";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import {
  MEASURE,
  MEDIA,
  VIEW,
  chunk,
  Eyebrow,
  Panel,
  TextPanel,
  Heading,
  Body,
  Bullets,
  NextProjectLink,
  CaseStudyMetaPanel,
} from "@/components/v2/CaseStudyKit";

/**
 * Shared horizontal-scroll case-study template — every project except
 * govos-esubmission (which has its own bespoke Figma-matched build at
 * /app/work/govos-esubmission/) runs through here. Mirrors the GovOS
 * page's mechanics (HorizontalScroll + StickyNav + snap panels) but is
 * driven entirely by each project's existing data in lib/projects.ts —
 * no per-project hand authoring. Page background is the project's own
 * accent color at full opacity (matching its homepage thumbnail overlay
 * color, just solid instead of blended over the thumbnail image), with
 * text color picked for contrast via lib/contrastColor. Shared panel
 * primitives (Panel/TextPanel/Heading/Body/Bullets/etc.) live in
 * components/v2/CaseStudyKit so app/about/page.tsx can reuse them too.
 */

const customSlugs = new Set(["govos-esubmission", "liveperson", "care-homepay", "netspend"]);

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

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

// ── work-specific panels (built on the shared kit from CaseStudyKit) ──────

function MetricsPanel({
  metrics,
}: {
  metrics: { label: string; value: string }[];
}) {
  return (
    <Panel width={VIEW} pad="center">
      <div className={`${MEASURE} mx-auto`}>
        <Heading>Impact</Heading>
        <div className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <SlideIn key={m.label} delay={120 + i * 90}>
              <div className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-none">
                {m.value}
              </div>
              <p className="mt-3 text-[clamp(0.85rem,1.1vw,1rem)] opacity-70">{m.label}</p>
            </SlideIn>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/** A handful of screens/photos in a grid, one panel per chunk of 4. */
function ImageGridPanel({
  images,
}: {
  images: { src: string; caption?: string }[];
}) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <div className={`mx-auto grid ${MEDIA} grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6`}>
        {images.map((img, i) => (
          <figure key={img.src + i} className="space-y-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={img.src}
                alt={img.caption || ""}
                fill
                sizes="(max-width: 768px) 45vw, 20vw"
                className="object-cover"
              />
            </div>
            {img.caption && (
              <figcaption className="text-xs opacity-70 [text-wrap:pretty]">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Panel>
  );
}

/**
 * Logos project only — every image *is* a mark, so instead of the cropped
 * screen-grid treatment above, lay them out the same way CareGrid lays out
 * the homepage (square tiles, same gutter/column formula) but with no
 * accent overlay and no separate SVG mark layer — just the logo itself,
 * plain, per the brief ("grid like homepage but no overlay or svg").
 */
function LogosGridPanel({
  images,
}: {
  images: { src: string; caption?: string }[];
}) {
  return (
    <Panel width={VIEW} pad="center">
      <div className={`mx-auto ${MEASURE}`}>
        <SlideIn>
          <h2 className="text-[clamp(2rem,4.5vw,4.05rem)] font-semibold leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]">
            Selected marks
          </h2>
        </SlideIn>
        <div
          className="mt-10 grid w-full justify-start gap-6 sm:gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
        >
          {images.map((img, i) => (
            <div
              key={img.src + i}
              className="relative aspect-square w-full overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.caption || "Logo mark"}
                fill
                sizes="300px"
                className="object-contain p-6"
              />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/** Title panel — logo, title + subtitle, hero (or thumbnail) image. */
function TitlePanel({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  const heroSrc = project.hero || project.thumbnail;
  return (
    <section
      id="title"
      className="relative flex w-full flex-col md:flex-row md:items-center lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:overflow-y-auto lg:overscroll-contain"
    >
      <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 md:w-[40%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-12">
        {project.logo ? (
          <div className="relative h-16 w-full max-w-[380px] sm:h-20 md:h-24">
            <Image
              src={project.logo}
              alt={project.client}
              fill
              unoptimized
              priority
              className="object-contain object-left"
              style={{ transform: `scale(${project.logoScale ?? 1})`, transformOrigin: "left center" }}
            />
          </div>
        ) : (
          <p className="text-[clamp(1.75rem,5vw,2.5rem)] font-semibold">
            {project.title}
          </p>
        )}
        <div>
          <Eyebrow>
            {project.client} · {project.year}
          </Eyebrow>
          <p className="mt-3 text-[clamp(1.1rem,5.5vw,1.75rem)] font-semibold leading-tight sm:text-[clamp(1.1rem,3vw,1.75rem)] md:text-[1.5vw]">
            {project.title}
          </p>
          <p className="mt-4 max-w-[60ch] text-[clamp(0.95rem,4vw,1.2rem)] font-normal leading-[1.4] opacity-90 sm:text-[clamp(0.95rem,2.2vw,1.2rem)] md:text-[1.05vw]">
            {project.subtitle}
          </p>
        </div>
      </div>
      <div className="w-full px-5 pb-10 sm:px-8 md:mr-[5%] md:w-[58%] md:px-0 md:pb-0">
        {heroSrc && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={heroSrc}
              alt={project.title}
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 55vw"
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ── page ────────────────────────────────────────────────────────────────────

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(project.accent);
  const isLogos = project.slug === "logos";

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: project.accent, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          project.logo ? (
            <div className="relative h-6 w-[90px] sm:h-7 sm:w-[110px]">
              <Image
                src={project.logo}
                alt={project.client}
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
          ) : (
            <span className="text-sm font-semibold">{project.title}</span>
          )
        }
        action={<CloseLink />}
      />

      <HorizontalScroll>
        <TitlePanel project={project} />

        {project.overview && (
          <TextPanel>
            <Heading>Overview</Heading>
            <Body>{project.overview}</Body>
          </TextPanel>
        )}

        {project.problem && (
          <TextPanel>
            <Heading>Problem</Heading>
            <Body>{project.problem}</Body>
          </TextPanel>
        )}

        {project.approach && (
          <TextPanel>
            <Heading>Approach</Heading>
            <Body>{project.approach}</Body>
          </TextPanel>
        )}

        {project.outcome && (
          <TextPanel>
            <Heading>Outcome</Heading>
            <Body>{project.outcome}</Body>
          </TextPanel>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <MetricsPanel metrics={project.metrics} />
        )}

        {project.research && project.research.length > 0 && (
          <TextPanel>
            <Heading>Research methods</Heading>
            <Bullets items={project.research} />
          </TextPanel>
        )}

        {project.images && project.images.length > 0 && isLogos && (
          <LogosGridPanel images={project.images} />
        )}

        {project.images && project.images.length > 0 && !isLogos &&
          chunk(project.images, 4).map((group, i) => (
            <ImageGridPanel key={i} images={group} />
          ))}

        {project.prototype && (
          <Panel width={VIEW} pad="center">
            <div className={`${MEASURE} mx-auto`}>
              <Heading>Live Figma prototype</Heading>
              <a
                href={project.prototype}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border px-8 py-3 text-[clamp(0.95rem,1.2vw,1.1rem)] transition-opacity hover:opacity-60"
                style={{ borderColor: `${fg}99` }}
              >
                Open prototype ↗
              </a>
            </div>
          </Panel>
        )}

        <CaseStudyMetaPanel
          meta={getCaseStudyMeta(project)}
          lightText={fg === "#f5f5f5"}
        />

        <NextProjectLink
          href={`/work/${next.slug}`}
          client={next.client}
          title={next.title}
          accent={next.accent}
        />
      </HorizontalScroll>
    </main>
  );
}
