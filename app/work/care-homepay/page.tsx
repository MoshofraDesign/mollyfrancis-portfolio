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

// Figma asset URLs — valid 7 days from generation
const imgGettyImages = "https://www.figma.com/api/mcp/asset/fa10c214-ed4e-4d1c-ba0c-26712c80c6a3.png";
const imgLavander    = "https://www.figma.com/api/mcp/asset/a7e3c8d4-09fb-444a-9eab-abacece68c11.png";
const imgImage20     = "https://www.figma.com/api/mcp/asset/34724d57-ae2d-4ab9-a42c-f90e4b2c3c0b.png";
const imgImage28     = "https://www.figma.com/api/mcp/asset/2c9e9fc0-89b4-48f2-9909-1e5491790bf9.png";
const imgImage32     = "https://www.figma.com/api/mcp/asset/701caafc-8843-42ee-88da-551268c051e9.png";
const imgSubmitter2  = "https://www.figma.com/api/mcp/asset/eb6afec3-e530-4142-819b-337aeb7541b5.png";
const imgImage34     = "https://www.figma.com/api/mcp/asset/89ef491d-edc6-464a-a3fc-8c7eeb6de53f.png";
const imgSubmitter3  = "https://www.figma.com/api/mcp/asset/0604f896-ed1c-4b92-9af4-91b82cad0bbe.png";
const imgGooglePlay  = "https://www.figma.com/api/mcp/asset/e7bbfc2e-e592-4124-838e-0b61a6603c83.svg";
const imgAppStore    = "https://www.figma.com/api/mcp/asset/182be784-d1bc-4eb2-a22b-28303a2788e2.svg";
const imgLogo1       = "https://www.figma.com/api/mcp/asset/606c0564-18b8-46b1-8774-e7fd77ee0a9a.svg";
const imgCareLogo1   = "https://www.figma.com/api/mcp/asset/0c5b7df3-8f64-4967-ad56-cc55610f7439.svg";

// Squarespace-hosted screenshots (permanent)
const SSO_SIGNUP =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png";
const CLOCK_IN_OUT =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png";
const TIMESHEETS =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png";
const INBOX_SWIPE =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png";

/** Small Care logo — used in sticky nav + top-left of every panel */
function SmallLogo() {
  return (
    <div className="relative h-[47px] w-[200px]">
      <Image src={LOGO} alt="Care.com Homepay" fill unoptimized className="object-contain object-left" />
    </div>
  );
}

