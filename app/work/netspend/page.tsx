import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import UcmScreensCarousel from "@/components/UcmScreensCarousel";
import { Panel, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

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
/** Full-viewport panels (Fresh Direct–style); content is centered inside. */
const VIEW = "lg:w-screen";
/** ~132rem on their fluid root ≈ 860px — readable measure that scales. */
const MEASURE = "w-full max-w-[min(54rem,86vw)]";
const MEDIA = "w-full max-w-[min(950px,90vw)]";

const H_DISPLAY =
  "font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(2rem,4.5vw,4.05rem)] [text-wrap:pretty]";
const H_SECTION =
  "font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(1.75rem,3.6vw,3rem)] [text-wrap:pretty]";
const BODY =
  "text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white [text-wrap:pretty]";
const BODY_MUTED =
  "text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white/70 [text-wrap:pretty]";

export default function NetspendCaseStudy() {
  const idx = projects.findIndex((p) => p.slug === "netspend");
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const meta = getCaseStudyMeta(project);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        parkLeft={32}
        logo={
          <div className="relative h-[22px] w-[200px]">
            <Image src={LOGO} alt="Netspend" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>

        {/* ── PANEL 1: HERO — Figma 4553:22203
            Logo 842×90 at 100,100; cards at 498,226; copy + badges bottom-left.
            Use 100dvw (not w-screen/100vw) so the panel matches the scroller
            and the card fan isn’t clipped by the scrollbar gutter. */}
        <section
          id="title"
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-6 sm:px-10 lg:h-[100dvh] lg:w-[100dvw] lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Large logo — same left/top anchor; height-driven so the wordmark never clips */}
          <div className="relative z-10 h-[52px] w-[min(100%,20rem)] sm:h-[60px] sm:w-[22.5rem] lg:absolute lg:left-[6.94%] lg:top-[10%] lg:h-[72px] lg:w-[min(680px,47vw)]">
            <Image
              src={LOGO}
              alt="Netspend"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Debit cards — sit in the open area right of the logo/copy, fully inside
              the frame (Figma 498,226 / 791×638). Insets + object-contain keep the
              orange tip from getting cropped. */}
          <div className="pointer-events-none relative z-0 mx-auto flex aspect-[791/638] w-full max-w-[min(90vw,26rem)] items-center justify-center lg:absolute lg:left-[24%] lg:right-[6%] lg:top-[14%] lg:bottom-[24%] lg:aspect-auto lg:w-auto lg:max-w-none lg:p-6">
            <Image
              src={`${ASSET}/debit-cards.png`}
              alt="Netspend debit cards"
              width={1200}
              height={967}
              priority
              unoptimized
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>

          {/* Badges + copy — one block on mobile so they can’t overlap */}
          <div className="relative z-10 flex flex-col gap-5 lg:absolute lg:bottom-[10.3%] lg:left-[6.94%] lg:z-10 lg:w-[308px] lg:gap-8">
            <div className="flex items-center gap-4">
              <Image
                src={`${ASSET}/google-play.svg`}
                alt="Google Play"
                width={50}
                height={50}
                unoptimized
                className="size-10 sm:size-[50px]"
              />
              <Image
                src={`${ASSET}/app-store.svg`}
                alt="App Store"
                width={50}
                height={50}
                unoptimized
                className="size-10 sm:size-[50px]"
              />
            </div>
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
        </section>

        {/* ── PANEL 3: CONTEXT BODY ──────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-6`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Context / The Setup</h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-5 ${BODY_MUTED}`}>From Spreadsheets to a Single Platform</p>
            </SlideIn>
            <SlideIn delay={140}>
              <p className={`mt-6 ${BODY}`}>
                Netspend&rsquo;s Rewards program powered cashback and partner offers for
                millions of cardholders — but it ran on Meridian, a legacy stack that
                couldn&rsquo;t keep up. Internally there was no dedicated tool: campaigns
                lived in Excel, with no single view of what was live or performing.
              </p>
            </SlideIn>
            <SlideIn delay={220}>
              <p className={BODY}>
                I designed both sides:{" "}
                <span className="font-semibold">Unified Commerce Management (UCM)</span>
                {" "}for the rewards team to run advertisers, campaigns, and offer flights —
                and the{" "}
                <span className="font-semibold">consumer Rewards Tab</span>
                {" "}cardholders see in the Netspend app.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: GOAL ──────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Goal</h2>
            </SlideIn>
            <SlideIn delay={100}>
              <div className="mt-8 grid gap-8 text-white md:grid-cols-3 md:gap-x-8">
                {[
                  ["UCM internal tool", "Design a 0→1 internal platform — wizard-based campaign setup, live revenue dashboard, direct-access nav, external media library, and Transaction Engine — built in 5 months."],
                  ["Consumer Rewards Tab", "Redesign the cardholder experience around personalization, category browsing, earnings transparency, and a validated search — scaled to match what UCM makes possible."],
                  ["Both sides, one data model", "What's configured in UCM surfaces directly in the consumer tab. Category, offer type, reward amount, and eligibility logic all flow through the same system."],
                ].map(([h, b], i) => (
                  <SlideIn key={h} delay={i * 60}>
                    <div className="border-t border-white/15 pt-5">
                      <p className="mb-2 text-[clamp(1.15rem,1.6vw,1.35rem)] font-semibold">{h}</p>
                      <p className={BODY_MUTED}>{b}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: UCM SCREENSHOTS — single carousel section ───── */}
        <Panel width={VIEW} pad="center" className="items-center">
          <SlideIn className="w-full">
            <UcmScreensCarousel
              headingClassName={H_SECTION}
              bodyClassName={BODY_MUTED}
              caption="Internal Rewards Tool"
              frameClassName="overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
              screens={[
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
              ]}
            />
          </SlideIn>
        </Panel>

        {/* ── PANEL 6: USER-TEST PHONES — one row at lg+, 2×2 below */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto w-full max-w-[min(1200px,94vw)]">
            <div className="grid grid-cols-2 items-end justify-items-center gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {[
                [`${ASSET}/phone-landing.png`, "Rewards home — popular offers"],
                [`${ASSET}/phone-hellofresh.png`, "Offer detail — Hello Fresh"],
                [`${ASSET}/phone-transactions.png`, "Cash back transactions"],
                [`${ASSET}/phone-groceries.png`, "Grocery category browsing"],
              ].map(([src, alt], i) => (
                <SlideIn key={alt} delay={i * 60} className="w-full max-w-[240px]">
                  <Image
                    src={src}
                    alt={alt}
                    width={393}
                    height={852}
                    className="h-auto w-full object-contain"
                  />
                </SlideIn>
              ))}
            </div>
            <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              Consumer App
            </p>
          </div>
        </Panel>

        {/* ── PANEL: CUSTOMER APP SCREEN RECORDING ───────────────────── */}
        <Panel width={VIEW} pad="center" className="items-center">
          <SlideIn className={`${MEDIA} mx-auto`}>
            <div className="relative aspect-[1416/1030] w-full overflow-hidden rounded-xl bg-black/40 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]">
              <AutoplayVideo
                sources={[
                  { src: `${ASSET}/videos/netspend-rewards.mov`, type: "video/quicktime" },
                  { src: `${ASSET}/videos/netspend-rewards.mp4`, type: "video/mp4" },
                ]}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              Consumer App
            </p>
          </SlideIn>
        </Panel>

        {/* ── PANEL: PORTRAIT + CASH BACK (single composite) ─────────── */}
        <Panel width={VIEW} pad="center" className="items-center">
          <SlideIn className="mx-auto w-full max-w-[min(834px,90vw)]">
            <Image
              src={`${ASSET}/portrait-cashback.png`}
              alt="Netspend cardholder with cash back offers"
              width={834}
              height={600}
              className="h-auto w-full object-contain"
            />
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              Consumer App
            </p>
          </SlideIn>
        </Panel>

        {/* ── PANEL: OUTCOME — before next project ───────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Outcome</h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-8 ${BODY}`}>
                The UCM tool went from no existing product to a fully designed,
                handoff-ready platform in five months — covering advertiser
                onboarding, campaign management, flight configuration, revenue
                dashboard, and media library. Bringing rewards management in-house
                replaced a third-party vendor and saved the company from continuing
                to pay for that stack. AI tools (Claude, Gemini, and Figma Make)
                ran throughout: research synthesis, rapid prototyping, and more
                layout directions per round than a manual process allows.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={meta} />

        {/* ── PANEL: LIVE PROTOTYPE — title + link (GovOS pattern) ─── */}
        {project.prototype && (
          <Panel width="lg:w-[min(100vw,36rem)]" pad="center">
            <div className={`${MEASURE} mx-auto`}>
              <SlideIn>
                <h2 className={H_DISPLAY}>Live UCM prototype</h2>
                <a
                  href={project.prototype}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[clamp(0.95rem,1.2vw,1.1rem)] text-white transition-opacity hover:opacity-60"
                >
                  Open prototype ↗
                </a>
              </SlideIn>
            </div>
          </Panel>
        )}

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
