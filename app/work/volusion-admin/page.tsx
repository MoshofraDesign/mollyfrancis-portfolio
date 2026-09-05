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
import {
  Panel,
  TextPanel,
  Heading,
  Body,
  VIEW,
  MEDIA,
  HERO_TITLE,
  HERO_SUBTEXT,
  NextProjectLink,
  CaseStudyMetaPanel,
} from "@/components/v2/CaseStudyKit";

/**
 * Volusion Ecommerce Admin — Figma Portfolio › 4724:8376, left to right:
 * Title → Before → After → Problem → editor flow → Goal → Google Analytics
 * → personas → vNext homepage → The Analytics.
 *
 * Built on the shared kit rather than absolute frame coordinates, because
 * every panel in that frame is either centred on the 1440 canvas or set on
 * the 100px left rail — the Before media runs 245..1195 (245 each side),
 * the editor flow 320..1120, the vNext shot 261..1179, the analytics card
 * 385..1055, the personas 118..1322. Panel/MEDIA already centre to those
 * proportions and carry the nav clearance and section spacing Molly has
 * tuned across the other projects, so reaching for absolute placement here
 * would only reintroduce the drift the Care hero had.
 *
 * The Figma frame's layers are still named "Liveperson - Section N" from a
 * duplicate, and Sections 12 and 13 are exact copies of Section 2 (the same
 * LivePerson paragraph three times over). Those two are left out; Problem
 * and Goal carry Volusion's own overview and outcome copy.
 */

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const SLUG = "volusion-admin";
const BRAND = "#8759F2";
const LOGO = "/logos/volusion.svg";
const ASSET = "/work/volusion";

/** Figma 4724:8409 — the three merchant personas, 368-wide columns. */
const PERSONAS = [
  {
    title: "Struck out on their own (Freedom Seekers)",
    body:
      "People who started their business and are having some degree of success because they know their industry; relatively new to business but not to their niche. They might also be people who know business in general, and started one to start one, having assessed a number of business types as options.",
    src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052373839-DA345Q6MBX2L3GTAFUJH/1.png",
  },
  {
    title: "Family business owners (Legacy Builders)",
    body:
      "Have a family business with one or more members of the family; have more staying power than some other groups due to mutual support and commitment, but are less reliant on and capable with digital tools and online selling.",
    src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052602566-26V6KZU2NGIHU07IIP90/2.png",
  },
  {
    title: "Considering starting or recently started a business",
    body:
      "People who want to start a business but don't know where to start; motivated and may have an entrepreneurial mindset, but have limited business experience.",
    src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052727029-3KBO4H3QWR38EJZKSGZ3/3.png",
  },
] as const;

const ANALYTICS_TOP_PAGES =
  "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512053462663-OQUN662NOW47OD7YADHH/image-asset.png";

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: "Ecommerce Admin — Volusion — Molly Francis",
    description: p.aiSummary,
  };
}

const VIDEO_EXTS = [".mp4", ".webm", ".m4v", ".mov"];

/**
 * Resolve a clip by name, whatever Molly exported it as — and return null
 * when it isn't there yet, so a panel waiting on an asset is simply absent
 * instead of shipping a broken player. .mov is last: Safari plays it, but
 * nothing else does, so a transcode should always win when both exist.
 */
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

function hasImage(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/** Figma 4724:8384 / 4724:8388 — 950-wide media with a centred caption. */
function BeforeAfterPanel({ video, label }: { video: string; label: string }) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <SlideIn className={`mx-auto flex w-full flex-col items-center ${MEDIA}`}>
        <div className="w-full overflow-hidden rounded-[10px]">
          <AutoplayVideo
            src={video}
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="mt-8 text-center text-[clamp(1.25rem,1.6vw,1.65rem)] font-semibold">
          {label}
        </p>
      </SlideIn>
    </Panel>
  );
}

