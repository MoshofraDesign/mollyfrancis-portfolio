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
  const a = aspect.toFixed(4);
  return (
    <Panel
      width={`lg:w-[min(100vw,calc(var(--panel-media-max-h)_*_${a}_+_9rem))]`}
      pad="center"
      className="items-center"
    >
      <div
        className={`mx-auto w-full max-w-[min(1100px,92vw,calc((var(--panel-media-max-h)_-_3.5rem)_*_${a}))]`}
      >
        <SlideIn delay={delay}>
          <div
            className="relative w-full overflow-hidden rounded-[10px] bg-black/10"
            style={{ aspectRatio: String(aspect) }}
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
        logo={
          <div className="relative h-9 w-[200px] sm:h-10 sm:w-[240px]">
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
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-24 sm:px-10 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          <div className="relative z-10 aspect-[2476/288] w-[min(100%,420px)] sm:w-[min(100%,520px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:aspect-auto lg:h-[72px] lg:w-[619px] xl:h-[84px] xl:w-[722px] 2xl:h-[96px] 2xl:w-[825px]">
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
            className="relative z-10 flex max-w-[46ch] flex-col gap-2 lg:absolute lg:left-[50px] lg:top-[148px] lg:max-w-[min(560px,42vw)] xl:top-[166px] 2xl:top-[184px]"
          >
            <p className="text-[1.05rem] leading-[1.45] opacity-90 lg:text-[clamp(1.05rem,1.25vw,1.25rem)]">
              {project.subtitle}
            </p>
          </SlideIn>

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

        {/* 3 — THE PUBLIC MARKETPLACE */}
        {hasAsset(publicClip) && (
          <ClipPanel
            src={publicClip}
            aspect={1478 / 1132}
            caption="Marketplace.com — search, filters and the partner listing grid"
          />
        )}

        {/* 4 — TWO VISITORS. Figma gives each persona its own 700-wide frame;
            they read better as one beat, since the point is that the same
            catalogue has to serve both. */}
        <Panel width={VIEW} pad="center">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>Two visitors, one catalogue.</Heading>
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

        {/* 5 — THE LISTING TOOLS */}
        {hasAsset(listingClip) && (
          <ClipPanel
            src={listingClip}
            aspect={1492 / 894}
            caption="Self-service tools — the form behind a partner listing"
          />
        )}

        {/* 6 — OUTCOME. project.outcome's own figures, phrased as a
            contribution rather than a claim. */}
        <TextPanel>
          <Heading>The catalogue got easier to shop.</Heading>
          <Body>
            Contributed to 71%+ customer adoption of partner solutions, across
            370+ integrations and 60+ specialties.
          </Body>
        </TextPanel>

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
