import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { Panel, TextPanel, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

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
          <div className="pointer-events-none relative z-0 mx-auto flex aspect-[791/638] w-full max-w-[min(90vw,26rem)] items-center justify-center lg:absolute lg:left-[22%] lg:right-[5%] lg:top-[12%] lg:bottom-[22%] lg:aspect-auto lg:w-auto lg:max-w-none lg:p-6 xl:left-[18%] xl:right-[4%] xl:top-[10%] xl:bottom-[18%] 2xl:left-[14%] 2xl:right-[3%] 2xl:top-[8%] 2xl:bottom-[14%]">
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

        {/* Rewards ran on spreadsheets... — matches production narrative */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>Rewards ran on spreadsheets. No one could see what was live — or what was working.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>I designed both sides of the fix: the internal tool that manages the program, and the app experience it powers.</p>
          </SlideIn>
        </TextPanel>

        {/* So I built the thing that didn't exist — its own beat, three lines */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>
              So I built the thing that didn&apos;t exist:
              <br />
              a single platform
              <br />
              to run the whole program.
            </h2>
          </SlideIn>
        </TextPanel>

        {/* Create Flight wizard — walkthrough video the previous beat leads into.
            TODO: campaign-setup.mov/.mp4 need to be dropped into
            public/work/netspend/videos/ — placeholder src until then. */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEDIA} mx-auto`}>
            <SlideIn>
              <div className="relative aspect-[1600/1000] w-full overflow-hidden rounded-xl">
                <AutoplayVideo
                  sources={[
                    { src: `${ASSET}/videos/campaign-setup.mov`, type: "video/quicktime" },
                    { src: `${ASSET}/videos/campaign-setup.mp4`, type: "video/mp4" },
                  ]}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="story-caption-in mt-4 text-center text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white/55 [text-wrap:pretty]">
                Campaign setup — a wizard, not a spreadsheet
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* Zero to one. Five months. — lone headline beat */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>Zero to one. Five months.</h2>
          </SlideIn>
        </TextPanel>

        {/* Then the side cardholders actually see — 4-phone grid */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto w-full max-w-[min(1200px,94vw)]">
            <SlideIn>
              <h2 className="mb-8 text-center font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(1.5rem,3.2vw,2.65rem)] [text-wrap:pretty]">
                Then the side cardholders actually see.
              </h2>
            </SlideIn>
            <div className="grid grid-cols-2 items-end justify-items-center gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {[
                [`${ASSET}/phone-landing.png`, "Personalized offers"],
                [`${ASSET}/phone-hellofresh.png`, "How it works"],
                [`${ASSET}/phone-transactions.png`, "Cash back, easy to track"],
                [`${ASSET}/phone-groceries.png`, "Browse by category"],
              ].map(([src, caption], i) => (
                <SlideIn key={caption} delay={i * 60} className="w-full max-w-[240px]">
                  <Image
                    src={src}
                    alt={caption}
                    width={393}
                    height={852}
                    unoptimized
                    className="h-auto w-full object-contain"
                  />
                  <p className="mt-2 text-center text-[clamp(0.8rem,1vw,0.95rem)] leading-snug text-white/55">
                    {caption}
                  </p>
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        {/* Search validated, not guessed at. — screen recording, matches production */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEDIA} mx-auto`}>
            <SlideIn>
              <div className="relative aspect-[1416/1030] w-full overflow-hidden rounded-xl bg-black/40 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)]">
                <AutoplayVideo
                  sources={[
                    { src: `${ASSET}/videos/netspend-rewards.mov`, type: "video/quicktime" },
                    { src: `${ASSET}/videos/netspend-rewards.mp4`, type: "video/mp4" },
                  ]}
                  className="h-full w-full object-contain"
                />
              </div>
            </SlideIn>
            <SlideIn delay={100}>
              <p className="mt-4 text-center text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white/55 [text-wrap:pretty]">
                Search validated, not guessed at.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* Configure it once. It shows up everywhere. */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>Configure it once. It shows up everywhere.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>Category, offer type, reward amount, eligibility — set in the internal tool, live in the consumer tab. One data model, two experiences.</p>
          </SlideIn>
        </TextPanel>

        {/* Handoff-ready in five months */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>Handoff-ready in five months. And it replaced a vendor the company was paying for.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>AI ran through the whole process — Claude, Gemini, Figma Make — for research synthesis and rapid prototyping. More layout directions per round than doing it by hand allows.</p>
          </SlideIn>
        </TextPanel>

        {/* Outcome stats — production shows "$500K → $0M" / "0 → 0" here, which reads like a
            template bug clipping the second number. Using the real values from lib/projects.ts
            (meta.projected) with production's new labels instead of reproducing the bug. */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto grid gap-10 md:grid-cols-2 md:gap-x-12`}>
            {[
              [meta.projected[0]?.value ?? "$500K → $10M", "projected rewards revenue"],
              [meta.projected[1]?.value ?? "0 → 1", "a platform that didn't exist five months ago"],
            ].map(([value, label], i) => (
              <SlideIn key={label} delay={i * 80}>
                <div>
                  <p className="font-semibold leading-none tracking-[-0.04em] text-white text-[clamp(2.4rem,6vw,4.6rem)]">
                    {value}
                  </p>
                  <p className="mt-3 text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white/55 [text-wrap:pretty]">
                    {label}
                  </p>
                </div>
              </SlideIn>
            ))}
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
