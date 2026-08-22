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
  MEASURE,
  MEDIA,
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

/** One large image, centered, fill-based since exact source dimensions
 *  aren't available — object-contain keeps every screenshot uncropped. */
function BigImagePanel({
  src,
  alt,
  caption,
  maxWidth = 950,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
}) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <SlideIn
        className={`mx-auto flex w-full flex-col items-center ${MEDIA}`}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`(max-width: 1024px) 92vw, min(90vw, ${maxWidth}px)`}
            className="object-contain"
          />
        </div>
        {caption && (
          <p className="mt-4 max-w-[70ch] text-center text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1.05rem] opacity-80">
            {caption}
          </p>
        )}
      </SlideIn>
    </Panel>
  );
}

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
          <div className="relative h-7 w-[105px] sm:h-8 sm:w-[125px]">
            <Image src={LOGO} alt="Patient IO" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-12 lg:px-[71px] xl:px-[89px] 2xl:px-[107px] lg:pt-16"
        >
          {/* Logo + headline sit on one row on desktop, matching the Figma
              hero (node 4732:9502) — stacked on mobile/tablet since there's
              no room for them side by side below lg. */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
            <div className="relative h-12 w-[168px] shrink-0 sm:h-14 sm:w-[196px] md:h-16 md:w-[224px] lg:h-20 lg:w-[280px] xl:h-24 xl:w-[336px] 2xl:h-28 2xl:w-[392px]">
              <Image src={LOGO} alt="Patient IO" fill unoptimized priority className="object-contain object-left" />
            </div>
            <p className="text-[1.75rem] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.75rem] font-semibold leading-[1.1] lg:max-w-[26ch]">
              A patient engagement platform
            </p>
          </div>

          <p className="max-w-[46ch] text-base leading-relaxed opacity-90 sm:text-lg lg:text-[13px] xl:text-[17px] 2xl:text-[20px]">
            {project.subtitle}
          </p>

          {/* Laptop + phone + watch mockup, large and centered — matches
              the Figma composition instead of being corner-anchored. */}
          <div className="relative mx-auto aspect-[5/3] w-full max-w-[900px] flex-1 lg:mt-4">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965854643-56K9O8S9XMT6ZK4P38J8/Devices.png"
              alt="Patient IO across devices"
              fill
              sizes="(max-width: 1024px) 92vw, 62vw"
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* ── WHAT IS PATIENT IO ───────────────────────────────────────── */}
        <TextPanel className="!pt-20 sm:!pt-24">
          <Heading>What is Patient IO?</Heading>
          <Body>{project.overview}</Body>
        </TextPanel>

        {/* ── PROBLEM ───────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>The Problem</Heading>
          <Body>
            Patients managing complex treatment regimens had no easy way to track medications and
            vitals between office visits, and their care team had no visibility into whether the plan
            was actually being followed.
          </Body>
        </TextPanel>

        {/* ── APPROACH ──────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Approach</Heading>
          <Body>
            I designed the medications, vitals, and care-plan adherence experience end to end, then
            built a component system that rendered each pill correctly from structured Epocrates data —
            scaling cleanly to thousands of drugs instead of one-off custom art.
          </Body>
        </TextPanel>

        {/* ── MEDICATIONS TRACKING SCREENSHOT ──────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511967913957-U3LHYLLHH507187LL8WZ/image-asset.png"
          alt="Tracking medications, vitals, and adherence"
          caption="Tracking medications, vitals, and adherence"
        />

        {/* ── MEDICATIONS MODULE SCREENSHOT ────────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511968056680-OYW7HQTA481IA0KX2EV3/image-asset.png"
          alt="Medications module"
          caption="Medications module — one tablet's dose times, notes, and reminders"
        />

        {/* ── PILL DESIGN SYSTEM ───────────────────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/0a7d94ff-64a3-4bb9-9202-85911eb02bbc/Screen+Shot+2022-11-02+at+8.03.55+PM.png"
          alt="Pill-shape design system, generated from Epocrates data"
          caption="Pill-shape design system, generated from structured Epocrates data"
          maxWidth={800}
        />

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
          <Heading>The Team</Heading>
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
          <div className={`${MEASURE} mx-auto`}>
            <Heading>Impact</Heading>
            <div className="mt-10 w-full space-y-8">
              {metrics.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <p className="text-[1.75rem] sm:text-[1.75rem] md:text-[1.92rem] lg:text-[2.56rem] xl:text-[2.75rem] 2xl:text-[2.75rem] font-semibold leading-tight">
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
        />
      </HorizontalScroll>
    </main>
  );
}
