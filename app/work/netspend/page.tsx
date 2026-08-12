import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { projects, getProject } from "@/lib/projects";
import HorizontalScroll from "@/components/v2/HorizontalScroll";
import StickyNav from "@/components/StickyNav";
import SlideIn from "@/components/SlideIn";
import { contrastColor } from "@/lib/contrastColor";
import { Panel, TextPanel, Heading, Body } from "@/components/v2/CaseStudyKit";

/**
 * Bespoke horizontal-scroll case study for Netspend Rewards + UCM.
 * Images: drop exports into /public/work/netspend/ and swap the
 * placeholder paths below. Excluded from the generic template via
 * customSlugs in app/work/[slug]/page.tsx.
 */

export const metadata = {
  title: "Netspend Rewards & UCM — Molly Francis",
  description:
    "Designed both sides of Netspend's rewards platform — the internal Unified Commerce Management tool built 0→1 in 5 months, and the consumer-facing Rewards Tab redesign.",
};

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const ACCENT = "#313131";
const LOGO = "/logos/netspend.svg";

function ScreenPlaceholder({
  label,
  aspect = "aspect-[16/10]",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div className={`${aspect} w-full rounded-xl flex items-center justify-center border border-white/10 bg-white/5 ${className}`}>
      <p className="text-white/30 text-sm font-medium text-center px-4">{label}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none text-white">{value}</p>
      <p className="text-sm text-white/60 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ProblemRow({ n, heading, body }: { n: string; heading: string; body: string }) {
  return (
    <SlideIn>
      <div className="grid grid-cols-[2rem_1fr] gap-4 py-6 border-t border-white/10">
        <p className="font-semibold text-white/30 text-sm pt-1">{n}</p>
        <div>
          <p className="font-semibold text-white mb-1 text-lg leading-snug">{heading}</p>
          <p className="text-white/60 leading-relaxed text-sm">{body}</p>
        </div>
      </div>
    </SlideIn>
  );
}

export default function NetspendCaseStudy() {
  const project = getProject("netspend");
  const idx = projects.findIndex((p) => p.slug === "netspend");
  const next = projects[(idx + 1) % projects.length];
  const fg = contrastColor(ACCENT);

  return (
    <main
      className={`${jost.variable} relative`}
      style={{ background: ACCENT, color: fg, fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <StickyNav
        watch="title"
        logo={
          <div className="relative h-6 w-[110px] sm:h-7 sm:w-[130px]">
            <Image src={LOGO} alt="Netspend" fill unoptimized className="object-contain object-left" />
          </div>
        }
        action={
          <Link
            href="/"
            aria-label="Back to home"
            className="pointer-events-auto -m-3 flex min-h-11 min-w-11 items-center justify-center p-3 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] transition-opacity hover:opacity-60"
          >
            Close
          </Link>
        }
      />

      <HorizontalScroll>

        {/* ── PANEL 1: HERO ─────────────────────────────────────────── */}
        <section
          id="title"
          className="relative flex w-full flex-col gap-8 overflow-hidden px-6 pb-10 pt-6 sm:px-10 lg:h-[100dvh] lg:w-screen lg:shrink-0 lg:snap-start lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          <div className="relative h-8 w-[140px] sm:h-10 sm:w-[180px] lg:absolute lg:left-[6.94vw] lg:top-[10vh]">
            <Image src={LOGO} alt="Netspend" fill unoptimized priority className="object-contain object-left" />
          </div>

          <div className="flex flex-1 flex-col justify-center lg:absolute lg:left-[6.94vw] lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[52vw]">
            <SlideIn>
              <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-4">FinTech · Rewards · Internal Tools</p>
              <h1 className="font-semibold leading-[1.1] text-white text-[clamp(2rem,5.5vw,4.5rem)]">
                Netspend Rewards &amp; the UCM Platform
              </h1>
              <p className="mt-5 text-white/70 leading-relaxed text-[clamp(1rem,1.8vw,1.35rem)] max-w-[52ch]">
                Designed both sides of the same system — the internal Unified Commerce
                Management tool the rewards team uses to build every offer, and the
                consumer Rewards Tab cardholders see in the app.
              </p>
            </SlideIn>
            <SlideIn delay={150} className="mt-10 flex flex-wrap gap-10">
              <Stat value="0 → 1" label="UCM built from scratch" />
              <Stat value="5 mo." label="Concept to handoff" />
              <Stat value="$10M" label="Revenue target" />
            </SlideIn>
          </div>

          <SlideIn delay={100} className="lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[40vw] flex items-center justify-center p-6 lg:p-0">
            <ScreenPlaceholder
              label="UCM Dashboard — drop Figma export here"
              aspect="aspect-[4/3]"
              className="lg:h-full lg:aspect-auto lg:rounded-none lg:rounded-l-3xl"
            />
          </SlideIn>
        </section>

        {/* ── PANEL 2: CONTEXT ──────────────────────────────────────── */}
        <TextPanel>
          <Heading>From spreadsheets to a single platform</Heading>
          <Body>
            Netspend&rsquo;s Rewards program — powering cashback, affiliate offers, and
            partner campaigns for millions of cardholders — was managed through a legacy
            system called Meridian, built on a siloed tech stack that couldn&rsquo;t keep up
            with the business. Internally, the team had no dedicated tool. Campaigns were
            configured manually, data lived in Excel, and there was no single place to see
            what was live, what was performing, and what needed attention.
          </Body>
          <Body className="mt-4">
            This was a{" "}
            <span className="text-white font-semibold">0 to 1 build</span> —
            no prior internal tool existed. From first wireframe to a fully
            designed, handoff-ready product in{" "}
            <span className="text-white font-semibold">5 months</span>, while
            running parallel design on the consumer Rewards Tab redesign.
          </Body>
        </TextPanel>

        {/* ── PANEL 3: THE PROBLEMS ─────────────────────────────────── */}
        <Panel width="lg:w-[92vw]" className="items-start">
          <div className="grid w-full max-w-[1300px] gap-12 lg:grid-cols-2 lg:gap-16">
            <SlideIn>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6">Internal users — the rewards team</p>
              <ProblemRow n="01" heading="No dedicated management tool" body="Everything lived in spreadsheets. No single place to see what was live, what was running, or what needed attention." />
              <ProblemRow n="02" heading="No visibility into performance" body="Campaign data required exporting to a third-party tool (Click) — the dashboard was just a link out, defeating the purpose of a unified platform." />
              <ProblemRow n="03" heading="Fragmented campaign setup" body="No wizard, no validation, no review step. Setting up a new offer flight was error-prone and not learnable for new team members." />
              <ProblemRow n="04" heading="Manual asset compliance" body="Partner logos had to be collected and uploaded manually — creating compliance risks with brands like CVS and T-Mobile who require approval for use of their likeness." />
              <ProblemRow n="05" heading="No executive revenue view" body="Cashback, commission by advertiser, and flat fee spend existed in siloed exports. No single-screen view as revenue grew toward a $10M target." />
            </SlideIn>

            <SlideIn delay={100}>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6">Consumer users — Netspend cardholders</p>
              <ProblemRow n="01" heading="No personalization" body="Every cardholder saw the same flat list of offers regardless of spending history. New users got the identical experience as power users." />
              <ProblemRow n="02" heading="No category-based browsing" body="Finding a relevant offer required scrolling through everything. No filtering by Dining, Grocery, Gas, or any other category." />
              <ProblemRow n="03" heading="Search was unclear or absent" body="No reliable way to find a specific merchant. Search scope, autocomplete behavior, and icon vs. open bar were all unvalidated." />
              <ProblemRow n="04" heading="Earnings transparency was missing" body="Users couldn't easily find or understand their total earned vs. pending cashback breakdown from the main dashboard." />
              <ProblemRow n="05" heading="Active vs. upcoming offers — indistinguishable" body="No clear differentiation between available deals and future locked rewards. Users had no sense of when upcoming offers would become active." />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 4: OBJECTIVES ───────────────────────────────────── */}
        <Panel width="lg:w-[88vw]" className="items-start">
          <div className="grid w-full max-w-[1300px] gap-12 lg:grid-cols-2 lg:gap-16">
            <SlideIn>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Objectives</p>
              <h2 className="font-semibold text-white text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] mb-8">UCM internal tool</h2>
              {[
                ["Wizard-based campaign setup", "Step-by-step flow for advertisers, campaigns, and offer flights — with validation and a review step — making setup learnable and error-resistant."],
                ["Dashboard with live revenue metrics", "Pull cashback, commission by advertiser, and flat fee spend directly into the platform so executives have one source of truth without leaving UCM."],
                ["Left-nav direct access", "Advertisers, Campaigns, Flights, and Target Criteria as top-level nav items — matching how the team actually thinks about the work."],
                ["External media library", "Partner-facing upload link where brands submit their own assets, agree to compliance terms, and have approval recorded — eliminating a manual bottleneck."],
                ["Transaction Engine", "A surface for the team to manually review and credit transactions not captured correctly by the rewards engine."],
              ].map(([h, b]) => (
                <SlideIn key={h as string}>
                  <div className="py-5 border-t border-white/10">
                    <p className="text-white font-medium mb-1">{h}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{b}</p>
                  </div>
                </SlideIn>
              ))}
            </SlideIn>

            <SlideIn delay={100}>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 lg:opacity-0">Objectives</p>
              <h2 className="font-semibold text-white text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] mb-8">Consumer Rewards Tab</h2>
              {[
                ["Personalization architecture", "Affinity scoring for existing users. Conditional fallbacks — trending, new member perks, everyday essentials, hyper-local — for zero-transaction users."],
                ["Category-based navigation", "Universal taxonomy (Dining, Fashion, Tech, Travel) across all offer types. Dynamic sorting based on individual spend history."],
                ["Earnings transparency", "A first-class entry point for earned vs. pending cashback — findable from the main dashboard without hunting."],
                ["10-goal usability test plan", "Covering search discoverability, category filtering, feed layout, offer redundancy, and upcoming offer differentiation — validated before engineering handoff."],
                ["Global search", "Persistent search bar scoped to merchant name, with clear autocomplete and a helpful zero-results state."],
              ].map(([h, b]) => (
                <SlideIn key={h as string}>
                  <div className="py-5 border-t border-white/10">
                    <p className="text-white font-medium mb-1">{h}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{b}</p>
                  </div>
                </SlideIn>
              ))}
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 5: UCM SCREENS ──────────────────────────────────── */}
        <Panel width="lg:w-[90vw]" className="items-center">
          <SlideIn className="w-full mb-8">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Internal tool</p>
            <h2 className="font-semibold text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2]">UCM — the rewards command center</h2>
          </SlideIn>
          <div className="grid w-full gap-4 lg:grid-cols-3">
            <SlideIn className="lg:col-span-2">
              <ScreenPlaceholder label="UCM Dashboard — revenue metrics, chart integration" aspect="aspect-[16/10]" />
            </SlideIn>
            <SlideIn delay={80}>
              <ScreenPlaceholder label="Left nav — Advertisers, Campaigns, Flights, Target Criteria" aspect="aspect-[16/10]" />
            </SlideIn>
            <SlideIn delay={120}>
              <ScreenPlaceholder label="Campaign wizard — setup flow with review step" aspect="aspect-[16/10]" />
            </SlideIn>
            <SlideIn delay={160}>
              <ScreenPlaceholder label="Flight setup — offer configuration wizard" aspect="aspect-[16/10]" />
            </SlideIn>
            <SlideIn delay={200}>
              <ScreenPlaceholder label="Advertiser details — view + edit flow" aspect="aspect-[16/10]" />
            </SlideIn>
          </div>
        </Panel>

        {/* ── PANEL 6: KEY DECISIONS ────────────────────────────────── */}
        <TextPanel>
          <Heading>Key design decisions</Heading>
          <Body>
            <span className="text-white font-semibold">Wizard over inline editing.</span>{" "}
            After reviewing two options with stakeholders — inline editing with a save button
            vs. a view-mode that returns to the wizard on edit — the team aligned on the
            wizard approach. Campaigns aren&rsquo;t edited frequently, and a clean view page
            with a prominent edit button returning to the familiar wizard was more practical
            and less error-prone.
          </Body>
          <Body className="mt-4">
            <span className="text-white font-semibold">Dashboard integration, not a link out.</span>{" "}
            A key decision was pushing for chart and data integration directly into the
            platform rather than linking to Click. As revenue grows toward a $10M goal,
            executives will be logging in regularly. A link to a third-party tool defeats
            the purpose of a unified platform.
          </Body>
          <Body className="mt-4">
            <span className="text-white font-semibold">Conditional personalization for new users.</span>{" "}
            For cardholders with no transaction history, the &ldquo;For You&rdquo; section
            needed a fallback. Rather than pick one approach, I designed the architecture
            to support conditional logic — trending offers, new member perks, everyday
            essentials, or hyper-local — so the team can A/B test which performs best.
          </Body>
        </TextPanel>

        {/* ── PANEL 7: CONSUMER SCREENS ─────────────────────────────── */}
        <Panel width="lg:w-[90vw]" className="items-center">
          <SlideIn className="w-full mb-8">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Consumer experience</p>
            <h2 className="font-semibold text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2]">Rewards Tab — personalized, browsable, transparent</h2>
          </SlideIn>
          <div className="grid w-full gap-4 lg:grid-cols-4">
            {[
              ["For You — personalized feed (existing user)", "aspect-[9/16]"],
              ["New Member Perks — zero-transaction fallback", "aspect-[9/16]"],
              ["Category browsing — pills / filter nav", "aspect-[9/16]"],
              ["Earnings — earned vs. pending cashback", "aspect-[9/16]"],
              ["Search — open bar with autocomplete", "aspect-[9/16]"],
              ["Zero results — helpful fallback state", "aspect-[9/16]"],
              ["Upcoming offers — locked vs. active", "aspect-[9/16]"],
              ["Tile vs. horizontal scroll — UT comparison", "aspect-[9/16]"],
            ].map(([label, aspect], i) => (
              <SlideIn key={label as string} delay={i * 50}>
                <ScreenPlaceholder label={label as string} aspect={aspect as string} />
              </SlideIn>
            ))}
          </div>
        </Panel>

        {/* ── PANEL 8: SYSTEM FLOW ──────────────────────────────────── */}
        <Panel width="lg:w-[80vw]" className="items-center">
          <SlideIn className="w-full max-w-[900px]">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">System flow</p>
            <h2 className="font-semibold text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] mb-4">
              What&rsquo;s set up in UCM is what the cardholder sees
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 max-w-[60ch]">
              The two products are two sides of the same data model. An advertiser configured
              in UCM, with a campaign and an active offer flight, maps directly to what surfaces
              in the consumer Rewards Tab — category, offer type, reward amount, and eligibility
              logic all flow through.
            </p>
            <ScreenPlaceholder label="System diagram — UCM to consumer app data flow" aspect="aspect-[16/7]" />
          </SlideIn>
        </Panel>

        {/* ── PANEL 9: OUTCOMES ─────────────────────────────────────── */}
        <Panel width="lg:w-[72vw]" className="items-start">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-8">Outcomes</p>
          <div className="grid gap-10 sm:grid-cols-2 w-full max-w-[900px]">
            {[
              ["0 → 1 in 5 months", "The UCM tool went from no existing product to a fully designed, handoff-ready platform covering advertiser onboarding, campaign management, offer flight configuration, revenue dashboard, and media library."],
              ["Dev starts end of June 2026", "Development scoped to begin end of June / early July, with a target launch by end of year."],
              ["$500K → $2.5–3M revenue growth", "Rewards revenue projected to grow from ~$500K (2025) toward a $10M target. UCM and the consumer redesign are the infrastructure that makes that growth manageable and scalable."],
              ["10 UT goals, pre-handoff", "A structured usability test plan covering search, category filtering, layout preference, earnings transparency, and offer discoverability — validated before engineering picks up the consumer tab."],
              ["AI-augmented process", "Used Claude, Gemini, and Figma Make throughout — for research synthesis, rapid prototyping, and exploring more layout directions per round than a manual process would allow."],
              ["Parallel product ownership", "Owned design across both products simultaneously, working with the rewards team, engineering, and stakeholders including the Director of Rewards and the internal operations team."],
            ].map(([heading, body], i) => (
              <SlideIn key={heading as string} delay={i * 60}>
                <div className="border-t border-white/15 pt-6">
                  <p className="font-semibold text-white mb-2 text-lg leading-snug">{heading}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </Panel>

        {/* ── NEXT PROJECT ──────────────────────────────────────────── */}
        <Link
          href={`/work/${next.slug}`}
          className="group relative flex w-full flex-col justify-center bg-[#141414] px-6 py-20 text-[#f5f5f5] sm:px-12 sm:py-24 lg:h-[100dvh] lg:w-[56vw] lg:shrink-0 lg:snap-start lg:px-[7%] lg:py-0"
        >
          <p className="text-[clamp(0.95rem,2.2vw,1.1rem)] font-normal text-white/50 sm:text-[1vw]">
            Up next — {next.client}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,7vw,3.5rem)] font-semibold leading-[1.1] transition-transform group-hover:translate-x-3 sm:text-[4vw]">
            {next.title} →
          </h2>
        </Link>

      </HorizontalScroll>
    </main>
  );
}
