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
  META_LABEL,
  HERO_ROW,
  HERO_ROW_COPY,
  HERO_INSET_MD,
  CAPTION,
  NextProjectLink,
  CaseStudyMetaPanel,
} from "@/components/v2/CaseStudyKit";

/**
 * Bespoke horizontal-scroll case study for athenaConnect, built to Molly's
 * Figma flow at node 4647:13826 — hero, the problem, the two visitor types,
 * the two recordings, outcome — told as a story with the light copy the
 * other projects use rather than the frame's full paragraphs. Registered in
 * customSlugs on app/work/[slug]/page.tsx so the generic template doesn't
 * render it as well.
 */

export const metadata = {
  title: "athenaConnect — athenahealth — Molly Francis",
  description:
    "Redesigned discovery for athenahealth's partner Marketplace — search, filtering and content structure for public visitors and for customers evaluating tools inside athenaNet.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#00A883";
const LOGO = "/logos/athenaconnect.png";
const ASSET = "/work/athenaconnect";

function hasAsset(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/**
 * Height-capped clip panel, same pattern as Volusion's: the panel hugs the
 * clip rather than staying a full viewport wide, so consecutive recordings
 * don't sit a third of a screen apart, and the width is capped by the room
 * available (panel-media-max-h less the caption block, times the clip's own
 * aspect) so a short window scales the clip instead of cropping it.
 */
function ClipPanel({
  src,
  aspect,
  caption,
  delay = 0,
}: {
  src: string;
  aspect: number;
  caption: string;
  delay?: number;
}) {
  /* The aspect travels as a CSS custom property rather than inside the class
     name. Tailwind scans source text at build time, so a class built from a
     template literal (`max-w-[...${aspect}...]`) never gets generated — the
     caps silently did nothing, the clip took the full panel width, and it
     overflowed the panel's bottom edge and pushed the caption out of frame.
     These class strings are static; --clip-aspect is what changes per clip,
     and custom properties inherit, so setting it on the panel is enough for
     the width class here and the caps inside.

     The panel hugs the clip rather than staying a full viewport wide, so
     consecutive recordings don't sit a screen apart: whichever is narrower
     of the clip's own 1100 cap and the width its aspect allows in the height
     available, plus 9rem of gutter. The clip itself is capped the same way.
     The height-derived caps are lg-only, since below lg the panel has no
     fixed height and 92vw is the real constraint. */
  return (
    <Panel
      width="lg:w-[min(100vw,calc(1100px_+_9rem),calc(var(--panel-media-max-h)_*_var(--clip-aspect)_+_9rem))]"
      pad="center"
      className="items-center"
      style={{ "--clip-aspect": String(aspect) } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-[min(1100px,92vw)] lg:max-w-[min(1100px,92vw,calc((var(--panel-media-max-h)_-_4rem)_*_var(--clip-aspect)))]">
        <SlideIn delay={delay}>
          <div
            className="relative w-full overflow-hidden rounded-[10px] bg-black/10"
            style={{ aspectRatio: "var(--clip-aspect)" }}
          >
            <AutoplayVideo src={src} className="h-full w-full object-cover" />
          </div>
        </SlideIn>
        <SlideIn delay={delay + 100}>
          <p className={`mt-4 text-center ${CAPTION}`}>{caption}</p>
        </SlideIn>
      </div>
    </Panel>
  );
}

export default function AthenaConnectCaseStudy() {
  const project = getProject("athenaconnect");
  const idx = projects.findIndex((p) => p.slug === "athenaconnect");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);
  if (!project) return null;

  const hero = `${ASSET}/hero.png`;
  const publicClip = `${ASSET}/videos/public-user.mp4`;
  const listingClip = `${ASSET}/videos/athenanet-user.mp4`;

  return (
    <main
      className={`${jost.variable} relative`}
      style={{
        background: ACCENT,
        color: fg,
        fontFamily: "var(--font-jost), system-ui, sans-serif",
      }}
    >
      <StickyNav
        watch="title"
        // The lockup is 8.6:1, so WIDTH is what makes the parked mark read
        // bigger — the box height only has to stay clear of it. 240 -> 300.
        logo={
          <div className="relative h-10 w-[250px] sm:h-12 sm:w-[300px]">
            <Image
              src={LOGO}
              alt="athenaConnect"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* 1 — TITLE. Figma 4647:13700: the mark at the frame's corner with
            the device composite filling the space below. The mark sits 50/50
            like every other project's. */}
        <section
          id="title"
          className={`relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark + subtitle become one wrapping row from tablet up — see
              HERO_ROW. The mark keeps its size; the subtitle sits beside it
              whenever the width allows and drops below it when it can't. */}
          <div className={HERO_ROW}>
          <div className="relative z-10 aspect-[2476/288] w-[min(100%,420px)] shrink-0 sm:w-[min(100%,520px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:aspect-auto lg:h-[72px] lg:w-[619px] xl:h-[84px] xl:w-[722px] 2xl:h-[96px] 2xl:w-[825px]">
            <Image
              src={LOGO}
              alt="athenaConnect"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn
            delay={80}
            className={`relative z-10 flex max-w-[46ch] flex-col gap-2 ${HERO_ROW_COPY} lg:absolute lg:left-[50px] lg:top-[148px] lg:max-w-[min(560px,42vw)] xl:top-[166px] 2xl:top-[184px]`}
          >
            <p className="text-[1.05rem] leading-[1.45] opacity-90 lg:text-[clamp(1.05rem,1.25vw,1.25rem)]">
              {project.subtitle}
            </p>
          </SlideIn>
          </div>

          {/* The composite is 2476x998 (2.481). Bottom-anchored and centred
              with a negative margin, not -translate-x-1/2: SlideIn writes
              transform inline for its reveal, and an inline style beats a
              utility class, so the translate would be dropped and left-1/2
              alone would put the artwork's LEFT edge on the centre line. */}
          {hasAsset(hero) && (
            <SlideIn
              delay={160}
              className="relative z-0 mt-4 w-full self-center lg:absolute lg:bottom-[7%] lg:left-1/2 lg:ml-[calc(-619_*_var(--figma-u))] lg:mt-0 lg:w-[calc(1238_*_var(--figma-u))] lg:max-w-none"
            >
              <Image
                src={hero}
                alt="The athenahealth Marketplace on a laptop, tablet and phone"
                width={2476}
                height={998}
                priority
                sizes="(max-width: 1023px) 92vw, 86vw"
                className="h-auto w-full object-contain"
              />
            </SlideIn>
          )}
        </section>

        {/* 2 — THE PROBLEM */}
        <TextPanel>
          <Heading intro>
            Hundreds of partners, no way to find the right one.
          </Heading>
          <Body intro>
            Partner products lived apart from the systems customers actually
            worked in. Search was weak, filtering was flat, and sizing up an
            option meant leaving your day behind.
          </Body>
        </TextPanel>

        {/* 3 — TWO VISITORS. Figma gives each persona its own 700-wide frame;
            they read better as one beat, since the point is that the same
            catalogue has to serve both — and one beat can sit AHEAD of both
            recordings and frame them, where a split pair could not: the
            second clip is the partner-side listing editor, not the athenaNet
            view, so it can't carry a persona label of its own. */}
        <Panel width={VIEW} pad="center">
          <div className={`${STAT_ROW} mx-auto`}>
            {/* The kit's Heading measures 700px, which broke this line in
                two. It's 28 characters — at the display size's 4.05rem
                ceiling that wants ~820px, which the 54rem stat row around it
                has to spare. So the measure is lifted and the line is held
                on one row from lg up; below lg it wraps normally. */}
            <div className="lg:whitespace-nowrap lg:[&>*]:max-w-none">
              <Heading>Two visitors, one catalogue.</Heading>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-14">
              <SlideIn delay={120}>
                <h3 className="text-[clamp(1.35rem,1.8vw,1.6rem)] font-semibold leading-[1.2]">
                  Public User
                </h3>
                <p className="mt-2 text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.45] opacity-90">
                  Prospects on Marketplace.com are sizing up the whole
                  ecosystem. That page has to stand on its own.
                </p>
              </SlideIn>
              <SlideIn delay={210}>
                <h3 className="text-[clamp(1.35rem,1.8vw,1.6rem)] font-semibold leading-[1.2]">
                  athenaNet User
                </h3>
                <p className="mt-2 text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.45] opacity-90">
                  Customers inside athenaNet are judging a tool mid-workflow.
                  That page has to fit into their day.
                </p>
              </SlideIn>
            </div>
          </div>
        </Panel>

        {/* 4 — THE PUBLIC MARKETPLACE */}
        {hasAsset(publicClip) && (
          <ClipPanel
            src={publicClip}
            aspect={1478 / 1132}
            caption="Marketplace.com — search, filters and the partner listing grid"
          />
        )}

        {/* 5 — THE LISTING TOOLS */}
        {hasAsset(listingClip) && (
          <ClipPanel
            src={listingClip}
            aspect={1492 / 894}
            caption="Self-service tools — the form behind a partner listing"
          />
        )}

        {/* 6 — OUTCOME. The same figures as project.outcome, but as a row of
            columns rather than a sentence — the shape every other project's
            closing numbers use (Bright, Volusion, LivePerson): label on
            META_LABEL, figure on the 1.1 display ratio, detail on 1.45.
            !pb balances NAV_CLEAR so the row centres on the panel. */}
        <Panel width={VIEW} pad="center" className="lg:!pb-[var(--nav-clear)]">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>The catalogue got easier to shop.</Heading>
            <div className="mt-10 grid grid-cols-2 gap-10 gap-x-8 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-10">
              {[
                {
                  label: "Adoption",
                  value: "71%+",
                  detail: "of customers adopted partner solutions",
                },
                {
                  label: "Integrations",
                  value: "370+",
                  detail: "partner products in the catalogue",
                },
                {
                  label: "Specialties",
                  value: "60+",
                  detail: "covered across the partner ecosystem",
                },
              ].map((stat, i) => (
                <SlideIn key={stat.label} delay={120 + i * 90}>
                  <h2 className={META_LABEL}>{stat.label}</h2>
                  <p className="mt-1.5 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.6rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[1.1rem] leading-[1.45] opacity-90 lg:text-[1.15rem] xl:text-[1.2rem]">
                    {stat.detail}
                  </p>
                </SlideIn>
              ))}
            </div>
            <SlideIn delay={420}>
              <p className="mt-10 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.45] opacity-70">
                Figures the redesigned catalogue contributed to.
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
        />
      </HorizontalScroll>
    </main>
  );
}
