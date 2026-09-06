import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body, VIEW, STAT_ROW, MEASURE, MEDIA, CAPTION, NextProjectLink, CaseStudyMetaPanel, HERO_ROW, HERO_ROW_COPY, HERO_INSET_MD, HERO_TITLE, HERO_SUBTEXT, StatRow } from "@/components/v2/CaseStudyKit";

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

/* Page background, darkened off the brand accent so white body copy
   clears AA: #FE5E00 gives it 3.08:1, this gives 4.6+. The work-grid tile
   keeps the bright #FE5E00 (see pageBg in lib/projects.ts, which is what the
   tile's hover previews). */
const ACCENT = "#CB4B00";
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
          className={`relative flex w-full flex-col gap-10 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pt-0`}
        >
          {/* Mark and heading are placed independently at lg, both from the
              frame (4555:22442 at 100,100 / 4555:22443 at 890,107). The
              heading is NOT flush right: justify-between pushed it to the
              right inset, which at a 1490 window put it 175px further right
              than the frame draws it. 61.8% is the frame's own x. Giving it a
              box the mark's height and centring in that keeps the two lined
              up without matching numbers by hand. Below lg they stack. */}
          <div className={HERO_ROW}>
            <div className="relative h-10 w-[220px] shrink-0 sm:h-14 sm:w-[300px] lg:absolute lg:left-[50px] lg:top-[50px] lg:z-10 lg:h-[94px] lg:w-[594px]">
              <Image src={LOGO} alt="LivePerson" fill unoptimized priority className="object-contain object-left" />
            </div>

            <p className={`max-w-[300px] ${HERO_TITLE} ${HERO_ROW_COPY} lg:absolute lg:left-[61.8%] lg:top-[50px] lg:z-10 lg:flex lg:h-[94px] lg:max-w-[min(417px,28vw)] lg:items-center`}>
              Social Media Management Product
            </p>
          </div>

          {/* Hero artwork — Figma 4933:17013: 100,267 / 1200x562.5, which is
              all-channels-unified.png exactly (1200x563). One composite now
              instead of the phone mock plus the tweet/DM pair; the standalone
              panels that used to show these are gone, since the hero would
              have repeated them.

              Sized in --figma-u so it scales with the tighter axis rather
              than sliding on width alone — that's what kept the old phone
              mock off the wordmark, and the same reasoning applies here. */}
          <SlideIn
            delay={100}
            className="mt-8 w-full lg:absolute lg:left-1/2 lg:top-[26.7%] lg:ml-[calc(-600_*_var(--figma-u))] lg:mt-0 lg:w-[calc(1200_*_var(--figma-u))] lg:max-w-[1200px]"
          >
            <Image
              src="/work/liveperson/all-channels-unified.png"
              alt="The LiveEngage agent workspace with a social conversation open, and every channel — Facebook, Instagram, X, Messenger, SMS, WhatsApp — feeding into it"
              width={1200}
              height={563}
              sizes="(max-width: 1023px) 92vw, 83vw"
              className="h-auto w-full object-contain"
              priority
            />
          </SlideIn>

          {/* Body copy — Figma 4555:22447: 141,761 / 489 wide. Bottom-anchored
              so it holds its distance from the panel edge while the artwork
              above it scales; it sits over the composite's transparent
              lower-left, which is how the frame draws it too. */}
          <SlideIn
            delay={200}
            className="max-w-[46ch] lg:absolute lg:bottom-[5.5%] lg:left-[50px] lg:max-w-[min(489px,34vw)]"
          >
            <p className={`opacity-95 ${HERO_SUBTEXT}`}>
              Enables brands to interact with consumers over email and social
              media platforms through the LiveEngage messaging product.
            </p>
          </SlideIn>
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

        {/* ── 2. THE HANDOFF ITSELF. This panel went missing when the hero
               was rebuilt around all-channels-unified — that composite shows
               the channels feeding in, not the public-to-private move, so
               dropping this left the beat above with nothing to point at.
               1800x739 export, so 2.436. */}
        <BigImagePanel
          src="/work/liveperson/public-tweet-private-thread.webp"
          alt="A public tweet on the left, the same conversation continued as a private thread on the right, with the agent workspace between them"
          caption="The same complaint, public on one side and private on the other — one transcript."
          width={3870}
          height={1620}
          /* 1500 rather than the 950 default: the new export is 3870 wide, so
             the panel's own max-height steps are what bind (504/560/630 at
             lg/xl/2xl, giving 1204/1338/1500 at this 2.389 aspect) instead
             of an arbitrary width. `bare` because it's a cut-out on the
             panel colour — there's no card edge to round, and rounded-md
             would nick the artwork's own corners. */
          maxWidth={1500}
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
          src="/legacy/accounts-multiple-611c4c.png"
          alt="Self-service: connect, assign, and manage social accounts"
          caption="Self-service: connect, assign, and manage social accounts"
          width={1122}
          height={562}
        />

        {/* ── FUTURE VISION ─────────────────────────────────────────────── */}
        <BigImagePanel
          src="/work/liveperson/connections-self-service.webp"
          alt="Future vision — SocialConnect inside the agent workspace"
          caption="Where it goes next — SocialConnect woven through the rest of LiveEngage."
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
            <StatRow items={metrics} />
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
