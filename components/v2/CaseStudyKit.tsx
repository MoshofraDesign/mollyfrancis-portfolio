import Link from "next/link";
import { contrastColor } from "@/lib/contrastColor";
import Image from "next/image";
import SlideIn from "@/components/SlideIn";
import {
  type CaseStudyMeta,
  toolIconSrc,
} from "@/lib/projects";

/**
 * Shared building blocks for full-viewport horizontal-scroll pages —
 * originally written for the project case-study template
 * (app/work/[slug]/page.tsx) and reused by app/about/page.tsx so both ride
 * the same HorizontalScroll/StickyNav mechanics GovOS introduced.
 *
 * Spacing model (inspired by karinasirqueira.com horizontal case studies):
 * each panel is a full viewport; content is centered with equal fluid
 * padding and a capped measure so ultra-wide screens don’t leave a long
 * empty trail after left-rail copy.
 */

/**
 * Side gutter for every case-study panel — 24px at the small end, 72px at
 * the cap, scaling continuously so it resizes across breakpoints instead of
 * stepping. This is the one inset panels should use: the pages had grown
 * five competing systems (a 4.5vw clamp here, 46/58/64px on GovOS and
 * Care.com, 71/89/107px on the hero rails, plus a spread of px-5/6/8 on
 * mobile), which is what made the grid read as misaligned page to page.
 *
 * Hero sections are the deliberate exception: their content is absolutely
 * positioned against Figma's 71/89/107px rail, so their inset is paired
 * with those left offsets and is left alone.
 */
/* ── Leading scale ───────────────────────────────────────────────────────
 * One ratio per role, on every project. Fixed px leadings (95px, 50px) and
 * Tailwind's presets (tight/snug/none/relaxed) had drifted into fourteen
 * different values, so the same size of type breathed differently depending
 * on which page you were reading.
 *
 *   1.1   display and headings, anything >= 2rem, plus stat values
 *   1.2   mid-size labels and figures, 1.25-2rem, set semibold
 *   1.4   captions and meta lines
 *   1.45  body copy and bullet lists, at any size
 *
 * Bigger type takes the tighter ratio — that's the standard part. Keep new
 * type on these four numbers rather than adding a fifth.
 */
export const GUTTER = "px-[clamp(1.5rem,4vw,4.5rem)]";

/* Content width scale — three steps, nothing in between. Each is capped in
 * vw as well as px so it still breathes inside the gutter on small screens. */
/**
 * Readable text measure for section copy — headings, paragraphs, bullet
 * lists. 700px flat, per Molly; it was 54rem/864.
 *
 * Multi-column blocks must NOT use this — four stat columns inside 700
 * leaves 175px each. Those take STAT_ROW below, which is the width this
 * token used to be, so nothing narrows that wasn't meant to.
 */
export const MEASURE = "w-full max-w-[min(700px,86vw)]";
/**
 * Stat rows, persona rows and the closing meta panel — anything laying
 * columns side by side rather than setting prose.
 */
export const STAT_ROW = "w-full max-w-[min(54rem,86vw)]";
/**
 * Media / screenshot cap. `panel-media` (globals.css) centers it and, at
 * lg+, caps the images inside to the room left between the nav band and the
 * panel's bottom padding — so a short viewport scales the media down
 * instead of letting it overflow the panel.
 */
export const MEDIA = "panel-media mx-auto w-full max-w-[min(950px,90vw)]";
/** Wide multi-item rows — screen line-ups, component grids. */
export const WIDE = "w-full max-w-[min(1400px,92vw)]";
/** @deprecated Prefer MEASURE — kept for existing imports. */
export const TEXT_W = MEASURE;

/**
 * The title panel's logo + copy pair, from tablet up.
 *
 * At lg every hero is absolutely placed from the Figma frame, and below md
 * it's a plain stacked column — so this only does something in between,
 * where it turns the pair into ONE wrapping flex row: the mark keeps its
 * size (md:shrink-0 on the mark) and the copy sits to its right whenever
 * there's room for its flex-basis, dropping to the line below when there
 * isn't. That's the "beside it if it fits" behaviour, decided by the
 * browser at each width rather than by a breakpoint guess.
 *
 * `contents` at both ends is deliberate: the wrapper disappears from layout
 * outside md, so the children stay direct flex items of the section and
 * their order-* classes and lg absolute positioning (which resolves against
 * the section, not the wrapper) both keep working untouched.
 */
