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
import { NextProjectLink, CaseStudyMetaPanel, INTRO_TITLE, INTRO_SUBTEXT, CENTER_BELOW_MARK, CAPTION, TITLE, BODY_TYPE, HERO_TITLE, HERO_SUBTEXT } from "@/components/v2/CaseStudyKit";

/**
 * DocSquad — a moonlighter-first narrative over the Figma deck's assets
 * (Portfolio › 4553:21862), left to right:
 *   Title → the provider was already off the clock → they didn't want
 *   another platform → so the visit starts before the provider does →
 *   Provider Portal desktop → Provider Portal mobile → one interface,
 *   web and native → the icon set → interview+dashboard → portrait →
 *   Outcome.
 *
 * The beats open on who the clinician actually is — a Virtual Moonlighter
 * picking up shifts around a full-time job — because every constraint in
 * the project follows from that: minutes rather than a shift, and no
 * appetite for a second EHR. The old "Problem"/"Research" labels are gone;
 * the copy carries the same facts as sentences instead.
 *
 * (The Figma deck also has a research board panel after Research; it's
 * cut from the page. research-board.png is still in public/ and still
 * listed in lib/projects.ts images, so it's a one-line restore.)
 * 1440×1000 panels on #dd00e2. Large wordmark on the title panel; small
 * 200×27 wordmark parks at StickyNav's default inset, matching other pages.
 */

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const SLUG = "docsquad";
const BRAND = "#dd00e2";
const LOGO = "/logos/docsquad.svg";
const ASSET = "/work/docsquad";

/** Figma Header Large: Jost SemiBold 81/95. */
const H_DISPLAY = `text-white ${TITLE}`;
/** Figma Paragraph: Jost Regular 32, 16px under the heading. */
const BODY = `text-white/90 ${BODY_TYPE}`;

/** Outcome stat columns — Figma node 4672:15331: 29% / 71% / $1.2m,
 *  each with a big hero number, uppercase kicker, delta + down triangle,
 *  and a detail line. */
const OUTCOME_STATS = [
  {
    hero: "29%",
    kicker: "Synchronous",
    delta: "2.5min",
    detail: "12 to 9.5 minutes",
  },
  {
    hero: "71%",
    kicker: "Asynchronous",
    delta: "1.5min",
    detail: "8 to 6.5 minutes",
  },
  {
    hero: "$",
    kicker: "Projected",
    delta: "$1.2m",
    detail: "Savings at 1 Year",
  },
] as const;

/** Figma crops of the 4-phone sprite (node 4553:21876). */
const PHONE_CROPS = [
  { alt: "Intake — encounter history", left: "-11.26%", width: "217px" },
  { alt: "Video visit in progress", left: "-121.98%", width: "216px" },
  { alt: "Assessment and diagnosis", left: "-233.51%", width: "216px" },
  { alt: "Review response to patient", left: "-345.04%", width: "217px" },
] as const;

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: `Virtual Care Telehealth — DocSquad — Molly Francis`,
    description: p.aiSummary,
  };
}

const VIDEO_EXTS = [".mp4", ".mov", ".webm", ".m4v"];

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

/**
 * Panel for DocSquad's beats; content uses Figma % positions at lg+.
 *
 * Not lg:w-screen. Measured live at 1440: every one of these panels was a
 * full viewport wide while its content ran 563 to 1005 — 38% to 61% of each
 * panel was empty field, which is the gap between one beat and the next.
 * 1200 keeps the widest block (1005 from a 100px inset, so 1105) inside the
 * panel and takes roughly 240px of emptiness out of every gap.
 */
/**
 * Width of a copy panel whose picture comes next — the measure plus its
 * rail, not the full 1200 every panel used to take.
 *
 * A 700px measure at a 71px inset inside a 1200 panel left ~430px of empty
 * ground between a heading and the screen it introduces. 920 closes it.
 * Only when the picture is what follows: a copy panel followed by another
 * copy panel keeps the full width, since two 920s sit in one view together.
 */
const COPY_PANEL = "lg:w-[min(100vw,920px)]";

