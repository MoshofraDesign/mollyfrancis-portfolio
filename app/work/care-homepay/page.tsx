import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects, getProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body } from "@/components/v2/CaseStudyKit";

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

// Squarespace-hosted product screenshots
const SSO_SIGNUP =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png";
const CLOCK_IN_OUT =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png";
const TIMESHEETS =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png";
const INBOX_SWIPE =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png";

// Figma asset URLs (valid for 7 days from generation)
const FIGMA_PHONE_SCREEN_1 = "https://www.figma.com/api/mcp/asset/f113147c-0e71-4146-a538-27ebf65f9b03.png";
const FIGMA_PHONE_SCREEN_2 = "https://www.figma.com/api/mcp/asset/70036366-6a18-4728-a848-392b2ed5d818.png";
const FIGMA_IMAGE_28 = "https://www.figma.com/api/mcp/asset/a87d06e1-7994-42bc-95e9-55e7ab07977c.png";
const FIGMA_IMAGE_32 = "https://www.figma.com/api/mcp/asset/128e2319-10a1-4b7c-9651-0bb55c9c3aba.png";
const FIGMA_IMAGE_34 = "https://www.figma.com/api/mcp/asset/77b90777-b1f9-46da-88b6-c7448a599424.png";
const FIGMA_SUBMITTER_2 = "https://www.figma.com/api/mcp/asset/ff867396-71db-45dc-8e17-84cbdfdf4784.png";
const FIGMA_SUBMITTER_3 = "https://www.figma.com/api/mcp/asset/782b3e51-4626-4e26-98a0-e7a585bebdfd.png";
const FIGMA_GOOGLE_PLAY = "https://www.figma.com/api/mcp/asset/1b5491ae-2c94-428a-b023-45ebce8d4d7c.svg";
const FIGMA_APP_STORE = "https://www.figma.com/api/mcp/asset/22310f3f-18cb-4a72-bb15-7c83d7e022a5.svg";

function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-full max-w-[260px] rounded-[2.25rem] border-[6px] border-black/90 bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="absolute left-1/2 top-0 z-10 h-[22px] w-[38%] -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-white">
        <Image src={src} alt={alt} fill sizes="260px" className="object-contain" />
      </div>
    </div>
  );
}

