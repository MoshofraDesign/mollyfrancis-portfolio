import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { Panel, NextProjectLink, CaseStudyMetaPanel, END_PANEL, INTRO_TITLE, INTRO_SUBTEXT, END_TITLE, META_LABEL, END_MEASURE, HERO_TITLE, HERO_SUBTEXT } from "@/components/v2/CaseStudyKit";
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
const VIEW = "lg:w-screen";
const MEASURE = "w-full max-w-[min(54rem,86vw)]";

const H_DISPLAY =
  "font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[2rem] sm:text-[2rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.6rem] 2xl:text-[4.05rem] [text-wrap:pretty]";
const BODY =
  "text-[1.25rem] sm:text-[1.25rem] md:text-[1.25rem] lg:text-[1.3rem] xl:text-[1.45rem] 2xl:text-[1.65rem] leading-[1.35] text-white [text-wrap:pretty]";

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
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Logo — Figma 4553:22296: 100,100 / 720×117 on a 1440×1000 frame */}
          {/* Stepped, not vw-driven. lg:w-[min(50vw,720px)] meant the mark
              resized continuously with the window and the copy below it —
              whose top was derived from that width — slid with it. These three
              steps hold the 6.14 aspect (540/88, 614/100, 688/112). */}
          <div className="relative z-10 w-[min(100%,720px)] aspect-[720/117] lg:absolute lg:left-[100px] lg:top-[100px] lg:h-[88px] lg:w-[540px] xl:h-[100px] xl:w-[614px] 2xl:h-[112px] 2xl:w-[688px]">
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
          <SlideIn className="relative z-10 max-w-[466px] text-white lg:absolute lg:left-[100px] lg:top-[216px] xl:top-[228px] 2xl:top-[240px] lg:max-w-[640px]">
            <p className={HERO_TITLE}>Prior Authorization Portal</p>
            <p className={`mt-3 max-w-[46ch] ${HERO_SUBTEXT}`}>
              Enables providers to electronically submit prior authorization requests and view all requests and their statuses
            </p>
          </SlideIn>

          {/* Screens — Figma 4622:11847: 1174×668, centered, top 435, bleeds off the bottom */}
          <div className="relative z-0 mx-auto w-full max-w-[min(92vw,73.4rem)] lg:absolute lg:left-1/2 lg:top-[340px] xl:top-[372px] 2xl:top-[416px] lg:mx-0 lg:w-[835px] xl:w-[1044px] 2xl:w-[1252px] lg:max-w-none lg:-translate-x-1/2">
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
          <div className="mx-auto flex w-full max-w-[min(84rem,92vw)] flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <SlideIn className="shrink-0">
              <div className="relative aspect-square w-[220px] overflow-hidden rounded-full sm:w-[300px] lg:w-[min(26vw,360px)]">
                <Image
                  src={`${ASSET}/submitter.png`}
                  alt="Provider overwhelmed by fax paperwork"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 360px, 300px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            {/* The horizontal padding is what the decorative quote marks hang
                in — they sit outside the text box with right-full/left-full,
                so trimming it clips them. */}
            <SlideIn delay={80} className="relative w-full max-w-[min(44rem,86vw)]">
              {/* Both marks hang off the paragraph itself rather than off the
                  first and last words. That way they land on lines, not on
                  wherever the text happens to break: top-0 puts the opening
                  mark on line one and top-[2.4em] puts the closing mark on
                  line three (two lines at leading-[1.2]). em units resolve
                  against the paragraph's own font size, so the pair scales
                  with the type, and the 3.9em side padding is the gutter they
                  sit in — an absolute child is placed against the padding
                  box, so the 3.125em mark clears the text by 0.775em. */}
              <p className="relative px-[3.9em] text-[1.25rem] sm:text-[1.25rem] md:text-[1.25rem] lg:text-[1.408rem] xl:text-[1.76rem] 2xl:text-[2rem] font-normal leading-[1.2] text-white [text-wrap:pretty]">
                <QuoteMark className="left-0 top-0 h-[2.47em] w-[3.125em]" />
                <QuoteMark close className="right-0 top-[2.4em] h-[2.47em] w-[3.125em]" />
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
              <h2 className="text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.792rem] xl:text-[2.24rem] 2xl:text-[2.35rem] font-semibold leading-[1.15] tracking-[-0.02em]">😟 Pains</h2>
              <ul className={`mt-3 list-disc space-y-1.5 pl-7 ${BODY}`}>
                <li>Burnout from repetitive admin tasks.</li>
                <li>No visibility into status or timelines.</li>
                <li>Endless back-and-forth with payers.</li>
                <li>Delays hurting patient satisfaction and care.</li>
              </ul>
              <h2 className="mt-8 text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.792rem] xl:text-[2.24rem] 2xl:text-[2.35rem] font-semibold leading-[1.15] tracking-[-0.02em]">🌟 Gains</h2>
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
              <div className="relative mx-auto w-fit max-w-full pl-[1.9em] pr-[1.6em] text-[1.85rem] sm:text-[1.85rem] md:text-[1.85rem] lg:text-[2.432rem] xl:text-[3.04rem] 2xl:text-[3.648rem]">
                <p className="font-semibold leading-[1.17] tracking-[-0.02em] text-white">
                  <span className="relative block w-fit sm:whitespace-nowrap">
                    <QuoteMark className="-left-[1.85em] top-0 h-[0.97em] w-[1.23em]" />
                    You have Marie Kondo’d
                  </span>
                  <span className="relative block w-fit sm:whitespace-nowrap">
                    the authorization portal!
                    <QuoteMark close className="left-[calc(100%+0.12em)] bottom-0 h-[0.97em] w-[1.23em]" />
                  </span>
                </p>
                <p className="mt-6 text-[1.25rem] sm:text-[1.25rem] md:text-[1.25rem] lg:text-[1.3rem] xl:text-[1.45rem] 2xl:text-[1.65rem] italic leading-snug text-white">
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
          <div className="mx-auto flex w-full max-w-[min(84rem,92vw)] flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
            <SlideIn className="shrink-0">
              <div className="relative aspect-square w-[200px] overflow-hidden rounded-full sm:w-[260px] lg:w-[min(22vw,300px)]">
                <Image
                  src={`${ASSET}/outcome.png`}
                  alt="Clinician using the authorization portal on a laptop"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 300px, 260px"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <div className="min-w-0 lg:max-w-[40rem]">
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

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-x-14 lg:gap-x-20">
              <SlideIn>
                <h2 className={META_LABEL}>
                  Usage
                </h2>
                <p className="mt-5 text-[2.1rem] sm:text-[2.1rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.8rem] 2xl:text-[2.8rem] font-semibold leading-tight tracking-[-0.03em]">
                  $1.9m in savings
                </p>
                <p className="mt-2 text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug text-white">
                  Scaled monthly usage to 9-10K a month
                </p>
              </SlideIn>
              <SlideIn delay={80}>
                <h2 className={META_LABEL}>
                  Time saved
                </h2>
                <p className="mt-5 text-[2.1rem] sm:text-[2.1rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.8rem] 2xl:text-[2.8rem] font-semibold leading-tight tracking-[-0.03em]">
                  $800K in savings
                </p>
                <p className="mt-2 text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug text-white">
                  7 minutes per case for clinicians reviewing cases
                </p>
                <p className="mt-8 text-[2.1rem] sm:text-[2.1rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.8rem] 2xl:text-[2.8rem] font-semibold leading-tight tracking-[-0.03em]">
                  4 Hours per day saved
                </p>
                <p className="mt-2 text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug text-white">
                  Went down 4 minutes per authorization, per provider
                </p>
              </SlideIn>
              <SlideIn delay={160}>
                <h2 className={META_LABEL}>
                  Users
                </h2>
                <p className="mt-5 text-[2.1rem] sm:text-[2.1rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.8rem] 2xl:text-[2.8rem] font-semibold leading-tight tracking-[-0.03em]">
                  50K authorization submissions
                </p>
                <p className="mt-2 text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug text-white">
                  22K providers logged in
                </p>
                <p className="mt-8 text-[2.1rem] sm:text-[2.1rem] md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.8rem] 2xl:text-[2.8rem] font-semibold leading-tight tracking-[-0.03em]">
                  16.6k unique visitors
                </p>
                <p className="mt-2 text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug text-white">
                  Since go-live
                </p>
              </SlideIn>
            </div>
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
                  className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.96rem] 2xl:text-[1.1rem] text-white transition-opacity hover:opacity-60"
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