export default function VolusionCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const idx = projects.findIndex((p) => p.slug === SLUG);
  const next = projects[(idx + 1) % projects.length];

  const before = findVideo("before");
  const after = findVideo("after");
  const editorFlow = findVideo("editor-flow");
  const vnext = `${ASSET}/vnext-homepage.jpg`;
  const hasVnext = hasImage(vnext);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{
        background: BRAND,
        color: "#ffffff",
        fontFamily: "var(--font-jost), system-ui, sans-serif",
      }}
    >
      <StickyNav
        watch="title"
        logo={
          /* Figma 4724:8386 draws the parked mark at 145x74. The svg carries
             horizontal padding — its ink is about 74% of the viewBox width —
             so a 196-wide box lands the mark itself on 145. */
          <div className="relative h-[52px] w-[104px] sm:h-[62px] sm:w-[124px] lg:h-[74px] lg:w-[146px]">
            <Image
              src={LOGO}
              alt="Volusion"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* ── TITLE — Figma 4724:8377
            Wordmark at 100,100 (367x188 of ink) with the copy block beside
            it at 543,142, 630 wide. Stacked below lg. */}
        <section
          id="title"
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          {/* The box is wider and taller than Figma's 367x188 on purpose:
              volusion.svg is a 738x294 viewBox whose ink fills only about
              74% of the width, so object-contain fits by height and a 496x198
              box draws the mark at Figma's size. */}
          <div className="relative z-10 aspect-[496/198] w-[min(100%,320px)] sm:w-[min(100%,400px)] lg:absolute lg:left-[100px] lg:top-[100px] lg:aspect-auto lg:h-[158px] lg:w-[396px] xl:h-[178px] xl:w-[446px] 2xl:h-[198px] 2xl:w-[496px]">
            <Image
              src={LOGO}
              alt="Volusion"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn
            delay={80}
            className="relative z-10 flex max-w-[46ch] flex-col gap-4 lg:absolute lg:left-[37.7%] lg:top-[14.2%] lg:max-w-[min(630px,40vw)] lg:gap-5"
          >
            <p className={HERO_TITLE}>E-Commerce Software Solution</p>
            <p className={HERO_SUBTEXT}>
              Built for large and small businesses, selling a wide range of
              products and inventory.
            </p>
          </SlideIn>
        </section>

        {/* ── BEFORE / AFTER — Figma 4724:8383 and 4724:8387
            Both wait on their clip: the panel is skipped entirely until the
            recording is in public/work/volusion/videos/. */}
        {before && <BeforeAfterPanel video={before} label="Before" />}
        {after && <BeforeAfterPanel video={after} label="After" />}

        {/* ── PROBLEM — Figma 4724:8390 (999-wide copy on the 100px rail) */}
        <TextPanel width={VIEW}>
          <Heading intro>Problem</Heading>
          <Body intro>{project.overview}</Body>
        </TextPanel>

        {/* ── EDITOR FLOW — Figma 4903:372, 800x473.
            Molly's 20-frame click-through, looping. Shipped as h.264 rather
            than the GIF: at 1600 wide it is 2.5MB against the GIF's 3.4MB at
            800, and GIF's 256-colour palette dithers the photographic hero
            of the storefront badly. Same autoplay-loop-muted behaviour. */}
        {editorFlow && (
          <Panel width={VIEW} pad="center" className="items-center">
            <SlideIn className={`mx-auto w-full ${MEDIA}`}>
              <div className="w-full overflow-hidden rounded-[10px]">
                <AutoplayVideo
                  src={editorFlow}
                  className="h-auto w-full object-contain"
                />
              </div>
            </SlideIn>
          </Panel>
        )}

        {/* ── GOAL — Figma 4724:8397 */}
        <TextPanel width={VIEW}>
          <Heading>Goal</Heading>
          <Body>{project.outcome}</Body>
        </TextPanel>

        {/* ── GOOGLE ANALYTICS — Figma 4724:8401
            Heading, subhead, the top-pages chart at 670x444, then the
            Trial / Store pair beneath it. */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto w-full max-w-[min(670px,86vw)]">
            <SlideIn>
              <h2 className="text-[clamp(2rem,4.5vw,4.05rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
                Google Analytics
              </h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className="mt-4 text-[clamp(1.25rem,1.6vw,1.65rem)] font-normal opacity-90">
                Most Popular Categories
              </p>
            </SlideIn>
            <SlideIn delay={160} className="mt-6">
              <Image
                src={ANALYTICS_TOP_PAGES}
                alt="Top pages by traffic, from Google Analytics"
                width={670}
                height={444}
                unoptimized
                sizes="(max-width: 1023px) 86vw, 670px"
                className="h-auto w-full rounded-[6px] object-contain"
              />
            </SlideIn>
            <SlideIn delay={240} className="mt-6 grid grid-cols-2 gap-6">
              <p className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-semibold">
                Trial
              </p>
              <p className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-semibold">
                Store
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PERSONAS — Figma 4724:8409
            Three 368-wide columns, each a 320px portrait over its name and
            description. */}
        <Panel width={VIEW} pad="center">
          <div className="mx-auto grid w-full max-w-[min(1204px,92vw)] gap-10 sm:grid-cols-3 sm:gap-x-[4.15%]">
            {PERSONAS.map((p, i) => (
              <SlideIn key={p.title} delay={100 + i * 90} className="flex flex-col">
                <Image
                  src={p.src}
                  alt={p.title}
                  width={320}
                  height={320}
                  unoptimized
                  sizes="(max-width: 639px) 86vw, 26vw"
                  className="h-auto w-full max-w-[320px] rounded-[6px] object-contain"
                />
                <p className="mt-8 text-[clamp(1.35rem,1.9vw,2rem)] font-semibold leading-[1.2]">
                  {p.title}
                </p>
                <p className="mt-4 text-[clamp(1rem,1.15vw,1.2rem)] font-normal leading-[1.4] opacity-90">
                  {p.body}
                </p>
              </SlideIn>
            ))}
          </div>
        </Panel>

        {/* ── vNEXT HOMEPAGE — Figma 4736:13899, 918x620.
            Waits on the export, same as Before/After. */}
        {hasVnext && (
          <Panel width={VIEW} pad="center" className="items-center">
            <SlideIn className={`mx-auto w-full ${MEDIA}`}>
              <Image
                src={vnext}
                alt="The vNext Volusion storefront homepage"
                width={918}
                height={620}
                sizes="(max-width: 1023px) 92vw, min(90vw, 918px)"
                className="h-auto w-full rounded-[10px] object-contain"
              />
            </SlideIn>
          </Panel>
        )}

        {/* ── THE ANALYTICS — Figma 4724:8426.
            A 950-wide panel in the frame, not a full 1440 — the closing beat
            sits tighter than the sections before it. */}
        <TextPanel width="lg:w-[min(100vw,59.375rem)]">
          <Heading>The Analytics</Heading>
          <Body>
            Support tickets down 28%, trial engagement up 19%, activation up
            to 63%, and task time cut to 38 seconds — all in the first quarter
            post-launch.
          </Body>
        </TextPanel>

        <CaseStudyMetaPanel
          meta={getCaseStudyMeta(project)}
          lightText
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
