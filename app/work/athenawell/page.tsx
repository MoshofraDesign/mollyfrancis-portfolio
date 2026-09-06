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
  Heading,
  Body,
  VIEW,
  STAT_ROW,
  MEASURE,
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
const LOGO = "/logos/athenawell.svg";
const ASSET = "/work/athenawell";

/**
 * Width of a copy panel — the measure plus the rail, not a whole viewport.
 *
 * A 700px measure on the 100px rail inside a full-viewport panel left ~600px
 * of empty ground between the last line of a heading and the picture that
 * goes with it, which is the distance Molly flagged: they belong together and
 * they were sitting a half-screen apart. 920 = 100 rail + 700 measure + the
 * 120 right inset pad="rail" already applies, so the measure is untouched and
 * only the dead field goes.
 *
 * Only for a heading whose picture comes next. A copy panel followed by
 * another copy panel stays VIEW — two 920s sit in one screen together, which
 * is the opposite complaint. And the panel immediately after the title keeps
 * VIEW too: a narrower one settles while the parked mark is still riding in,
 * and the roll-in is the part that reads right.
 */
const COPY_PANEL = "lg:w-[min(100vw,920px)]";

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
 * A media panel — the picture on its own.
 *
 * The beats that pair a heading with a screen read as two panels, not one:
 * sharing a panel with three or four lines of type left the picture a
 * fraction of the height and it ran off the bottom edge. This is the shape
 * the rest of the site already uses — a text panel, then the screen it
 * describes — so the rhythm matches the other projects too.
 *
 * The lg cap is the room the panel actually has, times the image's own
 * aspect. The aspect travels as a CSS variable:
 * Tailwind scans source text at build time and can't generate a class from
 * a runtime value.
 */
