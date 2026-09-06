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
  HERO_INSET_MD,
  META_LABEL,
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
 * One story beat: a heading, one short paragraph, and the picture of it —
 * all in the SAME panel, so the copy and the artwork scroll as one thing.
 *
 * The media's width is capped by the room the panel has left under the type
 * (--panel-media-max-h less ~13rem) times the image's own aspect, so a short
 * window scales the picture instead of pushing it out of frame. The aspect
 * travels as a CSS variable: Tailwind scans source text at build time and
 * can't generate a class from a runtime value.
 *
 * `aside` puts the media beside the copy instead of under it — for a single
 * portrait phone, which on its own line is a small object in a very large
 * empty field.
 */
function Beat({
  heading,
  children,
  src,
  width,
  height,
  caption,
  maxWidth = 1000,
  aside = false,
  video = false,
}: {
  heading: string;
  children: React.ReactNode;
  src?: string;
  width?: number;
  height?: number;
  caption?: string;
  maxWidth?: number;
  aside?: boolean;
  video?: boolean;
}) {
  const has = src ? hasAsset(src) : false;
  const aspect = width && height ? width / height : 1;

  const media =
    has && src ? (
      <SlideIn
        delay={160}
        className={
          aside
            ? "w-[min(260px,62vw)] shrink-0 sm:w-[300px] lg:w-[min(300px,calc((var(--panel-media-max-h)_-_1rem)_*_var(--beat-aspect)))]"
            : "mt-8 w-full self-center lg:max-w-[min(var(--beat-max-w),92vw,calc((var(--panel-media-max-h)_-_13rem)_*_var(--beat-aspect)))]"
        }
      >
        {video ? (
          <div className="w-full overflow-hidden rounded-[10px]">
            <AutoplayVideo src={src} className="h-auto w-full object-contain" />
          </div>
        ) : (
          <Image
            src={src}
            alt={caption ?? heading}
            width={width}
            height={height}
            sizes={aside ? "300px" : "(max-width: 1023px) 92vw, min(92vw, 1000px)"}
            className="h-auto w-full"
          />
        )}
      </SlideIn>
    ) : null;

  const copy = (
    <div className={aside ? "w-full lg:max-w-[min(600px,52vw)]" : "w-full"}>
      <Heading>{heading}</Heading>
      <Body>{children}</Body>
    </div>
  );

  return (
    <Panel
      width={VIEW}
      pad="center"
      style={
        {
          "--beat-aspect": String(aspect),
          "--beat-max-w": `${maxWidth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={
          aside
            ? "mx-auto flex w-full max-w-[min(1100px,92vw)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16"
            : "mx-auto flex w-full max-w-[min(var(--beat-max-w),92vw)] flex-col"
        }
      >
        {copy}
        {media}
        {caption && !aside && media && (
          <SlideIn delay={240}>
            <p className={`mt-4 self-center text-center ${CAPTION}`}>{caption}</p>
          </SlideIn>
        )}
      </div>
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
          className={`relative flex w-full flex-col justify-center gap-8 overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:justify-start lg:gap-10 lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark and tagline sit on ONE row, the tagline to the RIGHT of the
              mark rather than under it — the frame Molly designed. The row is
              anchored at 50/50 like every other project's hero mark, and it
              wraps to a column below md. The tagline is deliberately smaller
              than it was when it stood alone on the left: beside a 615px
              mark it has ~680px to work in, and at the old 2.88rem it ran
              three lines and stood taller than the mark it's aligned to. */}
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:gap-x-10 md:gap-y-6 lg:absolute lg:left-[50px] lg:top-[50px] lg:z-10 lg:flex-nowrap lg:items-center lg:gap-12 xl:gap-14">
            <div className="relative h-[46px] w-[283px] shrink-0 sm:h-[52px] sm:w-[320px] lg:h-[100px] lg:w-[615px] xl:h-[115px] xl:w-[707px] 2xl:h-[130px] 2xl:w-[799px]">
              <Image src={LOGO} alt="athenaWell" fill unoptimized priority className="object-contain object-left" />
            </div>

            <div className="flex flex-col gap-2 md:min-w-0 md:basis-[16rem] md:grow lg:max-w-[26ch] lg:grow-0 lg:basis-auto">
              <p className="text-[1.75rem] font-semibold leading-[1.1] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.75rem]">
                Standalone apps for patients and care teams
              </p>
              <p className="max-w-[46ch] text-base leading-[1.45] opacity-90 sm:text-lg lg:text-[0.95rem] xl:text-[1.1rem] 2xl:text-[1.25rem]">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Hero composite — centred in the frame under the lockup, the way
              the reference draws it, rather than tucked into the bottom-right
              corner. 2366x1152 cropped to the artwork, so 2.054. Sized in
              --figma-u (pinned by whichever axis is tighter) so a short wide
              window scales it down instead of running it up into the
              tagline, and centred with a negative margin rather than
              -translate-x-1/2 — SlideIn-adjacent panels on this site have
              been bitten by inline transforms beating the utility, so the
              margin is the version that always survives. */}
          <div className="relative aspect-[2366/1152] w-full px-5 sm:px-8 md:px-[50px] lg:absolute lg:bottom-[8%] lg:left-1/2 lg:ml-[calc(-570_*_var(--figma-u))] lg:aspect-auto lg:h-[calc(555_*_var(--figma-u))] lg:w-[calc(1140_*_var(--figma-u))] lg:max-w-none lg:px-0">
            <Image
              src={`${ASSET}/hero.png`}
              alt="The athenaWell care plan on a laptop and the patient app on a phone"
              fill
              sizes="(max-width: 1023px) 92vw, 80vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </section>

        {/* ── 2. THE PROBLEM, as a scene. Text only: the site's openings
               are a statement panel, and the pictures start once there's
               something to show. */}
        <TextPanel>
          <Heading intro>The care plan lived in a paper folder.</Heading>
          <Body intro>
            A patient seeing four specialists had their plan spread across
            phone calls, folders and systems that didn&apos;t talk. Nobody
            had the whole picture — least of all the patient.
          </Body>
        </TextPanel>

        {/* ── 3. THE TURN, with the plan itself running underneath it. */}
        <Beat
          heading="So I put the whole plan in one place."
          src={`${ASSET}/videos/careplan.mp4`}
          width={1882}
          height={1160}
          video
          maxWidth={1100}
          caption="Conditions, goals, the day's tasks and the care team, on one page."
        >
          One plan the care team builds and the patient follows — instead of
          two versions of it that never quite matched.
        </Beat>

        {/* ── 4. THE CARE TEAM'S SIDE. */}
        <Beat
          heading="The care team builds it and watches it."
          src={`${ASSET}/care-team.png`}
          width={1001}
          height={558}
          maxWidth={1080}
          caption="Assign a goal, log a call, start a video visit — without leaving the patient's page."
        >
          Everything a nurse needed was on the patient&apos;s page: the plan,
          the timeline, and a way to reach them.
        </Beat>

        {/* ── 5. THE PATIENT'S SIDE. */}
        <Beat
          heading="The patient only has to see today."
          src={`${ASSET}/patient-app.png`}
          width={909}
          height={720}
          maxWidth={880}
          caption="Goals when they want the shape of it, and one day's list when they don't."
        >
          Six tasks, a progress ring, and one tap to their care team. Testers
          kept pointing at the ring — that was the part that brought them
          back.
        </Beat>

        {/* ── 6. THE PERSONAS, shown as the documents themselves. */}
        <Beat
          heading="Three patients, one plan to hold them all."
          src={`${ASSET}/personas.png`}
          width={2266}
          height={1343}
          maxWidth={1000}
        >
          Designed for three risk tiers rather than an average patient — each
          with its own values, goals and pain points.
        </Beat>

        {/* ── 7. THE JUDGMENT CALL. Text only — this one is thinking, not a
               screen, and a portfolio that only reports the assumptions
               that held isn't showing any. */}
        <TextPanel>
          <Heading>One assumption didn&apos;t survive testing.</Heading>
          <Body>
            Five interviews on a working prototype. I expected the tabbed plan
            to confuse people. It didn&apos;t — they preferred it, so it
            shipped as designed.
          </Body>
        </TextPanel>

        {/* ── 8. APOLLO. Beside the copy, not under it: one portrait phone
               on its own line reads as an empty section. */}
        <Beat
          heading="A question shouldn't mean a phone queue."
          src={`${ASSET}/apollo.png`}
          width={299}
          height={600}
          aside
        >
          Apollo answered in the app — triage first, then the article that
          actually answers the question.
        </Beat>

        {/* ── 9. CUSTOM ICONS. Media with a caption; the sheet carries
               itself, so no display heading. */}
        {hasAsset(`${ASSET}/custom-icons.webp`) && (
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
        )}

        {/* ── 10. OUTCOME, then the figures as a row of columns — the shape
               every other project closes on. */}
        <TextPanel>
          <Heading>The weeks between visits stopped being invisible.</Heading>
          <Body>
            Daily check-ins, surveys and education, with 200+ wearables
            feeding it — so the care team could see the time they used to
            miss.
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
