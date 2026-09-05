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
  STAT_ROW,
  MEDIA,
  HERO_TITLE,
  HERO_SUBTEXT,
  INTRO_TITLE,
  INTRO_SUBTEXT,
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
/**
 * The hero uses a tightly-cropped copy of the same mark.
 *
 * volusion.svg is a 738x294 viewBox with the artwork sitting at 100,10 and
 * measuring 539x277 — 100 units of transparent padding down the left. So
 * a box at left/top 100px positioned the PADDING at 100,100 and put the
 * visible mark at roughly 168,107, which is why it didn't line up with
 * every other project's large mark. volusion-tight.svg is the same paths
 * on a viewBox of "100 10 539 277", so its ink starts at 0,0 and 100px
 * means 100px. The padded original stays in use everywhere its inset is
 * harmless or wanted — the parked mark, the work thumb, the Up next band.
 */
const HERO_LOGO = "/logos/volusion-tight.svg";
const ASSET = "/work/volusion";

/**
 * Figma 4724:8426 — the closing figures, split out of the frame's single
 * sentence into the label-over-value pairs every other project's numbers
 * section uses (LivePerson's Impact, athenahealth's Usage/Time saved/Users).
 * The sentence's own tail becomes the footnote under the row.
 */
const ANALYTICS = [
  { label: "Support tickets", value: "Down 28%" },
  { label: "Trial engagement", value: "Up 19%" },
  { label: "Activation", value: "Up to 63%" },
  { label: "Task time", value: "38 seconds" },
] as const;

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

/**
 * Figma 4724:8405 — the Trial/Store category Venn, drawn rather than
 * placed.
 *
 * The obvious move was the chart already in projects.ts (the Squarespace
 * "image-asset.png"), but that raster has "Trial" and "Store" burned in
 * ABOVE the circles, while the frame sets them as type BELOW — so using it
 * printed both, at two sizes, in two places. It is also a fixed-resolution
 * bitmap of what is really two circles and three lists.
 *
 * Geometry read off the frame: the 670x444 image is filled by two circles
 * of the box's full height, so r = 222 at cy 222, with centres at x 229 and
 * 444. They meet where x = 336.5, h = sqrt(222^2 - 107.5^2) = 194.24, hence
 * the lens corners at y 27.76 and 416.24. The lens is painted explicitly
 * instead of relying on a blend mode: multiplying the two fills gives
 * #3EAF4E, and the frame's overlap samples #6ABB53.
 *
 * viewBox runs to 510 so the Trial/Store labels — frame y 672..718 against
 * an image starting at 204 — scale with the diagram instead of drifting
 * against it.
 */
const VENN = {
  yellow: "#E5E353",
  blue: "#45C5F0",
  lens: "#6ABB53",
  trial: ["Logos", "Nav Menu", "Display Settings", "Company", "Shipping", "Payment", "Config Variables"],
  both: ["Products", "Categories", "Site Content", "Template", "Import/Export", "File Editor", "Options"],
  store: ["Process Orders", "Customers", "CRM", "Abandon Carts", "Reporting", "Customer Reviews", "Coupons/Discounts"],
} as const;

/** 7 rows spanning y 138..307 on the frame, so a 28.2 pitch. */
const VENN_ROW_0 = 138;
const VENN_PITCH = 28.2;

