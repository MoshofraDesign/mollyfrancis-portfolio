import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import AutoplayVideo from "@/components/AutoplayVideo";
import { Panel, TextPanel, NextProjectLink, CaseStudyMetaPanel, INTRO_TITLE, INTRO_SUBTEXT, META_LABEL, CAPTION, HERO_ROW, HERO_ROW_COPY, HERO_INSET_MD, HERO_TITLE} from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "Patient Portal — athenahealth — Molly Francis",
  description:
    "Re-architected athenahealth's 25M-patient portal around what people actually do — a consolidated dashboard and a responsive nav that finally works on a phone.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#4800b5";
const LOGO = "/logos/athenahealth.svg";
const ASSET = "/work/athenahealth";
const VIEW = "lg:w-screen";
/** Only ever wraps the Usage / Time saved / Users grid on this page, so it
 *  stays at the wider row width rather than the kit's 700 prose measure. */
const MEASURE = "w-full max-w-[min(54rem,86vw)]";
const MEDIA = "w-full max-w-[min(950px,90vw)]";

const H_DISPLAY =
  "font-semibold leading-[1.1] tracking-[-0.02em] text-white text-[2rem] sm:text-[2rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.6rem] 2xl:text-[4.05rem] [text-wrap:pretty]";
const BODY_CAPTION = `mt-3 ${CAPTION}`;

