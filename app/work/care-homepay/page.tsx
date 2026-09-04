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
          {/* At lg the frame is reproduced on a fitted 1440x1000 stage (see
              .figma-stage / --figma-u in globals.css) and every child is
              placed in the frame's own units. Sizing off width alone held
              only at Figma's 1.44 aspect: on a short wide window the phones
              computed taller than the viewport and painted over the logo and
              headline. Scaling the whole stage means they shrink together and
              the frame's own gap between the mark and the artwork holds, so
              nothing can cross the logo or Close. `contents` below lg drops
              the wrapper so the panel stays an ordinary stacked block. */}
          <div className="contents lg:block figma-stage">
          {/* Large logo — Figma 4555:22725, 672x120 at 100,100 */}
          <div className="care-hero-logo relative h-[60px] w-[280px] sm:h-[80px] sm:w-[380px]">
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
          <SlideIn className="care-hero-title self-end max-w-[340px] text-right">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
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
              className="care-hero-phone-l w-[46%] max-w-[240px]"
            >
              <Image
                src={`${ASSET}/phone-hero-left.png`}
                alt="HomePay splash — Time tracking has never been easier"
                width={397}
                height={836}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
            <SlideIn
              delay={180}
              className="care-hero-phone-r mt-10 w-[46%] max-w-[240px] sm:mt-16"
            >
              <Image
                src={`${ASSET}/phone-hero-right.png`}
                alt="HomePay splash — Easy time tracking with your employer"
                width={407}
                height={840}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
          </div>

          {/* App store badges — Figma 4555:22844, 50px each at 100,877 */}
          <div className="care-hero-badges mt-6 flex items-center gap-4">
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
          </div>
        </section>

        {/* ── PANEL 2: STATEMENT — Figma 4555:22849 ──────────────────────
            On the fitted stage, so the copy block keeps the frame's position
            (left:100, 950 wide, centred with a +43 nudge) and its 81/95 and
            32 type at any window shape. lg:!p-0 because the stage is
            positioned against the panel's padding box — the frame's own
            margins are what hold the content clear of the nav. */}
        <Panel width="lg:w-screen" className="lg:!p-0">
          <div className="contents lg:block figma-stage">
            <div className="care-stmt w-full">
              <SlideIn>
                <h1 className={`care-stmt-title text-white ${INTRO_TITLE}`}>
                  HomePay Time Tracker app by Care.com
                </h1>
              </SlideIn>
              <SlideIn delay={100}>
                <p className={`care-stmt-body mt-4 text-white ${INTRO_SUBTEXT}`}>
                  HomePay lets household employees like nannies and caregivers
                  track daily hours, calculate overtime, and submit timesheets
                  directly to employers. Employers review and approve submitted
                  hours through their online portal for direct deposit payroll
                  processing.
                </p>
              </SlideIn>
              <SlideIn delay={200} className="care-stmt-pill mt-4">
                <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[1rem] sm:text-[1rem] lg:text-[clamp(0.95rem,1.667vw,1.75rem)]">
                  0 &gt; 1
                </span>
              </SlideIn>
            </div>
          </div>
        </Panel>

        {/* ── PANEL 3: VIDEO — Figma 4555:22858 ─────────────────────────
            868x688 at 286,211 on the frame. */}
        <Panel width="lg:w-screen" className="items-center lg:!p-0">
          <div className="contents lg:block figma-stage">
            <SlideIn className="care-video mx-auto w-full max-w-[min(950px,90vw)]">
              <div className="relative aspect-[868/688] w-full overflow-hidden">
                <AutoplayVideo
                  src={`${ASSET}/videos/care-employee.mp4`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS — Figma 4555:22859 ─────────────
            Three 276x600 screens 50 apart, 928 wide at 258,230. Molly's
            transparent exports, so the panel colour shows between them —
            the old composite had a coral background baked into the gaps. */}
        <Panel width="lg:w-screen" className="items-center lg:!p-0">
          <div className="contents lg:block figma-stage">
            <SlideIn className="care-screens-3 mx-auto grid w-full max-w-[min(950px,90vw)] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-[5.39%]">
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
          </div>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING — Figma 4555:22862 ──────────────
            Copy at left:165, 368 wide, 170 up from the bottom; portrait 320
            square; the screen pair centred 162.74 right of the middle. Title
            36/46, body 18. The wide frame margins are what keep this clear of
            the neighbouring panel while scrolling between them. */}
        <Panel width="lg:w-screen" className="lg:!p-0">
          <div className="contents lg:block figma-stage">
            <div className="mx-auto flex w-full max-w-[min(1100px,94vw)] flex-col items-center gap-10 lg:contents">
              <SlideIn className="care-split-copy care-msg-copy flex flex-col items-center gap-6 text-white">
                <div className="care-split-portrait relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px]">
                  <Image
                    src={`${ASSET}/portrait-messaging.png`}
                    alt="Caregiver using secure messaging"
                    fill
                    sizes="(min-width: 1024px) 23vw, 220px"
                    className="object-cover"
                  />
                </div>
                <div className="care-split-text flex flex-col gap-4 text-center">
                  <p className="care-split-title font-semibold leading-[1.278] text-[1.5rem] sm:text-[1.75rem]">
                    Secure Messaging
                  </p>
                  <p className="care-split-body leading-[1.35] text-[1.05rem]">
                    Messaging between employee and employer apps, to easily respond and keep track of important dates and communications.
                  </p>
                </div>
              </SlideIn>
              <SlideIn delay={100} className="care-split-screens care-msg-screens flex w-full justify-center">
                <Image
                  src={`${ASSET}/screens-messaging.png`}
                  alt="Secure messaging — inbox and conversation"
                  width={634}
                  height={632}
                  className="h-auto w-full max-w-[560px] object-contain lg:max-w-none"
                />
              </SlideIn>
            </div>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT — Figma 4555:22870 ───────────────
            Same construction; copy at left:207, 320 wide, screens centred
            218 right of the middle. */}
        <Panel width="lg:w-screen" className="lg:!p-0">
          <div className="contents lg:block figma-stage">
            <div className="mx-auto flex w-full max-w-[min(1100px,94vw)] flex-col items-center gap-10 lg:contents">
              <SlideIn className="care-split-copy care-clock-copy flex flex-col items-center gap-6 text-white">
                <div className="care-split-portrait relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px]">
                  <Image
                    src={`${ASSET}/portrait-clock.png`}
                    alt="Employee clocking in"
                    fill
                    sizes="(min-width: 1024px) 23vw, 220px"
                    className="object-cover"
                  />
                </div>
                <div className="care-split-text flex flex-col gap-4 text-center">
                  <p className="care-split-title font-semibold leading-[1.278] text-[1.5rem] sm:text-[1.75rem]">
                    Clock In and Out
                  </p>
                  <p className="care-split-body leading-[1.35] text-[1.05rem]">
                    Easily clock in and out to accurately track hours worked, so your pay is always correct and on time.
                  </p>
                </div>
              </SlideIn>
              <SlideIn delay={100} className="care-split-screens care-clock-screens flex w-full justify-center">
                <Image
                  src={`${ASSET}/screens-clock.png`}
                  alt="Clock in and out — map and start shift"
                  width={634}
                  height={632}
                  className="h-auto w-full max-w-[560px] object-contain lg:max-w-none"
                />
              </SlideIn>
            </div>
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
