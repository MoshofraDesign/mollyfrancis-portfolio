import Link from "next/link";
import Image from "next/image";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
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

/** Readable text measure — ~860px at typical desktop, scales with vw. */
export const MEASURE = "w-full max-w-[min(54rem,86vw)]";
/** Media / screenshot cap. */
export const MEDIA = "w-full max-w-[min(950px,90vw)]";
/** @deprecated Prefer MEASURE — kept for existing imports. */
export const TEXT_W = MEASURE;

export const VIEW = "w-screen";

/**
 * Top inset so media never runs under the fixed Close control (always
 * visible, pt-5/sm:pt-7 in StickyNav) or the parked logo at lg+. Stepped per
 * breakpoint rather than fluid — was lg-only, so a centered panel narrower
 * than 1024px had zero clearance and could sit right under Close.
 */
export const NAV_CLEAR =
  "pt-16 sm:pt-20 lg:pt-[5.75rem] pb-10 sm:pb-12 lg:pb-10";

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
  const padLg =
    pad === "center"
      ? `items-center px-[clamp(1.25rem,4.5vw,4rem)] ${NAV_CLEAR}`
      : `px-0 ${NAV_CLEAR} pl-[100px] pr-[min(16%,120px)]`;

  return (
    <section
      id={id}
      className={`relative flex w-full flex-col justify-center gap-2 h-[100dvh] ${width} shrink-0 snap-center [justify-content:safe_center] overflow-y-auto overscroll-contain ${padLg} ${className}`}
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
      className={`relative flex w-full justify-center h-[100dvh] ${width} shrink-0 snap-start [align-items:safe_center] overflow-y-auto overscroll-contain px-[clamp(1.25rem,4.5vw,4rem)] ${NAV_CLEAR} ${className}`}
    >
      <div className={MEASURE}>{children}</div>
    </section>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn className={MEASURE}>
      <h2 className="text-[clamp(2rem,4.5vw,4.05rem)] font-semibold leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn delay={120} className={MEASURE}>
      <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal leading-[1.35] opacity-90 [text-wrap:pretty]">
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
}: {
  href: string;
  client: string;
  title: string;
  /** Next project accent — same solid color as homepage thumb hover. */
  accent?: string;
}) {
  const fg = contrastColor(accent);
  return (
    <Link
      href={href}
      className="group relative flex w-full flex-col justify-center h-[100dvh] w-[min(100vw,600px)] shrink-0 snap-start px-[clamp(1.25rem,4.5vw,2.5rem)] py-0"
      style={{ background: accent, color: fg }}
    >
      <div className="w-full max-w-[min(32rem,86vw)]">
        <p
          className="text-[clamp(0.95rem,1.2vw,1.1rem)] font-normal"
          style={{ color: fg, opacity: 0.55 }}
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
                <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-current/45">
                  The Team
                </h2>
                <ul className="mt-5 space-y-3 text-[clamp(1.05rem,1.35vw,1.25rem)] leading-snug">
                  {meta.team.map((row) => (
                    <li key={row}>{row}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-current/45">
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
                  <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-current/45">
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
              <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-current/45">
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
