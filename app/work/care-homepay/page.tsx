import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";
import { NextProjectLink, MEASURE, MEDIA, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

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

/** Small Care logo — sticky nav + top-left of every panel */
function SmallLogo() {
  return (
    <div className="relative h-[47px] w-[200px]">
      <Image src={LOGO} alt="Care.com Homepay" fill unoptimized className="object-contain object-left" />
    </div>
  );
}

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
      className={`relative flex w-full shrink-0 flex-col overflow-hidden px-6 py-14 sm:px-10 sm:py-16 lg:h-[100dvh] lg:snap-start lg:items-center lg:justify-center lg:overflow-y-auto lg:px-[2.88rem] xl:px-[3.6rem] 2xl:px-[4rem] lg:pt-[5.75rem] lg:pb-[clamp(1.25rem,3vh,2.5rem)] ${width} ${className}`}
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
          <div className="relative h-7 w-[115px] sm:h-8 sm:w-[135px]">
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
          {/* Large logo — top left (pre-Figma-tweak size/placement) */}
          <div className="relative h-[60px] w-[280px] sm:h-[80px] sm:w-[380px] lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:top-[72px] xl:top-[80px] 2xl:top-[90px] lg:h-[80px] xl:h-[100px] 2xl:h-[120px] lg:w-[337px] xl:w-[421px] 2xl:w-[505px] lg:max-w-[474px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Headline — top right */}
          <SlideIn className="self-end max-w-[340px] text-right lg:absolute lg:right-[71px] xl:right-[89px] 2xl:right-[107px] lg:top-[72px] xl:top-[80px] 2xl:top-[90px] lg:max-w-[307px] xl:max-w-[384px] 2xl:max-w-[461px]">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[26px] xl:text-[32px] 2xl:text-[38px] lg:leading-[1.28]">
              Homepay Employee &amp; Employer Payroll App
            </p>
          </SlideIn>

          {/* Two phones — mobile stack; desktop absolute + clipped at bottom */}
          <div className="mt-4 flex flex-1 items-end justify-center gap-4 sm:gap-8 lg:mt-0 lg:contents">
            <SlideIn
              delay={80}
              className="w-[46%] max-w-[280px] lg:absolute lg:left-[30.28%] lg:top-[28.3%] lg:w-[27.7%] lg:max-w-none"
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
              className="mt-10 w-[46%] max-w-[280px] sm:mt-16 lg:absolute lg:left-[54.31%] lg:top-[39.2%] lg:mt-0 lg:w-[27.7%] lg:max-w-none"
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

        {/* ── PANEL 2: STATEMENT ─────────────────────────────────────── */}
        <Panel width="lg:w-screen" className="!pt-20 sm:!pt-24">
          <div className={`mx-auto ${MEASURE}`}>
            <div className="mb-8 lg:mb-10">
              <SmallLogo />
            </div>
            <SlideIn>
              <h1 className="font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[2rem] sm:text-[2rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.6rem] 2xl:text-[4.05rem]">
                HomePay Time Tracker app by Care.com
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="mt-6 text-white leading-[1.35] text-[1.05rem] sm:text-[1.05rem] md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.12rem] 2xl:text-[1.344rem]">
                HomePay lets household employees like nannies and caregivers
                track daily hours, calculate overtime, and submit timesheets
                directly to employers. Employers review and approve submitted
                hours through their online portal for direct deposit payroll
                processing.
              </p>
            </SlideIn>
            <SlideIn delay={200} className="mt-6">
              <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[1rem] sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.12rem] 2xl:text-[1.344rem]">
                0 &gt; 1
              </span>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: VIDEO ─────────────────────────────────────────── */}
        <Panel width="lg:w-screen" className="items-center">
          <SlideIn className={`mx-auto ${MEDIA}`}>
            <div className="relative aspect-[868/688] w-full overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4)]">
              <AutoplayVideo
                src={`${ASSET}/videos/care-employee.mp4`}
                className="h-full w-full object-cover"
              />
            </div>
          </SlideIn>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS ─────────────────────────────── */}
        <Panel width="lg:w-screen" className="items-center">
          <SlideIn className={`mx-auto ${MEDIA}`}>
            <Image
              src={`${ASSET}/screens-timesheets.png`}
              alt="HomePay employee timesheet screens — add time, weekly hours, and summary"
              width={1850}
              height={1200}
              className="h-auto w-full object-contain"
            />
          </SlideIn>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING ──────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="mx-auto grid w-full max-w-[min(1100px,94vw)] items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-6 text-white">
              <SlideIn>
                <div className="relative size-[160px] overflow-hidden rounded-full sm:size-[220px] lg:size-[280px]">
                  <Image
                    src={`${ASSET}/portrait-messaging.png`}
                    alt="Caregiver using secure messaging"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </SlideIn>
              <SlideIn delay={120} className="flex flex-col gap-4">
                <p className="font-semibold leading-[1.2] text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[2rem] 2xl:text-[2.25rem]">
                  Secure Messaging
                </p>
                <p className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.12rem] 2xl:text-[1.25rem] leading-[1.35]">
                  Messaging between employee and employer apps, to easily
                  respond and keep track of important dates and communications.
                </p>
              </SlideIn>
            </div>
            <SlideIn delay={100} className="flex justify-center">
              <Image
                src={`${ASSET}/screens-messaging.png`}
                alt="Secure messaging — inbox and conversation"
                width={634}
                height={632}
                className="h-auto w-full max-w-[560px] object-contain"
              />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT ──────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="mx-auto grid w-full max-w-[min(1100px,94vw)] items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-6 text-white">
              <SlideIn>
                <div className="relative size-[160px] overflow-hidden rounded-full sm:size-[220px] lg:size-[280px]">
                  <Image
                    src={`${ASSET}/portrait-clock.png`}
                    alt="Employee clocking in"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              </SlideIn>
              <SlideIn delay={120} className="flex flex-col gap-4">
                <p className="font-semibold leading-[1.2] text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[2rem] 2xl:text-[2.25rem]">
                  Clock In and Out
                </p>
                <p className="text-[1.05rem] sm:text-[1.05rem] md:text-[1.05rem] lg:text-[1.05rem] xl:text-[1.12rem] 2xl:text-[1.25rem] leading-[1.35]">
                  Easily clock in and out to accurately track hours worked, so
                  your pay is always correct and on time.
                </p>
              </SlideIn>
            </div>
            <SlideIn delay={100} className="flex justify-center">
              <Image
                src={`${ASSET}/screens-clock.png`}
                alt="Clock in and out — map and start shift"
                width={634}
                height={632}
                className="h-auto w-full max-w-[560px] object-contain"
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