export const HERO_ROW =
  "contents md:flex md:flex-wrap md:items-start md:gap-x-10 md:gap-y-6 lg:contents";

/** The copy half of HERO_ROW: wraps below the mark once it can't fit beside it. */
export const HERO_ROW_COPY = "md:min-w-0 md:basis-[16rem] md:grow";

/** Tablet title-panel padding — the same 50px top/left inset as lg. */
export const HERO_INSET_MD = "md:px-[50px] md:pt-[50px]";

/**
 * THE TYPE SCALE — five sizes, and every case study uses these.
 *
 * There were ninety-odd distinct font sizes across the ten projects: six
 * different "small body" values, five heading ladders (2.88/3.6/4.05 on
 * four projects, 3.6/4.5/5.06 on DocSquad, 2.16/2.56/2.75 elsewhere), and
 * one-off px steps in the generic template. Nothing was wrong with any
 * single value; the problem was that the same role got a different size
 * depending on which page you opened.
 *
 * Each token is a clamp, so it scales between a phone and a wide monitor
 * without a breakpoint ladder. Pick by ROLE, not by how big you want it:
 *
 *   TITLE    section and intro headings — the biggest type on a panel
 *   SUBHEAD  column heads, persona names, a sub-section inside a panel
 *   BODY     paragraphs and bullets
 *   SMALL    captions, detail lines under a figure, meta notes
 *   STAT     the figures in a numbers row
 */
export const TITLE =
  "font-semibold leading-[1.1] tracking-[-0.02em] [text-wrap:balance] text-[clamp(2rem,4.5vw,4.05rem)]";
export const SUBHEAD =
  "font-semibold leading-[1.2] [text-wrap:balance] text-[clamp(1.35rem,1.9vw,2rem)]";
export const BODY_TYPE =
  "font-normal leading-[1.45] [text-wrap:pretty] text-[clamp(1.25rem,1.6vw,1.65rem)]";
export const SMALL =
  "font-normal leading-[1.45] [text-wrap:pretty] text-[clamp(1.05rem,1.25vw,1.25rem)]";
export const STAT =
  "font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.9rem,2.4vw,2.6rem)]";

export const VIEW = "lg:w-screen";

/* ── Panel grouping: tight within a beat, loose between ──────────────────
 *
 * A case study reads as a sequence of beats, and a beat is usually a short
 * text panel followed by the screen it's describing. When every panel is a
 * full viewport, the gap between a heading and its own screen is identical
 * to the gap between two unrelated beats, so nothing groups: the page is
 * fourteen equally-spaced slides.
 *
 * So a text beat takes COPY_PANEL — narrower than the viewport, which pulls
 * the screen after it closer — and the screen takes MEDIA_PANEL, its own
 * artwork width plus a gutter. Established on GovOS and DocSquad; these are
 * the shared values so a project doesn't have to redeclare them.
 *
 * A panel that stands alone — the opening statement, a numbers row, the meta
 * block — stays on VIEW. Grouping only means something when there's
 * something to group with.
 */
/** Text beat that has a screen after it. */
export const COPY_PANEL = "lg:w-[min(100vw,920px)]";
/** Screen that belongs to the text beat before it: artwork + 8rem of gutter. */
export const MEDIA_PANEL = "lg:w-[min(100vw,1180px)]";
/** For artwork wider than MEDIA_PANEL's 1050 — DocSquad's 1200 desktop shots. */
export const MEDIA_PANEL_WIDE = "lg:w-[min(100vw,1328px)]";

/**
 * Closing panel width — the prototype / Figma-file call to action that ends
 * each case study. These had drifted apart (full-viewport on GovOS and the
 * generic template, 36rem on Bright and Netspend), so the end of a project
 * landed differently depending on which one you were reading. One value now,
 * for all of them. 530px: the copy block is 24rem and the panel's gutters are
 * 72 a side, so 384 + 144 is the width at which the panel is exactly its
 * content and nothing reads as empty field. Went 800 -> 500 -> 600 -> 530 as
 * Molly narrowed it; the last step came from her seeing it still too wide
 * beside the GovOS numbers panel.
 *
 * The !pl-10 trims the left inset from the shared gutter's 58-72px to 40, so
 * the block sits nearer the panel's left edge — at 1440 that takes the space
 * left of the title from about 119px to 64. The copy is centred in the panel
 * again rather than right-aligned; with only ~30px of slack either way the
 * alignment was never the lever, the gutter was.
 */