function CategoryVenn() {
  return (
    <svg
      viewBox="0 0 670 510"
      role="img"
      aria-label="Most popular categories: Trial covers logos, nav menu, display settings, company, shipping, payment and config variables; Store covers process orders, customers, CRM, abandoned carts, reporting, customer reviews and coupons; both share products, categories, site content, template, import/export, file editor and options."
      className="h-auto w-full"
    >
      <circle cx="229" cy="222" r="222" fill={VENN.yellow} />
      <circle cx="444" cy="222" r="222" fill={VENN.blue} />
      <path
        d="M 336.5 27.76 A 222 222 0 0 1 336.5 416.24 A 222 222 0 0 1 336.5 27.76 Z"
        fill={VENN.lens}
      />
      <g fill="#ffffff" fontSize="13" fontWeight="600">
        {VENN.trial.map((t, i) => (
          <text key={t} x="76" y={VENN_ROW_0 + i * VENN_PITCH} textAnchor="start">
            {t}
          </text>
        ))}
        {VENN.both.map((t, i) => (
          <text key={t} x="336" y={VENN_ROW_0 + i * VENN_PITCH} textAnchor="middle">
            {t}
          </text>
        ))}
        {VENN.store.map((t, i) => (
          <text key={t} x="605" y={VENN_ROW_0 + i * VENN_PITCH} textAnchor="end">
            {t}
          </text>
        ))}
      </g>
      <g fill="#ffffff" fontSize="26" fontWeight="400">
        <text x="209.5" y="500" textAnchor="middle">
          Trial
        </text>
        <text x="460.5" y="500" textAnchor="middle">
          Store
        </text>
      </g>
    </svg>
  );
}

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
  const hero = `${ASSET}/hero.png`;
  const hasHero = hasImage(hero);

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
          {/* Box == mark, so left/top 100px lands where every other project's
              does. Heights match what the padded asset was already drawing
              (149/168/187 of visible mark), widths at its 1.946 aspect. */}
          <div className="relative z-10 aspect-[539/277] w-[min(100%,234px)] sm:w-[min(100%,292px)] lg:absolute lg:left-[100px] lg:top-[100px] lg:aspect-auto lg:h-[149px] lg:w-[290px] xl:h-[168px] xl:w-[327px] 2xl:h-[187px] 2xl:w-[364px]">
            <Image
              src={HERO_LOGO}
              alt="Volusion"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn
            delay={80}
            className="relative z-10 flex max-w-[46ch] flex-col gap-2 lg:absolute lg:left-[37.7%] lg:top-[14.2%] lg:max-w-[min(630px,40vw)]"
          >
            <p className={HERO_TITLE}>E-Commerce Software Solution</p>
            <p className={HERO_SUBTEXT}>
              Built for large and small businesses, selling a wide range of
              products and inventory.
            </p>
          </SlideIn>

          {/* Hero composite — the frame has only the wordmark and copy, so
              this takes the empty lower two-thirds. Bottom-anchored and
              horizontally centred (left-1/2 + -translate-x-1/2 rather than
              a right inset), and sized off --figma-u rather than a
              percentage of the panel: the cut-out is 866x553, and at a plain
              vw width a short wide window would have scaled it tall enough
              to run up into the copy. u is pinned by whichever axis is
              tighter, so it shrinks with the viewport instead. */}
          {hasHero && (
            <SlideIn
              delay={160}
              className="relative z-0 mt-4 w-full max-w-[560px] self-center lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[calc(866_*_var(--figma-u))] lg:max-w-none lg:-translate-x-1/2"
            >
              <Image
                src={hero}
                alt="The Volusion admin dashboard and product catalogue"
                width={866}
                height={553}
                priority
                sizes="(max-width: 1023px) 92vw, 60vw"
                className="h-auto w-full object-contain"
              />
            </SlideIn>
          )}
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
            Centred column, 670 of the frame's 1440. The heading is on the
            INTRO pair, not the smaller Heading/Body one: the frame sets it
            at 81/95 over a 32 subhead, which is exactly INTRO_TITLE and
            INTRO_SUBTEXT at a 1440 canvas. Trial/Store live inside the
            diagram — see CategoryVenn. */}
        <Panel width={VIEW} pad="center">
          {/* The diagram is capped below the column so the heading keeps the
              frame's 670 while the Venn itself reads smaller. */}
          <div className="mx-auto w-full max-w-[min(670px,86vw)] text-center">
            <SlideIn>
              <h2 className={INTRO_TITLE}>Google Analytics</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={`mt-3 ${INTRO_SUBTEXT}`}>Most Popular Categories</p>
            </SlideIn>
            <SlideIn delay={160} className="mx-auto mt-8 w-full max-w-[min(520px,72vw)]">
              <CategoryVenn />
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
        {/* A full-width panel rather than the frame's 950: four figures
            across need the room, and this is the shape Molly settled on for
            every other project's numbers. !pb balances NAV_CLEAR's 142/24
            so the row centres on the panel instead of 59px below it. */}
        <Panel width={VIEW} pad="center" className="lg:!pb-[var(--nav-clear)]">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>The Analytics</Heading>
            <div className="mt-10 grid w-full grid-cols-2 gap-8 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
              {ANALYTICS.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <p className="text-[clamp(1.1rem,1.4vw,1.2rem)] leading-snug opacity-80">
                    {m.label}
                  </p>
                  <p className="mt-2 text-[clamp(1.75rem,2.4vw,2.3rem)] font-semibold leading-tight tracking-[-0.03em]">
                    {m.value}
                  </p>
                </SlideIn>
              ))}
            </div>
            <SlideIn delay={480}>
              <p className="mt-10 text-[clamp(1rem,1.2vw,1.2rem)] leading-snug opacity-70">
                All in the first quarter post-launch.
              </p>
            </SlideIn>
          </div>
        </Panel>

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
