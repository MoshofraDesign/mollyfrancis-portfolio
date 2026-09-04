import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";
import { GUTTER, NAV_CLEAR, INTRO_TITLE, INTRO_SUBTEXT, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "Homepay Payroll — Care.com — Molly Francis",
  description:
    "Paired employee and employer apps so caregivers can track hours and household employers can review, approve, and pay payroll.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#025747";
const LOGO = "/logos/care-homepay.svg";
const ASSET = "/work/care-homepay";


/** Shared outer wrapper — full viewport, equal fluid padding, centered content */
function Panel({
  children,
  width = "lg:w-screen",
  className = "",
}: {
  children: React.ReactNode;
  width?: string;
  className?: string;
}) {
  return (
    <section
      className={`relative flex w-full flex-col items-center overflow-hidden ${GUTTER} ${NAV_CLEAR} lg:h-[100dvh] lg:shrink-0 lg:snap-start lg:justify-center lg:overflow-y-auto ${width} ${className}`}
    >
      {children}
    </section>
  );
}

export default function CareHomepayCaseStudy() {
  const project = getProject("care-homepay");
  const idx = projects.findIndex((p) => p.slug === "care-homepay");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);
  if (!project) return null;

  return (
    <main
      className={`${jost.variable} relative`}
      style={{
        background: ACCENT,
        color: fg,
        fontFamily: "var(--font-jost), system-ui, sans-serif",
      }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-8 w-[180px] sm:h-9 sm:w-[200px] lg:h-[50px] lg:w-[280px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>

        {/* ── PANEL 1: HERO — Figma 4555:22608
            Logo 100×100 → 474×112, headline at left:636,
            left phone inset 28.3%/30.28%, right phone 39.2%/54.31%,
            store badges at left:100 top:877. */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo. Figma 4555:22725 — 672x120 at left:100 top:100 on a
              1440x1000 frame, i.e. 46.67% wide at 6.94%/10%. It had been
              sitting at roughly 0.7x that. Width plus the mark's own 672:120
              ratio gives the height, so it holds at any viewport. */}
          <div className="relative h-[60px] w-[280px] sm:h-[80px] sm:w-[380px] lg:absolute lg:left-[6.94%] lg:top-[10%] lg:h-auto lg:aspect-[672/120] lg:w-[46.67%] lg:max-w-none">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Headline. Figma 4555:22842 — left:831 (57.7%), 455 wide (31.6%),
              left-aligned, Jost SemiBold 36/46. It sits just right of the
              logo, not pinned to the far edge: it had been right-anchored and
              right-aligned at roughly two thirds the size. 2.5vw is the 36px
              read at the 1440 frame width. */}
          <SlideIn className="self-end max-w-[340px] text-right lg:absolute lg:left-[57.7%] lg:right-auto lg:top-[11.4%] lg:w-[31.6%] lg:max-w-none lg:text-left">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[clamp(1.375rem,2.5vw,3rem)] lg:leading-[1.278]">
              Homepay Employee &amp; Employer Payroll App
            </p>
          </SlideIn>

          {/* Two phones — mobile stack; at lg they're absolute and anchored to
              the panel's bottom edge rather than placed by a top %. The
              exports are cropped at the phone's midpoint, so they're meant to
              run into the bottom of the panel; a top % left them ending short
              of it, with a strip of background showing underneath. Anchoring
              the bottom also keeps the stagger for free — the two images have
              different heights, so the left one still rides higher. */}
          <div className="mt-4 flex flex-1 items-end justify-center gap-4 sm:gap-8 lg:mt-0 lg:contents">
            <SlideIn
              delay={80}
              className="w-[46%] max-w-[280px] lg:absolute lg:bottom-0 lg:left-[28.47%] lg:w-[27.53%] lg:max-w-none"
            >
              <Image
                src={`${ASSET}/phone-hero-left.png`}
                alt="HomePay splash — Time tracking has never been easier"
                width={397}
                height={695}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
            <SlideIn
              delay={180}
              className="mt-10 w-[46%] max-w-[280px] sm:mt-16 lg:absolute lg:bottom-0 lg:left-[51.67%] lg:mt-0 lg:w-[28.26%] lg:max-w-none"
            >
              <Image
                src={`${ASSET}/phone-hero-right.png`}
                alt="HomePay splash — Easy time tracking with your employer"
                width={407}
                height={611}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
          </div>

          {/* App store badges — Figma left:100 top:877 */}
          <div className="mt-6 flex items-center gap-4 lg:absolute lg:bottom-[7.3%] lg:left-[6.94%] lg:mt-0">
            <Image
              src={`${ASSET}/google-play.svg`}
              alt="Google Play"
              width={50}
              height={50}
              unoptimized
              className="size-[50px]"
            />
            <Image
              src={`${ASSET}/app-store.svg`}
              alt="App Store"
              width={50}
              height={50}
              unoptimized
              className="size-[50px]"
            />
          </div>
        </section>

        {/* ── PANEL 2: STATEMENT — Figma 4555:22849 ──────────────────────
            Copy block at left:100 (6.94%), 950 wide (66%), centred on the
            panel with a +43px nudge. Type is Jost SemiBold 81/95 and Regular
            32 at the 1440 frame, so 5.625vw and 2.22vw. The frame carries a
            single Care.com mark, up in the nav slot — the second one that sat
            above the heading isn't in the design. */}
        <Panel width="lg:w-screen">
          <div className="w-full lg:absolute lg:left-[6.94%] lg:top-[calc(50%+43px)] lg:w-[66%] lg:-translate-y-1/2">
            <SlideIn>
              <h1 className={`text-white ${INTRO_TITLE}`}>
                HomePay Time Tracker app by Care.com
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-4 text-white ${INTRO_SUBTEXT}`}>
                HomePay lets household employees like nannies and caregivers
                track daily hours, calculate overtime, and submit timesheets
                directly to employers. Employers review and approve submitted
                hours through their online portal for direct deposit payroll
                processing.
              </p>
            </SlideIn>
            <SlideIn delay={200} className="mt-4">
              <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[1rem] sm:text-[1rem] lg:text-[clamp(0.95rem,1.667vw,1.75rem)]">
                0 &gt; 1
              </span>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: VIDEO ─────────────────────────────────────────── */}
        <Panel width="lg:w-screen" className="items-center">
          {/* Figma 4555:22858 — 868x688 centred, i.e. 60.28% of the frame.
              It had been running at the 950px media cap with a drop shadow
              that read as a pale rectangle against the green; the frame has
              neither the shadow nor the rounded corner. */}
          <SlideIn className="mx-auto w-full max-w-[min(950px,90vw)] lg:w-[60.28%] lg:max-w-none">
            <div className="relative aspect-[868/688] w-full overflow-hidden">
              <AutoplayVideo
                src={`${ASSET}/videos/care-employee.mp4`}
                className="h-full w-full object-cover"
              />
            </div>
          </SlideIn>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS — Figma 4555:22859 ──────────────
            Three 276x600 screens with 50px between them, 928 wide at x:258.
            They were one composite export with a coral background baked into
            the gaps; these are Molly's separate transparent exports, so the
            panel colour shows between them as the frame intends. */}
        <Panel width="lg:w-screen" className="items-center">
          <SlideIn className="mx-auto grid w-full max-w-[min(950px,90vw)] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-[5.39%] lg:w-[64.44%] lg:max-w-none">
            {[
              { n: 1, alt: "Add time — day picker" },
              { n: 2, alt: "Hours worked — weekly view" },
              { n: 3, alt: "Timesheet — totals and submit" },
            ].map(({ n, alt }) => (
              <Image
                key={n}
                src={`${ASSET}/screens-timesheet-${n}.png`}
                alt={alt}
                width={276}
                height={600}
                className="mx-auto h-auto w-full max-w-[276px] sm:max-w-none"
              />
            ))}
          </SlideIn>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING — Figma 4555:22862 ───────────────
            Copy column at left:165 (11.46%), 368 wide, sitting 170 up from the
            bottom; portrait 320 square; screens 604 wide, centred 162.74px
            right of the panel's middle. Title Jost SemiBold 36/46, body
            Regular 18 — 2.5vw and 1.25vw at the 1440 frame.

            The columns had been a centred 1100px two-up, which pushed the copy
            and the screens out toward the panel edges — close enough to the
            neighbouring panel that the two read as one crowded section while
            scrolling between them. The frame's margins are much wider. */}
        <Panel width="lg:w-screen">
          <div className="mx-auto flex w-full max-w-[min(1100px,94vw)] flex-col items-center gap-10 lg:block lg:max-w-none">
            <SlideIn className="flex flex-col items-center gap-6 text-white lg:absolute lg:bottom-[17%] lg:left-[11.46%] lg:w-[25.56%] lg:items-start lg:gap-8">
              <div className="relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px] lg:aspect-square lg:size-auto lg:w-[86.96%]">
                <Image
                  src={`${ASSET}/portrait-messaging.png`}
                  alt="Caregiver using secure messaging"
                  fill
                  sizes="(min-width: 1024px) 23vw, 220px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <p className="font-semibold leading-[1.278] text-[1.5rem] sm:text-[1.75rem] lg:text-[clamp(1.25rem,2.5vw,3rem)]">
                  Secure Messaging
                </p>
                <p className="leading-[1.35] text-[1.05rem] sm:text-[1.05rem] lg:text-[clamp(0.9rem,1.25vw,1.5rem)]">
                  Messaging between employee and employer apps, to easily respond and keep track of important dates and communications.
                </p>
              </div>
            </SlideIn>
            <SlideIn delay={100} className="flex w-full justify-center lg:absolute lg:left-[calc(50%+162.74px)] lg:top-[calc(50%+30px)] lg:w-[44.03%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              <Image
                src={`${ASSET}/screens-messaging.png`}
                alt="Secure messaging — inbox and conversation"
                width={634}
                height={632}
                className="h-auto w-full max-w-[560px] object-contain lg:max-w-none"
              />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT — Figma 4555:22870 ───────────────
            Same construction as panel 5, with the frame's own numbers: copy at
            left:207 (14.375%), 320 wide, portrait filling it; screens centred
            218px right of the middle. */}
        <Panel width="lg:w-screen">
          <div className="mx-auto flex w-full max-w-[min(1100px,94vw)] flex-col items-center gap-10 lg:block lg:max-w-none">
            <SlideIn className="flex flex-col items-center gap-6 text-white lg:absolute lg:bottom-[17%] lg:left-[14.375%] lg:w-[22.22%] lg:items-start lg:gap-8">
              <div className="relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px] lg:aspect-square lg:size-auto lg:w-[100%]">
                <Image
                  src={`${ASSET}/portrait-clock.png`}
                  alt="Employee clocking in"
                  fill
                  sizes="(min-width: 1024px) 23vw, 220px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <p className="font-semibold leading-[1.278] text-[1.5rem] sm:text-[1.75rem] lg:text-[clamp(1.25rem,2.5vw,3rem)]">
                  Clock In and Out
                </p>
                <p className="leading-[1.35] text-[1.05rem] sm:text-[1.05rem] lg:text-[clamp(0.9rem,1.25vw,1.5rem)]">
                  Easily clock in and out to accurately track hours worked, so your pay is always correct and on time.
                </p>
              </div>
            </SlideIn>
            <SlideIn delay={100} className="flex w-full justify-center lg:absolute lg:left-[calc(50%+218px)] lg:top-[calc(50%+30px)] lg:w-[44.03%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              <Image
                src={`${ASSET}/screens-clock.png`}
                alt="Clock in and out — map and start shift"
                width={634}
                height={632}
                className="h-auto w-full max-w-[560px] object-contain lg:max-w-none"
              />
            </SlideIn>
          </div>
        </Panel>

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
