import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Polaroid from "@/components/Polaroid";

export const metadata = {
  title: "About — Molly Francis",
  description:
    "Lead / Principal UX Product Designer in Austin, TX. ENFP, big ideas, twenty years of design — plus cats, a dog, BigFoot, and a small mountain of collections.",
};

const traits = [
  { letter: "E", word: "Extraverted" },
  { letter: "N", word: "Intuitive" },
  { letter: "F", word: "Feeling" },
  { letter: "P", word: "Prospecting" },
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

const experience = [
  {
    role: "Lead / Principal Product Designer",
    company: "Bright HealthCare",
    period: "2021 – 2022",
    bullets: [
      "Led the Prior Authorization Portal from 100 to ~10K monthly users",
      "$1.9M in operational savings within a year of go-live",
    ],
  },
  {
    role: "Principal Designer · Design system lead",
    company: "DocSquad",
    period: "2022 – 2023",
    bullets: [
      "Rebuilt a desktop-only Zipnosis app into a unified desktop + native (Flutter) experience",
      "Ran generative research with 'virtual moonlighter' clinicians",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "LivePerson · Care.com · athenahealth · Volusion",
    period: "2014 – 2021",
    bullets: [
      "SocialConnect, Homepay Payroll, Consumer Health Portal, athenaWell, Patient IO",
      "MDP Marketplace 2.0, Volusion admin & storefront tooling",
    ],
  },
];

// ── small reusable photo card used for the flat (non-polaroid) sections ──
function Photo({
  src,
  alt,
  aspect = "1 / 1",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-white border-[10px] border-white shadow-[0_2px_12px_-4px_rgba(20,20,20,0.18)] w-full max-w-[350px] mx-auto ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover"
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="page-shell">
      {/* ── HERO — I love what I do (full-bleed) ───────────────── */}
      <section className="-mt-28 relative isolate">
        <Reveal as="div" className="relative isolate">
          <Image
            src="/about/love-coffee.jpg"
            alt="Coffee cup and 'welcome to your life' sketch"
            width={2000}
            height={1200}
            sizes="100vw"
            className="w-full h-[80vh] lg:h-[90vh] object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-end px-6 lg:px-16 pb-12 lg:pb-20">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/60 mb-4">
                Hi, I&rsquo;m Molly
              </p>
              <blockquote className="font-serif italic text-4xl lg:text-6xl leading-[1.05] text-ink">
                &ldquo;I love what I do.&rdquo;
              </blockquote>
              <p className="mt-6 text-base lg:text-lg text-ink/80 leading-relaxed max-w-lg">
                I would never want to change career paths, and strive to learn
                and evolve with changes that come in the tech world.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SLIDE 1 — Intro ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 lg:pt-32 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-full overflow-hidden bg-ink/5 max-w-md mx-auto">
              <Image
                src="/about/molly-headshot.jpg"
                alt="Molly Francis"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal as="div" className="lg:col-span-7 order-1 lg:order-2">
            <h1 className="text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
              Molly Francis
            </h1>
            <p className="mt-3 font-mono text-ink/60">/ mol•ly /</p>

            <p className="mt-6 text-sm text-ink/70">
              <span className="font-medium">ENFP (Campaigner)</span>{" "}
              <span className="underline-offset-2">{traits.map((t, i) => (
                <span key={t.word}>
                  <em className="not-italic underline">{t.word}</em>
                  {i < traits.length - 1 ? ", " : ""}
                  {i === traits.length - 2 ? "and " : ""}
                </span>
              ))}</span>
              {" "}traits
            </p>

            <p className="mt-6 text-base lg:text-lg text-ink/80 leading-relaxed max-w-2xl">
              I tend to embrace big ideas and actions that reflect a sense of hope
              and goodwill toward others. I have a vibrant energy and can flow in
              many directions.
            </p>
            <p className="mt-4 text-base lg:text-lg text-ink/80 leading-relaxed max-w-2xl">
              These traits allow me to be an empathetic designer who thrives on
              understanding and connecting with the end users, always keeping their
              needs and experiences at the forefront of my work.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton
                href="https://www.mollyfrancis.com/s/Molly-Francis-Product-Designer-Researcher-and-Leader-Resume-1.pdf"
                external
              >
                Résumé ↗
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost">
                Say hi
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SLIDE 2 — I have a wonderful family ──────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal as="div" className="grid grid-cols-3 gap-6 lg:gap-8 mb-12">
            <Photo src="/about/family-1.jpg" alt="Family group photo" />
            <Photo src="/about/family-2.jpg" alt="Daughter with pink blanket" />
            <Photo src="/about/family-3.jpg" alt="Molly and daughter" />
          </Reveal>
          <Reveal as="div" className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-medium mb-5">
              I have a wonderful family
            </h2>
            <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
              My dad is a retired Architect and my mother was an early-childhood
              Preschool Director. I think having a mix of a very meticulous,
              detailed father and an empathetic mother who was a helper of
              children created a combo of the skills I possess as Product
              Designer I am today.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SLIDE 3 — The Sixbees ────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <Reveal as="div" className="lg:col-span-7 relative">
              <Image
                src="/about/sixbees.jpg"
                alt="The Sixbees — design friends"
                width={854}
                height={555}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="w-full h-auto"
              />
            </Reveal>

            <Reveal as="div" className="lg:col-span-5">
              <h2 className="text-3xl lg:text-4xl font-medium mb-5">The Sixbees</h2>
              <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
                My design friends and I started a blog years ago. It was a blast!
                We wrote articles and had regular meetups.
              </p>
              <p className="mt-4 text-base lg:text-lg text-ink/80 leading-relaxed">
                As time went by, our lives got busy with family and life and a
                few moved to other states, but we still meet up to grab a beer
                or coffee whenever we can.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SLIDE 4 — I love animals ─────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal as="div" className="max-w-xl mb-10">
            <h2 className="text-3xl lg:text-4xl font-medium mb-3">
              I love animals
            </h2>
            <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
              I have two cats and a dog. They love to crash a good meeting :)
            </p>
          </Reveal>
          <Reveal as="div" className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            <Photo src="/about/pet-1.jpg" alt="Henry on chair" />
            <Photo src="/about/pet-2.jpg" alt="Joey, gray fluffy cat" />
            <Photo src="/about/pet-3.jpg" alt="Henry on couch" />
            <Photo src="/about/pet-4.jpg" alt="Saskatoon the dog" />
          </Reveal>
        </div>
      </section>

      {/* ── SLIDE 5 — When I was little ──────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal as="div" className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                <Photo src="/about/little-jeep.jpg" alt="Fisher Price Jeep adventurer" />
                <Photo src="/about/little-dad.jpg" alt="Molly with dad" />
                <Photo src="/about/little-bigfoot.jpg" alt="BigFoot photo" />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-5">
              <h2 className="text-3xl lg:text-4xl font-medium mb-5">
                <span aria-hidden className="mr-2">👣</span>
                When I was little…
              </h2>
              <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
                My dad asked me what I wanted to be when I grew up. I told him I
                wanted to find BigFoot.
              </p>
              <p className="mt-4 text-base lg:text-lg text-ink/80 leading-relaxed">
                I&rsquo;m pretty sure my imagination was sparked with the Fisher
                Price Jeep adventurer collection :)
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SLIDE 6 — I collect a LOT of things ──────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <Reveal as="div" className="lg:col-span-7">
              <h2 className="text-3xl lg:text-4xl font-medium mb-3">
                I collect a LOT of things
              </h2>
              <p className="text-base text-ink/80 mb-8 max-w-md">
                I blame McDonald&rsquo;s and Hardies happy meal toys (the
                California Raisins) and the scholastic book fair when I was a
                kid :)
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <Photo src="/about/collect-1.jpg" alt="LEGO succulents" />
                <Photo src="/about/collect-2.jpg" alt="Mini Brands collectibles" />
                <Photo src="/about/collect-3.jpg" alt="Terracotta sculpture" />
                <Photo src="/about/collect-4.jpg" alt="Doll heads shelf" />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-5">
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <Image
                  src="/about/collect-pens.jpg"
                  alt="Pen cup with globes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SLIDE 7 — I Love Packaging  (NEW from deck) ──────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal as="div" className="mb-12 max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-medium mb-3">
              I Love Packaging
            </h2>
            <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
              I will always buy something if the packaging is cool.
            </p>
          </Reveal>
          <Reveal as="div" className="grid grid-cols-3 gap-6 lg:gap-8">
            <Photo src="/about/packaging-1.jpg" alt="Dolly Parton coconut flakes" />
            <Photo src="/about/packaging-2.jpg" alt="Pickle beer" />
            <Photo src="/about/packaging-3.jpg" alt="Cheetos Mac n Cheese" />
          </Reveal>
        </div>
      </section>

      {/* ── Bridge to the work (additional content beyond the deck) ── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal as="div" className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              And — the work
            </p>
            <h2 className="text-4xl lg:text-5xl font-medium max-w-3xl leading-[1.1]">
              I design things that work, for people on their hardest day.
            </h2>
            <p className="mt-6 text-lg text-ink/75 leading-relaxed max-w-2xl">
              Most of my career has been in healthcare and complex SaaS — places
              where the tool is the difference between &ldquo;I got my answer&rdquo;
              and &ldquo;I gave up.&rdquo;
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { v: "20+", l: "years designing" },
              { v: "9", l: "industries shipped in" },
              { v: "100+", l: "products in market" },
            ].map((s) => (
              <Reveal
                key={s.l}
                as="div"
                className="p-7 rounded-md border border-ink/10 bg-white/60"
              >
                <div className="text-5xl font-medium mb-2">{s.v}</div>
                <div className="text-sm text-ink/60">{s.l}</div>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Operating principles
              </p>
              <h3 className="text-3xl lg:text-4xl font-medium">How I show up</h3>
            </Reveal>

            <div className="lg:col-span-8 space-y-1">
              {principles.map((p, i) => (
                <Reveal
                  key={p.t}
                  as="div"
                  delay={i * 60}
                  className="grid grid-cols-12 py-7 border-t border-ink/10"
                >
                  <div className="col-span-1 font-mono text-[18px] text-ink/40 leading-none">
                    0{i + 1}
                  </div>
                  <div className="col-span-11">
                    <h4 className="text-xl lg:text-2xl font-medium mb-2">
                      {p.t}
                    </h4>
                    <p className="text-ink/70 leading-relaxed max-w-2xl">
                      {p.b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Experience
              </p>
              <h2 className="text-3xl lg:text-4xl font-medium">
                A long, useful résumé.
              </h2>
              <p className="mt-4 text-ink/70 leading-relaxed">
                Highlights below — see the{" "}
                <a
                  href="https://www.mollyfrancis.com/s/Molly-Francis-Product-Designer-Researcher-and-Leader-Resume-1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  résumé PDF
                </a>{" "}
                for the full timeline, or{" "}
                <Link href="/work" className="link-underline">
                  the case studies
                </Link>{" "}
                for the work itself.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              {experience.map((e, i) => (
                <Reveal
                  key={e.role + e.company}
                  as="div"
                  delay={i * 60}
                  className="grid grid-cols-12 gap-4 py-8 border-t border-ink/10"
                >
                  <div className="col-span-12 lg:col-span-3 font-mono text-xs text-ink/50">
                    {e.period}
                  </div>
                  <div className="col-span-12 lg:col-span-9">
                    <h3 className="text-xl lg:text-2xl font-medium">{e.role}</h3>
                    <p className="text-ink/60 mb-3">{e.company}</p>
                    <ul className="space-y-1.5">
                      {e.bullets.map((b) => (
                        <li key={b} className="text-ink/75 flex gap-3">
                          <span className="text-ink/40 mt-1.5">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal
            as="div"
            className="rounded-md bg-ink text-cream p-10 lg:p-16 relative overflow-hidden"
          >
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-6">
                Still reading?
              </p>
              <h2 className="text-4xl lg:text-5xl font-medium mb-6 leading-[1.05]">
                Let&rsquo;s talk.
              </h2>
              <p className="text-cream/80 mb-8 leading-relaxed">
                If any of this resonates — the work, the cats, or the BigFoot
                thing — I&rsquo;d love to hear what you&rsquo;re building.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:yo@mollyfrancis.com"
                  className="magnetic bg-cream text-ink hover:bg-cream/90"
                >
                  yo@mollyfrancis.com →
                </a>
                <Link href="/contact" className="magnetic ghost border-cream/30 text-cream">
                  Project inquiry
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
