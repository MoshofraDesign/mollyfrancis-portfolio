import { Fragment } from "react";
import Image from "next/image";
import { Jost } from "next/font/google";
import { getProject, getCaseStudyMeta, nextProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import {
  Panel,
  NextProjectLink,
  CaseStudyMetaPanel,
  VIEW,
  MEASURE,
  HERO_ROW,
  HERO_ROW_COPY,
  HERO_INSET_MD,
  HERO_COPY_GAP,
  HERO_TITLE,
  HERO_SUBTEXT,
  TITLE,
  BODY_TYPE,
  SMALL,
} from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "Playing with AI — Molly Francis",
  description:
    "Self-set design challenges run with AI tools: a cyberpunk sign-up flow for an app powered by the human body, and an ATM built for cats.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const SLUG = "ai-challenges";
/** Charcoal, from the Figma frame. White body copy sits at 12.6:1 on it. */
const BRAND = "#333333";
const MARK = "/logos/ai-challenges-wide.svg";
const ASSET = "/work/ai-challenges";

/**
 * The grouping widths, same rule as GovOS and DocSquad: a text beat gets a
 * narrow panel so its heading sits close to the screen that follows, and the
 * media panel is its artwork plus a gutter. Tight within a beat, loose
 * between.
 */
const COPY_PANEL = "lg:w-[min(100vw,920px)]";
const MEDIA_PANEL = "lg:w-[min(100vw,1000px)]";
/**
 * The artwork's own size in the frame: 800 of 1440, which is what the 2x
 * exports are cut for. It was capped at 1050 and filling the panel nearly
 * edge to edge — bigger than anything in the Figma, and nothing like its
 * proportions. 800 is the drawn size, and the panel above is that plus its
 * gutter.
 */
const MEDIA_W = "max-w-[min(800px,92vw)]";
/**
 * The last panel of a challenge takes the extra gutter on its TRAILING edge,
 * so the two challenges read as two things.
 *
 * Each challenge is three panels — the brief, the prompt as typed, the clip
 * of what came back — and with every panel the same width the seam between
 * challenge 1's outcome and challenge 2's brief looked exactly like the seam
 * between a brief and its own prompt. The space goes after the outcome
 * instead: tight within a challenge, loose between the two.
 */
const MEDIA_PANEL_END = "lg:w-[min(100vw,calc(1000px_+_18rem))]";
const MEDIA_TRAIL = "lg:!pr-[18rem]";

const H_DISPLAY = `text-white ${TITLE}`;
const BODY = `text-white ${BODY_TYPE}`;
const EYEBROW = `font-semibold text-white/60 ${SMALL}`;

/** The two briefs, in the order the Figma frame runs them. */
const CHALLENGES = [
  {
    key: "plug-in",
    n: "Challenge 1",
    title: "Plug In to Power Up",
    brief:
      "It’s 2038 — AI broke the grid, and the only power source left is the human body. Design an AI-era app that runs on muscle, motion, and heat. Make it look desirable. Deliver a sign-up flow (max 5 screens) that convinces someone to plug in.",
    tool: "Claude",
    toolMark: `${ASSET}/tools/claude.svg`,
    /* 1600x1148 export of the 800x574 frame. */
    prompt: { src: `${ASSET}/challenge-1-prompt.png`, w: 1600, h: 1148, aspect: "1.394" },
    promptAlt: "The brief typed into Claude Cowork",
    result: { src: `${ASSET}/videos/plug-in-flow.mp4`, aspect: "1070/790", ratio: "1.354" },
    resultAlt: "The sign-up flow that came back — cyberpunk, five screens",
  },
  {
    key: "paws-bank",
    n: "Challenge 2",
    title: "An ATM interface designed for cats.",
    brief:
      "Design a paw-friendly ATM interface for cats, with treat withdrawals, catnip deposits, and oversized buttons even the clumsiest kitty can tap.",
    tool: "Cursor",
    toolMark: `${ASSET}/tools/cursor.svg`,
    /* 1600x916 export of the 800x458 frame. */
    prompt: { src: `${ASSET}/challenge-2-prompt.png`, w: 1600, h: 916, aspect: "1.747" },
    promptAlt: "The brief typed into Cursor",
    result: { src: `${ASSET}/videos/paws-bank.mp4`, aspect: "1104/792", ratio: "1.394" },
    resultAlt: "Paws Bank — the ATM the brief asked for",
  },
] as const;

/**
 * A media beat: the tool's mark, then the artwork, left-aligned with each
 * other the way the Figma frame has them.
 *
 * --beat-media-h is the height the ARTWORK actually gets, which is not
 * --panel-media-max-h: the mark and the gap under it sit in the same column,
 * so they come off the budget first. Sizing against the panel's full height
 * is what ran both screenshots and both clips off the bottom of the frame.
 * Each child turns that height into a width cap through its own aspect
 * ratio, so a short window scales the picture instead of overflowing.
 */
function MediaBeat({
  mark,
  markAlt,
  children,
  /** Last panel of a challenge — carries the gutter that separates the two. */
  endsGroup = false,
}: {
  mark: string;
  markAlt: string;
  children: React.ReactNode;
  endsGroup?: boolean;
}) {
  return (
    <Panel
      width={endsGroup ? MEDIA_PANEL_END : MEDIA_PANEL}
      pad="center"
      className={endsGroup ? MEDIA_TRAIL : ""}
    >
      <div
        className={`mx-auto flex w-full flex-col items-start gap-5 ${MEDIA_W}`}
        style={{
          /* mark (40) + gap (20) + a little slack, in rem so it tracks type. */
          ["--beat-media-h" as string]:
            "calc(var(--panel-media-max-h) - 5rem)",
        }}
      >
        <SlideIn>
          <Image
            src={mark}
            alt={markAlt}
            width={160}
            height={40}
            unoptimized
            /* 160x40 against the frame's 800-wide media — so h-10 is the
               frame's own scale, not a guess. */
            className="h-8 w-auto sm:h-10"
          />
        </SlideIn>
        {children}
      </div>
    </Panel>
  );
}

export default function AiChallengesCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const next = nextProject("ai-challenges");
  const meta = getCaseStudyMeta(project);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: BRAND, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-[22px] w-[174px]">
            <Image src={MARK} alt="AI Challenges" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>

        {/* ── PANEL 1: HERO — Figma 4874:656
            Mark at 100,100 (the site's 50/50 at this scale), the two copy
            lines directly beneath it on the same left edge, and the sparkle
            cluster at 629,318. Below lg the mark and copy are one wrapping
            row (HERO_ROW) like every other project, with the sparkles under
            them. */}
        <section
          id="title"
          className={`relative flex w-full min-w-0 flex-col gap-8 overflow-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-[100dvw] lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0`}
        >
          <div className={HERO_ROW}>
            {/* 655x83 mark, height-driven so the wordmark never clips. */}
            <div className="relative z-10 h-[40px] w-[min(100%,316px)] shrink-0 sm:h-[52px] sm:w-[410px] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[68px] lg:w-[536px] xl:h-[80px] xl:w-[631px]">
              <Image
                src={MARK}
                alt="AI Challenges"
                fill
                unoptimized
                priority
                className="object-contain object-left"
              />
            </div>

            {/* Figma 4874:658 — 87,238, i.e. the mark's own left edge, just
                under it. */}
            {/* A plain div, not SlideIn. A hero's title and tagline are the
                first thing on screen, and rolling them in delays the one
                line that says what the project is — Molly's call, applied
                to every project's hero. The media in the hero still
                reveals; only the copy is static. */}
            <div
              className={`relative z-10 flex flex-col text-white ${HERO_COPY_GAP} ${HERO_ROW_COPY} lg:absolute lg:left-[50px] lg:top-[23.8%] lg:w-[420px] xl:w-[480px]`}
            >
              <p className={HERO_TITLE}>Playing with AI</p>
              {/* The frame's line is "Learning on the side for fun:)", which
                  the band under the work grid still carries. Here it says
                  what the learning actually is, because this is the page
                  where someone decides whether to keep reading. */}
              <p className={`opacity-90 ${HERO_SUBTEXT}`}>
                Learning the new AI tools on my own time &mdash; writing
                prompts, judging what comes back, and keeping the parts worth
                bringing to work on&nbsp;Monday.
              </p>
            </div>
          </div>

          {/* Figma 4900:11154 — the sparkle cluster, 505x484 at 648,337. */}
          <div className="pointer-events-none relative z-0 mx-auto aspect-[184/177] w-full max-w-[min(70vw,20rem)] lg:absolute lg:left-[45%] lg:top-[33.7%] lg:mx-0 lg:w-[35.1%] lg:max-w-none">
            <Image
              src={`${ASSET}/sparkle.svg`}
              alt=""
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </div>
        </section>

        {CHALLENGES.map((c) => (
          <Fragment key={c.key}>
            {/* The brief — Figma 4874:669 / 4874:674 */}
            <Panel width={COPY_PANEL} pad="center">
              <div className={`${MEASURE} mx-auto`}>
                <SlideIn>
                  <p className={EYEBROW}>{c.n}:</p>
                </SlideIn>
                <SlideIn delay={80}>
                  <h2 className={`mt-3 ${H_DISPLAY}`}>{c.title}</h2>
                </SlideIn>
                <SlideIn delay={160}>
                  <p className={`mt-4 opacity-80 ${BODY}`}>{c.brief}</p>
                </SlideIn>
              </div>
            </Panel>

            {/* The prompt as it was actually typed. */}
            <MediaBeat mark={c.toolMark} markAlt={c.tool}>
              <SlideIn delay={80} className="w-full">
                <Image
                  src={c.prompt.src}
                  alt={c.promptAlt}
                  width={c.prompt.w}
                  height={c.prompt.h}
                  sizes="(max-width: 1023px) 92vw, min(92vw, 1050px)"
                  className="h-auto w-full rounded-[10px]"
                  style={{
                    maxWidth: `calc(var(--beat-media-h) * ${c.prompt.aspect})`,
                  }}
                />
              </SlideIn>
            </MediaBeat>

            {/* What came back — and the end of this challenge. */}
            <MediaBeat mark={c.toolMark} markAlt={c.tool} endsGroup>
              <SlideIn delay={80} className="w-full">
                <div
                  className="relative w-full overflow-hidden rounded-[10px]"
                  style={{
                    aspectRatio: c.result.aspect.replace("/", " / "),
                    maxWidth: `calc(var(--beat-media-h) * ${c.result.ratio})`,
                  }}
                >
                  <AutoplayVideo
                    src={c.result.src}
                    className="h-full w-full object-cover"
                  />
                </div>
              </SlideIn>
            </MediaBeat>
          </Fragment>
        ))}

        <CaseStudyMetaPanel meta={meta} showProjected={false} />

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
