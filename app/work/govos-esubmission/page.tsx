import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

const SLUG = "govos-esubmission";

// ── usability findings, extracted from the Userbit research slide ──
const FINDINGS = [
  {
    title: "Optional Fields",
    impact: 1,
    finding:
      "Several instances of users not realizing that not all fields were required.",
    fix: "Add instructional text letting the users know that only fields with a red indicator are required.",
  },
  {
    title: "Loading Time",
    impact: 5,
    finding:
      "Loading pages took some time; however, the test occurred on a QA environment, so some speed issues were expected.",
    fix: "Monitor and address as needed when moved to production.",
  },
  {
    title: "Continue Step",
    impact: 1,
    finding:
      "Multiple users had a difficult time understanding why the Continue button wasn't enabled on the Document Details.",
    fix: "Always enable the button and allow the user to click it to display an error dialog with instructions.",
  },
  {
    title: "Navigation",
    impact: 2,
    finding:
      "The navigation between files had scrolled out of the viewable area.",
    fix: "Do not allow the navigation between documents to scroll off of the page.",
  },
  {
    title: "Confusion on Error",
    impact: 1,
    finding:
      "There was no error/incomplete indicator unless you clicked the dropdown to show the list of files.",
    fix: "Show the documents as tabs with separate success/error indicators.",
  },
  {
    title: "Error Description",
    impact: 1,
    finding:
      "It was difficult to locate the description of the file error during upload.",
    fix: "Improve the error message indicator or show a pop-up to make the error more discoverable.",
  },
];

