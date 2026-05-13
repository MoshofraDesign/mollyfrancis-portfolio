import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import Polaroid from "@/components/Polaroid";
import { Triangle, Diamond, Circle } from "@/components/Shapes";
import Logo from "@/components/Logo";

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

export default function AboutPage() {
  return (
    <div className="page-shell">
      {/* ──────────────────────────────────────────────────────────
         SLIDE 1 — Pronunciation hero
         ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-full overflow-hidden bg-ink/5 max-w-md mx-auto">
              <Image
                src="https://static1.squarespace.com/static/5387376ae4b08610fe281471/t/68a76115151c7a37103f620b/1755799829545/Molly.jpg?format=1500w"
                alt="Molly Francis"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal as="div" className="lg:col-span-7 order-1 lg:order-2">
            <div className="mb-6 text-ink">
              <Logo variant="mark" size={56} />
            </div>
            <h1 className="font-serif text-hero leading-[0.95]">
              Molly Francis
            </h1>
            <p className="mt-4 font-mono text-ink/60 text-lg">/ mol•ly /</p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-ink/60 mr-2">ENFP — Campaigner</span>
              {traits.map((t) => (
                <span
                  key={t.letter}
                  className="group inline-flex items-baseline gap-1 px-3 py-1 rounded-full border border-ink/15 text-sm hover:bg-ink hover:text-cream transition-colors cursor-default"
                >
                  <span className="font-serif italic text-ochre group-hover:text-cream">
                    {t.letter}
                  </span>
                  <span>{t.word}</span>
                </span>
              ))}
            </div>

            <p className="mt-8 text-lg lg:text-xl text-ink/80 leading-relaxed max-w-2xl">
              I tend to embrace big ideas and actions that reflect a sense of hope
              and goodwill toward others. I have a vibrant energy and can flow in
              many directions.
            </p>
            <p className="mt-5 text-lg lg:text-xl text-ink/80 leading-relaxed max-w-2xl">
              These traits allow me to be an{" "}
              <em className="font-serif text-ochre not-italic">empathetic designer</em>{" "}
              who thrives on understanding and connecting with the end users — always
              keeping their needs and experiences at the forefront of my work.
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

      {/* ──────────────────────────────────────────────────────────
         SLIDE 2 — I have a wonderful family
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal as="div" className="lg:col-span-7">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                <Polaroid
                  src="/about/family-1.jpg"
                  alt="Family group photo"
                  rotate={-4}
                />
                <Polaroid
                  src="/about/family-2.jpg"
                  alt="Parents at the game"
                  rotate={3}
                />
                <Polaroid
                  src="/about/family-3.jpg"
                  alt="Daughter with pink blanket"
                  rotate={-2}
                />
                <Polaroid
                  src="/about/family-4.jpg"
                  alt="Molly and daughter"
                  rotate={4}
                />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-5">
              <h2 className="font-serif text-h1 mb-6">
                I have a <em className="not-italic font-light text-ochre">wonderful family</em>.
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                My dad is a retired Architect and my mother was an early-childhood
                Preschool Director. Having a meticulous, detail-loving father and an
                empathetic mother who spent her career helping children gave me the
                exact combination of skills I use as a Product Designer today.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         SLIDE 3 — The Sixbees
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <Reveal as="div" className="lg:col-span-7 relative">
              {/* Decorative shape backdrop */}
              <Triangle
                color="#a48bff"
                size={180}
                rotate={-15}
                className="absolute -top-6 -left-4 -z-0"
              />
              <Diamond
                color="#f7c948"
                size={150}
                rotate={20}
                className="absolute -bottom-6 right-12 -z-0"
              />
              <Circle
                color="#f0997b"
                size={140}
                className="absolute top-1/3 left-1/3 -z-0 opacity-90"
              />
              <div className="relative z-10">
                <Polaroid
                  src="/about/sixbees.jpg"
                  alt="The Sixbees — design friends"
                  aspect={4 / 3}
                  rotate={-1}
                  className="max-w-xl mx-auto grayscale"
                />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Community
              </p>
              <h2 className="font-serif text-h1 mb-6">The Sixbees.</h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                My design friends and I started a blog years ago. It was a blast.
                We wrote articles, ran regular meetups, made each other laugh too
                loud at coffee shops.
              </p>
              <p className="mt-4 text-lg text-ink/80 leading-relaxed">
                As life got busy and a few of us moved away, the cadence slowed —
                but we still find each other for a beer or a coffee whenever we
                can.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         SLIDE 4 — I love animals
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal as="div" className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Coworkers (unpaid)
              </p>
              <h2 className="font-serif text-h1 mb-6">
                I love <em className="not-italic font-light text-ochre">animals</em>.
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                Two cats and a dog. They love to crash a good meeting{" "}
                <span aria-hidden>:)</span> Sometimes the standup is improved by
                the cat that has decided your laptop is now her bed.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <Polaroid src="/about/pet-1.jpg" alt="Black cat" rotate={-3} />
                <Polaroid src="/about/pet-2.jpg" alt="Dog" rotate={2} />
                <Polaroid src="/about/pet-3.jpg" alt="Gray fluffy cat" rotate={3} />
                <Polaroid src="/about/pet-4.jpg" alt="Black cat sleeping" rotate={-2} />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-7">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden bg-ink/5">
                <Image
                  src="/about/pet-bed.jpg"
                  alt="Black cat asleep on a bed"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/[0.03] pointer-events-none">
                  {/* fallback caption layered behind the image, only visible if image fails to load */}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         SLIDE 5 — When I was little...
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal as="div" className="lg:col-span-6">
              <div className="relative">
                <Polaroid
                  src="/about/little-jeep.jpg"
                  alt="Fisher Price Jeep adventurer"
                  rotate={6}
                  className="absolute top-0 left-12 w-48 lg:w-56 z-10"
                />
                <Polaroid
                  src="/about/little-dad.jpg"
                  alt="Molly with dad"
                  rotate={-7}
                  aspect={3 / 4}
                  className="absolute top-32 left-0 w-52 lg:w-60 z-20"
                />
                <Polaroid
                  src="/about/little-bigfoot.jpg"
                  alt="BigFoot photo"
                  rotate={4}
                  className="absolute top-44 left-48 w-48 lg:w-56 z-0"
                />
                {/* Spacer to give the absolute polaroids a parent height */}
                <div className="h-[440px] lg:h-[500px]" />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Origin story
              </p>
              <h2 className="font-serif text-h1 mb-6">
                <span aria-hidden className="mr-2">👣</span>
                When I was little…
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                My dad asked me what I wanted to be when I grew up. I told him I
                wanted to find <em className="font-serif text-ochre not-italic">BigFoot</em>.
              </p>
              <p className="mt-4 text-lg text-ink/80 leading-relaxed">
                I&rsquo;m pretty sure my imagination was sparked by the Fisher Price
                Jeep adventurer set <span aria-hidden>:)</span> Either way, I&rsquo;ve
                been chasing big interesting things ever since.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         SLIDE 6 — I collect a LOT of things
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal as="div" className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Habit
              </p>
              <h2 className="font-serif text-h1 mb-6">
                I collect a <em className="not-italic font-light text-ochre">LOT</em> of things.
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                I blame McDonald&rsquo;s Happy Meal toys (the California Raisins,
                specifically) and the Scholastic Book Fair for the habit. It never
                fully went away — pens, doll heads, little ceramic houses, LEGO
                succulents, globes, the works.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <Polaroid src="/about/collect-1.jpg" alt="LEGO succulents" rotate={-3} />
                <Polaroid src="/about/collect-2.jpg" alt="Travel toothpastes" rotate={3} />
                <Polaroid src="/about/collect-3.jpg" alt="Terracotta sculpture" rotate={2} />
                <Polaroid src="/about/collect-4.jpg" alt="Doll heads shelf" rotate={-2} />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-7">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ink/5">
                <Image
                  src="/about/collect-pens.jpg"
                  alt="Pen cup with globes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         SLIDE 7 — I love what I do
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <Reveal as="div" className="lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Twenty years in
              </p>
              <h2 className="font-serif text-hero">
                I love <em className="not-italic font-light text-ochre">what I do</em>.
              </h2>
              <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-xl">
                I&rsquo;d never want to change career paths. I keep learning and
                evolving with the changes that come through tech — right now, that
                means treating AI as a working partner inside the design process,
                not a threat to it.
              </p>
              <blockquote className="mt-10 pl-6 border-l-2 border-ochre">
                <p className="font-serif text-2xl lg:text-3xl italic text-ink/90 leading-snug">
                  &ldquo;Welcome to your life — there&rsquo;s no turning back.&rdquo;
                </p>
                <cite className="block mt-3 not-italic text-sm text-ink/50">
                  — a sticky note on my desk
                </cite>
              </blockquote>
            </Reveal>

            <Reveal as="div" className="lg:col-span-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-ochre/15">
                <Image
                  src="/about/love-coffee.jpg"
                  alt="Coffee cup and Welcome to your life sketch"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
         Now, the work — bridge into professional content
         ────────────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal as="div" className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              And — the work
            </p>
            <h2 className="font-serif text-hero max-w-3xl">
              I design things that <em className="not-italic font-light text-ochre">work</em>,
              for people on their <em className="not-italic font-light text-ochre">hardest</em>{" "}
              day.
            </h2>
            <p className="mt-6 text-lg text-ink/75 leading-relaxed max-w-2xl">
              Most of my career has been in healthcare and complex SaaS — places
              where the tool is the difference between &ldquo;I got my answer&rdquo;
              and &ldquo;I gave up.&rdquo;
            </p>
          </Reveal>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { v: "20+", l: "years designing" },
              { v: "9", l: "industries shipped in" },
              { v: "100+", l: "products in market" },
            ].map((s) => (
              <Reveal
                key={s.l}
                as="div"
                className="p-7 rounded-2xl border border-ink/10 bg-white/60"
              >
                <div className="font-serif text-5xl mb-2">{s.v}</div>
                <div className="text-sm text-ink/60">{s.l}</div>
              </Reveal>
            ))}
          </div>

          {/* Principles */}
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Operating principles
              </p>
              <h3 className="font-serif text-h1">How I show up</h3>
            </Reveal>

            <div className="lg:col-span-8 space-y-1">
              {principles.map((p, i) => (
                <Reveal
                  key={p.t}
                  as="div"
                  delay={i * 60}
                  className="grid grid-cols-12 py-7 border-t border-ink/10"
                >
                  <div className="col-span-1 font-mono text-xs text-ochre">
                    0{i + 1}
                  </div>
                  <div className="col-span-11">
                    <h4 className="font-serif text-2xl lg:text-3xl mb-2">
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
      <section className="border-t border-ink/10 py-24 lg:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Experience
              </p>
              <h2 className="font-serif text-h1">A long, useful résumé.</h2>
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
                    <h3 className="font-serif text-2xl">{e.role}</h3>
                    <p className="text-ink/60 mb-3">{e.company}</p>
                    <ul className="space-y-1.5">
                      {e.bullets.map((b) => (
                        <li key={b} className="text-ink/75 flex gap-3">
                          <span className="text-ochre mt-1.5">·</span>
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
            className="rounded-[32px] bg-ink text-cream p-10 lg:p-16 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-ochre/40 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-6">
                Still reading?
              </p>
              <h2 className="font-serif text-h1 mb-6">
                Let&rsquo;s {" "}
                <em className="not-italic font-light text-ochre">talk</em>.
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
