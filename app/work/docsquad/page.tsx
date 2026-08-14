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
 * DocSquad — rebuilt to the Figma deck (Portfolio › node 4553:21862).
 * 1440×1000 panels on #dd00e2. Large wordmark on the title panel; small
 * 200×27 wordmark parks at 100,100 via StickyNav (same slide/stick as
 * GovOS / Bright). Copy and media positions follow the Figma marks.
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

/** Figma Header Large: Jost SemiBold 81/95 on 1440. */
const H_DISPLAY =
  "font-semibold leading-[1.17] text-white text-[clamp(2rem,5.625vw,5.0625rem)] [text-wrap:pretty]";
/** Figma Paragraph: Jost Regular 32. */
const BODY =
  "text-[clamp(1.05rem,2.22vw,2rem)] font-normal leading-normal text-white [text-wrap:pretty]";

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

/** Names the screen so the still matches the story around it. */
function MediaCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative z-10 max-w-[40rem] text-center text-[clamp(0.9rem,1.1vw,1.1rem)] text-white/75 lg:absolute lg:bottom-[4.5vh] lg:left-1/2 lg:w-[min(50vw,40rem)] lg:-translate-x-1/2">
      {children}
    </p>
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
          <div className="relative z-10 aspect-[842/112] w-[min(100%,842px)] lg:absolute lg:left-[6.94vw] lg:top-[10vh] lg:w-[min(58.47vw,842px)]">
            <Image
              src={LOGO}
              alt="DocSquad"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn className="relative z-10 max-w-[308px] text-white lg:absolute lg:bottom-[10.3vh] lg:left-[6.94vw] lg:max-w-[21.39vw]">
            <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.28]">
              Virtual Care Telehealth App
            </p>
            <p className="mt-4 text-[clamp(0.95rem,1.25vw,1.125rem)] font-normal leading-normal">
              Provider Desktop And Native Apps For Doctors, Nurses And Staff To Diagnosis Patients With Asynchronous And Synchronous Visits.
            </p>
          </SlideIn>

          <div className="relative z-0 mx-auto w-full max-w-[min(92vw,891px)] lg:absolute lg:left-[33.26vw] lg:top-[34.9vh] lg:mx-0 lg:w-[61.88vw] lg:max-w-none">
            <Image
              src={`${ASSET}/hero.png`}
              alt="DocSquad provider desktop, native app, and watch"
              width={2026}
              height={1203}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* 2 — PROBLEM. Figma 4553:21871: 100,296 / 999×409 */}
        <ScreenPanel>
          <div className="w-full max-w-[999px] lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:w-[min(69.375vw,999px)] lg:max-w-none lg:-translate-y-1/2">
            <SlideIn>
              <h2 className={H_DISPLAY}>Problem</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={`mt-4 ${BODY}`}>
                Healthcare providers are overwhelmed—juggling back-to-back appointments,
                redundant data entry, and clunky telehealth tools that add friction instead
                of removing it. Meanwhile, patients face long wait times for issues that
                could be resolved in minutes. The core challenge: How might we reduce the
                clinical burden of virtual visits so providers can diagnose and treat
                patients in under two minutes—without sacrificing quality of care?
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 3 — RESEARCH. Figma 4553:21883: 100,237 / 950×525 */}
        <ScreenPanel>
          <div className="w-full max-w-[950px] lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:w-[min(65.97vw,950px)] lg:max-w-none lg:-translate-y-1/2">
            <SlideIn>
              <h2 className={H_DISPLAY}>Research</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={`mt-4 ${BODY}`}>
                Providers are already stretched thin with packed schedules and tedious EHR
                entries. They don&apos;t need another platform that adds to their workload —
                they need technology that lightens it.
              </p>
              <p className={`mt-8 ${BODY}`}>
                By collecting symptoms upfront through asynchronous intelligent interviews,
                providers can diagnose and recommend treatment in as little as two minutes —
                no video call, no extra data entry. It&apos;s a faster, smarter model of care
                that reduces burden without compromising quality.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* RESEARCH BOARD — evidence for the interviews just described */}
        <ScreenPanel>
          <div className="relative aspect-[633/593] w-full max-w-[633px] overflow-hidden rounded-[10px] lg:absolute lg:left-[28vw] lg:top-[23.4vh] lg:w-[43.96vw] lg:max-w-none">
            <Image
              src={`${ASSET}/research-board.png`}
              alt="Dovetail board of tagged provider interviews"
              fill
              sizes="(max-width: 1023px) 90vw, 44vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <MediaCaption>Virtual moonlighter research — tagged provider interviews</MediaCaption>
        </ScreenPanel>

        {/* ASYNC INTERVIEW + DASHBOARD — the flow Research just named */}
        <ScreenPanel>
          <div className="relative mx-auto aspect-[920/683] w-full max-w-[920px] lg:absolute lg:left-[18.06vw] lg:top-[18vh] lg:mx-0 lg:w-[63.89vw] lg:max-w-none">
            <Image
              src={`${ASSET}/interview-dashboard.png`}
              alt="Patient interview overlapping the logged-in DocSquad dashboard"
              fill
              sizes="(max-width: 1023px) 92vw, 64vw"
              className="object-contain"
              unoptimized
            />
          </div>
          <MediaCaption>
            Async patient interview (“reason for visit”) and the logged-in dashboard
          </MediaCaption>
        </ScreenPanel>

        {/* ICONS — visit-reason illustrations used in that interview */}
        <ScreenPanel>
          <div className="relative aspect-[720/519] w-full max-w-[720px] overflow-hidden rounded-[10px] lg:absolute lg:left-[25vw] lg:top-[24vh] lg:w-[50vw] lg:max-w-none">
            <Image
              src={`${ASSET}/icons.png`}
              alt="Custom medical illustration set for visit reasons and the design system"
              fill
              sizes="(max-width: 1023px) 90vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <MediaCaption>Custom illustration set for visit reasons and the design system</MediaCaption>
        </ScreenPanel>

        {/* PROVIDER DESKTOP — Patient Queue (sync + async modalities) */}
        <ScreenPanel>
          <div className="relative aspect-[977/681] w-full max-w-[977px] lg:absolute lg:left-[16.11vw] lg:top-[18.3vh] lg:w-[67.85vw] lg:max-w-none">
            {desktopVideo ? (
              <AutoplayVideo src={desktopVideo} className="h-full w-full rounded-[10px] bg-black" />
            ) : (
              <Image
                src={`${ASSET}/desktop-app.png`}
                alt="Provider desktop — Patient Queue with locked visits, modality, and wait times"
                fill
                sizes="(max-width: 1023px) 92vw, 68vw"
                className="object-contain"
                unoptimized
              />
            )}
          </div>
          <MediaCaption>Provider desktop — Patient queue for async and sync visits</MediaCaption>
        </ScreenPanel>

        {/* NATIVE APP — Intake / Video / Assessment / Review */}
        <ScreenPanel>
          <div className="grid w-full max-w-[986px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:absolute lg:left-[15.76vw] lg:top-[28.5vh] lg:w-[68.47vw] lg:max-w-none lg:grid-cols-4 lg:gap-[2.78vw]">
            {[
              "Intake — encounter history",
              "Video visit in progress",
              "Assessment and diagnosis",
              "Review response to patient",
            ].map((alt, i) => (
              <div
                key={alt}
                className="relative aspect-[217/470] overflow-hidden rounded-[10px]"
              >
                <Image
                  src={`${ASSET}/phone-${i + 1}.png`}
                  alt={`DocSquad provider native app — ${alt}`}
                  fill
                  sizes="(max-width: 1023px) 45vw, 15vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <MediaCaption>Native visit — Intake, Video, Assessment, Review</MediaCaption>
        </ScreenPanel>

        {/* 9 — PORTRAIT. Figma 4622:11969 is 950×1000; circle 600 at 175,220 */}
        <ScreenPanel width="lg:w-[min(100vw,59.375rem)]">
          <div className="relative aspect-square w-[min(600px,78vw)] overflow-hidden rounded-full lg:absolute lg:left-1/2 lg:top-[calc(50%+20px)] lg:w-[min(39.37vw,600px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
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