function StoryImage({
  src,
  alt,
  aspect,
  caption,
  contain = false,
  mediaWidth = MEDIA,
}: {
  src: string;
  alt: string;
  aspect: string;
  caption: string;
  contain?: boolean;
  mediaWidth?: string;
}) {
  return (
    <Panel width={VIEW} pad="center">
      <div className={`${mediaWidth} mx-auto`}>
        <SlideIn>
          <div
            className={`relative w-full ${aspect} ${
              contain ? "" : "overflow-hidden rounded-[10px] bg-black/20"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              sizes="90vw"
              className={contain ? "object-contain object-left" : "object-cover object-top"}
            />
          </div>
        </SlideIn>
        <SlideIn delay={100}>
          <p className={`${BODY_CAPTION} mt-4 text-center`}>{caption}</p>
        </SlideIn>
      </div>
    </Panel>
  );
}

export default function ConsumerHealthCaseStudy() {
  const idx = projects.findIndex((p) => p.slug === "athenahealth");
  const project = projects[idx];
  const next = projects.find((p) => p.slug === "volusion-admin")!;
  const meta = getCaseStudyMeta(project);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: "#ffffff", fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-8 w-[200px] sm:h-9 sm:w-[240px]">
            <Image src={LOGO} alt="athenahealth" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={<CloseLink large className="text-white" />}
      />

      <HorizontalScroll>
        {/* Title */}
        <section
          id="title"
          className={`relative flex w-full min-w-0 flex-col gap-8 overflow-x-hidden px-6 pb-12 pt-24 sm:px-10 sm:pt-28 ${HERO_INSET_MD} lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0`}
        >
          {/* Mark + "Patient Portal" are one wrapping row from tablet up —
              see HERO_ROW. The mark is capped at md so the label has room to
              sit beside it, as it does at lg. */}
          <div className={HERO_ROW}>
          <div className="relative z-10 aspect-[740/104] w-[min(100%,740px)] shrink-0 md:w-[min(100%,420px)] lg:absolute lg:left-[50px] lg:top-[50px] lg:h-[83px] lg:w-[658px] lg:max-w-none lg:aspect-auto">
            <Image src={LOGO} alt="athenahealth" fill unoptimized priority className="object-contain object-left" />
          </div>

          <p className={`relative z-10 text-white ${HERO_TITLE} md:shrink-0 lg:absolute lg:left-[740px] lg:top-[50px] lg:flex lg:h-[83px] lg:items-center`}>
            Patient Portal
          </p>
          </div>

          {/* Centred rather than pinned to the 100px rail. Left-anchored it sat
              105px from the left edge and 215px from the right at 1400 —
              visibly left-heavy, since the artwork is narrower than the
              rail-to-rail span it was drawn for. */}
          <div className="relative z-0 mx-auto w-full max-w-[min(92vw,1038px)] lg:absolute lg:left-1/2 lg:top-[228px] xl:top-[252px] 2xl:top-[284px] lg:mx-0 lg:w-[843px] xl:w-[1054px] 2xl:w-[1265px] lg:max-w-[calc((100dvh_-_252px)_*_1.6796)] xl:max-w-[calc((100dvh_-_276px)_*_1.6796)] 2xl:max-w-[calc((100dvh_-_308px)_*_1.6796)] lg:-translate-x-1/2">
            <Image
              src={`${ASSET}/hero.png`}
              alt="Redesigned patient portal dashboard on desktop and mobile"
              width={2076}
              height={1236}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* 25 million patients... */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={`text-white ${INTRO_TITLE}`}>25 million patients opened the portal and landed on Test Results.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={`text-white/90 ${INTRO_SUBTEXT}`}>Appointments, meds, billing — all there, none of it findable. Especially on a phone.</p>
          </SlideIn>
        </TextPanel>

        <StoryImage
          src={`${ASSET}/landing-before.png`}
          alt="Legacy My Health page — Test Results only"
          aspect="aspect-[950/659]"
          caption="This was home."
          contain
        />

        {/* So I made a real landing */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>So I made a real landing page and health overview page.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={BODY_CAPTION}>One dashboard. What matters up top. A clear path to everything else.</p>
          </SlideIn>
        </TextPanel>

        <Panel width={VIEW} pad="center">
          {/* Height-capped, not just aspect-boxed. The wrapper was MEDIA
              (max 950/90vw) with the clip in a plain aspect-[1544/1096]
              box, so on a short window the box computed taller than the
              panel and the rounded container clipped the clip top and
              bottom instead of scaling it. Capping the WIDTH by the room
              available — panel-media-max-h less the caption block, times
              the clip's own 1.4088 aspect — makes the whole thing shrink
              together. Same pattern as Care.com's video panel. `panel-media`
              is off this wrapper on purpose: its `video { width: auto }`
              rule fights the fill inside an aspect box. */}
          <div className="mx-auto w-full max-w-[min(950px,90vw,calc((var(--panel-media-max-h)_-_3.5rem)_*_1.4088))]">
            <SlideIn>
              <div className="relative w-full aspect-[1544/1096] overflow-hidden rounded-[10px] bg-black/20">
                <AutoplayVideo
                  sources={[
                    { src: "/work/athenahealth/videos/landing-after.mov", type: "video/quicktime" },
                    { src: "/work/athenahealth/videos/landing-after.mp4", type: "video/mp4" },
                  ]}
                  className="h-full w-full object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={100}>
              <p className={`mt-4 text-center ${CAPTION}`}>
                My Health Landing – After
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* The nav had the same hole */}
        <TextPanel width={VIEW}>
          <SlideIn>
            <h2 className={H_DISPLAY}>The nav had the same hole.</h2>
          </SlideIn>
          <SlideIn delay={100}>
            <p className={BODY_CAPTION}>People couldn&apos;t find things. Card sorts had no consensus. It had to work on a phone.</p>
          </SlideIn>
        </TextPanel>

        <StoryImage
          src={`${ASSET}/nav-before.png`}
          alt="Legacy patient portal navigation"
          aspect="aspect-[964/373]"
          caption="Seven links. No small-screen version."
        />

        {/* Cut the repeats. Make it respond. */}
        <Panel width={VIEW} pad="center">
          <div className="w-full max-w-[min(72rem,92vw)] mx-auto">
            <SlideIn>
              <h2 className={`mb-6 ${H_DISPLAY.replace("text-[2rem] sm:text-[2rem] md:text-[2.16rem] lg:text-[2.88rem] xl:text-[3.6rem] 2xl:text-[4.05rem]", "text-[1.5rem] sm:text-[1.5rem] md:text-[1.536rem] lg:text-[2.048rem] xl:text-[2.56rem] 2xl:text-[2.65rem]")}`}>
                Cut the repeats. Make it respond.
              </h2>
            </SlideIn>
            <SlideIn delay={80}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="relative w-full aspect-[1620/674] sm:w-[58%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${ASSET}/nav-after.png`}
                    alt="Desktop navigation — dropdown menus"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="relative w-full aspect-[1132/1000] sm:w-[38%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${ASSET}/nav-after-mobile.png`}
                    alt="Mobile navigation drawer — account panel and main menu"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </SlideIn>
            <SlideIn delay={140}>
              <p className={`${BODY_CAPTION} mt-4 text-center`}>Same structure on desktop and phone.</p>
            </SlideIn>
          </div>
        </Panel>

        {/* Portrait breather — ahead of the figures, on its own narrow panel
            so the two read as a pair rather than a screen apart. VIEW gave
            it a full viewport and centred a 472 circle in it, which put the
            numbers a whole screen away; 30rem leaves 40px either side of a
            400 circle, the same shape as DocSquad's portrait panel. */}
        <Panel width="lg:w-[min(100vw,30rem)]" pad="center" className="items-center">
          <div className="relative mx-auto aspect-square w-[240px] sm:w-[340px] md:w-[400px] lg:w-[min(26vw,400px)] overflow-hidden rounded-full">
            <Image
              src={`${ASSET}/portrait.png`}
              alt="A patient using the portal from home"
              fill
              unoptimized
              sizes="400px"
              className="object-cover"
            />
          </div>
        </Panel>

        {/* Outcome stats — left-railed rather than centred in the panel, so
            the first column begins just past the portrait instead of half a
            screen further on. */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mr-auto`}>
            <SlideIn>
              <div className="grid gap-10 sm:grid-cols-3 sm:gap-x-14 lg:gap-x-20">
                <div>
                  <h2 className={META_LABEL}>
                    Usage
                  </h2>
                  <p className="mt-1.5 text-[1.75rem] sm:text-[1.75rem] md:text-[1.75rem] lg:text-[1.92rem] xl:text-[2.35rem] 2xl:text-[2.35rem] font-semibold leading-[1.1] tracking-[-0.03em]">
                    25M patients
                  </p>
                  <p className="mt-1 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.95rem] 2xl:text-[1.05rem] leading-[1.45] text-white/55">
                    Registered on the portal
                  </p>
                </div>

                <div>
                  <h2 className={META_LABEL}>
                    Time saved
                  </h2>
                  <p className="mt-1.5 text-[1.75rem] sm:text-[1.75rem] md:text-[1.75rem] lg:text-[1.92rem] xl:text-[2.35rem] 2xl:text-[2.35rem] font-semibold leading-[1.1] tracking-[-0.03em]">
                    40% faster
                  </p>
                  <p className="mt-1 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.95rem] 2xl:text-[1.05rem] leading-[1.45] text-white/55">
                    Time to find appointments, meds, and billing
                  </p>
                  <p className="mt-5 text-[1.75rem] sm:text-[1.75rem] md:text-[1.75rem] lg:text-[1.92rem] xl:text-[2.35rem] 2xl:text-[2.35rem] font-semibold leading-[1.1] tracking-[-0.03em]">
                    2 taps
                  </p>
                  <p className="mt-1 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.95rem] 2xl:text-[1.05rem] leading-[1.45] text-white/55">
                    From landing to the next action on a phone
                  </p>
                </div>

                <div>
                  {/* "Support" rather than "Users": with the 2.1x completion
                      figure gone, the one figure left in this column is a
                      support-contact number. */}
                  <h2 className={META_LABEL}>
                    Support
                  </h2>
                  <p className="mt-1.5 text-[1.75rem] sm:text-[1.75rem] md:text-[1.75rem] lg:text-[1.92rem] xl:text-[2.35rem] 2xl:text-[2.35rem] font-semibold leading-[1.1] tracking-[-0.03em]">
                    28% fewer tickets
                  </p>
                  <p className="mt-1 text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[0.95rem] 2xl:text-[1.05rem] leading-[1.45] text-white/55">
                    &ldquo;Where is my...&rdquo; support contacts
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </Panel>

        <CaseStudyMetaPanel meta={getCaseStudyMeta(project)} lightText={false} showProjected={false} />

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
