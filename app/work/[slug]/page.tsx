import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta, nextProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import PrintGallery from "@/components/PrintGallery";
import SlideIn from "@/components/SlideIn";
import { contrastColor, readableOn } from "@/lib/contrastColor";
import {
  WORK_THUMB_GRID_CLASS,
  WORK_THUMB_SECTION,
  WORK_THUMB_TILE,
} from "@/lib/workGrid";
import {
  STAT_ROW,
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
  END_PANEL,
  END_TITLE,
  END_MEASURE,
  HERO_ROW,
  HERO_ROW_COPY,
  HERO_INSET_MD,
  BODY_TYPE,
  StatRow,
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

/* Hero and parked mark boxes, keyed by slug. Same rule as the Up next band:
   equal height with a width ceiling, since these marks run from wide
   wordmarks to stacked lockups and one box can't flatter both. */
const HERO_LOGO_BOX: Record<string, string> = {
  "bright-healthcare": "relative h-[5.5rem] w-full max-w-[520px] sm:h-28 md:h-36",
  default: "relative h-16 w-full max-w-[380px] sm:h-20 md:h-24",
};
const NAV_LOGO_BOX: Record<string, string> = {
  "bright-healthcare": "relative h-8 w-[130px] sm:h-9 sm:w-[150px]",
  /* athenaConnect's mark is a wide lockup that read small in the default
     box, so it gets its own — same rule as Bright's. */
  /* athenaConnect's mark is 8.6:1, so WIDTH is what binds inside an
     object-contain box, not height: at the default 90/110 it rendered only
     10-13px tall. 150/180 puts it at 17-21px, still well inside the 50px
     nav band. */
  athenaconnect: "relative h-8 w-[150px] sm:h-9 sm:w-[180px]",
  default: "relative h-6 w-[90px] sm:h-7 sm:w-[110px]",
};

/**
 * Slugs that have a page of their own under app/work/, and so must NOT be
 * pre-rendered from this template.
 *
 * This list is why /work/ai-challenges shipped as the generic gallery
 * layout: a static segment beats a dynamic one at request time, which is
 * what dev shows you — but generateStaticParams had already written a
 * pre-rendered file at that URL during the build, and in production that
 * file is what gets served. Adding a bespoke page and forgetting this list
 * is a silent failure that only appears once deployed.
 *
 * So the list reads the directory as well. The hardcoded names stay as the
 * floor: if the fs read ever comes back empty, they still keep the eleven
 * existing bespoke pages out, and the worst the fs half can do is exclude a
 * slug that has no page (which just 404s a project that had no page anyway).
 */
const BESPOKE_SLUGS = [
  "govos-esubmission",
  "liveperson",
  "care-homepay",
  "netspend",
  "bright-healthcare",
  "docsquad",
  "athenawell",
  "athenahealth",
  "patient-io",
  "volusion-admin",
  "athenaconnect",
  "ai-challenges",
];

function slugsWithOwnPage(): string[] {
  try {
    const dir = path.join(process.cwd(), "app", "work");
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("["))
      .filter((e) =>
        ["page.tsx", "page.ts", "page.jsx", "page.js"].some((f) =>
          fs.existsSync(path.join(dir, e.name, f)),
        ),
      )
      .map((e) => e.name);
  } catch {
    return [];
  }
}

const customSlugs = new Set([...BESPOKE_SLUGS, ...slugsWithOwnPage()]);

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
  className,
}: {
  metrics: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <Panel width={VIEW} pad="center" className={className}>
      <div className={`${STAT_ROW} mx-auto`}>
        <Heading>Impact</Heading>
        <StatRow items={metrics} />
      </div>
    </Panel>
  );
}