/** Simplified iPhone frame wrapping a screenshot */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[9/19] w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-black/90 bg-black shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-0 z-10 h-[22px] w-[38%] -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <Image src={src} alt={alt} fill sizes="300px" className="object-contain" />
      </div>
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

        {/* ── PANEL 1: HERO — two phones + headline ─────────────────
            Figma: large Care logo top-left (474×112px), headline top-right,
            phone 1 bottom-left (28–88% height, 30–58% width),
            phone 2 bottom-right (39–77% height, 54–82% width),
            app badges bottom-left at top:877px. */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo — top left */}
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
            <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-[2.5vw] lg:leading-[1.28]">
              Homepay Employee &amp; Employer Payroll App
            </p>
          </SlideIn>

          {/* Two phones — bottom */}
          <div className="mt-4 flex flex-1 items-end justify-center gap-6 sm:gap-10 lg:mt-0">
            {/* Phone 1: left, taller — Figma inset 28.3% top */}
            <SlideIn delay={80} className="lg:absolute lg:bottom-0 lg:left-[30.28vw] lg:w-[27.7vw] lg:max-w-[398px]">
              <PhoneFrame src={SSO_SIGNUP} alt="SSO sign-up for new caregivers" />
            </SlideIn>
            {/* Phone 2: right, shorter — Figma inset 39.2% top */}
            <SlideIn delay={180} className="mt-12 sm:mt-20 lg:absolute lg:bottom-0 lg:left-[54.31vw] lg:mt-0 lg:w-[27.7vw] lg:max-w-[398px] lg:translate-y-[23.17vh]">
              <PhoneFrame src={TIMESHEETS} alt="Weekly timesheet overview" />
            </SlideIn>
          </div>

          {/* App store badges — bottom left */}
          <div className="mt-6 flex items-center gap-4 lg:absolute lg:bottom-[12.3vh] lg:left-[6.94vw] lg:mt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgGooglePlay} alt="Google Play" className="h-[50px] w-[50px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgAppStore} alt="App Store" className="h-[50px] w-[50px]" />
          </div>
        </section>

        {/* ── PANEL 2: STATEMENT ────────────────────────────────────
            Figma: small logo top-left, large heading + paragraph + badge
            vertically centered in the panel (top: 50%+43px). */}
        <Panel width="lg:w-screen">
          {/* Logo top-left */}
          <div className="mb-10 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          {/* Text block — vertically centered */}
          <div className="flex flex-1 flex-col justify-center gap-4 lg:absolute lg:left-[6.94vw] lg:top-[calc(50%+43px)] lg:-translate-y-1/2 lg:w-[65.97vw] lg:max-w-[950px]">
            <SlideIn>
              <h1 className="font-semibold leading-[1.17] text-white text-[clamp(2rem,5.6vw,5.0625rem)]">
                HomePay Time Tracker app by Care.com
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="text-white leading-relaxed text-[clamp(1rem,2.2vw,2rem)] opacity-95">
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

        {/* ── PANEL 3: VIDEO / SCREEN RECORDING ────────────────────
            Figma: small logo top-left, video centered in panel. */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0 lg:flex">
            <SlideIn className="w-full max-w-[868px] px-4 lg:px-0">
              <div className="relative aspect-[868/688] w-full overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4)]">
                <AutoplayVideo
                  src="/work/care-homepay/videos/care-employee.mp4"
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: IMAGE 28 — full-bleed screenshot ─────────────
            Figma: small logo top-left, image 28 centered (925×600px). */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0 lg:flex">
            <SlideIn className="w-full max-w-[925px] px-4 lg:px-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgImage28}
                alt="HomePay employer portal — timesheet review"
                className="h-auto w-full rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.35)] object-contain"
              />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: SECURE MESSAGING ─────────────────────────────
            Figma: small logo top-left, image 32 right-center (601×600px),
            portrait circle + text block bottom-left. */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>

          {/* Screenshot — right side */}
          <SlideIn delay={100} className="flex justify-center lg:absolute lg:right-[12.08vw] lg:top-1/2 lg:-translate-y-[calc(50%-30px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgImage32}
              alt="Secure messaging interface"
              className="h-auto max-h-[600px] w-full max-w-[600px] rounded-xl object-contain"
            />
          </SlideIn>

          {/* Portrait + copy — bottom left */}
          <div className="mt-8 flex flex-col gap-8 lg:absolute lg:bottom-[170px] lg:left-[11.46vw] lg:mt-0 lg:w-[368px]">
            <SlideIn>
              <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full sm:h-[220px] sm:w-[220px] lg:h-[320px] lg:w-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSubmitter2}
                  alt="Caregiver using secure messaging"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={120} className="flex flex-col gap-4 text-white">
              <p className="font-semibold leading-[1.28] text-[clamp(1.5rem,2.5vw,2.25rem)]">
                Secure Messaging
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-relaxed opacity-90">
                Messaging between employee and employer apps, to easily
                respond and keep track of important dates and communications.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: CLOCK IN AND OUT ─────────────────────────────
            Figma: small logo top-left, image 34 right (601×600 at left:636px),
            portrait circle + text block bottom-left at left:207px. */}
        <Panel width="lg:w-screen">
          <div className="mb-10 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>

          {/* Screenshot — right side */}
          <SlideIn delay={100} className="flex justify-center lg:absolute lg:left-[44.17vw] lg:top-[230px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgImage34}
              alt="Clock in and out interface"
              className="h-auto max-h-[600px] w-full max-w-[600px] rounded-xl object-contain"
            />
          </SlideIn>

          {/* Portrait + copy — bottom left */}
          <div className="mt-8 flex flex-col gap-8 lg:absolute lg:bottom-[170px] lg:left-[14.38vw] lg:mt-0 lg:w-[320px]">
            <SlideIn>
              <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full sm:h-[220px] sm:w-[220px] lg:h-[320px] lg:w-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSubmitter3}
                  alt="Employee clocking in"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={120} className="flex flex-col gap-4 text-white">
              <p className="font-semibold leading-[1.28] text-[clamp(1.5rem,2.5vw,2.25rem)]">
                Clock In and Out
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-relaxed opacity-90">
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
