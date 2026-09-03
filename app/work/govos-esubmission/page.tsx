import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import AutoplayVideo from "@/components/AutoplayVideo";
import SlideIn from "@/components/SlideIn";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import { NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

/**
 * GovOS eSubmission — horizontal case study built to match the Figma deck
 * (Portfolio › node 4345:713) rather than the site's standard vertical
 * case-study template.
 *
 * Figma spec this mirrors:
 *   • 1440 × 1000 panels on a solid #0091CF field
 *   • Jost — SemiBold 81/95 headers, Regular 32 body, sentence case
 *   • Small GovOS wordmark pinned at 100,100 on every panel after the first
 *   • Text panels (Problem, Solution, both benefits panels) anchor their
 *     950px column 100px from the left edge, vertically centered
 *   • Screen recordings sit in a macOS "Desktop Frame" (950 × 628, 10px
 *     radius, traffic-light title bar); the hero is a full laptop mockup
 *     exported from Figma with its screen content already baked in
 *
 * This route opts out of the shared Nav/Footer chrome — see SiteChrome.
 */

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const SLUG = "govos-esubmission";
const BRAND = "#0091CF";

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.client} — Molly Francis`,
    description: p.aiSummary,
  };
}

/**
 * Screen recordings are dropped into /public/work/govos/videos by hand.
 * Resolve a bare name to whichever extension is actually on disk — .mov
 * straight off a Mac screen recording works in Chrome and Safari, and .mp4
 * is preferred if both happen to exist. Returns null so the panel can skip
 * itself entirely until a file shows up.
 */
const VIDEO_EXTS = [".mp4", ".mov", ".webm", ".m4v"];

function findVideo(name: string): string | null {
  for (const ext of VIDEO_EXTS) {
    const src = `/work/govos/videos/${name}${ext}`;
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", src))) return src;
    } catch {
      // ignore — treated as "not found"
    }
  }
  return null;
}

/** True when a /public path exists, so a panel can skip an unexported image. */
function hasImage(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

// ── panel primitives ────────────────────────────────────────────────────────

function Panel({
  children,
  className = "",
  width = "lg:w-screen",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  // Full-viewport panels with equal fluid padding — content centered so
  // ultra-wide screens don’t leave a long empty trail after left-rail copy.
  return (
    <section
      className={`relative flex w-full flex-col justify-center gap-2 px-6 pt-[var(--nav-clear)] pb-6 sm:px-12 sm:pb-8 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:items-center lg:gap-0 lg:overflow-y-auto lg:overscroll-contain lg:px-[2.88rem] xl:px-[3.6rem] 2xl:px-[4rem] lg:pb-6 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Every text group shares one centered measure (~860px) so headings, body,
 * and bullets line up with media panels across the case study.
 */
const TEXT_W = "w-full max-w-[min(54rem,86vw)]";
const MEDIA_W = "w-full max-w-[min(950px,90vw)]";

/**
 * Keeps the last two words together so a line never ends on a lone orphan.
 * Joining them with a non-breaking space is the typographic fix — it lets the
 * browser rewrap freely at every other break point.
 */
function noOrphan(text: string) {
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return text;
  return `${words.slice(0, -1).join(" ")}\u00A0${words[words.length - 1]}`;
}

/**
 * Figma "Header Large": Jost SemiBold 81/95 on 1440 → ~5.6vw.
 *
 * clamp() wraps the vw scaling with hard min/max bounds — vw alone means a
 * 320px phone gets an unreadably small heading and a 3440px monitor gets an
 * absurdly large one. The vw value in the middle keeps the same fluid feel
 * within the normal viewport range; the clamp only kicks in at the extremes.
 */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn className={TEXT_W}>
      <h2 className="text-[2rem] sm:text-[2rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.6rem] 2xl:text-[4.05rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

/** Figma "Paragraph": fluid rem-like body that stays readable at extremes. */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn delay={120} className={TEXT_W}>
      <p className="mt-6 text-[1.05rem] sm:text-[1.05rem] md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.12rem] 2xl:text-[1.344rem] font-normal leading-[1.35] text-white [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </p>
    </SlideIn>
  );
}

/** Bullets cascade in one after another, behind the heading. */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={`mt-6 space-y-2 ${TEXT_W}`}>
      {items.map((b, i) => (
        <SlideIn
          key={b}
          as="li"
          delay={120 + i * 90}
          className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.12rem] 2xl:text-[1.344rem] font-normal leading-[1.35] text-white [text-wrap:pretty]"
        >
          {noOrphan(b)}
        </SlideIn>
      ))}
    </ul>
  );
}

