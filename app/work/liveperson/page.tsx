import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body, VIEW, STAT_ROW, MEASURE, MEDIA, CAPTION, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

/**
 * LivePerson/SocialConnect, told as a story the way DocSquad is: it opens
 * on the person (a care agent answering one customer in six dashboards),
 * names the design problem the artwork shows (a complaint that starts in
 * public and has to end in private), then the move (one transcript
 * instead of a seventh tool), then self-service setup, then the numbers.
 *
 * Bespoke horizontal-scroll case study for LivePerson/SocialConnect,
 * matching the Figma reference at node 4477:14881 — same mechanics as the
 * GovOS page (HorizontalScroll + StickyNav + snap panels), hand-authored
 * instead of running through the shared app/work/[slug]/page.tsx template
 * because the Figma calls out specific image pairings and a stacked
 * metrics list that the generic per-project template doesn't model.
 * Excluded from the generic template via customSlugs there.
 */

export const metadata = {
  title: "SocialConnect — LivePerson — Molly Francis",
  description:
    "Redesigned the LivePerson SocialConnect agent workspace to unify public and private social threads into a single, cohesive interface.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#FE5E00";
const LOGO = "/logos/liveperson.svg";

const metrics = [
  { label: "Average Agent Response Time (ARTA)", value: "Dropped by 18%" },
  { label: "First Contact Resolution (FCR)", value: "Increased by 12%" },
  { label: "Meaningful Automated Conversation Score (MACS)", value: "Improved by 15%" },
  { label: "Overall Customer Satisfaction (CSAT)", value: "4.5\u2011point lift" },
];

/** Two images side by side, full-bleed panel — matches the Figma pairings. */
function BigImagePanel({
  src,
  alt,
  width,
  height,
  caption,
  maxWidth = 950,
  bare = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  maxWidth?: number;
  /** Cut-out PNG on the panel colour — no rounding, since there's no card
   *  edge to round and a 6px crop would nick the artwork's own corners. */
  bare?: boolean;
}) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <SlideIn className={`mx-auto flex w-full flex-col items-center ${MEDIA}`} style={{ maxWidth: `${maxWidth}px` }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`(max-width: 1024px) 92vw, min(90vw, ${maxWidth}px)`}
          className={`h-auto max-h-[591px] sm:max-h-[630px] md:max-h-[717px] lg:max-h-[504px] xl:max-h-[560px] 2xl:max-h-[630px] w-full object-contain ${bare ? "" : "rounded-md"}`}
        />
        {caption && <p className={`mt-4 max-w-[70ch] ${CAPTION}`}>{caption}</p>}
      </SlideIn>
    </Panel>
  );
}

