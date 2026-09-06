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
  INTRO_TITLE,
  INTRO_SUBTEXT,
  NextProjectLink,
  CaseStudyMetaPanel,
  STAT_ROW,
  VIEW,
  COPY_PANEL,
  MEDIA_PANEL,
  HERO_ROW,
  HERO_ROW_COPY,
  HERO_INSET_MD,
  SUBHEAD,
  SMALL,
  StatRow,
} from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "Homepay Payroll — Care.com — Molly Francis",
  description:
    "Paired employee and employer apps so caregivers can track hours and household employers can review, approve, and pay payroll.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#025747";
const LOGO = "/logos/care-homepay.svg";
const ASSET = "/work/care-homepay";
/** Section heading on the two split panels — Figma's 36/46, one scale. */
const SPLIT_TITLE = SUBHEAD;
const SPLIT_BODY = SMALL;

export default function CareHomepayCaseStudy() {
  const project = getProject("care-homepay");
  const idx = projects.findIndex((p) => p.slug === "care-homepay");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);
  if (!project) return null;

  /* Scope facts from lib/projects.ts, not outcome metrics: the paired apps,
     the 0-to-1, and the three surfaces the outcome names. Nothing here is a
     claim about results, so there's nothing to defend in an interview. */
  const figures = [
    { value: "2 apps", label: "One system, two mental models" },
    { value: "0 \u2192 1", label: "Phone-first hour tracking" },
    { value: "3 surfaces", label: "Timesheets, messaging, exceptions" },
  ];

  const splits = [
    {
      key: "messaging",
      title: "Secure Messaging",
      body: "Messages sit next to the timesheet, so a schedule change doesn't get lost in a text thread.",
      portrait: `${ASSET}/portrait-messaging.png`,
      portraitAlt: "Caregiver using secure messaging",
      screens: `${ASSET}/screens-messaging.png`,
      screensAlt: "Secure messaging — inbox and conversation",
    },
    {
      key: "clock",
      title: "Clock In and Out",
      body: "Clock in, clock out. The hours are right, so the pay is right.",
      portrait: `${ASSET}/portrait-clock.png`,
      portraitAlt: "Employee clocking in",
      screens: `${ASSET}/screens-clock.png`,
      screensAlt: "Clock in and out — map and start shift",
    },
  ];

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
          <div className="relative h-8 w-[180px] sm:h-9 sm:w-[200px] lg:h-[42px] lg:w-[240px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              className="object-contain object-left"
            />
          </div>
        }
        action={<CloseLink large />}
      />

      <HorizontalScroll>

        {/* ── PANEL 1: HERO — Figma 4555:22608
            Built like the Netspend hero: each child is absolutely placed at
            the frame's own fraction of the panel (see .care-hero-* in
            globals.css), so the wordmark and the store badges stay on the
            panel's left edge instead of drifting inward with a centred stage.
            Sizes still scale by --figma-u, which is what keeps the phones
            from ever climbing into the logo or the Close control. Below lg
            the order-* classes stack it: logo, headline, phones, badges. */}
        <section
          id="title"
          className={`relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark + headline are one wrapping row from tablet up — see
              HERO_ROW. The wrapper is display:contents outside md, so the
              order-* stacking below md and the .care-hero-* absolute
              placement at lg (which resolves against the section) are both
              untouched. */}
          <div className={`${HERO_ROW} md:order-1`}>
          {/* Large logo — Figma 4555:22725, 672x120 at 100,100 */}
          <div className="care-hero-logo order-1 relative h-[60px] w-[280px] shrink-0 sm:h-[80px] sm:w-[380px]">
            <Image
              src={LOGO}
              alt="Care.com Homepay"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

            {/* Headline — Figma 4555:22842, 455 wide at 831,114: just right
                of the wordmark, left-aligned. */}
            <SlideIn className={`care-hero-title order-2 self-start max-w-[340px] text-left ${HERO_ROW_COPY}`}>
              <p className="text-xl font-semibold leading-snug text-white [text-wrap:balance] sm:text-2xl">
                Homepay Employee &amp; Employer Payroll&nbsp;App
              </p>
            </SlideIn>
          </div>


          {/* App store badges — Figma 4555:22844, 50px each at 100,877 */}
          <div className="care-hero-badges order-4 mt-6 flex items-center gap-4">
            <Image
              src={`${ASSET}/google-play.svg`}
              alt="Google Play"
              width={50}
              height={50}
              unoptimized
              className="size-[50px]"
            />
            <Image
              src={`${ASSET}/app-store.svg`}
              alt="App Store"
              width={50}
              height={50}
              unoptimized
              className="size-[50px]"
            />
          </div>

          {/* Two phones — a stacked pair below lg, absolutely placed at lg.
              Molly's exports are cut at the Figma frame's bottom edge, so
              they're anchored to the panel's bottom rather than positioned
              from the top: the cut line lands exactly on the frame edge and
              reads as a bleed instead of a phone sliced off mid-body. Their
              own crop heights carry the vertical stagger. */}
          {/* Below lg the pair goes full-bleed: negative margins cancel the
              section's own padding at each breakpoint (and its pb-10), and
              the phones are sized in percent with no px cap, so together
              they span the viewport and run off the bottom edge — the same
              read as the lg frame, just filling a portrait window. At lg the
              .care-hero-phone-* rules take over (position: absolute,
              margin: 0), so none of this survives into the desktop frame. */}
          <div className="order-3 -mx-6 -mb-10 mt-6 flex flex-1 items-end justify-center gap-0 overflow-hidden sm:-mx-10 md:-mx-[50px] lg:contents">
            <SlideIn
              delay={80}
              className="care-hero-phone-l w-[54%] max-w-none"
            >
              <Image
                src={`${ASSET}/phone-hero-left.png`}
                alt="HomePay splash — Time tracking has never been easier"
                width={793}
                height={1378}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
            <SlideIn
              delay={180}
              className="care-hero-phone-r -ml-[9%] mt-[7%] w-[55%] max-w-none"
            >
              <Image
                src={`${ASSET}/phone-hero-right.png`}
                alt="HomePay splash — Easy time tracking with your employer"
                width={793}
                height={1210}
                priority
                className="h-auto w-full"
              />
            </SlideIn>
          </div>
        </section>

        {/* ── PANEL 2: STATEMENT — Figma 4555:22849
            The shared intro treatment: INTRO_TITLE / INTRO_SUBTEXT and the
            kit's spacing, so this opens the way every other project does. */}
        <Panel width={VIEW} pad="center">
          {/* A wider measure than the kit's default 54rem: the frame gives the
              copy 950 of 1440 (66%), and at the shared INTRO scale the
              narrower measure ran this longer paragraph past the panel's
              bottom. Same type sizes as every other project's opening — only
              the column is Figma's. */}
          <div className="mx-auto w-full max-w-[min(700px,86vw)]">
            <SlideIn>
              <h1 className={`text-white ${INTRO_TITLE}`}>
                Two people, one timesheet.
              </h1>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-3 text-white ${INTRO_SUBTEXT}`}>
                A caregiver and the family who employs her aren&rsquo;t a company
                and a contractor — they see each other every day. Payday still
                has to be exact. HomePay had to serve both sides without making
                it awkward.
              </p>
            </SlideIn>
            <SlideIn delay={200} className="mt-6">
              <span className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-1 font-semibold text-white text-[clamp(1.05rem,1.25vw,1.25rem)] lg:text-[clamp(1.05rem,1.25vw,1.25rem)]">
                0 &gt; 1
              </span>
            </SlideIn>
          </div>
        </Panel>

        {/* ── THE DEFAULT. The one opinionated decision in the product, and
               the reason the rest of it stays light. */}
        {/* COPY_PANEL, not VIEW: this beat exists to set up the clip in the
               next panel, so it sits close to it rather than a full viewport
               away. Same grouping as GovOS and DocSquad. */}
        <TextPanel width={COPY_PANEL}>
          <Heading>Hours that add themselves up.</Heading>
          <Body>
            Clock in, clock out, and the week rolls up on its own — a default
            that keeps payroll edits down instead of asking either side to
            chase them. Life still happens, so every entry stays editable.
          </Body>
        </TextPanel>

        {/* ── PANEL 3: VIDEO — Figma 4555:22858 */}
        <Panel width={MEDIA_PANEL} pad="center">
          <div className="mx-auto w-full max-w-[min(950px,90vw,calc(var(--panel-media-max-h)*1.2616))]">
            <SlideIn>
              <div className="relative aspect-[868/688] w-full overflow-hidden">
                <AutoplayVideo
                  src={`${ASSET}/videos/care-employee.mp4`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: TIMESHEET SCREENS — Figma 4555:22859
            Three 276x600 screens. Molly's transparent exports, so the panel
            colour shows between them — the old composite had a coral
            background baked into the gaps. */}
        <Panel width={MEDIA_PANEL} pad="center">
          <SlideIn className="mx-auto grid w-full max-w-[min(950px,90vw)] grid-cols-1 items-end gap-8 sm:grid-cols-3 sm:gap-[5.39%]">
            {[
              { n: 1, alt: "Add time — day picker" },
              { n: 2, alt: "Hours worked — weekly view" },
              { n: 3, alt: "Timesheet — totals and submit" },
            ].map(({ n, alt }) => (
              <Image
                key={n}
                src={`${ASSET}/screens-timesheet-${n}.png`}
                alt={alt}
                width={276}
                height={600}
                className="mx-auto h-auto w-full max-w-[min(276px,calc(var(--panel-media-max-h)*0.46))]"
              />
            ))}
          </SlideIn>
        </Panel>

        {/* ── PANELS 5-6: SECURE MESSAGING, CLOCK IN AND OUT
            Figma 4555:22862 / 4555:22870 — portrait and copy on the left, the
            screen pair on the right. A two-column grid rather than absolute
            frame coordinates, so the pair sits one gap away from the circle
            at every window shape instead of drifting across the panel. */}
        {splits.map((s, i) => (
          <Panel key={s.key} width={VIEW} pad="center">
            {/* md:gap-16, not gap-8, once the two halves are stacked: the
                circle and its caption are one group and the screen pair is
                another, and at tablet width an 8 was the same gap that sits
                between the caption's own two lines. */}
            <div className="mx-auto grid w-full max-w-[min(1000px,86vw)] items-center gap-8 md:gap-16 lg:grid-cols-[minmax(0,368fr)_minmax(0,634fr)] lg:gap-[3.33%] lg:gap-y-0">
              <SlideIn className="flex flex-col items-center gap-6 text-white">
                <div className="relative size-[160px] shrink-0 overflow-hidden rounded-full sm:size-[220px] lg:aspect-square lg:h-auto lg:w-[min(320px,87%)]">
                  <Image
                    src={s.portrait}
                    alt={s.portraitAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, 220px"
                    className="object-cover"
                  />
                </div>
                {/* Left-aligned and capped a little wider than the circle
                    above it. Centred, the body ran the full 860px of the
                    stacked panel and broke into one long line plus a two-word
                    orphan; at this measure it wraps like a paragraph. The cap
                    lifts at lg, where the copy has its own grid column. */}
                <div className="flex w-full max-w-[300px] flex-col gap-4 text-left sm:max-w-[380px] lg:max-w-none">
                  <p className={SPLIT_TITLE}>{s.title}</p>
                  <p className={SPLIT_BODY}>{s.body}</p>
                </div>
              </SlideIn>
              <SlideIn delay={100} className="flex w-full justify-center lg:justify-start">
                <Image
                  src={s.screens}
                  alt={s.screensAlt}
                  width={634}
                  height={632}
                  priority={i === 0}
                  className="h-auto w-full max-w-[min(560px,calc(var(--panel-media-max-h)*1.0032))] lg:max-w-[min(634px,calc(var(--panel-media-max-h)*1.0032))] object-contain"
                />
              </SlideIn>
            </div>
          </Panel>
        ))}

        {/* ── THE FIGURES. Same shape as LivePerson's Impact and
               athenahealth's stat row: label over value, across. !pb balances
               NAV_CLEAR's 142/24 so the row centres on the panel. */}
        <Panel width={VIEW} pad="center" className="lg:!pb-[var(--nav-clear)]">
          <div className={`${STAT_ROW} mx-auto`}>
            <Heading>What shipped</Heading>
            <StatRow className="text-white" items={figures} />
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
