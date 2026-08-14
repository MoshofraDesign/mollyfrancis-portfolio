import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import AutoplayVideo from "@/components/AutoplayVideo";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import {
  MEASURE,
  VIEW,
  Panel,
  TextPanel,
  Heading,
  Body,
  NextProjectLink,
  CaseStudyMetaPanel,
} from "@/components/v2/CaseStudyKit";

/**
 * DocSquad — Virtual Care Telehealth. Horizontal case study built to match the
 * Figma deck (Portfolio › node 4553:21862) rather than the shared vertical
 * template. Mirrors the GovOS/Bright bespoke pattern: a #dd00e2 field, Jost
 * type, and a large wordmark on the title panel that hands off to the small
 * StickyNav wordmark, which slides in 1:1 with scroll and parks top-left.
 */

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const SLUG = "docsquad";
const BRAND = "#dd00e2";
const LOGO = "/logos/docsquad.svg";
const ASSET = "/work/docsquad";

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: `Virtual Care Telehealth — DocSquad — Molly Francis`,
    description: p.aiSummary,
  };
}

const VIDEO_EXTS = [".mp4", ".mov", ".webm", ".m4v"];

/** Resolve a bare video name to whichever extension is on disk, else null. */
function findVideo(name: string): string | null {
  for (const ext of VIDEO_EXTS) {
    const src = `${ASSET}/videos/${name}${ext}`;
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", src))) return src;
    } catch {
      // treated as "not found"
    }
  }
  return null;
}

/**
 * macOS "Desktop Frame" chrome from the Figma spec — a white rounded card
 * (10px radius, soft shadow) with a traffic-light title bar wrapping the
 * provider desktop screen. Matches the GovOS BrowserFrame treatment.
 */
