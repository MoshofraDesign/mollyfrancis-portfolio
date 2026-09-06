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
import { GUTTER, NAV_CLEAR, HERO_TITLE, HERO_SUBTEXT, END_TITLE, END_MEASURE, NextProjectLink, CaseStudyMetaPanel, END_PANEL, CAPTION, PORTRAIT_CIRCLE, PORTRAIT_COPY, META_LABEL, STAT_ROW, StatRow, SUBHEAD, BODY_TYPE } from "@/components/v2/CaseStudyKit";

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
/* #0091CF is the brand blue, and white on it measures 3.53:1 — enough for
   large type, short of the 4.5:1 AA needs for body copy, and this page is
   mostly body copy. #00306B is 12.84:1. The work-grid tile and the "up
   next" band still use the accent from lib/projects.ts; the grid derives an
   accessible pair for its hover text on the fly (readableOnAccent). */
const BRAND = "#00306B";

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
      className={`relative flex w-full flex-col items-center justify-center gap-2 ${GUTTER} ${NAV_CLEAR} lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:gap-0 lg:overflow-y-auto lg:overscroll-contain ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Every text group shares one centered measure so headings, body and bullets
 * line up with media panels across the case study. 700px, the same value the
 * kit's MEASURE uses, so a text section is the same column on every project
 * — this page used to set its own 864.
 */
const TEXT_W = "w-full max-w-[min(700px,86vw)]";
const MEDIA_W = "w-full max-w-[min(950px,90vw)]";

/**
 * Width of a copy panel whose picture comes next — the measure plus the
 * rail, not a whole viewport.
 *
 * A 700px measure inside a full-viewport panel leaves a half-screen of
 * empty ground between a heading and the recording it introduces, so the two
 * read as unrelated. 920 = the measure plus the gutters this page's Panel
 * already applies.
 *
 * Only when the picture is what follows. A copy panel followed by another
 * copy panel stays full-viewport: two 920s sit in one view together, which
 * is the opposite problem.
 */
const COPY_PANEL = "lg:w-[min(100vw,920px)]";

/**
 * Width of a media panel — it hugs its own artwork.
 *
 * The clip is 950 wide at 950/592 inside the browser frame, so the panel
 * takes whichever is narrower of that and the width the aspect allows in the
 * height available, plus 9rem of gutter. Without it a 950px clip sat in a
 * full viewport and a wide monitor opened a field of empty ground after it;
 * without the 950 cap the clip would be drawn past its own resolution and go
 * soft, which is worse than being small.
 */
const CLIP_PANEL =
  "lg:w-[min(100vw,calc(950px_+_19rem),calc((var(--panel-media-max-h)_-_5rem)_*_1.6047_+_19rem))]";

/**
 * The extra gutter goes on the TRAILING edge of a media panel, so a group
 * reads as one thing: the heading sits tight against the recording it
 * introduces, and the space opens up after it, before the next group's
 * heading. Tight within, loose between.
 */
const CLIP_TRAIL = "lg:!pr-[16rem]";

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
      <h2 className="text-[clamp(2rem,4.5vw,4.05rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

/** Figma "Paragraph": fluid rem-like body that stays readable at extremes. */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn delay={120} className={TEXT_W}>
      <p className="mt-3 text-[clamp(1.25rem,1.6vw,1.65rem)] font-normal leading-[1.45] text-white [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </p>
    </SlideIn>
  );
}

/**
 * A customer quote, with its source.
 *
 * These two came off the project record and were rendering as ordinary body
 * paragraphs, which made them read as Molly's own sentences in quotation
 * marks. A quote earns its weight from the attribution — "a county said
 * this" is evidence, "this is easy to use" is a claim — so the source line
 * is part of the component, not optional.
 */
function Quote({ children, from }: { children: React.ReactNode; from: string }) {
  return (
    <SlideIn delay={200} className={TEXT_W}>
      <blockquote className="mt-6 border-l-2 border-white/30 pl-5">
        <p className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-normal italic leading-[1.45] text-white [text-wrap:pretty]">
          {children}
        </p>
        <footer className="mt-2 text-[clamp(1.05rem,1.25vw,1.25rem)] leading-[1.45] text-white/60">
          {from}
        </footer>
      </blockquote>
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
          className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-normal leading-[1.45] text-white [text-wrap:pretty]"
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
    <div
      className={`${MEDIA_W} overflow-hidden rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] lg:max-w-[min(950px,90vw,calc((var(--panel-media-max-h)_-_5rem)_*_1.6047))]`}
    >
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
    <Panel width={CLIP_PANEL} className={`items-center ${CLIP_TRAIL}`}>
      <BrowserFrame>
        <AutoplayVideo src={src} className="aspect-[950/592] w-full bg-black" />
      </BrowserFrame>
      {caption && (
        <p className={`mt-5 text-center ${CAPTION}`}>
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
      className={`relative flex w-full justify-center ${GUTTER} ${NAV_CLEAR} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:items-center lg:overflow-y-auto lg:overscroll-contain`}
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
        <h3 className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-semibold leading-[1.1] text-white text-[clamp(1.35rem,1.9vw,2rem)] [text-wrap:pretty]">
          {title}
        </h3>
      </SlideIn>
      <SlideIn delay={delay + 90}>
        <p className={`mt-2 text-white ${BODY_TYPE}`}>
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
    <section className={`relative flex w-full flex-col items-center justify-center gap-10 ${GUTTER} ${NAV_CLEAR} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-center lg:flex-row lg:justify-center lg:gap-[51px] xl:gap-[64px] 2xl:gap-[77px] lg:overflow-y-auto lg:overscroll-contain`}>
      {hasPhoto && (
        <div className={PORTRAIT_CIRCLE}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 320px, 280px"
            className="object-cover"
          />
        </div>
      )}
      <div className={`lg:shrink-0 ${PORTRAIT_COPY}`}>{children}</div>
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
            className="h-auto w-[104px] sm:w-[132px] lg:w-[148px]"
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
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Figma 4553:22013 — wordmark at 100,100 (494x127), the title and
              subtext beside it at 662,93 in a 450 column, and the laptop
              centred below at 240,329 / 961x560 (240 left, 239 right).
              Below lg it all stacks in source order. */}
          <div className="relative z-10 aspect-[508/130] w-[min(100%,300px)] sm:w-[min(100%,380px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:aspect-auto lg:h-[114px] lg:w-[445px]">
            <Image
              src="/work/govos/govos-logo-white.svg"
              alt="GovOS"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>

          {/* No reveal here — the title panel is what you land on, so its
              copy is simply present rather than animating in. */}
          <div className="relative z-10 flex flex-col gap-2 lg:absolute lg:left-[45.97%] lg:bottom-[calc(100%_-_164px)] lg:max-w-[min(450px,32vw)]">
            <p className={`text-white ${HERO_TITLE}`}>eSubmission</p>
            <p className={`max-w-[46ch] text-white ${HERO_SUBTEXT}`}>
              A secure digital portal for submitting official documents and
              records to local government recording offices.
            </p>
          </div>

          {/* Sized in --figma-u rather than a percentage of the panel:
              macbook-hero.png is 2034x1344 (1.5134) against the frame box's
              961x560 (1.716), so forcing the frame's height would crop it.
              Taking the frame's WIDTH and letting the asset's own aspect set
              the height keeps it whole, and u — pinned by whichever axis is
              tighter — means a short window shrinks it instead of running it
              off the bottom. Centred with a negative margin (half the width
              in the same unit), not a translate. */}
          <div className="relative z-0 mt-4 w-full lg:absolute lg:bottom-[4%] lg:left-1/2 lg:mt-0 lg:ml-[calc(-480.5_*_var(--figma-u))] lg:w-[calc(961_*_var(--figma-u))]">
            <Frame
              src="/work/govos/macbook-hero.png"
              alt="GovOS eSubmission dashboard — all submissions, statuses, and team at a glance"
            />
          </div>
        </section>

        {/* ── 2 — PROBLEM, and how it was looked into.
               Four text-only screens used to run before the first recording:
               problem, research, insight, decision. That's a lot of reading
               with nothing to look at, so the four are two.

               This one carries the problem and ends on the research, which
               is what earns the finding on the next screen. */}
        <Panel>
          <Heading>Recording a deed meant a vendor in the middle.</Heading>
          <Body>
            Counties scanned paper. Submitters paid a go-between. Nobody saw
            status until it cleared. So I interviewed both ends of it — the
            title companies sending documents and the county offices
            receiving them.
          </Body>
        </Panel>

        {/* ── 3 — THE FINDING, and the decision it led to. One thought:
               they wanted the middle gone, so the middle went. Pairs with
               the recording that follows, so this reads as one group rather
               than a third screen of type. */}
        <Panel width={COPY_PANEL}>
          <Heading>Both sides wanted the middle gone.</Heading>
          <Body>
            Submitters were paying a fee for status they still couldn&rsquo;t
            see. Counties were re-keying data that had already been typed
            correctly once. So I designed a direct-to-county portal: upload,
            validate, pay by ACH — clean data in, no go-between.
          </Body>
        </Panel>

        {/* 4 — REMEMBER THE USER — text removed, letting the recording carry it */}
        <VideoPanel
          src={findVideo("GovOS-MainScreens")}
          caption="Signing in and picking up a recent submission"
        />

        {/* 5 — SUBMISSION FLOW */}
        <Panel width={COPY_PANEL}>
          <Heading>One task at a time.</Heading>
          <Body>A step-by-step package. Jump around, or save and come back.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-CreatePackage")}
          caption="Creating a package — walking through a submission end to end"
        />

        {/* 6 — USER INVITATIONS */}
        <Panel width={COPY_PANEL}>
          <Heading>Invite a teammate in one modal.</Heading>
          <Body>Email, role, send. The old security loop is gone.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-InviteTeamMember")}
          caption="Inviting a teammate in a single modal"
        />

        {/* 7 — PAYMENT FULFILLMENT */}
        <Panel width={COPY_PANEL}>
          <Heading>One ACH report. Per company. Per period.</Heading>
          <Body>The county authorizes the transfer. Reconciliation is a line, not a pile.</Body>
        </Panel>
        <VideoPanel
          src={findVideo("GovOS-Payments")}
          caption="Running and authorizing an ACH report"
        />

        {/* 7.3 — TESTING. The other half of the research record that never
               made the page: rounds of moderated testing, and what they
               actually turned up. Numbers and tools are the project's own. */}
        <Panel>
          <Heading>Five users, twelve problems, every round.</Heading>
          <Body>
            Live usability testing in a QA environment with submitters,
            synthesized in Dovetail and triaged into Jira with the PM. Twelve
            or more issues a round — and the rounds kept going until they
            stopped finding them.
          </Body>
        </Panel>

        {/* 7.4 — ACCESSIBILITY / VPAT.
            Sits with the making, not after the results: for a government
            buyer, conformance is part of whether the product can be bought
            at all, and it was a constraint Molly designed to — so it belongs
            beside the other design decisions, before the outcomes. No
            conformance level or score is claimed, only that the bar shaped
            the work. */}
        <Panel>
          <Heading>A county can&rsquo;t buy what its staff can&rsquo;t use.</Heading>
          <Body>
            Public-sector procurement asks for a VPAT — a written account of how a
            product measures up against Section 508 and WCAG. That made
            accessibility a design constraint, not a cleanup pass.
          </Body>
          <Body>
            A keyboard path through every step of a submission. Fields and errors a
            screen reader can announce. Contrast that survives a county monitor, and
            focus that stays put inside a modal.
          </Body>
        </Panel>

        {/* 7.5 — CUSTOM ICONS. Its own copy beat first, like every other
            screen on this page: without one it followed the ACH recording
            directly, and two media panels back to back — both hugging their
            artwork — put two pictures in one view. */}
        <Panel width={COPY_PANEL}>
          <Heading>Every icon drawn, not downloaded.</Heading>
          <Body>
            Two sets — one for the CloudSearch kiosk, one for the GovOS
            portal — so every screen spoke the same visual language.
          </Body>
        </Panel>

        {hasImage("/work/govos/custom-icons.webp") && (
          <Panel
            width="lg:w-[min(100vw,calc(752px_+_19rem),calc((var(--panel-media-max-h)_-_1rem)_*_1.741_+_19rem))]"
            className={`items-center ${CLIP_TRAIL}`}
          >
            <SlideIn className="mx-auto flex w-full flex-col items-center lg:max-w-[min(752px,90vw,calc((var(--panel-media-max-h)_-_1rem)_*_1.741))]">
              <Image
                src="/work/govos/custom-icons.webp"
                alt="Two drawn icon sets — CloudSearch Kiosk and GovOS Portal"
                width={752}
                height={432}
                sizes="(max-width: 1023px) 90vw, min(90vw, 752px)"
                /* The sheet's own background is #041C4D, which is 1.28:1
                   against the new page colour — the card edge would simply
                   dissolve. A hairline draws it back. */
                className="h-auto w-full rounded-[10px] ring-1 ring-white/15"
              />
            </SlideIn>
          </Panel>
        )}

        {/* 8 — SUBMITTER BENEFITS — portrait + copy now share one panel, side by side */}
        <PortraitPanel
          src="/work/govos/submitter-portrait-2.png"
          alt="A title company submitter filing documents from her desk"
        >
          <Heading>Submitters drop the vendor fee.</Heading>
          <Body>One bulk ACH. Direct status. No go-between.</Body>
          <Quote from="Abstractor, Berks County">
            You could pull someone off the street and show them how to do
            this in about 20 minutes.
          </Quote>
        </PortraitPanel>

        {/* 9 — COUNTY BENEFITS — portrait + copy now share one panel, side by side */}
        <PortraitPanel
          src="/work/govos/county-official-portrait.png"
          alt="A county recording official working at his desk"
        >
          <Heading>Counties stop scanning paper.</Heading>
          <Body>One clean report. Serve submitters directly.</Body>
          <Quote from="Cuyahoga County Recorder&rsquo;s Office">
            A fantastic opportunity to more directly and better serve our
            title companies.
          </Quote>
        </PortraitPanel>

        {/* Outcome — three columns in a full-viewport section, the shape
            every other project's closing numbers use (Bright, Volusion,
            LivePerson, athenaConnect): label on META_LABEL, the figure on
            the display ratio. It used to be a narrow left-aligned stack in a
            585px panel with a direction triangle beside each figure — the
            triangle pointed the same way on all three even though completion
            went up while errors and time went down, and "42% to 86%" says
            the direction on its own. */}
        <Panel>
          <div className={STAT_ROW}>
            {/* The page's Heading carries the 700px TEXT_W measure, and this
                line wants ~810px at the display size, so it broke after
                "changed". Measure lifted and held on one row from lg up;
                below lg it wraps as before. */}
            <div className="lg:whitespace-nowrap lg:[&>*]:max-w-none">
              <Heading>What changed after launch.</Heading>
            </div>
            <StatRow
              className="text-white"
              items={[
                { label: "Citizen completion", value: "42% to 86%" },
                { label: "Validation errors", value: "34% to 8%" },
                { label: "Time to submit", value: "14.5min\u00a0to\u00a04.2min" },
              ]}
            />
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} showProjected={false} />

        {/* 10 — PROTOTYPE */}
        {project.prototype && (
          <Panel width={END_PANEL}>
            <div className={END_MEASURE}>
              <SlideIn>
                <h2 className={`text-white ${END_TITLE}`}>The Figma file.</h2>
              </SlideIn>
              <a
                href={project.prototype}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[clamp(1.05rem,1.25vw,1.25rem)] text-white transition-opacity hover:opacity-60"
              >
                Open prototype ↗
              </a>
              {hasImage("/work/govos/tools-icons.png") && (
                <Image
                  src="/work/govos/tools-icons.png"
                  alt="Tools used: Figma, Lovable, Gemini, Jira, Miro, Pendo, UserTesting"
                  width={576}
                  height={48}
                  className="mt-10 h-8 w-auto max-w-full object-contain sm:h-10"
                />
              )}
            </div>
          </Panel>
        )}


        {/* 11 — NEXT */}
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
