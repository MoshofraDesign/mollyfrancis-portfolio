import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects, getProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body } from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "Netspend Rewards & UCM — Molly Francis",
  description:
    "Designed both sides of Netspend's rewards platform — the internal Unified Commerce Management tool built 0→1 in 5 months, and the consumer-facing Rewards Tab redesign.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#313131";
const LOGO = "/logos/netspend.svg";

// Figma assets — valid 7 days from generation
const imgDebitCards    = "https://www.figma.com/api/mcp/asset/d75df409-f80f-43dc-940f-04743c6405c7.png";
const imgImage16       = "https://www.figma.com/api/mcp/asset/f1287641-89ea-4401-8242-b30da9cd8aee.png";
const imgImage19       = "https://www.figma.com/api/mcp/asset/eec7b50e-0021-4097-a2e8-14d22adccf7d.png";
const imgImage17       = "https://www.figma.com/api/mcp/asset/9d6c0111-6add-428d-ab2a-20c06bc3fa52.png";
const imgImage18       = "https://www.figma.com/api/mcp/asset/f61e356b-60a0-4284-851b-a3743dc99fb4.png";
const imgSubmitter     = "https://www.figma.com/api/mcp/asset/34f4413a-4107-4067-8e2a-364c8040097c.png";
const imgCashBack      = "https://www.figma.com/api/mcp/asset/3f9061f9-b0ab-45b6-bf4a-7ad1545e714e.png";
const imgGooglePlay    = "https://www.figma.com/api/mcp/asset/af446b09-4122-48a0-9d6c-f5ce61ca9d7c.svg";
const imgAppStore      = "https://www.figma.com/api/mcp/asset/f4aa88ed-c1a4-4aad-9e95-f20c20d9f2bd.svg";

function SmallLogo() {
  return (
    <div className="relative h-[32px] w-[260px]">
      <Image src={LOGO} alt="Netspend" fill unoptimized className="object-contain object-left" />
    </div>
  );
}

