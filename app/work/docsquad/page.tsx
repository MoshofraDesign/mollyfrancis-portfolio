import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import AutoplayVideo from "@/components/AutoplayVideo";
import SlideIn from "@/components/SlideIn";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import { NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

/**
 * DocSquad — Figma deck (Portfolio › 4553:21862), left to right:
 * Title → Problem → Research → Patient Queue → 4 phones →
 * icons → interview+dashboard → Outcome → 950px portrait.
 * (Research board 4553:21886 lives off-canvas in Figma; not in this deck.)
 * 1440×1000 panels on #dd00e2. Large wordmark on the title panel; small
 * 200×27 wordmark parks at 100,100 via StickyNav.
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

/** Figma Header Large: Jost SemiBold 81/95. */
const H_DISPLAY =
  "font-semibold leading-[1.17] text-white text-[clamp(2rem,5.625vw,5.0625rem)] lg:leading-[95px] [text-wrap:pretty]";
/** Figma Paragraph: Jost Regular 32, 16px under the heading. */
const BODY =
  "text-[clamp(1.05rem,2.22vw,2rem)] font-normal leading-normal text-white [text-wrap:pretty]";

/** Figma 4672:15482 — Helvetica Bold 90/95 + 30/50, Regular 30/50. */
const STAT_FACE = "font-[Helvetica,Arial,sans-serif]";
const STAT_HERO = `${STAT_FACE} text-[clamp(2.75rem,6.25vw,5.625rem)] font-bold uppercase leading-[1.06] lg:leading-[95px] text-white`;
const STAT_KICKER = `${STAT_FACE} text-[clamp(1.1rem,2.08vw,1.875rem)] font-bold uppercase leading-[50px] text-white`;
const STAT_DELTA = `${STAT_FACE} text-[clamp(1.75rem,3.75vw,3.375rem)] font-bold leading-[50px] text-white whitespace-nowrap`;
const STAT_DETAIL = `${STAT_FACE} text-[clamp(1.1rem,2.08vw,1.875rem)] font-normal leading-[50px] text-white`;

const OUTCOME_STATS = [
  {
    hero: "29%",
    kicker: "Synchronous",
    delta: "2.5min",
    detail: "12 to 9.5 minutes",
    col: "sm:w-[248px]",
  },
  {
    hero: "71%",
    kicker: "aSynchronous",
    delta: "1.5min",
    detail: "8 to 6.5 minutes",
    col: "sm:w-[273px]",
  },
  {
    hero: "$",
    kicker: "Projected",
    delta: "$1.2m",
    detail: "Savings at 1 Year",
    col: "sm:w-[273px]",
  },
] as const;

/** Figma crops of the 4-phone sprite (node 4553:21876). */
const PHONE_CROPS = [
  { alt: "Intake — encounter history", left: "-11.26%", width: "217px" },
  { alt: "Video visit in progress", left: "-121.98%", width: "216px" },
  { alt: "Assessment and diagnosis", left: "-233.51%", width: "216px" },
  { alt: "Review response to patient", left: "-345.04%", width: "217px" },
] as const;

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: `Virtual Care Telehealth — DocSquad — Molly Francis`,
    description: p.aiSummary,
  };
}

const VIDEO_EXTS = [".mp4", ".mov", ".webm", ".m4v"];

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

