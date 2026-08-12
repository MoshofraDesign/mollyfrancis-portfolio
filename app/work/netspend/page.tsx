import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { Panel } from "@/components/v2/CaseStudyKit";

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
const ASSET = "/work/netspend";

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
          <div className="relative h-[26px] w-[245px]">
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

        {/* ── PANEL 1: HERO — Figma 4553:22203
            Logo 842×90 at 100,100; cards at 498,226; copy + badges bottom-left. */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo — same anchor (left/top), slightly smaller than Figma 842×90 */}
          <div className="relative h-[52px] w-[260px] sm:h-[60px] sm:w-[360px] lg:absolute lg:left-[6.94%] lg:top-[10%] lg:h-[72px] lg:w-[min(680px,47vw)]">
            <Image
              src={LOGO}
              alt="Netspend"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Description — Figma bottom:103 left:100 w:308 */}
          <div className="flex flex-1 flex-col justify-end lg:absolute lg:bottom-[10.3%] lg:left-[6.94%] lg:w-[308px]">
            <SlideIn className="flex flex-col gap-2 text-white">
              <p className="font-semibold leading-[1.28] text-[clamp(1.25rem,2.5vw,2.25rem)]">
                Netspend Rewards
              </p>
              <p className="text-[clamp(0.9rem,1.25vw,1.125rem)] leading-normal opacity-90">
                Rewards helps you earn cash back by giving you rewards for some
                of your everyday purchases.
              </p>
            </SlideIn>
          </div>

          {/* App badges — Figma left:100 top:699 */}
          <div className="mt-6 flex items-center gap-4 lg:absolute lg:left-[6.94%] lg:top-[69.9%] lg:mt-0">
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

          {/* Debit cards — pulled left from Figma 498 (~34.58%) so they sit closer to center */}
          <SlideIn
            delay={100}
            className="flex justify-center lg:absolute lg:left-[26%] lg:top-[226px] lg:w-[54.93%] lg:max-w-[791px]"
          >
            <Image
              src={`${ASSET}/debit-cards.png`}
              alt="Netspend debit cards"
              width={1200}
              height={967}
              priority
              className="h-auto w-full object-contain"
            />
          </SlideIn>
        </section>

        {/* ── PANEL 2: CONTEXT TITLE — Figma 4553:22209 */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94%] lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-[950px]">
            <SlideIn>
              <h1 className="font-semibold leading-[1.17] text-white text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Context / The Setup
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="mt-4 text-[clamp(1rem,2.2vw,2rem)] leading-normal text-white/70">
                From Spreadsheets to a Single Platform
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 3: CONTEXT BODY — Figma 4574:1918 */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center gap-4 lg:absolute lg:left-[6.94%] lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-[950px]">
            <SlideIn>
              <h2 className="font-semibold leading-[1.17] text-white text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Context / The Setup
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="text-[clamp(1rem,2.2vw,2rem)] leading-normal text-white">
                Netspend&rsquo;s Rewards program — powering cashback, affiliate offers, and
                partner campaigns for millions of cardholders — was being managed entirely
                through a legacy system called Meridian, built on a siloed tech stack that
                couldn&rsquo;t keep up with the business. Internally, the team setting up
                and managing those rewards had no dedicated tool. Campaigns were configured
                manually, data lived in Excel, and there was no single place to see what
                was live, what was performing, and what needed attention.
              </p>
            </SlideIn>
            <SlideIn delay={180}>
              <p className="text-[clamp(1rem,2.2vw,2rem)] leading-normal text-white">
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

        {/* ── PANEL 4: GOAL — Figma 4553:22214 */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94%] lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-[950px]">
            <SlideIn>
              <h2 className="font-semibold leading-[1.17] text-white text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Goal
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <div className="mt-6 grid gap-8 text-white sm:grid-cols-2">
                {[
                  ["UCM internal tool", "Design a 0→1 internal platform — wizard-based campaign setup, live revenue dashboard, direct-access nav, external media library, and Transaction Engine — built in 5 months."],
                  ["Consumer Rewards Tab", "Redesign the cardholder experience around personalization, category browsing, earnings transparency, and a validated search — scaled to match what UCM makes possible."],
                  ["Both sides, one data model", "What's configured in UCM surfaces directly in the consumer tab. Category, offer type, reward amount, and eligibility logic all flow through the same system."],
                  ["0 → 1 in 5 months", "From first wireframe to handoff-ready product — advertiser onboarding, campaign management, flight configuration, revenue dashboard, and media library."],
                ].map(([h, b], i) => (
                  <SlideIn key={h} delay={i * 60}>
                    <div className="border-t border-white/15 pt-5">
                      <p className="mb-2 text-lg font-semibold">{h}</p>
                      <p className="text-sm leading-relaxed text-white/60">{b}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: UCM PROTOTYPE (interactive iframe) ──────────── */}
        <Panel width="lg:w-screen" className="items-center">
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 sm:px-8 lg:absolute lg:inset-0 lg:px-[6.94%]">
            <SlideIn className="w-full max-w-[950px]">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    Internal tool
                  </p>
                  <h2 className="mt-2 font-semibold leading-[1.17] text-white text-[clamp(1.5rem,3.5vw,2.75rem)]">
                    UCM — Unified Commerce Management
                  </h2>
                </div>
                <a
                  href="/work/netspend/ucm/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-white/50 hover:text-white"
                >
                  Open full screen ↗
                </a>
              </div>
              <div
                className="aspect-[16/10] w-full max-h-[min(70vh,720px)] overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              >
                <iframe
                  src="/work/netspend/ucm/index.html"
                  title="UCM Rewards Internal Tool Prototype"
                  className="h-full w-full bg-white"
                  style={{ border: "none" }}
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5b: UCM SCREENSHOTS — mapped to Goal pillars ───── */}
        {(
          [
            {
              title: "Live revenue dashboard",
              body: "Real-time performance across stacked offers, redemptions, and retention — the single view Meridian never had.",
              src: `${ASSET}/ucm/screens/01-dashboard.png`,
            },
            {
              title: "Advertiser onboarding",
              body: "Partner accounts that fund offers, campaigns, and flights — with budget, status, and domain in one table.",
              src: `${ASSET}/ucm/screens/02-advertisers.png`,
            },
            {
              title: "Campaign management",
              body: "Advertiser-funded programs grouped into flights, with spend pacing and offer type at a glance.",
              src: `${ASSET}/ucm/screens/03-campaigns.png`,
            },
            {
              title: "Wizard-based flight setup",
              body: "Four-step Create Flight flow — basic info, incentive config, ad setup, review — without leaving the tool.",
              src: `${ASSET}/ucm/screens/08-flight-wizard.png`,
            },
            {
              title: "Media library",
              body: "Upload and manage creatives for offer flights — logos, banners, and campaign assets in one place.",
              src: `${ASSET}/ucm/screens/05-media.png`,
            },
            {
              title: "Reward rules engine",
              body: "Multi-event, stacked, and status-contingent rules — configured without code.",
              src: `${ASSET}/ucm/screens/06-rules.png`,
            },
          ] as const
        ).map((shot) => (
          <Panel key={shot.src} width="lg:w-screen">
            <div className="flex flex-1 flex-col justify-center gap-5 px-5 sm:px-8 lg:absolute lg:left-[6.94%] lg:right-[6.94%] lg:top-1/2 lg:-translate-y-1/2 lg:px-0">
              <SlideIn className="w-full max-w-[950px]">
                <h2 className="font-semibold leading-[1.17] text-white text-[clamp(1.75rem,4vw,3rem)]">
                  {shot.title}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[clamp(1rem,1.6vw,1.35rem)] leading-normal text-white/70">
                  {shot.body}
                </p>
              </SlideIn>
              <SlideIn delay={100} className="w-full max-w-[950px]">
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.35)]">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={2880}
                    height={1800}
                    sizes="(max-width: 950px) 100vw, 950px"
                    className="h-auto w-full"
                  />
                </div>
              </SlideIn>
            </div>
          </Panel>
        ))}

        {/* ── PANEL 6: USER-TEST PHONES — Figma 4553:22218 (277×600 ×4, gap 40) */}
        <Panel width="lg:w-screen" className="items-center">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <div className="flex flex-wrap justify-center gap-6 px-4 lg:gap-10 lg:px-0">
              {[
                [`${ASSET}/phone-landing.png`, "Rewards home — popular offers"],
                [`${ASSET}/phone-hellofresh.png`, "Offer detail — Hello Fresh"],
                [`${ASSET}/phone-transactions.png`, "Cash back transactions"],
                [`${ASSET}/phone-groceries.png`, "Grocery category browsing"],
              ].map(([src, alt], i) => (
                <SlideIn key={alt} delay={i * 60}>
                  <Image
                    src={src}
                    alt={alt}
                    width={393}
                    height={852}
                    className="h-auto w-[min(277px,42vw)] object-contain"
                  />
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        {/* ── PANEL 7: OUTCOME — Figma 4553:22220 */}
        <Panel width="lg:w-screen">
          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94%] lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-[950px]">
            <SlideIn>
              <h2 className="font-semibold leading-[1.17] text-white text-[clamp(2.5rem,5.6vw,5.0625rem)]">
                Outcome
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <div className="mt-6 grid gap-8 text-white sm:grid-cols-2">
                {[
                  ["0 → 1 in 5 months", "The UCM tool went from no existing product to a fully designed, handoff-ready platform — covering advertiser onboarding, campaign management, flight configuration, revenue dashboard, and media library."],
                  ["Dev starts June 2026", "Development scoped to begin end of June / early July, with a target launch by end of year."],
                  ["$500K → $10M revenue target", "Rewards revenue projected to grow from ~$500K (2025) toward a $10M target. UCM and the consumer redesign are the infrastructure that makes that growth manageable."],
                  ["AI-augmented throughout", "Used Claude, Gemini, and Figma Make throughout — for research synthesis, rapid prototyping, and exploring more layout directions per round than a manual process allows."],
                ].map(([h, b], i) => (
                  <SlideIn key={h} delay={i * 60}>
                    <div className="border-t border-white/15 pt-5">
                      <p className="mb-2 text-lg font-semibold">{h}</p>
                      <p className="text-sm leading-relaxed text-white/60">{b}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 8: CUSTOMER APP SCREEN RECORDING — max 950px
            Source: Desktop Screen Recording 2026-08-12 at 3.42.17 PM (1416×1030). */}
        <Panel width="lg:w-screen" className="items-center">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <SlideIn className="w-full max-w-[950px] px-4 lg:px-0">
              <div className="relative aspect-[1416/1030] w-full overflow-hidden rounded-xl bg-black/40 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]">
                <AutoplayVideo
                  src={`${ASSET}/videos/netspend-rewards.mp4`}
                  className="h-full w-full object-contain"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 9: PORTRAIT + CASH BACK — Figma 4553:22234 (1078×1000)
            Circle 600×600 + offers card 389×305 overlapping at right. */}
        <Panel width="lg:w-[74.86vw] lg:max-w-[1078px]" className="items-center">
          <div className="flex flex-1 items-center justify-center lg:absolute lg:inset-0">
            <SlideIn className="relative w-full max-w-[824px] px-6 lg:px-0">
              <div className="relative mx-auto aspect-[824/600] w-full max-w-[824px]">
                <div className="absolute left-0 top-0 size-[72.8%] max-w-[600px] overflow-hidden rounded-full">
                  <Image
                    src={`${ASSET}/portrait.png`}
                    alt="Netspend cardholder"
                    fill
                    sizes="600px"
                    className="object-cover"
                    style={{ objectPosition: "30% center" }}
                  />
                </div>
                <div className="absolute bottom-[7.3%] right-0 w-[47.2%] max-w-[389px] overflow-hidden rounded-[30px] shadow-[0_0_10px_rgba(0,0,0,0.19)]">
                  <Image
                    src={`${ASSET}/cash-back.png`}
                    alt="Cash back rewards offers"
                    width={640}
                    height={501}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
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
