import Link from "next/link";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export const metadata = {
  title: "Résumé — Molly Francis",
  description:
    "UI/UX product designer, researcher, and leader based in Austin, Texas. Over 20 years across UI/UX design, user research, design systems, and design strategy — integrating emerging AI tools to streamline workflows and uncover deeper insights.",
};

const summary =
  "I'm a UI/UX product designer, researcher and leader based in Austin, Texas. I am focused on creating simple, clean, and smart user experiences while exploring the ever-changing interactive world. With over 20 years of experience across UI/UX design, user research, design systems, and design strategy, I integrate emerging AI tools to streamline workflows, uncover deeper insights, and enhance the design process.";

const aside =
  "In my free time, I thrift and collect vintage art and eclectic objects. When it comes to having cats, the bigger and fluffier the better.";

type Job = {
  role: string;
  company: string;
  domain: string;
  period: string;
  bullets: string[];
};

const experience: Job[] = [
  {
    role: "Lead Product Designer",
    company: "Netspend",
    domain: "netspend.com",
    period: "November 2025 — Current",
    bullets: [
      "Lead UX for Netspend's Rewards program: consumer app and the internal UCM tool that powers it.",
      "Reworked the rewards layout and Information Architecture around new UCM capabilities.",
      "Run user testing to guide iteration.",
      "Use Claude, Gemini, and Figma Make to speed up design and prototyping.",
    ],
  },
  {
    role: "Lead Product Designer",
    company: "GovOS (Neumo)",
    domain: "govos.com",
    period: "October 2023 — October 2025",
    bullets: [
      "Drive UX strategy and design execution across core GovOS products, including eSubmission, Business Licensing & Tax, Cloud Search, and Cloud Records.",
      "Conduct and synthesize user research to uncover insights, validate solutions, and guide product decisions.",
      "Partner with cross-functional teams to align user needs with business goals and deliver end-to-end experiences that simplify complex government workflows.",
      "Lead initiatives in accessibility, design systems, and scalable solutions to ensure long-term product growth and meaningful public impact.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "Bright Health",
    domain: "brighthealthcare.com",
    period: "March 2021 — April 2023",
    bullets: [
      "Established a 0 to 1 provider portal for Prior Authorizations, reducing manual paperwork and enabling providers to electronically submit and track authorization status in real time.",
      "Conducted user research and usability testing to validate workflows, uncover pain points, and ensure solutions met provider and patient needs.",
      "Provided design leadership and mentorship, managing two designers and co-created a design system at a WCAG 2.2 AA accessibility standard that improved consistency and accelerated delivery across multiple products.",
      "Designed a telehealth app (desktop + native mobile) that expanded patient access to care by supporting asynchronous / synchronous urgent visits and prescription refills.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "Care.com (HomePay)",
    domain: "care.com",
    period: "April 2020 — February 2021",
    bullets: [
      "Led the HomePay design team for a payroll, tax, and HR solution serving families with household employees (nannies, senior caregivers, etc.).",
      "Partnered with leadership to integrate UX into agile workflows, aligning design with product strategy and business goals.",
      "Managed and scaled the UX team, mentoring designers and improving processes to elevate quality and collaboration.",
      "Designed and enhanced internal Sales tools and client / employee-facing HomePay products, improving efficiency and user experience.",
    ],
  },
  {
    role: "Lead UX Designer",
    company: "Liveperson",
    domain: "liveperson.com",
    period: "July 2019 — February 2020",
    bullets: [
      "Served as lead designer on a new social media management product, enabling brands to interact with consumers over social platforms through the LiveEngage messaging product.",
      "Collaborated with the global UX team to update and scale the company's design system, improving accessibility and consistency across AI / chatbot products.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "athenahealth",
    domain: "athenahealth.com",
    period: "September 2016 — June 2019",
    bullets: [
      "Conducted research and design for desktop and native mobile electronic health record (EHR) and patient portal products, improving usability and adoption for clinicians and patients.",
      "Collaborated with a multi-disciplinary agile R&D team to define, design, and test features, streamlining workflows and enhancing the overall user experience.",
      "Led user testing and validation, identifying pain points and driving design improvements that increased efficiency, reduced errors, and elevated patient satisfaction.",
    ],
  },
  {
    role: "Lead Product Designer",
    company: "Patient IO",
    domain: "patientio.com",
    period: "July 2016 — August 2016",
    bullets: [
      "Served as Head of Product Design for desktop and native mobile apps supporting at-risk patients, designing for both patient-facing users and care managers.",
      "Worked in a lean, iterative environment, streamlining designs and eliminating waste while accelerating delivery.",
      "Collaborated with cross-functional teams to align design with product strategy and operational goals.",
      "Maintained a customer-centric perspective, ensuring design decisions prioritized patient needs and improved care outcomes.",
    ],
  },
  {
    role: "Senior UX Designer",
    company: "Volusion / Mozu",
    domain: "volusion.com",
    period: "September 2014 — June 2016",
    bullets: [
      "Designed interaction flows, visual design, and user experiences for the Volusion and Mozu e-commerce platforms.",
      "Improved usability and engagement by refining UX flows and ensuring consistent visual design across the platforms.",
    ],
  },
  {
    role: "Design Team Lead",
    company: "Volusion",
    domain: "volusion.com",
    period: "August 2011 — June 2013",
    bullets: [
      "Managed a team of 5–9 designers in the Volusion Client Services group, providing mentorship and guidance to improve productivity, design quality and team performance.",
      "Continued hands-on design and coding (HTML & CSS), delivering 10+ websites and branding projects per week.",
      "Ensured the team produced user-friendly designs that met client goals and deadlines.",
    ],
  },
];

const skills = [
  "Product Strategy",
  "Design Vision",
  "User Experience (UX)",
  "AI Patterns",
  "Information Architecture",
  "Accessibility (WCAG)",
  "Design Systems",
  "User Research",
  "Qualitative Research",
  "Quantitative Research",
  "Usability Testing",
  "Stakeholder Management",
  "Cross-Functional Collaboration",
  "Leadership & Mentorship",
  "Systems Thinking",
  "Problem Solving",
  "Prototyping",
  "UX Metrics",
  "Business KPIs",
  "Inclusive Design",
  "Storytelling",
  "Workshop Facilitation",
];

const programs = [
  "Figma",
  "UserBit",
  "Pendo",
  "Adobe CC",
  "Miro",
  "Optimal Workshop",
  "Usertesting.com",
  "Dovetail",
  "Jira",
  "Asana",
  "Slack",
  "HTML",
  "CSS",
  "Claude",
  "Claude Cowork",
  "ChatGPT",
  "Cursor",
  "GitHub",
  "Vercel",
  "Lovable",
  "Notion",
  "Amazon QuickSight",
];

const education = [
  {
    school: "Oklahoma State University",
    degree: "Bachelor of Fine Arts in Graphic Design",
  },
];

const recognition = [
  {
    label: "RecruitLoop — Top 50 Female UI/UX Designers",
    location: "Austin, Texas",
  },
  {
    label: "Built In ATX — Featured Employee at Bright Health",
    location: "Austin, Texas",
    href: "https://www.builtinaustin.com/company/bright-health/product-tech",
  },
];

// Small inline component for company favicon — uses DuckDuckGo's free favicon
// service. Returns a small ICO for any domain, no auth required.
function Favicon({ domain, alt }: { domain: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
      alt={alt}
      width={28}
      height={28}
      loading="lazy"
      className="inline-block w-7 h-7 object-contain align-middle"
    />
  );
}

export default function ResumePage() {
  return (
    <div className="page-shell">
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-12 lg:pb-16">
        <Reveal as="div" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
              Résumé · 2025
            </p>
            <h1 className="font-serif text-hero leading-[0.98]">
              Molly Francis
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-ink/75 max-w-2xl leading-relaxed">
              Lead Product Designer · Austin, Texas
            </p>
            <p className="mt-5 font-mono text-sm text-ink/60 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href="mailto:mfrancis7@mac.com"
                className="link-underline"
              >
                mfrancis7@mac.com
              </a>
              <span className="text-ink/30">·</span>
              <span>512.632.2364</span>
              <span className="text-ink/30">·</span>
              <a
                href="https://www.linkedin.com/in/mollyfrancisdesign"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                linkedin.com/mollyfrancisdesign
              </a>
              <span className="text-ink/30">·</span>
              <a href="https://www.mollyfrancis.com" className="link-underline">
                www.mollyfrancis.com
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton
              href="/molly-francis-resume.pdf"
              external
            >
              Download PDF ↗
            </MagneticButton>
            <a
              href="/molly-francis-resume-ats.pdf"
              target="_blank"
              rel="noreferrer"
              className="magnetic ghost"
            >
              ATS version ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* SUMMARY */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Hello
            </p>
          </Reveal>
          <Reveal as="div" className="lg:col-span-9 space-y-6">
            <p className="font-serif text-2xl lg:text-3xl leading-snug">
              {summary}
            </p>
            <blockquote className="pl-6 border-l-2 border-ochre max-w-2xl">
              <p className="font-serif italic text-lg lg:text-xl text-ink/80 leading-snug">
                &ldquo;{aside}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 mb-8">
          <Reveal as="div" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              Experience
            </p>
            <h2 className="font-serif text-h2">2011 — Present.</h2>
          </Reveal>
          <Reveal as="div" className="lg:col-span-9 self-end">
            <p className="text-ink/70 leading-relaxed max-w-2xl">
              See the{" "}
              <Link href="/#work" className="link-underline">
                case studies
              </Link>{" "}
              for the work in detail, or grab the PDF above for the print
              version.
            </p>
          </Reveal>
        </div>

        <div>
          {experience.map((job, i) => (
            <Reveal
              key={job.role + job.company + job.period}
              as="div"
              delay={i * 30}
              className="grid grid-cols-12 gap-4 lg:gap-8 py-10 border-t border-ink/10"
            >
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[18px] text-ink/40 leading-none mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  {job.period}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <div className="flex items-center gap-3 mb-1">
                  <Favicon domain={job.domain} alt={`${job.company} logo`} />
                  <p className="font-medium text-ink/80">{job.company}</p>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl leading-tight mb-5">
                  {job.role}
                </h3>
                <ul className="space-y-2 max-w-3xl">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-ink/75 leading-relaxed flex gap-3">
                      <span className="text-ochre mt-1.5 select-none">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink/50">
          See more experiences on{" "}
          <a
            href="https://www.linkedin.com/in/mollyfrancisdesign"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            linkedin.com/mollyfrancisdesign
          </a>
          .
        </p>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              Capabilities
            </p>
            <h2 className="font-serif text-h2">Skills.</h2>
          </Reveal>
          <Reveal as="div" className="lg:col-span-9">
            <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-10 space-y-1.5">
              {skills.map((s) => (
                <li key={s} className="text-ink/80 break-inside-avoid">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              Tooling
            </p>
            <h2 className="font-serif text-h2">Programs.</h2>
          </Reveal>
          <Reveal as="div" className="lg:col-span-9">
            <div className="flex flex-wrap gap-2">
              {programs.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION + RECOGNITION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
              Education
            </p>
            <h2 className="font-serif text-h2">School & recognition.</h2>
          </Reveal>
          <div className="lg:col-span-9 space-y-8">
            {education.map((e) => (
              <Reveal key={e.school} as="div" className="grid grid-cols-12 gap-4">
                <p className="col-span-12 lg:col-span-4 font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  University
                </p>
                <div className="col-span-12 lg:col-span-8">
                  <h3 className="font-serif text-xl">{e.school}</h3>
                  <p className="text-ink/70">{e.degree}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="div" className="grid grid-cols-12 gap-4 pt-8 border-t border-ink/10">
              <p className="col-span-12 lg:col-span-4 font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                Recognition
              </p>
              <ul className="col-span-12 lg:col-span-8 space-y-3">
                {recognition.map((r) => (
                  <li key={r.label}>
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline"
                      >
                        {r.label} ↗
                      </a>
                    ) : (
                      <span className="text-ink/80">{r.label}</span>
                    )}
                    {r.location && (
                      <span className="text-ink/50 text-sm ml-2">
                        · {r.location}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 border-t border-ink/10">
        <Reveal as="div" className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
            What&rsquo;s next
          </p>
          <h2 className="font-serif text-hero leading-[1.02]">
            Open to <em className="not-italic font-light text-ochre">Lead</em>,{" "}
            <em className="not-italic font-light text-ochre">Principal</em>, and{" "}
            <em className="not-italic font-light text-ochre">Staff</em> design
            roles.
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="mailto:mfrancis7@mac.com" className="magnetic">
              mfrancis7@mac.com →
            </a>
            <Link href="/contact" className="magnetic ghost">
              Project inquiry
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