export const END_PANEL = "lg:w-[min(100vw,530px)] lg:!pl-10";

/**
 * The content block on the closing prototype panel. These sections were
 * laying their copy out in the standard 54rem measure — wider than the panel
 * itself — so the title and button filled it edge to edge and the panel's own
 * width never read. 24rem sits inside the 600px panel's padding at every
 * width (600 less the 72px gutters leaves 456) and is wide enough to hold
 * "Live Figma prototype" on one line at the closing title's 36px; below lg,
 * where the panel is full-bleed, it's what keeps the block from stretching
 * across a tablet.
 *
 * The block is centred in the panel; its contents are not. The title and the
 * button share a left edge, which is what makes them read as one unit — a
 * centred title with a centred button under it left the two on different
 * left edges at every width the title happened to wrap to.
 */
export const END_MEASURE = "mx-auto w-full max-w-[min(24rem,86vw)]";

/**
 * Closing-panel title. Deliberately well below the intro scale — this is a
 * call to action at the end of the case study, not a section opener, and at
 * the Heading scale it filled the panel on its own. 2.5vw lands on 36px at a
 * 1440 frame, the same size the Care.com hero title uses.
 *
 * GovOS and the generic template were on Heading, Bright and Netspend on
 * their own H_DISPLAY step scale; all four share this now.
 */
export const END_TITLE =
  "font-semibold leading-[1.1] tracking-[-0.02em] text-[1.5rem] sm:text-[1.75rem] lg:text-[clamp(1.5rem,2.5vw,2.25rem)]";

/**
 * Top inset so media never runs under the parked logo or the fixed Close
 * control. Both live in the --nav-clear band defined in globals.css, which
 * is the single source of truth — the logo is the deeper of the two, so
 * clearing it clears Close as well. The band is height-aware, so this inset
 * shrinks on short viewports instead of eating the content's room.
 *
 * Don't hardcode a stepped pt- here again: the parked logo sits 76px down on
 * a tall screen, so any fixed value smaller than that lets media scroll
 * underneath it.
 */
export const NAV_CLEAR =
  "pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-[var(--nav-clear)] lg:pb-6";

/** Keeps the last two words together so a line never ends on a lone orphan. */
export function noOrphan(text: string) {
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return text;
  return `${words.slice(0, -1).join(" ")} ${words[words.length - 1]}`;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.25em] opacity-60">{children}</p>
  );
}

/**
 * Fixed-height horizontal slice of the viewport at lg+, snapping —
 * below lg it's a normal full-width block in a vertically scrolling page.
 *
 * pad="center" (default): equal inset padding, content centered.
 * pad="rail": left content rail + peek padding (legacy).
 */
export function Panel({
  children,
  className = "",
  width = VIEW,
  pad = "center",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
  pad?: "rail" | "center";
  id?: string;
  /* Lets a caller hand the panel a CSS custom property its own width class
     reads — Tailwind can't build a class name from a runtime value, so a
     per-instance number has to travel as a variable. athenaConnect's clip
     panels pass --clip-aspect this way. */
  style?: React.CSSProperties;
}) {
  // justify-[safe_center]: centers content when it fits, but falls back to
  // start-alignment (scrollable) once it overflows the fixed 100dvh height —
  // plain `justify-center` combined with `overflow-y-auto` silently clips
  // whatever overflows above the centered midpoint, since a scroll container
  // can't scroll to a negative offset. Bit us on LivePerson's image panels.
  // items-center is deliberately unprefixed: in the vertical stack below lg
  // it's what centers section media on tablet and phone.
  const padLg =
    pad === "center"
      ? `items-center ${GUTTER} ${NAV_CLEAR}`
      : `items-center ${GUTTER} ${NAV_CLEAR} lg:items-stretch lg:px-0 lg:pl-[100px] lg:pr-[min(16%,120px)]`;

  return (
    <section
      id={id}
      style={style}
      className={`relative flex w-full flex-col justify-center gap-2 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:[justify-content:safe_center] lg:gap-0 lg:overflow-y-auto lg:overscroll-contain ${padLg} ${className}`}
    >
      {children}
    </section>
  );
}