function MediaPanel({
  src,
  alt,
  width,
  height,
  maxWidth = 1000,
  video = false,
  rounded = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  maxWidth?: number;
  video?: boolean;
  /** For an export with no edges of its own — the icon sheet is a plate. */
  rounded?: boolean;
}) {
  if (!hasAsset(src)) return null;
  return (
    <Panel
      /* Full-viewport, with the picture's LEFT EDGE on the same 100px rail
         the copy panels use — so the heading's left edge and the image's
         left edge share one x and the eye tracks a single column across the
         seam. That alignment is what ties a beat to its screen; it survives
         a viewport of ground in between, where a peek at the next panel
         (which only exists when the panel happens to be narrower than the
         window) does not.
         The picture is capped by its own natural width — these are 1x
         exports, and stretching a 909px screenshot across a 1220px rail
         softens it — and, at lg, by the height the panel actually has. */
      width={VIEW}
      pad="rail"
      style={
        {
          "--beat-aspect": String(width / height),
          "--beat-max-w": `${maxWidth}px`,
        } as React.CSSProperties
      }
    >
      <SlideIn className="mx-auto flex w-full max-w-[min(var(--beat-max-w),92vw)] flex-col lg:mx-0 lg:max-w-[min(var(--beat-max-w),100%,calc(var(--panel-media-max-h)_*_var(--beat-aspect)))]">
        {video ? (
          <div className="w-full overflow-hidden rounded-[10px]">
            <AutoplayVideo src={src} className="h-auto w-full object-contain" />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1023px) 92vw, min(92vw, 1000px)"
            className={`h-auto w-full${rounded ? " rounded-[10px]" : ""}`}
          />
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

            {/* Two lines: "Standalone apps for / patients and care teams".
                The cap has to be in px, not ch — ch resolves against the
                element's OWN font-size, and on this wrapper that's the
                inherited 16px, so lg:max-w-[26ch] was really ~208px and the
                title broke into four lines. These widths fit the longest
                line ("patients and care teams") and not a word more. */}
            <div className="flex flex-col gap-2 md:min-w-0 md:basis-[16rem] md:grow lg:max-w-[420px] lg:grow-0 lg:basis-auto xl:max-w-[480px] 2xl:max-w-[560px]">
              <p className="text-[1.75rem] font-semibold leading-[1.1] sm:text-[1.8rem] md:text-[2.16rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.75rem]">
                Standalone apps for patients and care teams
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
        <Panel width={VIEW} pad="rail">
          <div className={MEASURE}>
          <Heading intro>The care plan lived in a paper folder.</Heading>
          <Body intro>
            A patient seeing four specialists had their plan spread across
            phone calls, folders and systems that didn&apos;t talk. Nobody
            had the whole picture — least of all the patient.
          </Body>
        </div>
        </Panel>

        {/* ── 3. THE TURN, with the plan itself running underneath it. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
          <Heading>So I put the whole plan in one place.</Heading>
          <Body>
            One plan the care team builds and the patient follows — instead of
            two versions of it that never quite matched.
          </Body>
        </div>
        </Panel>

        <MediaPanel
          src={`${ASSET}/videos/careplan.mp4`}
          alt="The athenaWell care plan — conditions, goals, tasks and the care team"
          width={1882}
          height={1160}
          video
          maxWidth={1882}
        />

        {/* ── 4. THE CARE TEAM'S SIDE. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
          <Heading>The care team builds it and watches it.</Heading>
          <Body>
            Everything a nurse needed was on the patient&apos;s page: the plan,
            the timeline, and a way to reach them.
          </Body>
        </div>
        </Panel>

        <MediaPanel
          src={`${ASSET}/care-team.png`}
          alt="The athenaWell care-team view — patient list, care plan, timeline and a video call"
          width={1001}
          height={558}
          maxWidth={1001}
        />

        {/* ── 5. THE PATIENT'S SIDE. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
          <Heading>The patient only has to see today.</Heading>
          <Body>
            Six tasks, a progress ring, and one tap to their care team. Testers
            kept pointing at the ring — that was the part that brought them
            back.
          </Body>
        </div>
        </Panel>

        <MediaPanel
          src={`${ASSET}/patient-app.png`}
          alt="The athenaWell patient app — goals, the daily care plan, and the task list"
          width={909}
          height={720}
          maxWidth={909}
        />

        {/* ── 6. THE PERSONAS, shown as the documents themselves. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
          <Heading>Three patients, one plan to hold them all.</Heading>
          <Body>
            Designed for three risk tiers rather than an average patient —
            each with its own values, goals and pain points.
          </Body>
        </div>
        </Panel>

        <MediaPanel
          src={`${ASSET}/personas.png`}
          alt="The three athenaWell persona documents — Healthy Patient, High Risk and Rising Risk"
          width={2266}
          height={1343}
          maxWidth={1600}
        />

        {/* ── 8. APOLLO. Beside the copy, not under it: one portrait phone
               on its own line reads as an empty section. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
          <Heading>A question shouldn&apos;t mean a phone queue.</Heading>
          <Body>
            Apollo answered in the app — triage first, then the article that
            actually answers the question.
          </Body>
        </div>
        </Panel>

        {/* One portrait phone, so the cap is height-first: the panel's own
            room rather than a panel-wide width that would blow a 299px
            export up to 1000. */}
        <MediaPanel
          src={`${ASSET}/apollo.png`}
          alt="Apollo, the athenaWell chat bot, answering a patient's symptom question and sending a Mayo Clinic article"
          width={299}
          height={600}
          maxWidth={299}
        />

        {/* ── 9. CUSTOM ICONS. Its own copy beat first, like every other
               screen on the page — this was the one picture arriving with no
               heading in front of it, which is why it and the Apollo phone
               ended up sharing a screen: two media panels back to back, both
               with narrow content on the rail, so the tail of one and the
               head of the next fit in the same view. */}
        <Panel width={COPY_PANEL} pad="rail">
          <div className={MEASURE}>
            <Heading>Every icon drawn, not downloaded.</Heading>
            <Body>
              One set across care plans, scheduling, messaging and results —
              so a patient learned each shape once.
            </Body>
          </div>
        </Panel>

        <MediaPanel
          src={`${ASSET}/custom-icons.webp`}
          alt="The athenaWell icon set — twenty-four drawn icons"
          width={752}
          height={621}
          maxWidth={752}
          rounded
        />


        {/* ── 10. OUTCOME, then the figures as a row of columns — the shape
               every other project closes on. */}
        {/* Full-viewport, not COPY_PANEL: this beat is followed by another
            text section rather than by its own picture, and two 920s sit in
            one screen together. COPY_PANEL is for a heading that hugs the
            picture it belongs to. */}
        <Panel width={VIEW} pad="rail">
          <div className={MEASURE}>
          <Heading>The weeks between visits stopped being invisible.</Heading>
          <Body>
            Daily check-ins, surveys and education, with 200+ wearables
            feeding it — so the care team could see the time they used to
            miss.
          </Body>
        </div>
        </Panel>

        <Panel width={VIEW} pad="rail" className="lg:!pb-[var(--nav-clear)]">
          <div className={STAT_ROW}>
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