/**
 * Full laptop mockup, exported from Figma with the eSubmission screen
 * already composited into the display — this is the hero's whole visual
 * (frame + screen content baked into one image), rendered at its native
 * aspect ratio rather than filled into a separate device-chrome wrapper.
 */
function Frame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[2034/1344] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 57vw"
        className="object-contain"
        priority
      />
    </div>
  );
}

/**
 * macOS "Desktop Frame" chrome from the Figma spec: a white rounded card
 * (10px radius, soft shadow) with a traffic-light title bar, wrapping each
 * screen recording. (A single silver-laptop-bezel treatment briefly
 * replaced this for every device on the page; reverted back to the
 * original per-frame browser chrome.)
 */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${MEDIA_W} overflow-hidden rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]`}>
      <div className="flex h-9 items-center gap-2 pl-3.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

/** Screen recording, in the BrowserFrame chrome. */
function VideoPanel({ src, caption }: { src: string | null; caption?: string }) {
  if (!src) return null;
  return (
    <Panel width="lg:w-screen" className="items-center">
      <BrowserFrame>
        <AutoplayVideo src={src} className="aspect-[950/592] w-full bg-black" />
      </BrowserFrame>
      {caption && (
        <p className="mt-5 text-center text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1.056rem] text-white/75">
          {caption}
        </p>
      )}
    </Panel>
  );
}

/**
 * Full-viewport text section — centered measure with equal fluid padding.
 */
function TextPanel({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="relative flex w-full justify-center px-6 pt-[var(--nav-clear)] pb-6 sm:px-12 sm:pb-8 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:items-center lg:overflow-y-auto lg:overscroll-contain lg:px-[2.88rem] xl:px-[3.6rem] 2xl:px-[4rem] lg:pb-6"
    >
      <div className={TEXT_W}>{children}</div>
    </section>
  );
}

/**
 * One "Challenges for the X" block inside the Problem panel — Figma gives
 * each a 40px semibold sub-head, 8px below it a 32px paragraph, and 40px
 * between the two blocks (applied by the caller via gap-[40px]).
 */
function ChallengeBlock({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: string;
}) {
  return (
    <div>
      <SlideIn delay={delay}>
        <h3 className="text-[1.15rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.5rem] font-semibold leading-tight text-white sm:text-[1.25rem] md:text-[1.25rem] lg:text-[1.408rem] xl:text-[1.76rem] 2xl:text-[2.112rem] [text-wrap:pretty]">
          {title}
        </h3>
      </SlideIn>
      <SlideIn delay={delay + 90}>
        <p className="mt-2 text-[1rem] sm:text-[1.36rem] md:text-[1.375rem] lg:text-[1.375rem] xl:text-[1.375rem] 2xl:text-[1.375rem] font-normal leading-[1.45] text-white sm:text-[1rem] md:text-[1rem] lg:text-[1.088rem] xl:text-[1.36rem] 2xl:text-[1.375rem] [text-wrap:pretty]">
          {noOrphan(children)}
        </p>
      </SlideIn>
    </div>
  );
}

/**
 * Circular portrait — the "meet the audience" panel that precedes each
 * benefits panel. Figma's canvas has this frame at the full 1440 width with
 * the 600px circle dead-centered — but as a horizontal-scroll beat between
 * two full-bleed text panels, a full-width slide read as too wide. Narrowed
 * to lg:w-[471px] xl:w-[589px] 2xl:w-[707px], matching the other non-full-bleed panels (Panel), with
 * the circle right-justified at lg+ so it sits toward the panel it's
 * leading into, rather than centered. Below lg it stays centered — there's
 * no adjacent panel bleeding into view there since the page is a normal
 * vertical scroll. Skips silently like CardPanel used to until the photo is
 * exported into /public.
 */
function PortraitPanel({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const hasPhoto = hasImage(src);
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-10 px-6 pt-[var(--nav-clear)] pb-6 sm:px-10 sm:pb-8 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-center lg:flex-row lg:justify-center lg:gap-[51px] xl:gap-[64px] 2xl:gap-[77px] lg:overflow-y-auto lg:overscroll-contain lg:px-[2.88rem] xl:px-[3.6rem] 2xl:px-[4rem] lg:pb-6">
      {hasPhoto && (
        <div className="relative aspect-square w-[234px] sm:w-[384px] md:w-[461px] lg:w-[614px] xl:w-[768px] 2xl:w-[922px] max-w-[260px] shrink-0 sm:w-[294px] md:w-[353px] lg:w-[471px] xl:w-[589px] 2xl:w-[707px] sm:max-w-[300px] lg:w-[min(28vw,300px)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1023px) 55vw, 22vw"
            className="rounded-full object-cover"
          />
        </div>
      )}
      <div className="w-full lg:w-auto lg:max-w-[389px] xl:max-w-[486px] 2xl:max-w-[584px] lg:shrink-0">{children}</div>
    </section>
  );
}

// ── page ────────────────────────────────────────────────────────────────────

export default function GovOSCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const idx = projects.findIndex((p) => p.slug === SLUG);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: BRAND, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      {/* Nav — small wordmark at the reference's scale. Hidden while the title
          panel's large logo is on screen, then rolls in and sticks. This route
          owns its chrome; see SiteChrome. */}
      <StickyNav
        watch="govos-title"
        logo={
          /* unoptimized: the optimizer passes SVGs through only with
             dangerouslyAllowSVG, and this is our own trusted asset */
          <Image
            src="/work/govos/govos-logo-white.svg"
            alt="GovOS"
            width={125}
            height={32}
            unoptimized
            className="h-auto w-[86px] sm:w-[110px]"
          />
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* 1 — TITLE: big wordmark, description bottom-left, laptop hero right.
            The nav watches this panel and stays hidden while it's in view.
            Below md (768px) the fixed 38%/57% split gets too narrow to be
            readable — logo and laptop stack full-width instead. That
            md:flex-row split is independent of the lg breakpoint below: a
            tablet in landscape (>=768, <1024) still gets the side-by-side
            layout even though the page overall is in vertical-scroll mode.
            Below lg the section is a normal full-width block with natural
            height; at lg+ it's the original fixed h-[100dvh] horizontal
            panel with its own internal overflow-y-auto safety net for a
            short/landscape viewport. */}
        <section
          id="govos-title"
          className="relative flex w-full flex-col md:flex-row md:items-center lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:overflow-y-auto lg:overscroll-contain"
        >
          {/* Padding matches the fixed nav's logo inset (pl-5/sm:pl-8/
              lg:pl-12, py-5/sm:py-7) so the large logo sits exactly where
              the small one fades/slides in — intentionally tighter than the
              other sections' text columns (pl-[100px]), same as the small
              logo once parked. h-full + justify-between (pinning the logo
              to the top and copy to the bottom) only makes sense once the
              section itself has a definite height, i.e. lg+ — below that
              it's a normal auto-height column and the two just stack with
              their own gap. */}
          <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 md:w-[38%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-12 lg:pt-11">
            <Image
              src="/work/govos/govos-logo-white.svg"
              alt="GovOS"
              width={508}
              height={130}
              priority
              unoptimized
              className="h-auto w-[65%] max-w-[300px] sm:w-[50%] md:w-[88%] md:max-w-[508px]"
            />
            {/* No reveal here — the title panel is what you land on, so its
                copy is simply present rather than animating in. */}
            <div>
              <p className="text-[1.341rem] sm:text-[1.75rem] md:text-[1.75rem] lg:text-[1.75rem] xl:text-[1.75rem] 2xl:text-[1.75rem] font-semibold leading-tight text-white sm:text-[1.2rem] md:text-[1.44rem] lg:text-[1.75rem] xl:text-[1.75rem] 2xl:text-[1.75rem] md:text-[12px] lg:text-[15px] xl:text-[19px] 2xl:text-[23px]">
                GovOS eSubmission
              </p>
              <p className="mt-4 max-w-[60ch] text-[0.975rem] sm:text-[1.2rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-normal leading-[1.4] text-white sm:text-[0.95rem] md:text-[1.056rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem] md:text-[8px] lg:text-[11px] xl:text-[13px] 2xl:text-[16px]">
                A cloud-based digital portal that allows external organizations, title
                companies, law firms, and individuals to securely submit official
                documents and records (such as land deeds or legal filings) directly to
                local government recording offices.
              </p>
            </div>
          </div>
          {/* Sized to leave breathing room on the right so the whole machine
              reads, rather than running off the edge — that margin only
              applies once it's sitting beside the text column at md+. */}
          <div className="w-full px-5 pb-10 sm:px-8 md:mr-[5%] md:w-[57%] md:px-0 md:pb-0">
            <Frame
              src="/work/govos/macbook-hero.png"
              alt="GovOS eSubmission dashboard — all submissions, statuses, and team at a glance"
            />
          </div>
        </section>

        {/* ── 2 — PROBLEM ──────────────────────────────────────────────── */}
        <Panel>
          <Heading>Recording a deed meant a vendor in the middle.</Heading>
          <Body>
            Counties scanned paper. Submitters paid a go-between. Nobody saw status
            until it cleared.
          </Body>
        </Panel>

        {/* ── 3 — SOLUTION ─────────────────────────────────────────────── */}
        <Panel>
          <Heading>I designed a direct-to-county portal.</Heading>
          <Body>
            Upload. Validate. Pay by ACH. The county gets clean data. The vendor is
            gone.
          </Body>
        </Panel>

        {/* 4 — REMEMBER THE USER — text removed, letting the recording carry it */}
        <VideoPanel
          src={findVideo("GovOS-MainScreens")}
          caption="Signing in and picking up a recent submission"
        />

        {/* 5 — SUBMISSION FLOW */}
        <Panel>
          <Heading>One task at a time.</Heading>
          <Body>A step-by-step package. Jump around, or save and come back.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-CreatePackage")}
          caption="Creating a package — walking through a submission end to end"
        />

        {/* 6 — USER INVITATIONS */}
        <Panel>
          <Heading>Invite a teammate in one modal.</Heading>
          <Body>Email, role, send. The old security loop is gone.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-InviteTeamMember")}
          caption="Inviting a teammate in a single modal"
        />

        {/* 7 — PAYMENT FULFILLMENT */}
        <Panel>
          <Heading>One ACH report. Per company. Per period.</Heading>
          <Body>The county authorizes the transfer. Reconciliation is a line, not a pile.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-Payments")}
          caption="Running and authorizing an ACH report"
        />

        {/* 8 — SUBMITTER BENEFITS — portrait + copy now share one panel, side by side */}
        <PortraitPanel
          src="/work/govos/submitter-portrait-2.png"
          alt="A title company submitter filing documents from her desk"
        >
          <Heading>Submitters drop the vendor fee.</Heading>
          <Body>One bulk ACH. Direct status. No go-between.</Body>
        </PortraitPanel>

        {/* 9 — COUNTY BENEFITS — portrait + copy now share one panel, side by side */}
        <PortraitPanel
          src="/work/govos/county-official-portrait.png"
          alt="A county recording official working at his desk"
        >
          <Heading>Counties stop scanning paper.</Heading>
          <Body>One clean report. Serve submitters directly.</Body>
        </PortraitPanel>

        {/* Outcome — before/after metrics */}
        <Panel width="lg:w-screen">
          <div className="flex w-full max-w-[950px] flex-col gap-[40px] text-white">
            {[
              ["Citizen Completion Rate", "42% to 86%"],
              ["Validation Errors", "34% to 8%"],
              ["Time Saved", "14.5min to 4.2 min"],
            ].map(([label, value], i) => (
              <SlideIn key={label} delay={i * 90}>
                <div className="flex flex-col gap-[5px]">
                  <p className="font-[Helvetica,Arial,sans-serif] text-white text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.331rem] xl:text-[1.664rem] 2xl:text-[1.875rem] font-normal leading-[1.25] lg:leading-[50px]">
                    {label}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="font-[Helvetica,Arial,sans-serif] text-white text-[1.75rem] sm:text-[1.75rem] md:text-[1.8rem] lg:text-[2.4rem] xl:text-[3rem] 2xl:text-[3.375rem] font-bold leading-[1.15] lg:leading-[50px] whitespace-nowrap">
                      {value}
                    </p>
                    <Image
                      src="/work/docsquad/down-triangle.svg"
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="size-6 shrink-0 rotate-180"
                    />
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </Panel>

        {/* 10 — PROTOTYPE */}
        {project.prototype && (
          <Panel width="lg:w-screen">
            <div className={TEXT_W}>
              <Heading>The Figma file.</Heading>
              <a
                href={project.prototype}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.96rem] 2xl:text-[1.1rem] text-white transition-opacity hover:opacity-60"
              >
                Open prototype ↗
              </a>
              {hasImage("/work/govos/tools-icons.png") && (
                <Image
                  src="/work/govos/tools-icons.png"
                  alt="Tools used: Figma, Lovable, Gemini, Jira, Miro, Pendo, UserTesting"
                  width={576}
                  height={48}
                  className="mt-10 h-8 w-auto sm:h-10"
                />
              )}
            </div>
          </Panel>
        )}

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} showProjected={false} />

        {/* 11 — NEXT */}
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
