import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";
import {
  Panel,
  INTRO_TITLE,
  INTRO_SUBTEXT,
  NextProjectLink,
  CaseStudyMetaPanel,
  VIEW,
} from "@/components/v2/CaseStudyKit";

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
/** Section heading on the two split panels — Figma's 36/46, one scale. */
const SPLIT_TITLE =
  "font-semibold leading-[1.278] text-[1.5rem] sm:text-[1.75rem] lg:text-[clamp(1.5rem,2.5vw,2.25rem)]";
const SPLIT_BODY =
  "leading-[1.35] text-[1.05rem] lg:text-[clamp(1.05rem,1.25vw,1.125rem)]";

export default function CareHomepayCaseStudy() {
  const project = getProject("care-homepay");
  const idx = projects.findIndex((p) => p.slug === "care-homepay");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);
  if (!project) return null;

  const splits = [
    {
      key: "messaging",
      title: "Secure Messaging",
      body: "Messaging between employee and employer apps, to easily respond and keep track of important dates and communications.",
      portrait: `${ASSET}/portrait-messaging.png`,
      portraitAlt: "Caregiver using secure messaging",
      screens: `${ASSET}/screens-messaging.png`,
      screensAlt: "Secure messaging — inbox and conversation",
    },
    {
      key: "clock",
      title: "Clock In and Out",
      body: "Easily clock in and out to accurately track hours worked, so your pay is always correct and on time.",
      portrait: `${ASSET}/portrait-clock.png`,
      portraitAlt: "Employee clocking in",
      screens: `${ASSET}/screens-clock.png`,
      screensAlt: "Clock in and out — map and start shift",
    },
  ];

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
            Built like the Netspend hero: each child is absolutely placed at
            the frame's own fraction of the panel (see .care-hero-* in
            globals.css), so the wordmark and the store badges stay on the
            panel's left edge instead of drifting inward with a centred stage.
            Sizes still scale by --figma-u, which is what keeps the phones
            from ever climbing into the logo or the Close control. Below lg
            the order-* classes stack it: logo, headline, phones, badges. */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo — Figma 4555:22725, 672x120 at 100,100 */}
          <div className="care-hero-logo order-1 relative h-[60px] w-[280px] sm:h-[80px] sm:w-[380px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* App store badges — Figma 4555:22844, 50px each at 100,877 */}
          <div className="care-hero-badges order-4 mt-6 flex items-center gap-4">
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

          {/* Headline — Figma 4555:22842, 455 wide at 831,114: just right of
              the wordmark, left-aligned. */}
          <SlideIn className="care-hero-title order-2 self-end max-w-[340px] text-right">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              Homepay Employee &amp; Employer Payroll App
            </p>
          </SlideIn>

          {/* Two phones — a stacked pair below lg, absolutely placed at lg.
              The exports are full-length, so they run off the frame's bottom
              edge the way Figma draws them; the panel clips them. */}
          <div className="order-3 mt-4 flex flex-1 items-end justify-center gap-4 sm:gap-8 lg:mt-0 lg:contents">
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
        </section>

        {/* ── PANEL 2: STATEMENT — Figma 4555:22849
            The shared intro treatment: INTRO_TITLE / INTRO_SUBTEXT and the
            kit's spacing, so this opens the way every other project does. */}
        <Panel width={VIEW} pad="center">
          {/* A wider measure than the kit's default 54rem: the frame gives the
              copy 950 of 1440 (66%), and at the shared INTRO scale the
              narrower measure ran this longer paragraph past the panel's
              bottom. Same type sizes as every other project's opening — only
              the column is Figma's. */}
          <div className="mx-auto w-full max-w-[min(66rem,92vw)]">
            <SlideIn>
              <h1 className={`text-white ${INTRO_TITLE}`}>
                HomePay Time Tracker app by Care.com
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 text-white ${INTRO_SUBTEXT}`}>
                HomePay lets household employees like nannies and caregivers
                track daily hours, calculate overtime, and submit timesheets
                directly to employers. Employers review and approve submitted
                hours through their online portal for direct deposit payroll
                processing.
              </p>
            </SlideIn>
            <SlideIn delay={200} className="mt-6">
              <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[1rem] lg:text-[clamp(0.95rem,1.2vw,1.5rem)]">
                0 &gt; 1
              </span>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: VIDEO — Figma 4555:22858 */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto w-full max-w-[min(950px,90vw,calc(var(--panel-media-max-h)*1.2616))]">
            <SlideIn>
              <div className="relative aspect-[868/688] w-full overflow-hidden">
                <AutoplayVideo
                  src={`${ASSET}/videos/care-employee.mp4`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS — Figma 4555:22859
            Three 276x600 screens. Molly's transparent exports, so the panel
            colour shows between them — the old composite had a coral
            background baked into the gaps. */}
        <Panel width={VIEW} pad="center">
          <SlideIn className="mx-auto grid w-full max-w-[min(950px,90vw)] grid-cols-1 items-end gap-8 sm:grid-cols-3 sm:gap-[5.39%]">
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
                className="mx-auto h-auto w-full max-w-[min(276px,calc(var(--panel-media-max-h)*0.46))]"
              />
            ))}
          </SlideIn>
        </Panel>

        {/* ── PANELS 5-6: SECURE MESSAGING, CLOCK IN AND OUT
            Figma 4555:22862 / 4555:22870 — portrait and copy on the left, the
            screen pair on the right. A two-column grid rather than absolute
            frame coordinates, so the pair sits one gap away from the circle
            at every window shape instead of drifting across the panel. */}
        {splits.map((s, i) => (
          <Panel key={s.key} width={VIEW} pad="center">
            <div className="mx-auto grid w-full max-w-[min(1100px,94vw)] items-center gap-8 lg:grid-cols-[minmax(0,368fr)_minmax(0,634fr)] lg:gap-[3.33%]">
              <SlideIn className="flex flex-col items-center gap-6 text-white">
                <div className="relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px] lg:aspect-square lg:h-auto lg:w-[min(320px,87%)]">
                  <Image
                    src={s.portrait}
                    alt={s.portraitAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, 220px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 text-center">
                  <p className={SPLIT_TITLE}>{s.title}</p>
                  <p className={SPLIT_BODY}>{s.body}</p>
                </div>
              </SlideIn>
              <SlideIn delay={100} className="flex w-full justify-center lg:justify-start">
                <Image
                  src={s.screens}
                  alt={s.screensAlt}
                  width={634}
                  height={632}
                  priority={i === 0}
                  className="h-auto w-full max-w-[min(560px,calc(var(--panel-media-max-h)*1.0032))] lg:max-w-[min(634px,calc(var(--panel-media-max-h)*1.0032))] object-contain"
                />
              </SlideIn>
            </div>
          </Panel>
        ))}

        <CaseStudyMetaPanel
          meta={getCaseStudyMeta(project)}
          lightText={fg === "#f5f5f5"}
        />

        <NextProjectLink
          href={`/work/${next.slug}`}
          client={next.client}
          title={next.title}
          accent={next.accent}
          logo={next.logo}
        />

      </HorizontalScroll>
    </main>
  );
}
