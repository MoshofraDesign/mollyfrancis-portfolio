import Link from "next/link";
import { contrastColor } from "@/lib/contrastColor";
import Image from "next/image";
import SlideIn from "@/components/SlideIn";
import {
  type CaseStudyMeta,
  toolIconSrc,
} from "@/lib/projects";

/**
 * Shared building blocks for full-viewport horizontal-scroll pages —
 * originally written for the project case-study template
 * (app/work/[slug]/page.tsx) and reused by app/about/page.tsx so both ride
 * the same HorizontalScroll/StickyNav mechanics GovOS introduced.
 *
 * Spacing model (inspired by karinasirqueira.com horizontal case studies):
 * each panel is a full viewport; content is centered with equal fluid
 * padding and a capped measure so ultra-wide screens don’t leave a long
 * empty trail after left-rail copy.
 */

/**
 * Side gutter for every case-study panel — 24px at the small end, 72px at
 * the cap, scaling continuously so it resizes across breakpoints instead of
 * stepping. This is the one inset panels should use: the pages had grown
 * five competing systems (a 4.5vw clamp here, 46/58/64px on GovOS and
 * Care.com, 71/89/107px on the hero rails, plus a spread of px-5/6/8 on
 * mobile), which is what made the grid read as misaligned page to page.
 *
 * Hero sections are the deliberate exception: their content is absolutely
 * positioned against Figma's 71/89/107px rail, so their inset is paired
 * with those left offsets and is left alone.
 */
export const GUTTER = "px-[clamp(1.5rem,4vw,4.5rem)]";

/* Content width scale — three steps, nothing in between. Each is capped in
 * vw as well as px so it still breathes inside the gutter on small screens. */
/** Readable text measure — ~860px at typical desktop, scales with vw. */
export const MEASURE = "w-full max-w-[min(54rem,86vw)]";
/**
 * Media / screenshot cap. `panel-media` (globals.css) centers it and, at
 * lg+, caps the images inside to the room left between the nav band and the
 * panel's bottom padding — so a short viewport scales the media down
 * instead of letting it overflow the panel.
 */
export const MEDIA = "panel-media mx-auto w-full max-w-[min(950px,90vw)]";
/** Wide multi-item rows — screen line-ups, component grids. */
export const WIDE = "w-full max-w-[min(1400px,92vw)]";
/** @deprecated Prefer MEASURE — kept for existing imports. */
export const TEXT_W = MEASURE;

export const VIEW = "lg:w-screen";

/**
 * Closing panel width — the prototype / Figma-file call to action that ends
 * each case study. These had drifted apart (full-viewport on GovOS and the
 * generic template, 36rem on Bright and Netspend), so the end of a project
 * landed differently depending on which one you were reading. One value now,
 * for all of them. 530px: the copy block is 24rem and the panel's gutters are
 * 72 a side, so 384 + 144 is the width at which the panel is exactly its
 * content and nothing reads as empty field. Went 800 -> 500 -> 600 -> 530 as
 * Molly narrowed it; the last step came from her seeing it still too wide
 * beside the GovOS numbers panel.
 */
export const END_PANEL = "lg:w-[min(100vw,530px)]";

/**
 * The content block on the closing prototype panel. These sections were
 * laying their copy out in the standard 54rem measure — wider than the panel
 * itself — so the title and button filled it edge to edge and the panel's own
 * width never read. 24rem sits inside the 600px panel's padding at every
 * width (600 less the 72px gutters leaves 456) and is wide enough to hold
 * "Live Figma prototype" on one line at the closing title's 36px; below lg,
 * where the panel is full-bleed, it's what keeps the block from stretching
 * across a tablet.
 *
 * text-center centres the title and the button on one axis. They were
 * left-aligned inside a centred block, so the pair sat off to one side of a
 * panel that is otherwise empty field. The button is inline-flex, so
 * text-align carries it too.
 */
export const END_MEASURE =
  "mx-auto w-full max-w-[min(24rem,86vw)] text-center";

/**
 * Closing-panel title. Deliberately well below the intro scale — this is a
 * call to action at the end of the case study, not a section opener, and at
 * the Heading scale it filled the panel on its own. 2.5vw lands on 36px at a
 * 1440 frame, the same size the Care.com hero title uses.
 *
 * GovOS and the generic template were on Heading, Bright and Netspend on
 * their own H_DISPLAY step scale; all four share this now.
 */
