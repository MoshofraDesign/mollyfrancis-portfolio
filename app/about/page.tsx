import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import Logo from "@/components/Logo";
import { TEXT_W, MEASURE, VIEW, GUTTER, Eyebrow, Panel, TextPanel, Heading, Body } from "@/components/v2/CaseStudyKit";

export const metadata = {
  title: "About — Molly Francis",
  description:
    "Lead / Principal UX Product Designer in Austin, TX. ENFP, big ideas, twenty years of design — plus cats, a dog, BigFoot, and a small mountain of collections.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jost",
  display: "swap",
});

const traits = [
  {
    letter: "E",
    word: "Extraverted",
    href: "https://www.16personalities.com/articles/energy-introverted-vs-extraverted",
  },
  {
    letter: "N",
    word: "Intuitive",
    href: "https://www.16personalities.com/articles/mind-intuitive-vs-observant",
  },
  {
    letter: "F",
    word: "Feeling",
    href: "https://www.16personalities.com/articles/nature-thinking-vs-feeling",
  },
  {
    letter: "P",
    word: "Prospecting",
    href: "https://www.16personalities.com/articles/tactics-judging-vs-prospecting",
  },
];

const principles = [
  {
    t: "Lead with research, ship with conviction.",
    b: "Evidence sets the direction. Once we've heard the user, the team commits — no second-guessing the obvious.",
  },
  {
    t: "Systems beat snowflakes.",
    b: "I'd rather have 80% of the surface area covered by a great system than 5% covered by a beautiful one.",
  },
  {
    t: "Design the seams.",
    b: "The handoffs between products, between teams, between humans and AI — that's where good products are won or lost.",
  },
  {
    t: "Use AI honestly.",
    b: "I bring AI into my workflow to do volume work, not judgement work. The model accelerates research; the designer still owns the decision.",
  },
];

// ── circular photo (plain crop, no border) — matches the Figma "About Me"
//    frames, which use plain rounded-full photo crops with no card border.
type PhotoCrop = { top: string; left: string; width: string; height: string };

type PhotoSpec = { src: string; alt: string; crop?: PhotoCrop; flip?: boolean };

/** Tighter top/bottom clearance than the shared CaseStudyKit default — this
 *  page's sections read as noticeably more padded/loose than the rest of the
 *  site, so About-local panels pull it in instead of touching the shared
 *  NAV_CLEAR every case study page also uses. */
const TIGHT_CLEAR = "!pt-10 sm:!pt-12 lg:!pt-[var(--nav-clear)] !pb-6 sm:!pb-8 lg:!pb-6";
/** Same tightened clearance, plus a mobile-sane left/right inset for the
 *  pad="rail" panels — their desktop 100px/16% rail padding is no longer
 *  lg-only (HorizontalScroll runs the same at every breakpoint now), and
 *  100px+ of fixed side padding eats too much of a phone's width. */
const TIGHT_CLEAR_RAIL = `${TIGHT_CLEAR} !px-6 sm:!px-12 lg:!pl-[100px] lg:!pr-[min(16%,120px)]`;

/** One row of circle photos. auto-fit means the browser fits whole columns
 *  and drops to two (then one) rather than wrapping a row unevenly; 190px is
 *  the floor a circle may shrink to before a column is dropped. */
const PHOTO_ROW = (gap: number): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  justifyItems: "center",
  alignItems: "center",
  gap,
});

