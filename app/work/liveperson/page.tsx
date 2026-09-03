import Image from "next/image";
import { Jost } from "next/font/google";
import { projects, getProject, getCaseStudyMeta } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body, VIEW, MEASURE, MEDIA, NextProjectLink, CaseStudyMetaPanel } from "@/components/v2/CaseStudyKit";

/**
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
  { label: "Overall Customer Satisfaction (CSAT)", value: "4.5-point lift" },
];

/** Two images side by side, full-bleed panel — matches the Figma pairings. */
/**
 * Two images side by side, each rendered at its own natural aspect ratio
 * (no forced crop box) — width/height should match the source file's real
 * dimensions so Next/Image can reserve the right proportions and the image
 * scales down via w-full/h-auto without ever cropping content.
 */
function TwoImagePanel({
  a,
  b,
}: {
  a: { src: string; alt: string; width: number; height: number };
  b: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <div className={`mx-auto grid w-full max-w-[min(1400px,94vw)] grid-cols-1 items-center gap-8 sm:grid-cols-2`}>
        <SlideIn className="flex justify-center">
          <Image
            src={a.src}
            alt={a.alt}
            width={a.width}
            height={a.height}
            sizes="(max-width: 640px) 92vw, 46vw"
            className="h-auto max-h-[506px] sm:max-h-[540px] md:max-h-[614px] lg:max-h-[432px] xl:max-h-[480px] 2xl:max-h-[540px] w-full rounded-md object-contain"
          />
        </SlideIn>
        <SlideIn delay={100} className="flex justify-center">
          <Image
            src={b.src}
            alt={b.alt}
            width={b.width}
            height={b.height}
            sizes="(max-width: 640px) 92vw, 46vw"
            className="h-auto max-h-[506px] sm:max-h-[540px] md:max-h-[614px] lg:max-h-[432px] xl:max-h-[480px] 2xl:max-h-[540px] w-full rounded-md object-contain"
          />
        </SlideIn>
      </div>
    </Panel>
  );
}

/** One large image, centered, at its natural aspect ratio — no cropping. */
function BigImagePanel({
  src,
  alt,
  width,
  height,
  caption,
  maxWidth = 950,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  maxWidth?: number;
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
          className="h-auto max-h-[591px] sm:max-h-[630px] md:max-h-[717px] lg:max-h-[504px] xl:max-h-[560px] 2xl:max-h-[630px] w-full rounded-md object-contain"
        />
        {caption && <p className="mt-4 max-w-[70ch] text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1.05rem] opacity-80">{caption}</p>}
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
          <div className="relative h-6 w-[110px] sm:h-7 sm:w-[130px]">
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
          className="relative flex w-full flex-col gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:pt-0"
        >
          {/* Logo — Figma: 100,100, 668×106 */}
          <div className="relative h-10 w-[220px] sm:h-14 sm:w-[300px] lg:absolute lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:top-[71px] xl:top-[89px] 2xl:top-[107px] lg:h-[75px] xl:h-[94px] 2xl:h-[113px] lg:w-[475px] xl:w-[594px] 2xl:w-[713px] lg:max-w-[668px]">
            <Image src={LOGO} alt="LivePerson" fill unoptimized priority className="object-contain object-left" />
          </div>

          {/* Heading — Figma: 890,107, 417 wide, top-right */}
          <p className="max-w-[300px] text-lg font-semibold sm:text-xl lg:absolute lg:right-[71px] xl:right-[89px] 2xl:right-[107px] lg:top-[76px] xl:top-[95px] 2xl:top-[114px] lg:max-w-[297px] xl:max-w-[371px] 2xl:max-w-[445px] lg:text-[24px] xl:text-[29px] 2xl:text-[35px] lg:leading-[1.25]">
            Social Media Management Product
          </p>

          <div className="mt-8 flex flex-1 items-end gap-4 sm:gap-8 lg:mt-0 lg:block lg:h-full">
            {/* Phone mock — Figma: 100,360, 640×640, flush to the frame's
                bottom edge (no gap below it at all). */}
            <SlideIn className="w-[48%] max-w-[380px] shrink-0 self-end lg:absolute lg:bottom-0 lg:left-[71px] xl:left-[89px] 2xl:left-[107px] lg:w-[455px] xl:w-[568px] 2xl:w-[682px] lg:max-w-[640px]">
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

        {/* ── SOCIAL MEDIA MANAGEMENT ──────────────────────────────────── */}
        <TextPanel>
          <Heading>Social Media Management</Heading>
          <Body>
            To streamline LivePerson&rsquo;s omnichannel support, I redesigned
            the LivePerson SocialConnect agent workspace to unify disparate
            public and private social threads into a single, cohesive
            interface. By implementing contextual post previews, intuitive
            automated routing indicators, and clear threading for
            asynchronous conversations, the new design significantly reduced
            agent cognitive load.
          </Body>
        </TextPanel>

        {/* ── PUBLIC TWEET / PRIVATE THREAD ────────────────────────────── */}
        <BigImagePanel
          src="/work/liveperson/public-tweet-private-thread.png"
          alt="A public tweet on Twitter routed into the LiveEngage agent workspace, with the full private thread and social profile alongside it"
          width={1024}
          height={415}
          maxWidth={950}
        />

        {/* ── SINGLE PLATFORM ───────────────────────────────────────────── */}
        <TextPanel>
          <Heading>
            Connecting those channels to a single conversation management
            platform
          </Heading>
          <Body>
            Most brands support customer inquiries across a variety of
            channels — emails, tweets, DMs, chats, posts, texts — but have to
            use multiple services and dashboards to manage everything. By
            connecting those channels to a single conversation management
            platform, brands can dramatically increase agent efficiency and
            ensure they have access to standardized content and reporting.
          </Body>
        </TextPanel>

        {/* ── AGENT WORKSPACE + ALL CHANNELS ───────────────────────────── */}
        <TwoImagePanel
          a={{
            src: "/work/liveperson/agent-workspace-social-queue.png",
            alt: "Agent workspace — every social thread lands in one queue, alongside the profile behind it",
            width: 1280,
            height: 1125,
          }}
          b={{
            src: "/work/liveperson/all-channels-unified.png",
            alt: "One surface for every channel — Facebook, Instagram, X, WhatsApp, SMS, and more",
            width: 1206,
            height: 915,
          }}
        />

        {/* ── SOCIALCONNECT — SELF-SERVICE SETUP ───────────────────────── */}
        <TextPanel>
          <Heading>SocialConnect</Heading>
          <Body>
            Allows agents to connect social accounts that would be active in
            the LiveEngage portal, with the options to assign to admin and
            specific agents. Includes adding media content and
            keywords/hashtags for agents to use in the social transcript when
            replying to public and private messages.
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
          caption="Future Vision: Integrate the SocialConnect feature into the entire LiveEngage experience."
          width={1280}
          height={760}
        />

        {/* ── IMPACT ────────────────────────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`${MEASURE} mx-auto`}>
            <Heading>Impact</Heading>
            <div className="mt-10 w-full space-y-8">
              {metrics.map((m, i) => (
                <SlideIn key={m.label} delay={120 + i * 90}>
                  <p className="text-[0.9rem] sm:text-[0.9rem] md:text-[0.9rem] lg:text-[0.9rem] xl:text-[0.9rem] 2xl:text-[1rem] font-medium opacity-80">{m.label}</p>
                  <p className="mt-1 text-[1.75rem] sm:text-[1.75rem] md:text-[1.92rem] lg:text-[2.56rem] xl:text-[2.75rem] 2xl:text-[2.75rem] font-semibold leading-tight">
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