/** Full-bleed 1440 panel; content uses Figma % positions at lg+. */
function ScreenPanel({
  children,
  className = "",
  width = "lg:w-screen",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section
      className={`relative flex w-full flex-col items-center justify-center gap-8 px-6 py-16 sm:px-10 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-start lg:overflow-hidden lg:px-0 lg:py-0 ${className}`}
    >
      {children}
    </section>
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
      <StickyNav
        watch="docsquad-title"
        parkLeft={100}
        parkTop={100}
        logo={
          <Image
            src={LOGO}
            alt="DocSquad"
            width={200}
            height={27}
            unoptimized
            className="h-[27px] w-[200px] max-w-[28vw] object-contain object-left"
          />
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* 1 — TITLE. Figma 4553:21863
            Logo 100,100 / 842×112 · Description 100,689 / 308×208
            Hero 479,349 / 891×529 */}
        <section
          id="docsquad-title"
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          <div className="relative z-10 aspect-[842/112] w-[min(100%,842px)] lg:absolute lg:left-[6.94vw] lg:top-[10vh] lg:h-[11.18vh] lg:w-[58.47vw] lg:max-w-none lg:aspect-auto">
            <Image
              src={LOGO}
              alt="DocSquad"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn className="relative z-10 flex max-w-[308px] flex-col gap-4 text-white lg:absolute lg:bottom-[10.3vh] lg:left-[6.94vw] lg:h-[20.8vh] lg:max-w-[21.39vw] lg:justify-end">
            <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.28]">
              Virtual Care Telehealth App
            </p>
            <p className="text-[clamp(0.95rem,1.25vw,1.125rem)] font-normal leading-normal">
              Provider Desktop And Native Apps For Doctors, Nurses And Staff To Diagnosis Patients With Asynchronous And Synchronous Visits.
            </p>
          </SlideIn>

          <div className="relative z-0 mx-auto aspect-[891/529] w-full max-w-[min(92vw,891px)] lg:absolute lg:left-[33.26vw] lg:top-[34.9vh] lg:mx-0 lg:h-[52.9vh] lg:w-[61.88vw] lg:max-w-none lg:aspect-auto">
            <Image
              src={`${ASSET}/hero.png`}
              alt="DocSquad provider desktop, native app, and watch"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        </section>

        {/* 2 — PROBLEM. Figma 4553:21871: 100,296 / 999×409, gap 16 */}
        <ScreenPanel>
          <div className="flex w-full max-w-[999px] flex-col gap-4 lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:h-[40.9vh] lg:w-[69.375vw] lg:max-w-none lg:-translate-y-1/2 lg:justify-end">
            <SlideIn>
              <h2 className={H_DISPLAY}>Problem</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                How might we reduce the clinical burden of virtual visits so providers
                can diagnose and treat patients in minutes—without redundant data entry
                or clunky telehealth tools?
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 3 — RESEARCH. Figma 4553:21883: 100,329 / 950×433, gap 16, bottom 238 */}
        <ScreenPanel>
          <div className="flex w-full max-w-[950px] flex-col gap-4 lg:absolute lg:bottom-[23.8vh] lg:left-[6.94vw] lg:w-[65.97vw] lg:max-w-none lg:justify-end">
            <SlideIn>
              <h2 className={H_DISPLAY}>Research</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <div className={BODY}>
                <p>
                  Providers are overwhelmed — packed schedules, tedious EHR entries, and
                  little time for each patient. They don&apos;t need another platform. They
                  need one that works faster.
                </p>
                <p className="mt-[32px]">
                  By collecting symptoms upfront via async interviews, providers can diagnose
                  and treat a patient in as little as two minutes — no video call, no extra
                  data entry.
                </p>
              </div>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 4 — DESKTOP. Figma 4669:14416: centered, 232≈, 183 / 977×681 */}
        <ScreenPanel>
          <div className="relative aspect-[977/681] w-full max-w-[977px] lg:absolute lg:left-1/2 lg:top-[18.3vh] lg:w-[67.85vw] lg:max-w-none lg:-translate-x-1/2 lg:aspect-auto lg:h-[68.1vh]">
            {desktopVideo ? (
              <AutoplayVideo src={desktopVideo} className="h-full w-full rounded-[10px] bg-black" />
            ) : (
              <Image
                src={`${ASSET}/desktop-app.png`}
                alt="Provider desktop — Patient Queue"
                fill
                sizes="(max-width: 1023px) 92vw, 68vw"
                className="object-cover"
                unoptimized
              />
            )}
          </div>
        </ScreenPanel>

        {/* 5 — FOUR PHONES. Figma 4553:21876: centered, 40px gaps, sprite crops */}
        <ScreenPanel>
          <div className="flex w-full max-w-[986px] flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-6 lg:absolute lg:left-1/2 lg:top-[28.5vh] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:gap-10">
            {PHONE_CROPS.map((phone) => (
              <div
                key={phone.alt}
                className="relative overflow-hidden rounded-[10px]"
                style={{ width: phone.width, height: 470, maxWidth: "42vw", maxHeight: "70vw" }}
              >
                {/* Sprite crop matches Figma 4553:21877–21880 (not next/image fill). */}
                <img
                  src={`${ASSET}/phones.png`}
                  alt={`DocSquad provider native app — ${phone.alt}`}
                  className="pointer-events-none absolute max-w-none"
                  style={{
                    height: "107.9%",
                    width: "454.69%",
                    left: phone.left,
                    top: "-4.69%",
                  }}
                />
              </div>
            ))}
          </div>
        </ScreenPanel>

        {/* 6 — ICONS. Figma 4553:21899: 360,240 / 720×519 r10 */}
        <ScreenPanel>
          <div className="relative aspect-[720/519] w-full max-w-[720px] overflow-hidden rounded-[10px] lg:absolute lg:left-[25vw] lg:top-[24vh] lg:h-[51.9vh] lg:w-[50vw] lg:max-w-none lg:aspect-auto">
            <Image
              src={`${ASSET}/icons.png`}
              alt="Custom illustration and icon set for the DocSquad design system"
              fill
              sizes="(max-width: 1023px) 90vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 7 — INTERVIEW + DASHBOARD. Figma 4669:14424: 260,180 / 920×683 */}
        <ScreenPanel>
          <div className="relative mx-auto aspect-[920/683] w-full max-w-[920px] lg:absolute lg:left-[18.06vw] lg:top-[18vh] lg:mx-0 lg:h-[68.3vh] lg:w-[63.89vw] lg:max-w-none lg:aspect-auto">
            <Image
              src={`${ASSET}/interview-dashboard.png`}
              alt="Patient interview overlapping the logged-in DocSquad dashboard"
              fill
              sizes="(max-width: 1023px) 92vw, 64vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 8 — OUTCOME. Figma 4672:15331: 950×616 centered, y=228 / bottom 156 */}
        <ScreenPanel>
          <div className="flex w-full max-w-[950px] flex-col gap-[70px] lg:absolute lg:left-1/2 lg:bottom-[15.6vh] lg:w-[65.97vw] lg:max-w-none lg:-translate-x-1/2">
            <div className="flex flex-col gap-4">
              <SlideIn>
                <h2 className={H_DISPLAY}>Outcome</h2>
              </SlideIn>
              <SlideIn delay={80}>
                <p className={BODY}>{project.outcome}</p>
              </SlideIn>
            </div>
            <SlideIn delay={160}>
              <div className="flex flex-col gap-10 sm:flex-row sm:gap-[70px]">
                {OUTCOME_STATS.map((stat) => (
                  <div
                    key={stat.kicker}
                    className={`flex min-w-0 flex-col gap-[5px] sm:shrink-0 ${stat.col}`}
                  >
                    <div className="flex flex-col">
                      <p className={`${STAT_HERO} -mb-1`}>{stat.hero}</p>
                      <p className={STAT_KICKER}>{stat.kicker}</p>
                    </div>
                    <div className="flex items-center gap-4 overflow-hidden">
                      <p className={STAT_DELTA}>{stat.delta}</p>
                      <img
                        src={`${ASSET}/down-triangle.svg`}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rotate-180"
                      />
                    </div>
                    <p className={STAT_DETAIL}>{stat.detail}</p>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 9 — PORTRAIT. Figma 4622:11969 is 950×1000; circle 600 at center, top 50%+20 */}
        <ScreenPanel width="lg:w-[min(100vw,59.375rem)]">
          <div className="relative aspect-square w-[min(600px,78vw)] overflow-hidden rounded-full lg:absolute lg:left-1/2 lg:top-[calc(50%+20px)] lg:size-[min(39.37vw,600px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Image
              src={`${ASSET}/portrait.png`}
              alt="A virtual moonlighter clinician"
              fill
              sizes="600px"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText showProjected={false} />

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