export function generateMetadata() {
  const p = getProject(SLUG);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.client} — Molly Francis`,
    description: p.aiSummary,
  };
}

// ── small section helper: a bare UI screenshot, no frame around it ──
function UIScreen({
  src,
  alt,
  width = 1400,
  height = 900,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 1024px) 100vw, 60vw"
      className="w-full h-auto"
    />
  );
}

export default function GovOSCaseStudy() {
  const project = getProject(SLUG);
  if (!project) return null;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="page-shell">
      {/* HERO ─────────────────────────────────────────────────────── */}
      <header
        className="relative pt-8 pb-20 lg:pb-28 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${project.accent}18 0%, transparent 90%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-8 text-sm">
            <Link href="/work" className="link-underline text-ink/60">
              ← Back to work
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-ink/60">{project.client}</span>
          </div>

          <Reveal as="div">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
              {project.client} · {project.year}
            </p>
            <h1 className="font-serif text-hero max-w-4xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl text-ink/75 leading-relaxed">
              {project.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* META BAR ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 -mt-8 lg:-mt-12 mb-16">
        <Reveal
          as="div"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 p-6 lg:p-8 rounded-md bg-white border border-ink/10"
        >
          {[
            { l: "Role", v: project.role },
            { l: "Client", v: project.client },
            { l: "Year", v: project.year },
            { l: "Discipline", v: project.tags.slice(0, 2).join(" · ") },
          ].map((m) => (
            <div key={m.l}>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40 mb-2">
                {m.l}
              </p>
              <p className="font-serif text-lg leading-tight">{m.v}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* AI SUMMARY ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <Reveal
          as="div"
          className="relative p-8 lg:p-12 rounded-md bg-ink text-cream overflow-hidden"
        >
          <div
            className="absolute -top-10 -right-10 w-72 h-72 rounded-full blur-3xl opacity-60"
            style={{ background: project.accent }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-cream/15 text-xs font-mono">
                AI
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-cream/60">
                Generated summary
              </p>
            </div>
            <p className="font-serif text-2xl lg:text-3xl leading-snug max-w-3xl">
              {project.aiSummary}
            </p>
          </div>
        </Reveal>
      </section>

      {/* HERO IMAGE ──────────────────────────────────────────────── */}
      {project.hero && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8 overflow-hidden">
          <Reveal as="div">
            <Image
              src={project.hero}
              alt="GovOS eSubmission dashboard on a laptop — all submissions, statuses, and team at a glance"
              width={886}
              height={589}
              sizes="(max-width: 1024px) 100vw, 886px"
              className="w-full max-w-4xl mx-auto h-auto"
              priority
            />
          </Reveal>
        </section>
      )}

      {/* OVERVIEW ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Overview
            </p>
          </Reveal>
          <Reveal as="div" className="lg:col-span-8 space-y-5">
            <p className="font-serif text-2xl leading-snug">
              {project.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE OBJECTIVE — text-only (no slide image) ──────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal as="div" className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
              The objective
            </p>
            <h2 className="font-serif text-h1 leading-[1.05]">
              Simplified recording, end&nbsp;to&nbsp;end.
            </h2>
          </Reveal>
          <Reveal as="div" className="lg:col-span-8" delay={80}>
            <p className="font-serif text-2xl leading-snug mb-10">
              Give Submitters — title companies or any county-approved entity — an
              interface to send electronic recordings directly to the County, without
              the relay layer in between.
            </p>
            <ul className="space-y-4">
              {[
                "Obviate the need for Submitters to physically present documents at a county office.",
                "Enhance the Recorder's office productivity by removing the manual scan step.",
                "Streamline payment into a single bulk ACH transfer per Submitter.",
                "Let counties provide direct customer service to their Submitters.",
              ].map((b, i) => (
                <li
                  key={b}
                  className="flex gap-4 py-4 border-b border-ink/10"
                >
                  <span className="font-mono text-[18px] text-ochre leading-none mt-1">
                    0{i + 1}
                  </span>
                  <span className="text-lg text-ink/80 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* THE PROBLEM ─────────────────────────────────────────────── */}
      {project.problem && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
                The problem
              </p>
              <h2 className="font-serif text-h1 leading-[1.05]">
                Indirect. Expensive. Invisible.
              </h2>
            </Reveal>
            <Reveal as="div" className="lg:col-span-8" delay={80}>
              <p className="font-serif text-2xl leading-snug">
                {project.problem}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* LOGIN — Remember the user ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-7 lg:order-2">
            <UIScreen
              src="/work/govos/login.jpg"
              alt="GovOS eSubmission home dashboard — recent submissions, package counts, and team members"
            />
          </Reveal>
          <Reveal as="div" className="lg:col-span-5 lg:order-1" delay={80}>
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Remember the user
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              Quick and compliant submissions start at sign-in.
            </h2>
            <p className="text-lg text-ink/80 leading-relaxed mb-6">
              Sign-in opens on a sense of place: where the submitter left off, which
              submission types they reach for, and a running history of recent
              packages.
            </p>
            <ul className="space-y-3 text-base text-ink/75">
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>Remembered recent submission types</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>Start where they left off</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>Recent submission history</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SUBMISSION FLOW ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Submission flow
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              A flow that helps business and government work efficiently.
            </h2>
            <ul className="space-y-4 text-lg text-ink/80 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>
                  Always know where you are in the submission process by referencing
                  the progress bar.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>
                  The step-by-step process puts the focus on the task at hand and
                  removes unnecessary inputs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>
                  Easily navigate to previous steps or save your progress on a
                  submission and finish it later.
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal as="div" className="lg:col-span-7" delay={80}>
            <UIScreen
              src="/work/govos/submission-flow.jpg"
              alt="Step-by-step submission flow with persistent progress bar and document preview"
            />
          </Reveal>
        </div>
      </section>

      {/* DOCUMENT REVIEW ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-7 lg:order-2">
            <UIScreen
              src="/work/govos/document-review.jpg"
              alt="Document compliance review screen with error states and replace-document affordance"
            />
          </Reveal>
          <Reveal as="div" className="lg:col-span-5 lg:order-1" delay={80}>
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Document review
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              Clear images. A review assistant for compliance.
            </h2>
            <p className="text-lg text-ink/80 leading-relaxed">
              eSubmission mitigates the most common rejection causes by guiding the
              user inline and giving them the option to replace a document mid-process —
              so packages move to recording on the first try.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CHECKOUT ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Checkout
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              Checkout with ease — and send additional notices of the transaction.
            </h2>
            <p className="text-lg text-ink/80 leading-relaxed">
              Submitters share receipts of the submission transaction downstream into
              their accounting flow, without copying numbers by hand.
            </p>
          </Reveal>
          <Reveal as="div" className="lg:col-span-7" delay={80}>
            <UIScreen
              src="/work/govos/checkout.jpg"
              alt="Add Document Details step with instrument type selection and remember-this-type checkbox"
            />
          </Reveal>
        </div>
      </section>

      {/* ACH PAYMENT ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal as="div" className="lg:col-span-7 lg:order-2">
            <UIScreen
              src="/work/govos/ach-payment.jpg"
              alt="Company payment methods screen with stored credit card and ACH reconciliation"
            />
          </Reveal>
          <Reveal as="div" className="lg:col-span-5 lg:order-1" delay={80}>
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Payment fulfillment &amp; reporting
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              One ACH transfer per period, per submitter.
            </h2>
            <ul className="space-y-4 text-lg text-ink/80 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>
                  Payments are fulfilled by initiating ACH with each submitter.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>
                  The county runs an ACH report for a time period and a title
                  company — surfacing the total amount due to the county.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-ochre mt-1">·</span>
                <span>The county authorizes the ACH transaction.</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* RESEARCH ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal as="div" className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-4">
              Research &amp; validation
            </p>
            <h2 className="font-serif text-h1 mb-6 leading-[1.05]">
              Findings, ranked and routed the same day.
            </h2>
            <p className="text-lg text-ink/80 leading-relaxed mb-8">
              Each Userbit usability session surfaced a dozen-plus issues. Dovetail
              clustered the transcripts into themes; an in-house GPT prompt
              translated findings into impact/effort-sorted Jira tickets the day
              after — so the next sprint didn&rsquo;t wait on synthesis.
            </p>
            {project.research && (
              <ul className="space-y-3">
                {project.research.map((r, i) => (
                  <li
                    key={r}
                    className="flex gap-4 py-3 border-b border-ink/10"
                  >
                    <span className="font-mono text-[18px] text-ochre leading-none mt-1">
                      0{i + 1}
                    </span>
                    <span className="text-base text-ink/80">{r}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal as="div" className="lg:col-span-7" delay={80}>
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40">
                Top findings
              </p>
              <p className="text-xs text-ink/40">Impact: 1 = high · 5 = low</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10">
              {FINDINGS.map((f, i) => (
                <div key={f.title} className="py-6 border-b border-ink/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-[18px] text-ochre leading-none">
                      0{i + 1}
                    </span>
                    <span className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`inline-block w-4 h-4 rounded-[3px] text-center font-mono text-[10px] leading-4 ${
                            n === f.impact
                              ? f.impact <= 2
                                ? "bg-ochre/20 text-ink font-semibold"
                                : "bg-ink/10 text-ink font-semibold"
                              : "bg-ink/[0.04] text-ink/30"
                          }`}
                        >
                          {n}
                        </span>
                      ))}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl mb-2 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed mb-2">
                    {f.finding}
                  </p>
                  <p className="text-sm text-ink/75 leading-relaxed">
                    <span className="font-semibold text-ink">Fix: </span>
                    {f.fix}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOME ─────────────────────────────────────────────────── */}
      {project.outcome && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 border-t border-ink/10">
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal as="div" className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-ochre mb-3">
                Outcome
              </p>
              <h2 className="font-serif text-h1 leading-[1.05]">
                Self-serve, in production.
              </h2>
            </Reveal>
            <Reveal as="div" className="lg:col-span-8" delay={80}>
              <p className="font-serif text-2xl leading-snug">
                {project.outcome}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* PROTOTYPE CTA ───────────────────────────────────────────── */}
      {project.prototype && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-ink/10">
          <Reveal
            as="div"
            className="rounded-md bg-ochre/10 p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-3">
                Try it
              </p>
              <h3 className="font-serif text-h2">Live Figma prototype</h3>
            </div>
            <MagneticButton href={project.prototype} external>
              Open prototype ↗
            </MagneticButton>
          </Reveal>
        </section>
      )}

      {/* NEXT PROJECT ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 border-t border-ink/10">
        <Reveal as="div">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            Up next
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="group block py-12 border-y border-ink/15"
          >
            <div className="flex items-center justify-between gap-8">
              <div>
                <p className="text-sm text-ink/60 mb-2">{next.client}</p>
                <h2 className="font-serif text-hero group-hover:text-ochre transition-colors">
                  {next.title}
                </h2>
              </div>
              <span className="font-serif text-6xl lg:text-8xl group-hover:translate-x-4 transition-transform">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
