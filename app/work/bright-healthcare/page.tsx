import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { Panel, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";
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
  "font-semibold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(2rem,4.5vw,4.05rem)] [text-wrap:pretty]";
const BODY =
  "text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.35] text-white [text-wrap:pretty]";

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
      <StickyNav
        watch="title"
        parkLeft={48}
        logo={
          <div className="relative h-8 w-[200px] sm:h-9 sm:w-[240px]">
            <Image src={LOGO} alt="Bright HealthCare" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* Hero — Figma 4553:22295 */}
        <section
          id="title"
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* Logo — Figma 4553:22296: 100,100 / 720×117 on a 1440×1000 frame */}
          <div className="relative z-10 w-[min(100%,720px)] aspect-[720/117] lg:absolute lg:left-[6.94vw] lg:top-[10vh] lg:w-[min(50vw,720px)]">
            <Image
              src={LOGO}
              alt="Bright HealthCare"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* Title — Figma 4553:22297: 253,237 / 466 wide */}
          <SlideIn className="relative z-10 max-w-[466px] text-white lg:absolute lg:left-[calc(6.94vw+0.212*min(50vw,720px))] lg:top-[23.7vh] lg:max-w-[32.36vw]">
            <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.28]">
              Prior Authorization Portal
            </p>
            <p className="mt-2 text-[clamp(0.95rem,1.25vw,1.125rem)] font-normal leading-normal">
              Enables providers to electronically submit prior authorization requests and view all requests and their statuses
            </p>
          </SlideIn>

          {/* Screens — Figma 4622:11847: 1174×668, centered, top 435, bleeds off the bottom */}
          <div className="relative z-0 mx-auto w-full max-w-[min(92vw,73.4rem)] lg:absolute lg:left-1/2 lg:top-[43.5vh] lg:mx-0 lg:w-[81.53vw] lg:max-w-none lg:-translate-x-1/2">
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

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-6`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Problem</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                Bright HealthCare&apos;s providers across Texas, Georgia, Utah, California, and Virginia relied on fax as their sole method for submitting prior authorizations—a process plagued by unexpected errors, back-and-forth communication, and processing times stretching up to a month. Without validation, real-time data, or status visibility, every party involved was left frustrated.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center" className="items-center">
          <div className="relative mx-auto aspect-square w-[304px] sm:w-[499px] md:w-[599px] lg:w-[600px] overflow-hidden rounded-full">
            <Image
              src={`${ASSET}/submitter.png`}
              alt="Provider overwhelmed by fax paperwork"
              fill
              unoptimized
              sizes="600px"
              className="object-cover"
            />
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          <div className="relative mx-auto w-full max-w-[min(52rem,86vw)]">
            <SlideIn>
              <div className="relative px-[clamp(5rem,11vw,8.5rem)]">
                <p className="text-[clamp(1.25rem,2.2vw,2rem)] font-normal leading-[1.2] text-white [text-wrap:pretty]">
                  <span className="relative">
                    <QuoteMark className="right-full bottom-0 mr-[0.8em] h-[2.47em] w-[3.125em]" />
                    Faxing
                  </span>{" "}
                  in the world of digital experiences can cause providers and their staff added work, frustration, loss of trust in the company, and more importantly time away from caring for{" "}
                  <span className="relative">
                    members.
                    <QuoteMark close className="left-full bottom-0 ml-[0.4em] h-[2.47em] w-[3.125em]" />
                  </span>
                </p>
              </div>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-6`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Objective</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                I led design end-to-end for a digital portal that lets providers submit authorizations electronically, replacing manual workflows with real-time status tracking. I mapped authorization rules into form logic with clinical operations, ran continuous prototype testing to tighten the submission flow, and helped build a scalable, white-label design system reused across Bright surfaces.
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

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-6`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Research</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                We conducted user interviews with providers to understand current authorization workflows and pain points. We followed up with usability testing to validate the digital submission flow and identify friction points. These insights were synthesized into empathy maps to guide the design of a more intuitive, efficient, and provider-centered experience.
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

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-6`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>Empathy Map – Providers Using Prior Authorization Portal</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                Design a digital portal that lets providers submit authorizations electronically, eliminating manual work, reducing errors, and speeding up processing times with real-time status updates. I also partnered with the broader team to build a scalable design system with white-labeling support.
              </p>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          <div className="mx-auto flex w-full max-w-[min(92vw,80rem)] flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <SlideIn className="w-full max-w-[748px] lg:w-[min(52%,748px)]">
              <h2 className="text-[clamp(1.5rem,2.8vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em]">😟 Pains</h2>
              <ul className={`mt-3 list-disc space-y-1.5 pl-7 ${BODY}`}>
                <li>Burnout from repetitive admin tasks.</li>
                <li>No visibility into status or timelines.</li>
                <li>Endless back-and-forth with payers.</li>
                <li>Delays hurting patient satisfaction and care.</li>
              </ul>
              <h2 className="mt-8 text-[clamp(1.5rem,2.8vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em]">🌟 Gains</h2>
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

        <Panel width={VIEW} pad="center">
          <div className="relative mx-auto w-full max-w-[min(72rem,92vw)]">
            <SlideIn>
              <div className="relative mx-auto w-fit max-w-full pl-[1.9em] pr-[1.6em] text-[clamp(1.85rem,3.8vw,4.05rem)]">
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
                <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.35rem)] italic leading-snug text-white">
                  Rebecca Schweitz
                  <br />
                  VP, Clinical Performance
                </p>
              </div>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto space-y-10`}>
            <div className="space-y-6">
              <SlideIn>
                <h2 className={H_DISPLAY}>Outcome</h2>
              </SlideIn>
              <SlideIn delay={80}>
                <p className={BODY}>{project.outcome}</p>
              </SlideIn>
            </div>
            <SlideIn delay={160}>
              <div>
                <h3 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-white/45">
                  Projected Numbers
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-x-10 lg:gap-x-12">
                  {meta.projected.map((row) => (
                    <li key={`${row.value}-${row.label}`}>
                      <p className="text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                        {row.value}
                      </p>
                      <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                        {row.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          </div>
        </Panel>

        <Panel width={VIEW} pad="center" className="items-center">
          <div className="relative mx-auto aspect-square w-[304px] sm:w-[499px] md:w-[599px] lg:w-[600px] overflow-hidden rounded-full">
            <Image
              src={`${ASSET}/outcome.png`}
              alt="Clinician using the authorization portal on a laptop"
              fill
              unoptimized
              sizes="600px"
              className="object-cover"
            />
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={meta} lightText showProjected={false} />

        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-x-14 lg:gap-x-20">
              <SlideIn>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-white/45">
                  Usage
                </h2>
                <p className="mt-5 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                  $1.9m in savings
                </p>
                <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                  Scaled monthly usage to 9-10K a month
                </p>
              </SlideIn>
              <SlideIn delay={80}>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-white/45">
                  Time saved
                </h2>
                <p className="mt-5 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                  $800K in savings
                </p>
                <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                  7 minutes per case for clinicians reviewing cases
                </p>
                <p className="mt-8 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                  4 Hours per day saved
                </p>
                <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                  Went down 4 minutes per authorization, per provider
                </p>
              </SlideIn>
              <SlideIn delay={160}>
                <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-medium uppercase tracking-[0.14em] text-white/45">
                  Users
                </h2>
                <p className="mt-5 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                  50K authorization submissions
                </p>
                <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                  22K providers logged in
                </p>
                <p className="mt-8 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em]">
                  16.6k unique visitors
                </p>
                <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.05rem)] leading-snug text-white/55">
                  Since go-live
                </p>
              </SlideIn>
            </div>
          </div>
        </Panel>

        {project.prototype && (
          <Panel width="lg:w-[min(100vw,36rem)]" pad="center">
            <div className={`${MEASURE} mx-auto`}>
              <SlideIn>
                <h2 className={H_DISPLAY}>Live Figma prototype</h2>
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