export default function CareHomepayCaseStudy() {
  const project = getProject("care-homepay");
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

        {/* ── PANEL 1: TITLE + TWO PHONES ──────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pt-0"
        >
          {/* Logo + headline — Figma: logo top-left, headline top-right */}
          <div className="flex flex-wrap items-start justify-between gap-6 lg:absolute lg:left-[6.94vw] lg:right-[6.94vw] lg:top-[10vh]">
            <div className="relative h-[50px] w-[330px] sm:h-[60px] sm:w-[400px]">
              <Image
                src={LOGO}
                alt="Care.com Homepay"
                fill
                unoptimized
                priority
                className="object-contain object-left"
              />
            </div>
            <SlideIn className="max-w-[380px]">
              <p className="text-right text-xl font-semibold leading-tight sm:text-2xl lg:text-[2vw] lg:leading-[1.25]">
                Homepay Employee &amp; Employer Payroll App
              </p>
            </SlideIn>
          </div>

          {/* Two phones — bottom of panel */}
          <div className="mt-6 flex flex-1 items-end justify-center gap-6 sm:gap-10 lg:absolute lg:bottom-0 lg:left-[6vw] lg:mt-0 lg:gap-[4vw]">
            <SlideIn delay={100}>
              <PhoneFrame src={SSO_SIGNUP} alt="SSO sign-up for new caregivers" className="lg:max-w-[22vw]" />
            </SlideIn>
            <SlideIn delay={200} className="mt-10 sm:mt-16 lg:mt-0 lg:translate-y-[-5vh]">
              <PhoneFrame src={TIMESHEETS} alt="Weekly timesheet overview" className="lg:max-w-[22vw]" />
            </SlideIn>
          </div>

          {/* App store badges — bottom right, Figma panel 1 */}
          <div className="hidden lg:flex lg:absolute lg:bottom-[8vh] lg:right-[6.94vw] lg:gap-4">
            <Image src={FIGMA_GOOGLE_PLAY} alt="Google Play" width={50} height={50} unoptimized />
            <Image src={FIGMA_APP_STORE} alt="App Store" width={50} height={50} unoptimized />
          </div>
        </section>

        {/* ── PANEL 2: STATEMENT ────────────────────────────────────── */}
        <TextPanel>
          <Heading>HomePay Time Tracker app by Care.com</Heading>
          <Body>
            HomePay lets household employees like nannies and caregivers
            track daily hours, calculate overtime, and submit timesheets
            directly to employers. Employers review and approve submitted
            hours through their online portal for direct deposit payroll
            processing.
          </Body>
          <SlideIn delay={220} className="mt-8">
            <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 text-lg font-semibold">
              0 → 1
            </span>
          </SlideIn>
        </TextPanel>

        {/* ── PANEL 3: SCREEN RECORDING ────────────────────────────── */}
        <Panel width="lg:w-[76vw]" className="items-center">
          <SlideIn className="w-full max-w-[820px]">
            <div className="relative aspect-[1266/1004] w-full overflow-hidden rounded-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]">
              <AutoplayVideo
                src="/work/care-homepay/videos/care-employee.mp4"
                className="h-full w-full object-cover"
              />
            </div>
          </SlideIn>
        </Panel>

        {/* ── PANEL 4: IMAGE 28 (full-bleed screenshot) ─────────────── */}
        <Panel width="lg:w-[76vw]" className="items-center">
          <SlideIn className="w-full max-w-[925px]">
            <Image
              src={FIGMA_IMAGE_28}
              alt="HomePay employer portal — timesheet review"
              width={925}
              height={600}
              className="h-auto w-full rounded-md object-contain shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]"
              unoptimized
            />
          </SlideIn>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING ────────────────────────────── */}
        <Panel width="lg:w-[92vw]" className="items-center">
          <div className="grid w-full max-w-[1300px] items-center gap-10 sm:grid-cols-2 sm:gap-14">
            {/* Left: screenshot */}
            <SlideIn className="flex justify-center">
              <div className="relative h-[600px] w-[480px] max-w-full overflow-hidden rounded-md">
                <Image
                  src={FIGMA_IMAGE_32}
                  alt="Secure messaging between employee and employer"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </SlideIn>
            {/* Right: portrait + copy */}
            <SlideIn delay={100} className="flex flex-col gap-8">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full sm:h-[280px] sm:w-[280px]">
                <Image
                  src={FIGMA_SUBMITTER_2}
                  alt="Caregiver using secure messaging"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.25]">
                  Secure Messaging
                </h2>
                <p className="max-w-[40ch] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed opacity-90">
                  Messaging between employee and employer apps, to easily
                  respond and keep track of important dates and
                  communications.
                </p>
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT ────────────────────────────── */}
        <Panel width="lg:w-[92vw]" className="items-center">
          <div className="grid w-full max-w-[1300px] items-center gap-10 sm:grid-cols-2 sm:gap-14">
            {/* Left: portrait + copy */}
            <SlideIn className="flex flex-col gap-8 sm:order-1">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full sm:h-[280px] sm:w-[280px]">
                <Image
                  src={FIGMA_SUBMITTER_3}
                  alt="Employee clocking in"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.25]">
                  Clock In and Out
                </h2>
                <p className="max-w-[40ch] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed opacity-90">
                  Easily clock in and out to accurately track hours worked,
                  so your pay is always correct and on time.
                </p>
              </div>
            </SlideIn>
            {/* Right: screenshot */}
            <SlideIn delay={100} className="flex justify-center sm:order-2">
              <div className="relative h-[600px] w-[480px] max-w-full overflow-hidden rounded-md">
                <Image
                  src={FIGMA_IMAGE_34}
                  alt="Clock in and out interface"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── NEXT PROJECT ─────────────────────────────────────────── */}
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