export default function LivePersonCaseStudy() {
  const project = getProject("liveperson");
  const idx = projects.findIndex((p) => p.slug === "liveperson");
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
          <div /* liveperson.svg is 668x106 with no padding — a 6.3 aspect — so
                 object-contain is bound by WIDTH here, not height: at h-8 the
                 mark wants 202px and only got 152. Widening is what makes it
                 bigger. 210 draws it 210x33, still clear of the 50px
                 --nav-logo-h the band is sized for. */
            className="relative h-9 w-[170px] sm:h-11 sm:w-[210px]">
            <Image src={LOGO} alt="LivePerson" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>
        {/* ── TITLE ─────────────────────────────────────────────────── */}
        {/* Matches the Figma reference (node 4477:14882) closely: every
            element below is positioned from that frame's real 1440×1000
            coordinates, converted to vw/vh (site convention — see the
            govos-esubmission title panel for the same approach). The phone
            mock sits flush against the very bottom edge with zero gap
            (Figma: y 360, height 640 on a 1000-tall frame — 360+640=1000),
            while the tweet/DM composite and body copy sit independently
            higher up, not bottom-anchored to the phone. Below lg, all of
            this collapses back to a plain stacked flex column. */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-10 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pt-0"
        >
          {/* Logo and heading share one absolutely-placed row at lg, rather
              than each carrying its own top inset (100 and 76/95/114). The
              row is items-center, so the heading is vertically centred on the
              mark by construction and stays centred as the mark steps up in
              size — no per-breakpoint arithmetic to keep in sync. Top is 64,
              not 100: the mark reads better higher, and it buys clearance
              from the phone below. Below lg they unstack. */}
          <div className="contents lg:absolute lg:left-[64px] lg:right-[71px] lg:top-[64px] xl:right-[89px] 2xl:right-[107px] lg:z-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="relative h-10 w-[220px] shrink-0 sm:h-14 sm:w-[300px] lg:h-[94px] lg:w-[594px]">
              <Image src={LOGO} alt="LivePerson" fill unoptimized priority className="object-contain object-left" />
            </div>

            {/* Figma: 890,107, 417 wide */}
            <p className="max-w-[300px] text-lg font-semibold sm:text-xl lg:max-w-[297px] xl:max-w-[371px] 2xl:max-w-[445px] lg:text-[24px] xl:text-[29px] 2xl:text-[35px] lg:leading-[1.25]">
              Social Media Management Product
            </p>
          </div>

          <div className="mt-8 flex flex-1 items-end gap-4 sm:gap-8 lg:mt-0 lg:block lg:h-full">
            {/* Phone mock — Figma: 100,360, 640×640, flush to the frame's
                bottom edge (no gap below it at all). */}
            {/* Sized in --figma-u, not stepped px. The export is square
                (1280x1280), so a 455-wide box is also 455 TALL — bottom-
                anchored, that put its top at 100dvh-455, which on a 626-tall
                window is 171, right where the wordmark sits at 100..175. It
                rode straight over the logo on resize. u is pinned by
                whichever axis is tighter, so the phone shrinks with the
                viewport instead: 640u is 400px at that height, clearing the
                mark by 50. */}
            <SlideIn className="w-[48%] max-w-[380px] shrink-0 self-end lg:absolute lg:bottom-0 lg:left-[64px] lg:w-[calc(640_*_var(--figma-u))] lg:max-w-[640px]">
              <Image
                src="/work/liveperson/homeco-conversational-commerce.png"
                alt="Conversational commerce example inside LiveEngage"
                width={1280}
                height={1280}
                sizes="(max-width: 1024px) 48vw, 32vw"
                className="h-auto w-full object-contain"
                priority
              />
            </SlideIn>

            {/* Tweet/DM composite — Figma: 740,300, 554×460. Independent of
                the phone's bottom anchor — sits higher, doesn't touch the
                edge. */}
            <div className="flex flex-1 flex-col items-start gap-5 self-end pb-6 sm:gap-7 lg:block lg:pb-0">
              <SlideIn
                delay={100}
                className="w-full max-w-[440px] lg:absolute lg:left-[526px] xl:left-[658px] 2xl:left-[790px] lg:top-[216px] xl:top-[240px] 2xl:top-[270px] lg:w-[394px] xl:w-[493px] 2xl:w-[591px] lg:max-w-[554px]"
              >
                <Image
                  src="/work/liveperson/bb-mobile-social-dm.png"
                  alt="A public tweet routed into a private DM conversation"
                  width={1108}
                  height={920}
                  sizes="(max-width: 1024px) 48vw, 39vw"
                  className="h-auto w-full object-contain"
                />
              </SlideIn>
              {/* Body copy — Figma: 752,782, 630 wide */}
              <SlideIn
                delay={200}
                className="max-w-[46ch] lg:absolute lg:left-[535px] xl:left-[668px] 2xl:left-[802px] lg:top-[619px] xl:top-[688px] 2xl:top-[774px] lg:max-w-[448px] xl:max-w-[560px] 2xl:max-w-[672px]"
              >
                <p className="text-base leading-relaxed opacity-95 sm:text-xl lg:text-[16px] xl:text-[20px] 2xl:text-[25px] lg:leading-[1.4]">
                  Enables brands to interact with consumers over email and
                  social media platforms through the LiveEngage messaging
                  product.
                </p>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ── 1. THE AGENT'S DESK. Opens on the person, the way DocSquad
               opens on the moonlighting clinician. */}
        <TextPanel>
          <Heading intro>Six tabs, one customer.</Heading>
          <Body>
            A care agent answered the same customer in six places — email,
            tweets, DMs, posts, chats, texts — each in its own dashboard. Every
            channel meant another tool to learn and another window to check.
          </Body>
        </TextPanel>

        {/* ── PUBLIC TWEET / PRIVATE THREAD ────────────────────────────── */}
        <BigImagePanel
          /* The .webp sibling, not the .png: same transparent artwork, but
             1800x739 against the png's 1100x446. Displayed at up to 1000 CSS
             px the png was being upscaled about 1.8x on a 2x screen, which
             is the fuzziness; the webp lands at 1.11x, so it resolves. */
          src="/work/liveperson/public-tweet-private-thread.webp"
          alt="A public tweet on Twitter routed into the LiveEngage agent workspace, with the full private thread and social profile alongside it"
          width={1800}
          height={739}
          maxWidth={1000}
          bare
        />

        {/* ── 3. THE HARD PART. Public-to-private is the design problem the
               panel above shows, so it gets named here. */}
        <TextPanel>
          <Heading>A complaint starts in public and has to finish in private.</Heading>
          <Body>
            Someone tweets. The reply has to move to a DM, keep the thread
            intact, and stay on brand. No tool handled that handoff — so I
            built the conversation surface around it, public and private in one
            transcript.
          </Body>
        </TextPanel>

        {/* ── 4. THE MOVE. Said before the composite that shows it. */}
        <TextPanel>
          <Heading>So every channel became one conversation.</Heading>
          <Body>
            Rather than a seventh dashboard, SocialConnect folded the channels
            into the messaging product agents already had open. One transcript,
            whoever the customer is and wherever they turned up.
          </Body>
        </TextPanel>

        {/* ── AGENT WORKSPACE + ALL CHANNELS ───────────────────────────── */}
        {/* One image, not two: the agent-workspace composite that sat on the
            left repeats what the public-tweet/private-thread panel above
            already shows. */}
        <BigImagePanel
          /* Molly's replacement export. 1200x563 against the old 1206x915 —
             a 2.13 aspect, not 1.32 — so the width/height props move with it
             or next/image reserves the wrong box and the composite gets cut
             off at the right. Cut-out PNG, so `bare`. */
          src="/work/liveperson/all-channels-unified.png"
          alt="One surface for every channel — Facebook, Instagram, X, WhatsApp, SMS, and more"
          width={1200}
          height={563}
          maxWidth={1040}
          bare
        />

        {/* ── SOCIALCONNECT — SELF-SERVICE SETUP ───────────────────────── */}
        <TextPanel>
          {/* The lockup replaces the "SocialConnect" heading. The alt text
              carries the title, so the section still announces itself to a
              screen reader and still reads as an h2 in the outline. Capped
              at 420: the export is 594px wide, so beyond that it upscales on
              a 2x screen. */}
          <SlideIn className={MEASURE}>
            <h2>
              <Image
                src="/work/liveperson/socialconnect-lockup.png"
                alt="SocialConnect"
                width={594}
                height={124}
                unoptimized
                className="h-auto w-[min(100%,260px)] sm:w-[min(100%,330px)] lg:w-[min(100%,420px)]"
              />
            </h2>
          </SlideIn>
          <Body>
            Brands connect their own accounts, route each one to a team, and
            load the phrases and media their agents reply with. Onboarding used
            to go through us; now it doesn&apos;t.
          </Body>
        </TextPanel>

        <BigImagePanel
          src="https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580743086322-L6ILER7K3CPFW4WMCO1E/Accounts-Multiple.png"
          alt="Self-service: connect, assign, and manage social accounts"
          caption="Self-service: connect, assign, and manage social accounts"
          width={1122}
          height={562}
        />

        {/* ── FUTURE VISION ─────────────────────────────────────────────── */}
        <BigImagePanel
          src="/work/liveperson/connections-self-service.webp"
          alt="Future vision — SocialConnect inside the agent workspace"
          caption="Where it goes next \u2014 SocialConnect woven through the rest of LiveEngage. This vision aligned the roadmap across three product teams."
          width={1280}
          height={760}
        />

        {/* ── IMPACT ────────────────────────────────────────────────────── */}
        {/* lg:!pb-[var(--nav-clear)] balances the top inset. NAV_CLEAR pairs a
            142px top with a 24px bottom, so a centred block lands 59px below
            the panel's true middle — fine for media that needs the headroom,
            wrong for a short stat row. */}
        <Panel width={VIEW} pad="center" className="lg:!pb-[var(--nav-clear)]">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>Impact</Heading>
            {/* Across, not down — the same shape as every other project's
                stat row, and it stops four figures needing a full screen of
                height. */}
            <div className="mt-10 grid w-full grid-cols-2 gap-8 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
              {metrics.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <p className="text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.2rem] 2xl:text-[1.2rem] leading-snug opacity-80">{m.label}</p>
                  <p className="mt-2 text-[1.75rem] sm:text-[1.75rem] md:text-[1.92rem] lg:text-[2.1rem] xl:text-[2.3rem] 2xl:text-[2.3rem] font-semibold leading-tight tracking-[-0.03em]">
                    {m.value}
                  </p>
                </SlideIn>
              ))}
            </div>
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