/**
 * A media panel keeps the 1200 its artwork is placed against and adds the
 * extra gutter on the TRAILING edge, so a beat reads as one thing: the
 * heading sits tight against its screen, and the space opens up after the
 * screen, before the next heading. Tight within, loose between.
 */
const MEDIA_PANEL = "lg:w-[min(100vw,1328px)]";

function ScreenPanel({
  children,
  className = "",
  width = "lg:w-[min(100vw,1200px)]",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section
      className={`relative flex w-full flex-col items-center justify-center gap-8 px-6 py-8 sm:px-10 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-start lg:overflow-hidden lg:px-0 lg:py-0 ${className}`}
    >
      {children}
    </section>
  );
}

export default function DocSquadCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const idx = projects.findIndex((p) => p.slug === SLUG);
  const next = projects[(idx + 1) % projects.length];
  const desktopVideo = findVideo("provider-desktop");

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: BRAND, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="docsquad-title"
        logo={
          <Image
            src={LOGO}
            alt="DocSquad"
            width={200}
            height={27}
            unoptimized
            className="h-[27px] w-[200px] max-w-[109px] sm:max-w-[179px] md:max-w-[215px] lg:max-w-[287px] xl:max-w-[358px] 2xl:max-w-[430px] object-contain object-left"
          />
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* 1 — TITLE. Figma 4553:21863
            Logo 100,100 / 842×112 · Description 100,689 / 308×208
            Hero 479,349 / 891×529 */}
        <section
          id="docsquad-title"
          className="relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0"
        >
          <div className="relative z-10 aspect-[842/112] w-[min(100%,842px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[89px] lg:w-[748px] lg:max-w-none lg:aspect-auto">
            <Image
              src={LOGO}
              alt="DocSquad"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          {/* No reveal on this one. It's the copy you land on, so any
              roll-in — even the 260ms/24px one it used to have — reads as a
              lag before the page settles rather than as motion doing a job.
              Everything further down the page keeps its SlideIn, where a
              panel is actually scrolling in.

              Type on the shared hero pair, which it wasn't: the title was
              on the figure size (2.6rem at 2xl) and the subtext on the
              caption size, so DocSquad's hero read larger than every other
              project's. */}
          <div className="relative z-10 flex max-w-[308px] flex-col gap-2 text-white lg:absolute lg:bottom-[82px] lg:left-[50px] lg:h-auto lg:max-w-[274px]">
            <p className={HERO_TITLE}>Virtual Care Telehealth App</p>
            <p className={HERO_SUBTEXT}>
              Provider desktop and native apps for doctors, nurses and staff
              to diagnose patients, asynchronously or in a live visit.
            </p>
          </div>

          {/* Aspect-driven and width-capped, like the interview composite.
              hero.png is 2026x1203 (1.6841); the box used to pair stepped
              heights with a max-height, so once the cap bit the height shrank
              while the width held and the box disagreed with the artwork. The
              aspect sets the height now, and the width is what gets capped.
              One top inset rather than three (251/279/314), a touch higher, so
              it can't drift as the breakpoints change. */}
          <div className="relative z-0 mx-auto aspect-[2026/1203] w-full max-w-[min(92vw,891px)] lg:absolute lg:left-[341px] xl:left-[426px] 2xl:left-[511px] lg:top-[252px] lg:mx-0 lg:w-[686px] xl:w-[856px] 2xl:w-[1026px] lg:max-w-[calc(var(--panel-media-max-h)_*_1.6841)]">
            <Image
              src={`${ASSET}/hero.png`}
              alt="DocSquad provider desktop, native app, and watch"
              fill
              priority
              unoptimized
              className="object-contain object-center"
            />
          </div>
        </section>

        {/* 2 — THE SECOND JOB. Opens on who the clinician actually is,
            because every constraint in this project follows from that. */}
        <ScreenPanel className="!pt-16">
          <div className={`flex w-full max-w-[min(700px,86vw)] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[min(700px,86vw)] ${CENTER_BELOW_MARK}`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>The provider was already off the clock.</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                DocSquad&apos;s clinicians moonlight — telehealth shifts squeezed
                around a full-time job. They arrive with minutes, not hours. The
                old product asked for the opposite: a live video call every
                visit, then a second system to type it all into.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 3 — WHAT THEY SAID. The research list is Molly's own
            (lib/projects.ts research[]), stated as method rather than
            reframed as a finding. */}
        <ScreenPanel>
          <div className={`flex w-full max-w-[min(700px,86vw)] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[min(700px,86vw)] ${CENTER_BELOW_MARK}`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>They didn&apos;t want another platform.</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                Five interviews with clinicians actually working these shifts,
                teardowns of how competing platforms onboard, and testing of the
                diagnosis flow itself.
              </p>
              <p className={`mt-8 ${BODY}`}>
                They all said the same thing: don&apos;t hand us another tool.
                Hand us less work.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 4 — THE TURN. The design move the rest of the page shows. */}
        <ScreenPanel width={COPY_PANEL}>
          <div className={`flex w-full max-w-[min(700px,86vw)] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[min(700px,86vw)] ${CENTER_BELOW_MARK}`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>So the visit starts before the provider does.</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                So the intake happens first, on its own. Symptoms and history
                are collected before anyone opens the case — then it&apos;s read,
                diagnosed, prescribed or passed on. No call, no retyping.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 5 — DESKTOP. Figma 4669:14416: centered, 232≈, 183 / 977×681
            The clip governs the box, not the frame: provider-desktop.mp4 is
            1400x1056 (1.3258) against the frame's 977x681 (1.4346), so the
            Figma heights would have letterboxed it against bg-black. Heights
            are the widths at the clip's own aspect — 524/655/786 — with a
            max-height so a short window scales it down rather than letting
            the panel's overflow-hidden clip the bottom. The still fallback
            keeps object-cover, since that asset does match 977x681. */}
        <ScreenPanel width={MEDIA_PANEL}>
          {/* Wrapper carries the placement so the caption can sit under the
              clip and travel with it. On CENTER_BELOW_MARK like the rest of
              the page rather than the old stepped tops (132/146/165), which
              also stops the pair hanging off the bottom on a short window. */}
          <div className={`w-full max-w-[977px] lg:absolute lg:left-1/2 lg:w-[695px] xl:w-[868px] 2xl:w-[1042px] lg:max-w-none lg:-translate-x-1/2 ${CENTER_BELOW_MARK}`}>
          {/* overflow-hidden + rounded on the BOX, not just the video. The
                radius was on the <video> element, but object-contain paints
                the clip inside that element, so the rounded corners were on an
                invisible edge. The box aspect matches the clip exactly, so
                rounding the box rounds what you actually see. */}
            <div className="relative aspect-[1400/1056] w-full overflow-hidden rounded-[10px] lg:aspect-auto lg:h-[524px] xl:h-[655px] 2xl:h-[786px] lg:max-h-[var(--panel-media-max-h)]">
            {desktopVideo ? (
              <AutoplayVideo src={desktopVideo} className="h-full w-full rounded-[10px] object-contain" />
            ) : (
              <Image
                src={`${ASSET}/desktop-app.png`}
                alt="Provider desktop — Patient Queue"
                fill
                sizes="(max-width: 1023px) 92vw, 68vw"
                className="object-cover"
                unoptimized
              />
            )}
          </div>
            <p className={`mt-5 text-center ${CAPTION}`}>
              Provider Portal &ndash; Desktop
            </p>
          </div>
        </ScreenPanel>

        {/* 6 — FOUR PHONES — same treatment as the Netspend "user-test
            phones" panel: grid of individually framed screens, bottom-
            aligned, with a caption below, instead of one flat cropped
            sprite. No drop shadow: the screens are already outlined and the
            shadow only muddied the magenta behind them. */}
        <ScreenPanel width={MEDIA_PANEL}>
          <div className={`mx-auto w-full max-w-[min(1100px,94vw)] lg:absolute lg:left-1/2 lg:w-auto lg:max-w-none lg:-translate-x-1/2 ${CENTER_BELOW_MARK}`}>
            <div className="grid grid-cols-2 items-end justify-items-center gap-4 sm:gap-6 lg:flex lg:flex-nowrap lg:gap-8">
              {PHONE_CROPS.map((phone) => (
                <SlideIn key={phone.alt}>
                  <div
                    className="relative overflow-hidden rounded-xl border border-white/10"
                    style={{ width: phone.width, height: 470, maxWidth: "42vw", maxHeight: "70vw" }}
                  >
                    {/* Sprite crop matches Figma 4553:21877–21880 (not next/image fill). */}
                    <img
                      src={`${ASSET}/phones.png`}
                      alt={`DocSquad provider native app — ${phone.alt}`}
                      className="pointer-events-none absolute max-w-none"
                      style={{
                        height: "107.9%",
                        width: "454.69%",
                        left: phone.left,
                        top: "-4.69%",
                      }}
                    />
                  </div>
                </SlideIn>
              ))}
            </div>
            <p className={`mt-5 text-center ${CAPTION}`}>
              Provider Portal &ndash; Mobile
            </p>
          </div>
        </ScreenPanel>

        {/* 7 — ONE UI, and the icon sheet it introduces. The copy sets up
               the panel that follows it now: the design-system point was
               there, but nothing said Molly drew the icons, so beat 8
               arrived as a sheet of shapes with only a caption to explain
               it. */}
        <ScreenPanel width={COPY_PANEL}>
          <div className={`flex w-full max-w-[min(700px,86vw)] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[min(700px,86vw)] ${CENTER_BELOW_MARK}`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>One interface, web and native.</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                I rebuilt the design system with the flow, and engineering
                shipped it in Flutter — one interface to desktop, iOS and
                Android. I drew the icon and illustration set that came with
                it, for the provider app and the patient app both.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 8 — ICONS. Figma 4553:21899: 360,240 / 720×519 r10 */}
        <ScreenPanel width={MEDIA_PANEL}>
          {/* Wrapper carries the placement so the caption travels with the
                 grid. On CENTER_BELOW_MARK like every other block on this
                 page — it used to carry its own nav-clear/6 offset, a one-off
                 tuned before the shared rule existed, which put it 26px above
                 where the text sections and the phones sit. */}
          <div className={`w-full max-w-[720px] lg:absolute lg:left-[256px] xl:left-[320px] 2xl:left-[384px] lg:w-[598px] xl:w-[746px] 2xl:w-[896px] lg:max-w-none ${CENTER_BELOW_MARK}`}>
            <div className="relative aspect-[720/519] w-full overflow-hidden rounded-[10px] lg:aspect-auto lg:h-[437px] xl:h-[484px] 2xl:h-[545px]">
              <Image
                src={`${ASSET}/icons.png`}
                alt="Custom illustration and icon set for the DocSquad design system"
                fill
                sizes="(max-width: 1023px) 90vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <p className={`mt-5 text-center ${CAPTION}`}>
              The set, drawn for both apps.
            </p>
          </div>
        </ScreenPanel>

        {/* 8.5 — THE PATIENT SIDE. The dashboard panel that follows had no
               copy in front of it, so the one part of this work that isn't
               Molly's own drawing — mentoring the designer who owned the
               patient app — went unsaid. Same block shape as beat 7. */}
        <ScreenPanel width={COPY_PANEL}>
          <div className={`flex w-full max-w-[min(700px,86vw)] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[min(700px,86vw)] ${CENTER_BELOW_MARK}`}>
            <SlideIn>
              <h2 className={H_DISPLAY}>The patient side had to match.</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                Another designer owned the patient app. I mentored them
                through it — reviewing the work and holding it to the
                provider app&rsquo;s patterns — so a visit felt like the same
                product from either end.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 9 — INTERVIEW + DASHBOARD. Figma 4669:14424: 260,180 / 920×683 */}
        <ScreenPanel width={MEDIA_PANEL}>
          {/* Aspect-driven, width-capped — no explicit height.
              It had a stepped height AND a max-height, which is the crop: the
              moment the cap bit, the height shrank while the width stayed at
              654/818/981, so the box went wider than the artwork's 1.308 and
              object-cover ate the top and bottom. Letting the aspect set the
              height means the box can never disagree with the asset, and the
              width is what gets capped instead — by the room available times
              that aspect. object-contain as the belt, so any future mismatch
              letterboxes rather than crops. */}
          <div className="relative mx-auto aspect-[921/704] w-full max-w-[921px] lg:absolute lg:left-[185px] xl:left-[231px] 2xl:left-[277px] lg:top-[130px] xl:top-[144px] 2xl:top-[162px] lg:mx-0 lg:w-[654px] xl:w-[818px] 2xl:w-[981px] lg:max-w-[calc(var(--panel-media-max-h)_*_1.3082)]">
            <Image
              src={`${ASSET}/interview-dashboard.png`}
              alt="Patient interview overlapping the logged-in DocSquad dashboard"
              fill
              sizes="(max-width: 1023px) 92vw, 64vw"
              className="object-contain"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 10 — PORTRAIT. Figma 4622:11969 is 950×1000.
            Circle on the shared portrait size — min(24vw,320px), the same as
            Bright's and GovOS's — and centred on CENTER_BELOW_MARK, which is
            where the Outcome copy beside it centres, so the two line up
            instead of the circle sitting 30px lower. The panel narrows with
            it: 26rem leaves 48px either side of a 320 circle, where 34rem
            around a 472 one pushed the Outcome copy further away again. */}
        <ScreenPanel width="lg:w-[min(100vw,26rem)]">
          <div /* No lg:w-[...] alongside lg:size-[...]: both are lg utilities of
                 equal specificity, and w-* won in the bundle, so the box came
                 out wider than it was tall — an ellipse under rounded-full.
                 size-* alone keeps it square. */
              className={`relative aspect-square w-[220px] sm:w-[280px] overflow-hidden rounded-full lg:absolute lg:left-1/2 lg:size-[min(24vw,320px)] lg:-translate-x-1/2 ${CENTER_BELOW_MARK}`}>
            <Image
              src={`${ASSET}/portrait.png`}
              alt="A virtual moonlighter clinician"
              fill
              sizes="(min-width: 1024px) 320px, 280px"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 11 — OUTCOME. Figma node 4672:15331 — left-aligned heading + copy,
            then three stacked stat columns (hero number, uppercase kicker,
            delta + down triangle, detail line), all in white on the brand
            magenta. Replaces the earlier circle-badge treatment, which
            didn't match the Figma reference. */}
        <ScreenPanel>
          <div className={`flex w-full max-w-[950px] flex-col items-start gap-10 pt-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[676px] xl:w-[844px] 2xl:w-[1013px] lg:max-w-none lg:gap-14 lg:pt-0 ${CENTER_BELOW_MARK}`}>
            <div className="flex flex-col gap-4">
              <SlideIn>
                <h2 className={H_DISPLAY}>Outcome</h2>
              </SlideIn>
              <SlideIn delay={80}>
                <div className="flex flex-col gap-4">
                  {(project.outcome ?? "").split("\n\n").map((para) => (
                    <p key={para.slice(0, 24)} className={BODY}>
                      {para}
                    </p>
                  ))}
                </div>
              </SlideIn>
            </div>

            <SlideIn delay={160}>
              <div className="flex w-full flex-col gap-10 sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-10">
                {OUTCOME_STATS.map((stat) => (
                  <div key={stat.kicker} className="flex flex-col items-start gap-1 text-white">
                    <p className="text-[clamp(2rem,4.5vw,4.05rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em]">
                      {stat.hero}
                    </p>
                    <p className="text-[clamp(1.05rem,1.25vw,1.25rem)] font-semibold uppercase tracking-[0.06em]">
                      {stat.kicker}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-[clamp(1.9rem,2.4vw,2.6rem)] font-semibold leading-[1.1]">
                      {stat.delta}
                      <img
                        src={`${ASSET}/down-triangle-green.svg`}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0 rotate-180 brightness-0 invert"
                      />
                    </p>
                    <p className="text-[clamp(1.05rem,1.25vw,1.25rem)] font-normal">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </ScreenPanel>

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText showProjected={false} />

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
