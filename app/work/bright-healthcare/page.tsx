import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { Panel, NextProjectLink, CaseStudyMetaPanel, END_PANEL, INTRO_TITLE, INTRO_SUBTEXT, END_TITLE, META_LABEL, END_MEASURE, HERO_TITLE, HERO_SUBTEXT, PORTRAIT_CIRCLE, PORTRAIT_COPY, VIEW, MEASURE, STAT_ROW, HERO_ROW, HERO_ROW_COPY, HERO_INSET_MD, TITLE, BODY_TYPE, StatRow, Heading } from "@/components/v2/CaseStudyKit";
import UcmScreensCarousel from "@/components/UcmScreensCarousel";

export const metadata = {
  title: "Prior Authorization Portal — Bright HealthCare — Molly Francis",
  description:
    "Designed a provider-facing portal that lets clinicians submit prior authorization requests electronically — replacing a paper fax workflow used across five state markets.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#FFAF00";
const LOGO = "/logos/bright-healthcare.svg";
const ASSET = "/work/bright-healthcare";

const H_DISPLAY = `text-white ${TITLE}`;
const BODY = `text-white ${BODY_TYPE}`;

/**
 * The quote marks. Both quotes place these on the quote block itself and on
 * its vertical centre — one outside the left edge, one outside the right —
 * rather than pinning them to the first and last lines. Line-anchored marks
 * meant every change to the copy or the measure moved them, which is what
 * made them so hard to position.
 */
function QuoteMark({ close = false, className = "" }: { close?: boolean; className?: string }) {
  return (
    <img
      src={`${ASSET}/quote.svg`}
      alt=""
      width={100}
      height={79}
      className={`pointer-events-none absolute max-w-none ${close ? "rotate-180" : ""} ${className}`}
    />
  );
}

export default function BrightHealthcareCaseStudy() {
  const idx = projects.findIndex((p) => p.slug === "bright-healthcare");
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const meta = getCaseStudyMeta(project);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      {/* The mark is 731x119, so height is what binds the box below: at
          lg:h-12 the drawn wordmark comes out 295x48, up from 221x36. */}
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-9 w-[230px] sm:h-10 sm:w-[270px] lg:h-12 lg:w-[320px]">
            <Image src={LOGO} alt="Bright HealthCare" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* Hero — Figma 4553:22295 */}
        <section
          id="title"
          className={`relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark + copy are one wrapping row from tablet up — see HERO_ROW.
              The mark is capped narrower at md than the 720 it can take on
              phones, so the copy has somewhere to sit beside it. */}
          <div className={HERO_ROW}>
          {/* Logo — Figma 4553:22296: 100,100 / 720×117 on a 1440×1000 frame */}
          {/* Stepped, not vw-driven. lg:w-[min(50vw,720px)] meant the mark
              resized continuously with the window and the copy below it —
              whose top was derived from that width — slid with it. These three
              steps hold the 6.14 aspect (540/88, 614/100, 688/112). */}
          <div className="relative z-10 w-[min(100%,720px)] shrink-0 aspect-[720/117] md:w-[min(100%,480px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[100px] lg:w-[614px]">
            <Image
              src={LOGO}
              alt="Bright HealthCare"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Title — on the 100px rail with the mark, and below it rather
              than beside it: the block was at left 180/225/259 with a fixed
              top of 171/190/213, which put it inside the mark's own box (the
              mark is min(50vw,720) wide over a 6.14 aspect, so it runs to
              217 at 1440) and the two overlapped. The top is derived from the
              mark's height now, so the 28px gap holds at every width, and the
              pair is on the shared HERO scale the other projects use. */}
          <SlideIn className={`relative z-10 flex max-w-[466px] flex-col gap-2 text-white ${HERO_ROW_COPY} lg:absolute lg:left-[50px] lg:top-[178px] lg:max-w-[640px]`}>
            <p className={HERO_TITLE}>Prior Authorization Portal</p>
            <p className={`max-w-[46ch] ${HERO_SUBTEXT}`}>
              Enables providers to electronically submit prior authorization requests and view all requests and their statuses
            </p>
          </SlideIn>
          </div>

          {/* Screens — Figma 4622:11847: 1174×668, centered, top 435.
              Anchored to the BOTTOM of the panel with its width capped by
              the height that's actually left, rather than pinned to a fixed
              top at a fixed width. It was 835/1044/1252 wide at top
              340/372/416 — pure width steps — so the composite's height
              (width / 1.758) was whatever it happened to be, and on a short
              window that put its bottom edge hundreds of pixels below the
              panel: only the top third was visible. Now the height can
              never exceed the room under the copy (--nav-clear plus 170,
              which is what the mark and title block actually occupy — 240
              was over-reserved and left the composite small), so a short
              window scales the artwork instead of cutting it in half. It
              bleeds 2% past the bottom edge, the way the frame draws it.

              The two windows in the export are staggered, so its visual
              mass sits right of centre even though the box is centred —
              that's the composition, not a placement bug. Centred with a
              translate, which is safe here — this div is not a SlideIn, so
              nothing writes an inline transform over it. */}
          <div className="relative z-0 mx-auto w-full max-w-[min(92vw,73.4rem)] lg:absolute lg:-bottom-[2%] lg:left-1/2 lg:mx-0 lg:w-[min(1400px,94vw,calc((100dvh_-_var(--nav-clear)_-_170px)_*_1.758))] lg:max-w-none lg:-translate-x-1/2">
            <Image
              src={`${ASSET}/hero.png`}
              alt="Member search and authorizations dashboard in the Authorization Portal"
              width={2348}
              height={1336}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* 2 — the problem, as a scene */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={`text-white ${INTRO_TITLE}`}>
                Every prior authorization started with a fax.
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 text-white/90 ${INTRO_SUBTEXT}`}>
                Across five markets — Texas, Georgia, Utah, California, Virginia — fax was the only way in. No validation, no real-time data, no status once a request left the desk. Processing stretched up to a month, and internal teams spent hours turning unstructured faxes into actionable records.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* 3 — the portrait and the fax quote in one beat. They were two
            panels; the circle was 600px on its own, which read as an
            interstitial rather than as evidence for the line beside it. */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto flex w-full max-w-[min(1040px,92vw)] flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <SlideIn className="shrink-0">
              <div className={PORTRAIT_CIRCLE}>
                <Image
                  src={`${ASSET}/submitter.png`}
                  alt="Provider overwhelmed by fax paperwork"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 320px, 280px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            {/* No decorative marks on this one. The side padding went with
                them — it existed only as the gutter they hung in, so keeping
                it would leave the copy inset for no reason. */}
            <SlideIn delay={80} className={`relative ${PORTRAIT_COPY}`}>
              <p className="relative text-[clamp(1.35rem,1.9vw,2rem)] font-normal leading-[1.45] text-white [text-wrap:pretty]">
                Faxing in the world of digital experiences can cause providers and their staff added work, frustration, loss of trust in the company, and more importantly time away from caring for members.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* 5 — research */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>
                So we asked the people sending them.
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 ${BODY}`}>
                Provider interviews on how authorizations actually got done, then usability testing on the digital submission flow to find where it still caught. Both synthesized into empathy maps.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* 5.5 — INFORMATION ARCHITECTURE. Sits between the research and the
            research board: it's the move the interviews led to. Grounded in
            what the project actually did (lib/projects.ts approach) — rules
            from clinical ops became form logic, the dashboard grew with the
            user, and status became something the product owned. */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>
                A fax is one flat page. A portal needs a structure.
              </h2>
            </SlideIn>
            {/* Was three paragraphs and ~95 words: the shape of it, the
                clinical-ops rules, status, and a reusable-patterns claim.
                Two sentences keep what only Molly can say — that the rules
                were in people's heads and she turned them into the form —
                and drop the rest. */}
            <SlideIn delay={100}>
              <p className={`mt-3 ${BODY}`}>
                So I decided what goes where: the dashboard, the request
                itself, and what a provider sees after they hit submit. The
                rules lived in clinical ops&rsquo; heads — I made them the
                form&rsquo;s logic, and gave status a place of its own.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center" className="items-center">
          <div className="relative mx-auto w-full max-w-[min(92vw,76.4rem)]">
            <Image
              src={`${ASSET}/research.png`}
              alt="Interview tagging highlight counts and authorization workflow mapping board"
              width={2446}
              height={1082}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </Panel>

        {/* 7 — what they actually wanted */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>
                They weren&apos;t asking for software. They were asking for an answer.
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 ${BODY}`}>
                What providers wanted was narrow and specific, and almost none of it was about a better form.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          {/* Not justify-between: that pinned the two columns to the
              container's edges, and since the longest line of copy is well
              short of its 52% column the pair ended up ~295px apart. The copy
              column sizes to its content and the map follows one gap later,
              so the space between them is the gap and nothing else. */}
          <div className="mx-auto flex w-full max-w-[min(92vw,80rem)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-start lg:gap-12">
            <SlideIn className="w-full max-w-[748px] lg:w-auto lg:max-w-[600px] lg:shrink-0">
              <h2 className="text-[clamp(1.9rem,2.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">😟 Pains</h2>
              <ul className={`mt-3 list-disc space-y-1.5 pl-7 ${BODY}`}>
                <li>Burnout from repetitive admin tasks.</li>
                <li>No visibility into status or timelines.</li>
                <li>Endless back-and-forth with payers.</li>
                <li>Delays hurting patient satisfaction and care.</li>
              </ul>
              <h2 className="mt-8 text-[clamp(1.9rem,2.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em]">🌟 Gains</h2>
              <ul className={`mt-3 list-disc space-y-1.5 pl-7 ${BODY}`}>
                <li>One system, fully integrated with their EHR.</li>
                <li>Clear approval requirements—less rework.</li>
                <li>Automated status updates and notifications.</li>
                <li>Faster turnarounds, more time for patient care.</li>
              </ul>
            </SlideIn>
            <SlideIn delay={80} className="w-full max-w-[566px] overflow-hidden rounded-[10px] lg:w-[min(39%,566px)]">
              <Image
                src={`${ASSET}/empathy-map.png`}
                alt="Empathy map for providers using the portal"
                width={566}
                height={608}
                unoptimized
                className="h-auto w-full"
              />
            </SlideIn>
          </div>
        </Panel>

        {/* 9 — the real design problem */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>
                The hard part wasn&apos;t the form. It was the rules behind it.
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 ${BODY}`}>
                I mapped authorization rules into form logic with clinical operations, so the portal could tell a provider what was required before they submitted rather than after. Continuous prototype testing tightened every step of the flow, and an empty-state dashboard grew with the user.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center" className="items-center">
          <SlideIn className="w-full">
            <UcmScreensCarousel
              label="Authorization portal screens"
              frameClassName="mx-auto aspect-[650/571] h-[min(70dvh,calc(100dvh-8.5rem))] !w-auto max-w-full overflow-hidden rounded-[10px] shadow-none drop-shadow-none"
              imageClassName="absolute inset-0 size-full object-cover object-top shadow-none drop-shadow-none"
              screens={[
                {
                  src: `${ASSET}/flow/01.png`,
                  alt: "Step 1 — Requesting information, provider search",
                },
                {
                  src: `${ASSET}/flow/02.png`,
                  alt: "Step 2 — Servicing provider and facility",
                },
                {
                  src: `${ASSET}/flow/03.png`,
                  alt: "Step 3 — Authorization request",
                },
                {
                  src: `${ASSET}/flow/04.png`,
                  alt: "Step 4 — Clinical documentation",
                },
                {
                  src: `${ASSET}/flow/05.png`,
                  alt: "Step 5 — Review and submit",
                },
                {
                  src: `${ASSET}/flow/06.png`,
                  alt: "Authorization summary",
                },
              ]}
            />
          </SlideIn>
        </Panel>

        {/* 11 — scale */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>
                One system. Five markets. White-label from the start.
              </h2>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 ${BODY}`}>
                I partnered with the broader team on a scalable design system with white-labeling support, shipping patterns the team could reuse across other Bright surfaces.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          <div className="relative mx-auto w-full max-w-[min(72rem,92vw)]">
            <SlideIn>
              <div className="relative mx-auto w-fit max-w-full pl-[1.9em] pr-[1.6em] text-[clamp(2rem,4.5vw,4.05rem)]">
                <p className="relative font-semibold leading-[1.1] tracking-[-0.02em] text-white">
                  <QuoteMark className="-left-[1.85em] top-1/2 h-[0.97em] w-[1.23em] -translate-y-1/2" />
                  <QuoteMark close className="-right-[1.6em] top-1/2 h-[0.97em] w-[1.23em] -translate-y-1/2" />
                  <span className="block w-fit sm:whitespace-nowrap">
                    You have Marie Kondo’d
                  </span>
                  <span className="block w-fit sm:whitespace-nowrap">
                    the authorization portal!
                  </span>
                </p>
                <p className="mt-6 text-[clamp(1.25rem,1.6vw,1.65rem)] italic leading-[1.45] text-white">
                  Rebecca Schweitz
                  <br />
                  VP, Clinical Performance
                </p>
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* The outcome beat: portrait, line, copy. The numbers that back it
            are the panel after this one. */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto flex w-full max-w-[min(1040px,92vw)] flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
            <SlideIn className="shrink-0">
              <div className={PORTRAIT_CIRCLE}>
                <Image
                  src={`${ASSET}/outcome.png`}
                  alt="Clinician using the authorization portal on a laptop"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 320px, 280px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <div className={PORTRAIT_COPY}>
              <SlideIn>
                <h2 className={H_DISPLAY}>It replaced the fax machine.</h2>
              </SlideIn>
              <SlideIn delay={80}>
                {/* Tighter than project.outcome, which runs three lines at
                    nearly 950px beside the portrait. Same facts. */}
                <p className={`mt-3 ${BODY}`}>
                  Within weeks of go-live in a new market, 15%+ of
                  authorizations had moved to the portal. Providers rated it
                  the best tool they&apos;d used — one team put the saving at
                  four hours per provider, per day.
                </p>
              </SlideIn>
            </div>
          </div>
        </Panel>

        {/* Outcome numbers — four columns, one figure each. They used to be
            three columns with both dollar figures stacked under Savings,
            which made that column twice as tall as the others and left the
            row visually lopsided. Each figure now gets its own label, its own
            column, and the same type. Values on the 1.1 display ratio, detail
            lines on 1.45 — the site-wide leading scale. */}
        <Panel width={VIEW} pad="center">
          <div className={`${STAT_ROW} mx-auto`}>
            {/* The only numbers section on the site without a heading —
                three of the four figures are money or time saved, so that's
                what it says. */}
            <Heading>What it saved.</Heading>
            <StatRow
              className="text-white"
              items={[
                { label: "Savings", value: "$1.9m in savings", detail: "Scaled monthly usage to 9-10K a month" },
                { label: "Clinical review", value: "$800K in savings", detail: "7 minutes per case for clinicians reviewing cases" },
                { label: "Time saved", value: "4 Hours per day saved", detail: "Went down 4 minutes per authorization, per provider" },
                { label: "Users", value: "50K authorization submissions", detail: "22K providers logged in" },
              ]}
            />
          </div>
        </Panel>

        {/* Team / Timing / Tools last, after the numbers — the credits
            at the end rather than a detour before them. */}
        <CaseStudyMetaPanel meta={meta} lightText showProjected={false} />

        {project.prototype && (
          <Panel width={END_PANEL} pad="center">
            <div className={END_MEASURE}>
              <SlideIn>
                <h2 className={`text-white ${END_TITLE}`}>Live Figma prototype</h2>
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
