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

/**
 * Bespoke horizontal-scroll case study for Care.com Homepay, matching the
 * Figma reference at node 4471:9494. Same mechanics as GovOS/LivePerson
 * (HorizontalScroll + StickyNav + snap panels), hand-authored rather than
 * the generic app/work/[slug]/page.tsx template because the Figma calls
 * out a two-phone hero, a screen-recording panel, and per-feature imagery.
 *
 * Note on assets: Figma's title panel uses two photoreal Getty stock-photo
 * splash screens (a dad + daughter in the rain, a girl hugging a teddy
 * bear) with the HomePay wordmark baked in, plus Google Play/App Store
 * badges and circular lifestyle portraits next to "Secure Messaging" and
 * "Clock In and Out" — none of that stock photography is downloadable from
 * here (Figma export URLs return 403 from this sandbox), so rather than
 * fabricate placeholder photography, every phone screen below uses Molly's
 * real Homepay product screenshots instead, each inside the same portrait
 * PhoneFrame so nothing gets cropped into the wrong aspect ratio.
 * Excluded from the generic template via customSlugs there.
 */

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

const SSO_SIGNUP =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png";
const CLOCK_IN_OUT =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png";
const TIMESHEETS =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png";
const INBOX_SWIPE =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png";

/** Simplified phone bezel — Figma's mockup has full photoreal hardware
 *  detail (antennas, buttons, dynamic island); this keeps the phone-frame
 *  read without hand-copying dozens of decorative sub-layers. */
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
    <div className={`relative aspect-[9/19] w-full max-w-[260px] rounded-[2.25rem] border-[6px] border-black/90 bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="absolute left-1/2 top-0 z-10 h-[22px] w-[38%] -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-white">
        {/* object-contain (not cover) — real screenshot dimensions aren't
            verified, so this guarantees the full screen is always visible
            rather than risking another bad crop like the Figma-box version
            this replaced. */}
        <Image src={src} alt={alt} fill sizes="260px" className="object-contain" />
      </div>
    </div>
  );
}

/** Feature panel: heading + body copy alongside a screenshot in a phone
 *  frame. Matches Figma's structure — each feature panel pairs the copy
 *  with a real portrait screenshot, not a cropped landscape box. */
function FeaturePanel({
  heading,
  body,
  image,
  alt,
  reverse = false,
}: {
  heading: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <Panel width="lg:w-[92vw]" className="items-center">
      <div
        className={`grid w-full max-w-[1300px] items-center gap-10 sm:grid-cols-2 sm:gap-14 ${
          reverse ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <SlideIn className="flex justify-center">
          <PhoneFrame src={image} alt={alt} className="max-w-[300px]" />
        </SlideIn>
        <SlideIn delay={100}>
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
            {heading}
          </h2>
          <p className="mt-4 max-w-[50ch] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed opacity-90">
            {body}
          </p>
        </SlideIn>
      </div>
    </Panel>
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
      style={{ background: ACCENT, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-6 w-[100px] sm:h-7 sm:w-[120px]">
            <Image src={LOGO} alt="Care.com Homepay" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={
          <Link
            href="/#work"
            aria-label="Back to work"
            className="pointer-events-auto -m-3 flex min-h-11 min-w-11 items-center justify-center p-3 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] transition-opacity hover:opacity-60"
          >
            Close
          </Link>
        }
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-12 lg:pt-10"
        >
          {/* Logo left, headline right — matches the Figma title row. */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="relative h-9 w-[190px] sm:h-11 sm:w-[230px]">
              <Image src={LOGO} alt="Care.com Homepay" fill unoptimized priority className="object-contain object-left" />
            </div>
            <SlideIn className="max-w-[420px]">
              <p className="text-right text-2xl font-semibold leading-tight sm:text-4xl">
                Homepay Employee &amp; Employer Payroll App
              </p>
            </SlideIn>
          </div>

          <div className="mt-8 flex flex-1 items-end justify-center gap-6 sm:gap-10 lg:mt-0 lg:justify-center">
            <SlideIn delay={100}>
              <PhoneFrame src={SSO_SIGNUP} alt="SSO-aware onboarding for new caregivers" />
            </SlideIn>
            <SlideIn delay={200} className="mt-10 sm:mt-16">
              <PhoneFrame src={TIMESHEETS} alt="Weekly timesheet with zero-state guidance" />
            </SlideIn>
          </div>
        </section>

        {/* ── STATEMENT ─────────────────────────────────────────────── */}
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

        {/* ── SCREEN RECORDING ──────────────────────────────────────── */}
        {/* Real capture is a landscape-ish 1266×1004 screen recording, not
            a phone-portrait clip, so this uses a plain rounded card rather
            than the phone-bezel treatment above. */}
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

        {/* ── SECURE MESSAGING ──────────────────────────────────────── */}
        <FeaturePanel
          heading="Secure Messaging"
          body="Messaging between employee and employer apps, to easily respond and keep track of important dates and communications."
          image={INBOX_SWIPE}
          alt="Swipe actions for fast approvals in the inbox"
        />

        {/* ── CLOCK IN AND OUT ──────────────────────────────────────── */}
        <FeaturePanel
          heading="Clock In and Out"
          body="Easily clock in and out to accurately track hours worked, so your pay is always correct and on time."
          image={CLOCK_IN_OUT}
          alt="Clock in / out — quick, glanceable"
          reverse
        />

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