/** Full-viewport text section — centered measure. */
export function TextPanel({
  children,
  id,
  width = VIEW,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  width?: string;
  className?: string;
}) {
  // items-[safe_center]: same reasoning as Panel's justify-[safe_center] —
  // centers vertically when content fits, falls back to top-alignment
  // (scrollable) rather than silently clipping once content overflows.
  return (
    <section
      id={id}
      className={`relative flex w-full justify-center lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-start lg:[align-items:safe_center] lg:overflow-y-auto lg:overscroll-contain ${GUTTER} ${NAV_CLEAR} ${className}`}
    >
      <div className={MEASURE}>{children}</div>
    </section>
  );
}

/**
 * Intro type — the title and subtext on a project's first section. One pair
 * for every case study, so the openings read the same from project to
 * project. Sizes come from Figma (Care.com 4555:22849): Jost SemiBold 81/95
 * and Regular 32 on a 1440 frame, hence 5.625vw and 2.22vw.
 *
 * Section headings further down the page stay on the smaller Heading/Body
 * scale — the intro is deliberately the largest type on the page.
 */
/**
 * The opening statement panel used to be the largest type on a page —
 * 5.625vw to a 6.5rem ceiling, from Care.com's frame — while every section
 * heading after it ran 4.5vw to 4.05rem. On a wide window that made the
 * first panel read as a different page from the rest of the case study.
 *
 * Both pairs are the section scale now: an intro is still the first thing
 * you read and still gets a panel to itself, but it doesn't shout. Kept as
 * separate tokens rather than deleted, since a dozen call sites name them
 * and the distinction may earn its way back.
 */
export const INTRO_TITLE = TITLE;
export const INTRO_SUBTEXT = BODY_TYPE;

/**
 * Hero type — the client's name and the one-line description on a project's
 * landing panel. Deliberately smaller than the INTRO pair: that one is sized
 * against a full-width measure on the statement panel, while a hero puts its
 * copy in a narrow column beside the artwork, so 5.625vw of the whole
 * viewport lands enormous there (67px in GovOS's 372px column).
 *
 * Netspend's hero is the reference — 1.6/2/2.25rem title over
 * 0.9/1/1.125rem body — expressed as a clamp so it scales between those
 * steps instead of jumping at each breakpoint. Care.com's hero title is the
 * same 2.25rem ceiling, taken from its frame's 36px.
 */
/**
 * Space between a hero's title and its subhead, on every horizontal case
 * study.
 *
 * The pair had drifted from 8px to 24px across the ten of them — Netspend
 * 8, Bright and GovOS 12, DocSquad and Volusion 16 (20 at lg), athenaWell
 * 24 — so how tightly a hero read depended on which project you opened.
 * Netspend's 8 is the reference, since that's the hero the others were
 * asked to match.
 *
 * Set on the flex wrapper rather than as a margin on the subhead, so the
 * pair has one mechanism wherever it appears.
 */
/**
 * Absolute-placement helper: centre a block in the field BELOW the parked
 * mark, not on the panel as a whole.
 *
 * A plain top-1/2 centres on the panel, which reads high, because the top
 * of the panel is not where the content area starts — the mark occupies
 * --nav-park-top + --nav-logo-h before anything else can. Offsetting by
 * half that band puts the block's middle midway between the bottom of the
 * mark and the bottom of the panel. Read from the tokens so it follows if
 * the park inset moves.
 *
 * Pair it with the block's own left/width; it supplies top and the
 * translate only.
 */
export const CENTER_BELOW_MARK =
  "lg:top-[calc(50%_+_(var(--nav-park-top)_+_var(--nav-logo-h))/2)] lg:-translate-y-1/2";

/**
 * Caption / small description under a piece of media. One size and one
 * strength on every project.
 *
 * These had drifted badly: athenahealth ran 1.25-1.65rem at 55% white,
 * athenaWell and GovOS 0.9-1.05rem at 75-80%, LivePerson 1.05-1.25rem at
 * 80% — so the same kind of line read four different ways depending on
 * which project you opened.
 *
 * text-current, not text-white: Patient IO's accent (#00CCB7) is bright
 * enough that contrastColor gives it DARK type, so a hardcoded white
 * caption would disappear there. Full-strength inherit is white on the
 * nine dark projects and correct on the light one.
 */
export const CAPTION =
  "text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.4] text-current [text-wrap:pretty]";

/**
 * A portrait circle with a text block beside it — one size across the
 * projects that use this beat.
 *
 * They had drifted to four: Bright's fax quote min(26vw,360), Bright's
 * outcome min(22vw,300), GovOS min(28vw,300) — and GovOS's box carried
 * three stacked generations of width utilities, so what it actually
 * rendered was whichever Tailwind emitted last.
 */