/** A handful of screens/photos in a grid, one panel per chunk of 4. */
function ImageGridPanel({
  images,
  className = "",
}: {
  images: { src: string; caption?: string }[];
  className?: string;
}) {
  return (
    <Panel width={VIEW} pad="center" className={`items-center ${className}`}>
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
 * The lede paragraph on the two gallery-style pages — the Logos overview and
 * the Print blurb. Up from the 1.05rem body ladder they were on (16.8px,
 * which read small under those big marks) but back a step from the 1.35/1.75
 * it briefly carried: 19.2px at a laptop width, 24px once there's room.
 * Leading opens slightly as the size comes down. Both pages share the token,
 * which is what keeps the two openings the same size.
 */
const LEDE = `leading-[1.2] ${BODY_TYPE}`;
/**
 * ...and the column it sits in. One width for both pages: Logos was on
 * 36rem and Print on 46rem, so the two openings didn't line up, and at
 * 36rem the Logos paragraph ran about 48 characters a line — under the 45-75
 * a measure wants. 50rem puts both at roughly 66.
 */
const LEDE_W = "max-w-[50rem]";

/**
 * Logos project only — square tiles matching the homepage work grid
 * (same rail, gutters and 4px radius), no accent overlay and no hover copy.
 *
 * No --nav-clear inset on top: this grid follows the title section in an
 * ordinary vertical page, so the 142px was buying nothing (the nav is fixed
 * — a section inset only clears it at the very top of the page) and left a
 * 166px hole under the paragraph.
 */
function LogosGridPanel({
  images,
}: {
  images: { src: string; caption?: string }[];
}) {
  return (
    <section className={`${WORK_THUMB_SECTION} pb-16 pt-6 sm:pt-8`}>
      <div className={WORK_THUMB_GRID_CLASS}>
        {images.map((img, i) => (
          <figure key={img.src + i} className={WORK_THUMB_TILE}>
            <Image
              src={img.src}
              alt={img.caption || "Logo mark"}
              fill
              sizes="375px"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
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
      className="relative flex w-full flex-col md:flex-row md:items-center lg:h-[100dvh] lg:w-[min(100vw,1280px)] lg:shrink-0 lg:snap-start no-scrollbar lg:overflow-y-auto lg:overscroll-contain"
    >
      <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 md:w-[40%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-[100px] lg:pt-[100px]">
        {project.logo ? (
          <div
            /* Per-project boxes because the marks aren't one shape: the
               default 380x96 fits a wide wordmark, but Volusion's lockup is
               738x294 (aspect 2.51), so object-contain fitted it by height
               and drew it 241 wide inside a 380 box. Its own taller box uses
               the width that was going spare. */
            className={HERO_LOGO_BOX[project.slug] ?? HERO_LOGO_BOX.default}
          >
            <Image
              src={project.logo}
              alt={project.client}
              fill
              unoptimized
              priority
              className="object-contain object-left"
              style={
                project.slug === "bright-healthcare"
                  ? undefined
                  : { transform: `scale(${project.logoScale ?? 1})`, transformOrigin: "left center" }
              }
            />
          </div>
        ) : (
          <p className="text-[clamp(1.9rem,2.4vw,2.6rem)] font-semibold">
            {project.title}
          </p>
        )}
        <div>
          <Eyebrow>
            {project.client} · {project.year}
          </Eyebrow>
          <p className="mt-3 text-[clamp(1.35rem,1.9vw,2rem)] font-semibold leading-[1.2]">
            {project.title}
          </p>
          <p className="mt-4 max-w-[60ch] text-[clamp(1.05rem,1.25vw,1.25rem)] font-normal leading-[1.4] opacity-90">
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

  const next = nextProject(project.slug);
  const isBright = project.slug === "bright-healthcare";
  /* readableOn, not contrastColor: this has to answer for the background
     that's actually painted, which is pageBg where a project declares one.
     contrastColor decides from a perceived-luminance threshold rather than a
     measured ratio, and picks the worse of white/ink on eight of the site's
     accents. */
  const fg = isBright ? "#ffffff" : readableOn(project.pageBg ?? project.accent);
  const isLogos = project.slug === "logos";
  const isPrint = project.slug === "print";
  const isEcommerce = project.slug === "ecommerce";

  if (isPrint) {
    const PRINT_BLURB =
      "Made entirely in the pre-AI days: Illustrator, a scanner, and a client who wanted the logo \u201cjust a little bigger.\u201d No prompts, no generations \u2014 just a lot of Cmd+Z.";
    return (
      <main
        className={`${jost.variable} relative min-h-screen bg-white text-[#141414]`}
        style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
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
                  className="object-contain object-left [filter:brightness(0)_invert(8%)]"
                />
              </div>
            ) : (
              <span className="text-sm font-semibold">{project.title}</span>
            )
          }
          action={<CloseLink large className="text-[#141414]" />}
        />

        <section
          id="title"
          className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 pb-10 pt-24 sm:px-12 sm:pt-28 lg:px-20 lg:pt-20"
        >
          {project.logo ? (
            <div className="relative h-20 w-full max-w-[480px] sm:h-24 md:h-32">
              <Image
                src={project.logo}
                alt="Print"
                fill
                unoptimized
                priority
                className="object-contain object-left [filter:brightness(0)_invert(8%)]"
              />
            </div>
          ) : null}
          {/* The subtitle isn't rendered here — the blurb below says it
              better, and the two stacked read as the same sentence twice.
              It still feeds the work grid tile and the page metadata. */}
          <p className={`${LEDE_W} ${LEDE}`}>
            {PRINT_BLURB}
          </p>
        </section>

        {project.images && project.images.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-8 pb-24 sm:px-12 lg:px-20">
            <PrintGallery images={project.images} />
          </section>
        )}

        {/* No meta panel here — the print pieces are the whole story, and a
            team/timing/projected block under them was generic filler. */}
        <NextProjectLink
          href={`/work/${next.slug}`}
          client={next.client}
          title={next.title}
          accent={next.accent}
          logo={next.logoWide ?? next.logo}
          logoScale={next.logoBandScale}
          variant="band"
          rail="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-20"
        />
      </main>
    );
  }


  if (isLogos) {
    return (
      <main
        className={`${jost.variable} relative min-h-screen bg-white text-[#141414]`}
        style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
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
                  className="object-contain object-left brightness-0 opacity-60"
                />
              </div>
            ) : (
              <span className="text-sm font-semibold">{project.title}</span>
            )
          }
          action={<CloseLink large className="text-[#141414]" />}
        />

        <section
          id="title"
          className={`${WORK_THUMB_SECTION} flex w-full flex-col gap-10 pb-6 pt-16 lg:pt-20`}
        >
          {project.logo ? (
            <div className="relative h-20 w-full max-w-[480px] sm:h-24 md:h-32">
              <Image
                src={project.logo}
                alt="Logos"
                fill
                unoptimized
                priority
                className="object-contain object-left brightness-0 opacity-80"
              />
            </div>
          ) : null}
          {project.overview ? (
            <p className={`${LEDE_W} ${LEDE}`}>{project.overview}</p>
          ) : null}
        </section>

        {project.images && project.images.length > 0 && (
          <LogosGridPanel images={project.images} />
        )}

        {/* No meta panel here — same as Print: the marks are the whole
            story, and a team/timing/projected block under them was generic
            filler. */}

        <NextProjectLink
          href={`/work/${next.slug}`}
          client={next.client}
          title={next.title}
          accent={next.accent}
          logo={next.logoWide ?? next.logo}
          logoScale={next.logoBandScale}
          variant="band"
          rail={WORK_THUMB_SECTION}
        />
      </main>
    );
  }

  if (isEcommerce) {
    // Figma 4926:14914. Frame 1 is a title panel; frame 2 is one long strip
    // of storefronts that the horizontal scroller carries you through.
    // Placement lives in .ecom-* in globals.css.
    const BG = "#F5F5F7";
    const FG = "#1d1d1f";
    // project.logo is the white wordmark, which is what the work tile needs
    // over the accent. On this light field use the black cut Molly exported
    // alongside it, rather than inverting the white one with a filter.
    const MARK = "/logos/ecommerce-websites-color.svg";
    const ASSET = "/work/ecommerce";

    // Molly exported every piece at the size the frame draws it, so these
    // dimensions are both the box and the file — no cropping, no guessed
    // aspect. In the frame's own order.
    const STRIP: { file: string; alt: string; w: number; h: number }[] = [
      { file: "bombshell", alt: "Bombshell Bath & Beauty", w: 950, h: 633 },
      { file: "danish-modern", alt: "Danish Modern Decor & Furniture", w: 950, h: 612 },
      { file: "vestidos", alt: "Vestidos Clothing", w: 950, h: 633 },
      { file: "stfrancis-home", alt: "St. Francis — homepage", w: 1241, h: 612 },
      { file: "stfrancis-category", alt: "St. Francis — dresses category", w: 1241, h: 616 },
      { file: "artistic-express", alt: "Artistic Express Art Supplies", w: 950, h: 633 },
      { file: "temptation", alt: "Temptation Bridal Shop", w: 950, h: 597 },
      { file: "venetian", alt: "The Venetian Point Loma", w: 1086, h: 643 },
      { file: "combi", alt: "Combi travel systems", w: 950, h: 658 },
      { file: "real-wasabi", alt: "Real Wasabi", w: 648, h: 613 },
      { file: "hillbilly-stills", alt: "Hillbilly Stills", w: 950, h: 633 },
      { file: "pewter", alt: "Pewter home essentials", w: 950, h: 633 },
      { file: "volusion-showcase", alt: "Volusion Store Showcase", w: 950, h: 633 },
      { file: "sweetgrass", alt: "Sweet Grass Farm", w: 950, h: 507 },
    ];

    const Mark = ({ className }: { className: string }) => (
      <div className={className}>
        <Image
          src={MARK}
          alt={project.client}
          fill
          unoptimized
          priority
          className="object-contain object-left"
        />
      </div>
    );

    return (
      <main
        className={`${jost.variable} relative`}
        style={{
          background: BG,
          color: FG,
          fontFamily: "var(--font-jost), system-ui, sans-serif",
        }}
      >
        <StickyNav
          watch="title"
          logo={
            /* Height is what binds this box: the mark is 455x142, so at
               lg:w-[160px] it would need 50px to fill the width — h-11 is
               the size you actually see (141x44 drawn, was 115x36). */
            <div className="relative h-8 w-[130px] sm:h-9 sm:w-[150px] lg:h-11 lg:w-[160px]">
              <Image
                src={MARK}
                alt={project.client}
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
          }
          action={<CloseLink large className="text-[#1d1d1f]" />}
        />

        <HorizontalScroll>
          {/* ── FRAME 1 — mark, 950x609 shot, 265-wide copy ──────────── */}
          <section
            id="title"
            className={`relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0`}
          >
            {/* Mark + copy are one wrapping row from tablet up — see HERO_ROW.
                The copy keeps order-3 so the stack below md is still
                mark / shot / copy even though it now sits next to the mark
                in the DOM. */}
            <div className={HERO_ROW}>
              <Mark className="ecom-mark relative h-[70px] w-full max-w-[300px] shrink-0 sm:h-[90px] sm:max-w-[380px]" />
              <p className={`ecom-copy order-3 max-w-[20rem] text-[clamp(1.05rem,1.25vw,1.25rem)] leading-[1.45] ${HERO_ROW_COPY}`}>
                Designing and coding ecommerce websites that seamlessly blend
                beautiful interfaces with robust, scalable functionality.
              </p>
            </div>
            <SlideIn className="ecom-shot order-2 w-full">
              <Image
                src={`${ASSET}/definition-home.webp`}
                alt="Definition — 2014 summer collection across devices"
                width={950}
                height={609}
                priority
                sizes="(min-width: 1024px) 950px, 100vw"
                className="h-auto w-full lg:h-full lg:object-cover"
              />
            </SlideIn>
          </section>

          {/* ── FRAME 2 — the storefronts as one long strip ───────────── */}
          <section className="relative flex w-full flex-col gap-10 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-auto lg:shrink-0 lg:snap-start lg:items-center lg:justify-center lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
            {/* No wordmark repeated here — the sticky nav carries it once
                you're past the title panel, and two marks read as a
                duplicate rather than as a second frame. */}
            {/* Stacked below lg. The gap steps up on tablet — at 40px the shots
                read as one continuous scroll rather than as separate pieces. */}
            <div className="ecom-strip flex w-full flex-col gap-10 sm:gap-14 md:gap-20 lg:w-auto lg:flex-row">
              {STRIP.map((piece, i) => (
                <SlideIn
                  key={piece.file}
                  delay={i < 2 ? i * 80 : 0}
                  className="ecom-strip-item w-full"
                  style={
                    { "--ew": piece.w, "--eh": piece.h } as React.CSSProperties
                  }
                >
                  <Image
                    src={`${ASSET}/${piece.file}.webp`}
                    alt={piece.alt}
                    width={piece.w}
                    height={piece.h}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 1000px, 100vw"
                    className="h-auto w-full lg:h-full lg:object-cover"
                  />
                </SlideIn>
              ))}
            </div>
          </section>

          {/* No meta panel — same call as Print and Logos. */}
          <NextProjectLink
            href={`/work/${next.slug}`}
            client={next.client}
            title={next.title}
            accent={next.accent}
            logo={next.logoWide ?? next.logo}
          logoScale={next.logoBandScale}
          />
        </HorizontalScroll>
      </main>
    );
  }

  // Whichever section renders first right after the title keeps the
  // original (larger) top gap; every section after that uses the
  // site-wide tightened spacing.
  const firstSectionKey =
    project.overview && project.slug !== "print"
      ? "overview"
      : project.problem
      ? "problem"
      : project.approach
      ? "approach"
      : project.outcome
      ? "outcome"
      : project.metrics && project.metrics.length > 0
      ? "metrics"
      : project.research && project.research.length > 0
      ? "research"
      : project.images && project.images.length > 0
      ? "images"
      : project.prototype
      ? "prototype"
      : null;
  const FIRST_GAP = "";

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: project.pageBg ?? project.accent, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          project.logo ? (
            <div
              className={NAV_LOGO_BOX[project.slug] ?? NAV_LOGO_BOX.default}
            >
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
        action={<CloseLink large className={isBright ? "text-white" : ""} />}
      />

      <HorizontalScroll>
        <TitlePanel project={project} />

        {project.overview && project.slug !== "print" && (
          <TextPanel className={firstSectionKey === "overview" ? FIRST_GAP : undefined}>
            <Heading intro>Overview</Heading>
            <Body intro>{project.overview}</Body>
          </TextPanel>
        )}

        {project.problem && (
          <TextPanel className={firstSectionKey === "problem" ? FIRST_GAP : undefined}>
            <Heading>Problem</Heading>
            <Body>{project.problem}</Body>
          </TextPanel>
        )}

        {project.approach && (
          <TextPanel className={firstSectionKey === "approach" ? FIRST_GAP : undefined}>
            <Heading>Approach</Heading>
            <Body>{project.approach}</Body>
          </TextPanel>
        )}

        {project.outcome && (
          <TextPanel className={firstSectionKey === "outcome" ? FIRST_GAP : undefined}>
            <Heading>Outcome</Heading>
            <Body>{project.outcome}</Body>
          </TextPanel>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <MetricsPanel
            metrics={project.metrics}
            className={firstSectionKey === "metrics" ? FIRST_GAP : undefined}
          />
        )}

        {project.research && project.research.length > 0 && (
          <TextPanel className={firstSectionKey === "research" ? FIRST_GAP : undefined}>
            <Heading>Research methods</Heading>
            <Bullets items={project.research} />
          </TextPanel>
        )}

        {project.images && project.images.length > 0 &&
          chunk(project.images, 4).map((group, i) => (
            <ImageGridPanel
              key={i}
              images={group}
              className={i === 0 && firstSectionKey === "images" ? FIRST_GAP : ""}
            />
          ))}

        {project.prototype && (() => {
          const isFigmaFile = /figma\.com\/(design|file)\//.test(project.prototype);
          return (
            <Panel width={END_PANEL} pad="center" className={firstSectionKey === "prototype" ? FIRST_GAP : undefined}>
              <div className={END_MEASURE}>
                <SlideIn>
                  <h2 className={END_TITLE}>{isFigmaFile ? "Explore the Figma file" : "Live Figma prototype"}</h2>
                </SlideIn>
                <a
                  href={project.prototype}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border px-8 py-3 text-[clamp(1.05rem,1.25vw,1.25rem)] transition-opacity hover:opacity-60"
                  style={{ borderColor: `${fg}99` }}
                >
                  {isFigmaFile ? "Open in Figma ↗" : "Open prototype ↗"}
                </a>
              </div>
            </Panel>
          );
        })()}

        <CaseStudyMetaPanel
          meta={getCaseStudyMeta(project)}
          lightText={isBright || fg === "#f5f5f5"}
        />

        <NextProjectLink
          href={`/work/${next.slug}`}
          client={next.client}
          title={next.title}
          accent={next.accent}
          logo={next.logoWide ?? next.logo}
          logoScale={next.logoBandScale}
        />
      </HorizontalScroll>
    </main>
  );
}
