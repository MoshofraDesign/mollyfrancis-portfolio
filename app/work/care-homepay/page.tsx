import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects, getProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";

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

const ACCENT = "#F05844";
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

/** Shared outer wrapper for each horizontal panel */
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
      className={`relative flex w-full shrink-0 flex-col overflow-hidden px-6 py-14 sm:px-10 sm:py-16 lg:h-[100dvh] lg:snap-start lg:px-0 lg:py-0 ${width} ${className}`}
    >
      {children}
    </section>
  );
}

export default function CareHomepayCaseStudy() {
  getProject("care-homepay");
  const idx = projects.findIndex((p) => p.slug === "care-homepay");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);

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
          <div className="relative h-6 w-[100px] sm:h-7 sm:w-[120px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        }
        action={
          <Link
            href="/"
            aria-label="Back to home"
            className="pointer-events-auto -m-3 flex min-h-11 min-w-11 items-center justify-center p-3 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] transition-opacity hover:opacity-60"
          >
            Close
          </Link>
        }
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
          <div className="relative h-[60px] w-[280px] sm:h-[80px] sm:w-[380px] lg:absolute lg:left-[6.94vw] lg:top-[10vh] lg:h-[7.78vw] lg:w-[32.9vw] lg:max-w-[474px]">
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
          <SlideIn className="self-end max-w-[340px] text-right lg:absolute lg:right-[6.94vw] lg:top-[10vh] lg:max-w-[30vw]">
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[2.5vw] lg:leading-[1.28]">
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
                width={814}
                height={1435}
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
                width={814}
                height={1217}
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

        {/* ── PANEL 2: STATEMENT — Figma 4555:22849 */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94%] lg:top-[10%]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4 lg:absolute lg:left-[6.94%] lg:top-[calc(50%+43px)] lg:-translate-y-1/2 lg:w-full lg:max-w-[950px]">
            <SlideIn>
              <h1 className="font-semibold leading-[1.17] text-white text-[clamp(2rem,5.6vw,5.0625rem)]">
                HomePay Time Tracker app by Care.com
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="text-white leading-normal text-[clamp(1rem,2.2vw,2rem)]">
                HomePay lets household employees like nannies and caregivers
                track daily hours, calculate overtime, and submit timesheets
                directly to employers. Employers review and approve submitted
                hours through their online portal for direct deposit payroll
                processing.
              </p>
            </SlideIn>
            <SlideIn delay={200} className="mt-2">
              <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[clamp(1rem,1.67vw,1.5rem)]">
                0 &gt; 1
              </span>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: VIDEO — Figma 4555:22856 */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94%] lg:top-[10%]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0 lg:flex">
            <SlideIn className="w-full max-w-[868px] px-4 lg:px-0">
              <div className="relative aspect-[868/688] w-full overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4)]">
                <AutoplayVideo
                  src={`${ASSET}/videos/care-employee.mp4`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS — Figma 4555:22859 */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94%] lg:top-[10%]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0 lg:flex">
            <SlideIn className="w-full max-w-[925px] px-4 lg:px-0">
              <Image
                src={`${ASSET}/screens-timesheets.png`}
                alt="HomePay employee timesheet screens — add time, weekly hours, and summary"
                width={1850}
                height={1200}
                className="h-auto w-full object-contain"
              />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING — Figma 4555:22862
            Portrait + copy bottom-left (left:165), screens right-center. */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94%] lg:top-[10%]">
            <SmallLogo />
          </div>

          <SlideIn
            delay={100}
            className="flex justify-center lg:absolute lg:left-[calc(50%+162.74px)] lg:top-[calc(50%+30px)] lg:w-[41.77%] lg:max-w-[601px] lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <Image
              src={`${ASSET}/screens-messaging.png`}
              alt="Secure messaging — inbox and conversation"
              width={1203}
              height={1200}
              className="h-auto w-full object-contain"
            />
          </SlideIn>

          <div className="mt-8 flex flex-col gap-8 lg:absolute lg:bottom-[170px] lg:left-[11.46%] lg:mt-0 lg:w-[368px]">
            <SlideIn>
              <div className="relative size-[160px] overflow-hidden rounded-full sm:size-[220px] lg:size-[320px]">
                <Image
                  src={`${ASSET}/portrait-messaging.png`}
                  alt="Caregiver using secure messaging"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={120} className="flex flex-col gap-4 text-white">
              <p className="font-semibold leading-[1.28] text-[clamp(1.5rem,2.5vw,2.25rem)]">
                Secure Messaging
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-normal">
                Messaging between employee and employer apps, to easily
                respond and keep track of important dates and communications.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT — Figma 4555:22870
            Portrait + copy at left:207, screens at left:636 top:230. */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94%] lg:top-[10%]">
            <SmallLogo />
          </div>

          <SlideIn
            delay={100}
            className="flex justify-center lg:absolute lg:left-[44.17%] lg:top-[23%] lg:w-[41.77%] lg:max-w-[601px]"
          >
            <Image
              src={`${ASSET}/screens-clock.png`}
              alt="Clock in and out — map and start shift"
              width={1203}
              height={1200}
              className="h-auto w-full object-contain"
            />
          </SlideIn>

          <div className="mt-8 flex flex-col gap-8 lg:absolute lg:bottom-[170px] lg:left-[14.38%] lg:mt-0 lg:w-[320px]">
            <SlideIn>
              <div className="relative size-[160px] overflow-hidden rounded-full sm:size-[220px] lg:size-[320px]">
                <Image
                  src={`${ASSET}/portrait-clock.png`}
                  alt="Employee clocking in"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={120} className="flex flex-col gap-4 text-white">
              <p className="font-semibold leading-[1.28] text-[clamp(1.5rem,2.5vw,2.25rem)]">
                Clock In and Out
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-normal">
                Easily clock in and out to accurately track hours worked, so
                your pay is always correct and on time.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── NEXT PROJECT ──────────────────────────────────────────── */}
        <Link
          href={`/work/${next.slug}`}
          className="group relative flex w-full flex-col justify-center bg-[#141414] px-6 py-20 text-[#f5f5f5] sm:px-12 sm:py-24 lg:h-[100dvh] lg:w-[56vw] lg:shrink-0 lg:snap-start lg:px-[7%] lg:py-0"
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