function Photo({
  src,
  alt,
  size = 240,
  crop,
  flip = false,
  capVh = 32,
}: {
  src: string;
  alt: string;
  size?: number;
  /** Height ceiling in vh — 32 for a single row, 20 where two rows stack. */
  capVh?: number;
  /** Exact Figma pan/zoom offset (percent, from the node's own absolute
   *  image transform) for photos framed off-center rather than centered. */
  crop?: PhotoCrop;
  /** Mirrors the photo horizontally — matches a couple of Figma photos
   *  that were flipped for composition. */
  flip?: boolean;
}) {
  // Fluid width instead of a flat pixel size: `size` is still the intended
  // desktop diameter, but a fixed px value on three circles in a row was
  // what forced tablet/mobile widths to either wrap unevenly or, worse,
  // force a CSS grid track wider than its column (the "I Love What I Do"
  // panel's 400px photo pushing its text off the right edge at tablet
  // widths). clamp() shrinks it smoothly down to a sane floor instead.
  return (
    <div
      className="relative aspect-square w-full min-w-0 overflow-hidden rounded-full bg-black/5"
      style={{ maxWidth: `min(${size}px, ${capVh}vh)`, transform: flip ? "scaleX(-1)" : undefined }}
    >
      {crop ? (
        // eslint-disable-next-line @next/next/no-img-element -- exact Figma
        // pan/zoom crop needs a plain absolutely-positioned img, not fill.
        <img src={src} alt={alt} className="absolute max-w-none" style={crop} />
      ) : (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      )}
    </div>
  );
}

/** A heading + copy + small photo cluster, side by side — the shape most of
 *  the personal-facts panels share. Photos render as plain circle crops
 *  (photoShape="circle", the default) to match Figma, except Sixbees which
 *  uses a single wide rectangular photo (photoShape="rect"), also per Figma. */
