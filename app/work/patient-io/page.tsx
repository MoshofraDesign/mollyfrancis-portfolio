import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
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
  const fg = contrastColor(ACCENT);
  if (!project) return null;

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-6 w-[90px] sm:h-7 sm:w-[110px]">
            <Image src={LOGO} alt="Patient IO" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col justify-center gap-8 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-10 lg:px-[71px] xl:px-[89px] 2xl:px-[107px] lg:pt-11"
        >
          <div className="relative h-10 w-[140px] sm:h-12 sm:w-[165px]">
            <Image src={LOGO} alt="Patient IO" fill unoptimized priority className="object-contain object-left" />
          </div>

          <div className="flex flex-col gap-6 lg:max-w-[389px] xl:max-w-[486px] 2xl:max-w-[584px]">
            <p className="text-[1.75rem] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.5rem] 2xl:text-[3.5rem] font-semibold leading-[1.1]">
              A patient engagement platform
            </p>
            <p className="max-w-[46ch] text-base leading-relaxed opacity-90 sm:text-lg lg:text-[13px] xl:text-[17px] 2xl:text-[20px]">
              {project.subtitle}
            </p>
          </div>

          <div className="relative aspect-[5/3] w-full lg:absolute lg:bottom-0 lg:right-0 lg:h-[504px] xl:h-[560px] 2xl:h-[630px] lg:w-[553px] xl:w-[691px] 2xl:w-[829px] lg:max-w-none">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965854643-56K9O8S9XMT6ZK4P38J8/Devices.png"
              alt="Patient IO across devices"
              fill
              sizes="(max-width: 1024px) 92vw, 54vw"
              className="object-contain object-bottom"
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
            Patient IO&rsquo;s mobile and desktop care platform. Our success led to an acquisition by
            athenahealth in August 2016, where the framework we built became the design foundation for
            their flagship patient app, athenaWell.
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

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText={fg === "#f5f5f5"} />

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
