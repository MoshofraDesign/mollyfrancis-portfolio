"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, featuredProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";

const marqueeWords = [
  "Healthcare",
  "Design systems",
  "0 → 1",
  "AI-augmented research",
  "Telehealth",
  "FinTech",
  "Enterprise SaaS",
  "Mobile",
  "Information architecture",
  "Strategy",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <div className="page-shell">
      {/* HERO ---------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-8 lg:pt-12 pb-24 lg:pb-32"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            style={{ y }}
            className="lg:col-span-8 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-8"
            >
              Lead · Principal · Senior UX Product Designer — Austin, TX
            </motion.p>

            <h1 className="font-serif text-display">
              <span className="block">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Hello,
                </motion.span>{" "}
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  I&rsquo;m
                </motion.span>
              </span>
              <span className="block">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic font-light"
                >
                  Molly Francis.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-2xl text-lg lg:text-xl text-ink/75 leading-relaxed"
            >
              I&rsquo;m a UI/UX product designer, researcher, and leader. For 20+ years I&rsquo;ve
              shipped simple, clean, and smart experiences across healthcare, fintech, and SaaS —
              now integrating <em className="font-serif text-ochre not-italic">AI tools</em> into
              research, design, and operations to make teams faster and insights sharper.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href="/work">
                See selected work <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton href="/about" variant="ghost">
                About me
              </MagneticButton>
              <a
                href="https://www.mollyfrancis.com/s/Molly-Francis-Product-Designer-Researcher-and-Leader-Resume-1.pdf"
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-ink/60 ml-2"
              >
                Download résumé ↗
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-2 max-w-2xl"
            >
              {marqueeWords.map((w) => (
                <span key={w} className="pill">
                  {w}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: portraitScale, opacity: portraitOpacity }}
            className="lg:col-span-4 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/molly-sketch.svg"
                alt="Line illustration of Molly Francis"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
            <a
              href="https://www.builtinaustin.com/company/bright-health/product-tech"
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-block text-sm text-ink/60"
            >
              Read the feature ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* AI WORKFLOWS --------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal as="div" className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
              How I work, 2026
            </p>
            <h2 className="font-serif text-h1">
              Design plus a working AI stack.
            </h2>
          </Reveal>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "AI-augmented research",
                body: "Cluster, synthesize, and tag interview transcripts in hours, not weeks. I keep the rigor — the model handles the volume.",
              },
              {
                title: "Generative prototyping",
                body: "Lo-fi to hi-fi in a single afternoon. Faster discovery rounds; more options shown to stakeholders.",
              },
              {
                title: "Design system ops",
                body: "Token audits, accessibility checks, and component documentation generated and reviewed weekly.",
              },
              {
                title: "Workflow design for AI",
                body: "I also design the AI itself — surfacing trust, explainability, and fallbacks in products that use it.",
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                as="div"
                delay={i * 80}
                className="p-7 rounded-md bg-white/60 border border-ink/10 hover:border-ink/30 transition-colors"
              >
                <p className="font-mono text-[18px] text-ochre mb-3 leading-none">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl mb-3">{c.title}</h3>
                <p className="text-ink/70 leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK -------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              Featured
            </p>
            <h2 className="font-serif text-h1">Selected work</h2>
          </div>
          <Link href="/work" className="link-underline text-sm hidden md:inline-block">
            View all ({projects.length})
          </Link>
        </div>

        <div className="space-y-24 lg:space-y-36">
          {featuredProjects.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={p.slug} as="article">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 items-center"
                >
                  <div
                    className={`relative aspect-square w-full max-w-[400px] flex-none overflow-hidden rounded-[8px] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  <div
                    className={`flex-1 min-w-0 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="font-mono text-[18px] text-ink/40 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
                        {p.client} · {p.year}
                      </span>
                    </div>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-tight group-hover:text-ochre transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-lg text-ink/75 leading-relaxed max-w-prose">
                      {p.subtitle}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[0.22em]">
                      Read case study
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* MORE WORK (list) ---------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
          All projects
        </p>
        <div>
          {projects
            .filter((p) => !p.featured)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
        </div>
      </section>

      {/* CTA STRIP ------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-12">
        <Reveal as="div" className="relative rounded-md bg-ink text-cream p-10 lg:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-ochre/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-6">
              Currently
            </p>
            <h3 className="font-serif text-h1 mb-6">
              Open to <em className="not-italic font-light text-ochre">Lead</em>,{" "}
              <em className="not-italic font-light text-ochre">Principal</em>, and{" "}
              <em className="not-italic font-light text-ochre">Staff</em> design roles.
            </h3>
            <p className="text-cream/80 mb-8 leading-relaxed">
              Healthcare, AI-native products, design system leadership, or anything where the right
              interaction quietly changes how someone&rsquo;s day goes. Let&rsquo;s talk.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:yo@mollyfrancis.com" className="magnetic bg-cream text-ink hover:bg-cream/90">
                yo@mollyfrancis.com →
              </a>
              <Link href="/contact" className="magnetic ghost border-cream/30 text-cream">
                Project inquiry
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