function StoryPanel({
  heading,
  eyebrow,
  children,
  photos,
  reverse = false,
  photoShape = "circle",
  photoSize = 240,
  photoCrop,
}: {
  heading: string;
  eyebrow?: string;
  children: React.ReactNode;
  photos: PhotoSpec[];
  reverse?: boolean;
  photoShape?: "circle" | "rect";
  photoSize?: number;
  /** Exact Figma pan/zoom offset for the rect photo (percent). */
  photoCrop?: PhotoCrop;
}) {
  return (
    <Panel width={VIEW} pad="center" className={`items-center ${TIGHT_CLEAR}`}>
      <div
        className={`mx-auto grid w-full max-w-[1100px] items-center gap-10 sm:grid-cols-2 sm:gap-20 ${
          reverse ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <SlideIn className="min-w-0">
          {photoShape === "rect" ? (
            <div className="relative aspect-[698/456] w-full overflow-hidden">
              {photoCrop ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photos[0].src} alt={photos[0].alt} className="absolute max-w-none" style={photoCrop} />
              ) : (
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  sizes="(max-width: 1023px) 90vw, 45vw"
                  className="object-cover"
                />
              )}
            </div>
          ) : (
            <div className={`grid justify-items-center gap-[40px] ${photos.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
              {photos.map((p) => (
                <Photo key={p.src} src={p.src} alt={p.alt} size={photoSize} crop={p.crop} flip={p.flip} />
              ))}
            </div>
          )}
        </SlideIn>
        <SlideIn delay={100} className="min-w-0">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-2 text-[clamp(1.75rem,4.8vw,3.8rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
            {heading}
          </h2>
          <div className="mt-4 space-y-3 text-[clamp(1rem,2vw,1.15rem)] leading-[1.5] opacity-85">
            {children}
          </div>
        </SlideIn>
      </div>
    </Panel>
  );
}


/** Left-anchored stack: a row of circle photos plus a heading/body block,
 *  one above the other (order set by `photosPosition`) — matches the Figma
 *  frames for Family / Animals / When I was little, which sit ~100px off
 *  the left edge rather than centered in a two-column grid. */
function StackPanel({
  heading,
  children,
  photos,
  photosPosition = "top",
  photoSize = 300,
  photoGap = 40,
  textWidth = "max-w-xl",
}: {
  heading: string;
  children?: React.ReactNode;
  photos: PhotoSpec[];
  photosPosition?: "top" | "bottom";
  photoSize?: number;
  photoGap?: number;
  /** Tailwind max-width class for the heading/body block. */
  textWidth?: string;
}) {
  const photoRow = (
    <SlideIn className="w-full" style={PHOTO_ROW(photoGap)}>
      {photos.map((p) => (
        <Photo key={p.src} src={p.src} alt={p.alt} size={photoSize} crop={p.crop} flip={p.flip} />
      ))}
    </SlideIn>
  );
  const text = (
    <SlideIn delay={100} className={textWidth}>
      <h2 className="text-[clamp(1.75rem,5vw,3.8rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
        {heading}
      </h2>
      {children && (
        <div className="mt-4 space-y-3 text-[clamp(1rem,2vw,1.15rem)] leading-[1.5] opacity-85">
          {children}
        </div>
      )}
    </SlideIn>
  );
  return (
    <Panel width={VIEW} pad="rail" className={TIGHT_CLEAR_RAIL}>
      <div className="flex w-full max-w-[1000px] flex-col gap-8 sm:gap-10">
        {photosPosition === "top" ? (
          <>
            {photoRow}
            {text}
          </>
        ) : (
          <>
            {text}
            {photoRow}
          </>
        )}
      </div>
    </Panel>
  );
}

/** Collections — two side-by-side rows, matching the Figma frame exactly:
 *  heading sits beside row one (vertically centered together), and row two
 *  sits beside the "I blame McDonald's..." aside (also vertically centered
 *  together) — not a heading stacked above everything. */
function CollectionsPanel({
  heading,
  aside,
  rowOne,
  rowTwo,
}: {
  heading: string;
  aside: React.ReactNode;
  rowOne: PhotoSpec[];
  rowTwo: PhotoSpec[];
}) {
  return (
    <Panel width={VIEW} pad="rail" className={TIGHT_CLEAR_RAIL}>
      <div className="flex w-full max-w-[1150px] flex-col gap-8">
        <div className="flex w-full flex-col items-center gap-y-6 sm:flex-row sm:flex-wrap sm:gap-x-[30px]">
          <SlideIn className="w-[260px] max-w-full">
            <h2 className="text-[clamp(1.75rem,4vw,50px)] font-semibold leading-[1.15] tracking-[-0.01em]">
              {heading}
            </h2>
          </SlideIn>
          <SlideIn delay={80} className="w-full" style={PHOTO_ROW(40)}>
            {rowOne.map((p) => (
              <Photo key={p.src} src={p.src} alt={p.alt} size={250} capVh={20} crop={p.crop} flip={p.flip} />
            ))}
          </SlideIn>
        </div>
        <div className="flex w-full flex-col items-center gap-y-6 sm:flex-row sm:flex-wrap sm:gap-x-16">
          <SlideIn delay={140} className="w-full" style={PHOTO_ROW(40)}>
            {rowTwo.map((p) => (
              <Photo key={p.src} src={p.src} alt={p.alt} size={250} capVh={20} crop={p.crop} flip={p.flip} />
            ))}
          </SlideIn>
          <SlideIn delay={200} className="w-[226px] max-w-full text-[clamp(0.9rem,1.4vw,20px)] leading-relaxed opacity-70">
            {aside}
          </SlideIn>
        </div>
      </div>
    </Panel>
  );
}

/** Packaging — two rows, matching the Figma frame exactly: a top row of
 *  3 photos beside the reused "I blame McDonald's..." aside, and below it
 *  the "I Love Packaging" row (heading in a fixed 250px slot, same as a
 *  photo would, plus 3 more photos). */
function PackagingPanel({
  heading,
  children,
  photos,
  topRow,
  topAside,
}: {
  heading: string;
  children?: React.ReactNode;
  photos: PhotoSpec[];
  /** Figma's second row above the heading row — 3 more photos sitting
   *  beside the reused Collections aside caption. */
  topRow?: PhotoSpec[];
  topAside?: React.ReactNode;
}) {
  return (
    <Panel width={VIEW} pad="rail" className={TIGHT_CLEAR_RAIL}>
      <div className="flex w-full max-w-[1150px] flex-col gap-8">
        {topRow && (
          <div className="flex w-full flex-col items-center gap-y-6 sm:flex-row sm:flex-wrap sm:gap-x-16">
            <SlideIn className="w-full" style={PHOTO_ROW(40)}>
              {topRow.map((p) => (
                <Photo key={p.src} src={p.src} alt={p.alt} size={250} capVh={20} crop={p.crop} flip={p.flip} />
              ))}
            </SlideIn>
            {topAside && (
              <SlideIn delay={80} className="w-[226px] max-w-full text-[clamp(0.9rem,1.4vw,20px)] leading-relaxed opacity-70">
                {topAside}
              </SlideIn>
            )}
          </div>
        )}
        <SlideIn delay={topRow ? 140 : 0} className="w-full" style={PHOTO_ROW(40)}>
          <div className="w-[250px] max-w-full">
            <h2 className="text-[clamp(1.75rem,4vw,50px)] font-semibold leading-[1.15] tracking-[-0.01em]">
              {heading}
            </h2>
            {children && (
              <div className="mt-3 space-y-3 text-[clamp(1rem,2vw,1.15rem)] leading-[1.5] opacity-85">
                {children}
              </div>
            )}
          </div>
          {photos.map((p) => (
            <Photo key={p.src} src={p.src} alt={p.alt} size={250} capVh={20} crop={p.crop} flip={p.flip} />
          ))}
        </SlideIn>
      </div>
    </Panel>
  );
}

export default function AboutPage() {
  return (
    <main
      className={`${jost.variable} relative bg-white text-[#2f2f2f]`}
      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={<Logo variant="mark" size={64} />}
        action={<CloseLink large />}
        parkImmediately
      />

      <HorizontalScroll>
        {/* ── 1 — INTRO — Molly Francis (now the opening panel, per Figma) ── */}
        <Panel id="title" width={VIEW} pad="center" className="items-center !pt-20 sm:!pt-24">
          <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 sm:grid-cols-2 sm:gap-14">
            <SlideIn className="min-w-0">
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-black/5" style={{ maxWidth: 400 }}>
                <Image
                  src="/about/molly-headshot.jpg"
                  alt="Molly Francis"
                  fill
                  sizes="(max-width: 1024px) 60vw, 24vw"
                  className="object-cover"
                  priority
                />
              </div>
            </SlideIn>
            <SlideIn delay={100} className="min-w-0">
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.01em]">
                Molly Francis
              </h2>
              <p className="mt-2 font-mono text-sm opacity-60">/ mol&bull;ly /</p>
              <p className="mt-5 text-sm opacity-80">
                <span className="font-semibold">ENFP (Campaigner)</span>{" "}
                {traits.map((t, i) => (
                  <span key={t.word}>
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 hover:opacity-70"
                    >
                      {t.word}
                    </a>
                    {i < traits.length - 1 ? ", " : ""}
                    {i === traits.length - 2 ? "and " : ""}
                  </span>
                ))}
                {" "}traits
              </p>
              <p className="mt-5 text-[clamp(1rem,2vw,1.15rem)] leading-[1.5] opacity-85">
                I am a UX leader and hands-on designer with a proven track
                record of solving complex problems across Healthcare,
                Conversational AI Platforms, Fintech, GovTech, and E-commerce.
                Having shaped products for companies ranging from early-stage
                startups like Patient IO to industry giants like athenahealth,
                LivePerson, and Care.com, I thrive as a player-coach who
                bridges strategy and execution. My expertise lies in
                translating intricate workflows, high-stakes compliance data,
                and diverse user needs into seamless digital products. I
                excel at leading from the front and managing and mentoring
                individual designers to elevate their craft while
                continuously shipping high-impact individual work.
              </p>
            </SlideIn>
          </div>
        </Panel>

        {/* ── 2 — FAMILY — photos on top, heading below, left-anchored ──── */}
        <StackPanel
          heading="I have a wonderful family"
          photos={[
            {
              src: "/about/family-1.jpg",
              alt: "Family group photo",
              crop: { left: "-4.98%", top: "0%", width: "126.8%", height: "100%" },
            },
            { src: "/about/family-2.jpg", alt: "Daughter with pink blanket" },
            { src: "/about/family-3.jpg", alt: "Molly and daughter" },
          ]}
        />

        {/* ── 3 — THE SIXBEES — photo left, text right (not reversed) ──── */}
        <StoryPanel
          heading="The Sixbees"
          photos={[{ src: "/about/sixbees.jpg", alt: "The Sixbees — design friends" }]}
          photoShape="rect"
        >
          <p>
            My design friends and I started a blog years ago. It was a blast!
            We wrote articles and had regular meetups.
          </p>
          <p>
            As time went by, our lives got busy with family and life and a few
            moved to other states, but we still meet up to grab a beer or
            coffee whenever we can.
          </p>
        </StoryPanel>

        {/* ── 4 — ANIMALS — photos on top, heading + body below ─────────── */}
        <StackPanel
          heading="I love animals"
          photos={[
            { src: "/about/pet-1.jpg", alt: "Henry on chair" },
            { src: "/about/pet-2.jpg", alt: "Joey, gray fluffy cat" },
            { src: "/about/pet-4.jpg", alt: "Saskatoon the dog" },
          ]}
        >
          <p>I have two cats and a dog. They love to crash a good meeting :)</p>
        </StackPanel>

        {/* ── 5 — COLLECTIONS — staggered two-row grid ───────────────────── */}
        <CollectionsPanel
          heading="I collect a LOT of things"
          aside={
            <p>
              I blame McDonald&rsquo;s and Hardies happy meal toys (the
              California Raisins) and the scholastic book fair when I was a
              kid :)
            </p>
          }
          rowOne={[
            { src: "/about/collect-4.jpg", alt: "Doll heads shelf" },
            { src: "/about/collect-3.jpg", alt: "Terracotta sculpture" },
            {
              src: "/about/collect-1.jpg",
              alt: "LEGO succulents",
              flip: true,
              crop: { left: "-0.04%", top: "-20.18%", width: "100.07%", height: "138.09%" },
            },
          ]}
          rowTwo={[
            { src: "/about/collect-desk.png", alt: "Reading nook with bookshelves" },
            { src: "/about/collect-pens.jpg", alt: "Pen cup with globes" },
            { src: "/about/collect-candy.png", alt: "Hand reaching into a candy jar" },
          ]}
        />

        {/* ── 6 — WHEN I WAS LITTLE — heading + body on top, photos below ── */}
        <StackPanel
          heading="👣 When I was little…"
          photosPosition="bottom"
          photoGap={30}
          textWidth="max-w-3xl"
          photos={[
            {
              src: "/about/little-bigfoot.jpg",
              alt: "BigFoot photo",
              crop: { left: "-19.42%", top: "-2.47%", width: "130.67%", height: "104.98%" },
            },
            { src: "/about/little-dad.jpg", alt: "Molly with dad" },
            {
              src: "/about/little-jeep.jpg",
              alt: "Fisher Price Jeep adventurer",
              crop: { left: "-7.48%", top: "-21.26%", width: "130.56%", height: "171.55%" },
            },
          ]}
        >
          <p>
            My dad asked me what I wanted to be when I grew up. I told him I
            wanted to find BigFoot.
          </p>
          <p>
            I&rsquo;m pretty sure my imagination was sparked with the Fisher
            Price Jeep adventurer collection :)
          </p>
        </StackPanel>

        {/* ── 7 — PACKAGING — heading and photos bottom-aligned ──────────── */}
        <PackagingPanel
          heading="I Love Packaging"
          topRow={[
            { src: "/about/packaging-cheetos-popcorn.png", alt: "Cheetos Popcorn bag" },
            { src: "/about/packaging-bloodymary.png", alt: "Bloody Mary on a Dude Perfect placemat" },
            { src: "/about/packaging-coors.png", alt: "Coors Banquet can with a thumbs up" },
          ]}
          topAside={
            <p>
              I blame McDonald&rsquo;s and Hardies happy meal toys (the
              California Raisins) and the scholastic book fair when I was a
              kid :)
            </p>
          }
          photos={[
            { src: "/about/packaging-dolly.png", alt: "Dolly Parton coconut flakes" },
            { src: "/about/packaging-2.jpg", alt: "Pickle beer" },
            { src: "/about/packaging-3.jpg", alt: "Cheetos Mac n Cheese" },
          ]}
        >
          <p>I will always buy something if the packaging is cool.</p>
        </PackagingPanel>

        {/* ── 8 — I LOVE WHAT I DO — closes the story sequence, per Figma ── */}
        <StoryPanel
          heading="I love what I do"
          photoSize={400}
          photos={[
            {
              src: "/about/love-coffee.jpg",
              alt: "Coffee cup and 'welcome to your life' sketch",
              crop: { left: "-101.12%", top: "-69.96%", width: "201.12%", height: "222.64%" },
            },
          ]}
        >
          <p>
            I would never want to change career paths, and strive to learn
            and evolve with changes that come in the tech world.
          </p>
        </StoryPanel>

        {/* ── BRIDGE TO THE WORK ─────────────────────────────────────── */}
        <TextPanel>
          <Eyebrow>And — the work</Eyebrow>
          <Heading>
            I design things that work, for people on their hardest day.
          </Heading>
          <Body>
            Most of my career has been in healthcare and complex SaaS —
            places where the tool is the difference between &ldquo;I got my
            answer&rdquo; and &ldquo;I gave up.&rdquo;
          </Body>
        </TextPanel>

        {/* ── OPERATING PRINCIPLES ──────────────────────────────────── */}
        <Panel width={VIEW} pad="center">
          <div className={`mx-auto ${MEASURE}`}>
            <Eyebrow>Operating principles</Eyebrow>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              How I show up
            </h2>
            <div className="mt-8 w-full space-y-1">
              {principles.map((p, i) => (
                <SlideIn key={p.t} delay={120 + i * 90}>
                  <div className="grid grid-cols-12 gap-4 border-t border-[#141414]/10 py-6">
                    <div className="col-span-1 font-mono text-base opacity-40">
                      0{i + 1}
                    </div>
                    <div className="col-span-11">
                      <h3 className="text-[clamp(1.1rem,1.5vw,1.25rem)] font-semibold">{p.t}</h3>
                      <p className="mt-1.5 max-w-xl text-[clamp(1rem,1.25vw,1.1rem)] leading-relaxed opacity-75">
                        {p.b}
                      </p>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </Panel>

        {/* ── CTA — Let's talk ──────────────────────────────────────── */}
        <section className={`relative flex h-[100dvh] w-screen flex-col justify-center gap-2 shrink-0 snap-start overflow-y-auto overscroll-contain bg-[#141414] ${GUTTER} py-0 text-[#f5f5f5]`}>
          <div className={MEASURE}>
          <SlideIn>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Still reading?
            </p>
            <h2 className="mt-4 text-[clamp(2rem,7vw,3.5rem)] font-semibold leading-[1.05] sm:text-[4vw]">
              Let&rsquo;s talk.
            </h2>
            <p className="mt-5 max-w-md text-white/80 leading-relaxed">
              If any of this resonates — the work, the cats, or the BigFoot
              thing — I&rsquo;d love to hear what you&rsquo;re building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:yo@mollyfrancis.com"
                className="inline-flex min-h-11 items-center rounded-full bg-[#f5f5f5] px-7 py-3 text-sm font-semibold text-[#141414] transition-opacity hover:opacity-90"
              >
                yo@mollyfrancis.com →
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-60"
              >
                Project inquiry
              </Link>
            </div>
          </SlideIn>
          </div>
        </section>
      </HorizontalScroll>
    </main>
  );
}
