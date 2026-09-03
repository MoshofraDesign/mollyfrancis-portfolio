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
 * Bespoke horizontal-scroll case study for athenaWell, matching the Figma
 * reference at node 4643:12319 — same mechanics as GovOS/LivePerson
 * (HorizontalScroll + StickyNav + snap panels), hand-authored instead of
 * running through the shared app/work/[slug]/page.tsx template because the
 * Figma lays out a specific sequence (hero, "What is athenaWell?", user
 * types, personas, Apollo chat bot, care-team callout) that the generic
 * per-project template doesn't model. Excluded from the generic template
 * via customSlugs there.
 */

export const metadata = {
  title: "athenaWell — athenahealth — Molly Francis",
  description:
    "Designed athenaWell, a care management platform giving patients and care teams one shared source of truth for a care plan.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#0055CC";
const LOGO = "/logos/athenawell.png";

const metrics = [
  { label: "Patient personas designed for", value: "3 risk tiers" },
  { label: "Resonance-testing interviews", value: "5" },
  { label: "Wearable device integrations", value: "200+" },
];

const personas = [
  {
    name: "Healthy",
    body: "Visit the doctor twice a year for general checkups. Genuinely interested in tracking sleep, meals, step count, and exercise — and sharing that data.",
  },
  {
    name: "Rising Risk",
    body: "Managing a chronic condition without a major health event yet. Frequent doctor visits, and lifestyle changes are a real source of frustration.",
  },
  {
    name: "High-Risk",
    body: "Known by the care team on a first-name basis. Juggling multiple specialists, mounting medical bills, and no single place to turn when they need help most.",
  },
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

export default function AthenaWellCaseStudy() {
  const project = getProject("athenawell");
  const idx = projects.findIndex((p) => p.slug === "athenawell");
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
          <div className="relative h-6 w-[140px] sm:h-7 sm:w-[165px]">
            <Image src={LOGO} alt="athenaWell" fill unoptimized className="object-contain object-left" />
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
          <div className="relative h-8 w-[190px] sm:h-9 sm:w-[220px]">
            <Image src={LOGO} alt="athenaWell" fill unoptimized priority className="object-contain object-left" />
          </div>

          <div className="flex flex-col gap-6 lg:max-w-[389px] xl:max-w-[486px] 2xl:max-w-[584px]">
            <p className="text-[1.75rem] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.5rem] 2xl:text-[3.5rem] font-semibold leading-[1.1]">
              Standalone apps for patients and care teams
            </p>
            <p className="max-w-[46ch] text-base leading-relaxed opacity-90 sm:text-lg lg:text-[13px] xl:text-[17px] 2xl:text-[20px]">
              {project.subtitle}
            </p>
          </div>

          <div className="relative aspect-[5/3] w-full lg:absolute lg:bottom-0 lg:right-0 lg:h-[504px] xl:h-[560px] 2xl:h-[630px] lg:w-[553px] xl:w-[691px] 2xl:w-[829px] lg:max-w-none">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png"
              alt="athenaWell Care Plan landing page"
              fill
              sizes="(max-width: 1024px) 92vw, 54vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </section>

        {/* ── WHAT IS ATHENAWELL ───────────────────────────────────────── */}
        <TextPanel>
          <Heading>What is athenaWell?</Heading>
          <Body>{project.overview}</Body>
        </TextPanel>

        {/* ── USER TYPES ───────────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <Heading>User Types</Heading>
            <div className="mt-10 grid w-full gap-10 sm:grid-cols-2 sm:gap-14">
              <SlideIn>
                <p className="text-[1.15rem] sm:text-[1.15rem] md:text-[1.15rem] lg:text-[1.15rem] xl:text-[1.28rem] 2xl:text-[1.5rem] font-semibold">Public User</p>
                <p className="mt-3 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.96rem] 2xl:text-[1.1rem] leading-relaxed opacity-90">
                  Prospective customers browsing the Marketplace evaluate athenahealth&rsquo;s partner
                  ecosystem, so the experience has to stand on its own.
                </p>
              </SlideIn>
              <SlideIn delay={100}>
                <p className="text-[1.15rem] sm:text-[1.15rem] md:text-[1.15rem] lg:text-[1.15rem] xl:text-[1.28rem] 2xl:text-[1.5rem] font-semibold">athenaNet User</p>
                <p className="mt-3 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.96rem] 2xl:text-[1.1rem] leading-relaxed opacity-90">
                  Self-service tools let existing athenahealth customers evaluate partner products right
                  inside their daily workflow.
                </p>
              </SlideIn>
            </div>
          </div>
        </Panel>

        {/* ── PROBLEM ───────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>The Problem</Heading>
          <Body>{project.problem}</Body>
        </TextPanel>

        {/* ── CARE TEAM SCREENSHOT ─────────────────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349531314-89U1IJ39DE46WB88QYI0/Screen+Shot+2017-12-15+at+8.51.43+AM.png"
          alt="athenaWell Care Team section — testers were drawn to the video chat option"
          caption="Care Team section — testers were especially drawn to the video chat option"
        />

        {/* ── APPROACH ──────────────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Approach</Heading>
          <Body>{project.approach}</Body>
        </TextPanel>

        {/* ── PERSONAS ──────────────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <Heading>Three Patient Personas</Heading>
            <div className="mt-10 grid w-full gap-10 sm:grid-cols-3 sm:gap-8">
              {personas.map((p, i) => (
                <SlideIn key={p.name} delay={100 + i * 90}>
                  <p className="text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.1rem] xl:text-[1.12rem] 2xl:text-[1.3rem] font-semibold">{p.name}</p>
                  <p className="mt-3 text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1rem] leading-relaxed opacity-90">
                    {p.body}
                  </p>
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        {/* ── EDUCATION CONTENT SCREENSHOT ─────────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349151416-RF4TP9N5LWQVAAVQGQB7/Screen+Shot+2017-12-15+at+8.44.23+AM.png"
          alt="Education content mapped to each patient's specific health concerns"
          caption="Education content mapped to each patient's specific health concerns"
        />

        {/* ── DAILY TASKS SCREENSHOT ───────────────────────────────────── */}
        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513348975246-YKX6GH1QTGSD7AYQAJJ2/Screen+Shot+2017-12-15+at+8.37.37+AM.png"
          alt="Daily patient tasks with a progress indicator testers found motivating"
          caption="Daily patient tasks with a progress indicator testers found motivating"
        />

        {/* ── APOLLO CHAT BOT ───────────────────────────────────────────── */}
        <TextPanel>
          <Heading>Apollo Chat Bot</Heading>
          <Body>
            Reactive messaging with event-driven AI assistance — built so patients could reach out and
            get a response without waiting on a phone queue.
          </Body>
        </TextPanel>

        {/* ── CARE TEAMS BEYOND THE CLINIC ─────────────────────────────── */}
        <TextPanel>
          <Heading>Helping Care Teams Connect Beyond the Clinic</Heading>
          <Body>
            Patients needed easier ways to reach their care teams. I designed apps that brought visits
            beyond the clinic — virtual, phone, and flexible scheduling.
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
                  <p className="text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1rem] font-medium opacity-80">{m.label}</p>
                  <p className="mt-1 text-[1.75rem] sm:text-[1.75rem] md:text-[1.92rem] lg:text-[2.56rem] xl:text-[2.75rem] 2xl:text-[2.75rem] font-semibold leading-tight">
                    {m.value}
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