export const END_TITLE =
  "font-semibold leading-[1.278] tracking-[-0.02em] text-[1.5rem] sm:text-[1.75rem] lg:text-[clamp(1.5rem,2.5vw,2.25rem)]";

/**
 * Top inset so media never runs under the parked logo or the fixed Close
 * control. Both live in the --nav-clear band defined in globals.css, which
 * is the single source of truth — the logo is the deeper of the two, so
 * clearing it clears Close as well. The band is height-aware, so this inset
 * shrinks on short viewports instead of eating the content's room.
 *
 * Don't hardcode a stepped pt- here again: the parked logo sits 76px down on
 * a tall screen, so any fixed value smaller than that lets media scroll
 * underneath it.
 */
export const NAV_CLEAR =
  "pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-[var(--nav-clear)] lg:pb-6";

/** Keeps the last two words together so a line never ends on a lone orphan. */
export function noOrphan(text: string) {
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return text;
  return `${words.slice(0, -1).join(" ")} ${words[words.length - 1]}`;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.25em] opacity-60">{children}</p>
  );
}

/**
 * Fixed-height horizontal slice of the viewport at lg+, snapping —
 * below lg it's a normal full-width block in a vertically scrolling page.
 *
 * pad="center" (default): equal inset padding, content centered.
 * pad="rail": left content rail + peek padding (legacy).
 */
export function Panel({
  children,
  className = "",
  width = VIEW,
  pad = "center",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
  pad?: "rail" | "center";
  id?: string;
}) {
  // justify-[safe_center]: centers content when it fits, but falls back to
  // start-alignment (scrollable) once it overflows the fixed 100dvh height —
  // plain `justify-center` combined with `overflow-y-auto` silently clips
  // whatever overflows above the centered midpoint, since a scroll container
  // can't scroll to a negative offset. Bit us on LivePerson's image panels.
  // items-center is deliberately unprefixed: in the vertical stack below lg
  // it's what centers section media on tablet and phone.
  const padLg =
    pad === "center"
      ? `items-center ${GUTTER} ${NAV_CLEAR}`
      : `items-center ${GUTTER} ${NAV_CLEAR} lg:items-stretch lg:px-0 lg:pl-[100px] lg:pr-[min(16%,120px)]`;

  return (
    <section
      id={id}
      className={`relative flex w-full flex-col justify-center gap-2 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:[justify-content:safe_center] lg:gap-0 lg:overflow-y-auto lg:overscroll-contain ${padLg} ${className}`}
    >
      {children}
    </section>
  );
}

/** Full-viewport text section — centered measure. */
export function TextPanel({
  children,
  id,
  width = VIEW,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  width?: string;
  className?: string;
}) {
  // items-[safe_center]: same reasoning as Panel's justify-[safe_center] —
  // centers vertically when content fits, falls back to top-alignment
  // (scrollable) rather than silently clipping once content overflows.
  return (
    <section
      id={id}
      className={`relative flex w-full justify-center lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-start lg:[align-items:safe_center] lg:overflow-y-auto lg:overscroll-contain ${GUTTER} ${NAV_CLEAR} ${className}`}
    >
      <div className={MEASURE}>{children}</div>
    </section>
  );
}

/**
 * Intro type — the title and subtext on a project's first section. One pair
 * for every case study, so the openings read the same from project to
 * project. Sizes come from Figma (Care.com 4555:22849): Jost SemiBold 81/95
 * and Regular 32 on a 1440 frame, hence 5.625vw and 2.22vw.
 *
 * Section headings further down the page stay on the smaller Heading/Body
 * scale — the intro is deliberately the largest type on the page.
 */
export const INTRO_TITLE =
  "font-semibold leading-[1.173] tracking-[-0.02em] [text-wrap:pretty] text-[2rem] sm:text-[2.5rem] lg:text-[clamp(2rem,5.625vw,6.5rem)]";
export const INTRO_SUBTEXT =
  "font-normal leading-[1.35] [text-wrap:pretty] text-[1.05rem] sm:text-[1.05rem] lg:text-[clamp(1.05rem,2.22vw,2.25rem)]";