export const PORTRAIT_CIRCLE =
  "relative aspect-square w-[220px] shrink-0 overflow-hidden rounded-full sm:w-[280px] lg:w-[min(24vw,320px)]";
/** The copy that sits beside PORTRAIT_CIRCLE. */
export const PORTRAIT_COPY = "min-w-0 w-full lg:max-w-[500px]";

/**
 * Body text inside the closing meta panel — the team lines and the detail
 * line under each timing / projected figure. One size, because Team ran
 * 1.05-1.25rem while Timing's detail line ran 1.1-1.2, which read as two
 * different scales sitting side by side.
 */
export const META_BODY = "text-[clamp(1.1rem,1.35vw,1.25rem)] leading-[1.45]";

export const HERO_COPY_GAP = "gap-2";

/**
 * Hero title + subtext — the one scale, on every case study.
 *
 * STEPPED, not clamped, unlike the rest of the scale. A hero's copy is
 * absolutely placed against a mark at a fixed inset, so a size that scales
 * continuously with the viewport changes the copy block's height on every
 * pixel of a window drag — the title rewraps, the subtext slides, and the
 * whole hero appears to crawl while you resize. Fixed steps hold still
 * between breakpoints. The steps are the old clamp's own endpoints, so
 * nothing changes size at rest.
 *
 * Nine of the ten heroes had set their own: 2.25rem at 2xl on athenahealth
 * and Netspend, 2.75 on athenaWell and Patient IO, 35px on LivePerson,
 * 2.25 from the token on Bright/GovOS/Volusion. So how large a client's name
 * read depended on which project you opened. All of them come through here
 * now, one step smaller than the old token's ceiling.
 */
export const HERO_TITLE =
  "font-semibold leading-[1.1] tracking-[-0.01em] [text-wrap:balance] text-[1.25rem] sm:text-[1.375rem] lg:text-[1.5rem] xl:text-[1.75rem] 2xl:text-[1.95rem]";
export const HERO_SUBTEXT =
  "font-normal leading-[1.45] [text-wrap:pretty] text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem] xl:text-[1.1rem] 2xl:text-[1.125rem]";

