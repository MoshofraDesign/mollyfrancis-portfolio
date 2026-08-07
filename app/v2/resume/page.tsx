import Link from "next/link";
import V2Chrome from "@/components/v2/V2Chrome";
import HorizontalScroll from "@/components/v2/HorizontalScroll";

type Job = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

const experience: Job[] = [
  {
    role: "Lead Product Designer",
    company: "GovOS (Neumo)",
    period: "Oct 2023 — Oct 2025",
    bullets: [
      "UX strategy and design execution across eSubmission, Business Licensing & Tax, Cloud Search, and Cloud Records.",
      "Led accessibility, design systems, and scalable solutions for long-term public impact.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "Bright Health",
    period: "Mar 2021 — Apr 2023",
    bullets: [
      "Built a 0→1 provider portal for Prior Authorizations, replacing fax with real-time electronic submission and tracking.",
      "Managed two designers; co-created a WCAG 2.2 AA design system.",
      "Designed a telehealth app (desktop + native) for async/sync urgent visits.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "Care.com (HomePay)",
    period: "Apr 2020 — Feb 2021",
    bullets: [
      "Led the HomePay design team for payroll, tax, and HR serving household employers.",
      "Managed and scaled the UX team.",
    ],
  },
  {
    role: "Lead UX Designer",
    company: "LivePerson",
    period: "Jul 2019 — Feb 2020",
    bullets: [
      "Led design on a new social media management product for brand-consumer messaging.",
      "Scaled the company design system across AI/chatbot products.",
    ],
  },
  {
    role: "Principal Product Designer",
    company: "athenahealth",
    period: "Sep 2016 — Jun 2019",
    bullets: [
      "Research and design for desktop and native EHR + patient portal products.",
      "Led user testing that reduced errors and improved patient satisfaction.",
    ],
  },
  {
    role: "Lead Product Designer",
    company: "Patient IO",
    period: "Jul 2016 — Aug 2016",
    bullets: ["Head of Product Design for patient and care-manager apps."],
  },
  {
    role: "Senior UX Designer",
    company: "Volusion / Mozu",
    period: "Sep 2014 — Jun 2016",
    bullets: ["Interaction and visual design across the Volusion and Mozu ecommerce platforms."],
  },
  {
    role: "Design Team Lead",
    company: "Volusion",
    period: "Aug 2011 — Jun 2013",
    bullets: ["Managed 5–9 designers, delivering 10+ sites and branding projects per week."],
  },
];

const skills = [
  "Product Strategy",
  "User Experience (UX)",
  "AI Patterns",
  "Design Systems",
  "User Research",
  "Usability Testing",
  "Stakeholder Management",
  "Leadership & Mentorship",
  "Systems Thinking",
  "Prototyping",
  "Inclusive Design",
];

export default function V2Resume() {
  return (
    <main className="relative bg-[#f2f1ec]">
      <V2Chrome />

      <HorizontalScroll>
        {/* HEADER */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[60vw] shrink-0 flex-col justify-center gap-8 px-8 sm:px-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#141414]/50">
              Résumé — Lead Product Designer, Austin TX
            </p>
            <h1 className="mt-4 font-display uppercase leading-[0.86] text-[13vw] sm:text-[6.5vw]">
              Molly Francis
            </h1>
            <p className="mt-6 max-w-lg text-sm sm:text-base text-[#141414]/70">
              20+ years across UI/UX design, research, design systems, and
              strategy — integrating AI tools to move faster without losing
              rigor.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/molly-francis-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#141414] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f2f1ec] transition-opacity hover:opacity-70"
            >
              Download PDF ↗
            </a>
            <a
              href="mailto:mfrancis7@mac.com"
              className="rounded-full border border-[#141414]/30 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f2f1ec]"
            >
              mfrancis7@mac.com
            </a>
          </div>
        </section>

        {/* EXPERIENCE PANELS */}
        {experience.map((job, i) => (
          <section
            key={job.role + job.company}
            className="flex h-[100dvh] w-[92vw] sm:w-[46vw] shrink-0 flex-col justify-center gap-6 border-l border-[#141414]/10 px-8 sm:px-16"
          >
            <p className="font-display text-[#141414]/30 text-3xl sm:text-4xl">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#141414]/50">
                {job.company} · {job.period}
              </p>
              <h2 className="mt-3 font-display uppercase leading-[0.9] text-[8vw] sm:text-[3.2vw]">
                {job.role}
              </h2>
            </div>
            <ul className="space-y-2 max-w-md">
              {job.bullets.map((b) => (
                <li key={b} className="text-sm sm:text-base text-[#141414]/70">
                  {b}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* SKILLS */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[54vw] shrink-0 flex-col justify-center gap-8 border-l border-[#141414]/10 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#141414]/50">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#141414]/20 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.05em]"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[46vw] shrink-0 flex-col justify-center gap-6 border-l border-[#141414]/10 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#141414]/50">
            Education
          </p>
          <h2 className="font-display uppercase leading-[0.9] text-[7vw] sm:text-[2.6vw]">
            BFA, Graphic Design — Oklahoma State University
          </h2>
          <p className="text-sm sm:text-base text-[#141414]/60">
            RecruitLoop Top 50 Female UI/UX Designers, Austin. Built In ATX
            featured employee, Bright Health.
          </p>
        </section>

        {/* CTA */}
        <section className="flex h-[100dvh] w-[86vw] sm:w-[42vw] shrink-0 flex-col items-start justify-center gap-8 border-l border-[#141414]/10 px-8 sm:px-16">
          <h2 className="font-display uppercase leading-[0.88] text-[10vw] sm:text-[4vw]">
            Open to Lead
            <br />
            & Principal roles.
          </h2>
          <Link
            href="/v2/contact"
            className="rounded-full border border-[#141414]/30 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f2f1ec]"
          >
            Get in touch
          </Link>
        </section>
      </HorizontalScroll>
    </main>
  );
}