/**
 * Hero type — the client's name and the one-line description on a project's
 * landing panel. Deliberately smaller than the INTRO pair: that one is sized
 * against a full-width measure on the statement panel, while a hero puts its
 * copy in a narrow column beside the artwork, so 5.625vw of the whole
 * viewport lands enormous there (67px in GovOS's 372px column).
 *
 * Netspend's hero is the reference — 1.6/2/2.25rem title over
 * 0.9/1/1.125rem body — expressed as a clamp so it scales between those
 * steps instead of jumping at each breakpoint. Care.com's hero title is the
 * same 2.25rem ceiling, taken from its frame's 36px.
 */
export const HERO_TITLE =
  "font-semibold leading-[1.28] tracking-[-0.01em] [text-wrap:pretty] text-[1.375rem] sm:text-[1.5rem] lg:text-[clamp(1.5rem,2.5vw,2.25rem)]";
export const HERO_SUBTEXT =
  "font-normal leading-[1.45] [text-wrap:pretty] text-[0.95rem] sm:text-[1rem] lg:text-[clamp(0.95rem,1.25vw,1.125rem)]";

export function Heading({ children, intro = false }: { children: React.ReactNode; intro?: boolean }) {
  return (
    <SlideIn className={MEASURE}>
      <h2
        className={
          intro
            ? INTRO_TITLE
            : "text-[clamp(2rem,4.5vw,4.05rem)] font-semibold leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]"
        }
      >
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

export function Body({ children, intro = false }: { children: React.ReactNode; intro?: boolean }) {
  return (
    <SlideIn delay={120} className={MEASURE}>
      <p
        className={
          intro
            ? `mt-3 ${INTRO_SUBTEXT}`
            : "mt-3 text-[clamp(1.15rem,1.5vw,1.5rem)] font-normal leading-[1.4] opacity-90 [text-wrap:pretty]"
        }
      >
        {typeof children === "string" ? noOrphan(children) : children}
      </p>
    </SlideIn>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={`mt-6 space-y-2 ${MEASURE}`}>
      {items.map((b, i) => (
        <SlideIn
          key={b}
          as="li"
          delay={120 + i * 90}
          className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal leading-[1.35] opacity-90 [text-wrap:pretty]"
        >
          {noOrphan(b)}
        </SlideIn>
      ))}
    </ul>
  );
}

/** Shared “Up next” panel — narrower snap panel tinted with the next project’s accent (matches CareGrid thumb hover). */
export function NextProjectLink({
  href,
  client,
  title,
  accent = "#141414",
  variant = "panel",
  rail,
}: {
  href: string;
  client: string;
  title: string;
  /** Next project accent — same solid color as homepage thumb hover. */
  accent?: string;
  /**
   * "panel" is a scroller stop: a 600px-wide, full-height column that sits
   * alongside the case study's other panels. "band" is for the pages that
   * scroll vertically instead (Print, Logos) — full-bleed and only as tall
   * as its copy, since a 100dvh column 600px wide at the bottom of an
   * ordinary page is just a hole.
   */
  variant?: "panel" | "band";
  /** band only: the host page's own rail, so the copy lines up with it. */
  rail?: string;
}) {
  // Type colour follows the accent rather than being forced white. `accent`
  // is each project's own page background (the two that had drifted — GovOS
  // #70ACF4 vs its page's #0091CF, and athenahealth #1A17B7 vs #4800b5 — were
  // corrected in lib/projects.ts), so nine of the fourteen bands come out
  // white. The five bright ones — Logos #00EADA, Bright #FFAF00, Ecommerce
  // #A3CC00, Patient.io #00CCB7, Print #1EB571 — take ink instead: white sits
  // between 1.5:1 and 2.7:1 on those, and Molly chose to keep the colours
  // vivid rather than darken them to carry white.
  const fg = contrastColor(accent);
  const band = variant === "band";
  return (
    <Link
      href={href}
      className={
        band
          ? "group relative flex w-full flex-col justify-center py-12 sm:py-14 lg:py-16"
          : "group relative flex w-full flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:h-[100dvh] lg:w-[min(100vw,600px)] lg:shrink-0 lg:snap-start lg:px-[clamp(1.25rem,4.5vw,2.5rem)] lg:py-0"
      }
      style={{ background: accent, color: fg }}
    >
      <div
        className={
          band
            ? rail || "mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-20"
            : "w-full max-w-[min(32rem,86vw)]"
        }
      >
        {/* Full strength, not the 0.55 it was: on the nine dark accents fg is
            the same cream as the title below, so dropping the tint is what
            makes this read white rather than grey. On the five light accents
            (GovOS, Bright, Patient.io, Ecommerce, Logos) fg is ink — white
            would be unreadable on #00EADA or #A3CC00 — so those stay dark. */}
        <p
          className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal"
          style={{ color: fg }}
        >
          Up next — {client}
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.1] transition-transform group-hover:translate-x-3">
          {title} →
        </h2>
      </div>
    </Link>
  );
}

/**
 * End-of-case-study meta — Team / Timing / Projected in a row, Tools below.
 * Uses currentColor so it works on light and dark project accents.
 * Pass lightText when the page uses cream/white type on a dark or saturated field
 * so the mono Cursor mark inverts to white.
 */
/**
 * The section labels on the closing meta panel — "The Team", "Timing",
 * "Projected Numbers", "Tools Used". Sentence case rather than the small
 * letterspaced caps they used to be, one step larger, and semibold (600 is
 * the heaviest Jost weight every project loads, so font-bold would be
 * synthesised on some pages). One token, so all four stay identical on
 * every project.
 */
export const META_LABEL =
  "text-[clamp(1.15rem,1.5vw,1.35rem)] font-semibold leading-snug text-current/60";

export function CaseStudyMetaPanel({
  meta,
  lightText = true,
  showProjected = true,
}: {
  meta: CaseStudyMeta;
  lightText?: boolean;
  showProjected?: boolean;
}) {
  return (
    <Panel width={VIEW} pad="center">
      <div className={`${MEASURE} mx-auto`}>
        <SlideIn>
          <div className="flex flex-col gap-14 sm:gap-16">
            <div className={`grid gap-10 ${showProjected ? "sm:grid-cols-3" : "sm:grid-cols-2"} sm:gap-x-14 lg:gap-x-20`}>
              <div>
                <h2 className={META_LABEL}>
                  The Team
                </h2>
                <ul className="mt-5 space-y-3 text-[clamp(1.05rem,1.35vw,1.25rem)] leading-snug">
                  {meta.team.map((row) => (
                    <li key={row}>{row}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className={META_LABEL}>
                  Timing
                </h2>
                <ul className="mt-5 space-y-4">
                  {meta.timing.map((row) => (
                    <li key={`${row.value}-${row.label}`}>
                      <p className="text-[clamp(1.15rem,1.5vw,1.35rem)] font-semibold leading-tight">
                        {row.value}
                      </p>
                      <p className="mt-1.5 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-current/55">
                        {row.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {showProjected && (
                <div>
                  <h2 className={META_LABEL}>
                    Projected Numbers
                  </h2>
                  <ul className="mt-5 space-y-5">
                    {meta.projected.map((row) => (
                      <li key={`${row.value}-${row.label}`}>
                        <p className="text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                          {row.value}
                        </p>
                        <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-current/55">
                          {row.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h2 className={META_LABEL}>
                Tools Used
              </h2>
              <ul
                className={`mt-5 flex flex-row flex-wrap items-center ${
                  meta.toolIconBase ? "gap-10" : "gap-4 sm:gap-5"
                }`}
              >
                {meta.tools.map((name) => (
                  <li key={name} className="group relative">
                    <span
                      tabIndex={0}
                      aria-label={name}
                      className={`relative flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
                        meta.toolIconBase
                          ? "size-12"
                          : "size-9 sm:size-10"
                      }`}
                    >
                      <Image
                        src={toolIconSrc(name, meta.toolIconBase)}
                        alt=""
                        width={meta.toolIconBase ? 48 : 40}
                        height={meta.toolIconBase ? 48 : 40}
                        unoptimized
                        className={`size-full object-contain ${
                          name === "Cursor" && lightText ? "brightness-0 invert" : ""
                        }`}
                      />
                    </span>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition duration-150 after:absolute after:left-1/2 after:top-full after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-x-transparent after:border-t-neutral-900 after:content-[''] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                    >
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SlideIn>
      </div>
    </Panel>
  );
}
