import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import {
  Panel,
  TextPanel,
  Heading,
  Body,
  VIEW,
  STAT_ROW,
  HERO_INSET_MD,
  NextProjectLink,
  CaseStudyMetaPanel,
} from "@/components/v2/CaseStudyKit";

/**
 * Bespoke horizontal-scroll case study for Patient IO, matching the Figma
 * reference (file OZvS6ltydnegvXtVxD1yEH, node 4732:9501) — same mechanics
 * as athenaWell/GovOS/LivePerson (HorizontalScroll + StickyNav + snap
 * panels), hand-authored instead of running through the shared
 * app/work/[slug]/page.tsx template so it can tell the story in order
 * (hero, what it is, the problem, the approach, product screens, the
 * medication design system, the team, outcome, impact) the way the other
 * narrative case studies do. Excluded from the generic template via
 * customSlugs there.
 *
 * Two sections present in the raw Figma frames were left out: a "User
 * Types" panel (Public User / athenaNet User) and an "Outcome" panel whose
 * copy actually describes the Netspend Rewards Page — both are leftover
 * copy from other case studies duplicated into this frame, not Patient IO
 * content, per Molly's call.
 */

export const metadata = {
  title: "Patient IO — athenahealth (acquired) — Molly Francis",
  description:
    "Patient IO helped patients stick to complex treatment regimens and gave health professionals visibility between visits. As solo designer on a 14-person team, I owned the end-to-end experience -- work that led athenahealth to acquire the company in 2016.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#00CCB7";
const LOGO = "/logos/patient-io.svg";

const metrics = [
  { label: "Person team, one solo product designer", value: "14" },
  { label: "Acquired by athenahealth", value: "2016" },
  { label: "Drugs rendered correctly via structured Epocrates data", value: "Thousands" },
  { label: "Wearable integrations carried into athenaWell", value: "200+" },
];

/** The 6 "Public User" screens from Figma frame 4732:9524, in the exact
 *  left-to-right order of that frame's layers (nodes 4736:9979–9984). */
const PUBLIC_SCREENS = [
  {
    src: "/work-thumbnails/patient-io/screens/care-plan.png",
    alt: "Care Plan — daily task list with medication, education, and refill counts",
  },
  {
    src: "/work-thumbnails/patient-io/screens/heart-rate.png",
    alt: "Heart Rate — camera-based reading",
  },
  {
    src: "/work-thumbnails/patient-io/screens/drink-water.png",
    alt: "Drink Water — hydration task",
  },
  {
    src: "/work-thumbnails/patient-io/screens/select-date.png",
    alt: "Select Date — last doctor visit",
  },
  {
    src: "/work-thumbnails/patient-io/screens/complete-task.png",
    alt: "Complete Task — caregiver confirmation",
  },
  {
    src: "/work-thumbnails/patient-io/screens/sleep-log.png",
    alt: "Sleep Log — nightly sleep tracking",
  },
] as const;

export default function PatientIoCaseStudy() {
  const project = getProject("patient-io");
  const idx = projects.findIndex((p) => p.slug === "patient-io");
  const next = projects[(idx + 1) % projects.length];
  const fg = "#ffffff";
  if (!project) return null;

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-8 w-[125px] sm:h-9 sm:w-[145px]">
            <Image src={LOGO} alt="Patient IO" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        <section
          id="title"
          className={`relative flex w-full flex-col gap-8 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-12 lg:pl-[50px] lg:pr-[71px] xl:pr-[89px] 2xl:pr-[107px] lg:pt-[50px]`}
        >
          {/* Logo + headline sit on one row on desktop, matching the Figma
              hero (node 4732:9502) — stacked on mobile/tablet since there's
              no room for them side by side below lg. */}
          {/* One wrapping row from tablet up rather than only at lg: the
              headline sits beside the mark whenever its basis fits and drops
              below it when it doesn't. */}
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-start md:gap-x-10 md:gap-y-6 lg:flex-row lg:items-center lg:gap-16">
            <div className="relative h-12 w-[168px] shrink-0 sm:h-14 sm:w-[196px] md:h-16 md:w-[224px] lg:h-24 lg:w-[336px]">
              <Image src={LOGO} alt="Patient IO" fill unoptimized priority className="object-contain object-left" />
            </div>
            <p className="text-[1.75rem] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.75rem] font-semibold leading-[1.1] md:min-w-0 md:basis-[16rem] md:grow lg:max-w-[32ch]">
              A patient engagement platform for patients and their care managers
            </p>
          </div>

          {/* Laptop + phone + watch mockup, large and centered — matches
              the Figma composition instead of being corner-anchored. */}
          <div className="relative mx-auto aspect-[5/3] w-full max-w-[900px] flex-1 lg:mt-4">
            <Image
              src="/legacy/devices-6cb33b.png"
              alt="Patient IO across devices"
              fill
              sizes="(max-width: 1024px) 92vw, 62vw"
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* ── WHAT IS PATIENT IO ───────────────────────────────────────── */}
        <TextPanel>
          <Heading intro>Between visits, nobody knew.</Heading>
          <Body>
            A patient goes home with a regimen to follow. Their care team
            doesn&apos;t hear anything until the next appointment — by which
            point weeks of missed doses have already happened.
          </Body>
        </TextPanel>

        {/* ── WHAT IT DID. The overview, said as what the product closes
               rather than as a definition. */}
        <TextPanel>
          <Heading>So the plan reported on itself.</Heading>
          <Body>
            Patient IO tracked medications, vitals and adherence between
            visits and pushed it all back to the clinician — so the care team
            saw the weeks they used to miss.
          </Body>
        </TextPanel>

        {/* ── APPROACH ──────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Every pill had to look like the real one.</Heading>
          <Body>
            People recognise their medication by sight, so a generic capsule
            icon is worse than useless. I built a component system that drew
            each pill from structured Epocrates data — thousands of drugs,
            no custom art.
          </Body>
        </TextPanel>

        {/* ── PUBLIC USER SCREENS ── Figma frame 4732:9524 ─────────────── *
         * 6 individual screens (not one flat composite), laid out in a row
         * bottom-aligned and unframed — same "phones row" mechanic as the
         * DocSquad case study's mobile panel, but without the border/
         * shadow treatment and at each screen's own natural aspect ratio.
         * Each animates in on its own, staggered, as it scrolls into
         * view. Order matches the frame's layers left to right. */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto flex w-full max-w-[min(1400px,94vw)] flex-col items-center gap-5">
            <div className="grid grid-cols-3 items-end justify-items-center gap-3 sm:gap-4 lg:flex lg:flex-nowrap lg:justify-center lg:gap-4 xl:gap-5">
              {PUBLIC_SCREENS.map((screen, i) => (
                <SlideIn key={screen.src} delay={i * 70}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- true
                      source dimensions vary slightly per screen; a plain <img>
                      keeps each one at its own natural aspect ratio. */}
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    loading="lazy"
                    className="h-[26vh] w-auto rounded-md object-contain sm:h-[32vh] lg:h-[42vh] xl:h-[46vh]"
                  />
                </SlideIn>
              ))}
            </div>
            <p className="text-center text-[0.85rem] opacity-80">The patient-facing app — daily tasks, vitals, and reminders that keep the care plan on track</p>
          </div>
        </Panel>

        {/* ── MEDICATIONS MODULE + DESIGN SYSTEM ───────────────────────── *
         * Figma frames 4732:9527 and 4732:9530, placed side by side in one
         * panel per Molly's call — the design-system components sit next
         * to the medications module they're generated for. */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto flex w-full max-w-[min(1400px,94vw)] flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-center lg:gap-10">
            <SlideIn className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- true
                  source dimensions aren't available (CDN not reachable from
                  the build environment), so a plain <img> keeps its natural
                  aspect ratio instead of being forced into a guessed box. */}
              <img
                src="/legacy/image-asset-06a4d4.png"
                alt="Medications module"
                loading="lazy"
                className="h-auto max-h-[55vh] w-auto max-w-[92vw] rounded-md object-contain lg:max-w-[46vw]"
              />
              <p className="text-center text-[0.85rem] opacity-80">
                A system for patients and caregivers to manage medications
              </p>
            </SlideIn>
            <SlideIn delay={90} className="flex flex-col items-center gap-4">
              <img
                src="/legacy/screen-shot-2022-11-02-at-8-03-55-pm-31c5b5.png"
                alt="Pill-shape design system, generated from Epocrates data"
                loading="lazy"
                className="h-auto max-h-[40vh] w-auto max-w-[92vw] rounded-md object-contain lg:max-w-[46vw]"
              />
              <p className="text-center text-[0.85rem] opacity-80">Medication Design System Components</p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PORTRAIT ──────────────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="relative aspect-square w-[304px] overflow-hidden rounded-full sm:w-[499px] md:w-[599px] lg:w-[600px]">
            <Image
              src="/work-thumbnails/patient-io-photo.jpg"
              alt="A caregiver and patient"
              fill
              sizes="600px"
              className="object-cover"
              unoptimized
            />
          </div>
        </Panel>

        {/* ── THE TEAM ──────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Solo designer, fourteen people.</Heading>
          <Body>
            As the solo designer in a nimble 14-person team, I owned the end-to-end user experience for
            Patient IO&rsquo;s mobile and desktop care platform &mdash; medication tracking, vitals,
            care-plan adherence, and the pill-rendering system, from early concept through shipping
            product.
          </Body>
        </TextPanel>

        {/* ── ACQUIRED BY ATHENAHEALTH ─────────────────────────────────── */}
        <TextPanel>
          <Heading>Acquired by athenahealth</Heading>
          <Body>
            Our success led athenahealth to acquire Patient IO in August 2016. The adherence-tracking
            and pill-rendering patterns we built became the design foundation for their flagship patient
            app, athenaWell &mdash; carried forward into a platform built around three patient personas
            and 200+ wearable integrations, with content partnerships spanning Mayo Clinic and NIH.
          </Body>
        </TextPanel>

        {/* ── OUTCOME ───────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Outcome</Heading>
          <Body>{project.outcome}</Body>
        </TextPanel>

        {/* ── IMPACT ────────────────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>Impact</Heading>
            <div className="mt-10 w-full space-y-8">
              {metrics.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <p className="text-[1.75rem] sm:text-[1.75rem] md:text-[1.92rem] lg:text-[2.56rem] xl:text-[2.75rem] 2xl:text-[2.75rem] font-semibold leading-[1.1]">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1rem] font-medium opacity-80">
                    {m.label}
                  </p>
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText />

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
