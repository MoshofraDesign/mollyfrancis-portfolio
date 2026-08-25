import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import CloseLink from "@/components/CloseLink";
import SlideIn from "@/components/SlideIn";
import Logo from "@/components/Logo";
import { TEXT_W, MEASURE, VIEW, Eyebrow, Panel, TextPanel, Heading, Body } from "@/components/v2/CaseStudyKit";

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

const stats = [
  { v: "20+", l: "years designing" },
  { v: "9", l: "industries shipped in" },
  { v: "100+", l: "products in market" },
];

// ── circular photo (plain crop, no border) — matches the Figma "About Me"
//    frames, which use plain rounded-full photo crops with no card border.
function Photo({
  src,
  alt,
  size = 240,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div
      className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-black/5"
      style={{ maxWidth: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
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
}: {
  heading: string;
  eyebrow?: string;
  children: React.ReactNode;
  photos: { src: string; alt: string }[];
  reverse?: boolean;
  photoShape?: "circle" | "rect";
  photoSize?: number;
}) {
  return (
    <Panel width={VIEW} pad="center" className="items-center">
      <div
        className={`mx-auto grid w-full max-w-[min(1100px,94vw)] items-center gap-10 sm:grid-cols-2 sm:gap-14 ${
          reverse ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <SlideIn>
          {photoShape === "rect" ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                sizes="(max-width: 1023px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`grid gap-4 ${photos.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
              {photos.map((p) => (
                <Photo key={p.src} src={p.src} alt={p.alt} size={photoSize} />
              ))}
            </div>
          )}
        </SlideIn>
        <SlideIn delay={100}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-2 text-[clamp(1.5rem,4.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
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

export default function AboutPage() {
  return (
    <main
      className={`${jost.variable} relative bg-[#f5f5f5] text-[#141414]`}
      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={<Logo variant="mark" size={26} />}
        action={<CloseLink />}
      />

      <HorizontalScroll>
        {/* ── TITLE — I love what I do ─────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col md:flex-row md:items-center lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:overflow-y-auto lg:overscroll-contain"
        >
          <div className="flex w-full flex-col justify-between gap-10 px-5 pb-10 pt-5 sm:px-8 sm:pt-7 md:w-[42%] md:gap-6 lg:h-full lg:gap-0 lg:pb-[10%] lg:pl-12">
            <Logo variant="lockup" size={56} />
            <div>
              <Eyebrow>Hi, I&rsquo;m Molly</Eyebrow>
              <p className="mt-3 font-serif italic text-[clamp(1.75rem,6vw,3rem)] leading-[1.08]">
                &ldquo;I love what I do.&rdquo;
              </p>
              <p className="mt-4 max-w-[60ch] text-[clamp(0.95rem,4vw,1.2rem)] leading-[1.4] opacity-85 sm:text-[clamp(0.95rem,2.2vw,1.2rem)] md:text-[1.05vw]">
                I would never want to change career paths, and strive to learn
                and evolve with changes that come in the tech world.
              </p>
            </div>
          </div>
          <div className="w-full px-5 pb-10 sm:px-8 md:mr-[5%] md:w-[58%] md:px-0 md:pb-0">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/about/love-coffee.jpg"
                alt="Coffee cup and 'welcome to your life' sketch"
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 55vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── INTRO — Molly Francis ────────────────────────────────── */}
        <Panel width={VIEW} pad="center" className="items-center">
          <div className="mx-auto grid w-full max-w-[min(1100px,94vw)] items-center gap-10 sm:grid-cols-2 sm:gap-14">
            <SlideIn>
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-black/5">
                <Image
                  src="/about/molly-headshot.jpg"
                  alt="Molly Francis"
                  fill
                  sizes="(max-width: 1024px) 60vw, 24vw"
                  className="object-cover"
                />
              </div>
            </SlideIn>
            <SlideIn delay={100}>
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
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.mollyfrancis.com/s/Molly-Francis-Product-Designer-Researcher-and-Leader-Resume-1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-[#141414] px-7 py-3 text-sm font-semibold text-[#f5f5f5] transition-opacity hover:opacity-80"
                >
                  Résumé ↗
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center rounded-full border border-[#141414]/30 px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-60"
                >
                  Say hi
                </Link>
              </div>
            </SlideIn>
          </div>
        </Panel>

        {/* ── FAMILY ────────────────────────────────────────────────── */}
        <StoryPanel
          heading="I have a wonderful family"
          photos={[
            { src: "/about/family-1.jpg", alt: "Family group photo" },
            { src: "/about/family-2.jpg", alt: "Daughter with pink blanket" },
            { src: "/about/family-3.jpg", alt: "Molly and daughter" },
          ]}
        >
          <p>
            My dad is a retired Architect and my mother was an early-childhood
            Preschool Director. I think having a mix of a very meticulous,
            detailed father and an empathetic mother who was a helper of
            children created a combo of the skills I possess as Product
            Designer I am today.
          </p>
        </StoryPanel>

        {/* ── THE SIXBEES ───────────────────────────────────────────── */}
        <StoryPanel
          heading="The Sixbees"
          photos={[{ src: "/about/sixbees.jpg", alt: "The Sixbees — design friends" }]}
          reverse
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

        {/* ── ANIMALS ───────────────────────────────────────────────── */}
        <StoryPanel
          heading="I love animals"
          photos={[
            { src: "/about/pet-1.jpg", alt: "Henry on chair" },
            { src: "/about/pet-2.jpg", alt: "Joey, gray fluffy cat" },
            { src: "/about/pet-4.jpg", alt: "Saskatoon the dog" },
          ]}
        >
          <p>I have two cats and a dog. They love to crash a good meeting :)</p>
        </StoryPanel>

        {/* ── COLLECTIONS ───────────────────────────────────────────── */}
        <StoryPanel
          heading="I collect a LOT of things"
          photos={[
            { src: "/about/collect-1.jpg", alt: "LEGO succulents" },
            { src: "/about/collect-2.jpg", alt: "Mini Brands collectibles" },
            { src: "/about/collect-3.jpg", alt: "Terracotta sculpture" },
            { src: "/about/collect-4.jpg", alt: "Doll heads shelf" },
            { src: "/about/collect-pens.jpg", alt: "Pen cup with globes" },
          ]}
        >
          <p>
            I blame McDonald&rsquo;s and Hardies happy meal toys (the
            California Raisins) and the scholastic book fair when I was a kid
            :)
          </p>
        </StoryPanel>

        {/* ── PACKAGING ─────────────────────────────────────────────── */}
        <StoryPanel
          heading="I Love Packaging"
          photos={[
            { src: "/about/packaging-1.jpg", alt: "Dolly Parton coconut flakes" },
            { src: "/about/packaging-2.jpg", alt: "Pickle beer" },
            { src: "/about/packaging-3.jpg", alt: "Cheetos Mac n Cheese" },
          ]}
          reverse
        >
          <p>I will always buy something if the packaging is cool.</p>
        </StoryPanel>

        {/* ── WHEN I WAS LITTLE ─────────────────────────────────────── */}
        <StoryPanel
          heading="👣 When I was little…"
          photos={[
            { src: "/about/little-jeep.jpg", alt: "Fisher Price Jeep adventurer" },
            { src: "/about/little-dad.jpg", alt: "Molly with dad" },
            { src: "/about/little-bigfoot.jpg", alt: "BigFoot photo" },
          ]}
          reverse
        >
          <p>
            My dad asked me what I wanted to be when I grew up. I told him I
            wanted to find BigFoot.
          </p>
          <p>
            I&rsquo;m pretty sure my imagination was sparked with the Fisher
            Price Jeep adventurer collection :)
          </p>
        </StoryPanel>

        {/* ── BRIDGE TO THE WORK — stats ────────────────────────────── */}
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
          <div className={`mt-10 grid grid-cols-3 gap-6 ${TEXT_W}`}>
            {stats.map((s, i) => (
              <SlideIn key={s.l} delay={240 + i * 90}>
                <div className="rounded-md border border-[#141414]/10 bg-white/60 p-6">
                  <div className="text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-none">
                    {s.v}
                  </div>
                  <p className="mt-2 text-xs opacity-60 sm:text-sm">{s.l}</p>
                </div>
              </SlideIn>
            ))}
          </div>
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
        <section className="relative flex w-full flex-col justify-center bg-[#141414] px-6 py-20 text-[#f5f5f5] sm:px-12 sm:py-24 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:px-[clamp(1.25rem,4.5vw,4rem)] lg:py-0">
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
