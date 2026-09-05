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
import { NextProjectLink, CaseStudyMetaPanel, INTRO_TITLE, INTRO_SUBTEXT} from "@/components/v2/CaseStudyKit";

/**
 * DocSquad — Figma deck (Portfolio › 4553:21862), left to right:
 * Title → Problem → Research → Patient Queue → 4 phones → icons →
 * interview+dashboard → 950px portrait → Outcome.
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
const H_DISPLAY =
  "font-semibold leading-[1.17] text-white text-[2rem] sm:text-[2.25rem] md:text-[2.7rem] lg:text-[3.6rem] xl:text-[4.5rem] 2xl:text-[5.062rem] lg:leading-[95px] [text-wrap:pretty]";
/** Figma Paragraph: Jost Regular 32, 16px under the heading. */
const BODY =
  "text-[1.05rem] sm:text-[1.05rem] md:text-[1.066rem] lg:text-[1.421rem] xl:text-[1.776rem] 2xl:text-[2rem] font-normal leading-normal text-white [text-wrap:pretty]";

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
          <div className="relative z-10 aspect-[842/112] w-[min(100%,842px)] lg:absolute lg:left-[100px] lg:top-[100px] lg:h-[80px] xl:h-[89px] 2xl:h-[101px] lg:w-[599px] xl:w-[748px] 2xl:w-[898px] lg:max-w-none lg:aspect-auto">
            <Image
              src={LOGO}
              alt="DocSquad"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>

          <SlideIn className="relative z-10 flex max-w-[308px] flex-col gap-2 text-white lg:absolute lg:bottom-[74px] xl:bottom-[82px] 2xl:bottom-[93px] lg:left-[100px] lg:h-[150px] xl:h-[166px] 2xl:h-[187px] lg:max-w-[219px] xl:max-w-[274px] 2xl:max-w-[329px] lg:justify-end">
            <p className="text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.6rem] xl:text-[2rem] 2xl:text-[2.25rem] font-semibold leading-[1.28]">
              Virtual Care Telehealth App
            </p>
            <p className="text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1rem] 2xl:text-[1.125rem] font-normal leading-normal">
              Provider Desktop And Native Apps For Doctors, Nurses And Staff To Diagnosis Patients With Asynchronous And Synchronous Visits.
            </p>
          </SlideIn>

          {/* Heights are the widths at hero.png's own 1.6841 aspect (Figma's
              891x529 is the same ratio), because the stepped pairs had
              drifted off it: 634x381 is 1.664, but 792x423 is 1.873 and
              950x476 is 1.996 — so at xl and 2xl the box was far wider than
              the artwork and object-cover ate the top and bottom of the
              laptop. object-contain as well, so any residual mismatch
              letterboxes rather than crops, and a max-height so a short
              window scales the whole thing down instead of letting the
              panel's overflow-hidden clip its bottom. */}
          <div className="relative z-0 mx-auto aspect-[891/529] w-full max-w-[min(92vw,891px)] lg:absolute lg:left-[341px] xl:left-[426px] 2xl:left-[511px] lg:top-[251px] xl:top-[279px] 2xl:top-[314px] lg:mx-0 lg:h-[376px] xl:h-[470px] 2xl:h-[564px] lg:max-h-[var(--panel-media-max-h)] lg:w-[634px] xl:w-[792px] 2xl:w-[950px] lg:max-w-none lg:aspect-auto">
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

        {/* 2 — PROBLEM. Figma 4553:21871: 100,296 / 999×409, gap 16
            Centred in the field below the parked mark, not on the panel.
            This block used to pair a fixed height (294/327/368) with
            justify-end inside a box centred at top-1/2 — so the copy hung
            from the box's BOTTOM edge and, being taller than the box (nine
            lines against 294px), grew upward out of it. The result sat
            almost entirely above the panel's middle. Height and justify-end
            are gone; the offset is half the nav band, so the block's centre
            lands midway between the bottom of the mark and the bottom of the
            panel. Reading it from the tokens means it follows if the park
            inset moves again. */}
        <ScreenPanel className="!pt-16">
          <div className="flex w-full max-w-[999px] flex-col gap-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:top-[calc(50%_+_(var(--nav-park-top)_+_var(--nav-logo-h))/2)] lg:w-[710px] xl:w-[888px] 2xl:w-[1066px] lg:max-w-none lg:-translate-y-1/2">
            <SlideIn>
              <h2 className={`text-white ${INTRO_TITLE}`}>Problem</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={`text-white/90 ${INTRO_SUBTEXT}`}>
                Healthcare providers are overwhelmed—juggling back-to-back appointments,
                redundant data entry, and clunky telehealth tools that add friction instead
                of removing it. Meanwhile, patients face long wait times for issues that
                could be resolved in minutes. The core challenge: How might we reduce the
                clinical burden of virtual visits so providers can diagnose and treat
                patients in under two minutes—without sacrificing quality of care?
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 3 — RESEARCH. Figma 4553:21883: 100,237 / 950×525, gap 16 */}
        <ScreenPanel>
          <div className="flex w-full max-w-[950px] flex-col gap-4 lg:absolute lg:bottom-[171px] xl:bottom-[190px] 2xl:bottom-[214px] lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[676px] xl:w-[844px] 2xl:w-[1013px] lg:max-w-none lg:justify-end">
            <SlideIn>
              <h2 className={H_DISPLAY}>Research</h2>
            </SlideIn>
            <SlideIn delay={80}>
              <p className={BODY}>
                Providers are already stretched thin with packed schedules and tedious EHR
                entries. They don&apos;t need another platform that adds to their workload —
                they need technology that lightens it.
              </p>
              <p className={`mt-8 ${BODY}`}>
                By collecting symptoms upfront through asynchronous intelligent interviews,
                providers can diagnose and recommend treatment in as little as two minutes —
                no video call, no extra data entry. It&apos;s a faster, smarter model of care
                that reduces burden without compromising quality.
              </p>
            </SlideIn>
          </div>
        </ScreenPanel>

        {/* 4 — DESKTOP. Figma 4669:14416: centered, 232≈, 183 / 977×681
            The clip governs the box, not the frame: provider-desktop.mp4 is
            1400x1056 (1.3258) against the frame's 977x681 (1.4346), so the
            Figma heights would have letterboxed it against bg-black. Heights
            are the widths at the clip's own aspect — 524/655/786 — with a
            max-height so a short window scales it down rather than letting
            the panel's overflow-hidden clip the bottom. The still fallback
            keeps object-cover, since that asset does match 977x681. */}
        <ScreenPanel>
          <div className="relative aspect-[1400/1056] w-full max-w-[977px] lg:absolute lg:left-1/2 lg:top-[132px] xl:top-[146px] 2xl:top-[165px] lg:w-[695px] xl:w-[868px] 2xl:w-[1042px] lg:max-w-none lg:-translate-x-1/2 lg:aspect-auto lg:h-[524px] xl:h-[655px] 2xl:h-[786px] lg:max-h-[var(--panel-media-max-h)]">
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
        </ScreenPanel>

        {/* 5 — FOUR PHONES — same treatment as the Netspend "user-test
            phones" panel: grid of individually framed screens, bottom-
            aligned, with a caption below, instead of one flat cropped
            sprite. No drop shadow: the screens are already outlined and the
            shadow only muddied the magenta behind them. */}
        <ScreenPanel>
          <div className="mx-auto w-full max-w-[min(1100px,94vw)] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
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
            <p className="mt-5 text-center text-[clamp(1rem,1.2vw,1.2rem)] font-medium text-white">
              Provider App
            </p>
          </div>
        </ScreenPanel>

        {/* 6 — ICONS. Figma 4553:21899: 360,240 / 720×519 r10 */}
        <ScreenPanel>
          <div /* Centred in the space below the parked mark rather than pinned to a
                 fixed top: at 1440 the old top of 192 left it 3px under the
                 mark with 293px of empty field beneath. top-1/2 plus half the
                 nav band splits that space evenly. A step larger too. */
              className="relative aspect-[720/519] w-full max-w-[720px] overflow-hidden rounded-[10px] lg:absolute lg:left-[256px] xl:left-[320px] 2xl:left-[384px] lg:top-[calc(50%_+_var(--nav-clear)/6)] lg:h-[437px] xl:h-[484px] 2xl:h-[545px] lg:w-[598px] xl:w-[746px] 2xl:w-[896px] lg:max-w-none lg:aspect-auto lg:-translate-y-1/2">
            <Image
              src={`${ASSET}/icons.png`}
              alt="Custom illustration and icon set for the DocSquad design system"
              fill
              sizes="(max-width: 1023px) 90vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 7 — INTERVIEW + DASHBOARD. Figma 4669:14424: 260,180 / 920×683 */}
        <ScreenPanel>
          <div className="relative mx-auto aspect-[920/683] w-full max-w-[920px] lg:absolute lg:left-[185px] xl:left-[231px] 2xl:left-[277px] lg:top-[130px] xl:top-[144px] 2xl:top-[162px] lg:mx-0 lg:h-[492px] xl:h-[546px] 2xl:h-[615px] lg:w-[654px] xl:w-[818px] 2xl:w-[981px] lg:max-w-none lg:aspect-auto">
            <Image
              src={`${ASSET}/interview-dashboard.png`}
              alt="Patient interview overlapping the logged-in DocSquad dashboard"
              fill
              sizes="(max-width: 1023px) 92vw, 64vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 8 — PORTRAIT. Figma 4622:11969 is 950×1000; circle 600 at center, top 50%+20
            34rem, not 44: the circle caps at 472 and is centred, so a 704
            panel left 116px of empty field either side of it — and the
            Outcome copy that follows starts 71px into its own panel, so the
            visible gap between the portrait and "Outcome" was 187px. At 544
            it's 107. */}
        <ScreenPanel width="lg:w-[min(100vw,34rem)]">
          <div /* No lg:w-[600px] alongside lg:size-[...]: both are lg utilities of
                 equal specificity, and w-* won in the bundle, so the box came
                 out 600 wide by 567 tall — an ellipse under rounded-full.
                 size-* alone keeps it square. */
              className="relative aspect-square w-[260px] sm:w-[400px] md:w-[472px] overflow-hidden rounded-full lg:absolute lg:left-1/2 lg:top-[calc(50%+20px)] lg:size-[min(31vw,472px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Image
              src={`${ASSET}/portrait.png`}
              alt="A virtual moonlighter clinician"
              fill
              sizes="600px"
              className="object-cover"
              unoptimized
            />
          </div>
        </ScreenPanel>

        {/* 9 — OUTCOME. Figma node 4672:15331 — left-aligned heading + copy,
            then three stacked stat columns (hero number, uppercase kicker,
            delta + down triangle, detail line), all in white on the brand
            magenta. Replaces the earlier circle-badge treatment, which
            didn't match the Figma reference. */}
        <ScreenPanel>
          <div className="flex w-full max-w-[950px] flex-col items-start gap-10 pt-4 lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:top-1/2 lg:w-[676px] xl:w-[844px] 2xl:w-[1013px] lg:max-w-none lg:-translate-y-1/2 lg:gap-14 lg:pt-0">
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
                    <p className="text-[2.75rem] sm:text-[2.75rem] md:text-[2.75rem] lg:text-[3.52rem] xl:text-[4.4rem] 2xl:text-[5.062rem] font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
                      {stat.hero}
                    </p>
                    <p className="text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1.12rem] 2xl:text-[1.25rem] font-semibold uppercase tracking-[0.06em]">
                      {stat.kicker}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.664rem] xl:text-[2.08rem] 2xl:text-[2.25rem] font-semibold leading-none">
                      {stat.delta}
                      <img
                        src={`${ASSET}/down-triangle-green.svg`}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0 rotate-180 brightness-0 invert"
                      />
                    </p>
                    <p className="text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1.12rem] 2xl:text-[1.25rem] font-normal">
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