export function Heading({ children, intro = false }: { children: React.ReactNode; intro?: boolean }) {
  return (
    <SlideIn className={MEASURE}>
      <h2
        className={
          intro
            ? INTRO_TITLE
            : TITLE
        }
      >
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

export function Body({
  children,
  intro = false,
  className = "",
}: {
  children: React.ReactNode;
  intro?: boolean;
  /** Lands on the SlideIn wrapper, not the <p> — so a second paragraph can
   *  add space above it without fighting the p's own mt-3. */
  className?: string;
}) {
  return (
    <SlideIn delay={120} className={`${MEASURE} ${className}`}>
      <p
        className={
          intro
            ? `mt-3 ${INTRO_SUBTEXT}`
            : `mt-3 opacity-90 ${BODY_TYPE}`
        }
      >
        {typeof children === "string" ? noOrphan(children) : children}
      </p>
    </SlideIn>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={`mt-6 space-y-2 ${MEASURE}`}>
      {items.map((b, i) => (
        <SlideIn
          key={b}
          as="li"
          delay={120 + i * 90}
          className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal leading-[1.45] opacity-90 [text-wrap:pretty]"
        >
          {noOrphan(b)}
        </SlideIn>
      ))}
    </ul>
  );
}

/** Shared “Up next” panel — narrower snap panel tinted with the next project’s accent (matches CareGrid thumb hover). */
export function NextProjectLink({
  href,
  client,
  title,
  accent = "#141414",
  logo,
  logoScale,
  variant = "panel",
  rail,
}: {
  href: string;
  client: string;
  title: string;
  /** The destination project's mark, shown under the label. */
  logo?: string;
  /** Multiplier on that mark — see logoBandScale in lib/projects.ts. */
  logoScale?: number;
  /** Next project accent — same solid color as homepage thumb hover. */
  accent?: string;
  /**
   * "panel" is a scroller stop: a 600px-wide, full-height column that sits
   * alongside the case study's other panels. "band" is for the pages that
   * scroll vertically instead (Print, Logos) — full-bleed and only as tall
   * as its copy, since a 100dvh column 600px wide at the bottom of an
   * ordinary page is just a hole.
   */
  variant?: "panel" | "band";
  /** band only: the host page's own rail, so the copy lines up with it. */
  rail?: string;
}) {
  // Type colour follows the accent rather than being forced white. `accent`
  // is each project's own page background (the two that had drifted — GovOS
  // #70ACF4 vs its page's #0091CF, and athenahealth #1A17B7 vs #4800b5 — were
  // corrected in lib/projects.ts), so nine of the fourteen bands come out
  // white. The five bright ones — Logos #00EADA, Bright #FFAF00, Ecommerce
  // #A3CC00, Patient.io #00CCB7, Print #1EB571 — take ink instead: white sits
  // between 1.5:1 and 2.7:1 on those, and Molly chose to keep the colours
  // vivid rather than darken them to carry white.
  const fg = contrastColor(accent);
  const band = variant === "band";
  return (
    <Link
      href={href}
      className={
        band
          ? "group relative flex w-full flex-col justify-center py-12 sm:py-14 lg:py-16"
          : "group relative flex w-full flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:h-[100dvh] lg:w-[min(100vw,600px)] lg:shrink-0 lg:snap-start lg:px-[clamp(1.25rem,4.5vw,2.5rem)] lg:py-0"
      }
      style={{ background: accent, color: fg }}
    >
      <div
        className={
          band
            ? rail || "mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-20"
            : "w-full max-w-[min(32rem,86vw)]"
        }
      >
        {/* Full strength, not the 0.55 it was: on the nine dark accents fg is
            the same cream as the title below, so dropping the tint is what
            makes this read white rather than grey. On the five light accents
            (GovOS, Bright, Patient.io, Ecommerce, Logos) fg is ink — white
            would be unreadable on #00EADA or #A3CC00 — so those stay dark. */}
        <p
          className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal"
          style={{ color: fg }}
        >
          Up next — {client}
        </p>
        {logo && (
          /* Equal height, with width only as a ceiling. The marks run from
             1.9 to 9.4 in aspect, and neither cap alone works: capping width
             left the stacked lockups half the size of the wordmarks, capping
             height made the same lockups tower over the title. 34px of
             height puts every mark on one optical scale — the wide wordmarks
             hit the 200px ceiling and sit shorter, which is what a row of
             logos wants — and logoBandScale nudges the few that still read
             off, via the --band-mark variable.

             They're white cuts, so on the light accents — where
             contrastColor picks ink for the type — the mark is inverted to
             near-black or it disappears into the field. */
          <Image
            src={logo}
            alt={client}
            width={320}
            height={80}
            unoptimized
            style={{ "--band-mark": String(logoScale ?? 1) } as React.CSSProperties}
            className={`mt-4 h-[calc(2rem_*_var(--band-mark))] w-auto max-w-[calc(160px_*_var(--band-mark))] object-contain object-left lg:mt-5 lg:h-[calc(34px_*_var(--band-mark))] lg:max-w-[calc(200px_*_var(--band-mark))] ${
              fg === "#141414" ? "[filter:brightness(0)_invert(8%)]" : ""
            }`}
          />
        )}
        <h2 className="mt-2 text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.1] transition-transform group-hover:translate-x-3">
          {title} →
        </h2>
      </div>
    </Link>
  );
}

/**
 * End-of-case-study meta — Team / Timing / Projected in a row, Tools below.
 * Uses currentColor so it works on light and dark project accents.
 * Pass lightText when the page uses cream/white type on a dark or saturated field
 * so the mono Cursor mark inverts to white.
 */
/**
 * The section labels on the closing meta panel — "The Team", "Timing",
 * "Projected Numbers", "Tools Used". Sentence case rather than the small
 * letterspaced caps they used to be, one step larger, and semibold (600 is
 * the heaviest Jost weight every project loads, so font-bold would be
 * synthesised on some pages). One token, so all four stay identical on
 * every project.
 */
export const META_LABEL = `font-semibold text-current/60 ${SMALL}`;

/**
 * A numbers row — the closing figures on a case study.
 *
 * One component because there were ten of these and no two matched: four
 * columns on Bright and LivePerson, three on athenaConnect, a vertical
 * space-y stack on Patient IO, figure-above-label on Care and
 * label-above-figure everywhere else, and figure sizes from 1.9rem to
 * 4.05rem. Same content, ten shapes.
 *
 * Label above figure, on the shared scale, and the columns stay a ROW from
 * sm up — as many columns as there are figures — rather than folding into a
 * 2x2 block at tablet width. Two-up below sm, since four figures across a
 * phone is unreadable.
 *
 * Colour comes from the panel: META_LABEL is text-current/60, so pass
 * "text-white" in className on a page whose panels don't already set it.
 */
export function StatRow({
  items,
  note,
  className = "",
  stack = false,
}: {
  items: readonly { readonly label: string; readonly value: string; readonly detail?: string }[];
  note?: React.ReactNode;
  className?: string;
  /** One column, for a numbers pair sharing a panel with something else. */
  stack?: boolean;
}) {
  const cols = stack
    ? "sm:grid-cols-1"
    : ({
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      } as Record<number, string>)[items.length] ?? "sm:grid-cols-3";
  return (
    <div className={className}>
      <div
        className={`mt-10 grid gap-10 gap-x-8 sm:gap-x-10 ${
          stack ? "grid-cols-1" : "grid-cols-2"
        } ${cols}`}
      >
        {items.map((s, i) => (
          <SlideIn key={s.label} delay={120 + i * 90}>
            <h3 className={META_LABEL}>{s.label}</h3>
            <p className={`mt-1.5 ${STAT}`}>{s.value}</p>
            {s.detail && <p className={`mt-1 opacity-90 ${SMALL}`}>{s.detail}</p>}
          </SlideIn>
        ))}
      </div>
      {note && (
        <SlideIn delay={240 + items.length * 90}>
          <p className={`mt-10 opacity-70 ${SMALL}`}>{note}</p>
        </SlideIn>
      )}
    </div>
  );
}

export function CaseStudyMetaPanel({
  meta,
  lightText = true,
  showProjected = true,
}: {
  meta: CaseStudyMeta;
  lightText?: boolean;
  showProjected?: boolean;
}) {
  return (
    <Panel width={VIEW} pad="center">
      <div className={`${STAT_ROW} mx-auto`}>
        <SlideIn>
          <div className="flex flex-col gap-14 sm:gap-16">
            <div className={`grid gap-10 ${showProjected ? "sm:grid-cols-3" : "sm:grid-cols-2"} sm:gap-x-14 lg:gap-x-20`}>
              <div>
                <h2 className={META_LABEL}>
                  The Team
                </h2>
                <ul className={`mt-5 space-y-3 ${META_BODY}`}>
                  {meta.team.map((row) => (
                    <li key={row}>{row}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className={META_LABEL}>
                  Timing
                </h2>
                <ul className="mt-5 space-y-4">
                  {meta.timing.map((row) => (
                    <li key={`${row.value}-${row.label}`}>
                      <p className="text-[clamp(1.35rem,1.8vw,1.6rem)] font-semibold leading-[1.2]">
                        {row.value}
                      </p>
                      <p className={`mt-1.5 text-current ${META_BODY}`}>
                        {row.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {showProjected && (
                <div>
                  <h2 className={META_LABEL}>
                    Projected Numbers
                  </h2>
                  <ul className="mt-5 space-y-5">
                    {meta.projected.map((row) => (
                      <li key={`${row.value}-${row.label}`}>
                        <p className="text-[clamp(2.1rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                          {row.value}
                        </p>
                        <p className={`mt-2 text-current ${META_BODY}`}>
                          {row.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h2 className={META_LABEL}>
                Tools Used
              </h2>
              <ul
                className={`mt-5 flex flex-row flex-wrap items-center ${
                  meta.toolIconBase ? "gap-10" : "gap-4 sm:gap-5"
                }`}
              >
                {meta.tools.map((name) => (
                  <li key={name} className="group relative">
                    <span
                      tabIndex={0}
                      aria-label={name}
                      className={`relative flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
                        meta.toolIconBase
                          ? "size-12"
                          : "size-9 sm:size-10"
                      }`}
                    >
                      <Image
                        src={toolIconSrc(name, meta.toolIconBase)}
                        alt=""
                        width={meta.toolIconBase ? 48 : 40}
                        height={meta.toolIconBase ? 48 : 40}
                        unoptimized
                        className={`size-full object-contain ${
                          name === "Cursor" && lightText ? "brightness-0 invert" : ""
                        }`}
                      />
                    </span>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition duration-150 after:absolute after:left-1/2 after:top-full after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-x-transparent after:border-t-neutral-900 after:content-[''] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                    >
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SlideIn>
      </div>
    </Panel>
  );
}
