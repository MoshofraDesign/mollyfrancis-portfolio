import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta, nextProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { Panel, TextPanel, NextProjectLink, CaseStudyMetaPanel, END_PANEL, INTRO_TITLE, INTRO_SUBTEXT, END_TITLE, END_MEASURE, HERO_COPY_GAP, CAPTION, HERO_ROW, HERO_ROW_COPY, HERO_INSET_MD, HERO_TITLE, HERO_SUBTEXT, TITLE, SUBHEAD, BODY_TYPE, StatRow, VIEW } from "@/components/v2/CaseStudyKit";

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
/** ~132rem on their fluid root ≈ 860px — readable measure that scales. */

const H_DISPLAY = `text-white ${TITLE}`;
const H_SECTION = `text-white ${SUBHEAD}`;
const BODY = `text-white ${BODY_TYPE}`;
const BODY_MUTED = `text-white/80 ${BODY_TYPE}`;

export default function NetspendCaseStudy() {
  const idx = projects.findIndex((p) => p.slug === "netspend");
  const project = projects[idx];
  const next = nextProject("netspend");
  const meta = getCaseStudyMeta(project);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
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
          className={`relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-[100dvw] lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark + the Rewards copy are one wrapping row from tablet up —
              see HERO_ROW. The card fan follows them in the stack below lg;
              at lg all three are absolutely placed, so DOM order there
              makes no difference. */}
          <div className={HERO_ROW}>
          {/* Large logo — same left/top anchor; height-driven so the wordmark never clips */}
          <div className="relative z-10 h-[52px] w-[min(100%,20rem)] shrink-0 sm:h-[60px] sm:w-[22.5rem] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[72px] lg:w-[680px]">
            <Image
              src={LOGO}
              alt="Netspend"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Badges + copy — one block on mobile so they can’t overlap */}
          <div className={`relative z-10 flex flex-col gap-5 ${HERO_ROW_COPY} lg:absolute lg:bottom-[10.3%] lg:left-[50px] lg:z-10 lg:w-[308px] lg:gap-8`}>
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
            {/* A plain div, not SlideIn. A hero's title and tagline are the
                first thing on screen, and rolling them in delays the one
                line that says what the project is — Molly's call, applied
                to every project's hero. The media in the hero still
                reveals; only the copy is static. */}
            <div className={`flex flex-col text-white ${HERO_COPY_GAP}`}>
              <p className={HERO_TITLE}>
                Netspend Rewards
              </p>
              <p className={`opacity-90 ${HERO_SUBTEXT}`}>
                Rewards helps you earn cash back by giving you rewards for some
                of your everyday purchases.
              </p>
            </div>
          </div>
          </div>

          {/* Debit cards — sit in the open area right of the logo/copy, fully inside
              the frame (Figma 498,226 / 791×638). Insets + object-contain keep the
              orange tip from getting cropped. */}
          <div className="pointer-events-none relative z-0 mx-auto flex aspect-[791/638] w-full max-w-[min(90vw,26rem)] items-center justify-center lg:absolute lg:left-[25%] lg:right-[2%] lg:top-[19%] lg:bottom-[15%] lg:aspect-auto lg:w-auto lg:max-w-none lg:p-6 xl:left-[21%] xl:right-[1%] xl:top-[17%] xl:bottom-[11%] 2xl:left-[17%] 2xl:right-0 2xl:top-[15%] 2xl:bottom-[7%]">
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

        </section>

        {/* The problem beat. It was a heading with nothing under it — the
            only opening on the site without a paragraph, so the page went
            straight from the claim to the solution. */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={`text-white ${INTRO_TITLE}`}>Rewards ran on spreadsheets. No one could see what was live — or what was working.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>
              Every offer lived in a spreadsheet, and changing one meant an
              engineering ticket. Nobody could say which rewards were live,
              let alone which were earning anything.
            </p>
          </SlideIn>
        </TextPanel>

        {/* So I built the thing that didn't exist. The "both sides" line used
            to sit under the panel before this one, where it landed before the
            thing it describes existed; it belongs here, as the paragraph that
            says what the single platform actually is. Body on the kit's
            clamp scale rather than INTRO_SUBTEXT: 32px under an H_DISPLAY
            heading crowds it. */}
        <TextPanel width={VIEW}>
          <SlideIn>
            {/* One flowing line. The two <br />s used to force "a single
                platform / to run the whole program." onto their own lines,
                so the break landed right after the colon and the phrase read
                as a list. Let it wrap on its own; nbsp keeps "whole program."
                from orphaning the last word. */}
            <h2 className={H_DISPLAY}>
              So I built the thing that didn&apos;t exist: a single platform to
              run the whole&nbsp;program.
            </h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className="mt-3 text-[clamp(1.25rem,1.6vw,1.65rem)] font-normal leading-[1.45] text-white/90 [text-wrap:pretty]">
              I designed both sides of it: the internal tool where the team
              builds and manages every reward, and the cardholder app
              experience it powers. One system, so what gets configured is
              exactly what customers see.
            </p>
          </SlideIn>
        </TextPanel>

        {/* Create Flight wizard — walkthrough recorded from the UCM prototype's
            4-step flow (Basic Info / Incentive Config / Ad Setup / Review). */}
        <Panel width={VIEW} pad="center">
          {/* aspect-[1378/830], not 1600/1000. The clip is 1378x830 — 1.660 —
              against the box's 1.600, so object-cover filled the box by
              height and cropped the left and right edges off the wizard.
              object-contain as the belt, and the width capped by the room
              available (panel-media-max-h less the caption block, times the
              clip's aspect) so a short window scales it instead of
              overflowing the panel. */}
          <div className="mx-auto w-full max-w-[min(950px,90vw,calc((var(--panel-media-max-h)_-_3.5rem)_*_1.6602))]">
            <SlideIn>
              <div className="relative aspect-[1378/830] w-full overflow-hidden rounded-xl">
                <AutoplayVideo
                  sources={[
                    { src: `${ASSET}/videos/campaign-setup.mov`, type: "video/quicktime" },
                    { src: `${ASSET}/videos/campaign-setup.mp4`, type: "video/mp4" },
                  ]}
                  className="h-full w-full object-contain"
                />
              </div>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-4 text-center ${CAPTION}`}>
                Campaign setup — a wizard, not a spreadsheet
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* A NEW WAY OF WORKING — Figma 4553:22209.
            The "Zero to one. Five months." headline used to sit in its own
            panel just above this one. It was saying what the hero and the
            numbers row already say, so it's gone — this beat now follows the
            campaign-setup clip directly. Copy stays in the page's voice:
            two short beats, no tool-vendor pitch. The three marks are the
            tools named in the sentence, nothing more — the meta panel at the
            end still carries the full tool list. */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>A new way of working.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>
              AI sat inside the process, not next to it. Claude Cowork and Gemini
              turned Jira tickets into requirements I could design from. Cursor
              built working mockups out of our design-system components.
            </p>
          </SlideIn>
          <SlideIn delay={180}>
            <p className={`mt-4 ${BODY_MUTED}`}>
              So one round compared three directions instead of one — and the
              strongest one became the real&nbsp;design.
            </p>
          </SlideIn>
          <SlideIn delay={260}>
            <div className="mt-8 flex items-center gap-6 sm:gap-8">
              {[
                [`${ASSET}/tools/claude.png`, "Claude Cowork"],
                [`${ASSET}/tools/cursor.svg`, "Cursor"],
                [`${ASSET}/tools/gemini.png`, "Gemini"],
              ].map(([src, label]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Image
                    src={src}
                    alt=""
                    width={96}
                    height={96}
                    unoptimized
                    className="size-7 shrink-0 object-contain sm:size-8"
                  />
                  <span className="text-[clamp(1.05rem,1.25vw,1.25rem)] leading-[1.45] text-white/70 sm:text-[clamp(1.05rem,1.25vw,1.25rem)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </SlideIn>
        </TextPanel>

        {/* Then the side cardholders actually see — 4-phone grid */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto w-full max-w-[min(1200px,94vw)]">
            <SlideIn>
              <h2 className="mb-8 text-center font-semibold leading-[1.1] tracking-[-0.02em] text-white text-[clamp(1.9rem,2.4vw,2.6rem)] [text-wrap:pretty]">
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
                  <p className="mt-2 text-center text-[clamp(1.05rem,1.25vw,1.25rem)] leading-[1.45] text-white/55">
                    {caption}
                  </p>
                </SlideIn>
              ))}
            </div>
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

        {/* Search validated, not guessed at. — screen recording, matches production */}
        <Panel width={VIEW} pad="center">
          {/* Box already matches the clip (1416x1030); the width cap is what
              keeps it inside a short panel. 1.3748 is that aspect. */}
          <div className="mx-auto w-full max-w-[min(950px,90vw,calc((var(--panel-media-max-h)_-_3.5rem)_*_1.3748))]">
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
              <p className={`mt-4 text-center ${CAPTION}`}>
                Search validated, not guessed at.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* The outcome beat. The headline opened "Handoff-ready in five
            months." and the numbers panel beside it already says "Built in
            five months / 0 → 1" — so the headline lands the part no figure
            covers, and the body still carries the handoff once. */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>It replaced a vendor the company was paying for.</h2>
          </SlideIn>
          {/* The AI paragraph that used to be here is beat 4's ("A new way
              of working") almost word for word. Said once, where it belongs;
              this beat lands the outcome instead. */}
          <SlideIn delay={100}>
            <p className={`mt-3 ${BODY_MUTED}`}>
              The tool went to engineering handoff-ready, and the rewards it
              configures stopped needing a ticket to change.
            </p>
          </SlideIn>
        </TextPanel>

        {/* Outcome stats — Figma 4553:22220 layout: stacked stats left, the
            cashback portrait (circular photo + floating offer card) right. */}
        <Panel width={VIEW} pad="center">
          {/* Not lg:grid-cols-2. Two equal columns gave the two-line stat
              stack the same 490px the photo had, and the stack only needs
              about 340 — so the leftover sat as dead air between the copy
              and the picture. The copy column is sized to its content now
              and the photo takes the rest, at a tighter gap. */}
          <div className="mx-auto grid w-full max-w-[min(1120px,94vw)] items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8">
            {/* Through StatRow like every other project's figures: label
                above value on the shared scale. This one was the outlier —
                value above label, at TITLE size (4.05rem), in a bespoke
                stack. Stacked rather than side by side because it shares
                the panel with the portrait. Labelled as projections, since
                that's what they are: no post-launch data exists yet. */}
            <StatRow
              stack
              className="text-white"
              items={[
                {
                  label: "Projected rewards revenue",
                  value: meta.projected[0]?.value ?? "$500K → $10M",
                },
                {
                  label: "Built in five months",
                  value: meta.projected[1]?.value ?? "0 → 1",
                },
              ]}
            />
            <SlideIn delay={160} className="flex justify-center lg:justify-start">
              <Image
                src={`${ASSET}/portrait-cashback.png`}
                alt="Cardholder with cashback offers — 7-Eleven, Finish Line, Doordash"
                width={834}
                height={600}
                unoptimized
                /* 834x600 is 1.39:1, so the height cap converts straight
                   into a width cap — the photo grows to fill the column and
                   only shrinks when the panel is short. */
                className="h-auto w-full max-w-[min(640px,calc(var(--panel-media-max-h)_*_1.39))] object-contain"
              />
            </SlideIn>
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={meta} showProjected={false} />

        {/* ── PANEL: LIVE PROTOTYPE — title + link (GovOS pattern) ─── */}
        {project.prototype && (
          <Panel width={END_PANEL} pad="center">
            <div className={END_MEASURE}>
              <SlideIn>
                <h2 className={`text-white ${END_TITLE}`}>Live UCM prototype</h2>
                <a
                  href={project.prototype}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[clamp(1.05rem,1.25vw,1.25rem)] text-white transition-opacity hover:opacity-60"
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
          logo={next.logoWide ?? next.logo}
          logoScale={next.logoBandScale}
        />

      </HorizontalScroll>
    </main>
  );
}