function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[min(953px,92vw)] overflow-hidden rounded-[10px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
      <div className="flex h-9 items-center gap-2 pl-3.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

export default function DocSquadCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const idx = projects.findIndex((p) => p.slug === SLUG);
  const next = projects[(idx + 1) % projects.length];
  const desktopVideo = findVideo("provider-desktop");

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: BRAND, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      {/* Small wordmark — hidden while the title panel's large logo is on
          screen, then slides in 1:1 with scroll and parks top-left. */}
      <StickyNav
        watch="docsquad-title"
        logo={
          <Image
            src={LOGO}
            alt="DocSquad"
            width={200}
            height={27}
            unoptimized
            className="h-auto w-[86px] sm:w-[110px]"
          />
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* 1 — TITLE: large wordmark top-left, description bottom-left, hero right. */}
        <section
          id="docsquad-title"
          className="relative flex w-full flex-col md:flex-row md:items-center lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:overflow-y-auto lg:overscroll-contain"
        >
          <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 md:w-[40%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-12">
            <Image
              src={LOGO}
              alt="DocSquad"
              width={842}
              height={112}
              priority
              unoptimized
              className="h-auto w-[70%] max-w-[300px] sm:w-[58%] md:w-[92%] md:max-w-[420px]"
            />
            <div>
              <p className="text-[clamp(1.5rem,5.5vw,2.25rem)] font-semibold leading-tight sm:text-[clamp(1.5rem,3vw,2.25rem)] md:text-[2vw]">
                Virtual Care Telehealth App
              </p>
              <p className="mt-4 max-w-[40ch] text-[clamp(0.95rem,4vw,1.125rem)] font-normal leading-[1.4] opacity-90 sm:text-[clamp(0.95rem,2.2vw,1.125rem)] md:text-[1.05vw]">
                Provider desktop and native apps for doctors, nurses, and staff to
                diagnose patients with asynchronous and synchronous visits.
              </p>
            </div>
          </div>
          <div className="w-full px-5 pb-10 sm:px-8 md:mr-[5%] md:w-[57%] md:px-0 md:pb-0">
            <div className="relative aspect-[891/529] w-full">
              <Image
                src={`${ASSET}/hero.png`}
                alt="DocSquad provider desktop dashboard alongside the native mobile app"
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 57vw"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* 2 — PROBLEM */}
        <TextPanel>
          <Heading>Problem</Heading>
          <Body>
            Healthcare providers are overwhelmed—juggling back-to-back appointments,
            redundant data entry, and clunky telehealth tools that add friction instead
            of removing it. Meanwhile, patients face long wait times for issues that
            could be resolved in minutes. The core challenge: How might we reduce the
            clinical burden of virtual visits so providers can diagnose and treat
            patients in under two minutes—without sacrificing quality of care?
          </Body>
        </TextPanel>

        {/* 3 — RESEARCH */}
        <TextPanel>
          <Heading>Research</Heading>
          <Body>
            Providers are already stretched thin with packed schedules and tedious EHR
            entries. They don&apos;t need another platform that adds to their workload —
            they need technology that lightens it. By collecting symptoms upfront through
            asynchronous intelligent interviews, providers can diagnose and recommend
            treatment in as little as two minutes — no video call, no extra data entry.
            It&apos;s a faster, smarter model of care that reduces burden without
            compromising quality.
          </Body>
        </TextPanel>

        {/* 4 — RESEARCH BOARD */}
        <Panel width={VIEW} className="items-center">
          <div className="relative mx-auto aspect-[633/593] w-full max-w-[min(633px,86vw)] overflow-hidden rounded-[10px]">
            <Image
              src={`${ASSET}/research-board.png`}
              alt="Virtual moonlighter research — methods and findings board"
              fill
              sizes="(max-width: 1023px) 86vw, 633px"
              className="object-cover"
              unoptimized
            />
          </div>
        </Panel>

        {/* 5 — PROVIDER DESKTOP (screen recording in a macOS desktop frame) */}
        <Panel width={VIEW} className="items-center">
          <DesktopFrame>
            {desktopVideo ? (
              <AutoplayVideo src={desktopVideo} className="aspect-[953/621] w-full bg-black" />
            ) : (
              <div className="relative aspect-[953/621] w-full bg-white">
                <Image
                  src={`${ASSET}/desktop-app.webp`}
                  alt="Provider desktop — patient visit view with collaborative drawer"
                  fill
                  sizes="(max-width: 1023px) 92vw, 953px"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            )}
          </DesktopFrame>
        </Panel>

        {/* 6 — NATIVE MOBILE SCREENS */}
        <Panel width={VIEW} className="items-center">
          <div className="mx-auto grid w-full max-w-[min(986px,92vw)] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-10">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="relative aspect-[217/470] overflow-hidden rounded-[10px]"
              >
                <Image
                  src={`${ASSET}/phone-${n}.png`}
                  alt={`DocSquad provider native app — screen ${n}`}
                  fill
                  sizes="(max-width: 1023px) 45vw, 22vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Panel>

        {/* 7 — DESIGN SYSTEM ICONS */}
        <Panel width={VIEW} className="items-center">
          <div className="relative mx-auto aspect-[720/519] w-full max-w-[min(720px,90vw)]">
            <Image
              src={`${ASSET}/icons.png`}
              alt="Custom illustration and icon set for the DocSquad design system"
              fill
              sizes="(max-width: 1023px) 90vw, 720px"
              className="object-contain"
              unoptimized
            />
          </div>
        </Panel>

        {/* 8 — INTERVIEW + PATIENT DASHBOARD */}
        <Panel width={VIEW} className="items-center">
          <div className="relative mx-auto aspect-[920/683] w-full max-w-[min(820px,92vw)]">
            <div
              className="absolute overflow-hidden rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
              style={{ left: "0%", top: "20.6%", width: "56.2%", height: "56.5%" }}
            >
              <Image
                src={`${ASSET}/interview.png`}
                alt="Async intelligent interview and follow-up care"
                fill
                sizes="40vw"
                className="object-cover object-top"
                unoptimized
              />
            </div>
            <div
              className="absolute overflow-hidden rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
              style={{ left: "43.9%", top: "0%", width: "56.1%", height: "100%" }}
            >
              <Image
                src={`${ASSET}/dashboard.png`}
                alt="Patient dashboard — logged in"
                fill
                sizes="45vw"
                className="object-cover object-top"
                unoptimized
              />
            </div>
          </div>
        </Panel>

        {/* 9 — PORTRAIT */}
        <Panel width={VIEW} className="items-center">
          <div className="relative mx-auto aspect-square w-[min(600px,78vw)] overflow-hidden rounded-full">
            <Image
              src={`${ASSET}/portrait.png`}
              alt="A virtual moonlighter clinician"
              fill
              sizes="(max-width: 1023px) 78vw, 600px"
              className="object-cover"
              unoptimized
            />
          </div>
        </Panel>

        {/* PROTOTYPE — link to the source Figma file */}
        {project.prototype && (
          <Panel width="lg:w-[min(100vw,36rem)]">
            <div className={`${MEASURE} mx-auto`}>
              <Heading>Explore the Figma file</Heading>
              <a
                href={project.prototype}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-white/60 px-8 py-3 text-[clamp(0.95rem,1.2vw,1.1rem)] text-white transition-opacity hover:opacity-60"
              >
                Open in Figma ↗
              </a>
            </div>
          </Panel>
        )}

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText />

        {/* NEXT */}
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