export default function NetspendCaseStudy() {
  const idx = projects.findIndex((p) => p.slug === "netspend");
  const next = projects[(idx + 1) % projects.length];

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-[32px] w-[260px]">
            <Image src={LOGO} alt="Netspend" fill unoptimized className="object-contain object-left" />
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

        {/* ── PANEL 1: HERO ─────────────────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo — top left */}
          <div className="relative h-[60px] w-[300px] sm:h-[70px] sm:w-[420px] lg:absolute lg:left-[6.94vw] lg:top-[10vh] lg:h-[8.98vw] lg:w-[58.47vw] lg:max-w-[842px]">
            <Image src={LOGO} alt="Netspend" fill unoptimized priority className="object-contain object-left" />
          </div>

          {/* Description — bottom left */}
          <div className="flex flex-1 flex-col justify-end lg:absolute lg:bottom-[10.3vh] lg:left-[6.94vw] lg:w-[308px]">
            <SlideIn className="flex flex-col gap-2 text-white">
              <p className="font-semibold text-[clamp(1.25rem,2.5vw,2.25rem)] leading-[1.28]">
                Netspend Rewards
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-relaxed opacity-80">
                Rewards helps you earn cash back by giving you rewards for some
                of your everyday purchases.
              </p>
            </SlideIn>
            {/* App badges */}
            <div className="mt-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgGooglePlay} alt="Google Play" className="h-[50px] w-[50px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgAppStore} alt="App Store" className="h-[50px] w-[50px]" />
            </div>
          </div>

          {/* Debit cards falling — right side */}
          <SlideIn delay={100} className="flex justify-center lg:absolute lg:right-0 lg:top-[226px] lg:w-[54.93vw] lg:max-w-[791px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgDebitCards}
              alt="Netspend debit cards"
              className="h-auto w-full object-cover"
            />
          </SlideIn>
        </section>

        {/* ── PANEL 2: CONTEXT TITLE ────────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="mb-8 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[65.97vw] lg:max-w-[950px]">
            <SlideIn>
              <h1 className="font-semibold text-white leading-[1.17] text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Context / The Setup
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="text-white/70 text-[clamp(1rem,2.2vw,2rem)] leading-relaxed mt-4">
                From Spreadsheets to a Single Platform
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: CONTEXT BODY ─────────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="mb-8 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[65.97vw] lg:max-w-[950px]">
            <SlideIn>
              <p className="text-white text-[clamp(1rem,2.2vw,2rem)] leading-relaxed">
                Netspend&rsquo;s Rewards program — powering cashback, affiliate offers, and
                partner campaigns for millions of cardholders — was being managed entirely
                through a legacy system called Meridian, built on a siloed tech stack that
                couldn&rsquo;t keep up with the business. Internally, the team setting up
                and managing those rewards had no dedicated tool. Campaigns were configured
                manually, data lived in Excel, and there was no single place to see what
                was live, what was performing, and what needed attention.
              </p>
            </SlideIn>
            <SlideIn delay={120}>
              <p className="text-white text-[clamp(1rem,2.2vw,2rem)] leading-relaxed mt-6">
                My role was to design the{" "}
                <span className="font-semibold">Unified Commerce Management (UCM) tool</span>
                {" "}— an internal platform that gives the Netspend rewards team full control
                over advertisers, campaigns, and offer flights — while simultaneously
                redesigning the{" "}
                <span className="font-semibold">consumer-facing Rewards Tab</span>
                {" "}that cardholders see in the Netspend app and desktop experience.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: GOAL ─────────────────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[69.37vw] lg:max-w-[999px]">
            <SlideIn>
              <h2 className="font-semibold text-white leading-[1.17] text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Goal
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 text-white">
                {[
                  ["UCM internal tool", "Design a 0→1 internal platform — wizard-based campaign setup, live revenue dashboard, direct-access nav, external media library, and Transaction Engine — built in 5 months."],
                  ["Consumer Rewards Tab", "Redesign the cardholder experience around personalization, category browsing, earnings transparency, and a validated search — scaled to match what UCM makes possible."],
                  ["Both sides, one data model", "What's configured in UCM surfaces directly in the consumer tab. Category, offer type, reward amount, and eligibility logic all flow through the same system."],
                  ["0 → 1 in 5 months", "From first wireframe to handoff-ready product — advertiser onboarding, campaign management, flight configuration, revenue dashboard, and media library."],
                ].map(([h, b], i) => (
                  <SlideIn key={h as string} delay={i * 60}>
                    <div className="border-t border-white/15 pt-5">
                      <p className="font-semibold text-lg mb-2">{h}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{b}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: UCM PROTOTYPE (interactive iframe) ──────────── */}
        <Panel width="lg:w-screen">
          <div className="mb-6 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center lg:absolute lg:inset-0 lg:pt-[10vh] px-6 lg:px-[6.94vw]">
            <SlideIn className="w-full">
              <div className="flex items-end justify-between mb-4 w-full max-w-[1200px]">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Internal tool</p>
                  <h2 className="font-semibold text-white text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.2]">
                    UCM — Unified Commerce Management
                  </h2>
                </div>
                <a
                  href="/work/netspend/ucm-prototype.html"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 ml-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  Open full screen ↗
                </a>
              </div>
              <div className="w-full max-w-[1200px] overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]" style={{ height: "clamp(420px, 55vh, 680px)" }}>
                <iframe
                  src="/work/netspend/ucm-prototype.html"
                  title="UCM Rewards Internal Tool Prototype"
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: OUTCOME ──────────────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:-translate-y-1/2 lg:w-[69.37vw] lg:max-w-[999px]">
            <SlideIn>
              <h2 className="font-semibold text-white leading-[1.17] text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Outcome
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 text-white">
                {[
                  ["0 → 1 in 5 months", "The UCM tool went from no existing product to a fully designed, handoff-ready platform — covering advertiser onboarding, campaign management, flight configuration, revenue dashboard, and media library."],
                  ["Dev starts June 2026", "Development scoped to begin end of June / early July, with a target launch by end of year."],
                  ["$500K → $10M revenue target", "Rewards revenue projected to grow from ~$500K (2025) toward a $10M target. UCM and the consumer redesign are the infrastructure that makes that growth manageable."],
                  ["AI-augmented throughout", "Used Claude, Gemini, and Figma Make throughout — for research synthesis, rapid prototyping, and exploring more layout directions per round than a manual process allows."],
                ].map(([h, b], i) => (
                  <SlideIn key={h as string} delay={i * 60}>
                    <div className="border-t border-white/15 pt-5">
                      <p className="font-semibold text-lg mb-2">{h}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{b}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 7: APP SCREEN + DESCRIPTION ────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="mb-8 lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <SmallLogo />
          </div>

          {/* Phone mockup — right center */}
          <SlideIn delay={80} className="flex justify-center lg:absolute lg:left-[39.58vw] lg:top-[182px]">
            <div className="relative w-[299px] h-[686px] bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[36px] bg-[#1a1a1a] flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c940]" />
              </div>
              <div className="absolute top-[36px] left-0 w-full h-[650px] bg-white/10 flex items-center justify-center">
                <p className="text-black/30 text-xs text-center px-4">
                  Netspend App Rewards screen recording
                </p>
              </div>
            </div>
          </SlideIn>

          {/* Description — bottom left */}
          <div className="mt-8 flex flex-col gap-4 text-white lg:absolute lg:bottom-[10.3vh] lg:left-[6.94vw] lg:mt-0 lg:w-[308px]">
            <SlideIn>
              <p className="font-semibold text-[clamp(1.25rem,2.5vw,2.25rem)] leading-[1.28]">
                Netspend App Rewards Page
              </p>
            </SlideIn>
            <SlideIn delay={80}>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-relaxed opacity-70">
                The consumer-facing Rewards Tab redesigned for personalization,
                category browsing, earnings transparency, and global search.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 8: FOUR APP SCREENS ─────────────────────────────── */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10 px-6 lg:px-0">
              {[
                [imgImage16, "Rewards home — personalized feed"],
                [imgImage19, "Category browsing"],
                [imgImage17, "Offer detail"],
                [imgImage18, "Earnings breakdown"],
              ].map(([src, alt], i) => (
                <SlideIn key={alt as string} delay={i * 60}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src as string}
                    alt={alt as string}
                    className="h-auto w-[228px] max-w-[45vw] rounded-[30px] object-cover shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    style={{ aspectRatio: "228/494" }}
                  />
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        {/* ── PANEL 9: PORTRAIT ─────────────────────────────────────── */}
        <Panel width="lg:w-[65.97vw] lg:max-w-[950px]">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <SlideIn>
              <div className="relative h-[400px] w-[400px] max-w-[80vw] overflow-hidden rounded-full sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSubmitter}
                  alt="Netspend cardholder"
                  className="absolute top-0 h-full object-cover"
                  style={{ left: "-19.08%", width: "133.37%" }}
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 10: CASH BACK REWARDS ───────────────────────────── */}
        <Panel width="lg:w-[65.97vw] lg:max-w-[950px]">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <SlideIn className="w-full px-6 lg:px-0 lg:absolute lg:left-[177px] lg:top-[249px] lg:w-[640px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgCashBack}
                alt="Cash back rewards offers"
                className="h-auto w-full object-cover"
              />
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
