import fs from "fs";
import path from "path";
import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { contrastColor } from "@/lib/contrastColor";
import {
  Panel,
  TextPanel,
  Heading,
  Body,
  VIEW,
  STAT_ROW,
  CAPTION,
  HERO_ROW,
  HERO_ROW_COPY,
  HERO_INSET_MD,
  META_LABEL,
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
const ASSET = "/work/athenawell";

/** Panels that depend on a file skip themselves until the file is on disk. */
function hasAsset(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

const metrics = [
  { label: "Patient personas", value: "3 risk tiers" },
  { label: "Resonance interviews", value: "5" },
  { label: "Wearable integrations", value: "200+" },
];


/**
 * One export, centred, with its caption under it.
 *
 * Width-first rather than fill-into-an-aspect-box: these are real exports
 * with known dimensions and their own transparency, so they float on the
 * panel the way the hero composite does instead of sitting in a 16/10 box
 * that crops or letterboxes them. The lg cap is the room the panel has once
 * the caption is allowed for, times the image's own aspect — passed as a
 * CSS variable, because Tailwind can't build a class name from a runtime
 * value.
 */
function MediaPanel({
  src,
  alt,
  caption,
  width,
  height,
  maxWidth = 950,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  maxWidth?: number;
}) {
  if (!hasAsset(src)) return null;
  return (
    <Panel
      width={VIEW}
      pad="center"
      className="items-center"
      style={
        {
          "--media-aspect": String(width / height),
          "--media-max-w": `${maxWidth}px`,
        } as React.CSSProperties
      }
    >
      <SlideIn className="mx-auto flex w-full max-w-[min(var(--media-max-w),92vw)] flex-col items-center lg:max-w-[min(var(--media-max-w),92vw,calc((var(--panel-media-max-h)_-_5rem)_*_var(--media-aspect)))]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1023px) 92vw, min(92vw, 950px)"
          className="h-auto w-full"
        />
        {caption && (
          <p className={`mt-5 max-w-[70ch] text-center ${CAPTION}`}>{caption}</p>
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
          <div className="relative h-8 w-[190px] sm:h-9 sm:w-[220px]">
            <Image src={LOGO} alt="athenaWell" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        <section
          id="title"
          className={`relative flex w-full flex-col justify-center gap-8 overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:justify-start lg:gap-10 lg:pl-[50px] lg:pr-[71px] xl:pr-[89px] 2xl:pr-[107px] lg:pt-[50px]`}
        >
          {/* Mark + copy are one wrapping row from tablet up (HERO_ROW), and
              at lg they're placed from the corner the way every other
              project's hero is: mark at 50/50, copy on the same rail
              directly beneath it. This panel used to centre the whole stack
              vertically, which floated the mark in the middle of the field
              while every other project's sat in the corner. */}
          <div className={HERO_ROW}>
          <div className="relative h-[46px] w-[283px] shrink-0 sm:h-[52px] sm:w-[320px] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[72px] lg:w-[443px] xl:h-[84px] xl:w-[517px] 2xl:h-[96px] 2xl:w-[590px]">
            <Image src={LOGO} alt="athenaWell" fill unoptimized priority className="object-contain object-left" />
          </div>

          <div className={`flex flex-col gap-2 ${HERO_ROW_COPY} lg:absolute lg:left-[50px] lg:top-[148px] lg:max-w-[min(560px,40vw)] xl:top-[166px] xl:max-w-[min(640px,40vw)] 2xl:top-[184px] 2xl:max-w-[min(720px,40vw)]`}>
            <p className="text-[1.75rem] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.5rem] 2xl:text-[3.5rem] font-semibold leading-[1.1]">
              Standalone apps for patients and care teams
            </p>
            <p className="max-w-[46ch] text-base leading-[1.45] opacity-90 sm:text-lg lg:text-[13px] xl:text-[17px] 2xl:text-[20px]">
              {project.subtitle}
            </p>
          </div>
          </div>

          {/* Hero composite — the laptop-and-phone export, cropped to the
              artwork so the box IS the ink (the old asset carried a dead
              margin, which is what made it so fiddly to place). 2366x1152,
              so 2.054. Sized in --figma-u rather than vw: u is pinned by
              whichever axis is tighter, so a short wide window scales it
              down instead of running it up into the copy. */}
          <div className="relative aspect-[2366/1152] w-full lg:absolute lg:bottom-[6%] lg:right-[50px] lg:aspect-auto lg:h-[calc(497_*_var(--figma-u))] lg:w-[calc(1020_*_var(--figma-u))] lg:max-w-none">
            <Image
              src={`${ASSET}/hero.png`}
              alt="The athenaWell care plan on a laptop and the patient app on a phone"
              fill
              sizes="(max-width: 1023px) 92vw, 70vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </section>

        {/* ── WHAT IS ATHENAWELL ───────────────────────────────────────── */}
        <TextPanel>
          <Heading intro>The care plan lived in a paper folder.</Heading>
          <Body intro>
            A patient seeing several specialists had their plan spread across
            phone calls, folders and systems that didn&apos;t talk. Care teams
            needed one place to build and track it. Patients needed to know what
            to do today, and how to reach someone.
          </Body>
        </TextPanel>

        {/* ── SO THE PLAN MOVED. The intro panel above already tells the
               problem as a scene, so this is the turn rather than a second
               "The Problem" restatement of it. */}
        <TextPanel>
          <Heading>So the plan moved somewhere both sides could see it.</Heading>
          <Body>
            One place for the care team to build, assign and track a plan —
            and one daily view for the patient of what to do today, with a
            direct line to the people who assigned it.
          </Body>
        </TextPanel>

        {/* ── THE CARE PLAN, RUNNING. Molly's own screen recording. */}
        {hasAsset(`${ASSET}/videos/careplan.mp4`) && (
          <Panel width={VIEW} pad="center" className="items-center">
            <SlideIn className="mx-auto flex w-full max-w-[min(1100px,92vw)] flex-col items-center lg:max-w-[min(1100px,92vw,calc((var(--panel-media-max-h)_-_5rem)_*_1.622))]">
              <div className="w-full overflow-hidden rounded-[10px]">
                <AutoplayVideo
                  src={`${ASSET}/videos/careplan.mp4`}
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className={`mt-5 text-center ${CAPTION}`}>
                The Care Plan — conditions, goals, daily tasks and the care
                team, on one page.
              </p>
            </SlideIn>
          </Panel>
        )}

        {/* ── THE CARE TEAM SIDE. Build the plan, assign it, see the
               patient's activity, and reach them without leaving the page. */}
        <MediaPanel
          src={`${ASSET}/care-team.png`}
          alt="The athenaWell care-team view — patient list, care plan builder, timeline and a video call"
          width={1001}
          height={558}
          maxWidth={1080}
          caption="The care-team side — build the plan, assign it, and reach the patient without leaving the page."
        />

        {/* ── THE PERSONAS. The documents themselves rather than three text
               columns restating them: users, story, values and goals are all
               on the sheets. Transparent export cropped to the sheets, so
               they float on the panel the way the hero composite does; no
               radius, since the sheets have their own edges. 2266x1343 ->
               1.687, and the width is capped against the room the panel has
               left under the title block. */}
        {hasAsset(`${ASSET}/personas.png`) && (
          <Panel width={VIEW} pad="center" className="items-center">
            <div className="mx-auto flex w-full max-w-[min(1000px,92vw)] flex-col">
              <Heading>Three patients, one plan to hold them all.</Heading>
              <SlideIn delay={80}>
                <p className="mt-3 text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.45] opacity-90">
                  Designed for three risk tiers rather than an average patient
                  — each with its own values, goals and pain points.
                </p>
              </SlideIn>
              <SlideIn
                delay={180}
                className="mt-8 w-full self-center lg:max-w-[min(1000px,92vw,calc((var(--panel-media-max-h)_-_15rem)_*_1.687))]"
              >
                <Image
                  src={`${ASSET}/personas.png`}
                  alt="The three athenaWell persona documents — Healthy Patient, High Risk and Rising Risk"
                  width={2266}
                  height={1343}
                  sizes="(max-width: 1023px) 92vw, min(92vw, 1000px)"
                  className="h-auto w-full"
                />
              </SlideIn>
            </div>
          </Panel>
        )}

        {/* ── THE PATIENT SIDE gets its own copy beat: it was the one
               export arriving without a line of its own, straight off the
               back of the persona sheets. */}
        <TextPanel>
          <Heading>The whole plan, down to today.</Heading>
          <Body>
            Goals and conditions when a patient wants the shape of it, and a
            single day&apos;s list when they just want to know what to do
            next.
          </Body>
        </TextPanel>

        {/* ── THE PATIENT SIDE. Goals, the daily plan, and the tasks
               list — the progress ring is the part testers called out. */}
        <MediaPanel
          src={`${ASSET}/patient-app.png`}
          alt="The athenaWell patient app — goals, the daily care plan, and the task list"
          width={909}
          height={720}
          maxWidth={860}
          caption="The patient side — goals, the day's plan, and a progress ring testers called the motivating part."
        />

        {/* ── RESONANCE TESTING. Molly's own note from projects.ts
               approach[]: she expected tabbed care plans to confuse patients
               and they didn't. Worth a panel of its own — a portfolio that
               only reports the assumptions that held isn't showing judgment. */}
        <TextPanel width={VIEW}>
          <Heading>One assumption didn&apos;t survive testing.</Heading>
          <Body>
            Five interviews, walking each person through a working Care Plan
            prototype. I expected the tabbed plan to confuse people. It
            didn&apos;t — testers preferred it, so it shipped as designed.
          </Body>
        </TextPanel>

        {/* ── APOLLO CHAT BOT ───────────────────────────────────────────── */}
        {/* ── APOLLO. Copy and phone in ONE panel, side by side at lg.
               The export is a single portrait phone (0.498) — on a panel of
               its own it was a small object in a very large empty field, so
               it read as a section with nothing in it rather than as the
               picture belonging to the words. Stacked below lg. */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto flex w-full max-w-[min(1100px,92vw)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            <div className="w-full lg:max-w-[min(600px,52vw)]">
              <Heading>A question answered without the phone queue.</Heading>
              <Body>
                Apollo, the chat bot: reactive messaging with event-driven AI
                assistance, so reaching the care team didn&apos;t mean waiting
                on hold — and an urgent symptom got an urgent answer.
              </Body>
            </div>
            {hasAsset(`${ASSET}/apollo.png`) && (
              <SlideIn
                delay={120}
                className="w-[min(260px,62vw)] shrink-0 sm:w-[300px] lg:w-[min(300px,calc((var(--panel-media-max-h)_-_1rem)_*_0.4983))]"
              >
                <Image
                  src={`${ASSET}/apollo.png`}
                  alt="Apollo, the athenaWell chat bot, answering a patient's symptom question and sending a Mayo Clinic article"
                  width={299}
                  height={600}
                  sizes="300px"
                  className="h-auto w-full"
                />
              </SlideIn>
            )}
          </div>
        </Panel>

        {/* ── CARE TEAMS BEYOND THE CLINIC ─────────────────────────────── */}
        <TextPanel>
          <Heading>Care that reaches past the clinic.</Heading>
          <Body>
            Patients needed easier ways to reach their care teams. I designed apps that brought visits
            beyond the clinic — virtual, phone, and flexible scheduling.
          </Body>
        </TextPanel>

        {/* ── CUSTOM ICONS. A media panel with a caption rather than a
               display heading and a paragraph — the sheet carries itself,
               and this is the shape every other captioned image on the site
               uses. Width capped against the room left after the caption
               (--panel-media-max-h less ~5rem, times its 1.211 aspect). */}
        <Panel width={VIEW} pad="center" className="items-center">
          <SlideIn className="mx-auto flex w-full max-w-[min(660px,86vw)] flex-col items-center lg:max-w-[min(660px,86vw,calc((var(--panel-media-max-h)_-_5rem)_*_1.211))]">
            <Image
              src={`${ASSET}/custom-icons.webp`}
              alt="The athenaWell icon set — twenty-four drawn icons"
              width={752}
              height={621}
              sizes="(max-width: 1023px) 86vw, min(86vw, 660px)"
              className="h-auto w-full rounded-[10px]"
            />
            <p className={`mt-5 text-center ${CAPTION}`}>
              Custom icons — one drawn set across care plans, scheduling,
              messaging and results.
            </p>
          </SlideIn>
        </Panel>

        {/* ── OUTCOME. One beat: the declarative, then the figures as a
               row of columns — the shape every other project's closing
               numbers use. !pb balances NAV_CLEAR so the row centres. */}
        <TextPanel>
          <Heading>The plan reported on itself, daily.</Heading>
          <Body>
            A daily task view — check-ins, surveys, education — with a
            progress indicator testers called out as the motivating part.
          </Body>
        </TextPanel>

        <Panel width={VIEW} pad="center" className="lg:!pb-[var(--nav-clear)]">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>What it shipped with.</Heading>
            <div className="mt-10 grid grid-cols-2 gap-10 gap-x-8 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-10">
              {metrics.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <h2 className={META_LABEL}>{m.label}</h2>
                  <p className="mt-1.5 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.6rem]">
                    {m.value}
                  </p>
                </SlideIn>
              ))}
            </div>
            <SlideIn delay={420}>
              <p className="mt-10 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.45] opacity-70">
                Wearables through Validic; education content from Mayo Clinic,
                NIH and epocrates.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* No Projected Numbers block: the three personas and the 200+
            integrations are already the closing figures row, so repeating
            them in the credits panel says the same thing twice. */}
        <CaseStudyMetaPanel
          meta={getCaseStudyMeta(project)}
          lightText={fg === "#f5f5f5"}
          showProjected={false}
        />

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
