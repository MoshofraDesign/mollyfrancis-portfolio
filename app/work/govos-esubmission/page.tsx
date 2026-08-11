import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects, getProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import AutoplayVideo from "@/components/AutoplayVideo";
import SlideIn from "@/components/SlideIn";
import StickyNav from "@/components/StickyNav";

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
  width = "lg:w-[68vw]",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  // Below lg (1024px) this is a normal, full-width block in a vertically
  // scrolling page — no scroll-jacking on touch, just stack top to bottom
  // like any other site. At lg+ it becomes the original fixed-height
  // horizontal panel: ${width} sets its slice of the viewport, wide right
  // padding opens the gutter to the next panel peeking in from the right,
  // and snap-center + overflow-y-auto/overscroll-contain are the same
  // safety nets as before for a short/landscape viewport. (Tried
  // `justify-[safe_center]` here for that edge case once — Tailwind doesn't
  // emit an arbitrary value for that keyword, so the class was silently
  // dropped and every panel fell back to top-aligned. Plain justify-center
  // is correct; `safe_center` was the bug.) pl-[100px], not a vw fraction,
  // so this panel's text starts at the exact same x as every other section
  // (and the nav logo) — matches Figma, where every Description frame sits
  // at x=100 regardless of its parent panel's width.
  return (
    <section
      className={`relative flex w-full flex-col justify-center gap-2 px-6 py-20 sm:px-12 sm:py-24 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:gap-0 lg:overflow-y-auto lg:overscroll-contain lg:px-0 lg:py-12 lg:pl-[100px] lg:pr-[16%] ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Every text group is capped at the same 950px measure — matching the
 * macOS "Desktop Frame" video width — so headings, body copy, and bullets
 * share one left-aligned column that lines up with the screen-recording
 * panels across all panels.
 */
const TEXT_W = "w-full max-w-[950px]";

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
      <h2 className="text-[clamp(1.75rem,7vw,2.75rem)] font-semibold leading-[1.17] tracking-[-0.01em] text-white sm:text-[clamp(2rem,4.4vw,5.5rem)] [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

/** Figma "Paragraph": Jost Regular 32 on 1440 → ~2.2vw. Trails the heading. */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn delay={120} className={TEXT_W}>
      <p className="mt-6 text-[clamp(1rem,3.4vw,1.375rem)] font-normal leading-[1.45] text-white sm:text-[clamp(1rem,1.7vw,1.375rem)] [text-wrap:pretty]">
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
          className="text-[clamp(1rem,3.4vw,1.375rem)] font-normal leading-[1.45] text-white sm:text-[clamp(1rem,1.7vw,1.375rem)] [text-wrap:pretty]"
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
    <div className="w-full max-w-[950px] overflow-hidden rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
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
    <Panel width="lg:w-[74vw]" className="items-center">
      <BrowserFrame>
        <AutoplayVideo src={src} className="aspect-[950/592] w-full bg-black" />
      </BrowserFrame>
      {caption && (
        <p className="mt-5 text-center text-[2.4vw] text-white/75 sm:text-[1.1vw]">
          {caption}
        </p>
      )}
    </Panel>
  );
}

/**
 * Full-viewport text section for Problem, Solution, and both benefits
 * panels — Figma anchors each of these 950px columns 100px from the left
 * edge (lg:px-[100px]), vertically centered. Panel's own width is a vw
 * fraction of the viewport with padding taken as a percentage of THAT
 * (already-reduced) width, so 950px is frequently unreachable there and
 * text wraps short of the frame — sizing directly off the full viewport
 * instead reaches 950px at any normal desktop width.
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
      className="relative flex w-full px-6 py-20 sm:px-12 sm:py-24 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:items-center lg:overflow-y-auto lg:overscroll-contain lg:px-[100px] lg:py-12"
    >
      <div className="w-full max-w-[950px]">{children}</div>
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
        <h3 className="text-[clamp(1.15rem,4.4vw,1.5rem)] font-semibold leading-tight text-white sm:text-[clamp(1.25rem,2.2vw,2.25rem)] [text-wrap:pretty]">
          {title}
        </h3>
      </SlideIn>
      <SlideIn delay={delay + 90}>
        <p className="mt-2 text-[clamp(1rem,3.4vw,1.375rem)] font-normal leading-[1.45] text-white sm:text-[clamp(1rem,1.7vw,1.375rem)] [text-wrap:pretty]">
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
 * to lg:w-[46vw], matching the other non-full-bleed panels (Panel), with
 * the circle right-justified at lg+ so it sits toward the panel it's
 * leading into, rather than centered. Below lg it stays centered — there's
 * no adjacent panel bleeding into view there since the page is a normal
 * vertical scroll. Skips silently like CardPanel used to until the photo is
 * exported into /public.
 */
function PortraitPanel({ src, alt }: { src: string; alt: string }) {
  if (!hasImage(src)) return null;
  return (
    <section className="relative flex w-full items-center justify-center px-6 py-14 sm:px-10 sm:py-16 lg:h-[100dvh] lg:w-[46vw] lg:shrink-0 lg:snap-center lg:justify-end lg:overflow-y-auto lg:overscroll-contain lg:py-12">
      <div className="relative aspect-square w-[60vw] max-w-[280px] sm:w-[46vw] sm:max-w-[360px] lg:w-[65%] lg:max-w-[420px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1023px) 55vw, 30vw"
          className="rounded-full object-cover"
        />
      </div>
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
      style={{ background: BRAND, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
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
        action={
          <Link
            href="/#work"
            aria-label="Back to work"
            // min-h/w-11 (44px) gives the link a proper touch target without
            // growing the visible "Close" chip — the padding is invisible,
            // just extra hit area.
            className="pointer-events-auto -m-3 flex min-h-11 min-w-11 items-center justify-center p-3 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-white transition-opacity hover:opacity-60"
          >
            Close
          </Link>
        }
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
          <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 md:w-[38%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-12">
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
              <p className="text-[clamp(1.1rem,5.5vw,1.75rem)] font-semibold leading-tight text-white sm:text-[clamp(1.1rem,3vw,1.75rem)] md:text-[1.5vw]">
                GovOS eSubmission
              </p>
              <p className="mt-4 max-w-[60ch] text-[clamp(0.95rem,4vw,1.2rem)] font-normal leading-[1.4] text-white sm:text-[clamp(0.95rem,2.2vw,1.2rem)] md:text-[1.05vw]">
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

        {/* ── 2 — PROBLEM: what county offices and submitters each run into
               under the old paper/vendor-heavy process ────────────────────── */}
        <TextPanel>
          <Heading>Problem</Heading>
          <div className="mt-[26px] flex flex-col gap-[40px]">
            <ChallengeBlock title="Challenges for the Counties" delay={0}>
              County offices still rely on fragmented, paper-heavy workflows for
              document submissions and vendor payments—causing delays, errors, and
              frustration for submitters.
            </ChallengeBlock>
            <ChallengeBlock title="Challenges for the Submitters" delay={180}>
              County document recording is plagued by expensive third-party vendors,
              limited document support, and disconnected workflows—resulting in tedious,
              error-prone payment reconciliation.
            </ChallengeBlock>
          </div>
        </TextPanel>

        {/* ── 3 — SOLUTION: the direct-to-county portal that replaces the
               vendor in the middle ───────────────────────────────────────── */}
        <TextPanel>
          <Heading>Solution</Heading>
          <div className="mt-[26px]">
            <SlideIn>
              <h3 className="text-[clamp(1.15rem,4.4vw,1.5rem)] font-semibold leading-tight text-white sm:text-[clamp(1.25rem,2.2vw,2.25rem)] [text-wrap:pretty]">
                A direct-to-county recording portal that cuts out the middleman.
              </h3>
            </SlideIn>
            <Bullets
              items={
                project.objectiveBullets || [
                  "Obviating the need for Submitters to physically present the documents in a county office",
                  "Enhancing the productivity of the Recorder's office by not having to scan the recording",
                  "Streamline payment into a bulk wire transfer (ACH) for each Submitter",
                ]
              }
            />
          </div>
        </TextPanel>

        {/* 4 — REMEMBER THE USER */}
        <Panel>
          <Heading>Remember the user to help with quick and compliant submissions.</Heading>
          <Body>
            Gives users a sense of place upon login by surfacing remembered submission
            types, recent history, and the ability to start where they left off.
          </Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-MainScreens")}
          caption="Signing in and picking up a recent submission"
        />

        {/* 5 — SUBMISSION FLOW */}
        <Panel>
          <Heading>A flow that helps business and government work efficiently.</Heading>
          <Body>
            Track your progress with a clear step-by-step flow that keeps you focused on
            one task at a time. Navigate between steps freely or save and return later.
          </Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-CreatePackage")}
          caption="Creating a package — walking through a submission end to end"
        />

        {/* 6 — USER INVITATIONS */}
        <Panel>
          <Heading>Simplified User Invitations</Heading>
          <Body>
            A single, intuitive modal replaced complex security loops, letting admins
            enter an email, assign a role, and send an invite in seconds. This cut
            onboarding friction and drastically reduced support tickets.
          </Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-InviteTeamMember")}
          caption="Inviting a teammate in a single modal"
        />

        {/* 7 — PAYMENT FULFILLMENT */}
        <Panel>
          <Heading>Payment Fulfillment and Reporting</Heading>
          <Body>
            Payments are processed via ACH. The county generates an ACH report by time
            period and title company, showing the total amount owed, then authorizes the
            transaction.
          </Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-Payments")}
          caption="Running and authorizing an ACH report"
        />

        {/* 8 — SUBMITTER BENEFITS */}
        <PortraitPanel
          src="/work/govos/submitter-portrait-2.png"
          alt="A title company submitter filing documents from her desk"
        />
        <TextPanel>
          <Heading>Submitter benefits</Heading>
          <Body>
            Submitters get a lighter, more direct process end to end: no vendor fee
            stacked on top of the recording fee, one bulk ACH transfer to track instead
            of many, and direct status updates and communication with the county — no
            go-between required.
          </Body>
        </TextPanel>

        {/* 9 — COUNTY BENEFITS */}
        <PortraitPanel
          src="/work/govos/county-official-portrait.png"
          alt="A county recording official working at his desk"
        />
        <TextPanel>
          <Heading>County benefits</Heading>
          <Body>
            Reconciliation gets simpler with one clean report per submitter, per period,
            and paper submissions drop as manual printing and scanning steps fall away.
            With the vendor gone, the county can serve submitters directly.
          </Body>
        </TextPanel>

        {/* 10 — PROTOTYPE */}
        {project.prototype && (
          <Panel width="lg:w-[46vw]">
            <Heading>Live Figma prototype</Heading>
            <a
              href={project.prototype}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[clamp(0.95rem,2.4vw,1.1rem)] text-white transition-opacity hover:opacity-60 sm:text-[1.05vw]"
            >
              Open prototype ↗
            </a>
            {/* Tool icons (Figma, Lovable, Gemini, Jira, Miro, Pendo,
                UserTesting) — Figma export, dropped in by hand like the
                screen-recording videos. Skips silently until it's there. */}
            {hasImage("/work/govos/tools-icons.png") && (
              <Image
                src="/work/govos/tools-icons.png"
                alt="Tools used: Figma, Lovable, Gemini, Jira, Miro, Pendo, UserTesting"
                width={576}
                height={48}
                className="mt-10 h-8 w-auto sm:h-10"
              />
            )}
          </Panel>
        )}

        {/* 11 — NEXT */}
        <Link
          href={`/work/${next.slug}`}
          className="group relative flex w-full flex-col justify-center bg-[#141414] px-6 py-20 text-white sm:px-12 sm:py-24 lg:h-[100dvh] lg:w-[56vw] lg:shrink-0 lg:snap-start lg:px-[7%] lg:py-0"
        >
          <p className="text-[clamp(0.95rem,2.2vw,1.1rem)] font-normal text-white/50 sm:text-[1vw]">
            Up next — {next.client}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.1] transition-transform group-hover:translate-x-3 sm:text-[4vw]">
            {next.title} →
          </h2>
        </Link>
      </HorizontalScroll>
    </main>
  );
}
