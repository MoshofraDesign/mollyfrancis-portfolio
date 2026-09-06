export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  thumbnail: string;
  hero?: string;
  // White/single-color wordmark or mark shown over the accent overlay on
  // the homepage grid tile — see CareGrid. Falls back to no mark at all
  // (never rendered HTML text) if unset.
  logo?: string;
  /** A wider cut of the mark, for the Up next band where a stacked lockup
   *  reads too small next to the wordmarks. Falls back to `logo`. */
  logoWide?: string;
  /** Multiplier on the Up next band mark, for the few whose lockup reads
   *  large or small at the shared cap. 1 when unset. */
  logoBandScale?: number;
  // Per-project size multiplier for the thumbnail logo (CareGrid), since
  // logo aspect ratios vary a lot — defaults to 1 when unset.
  logoScale?: number;
  accent: string;
  // AI-enhanced description (generated, 2-3 sentences)
  aiSummary: string;
  // Longer overview for case-study pages
  overview: string;
  problem?: string;
  // Supporting diagrams/screenshots shown alongside the Problem statement
  problemImages?: { src: string; caption?: string }[];
  // Objective statement — the target state, paired with optional bullets
  objective?: string;
  objectiveBullets?: string[];
  approach?: string;
  outcome?: string;
  metrics?: { label: string; value: string }[];
  research?: string[];
  images?: { src: string; caption?: string }[];
  // Rich feature panels: heading + body/bullets, paired with an optional
  // screenshot and/or screen-recording video, rendered in order.
  features?: {
    eyebrow: string;
    heading: string;
    body?: string;
    bullets?: string[];
    image?: string;
    imageCaption?: string;
    video?: string;
    videoCaption?: string;
  }[];
  prototype?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    // NOTE: year is a placeholder — confirm/adjust before this ships.
    slug: "netspend",
    title: "Netspend Rewards",
    subtitle:
      "A customer-facing rewards app, and the internal tool that builds every reward in it",
    client: "Netspend",
    year: "2024–2026",
    role: "Lead UX Designer",
    tags: ["FinTech", "Rewards", "Design system", "AI-augmented workflow"],
    thumbnail: "/work-thumbnails/netspend.webp",
    hero: "/work/netspend/debit-cards-falling.png",
    logo: "/logos/netspend.svg",
    accent: "#313131",
    featured: true,
    prototype: "/work/netspend/ucm/index.html",
    aiSummary:
      "Led UX for Netspend's app Rewards program and UCM, the internal tool that builds every reward shown to cardholders. Used generative research and AI-assisted prototyping (Claude, Gemini, Figma Make) to scale the IA as new reward types shipped.",
    overview:
      "Rewards needed a consumer layout that could keep pace with UCM — new reward types, new merchants, more configuration — without turning into a junk drawer.",
    approach:
      "Owned both sides: the internal UCM tool ops teams use to build rewards, and the consumer IA that has to scale with it. Generative and moderated testing drove both, with AI tools speeding up synthesis and prototyping.",
    outcome:
      "A consumer rewards IA that scales as UCM ships new reward types, and an internal tool that lets non-technical teams configure rewards without engineering tickets.",
  },
  {
    slug: "govos-esubmission",
    title: "GovOS eSubmission",
    subtitle:
      "A direct-to-county electronic recording portal that takes the middleman out of land records",
    client: "GovOS",
    year: "2023–2024",
    role: "Lead Product Designer",
    tags: ["GovTech", "B2B", "Workflow", "AI-augmented research", "Design system"],
    thumbnail: "/work-thumbnails/govos-esubmission-figma.webp",
    hero: "/work/govos/hero-laptop.webp",
    logo: "/logos/govos-esubmission-figma.svg",
    logoScale: 0.75,
    accent: "#0091CF",
    featured: true,
    aiSummary:
      "Designed a direct-to-county eRecording portal so title companies could submit deeds electronically — cutting out the third-party submitters that sat between them. AI-assisted synthesis (Dovetail transcript clustering, GPT-generated Jira tickets) kept research turnaround fast.",
    overview:
      "Recording a deed meant faxing a third-party submitter who relayed it to the county. eSubmission gave title companies a direct channel — upload, validate, and pay by ACH — with clean structured data flowing straight to the county.",
    problem:
      "Electronic recording ran through paid intermediaries. Counties re-scanned every fax by hand, reconciliation was a per-document mess, and submitters had zero status visibility.",
    problemImages: [
      {
        src: "/work/govos/problem-before.jpg",
        caption:
          "Every submission and every county question passed through a third-party eRecording vendor — neither side could reach the other directly.",
      },
      {
        src: "/work/govos/problem-challenges-submitters.jpg",
        caption: "Challenges for submitters",
      },
      {
        src: "/work/govos/problem-challenges-counties.jpg",
        caption: "Challenges for counties",
      },
    ],
    objective:
      "Give Submitters — title companies or any county-approved entity — a direct interface to submit electronic recordings to the County, without the relay layer in between.",
    objectiveBullets: [
      "Obviating the need for Submitters to physically present the documents in a county office",
      "Enhancing the productivity of the Recorder's office by not having to scan the recording",
      "Streamline payment into a bulk wire transfer (ACH) for each Submitter",
    ],
    approach:
      "Led discovery through rollout. Generative interviews with submitters and county recorders shaped a step-by-step flow with a progress bar, an inline compliance-review assistant, and consolidated ACH checkout. Usability testing in Userbit surfaced 12+ issues per round, synthesized in Dovetail and triaged into Jira with the PM.",
    outcome:
      "Shipped as a self-serve product. Cuyahoga County called it \"a fantastic opportunity to more directly and better serve our title companies\"; a Berks County abstractor said they could \"pull someone off the street and show them how to do this in about 20 minutes.\" The old per-document reconciliation queue disappeared, replaced by one ACH report per submitter per period.",
    research: [
      "Generative interviews with title-company submitters and county recording offices",
      "Live usability testing in Userbit with 5 Business/Company users in a QA environment",
      "AI-assisted synthesis in Dovetail to cluster transcripts into themes and tag pain points",
      "Pendo + Amazon QuickSight instrumentation to track adoption and friction once live",
    ],
    prototype:
      "https://www.figma.com/proto/loYXUbmV2BozRpIuUrgHMR/Direct-eRecording-eSubmission?node-id=8070-88481&viewport=470%2C-869%2C0.06&t=0tNaCeVcCCjTfQLn-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=8070%3A88481&show-proto-sidebar=1&page-id=306%3A47587",
    features: [
      {
        eyebrow: "Remember the user",
        heading: "Quick and compliant submissions start at sign-in.",
        bullets: [
          "Gives users a sense of place upon login",
          "Remembered recent submission types",
          "Start where they left off",
          "Recent submission history",
        ],
        image: "/work/govos/login.jpg",
        imageCaption:
          "Login picks up where you left off — recent submission types and last package surface immediately",
        // TODO: swap in real screen recording once uploaded — see
        // /public/work/govos/videos/remember-the-user.mp4
        video: "/work/govos/videos/remember-the-user.mp4",
        videoCaption: "Signing in and picking up a recent submission",
      },
      {
        eyebrow: "Submission flow",
        heading: "A flow that helps business and government work efficiently.",
        body: "Always know where you are in the submission process by referencing the progress bar. The step-by-step process puts the focus on the task at hand and removes unnecessary inputs. Easily navigate to previous steps or save your progress on a submission and finish it later.",
        image: "/work/govos/submission-flow.jpg",
        imageCaption:
          "Step-by-step submission with a persistent progress bar — easy to save and finish later",
        // TODO: swap in real screen recording once uploaded — see
        // /public/work/govos/videos/submission-flow.mp4
        video: "/work/govos/videos/submission-flow.mp4",
        videoCaption: "Walking through a submission end to end",
      },
      {
        eyebrow: "Document review",
        heading: "Clear images. A review assistant for compliance.",
        body: "eSubmission mitigates the most common rejection causes by guiding the user inline and giving them the option to replace a document mid-process — so packages move to recording on the first try.",
        image: "/work/govos/document-review.jpg",
        imageCaption:
          "Document compliance review — guides submitters through the most common rejection causes",
      },
      {
        eyebrow: "Checkout",
        heading: "Checkout with ease — and shareable receipts of the transaction.",
        body: "Submitters share receipts of the submission transaction downstream into their accounting flow, without copying numbers by hand.",
        image: "/work/govos/checkout.jpg",
        imageCaption: "Checkout with shareable receipts of the transaction",
      },
      {
        eyebrow: "Simplified user invitations",
        heading: "Simplified User Invitations",
        body: "A flow reducing complex security loops with a single, intuitive modal, letting administrators enter an email, assign a role, and send an invite in seconds. This eliminated onboarding friction and significantly reduced support tickets.",
        // TODO: swap in real screen recording once uploaded — see
        // /public/work/govos/videos/user-invitations.mp4
        video: "/work/govos/videos/user-invitations.mp4",
        videoCaption: "Inviting a teammate in a single modal",
      },
      {
        eyebrow: "Payment fulfillment & reporting",
        heading: "One ACH transfer per period, per submitter.",
        bullets: [
          "Payments are fulfilled by initiating ACH with each submitter",
          "The county runs an ACH report for a time period and a title company — surfacing the total amount due",
          "The county authorizes the ACH transaction",
        ],
        image: "/work/govos/ach-payment.jpg",
        imageCaption:
          "ACH payment fulfillment — a single transfer rolls up every recording per submitter per period",
        // TODO: swap in real screen recording once uploaded — see
        // /public/work/govos/videos/payment-fulfillment.mp4
        video: "/work/govos/videos/payment-fulfillment.mp4",
        videoCaption: "Running and authorizing an ACH report",
      },
    ],
  },
  {
    slug: "bright-healthcare",
    title: "Prior Authorization Portal",
    subtitle: "Replacing fax with a live, validated authorization workflow",
    client: "Bright HealthCare",
    year: "2021",
    role: "Principal Product Designer",
    tags: ["Healthcare", "Provider tools", "Design system", "0→1"],
    thumbnail: "/work-thumbnails/bright-healthcare-figma.webp",
    hero: "/legacy/landing-1af1c1.jpg",
    logo: "/logos/bright-healthcare-vert-2.svg",
    logoWide: "/logos/bright-healthcare.svg",
    logoScale: 1.45,
    accent: "#FFAF00",
    featured: true,
    aiSummary:
      "Designed a provider-facing portal that lets clinicians submit prior authorization requests electronically — replacing a paper fax workflow used across five state markets. Within months the team scaled from 100 monthly users to ~10K, surfaced $1.9M in operational savings, and cut clinical intake time in half.",
    overview:
      "Bright HealthCare's providers across Texas, Georgia, Utah, California, and Virginia had only one way to submit prior authorizations: fax. Faxes lacked validation, real-time data, or status visibility, leaving every party frustrated. We expanded the existing Authorization Portal to give providers a direct digital path, with upfront validation and well-structured data flowing into internal operations.",
    problem:
      "Faxed authorizations were error-prone, slow to triage, and gave providers zero visibility once a request left their desk. Internal teams spent hours converting unstructured faxes into actionable records, while providers waited days for status updates.",
    approach:
      "I led design across discovery, prototyping, validation, and rollout. Worked with clinical operations to map authorization rules into the form's logic, designed an empty-state dashboard that grew with the user, and shipped patterns the team could reuse across additional Bright surfaces. Continuous prototype testing with providers tightened every step of the submission flow.",
    outcome:
      "Within weeks of go-live in new markets, 15%+ of authorizations shifted to the portal — climbing rapidly afterward. Providers consistently rated it the best tool they had used; one team estimated the workflow saved them four hours per provider per day.",
    metrics: [
      { label: "Monthly usage", value: "9–10K" },
      { label: "Operational savings", value: "$1.9M" },
      { label: "Hours saved / provider / day", value: "4" },
      { label: "Authorization submissions", value: "50K" },
    ],
    prototype:
      "https://www.figma.com/proto/cxXiQ6LQOpNNjWi4Auf2DC/Bright-Provider-PreAuthPortal?node-id=892-27971&viewport=4575%2C-2862%2C0.5&t=0OJuceJUKOSH6o1m-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=892%3A31473&page-id=892%3A27941",
    images: [
      {
        src: "/legacy/01-d1202f.jpg",
        caption: "Authorization dashboard with status filtering",
      },
      {
        src: "/legacy/02-3d2c72.jpg",
        caption: "Step-by-step submission flow with inline validation",
      },
      {
        src: "/legacy/03-ba61e6.jpg",
        caption: "Service details, structured for downstream operations",
      },
      {
        src: "/legacy/submit-11bc30.jpg",
        caption: "Submission confirmation and provider next steps",
      },
      {
        src: "/legacy/bh-portfax-b28d84.png",
        caption:
          "The prior authorization fax form providers used before the Portal existed.",
      },
    ],
  },
  {
    slug: "docsquad",
    title: "Virtual Care Telehealth",
    subtitle: "A provider desktop + native app for async and sync visits",
    client: "DocSquad",
    year: "2022–2023",
    role: "Principal Designer · Design system lead",
    tags: ["Telehealth", "Design system", "iOS/Android", "Research"],
    thumbnail: "/work-thumbnails/docsquad-figma.webp",
    hero: "/work/docsquad/hero.png",
    logo: "/logos/docsquad.svg",
    accent: "#dd00e2",
    featured: true,
    aiSummary:
      "Rebuilt a desktop-only telehealth tool into a unified provider experience across desktop and native mobile (Flutter). Generative research with 'virtual moonlighter' clinicians shaped a workflow that can diagnose a routine visit in under two minutes — without a second video call.",
    overview:
      "DocSquad's desktop-only tool added another platform to an already heavy clinical workload. I rebuilt it end-to-end — desktop and native mobile in Flutter — around async intake that collects symptoms so providers can diagnose, prescribe, or escalate fast.",
    problem:
      "The legacy product assumed synchronous video for every visit and heavy data entry. Providers wanted to treat patients in minutes, not run a parallel EHR.",
    approach:
      "Led discovery with \"Virtual Moonlighters\" — clinicians picking up shifts on the side — then rebuilt the design system and diagnosis flow to support async and sync visits, partnering with engineering on a Flutter build that shipped one UI to web and native.",
    outcome:
      "One product across desktop, iOS and Android, on a new design system \u2014 handling urgent-care visits and prescription refills for clinicians working remote shifts.",
    research: [
      "5 generative interviews with practicing virtual clinicians",
      "Onboarding teardowns of competing telehealth platforms",
      "Resonance testing of the Digital Diagnosis workflow",
    ],
    prototype:
      "https://www.figma.com/design/OZvS6ltydnegvXtVxD1yEH/Portfolio?node-id=4553-21862&t=UalCBBDmPBjqhPwk-1",
    images: [
      {
        src: "/work/docsquad/research-board.png",
        caption: "Virtual moonlighter research, methods and findings",
      },
      {
        src: "/work/docsquad/desktop-app.png",
        caption: "Provider desktop — Patient queue",
      },
      {
        src: "/work/docsquad/phones.png",
        caption: "Provider native app — Intake, Video, Assessment, Review",
      },
      {
        src: "/work/docsquad/icons.png",
        caption: "Custom illustration set for the new design system",
      },
      {
        src: "/work/docsquad/interview-dashboard.png",
        caption: "Patient interview and logged-in dashboard",
      },
    ],
  },
  {
    slug: "liveperson",
    title: "SocialConnect",
    subtitle: "Bringing every brand conversation into a single agent surface",
    client: "LivePerson",
    year: "2019–2020",
    role: "Lead Product Designer",
    tags: ["SaaS", "Messaging", "Enterprise"],
    thumbnail: "/work-thumbnails/liveperson-figma-2.webp",
    hero: "/work/liveperson/bb-mobile-social-dm.png",
    logo: "/logos/liveperson.svg",
    accent: "#FE5E00",
    featured: true,
    aiSummary:
      "Unified email, X, Instagram, Facebook, and chat into a single LiveEngage conversation surface so customer-care agents could stop swivel-chairing between dashboards. Self-service setup meant brands could connect their own social accounts, route them to specific teams, and ship a consistent voice across channels.",
    overview:
      "Brands answer customer questions across emails, tweets, DMs, posts, chats, and texts — usually with a different tool for each channel. SocialConnect collapsed those into LiveEngage's existing messaging product, so a single agent transcript handles every inbound conversation, public or private.",
    approach:
      "I designed the conversation surface, the public-vs-private response flows, and a self-service setup product that lets brand admins connect social accounts, route them to teams, and prep canned content. Designed an end-state vision that integrates SocialConnect into the broader LiveEngage experience.",
    outcome:
      "Brands manage all channels from one conversation tree. Self-service setup removed a manual onboarding bottleneck. A future-state vision was used to align platform roadmap across three product teams.",
    images: [
      {
        src: "/work/liveperson/homeco-conversational-commerce.png",
        caption: "Conversational commerce — browsing and buying without leaving the chat",
      },
      {
        src: "/work/liveperson/agent-workspace-social-queue.png",
        caption: "Agent workspace — every social thread lands in one queue, alongside the profile behind it",
      },
      {
        src: "/work/liveperson/all-channels-unified.png",
        caption: "One surface for every channel — Facebook, Instagram, X, WhatsApp, SMS, and more",
      },
      {
        src: "/work/liveperson/connections-self-service.webp",
        caption: "Self-service: connect, assign, and manage social accounts",
      },
      {
        src: "/work/liveperson/public-tweet-private-thread.png",
        caption: "A public tweet on Twitter routed into the LiveEngage agent workspace, with the full private thread and social profile alongside it",
      },
    ],
  },
  {
    slug: "care-homepay",
    title: "Homepay Payroll",
    subtitle: "Hour tracking and approvals for household employers and caregivers",
    client: "Care.com",
    year: "2020–2021",
    role: "Principal Product Designer",
    tags: ["FinTech", "Mobile", "Two-sided product"],
    thumbnail: "/work-thumbnails/care-homepay-figma.webp",
    logo: "/logos/care-homepay.svg",
    accent: "#025747",
    aiSummary:
      "Designed paired employee and employer mobile apps so caregivers could log hours and household employers could review, approve, and pay payroll — all on a phone. The two products share a design system but speak two very different mental models, one trust-driven, one operational.",
    overview:
      "Care.com Homepay handles payroll, tax filings, and compliance for families employing nannies and caregivers. The app extended that to a phone-first hour tracking flow that works for both sides of the relationship.",
    approach:
      "Mapped the two user journeys side by side, prototyped clock in / clock out, weekly timesheets, and messaging. Co-designed shared components with the brand team. Defined an opinionated default — automatic week roll-up — that minimizes payroll edits while staying editable when life intervenes.",
    outcome:
      "Two SSO-aware apps with timesheets, messaging, and structured exceptions. Future features include push-driven clock reminders and swipe approvals from the inbox.",
    images: [
      {
        src: "/legacy/sign-up-sso-465949.png",
        caption: "SSO-aware onboarding for new caregivers",
      },
      {
        src: "/legacy/clockin-out-bbde38.png",
        caption: "Clock in / out — quick, glanceable",
      },
      {
        src: "/legacy/timesheets-week-hours-0hours-d9955b.png",
        caption: "Weekly timesheet with zero-state guidance",
      },
      {
        src: "/legacy/inbox-messages-tab-swipe-action-d6910e.png",
        caption: "Swipe actions for fast approvals in the inbox",
      },
    ],
  },
  {
    slug: "athenahealth",
    title: "athenahealth",
    subtitle: "25 million patients landed on Test Results. I rebuilt the portal around what they actually do.",
    client: "athenahealth",
    year: "2018–2019",
    role: "Senior Product Designer · IA lead",
    tags: ["Healthcare", "Information architecture", "Responsive"],
    thumbnail: "/work-thumbnails/consumer-health-2-raw.webp",
    hero: "/legacy/ch-dashboard-5c62f6.png",
    logo: "/logos/athenahealth.svg",
    accent: "#4800b5",
    aiSummary:
      "Led the IA and navigation redesign of athenahealth's patient portal — used by 25M registered patients. Cards, scrolls, and category labels were tested with hundreds of users to surface a structure that didn't bury appointments under 'Test Results' and that finally worked on mobile.",
    overview:
      "The legacy portal landed users on Test Results — a single sub-category — and obscured everything else. With 92% of healthcare consumers saying customer experience is a top strategic priority for providers, the structure was costing athena's clients renewals. We rebuilt the IA, dashboard, and navigation for responsive web and laid groundwork for native iOS/Android apps.",
    approach:
      "Card sorts in Optimal Workshop, unmoderated remote testing, and content audits drove a new taxonomy. Designed a consolidated My Health dashboard, mobile-first navigation, and a system that could degrade gracefully across athena's many client deployments.",
    outcome:
      "Shipped a consolidated My Health dashboard and mobile-first navigation for 25M registered patients — replacing a structure that landed everyone on 'Test Results' and buried appointments, messages, and prescriptions.",
    metrics: [
      { label: "Registered patients", value: "25M" },
      { label: "Will switch providers without good digital exp.", value: "90%" },
      { label: "Top-3 priority: revamping patient experience", value: "49% of execs" },
    ],
    images: [
      {
        src: "/legacy/ch-current-myhealth-5f03d1.png",
        caption: "Current My Health section — landed on Test Results only",
      },
      {
        src: "/legacy/ch-myhealth-9fc070.png",
        caption: "Redesigned My Health landing — consolidated dashboard",
      },
      {
        src: "/legacy/ch-current-navigation-25506e.png",
        caption: "Current navigation — confusing structure",
      },
      {
        src: "/legacy/ch-navigation-horz-04-003cbb.png",
        caption: "New responsive navigation",
      },
    ],
  },
  {
    slug: "athenawell",
    title: "athenaWell",
    subtitle: "A patient hub for care plans, daily progress, and education",
    client: "athenahealth",
    year: "2017–2018",
    role: "Senior Product Designer",
    tags: ["Healthcare", "Care management", "Research"],
    thumbnail: "/work-thumbnails/athenawell.webp",
    logo: "/logos/athenawell.png",
    accent: "#0055CC",
    aiSummary:
      "Designed athenaWell, a care management platform giving patients and care teams one shared source of truth for a care plan. Built around three patient personas and validated with resonance testing, it shipped daily patient tasks, 200+ wearable integrations, and content partnerships with Mayo Clinic and NIH.",
    overview:
      "athenaWell is a care management platform that gives patients and care teams a single, shared source of truth for a care plan — conditions, goals, and day-to-day tasks — that works whether care is happening inside or outside the athenahealth network.",
    problem:
      "Care coordination was scattered across phone calls, paper folders, and disconnected systems — hardest on patients managing chronic or high-risk conditions across multiple specialists. Care teams needed one place to create, assign, and track a plan; patients needed a simple daily view of what to do and a direct line to their team.",
    approach:
      "Designed around three patient personas — Healthy, Rising Risk, High-Risk — then validated with resonance testing: 5 interviews walking through a working Care Plan prototype. One assumption didn't survive testing: I expected tabbed care plans to confuse patients; testers preferred them, so they shipped as designed.",
    outcome:
      "Shipped a daily task view (check-ins, surveys, education) with a progress indicator testers called out as motivating, plus 200+ wearable integrations via Validic and content partnerships with Mayo Clinic, NIH, and epocrates.",
    metrics: [
      { label: "Patient personas designed for", value: "3 risk tiers" },
      { label: "Resonance-testing interviews", value: "5" },
      { label: "Wearable device integrations", value: "200+" },
    ],
    research: [
      "Resonance testing: 5 interviews across a range of backgrounds, including a power user of a comparable product, walking through a working Care Plan prototype",
      "Persona-driven design across Healthy, Rising Risk, and High-Risk patients — each with distinct values, goals, and pain points",
      "An early IA assumption (tabbed care plans would confuse patients) was tested and overturned — patients preferred the separation",
      "Designed care-team apps for reaching patients beyond the clinic (virtual, phone, flexible scheduling), plus an Apollo chatbot for event-driven patient messaging",
    ],
    images: [
      {
        src: "/legacy/patient-careplans-landing-copy-2-13759d.png",
        caption: "Care Plan landing page — the shared source of truth for patients and care teams",
      },
      {
        src: "/legacy/screen-shot-2017-12-15-at-8-51-43-am-42cc08.png",
        caption: "Care Team section — testers were especially drawn to the video chat option",
      },
      {
        src: "/legacy/screen-shot-2017-12-15-at-8-44-23-am-5606ba.png",
        caption: "Education content mapped to each patient's specific health concerns",
      },
      {
        src: "/legacy/screen-shot-2017-12-15-at-8-37-37-am-7013f8.png",
        caption: "Daily patient tasks with a progress indicator testers found motivating",
      },
    ],
  },
  {
    slug: "patient-io",
    title: "Patient IO",
    subtitle: "Desktop and native apps for at-risk patients and their care managers",
    client: "athenahealth (acquired)",
    year: "2016–2017",
    role: "Solo Product Designer",
    tags: ["Healthcare", "Mobile", "Behavior change"],
    thumbnail: "/work-thumbnails/patient-io-photo.jpg",
    logo: "/logos/patient-io.svg",
    accent: "#00CCB7",
    aiSummary:
      "Patient IO helped patients stick to complex treatment regimens and gave health professionals visibility between visits. As solo designer on a 14-person team, I owned the end-to-end experience -- work that led athenahealth to acquire the company in 2016 and adopt the framework as the design foundation for athenaWell.",
    overview:
      "Patient IO tracked medications, vitals, and care-plan adherence between office visits, pushing data back to clinicians. The medication module had to scale to thousands of drugs, so I built a component system that rendered each pill correctly from structured Epocrates data.",
    outcome:
      "athenahealth acquired Patient IO in 2016 and adopted its adherence-tracking and pill-rendering patterns as the design foundation for athenaWell.",
    images: [
      {
        src: "/legacy/devices-6cb33b.png",
        caption: "Patient IO across devices",
      },
      {
        src: "/legacy/image-asset-e5019f.png",
        caption: "Tracking medications, vitals, and adherence",
      },
      {
        src: "/legacy/image-asset-06a4d4.png",
        caption: "Medications module",
      },
      {
        src: "/legacy/screen-shot-2022-11-02-at-8-03-55-pm-31c5b5.png",
        caption: "Pill-shape design system, generated from Epocrates data",
      },
    ],
  },
  {
    slug: "athenaconnect",
    title: "athenaConnect",
    subtitle: "The marketplace for apps that plug into athenahealth",
    client: "athenahealth",
    year: "TBD",
    role: "Senior Product Designer",
    tags: ["Healthcare", "Marketplace", "UX"],
    thumbnail: "/work-thumbnails/athenaconnect.webp",
    logo: "/logos/athenaconnect.png",
    accent: "#00A883",
    aiSummary: "Redesigned athenahealth's partner Marketplace discovery experience -- improving search, filtering, and content structure -- contributing to 71%+ customer adoption of partner solutions across 370+ integrations and 60+ specialties.",
    overview: "athenaConnect is athenahealth's partner Marketplace, where clinicians and customers find and evaluate third-party health-tech products.",
    problem: "Weak search and flat filtering made it hard for customers to find the right partner solution among hundreds of options.",
    approach: "Redesigned search, filtering, and content structure so listings surfaced the right partners faster, for both public visitors and athenaNet users evaluating tools mid-workflow.",
    outcome: "Contributed to 71%+ customer adoption of partner solutions across 370+ integrations and 60+ specialties.",
  },
  {
    slug: "volusion-admin",
    title: "Volusion Ecommerce Admin",
    subtitle: "A modern admin for tens of thousands of independent merchants",
    client: "Volusion",
    year: "2014–2016",
    role: "Senior Product Designer",
    tags: ["Ecommerce", "Dashboard", "SaaS"],
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    logo: "/logos/volusion.svg",
    logoWide: "/logos/volusion-horizontal.svg",
    accent: "#8759F2",
    aiSummary:
      "Redesigned the admin used by Volusion's merchant base — order management, catalog, marketing, and storefront tools. Defined patterns for data-heavy tables, bulk actions, and a navigation that scaled as the product added modules.",
    overview:
      "Volusion's ecommerce admin gave small businesses everything they needed to run an online store. I worked across order management, catalog, storefront, and onboarding — defining patterns that could outlive any one feature.",
    outcome:
      "Shipped new patterns for products, orders, and admin navigation across Volusion's full merchant base, replacing a legacy admin that hadn't kept pace with the product's growing feature set.",
    images: [
      {
        src: "/legacy/image-asset-1e27ed.png",
      },
      {
        src: "/legacy/1-0b3a0b.png",
        caption: "Persona — Struck out on their own (freedom seekers)",
      },
      {
        src: "/legacy/2-76c8be.png",
        caption: "Persona — Family business owners (legacy builders)",
      },
      {
        src: "/legacy/3-9c4b03.png",
        caption: "Persona — Considering starting or recently started",
      },
      {
        src: "/legacy/image-asset-b1175a.png",
        caption: "Top pages, based on Google Analytics",
      },
      {
        src: "/legacy/old-dashboard-landing-ab3cca.jpg",
        caption: "Dashboard landing",
      },
      {
        src: "/legacy/01-1-top-nav-subnav-46d3bb.jpg",
        caption: "Top nav with sub-nav",
      },
      {
        src: "/legacy/01-2-top-nav-account-dropdown-cacd2d.jpg",
        caption: "Top nav — account dropdown",
      },
      {
        src: "/legacy/01-3-admin-notification-d3e6ee.jpg",
        caption: "Admin notification",
      },
      {
        src: "/legacy/02-1-products-grid-4740cd.jpg",
        caption: "Products grid",
      },
      {
        src: "/legacy/02-2-products-grid-hover-single-a124a7.jpg",
        caption: "Products grid — hover, single select",
      },
      {
        src: "/legacy/02-3-products-grid-hover-multiple-411a5c.jpg",
        caption: "Products grid — hover, multi-select",
      },
      {
        src: "/legacy/04-1-products-search-dropdown-e042d5.jpg",
        caption: "Products — search dropdown",
      },
      {
        src: "/legacy/04-2-products-search-7d4be7.jpg",
        caption: "Products — search results",
      },
      {
        src: "/legacy/04-3-products-settings-dropdown-3aad07.jpg",
        caption: "Products — settings dropdown",
      },
      {
        src: "/legacy/image-asset-e4093e.jpeg",
        caption: "Product page — list view",
      },
      {
        src: "/legacy/image-asset-7a9a34.jpeg",
        caption: "Advanced settings",
      },
      {
        src: "/legacy/image-asset-4c5ff3.jpeg",
        caption: "Product page",
      },
      {
        src: "/legacy/image-asset-0ef1a7.jpeg",
        caption: "Process orders",
      },
      {
        src: "/legacy/order-page-new-9ace82.jpg",
        caption: "Order page — redesigned",
      },
      {
        src: "/legacy/image-asset-730808.png",
      },
      {
        src: "/legacy/image-asset-94c04c.png",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "Ecommerce Designs",
    subtitle: "Custom Volusion storefronts and paid templates for independent merchants",
    client: "Volusion",
    year: "2014–2016",
    role: "Senior Product Designer",
    tags: ["Ecommerce", "Storefront", "Templates"],
    thumbnail: "/work-thumbnails/ecommerce-websites-raw.webp",
    logo: "/logos/ecommerce-websites.svg",
    logoScale: 0.75,
    accent: "#F05844",
    aiSummary:
      "A gallery of Volusion ecommerce designs — each started with a client phone call to align on look, feel, and merchandising goals, plus a set of paid templates flexible enough that clients could swap their own imagery and brand colors without breaking the design.",
    overview:
      "Custom client storefronts and a library of paid templates sold on Volusion.com. The templates were designed for easy upkeep — merchants could change images and design elements without breaking the layout. Designs spanned fashion, home, food, lifestyle, and more.",
    images: [
      {
        src: "/legacy/web-bombshell-411fd3.jpg",
        caption: "Bombshell — apparel",
      },
      {
        src: "/legacy/web-vestidos-e82c30.jpg",
        caption: "Vestidos",
      },
      {
        src: "/legacy/combi-170569.png",
        caption: "Combi",
      },
      {
        src: "/legacy/modernliving2-8f185a.jpg",
        caption: "Modern Living",
      },
      {
        src: "/legacy/temptaion-af8243.png",
        caption: "Temptation",
      },
      {
        src: "/legacy/venetian-07809b.png",
        caption: "Venetian",
      },
      {
        src: "/legacy/web-express-512a9d.jpg",
        caption: "Express",
      },
      {
        src: "/legacy/web-pewter-e96cae.jpg",
        caption: "Pewter",
      },
      {
        src: "/legacy/web-hillbillystills-360970.jpg",
        caption: "Hillbilly Stills",
      },
      {
        src: "/legacy/52f2bf9d604c0-4e5647.jpg",
        caption: "Boutique storefront",
      },
      {
        src: "/legacy/web-sweetgrass-a27d87.jpg",
        caption: "Sweetgrass",
      },
      {
        src: "/legacy/definition-device-home-1c10ca.png",
        caption: "Definition — homepage across devices",
      },
      {
        src: "/legacy/definition-device-product-f3bc05.png",
        caption: "Definition — product page",
      },
      {
        src: "/legacy/stfrancis-device-home-569ddb.png",
        caption: "St. Francis — homepage",
      },
      {
        src: "/legacy/stfrancis-device-category-0bec36.png",
        caption: "St. Francis — category",
      },
      {
        src: "/legacy/stfrancis-device-product-be231a.png",
        caption: "St. Francis — product",
      },
    ],
  },
  
  {
    slug: "logos",
    title: "Logos",
    subtitle: "Selected logo and identity work for clients and side projects",
    client: "Various",
    year: "2010–2022",
    role: "Designer",
    tags: ["Brand", "Logo", "Identity"],
    thumbnail: "/work-thumbnails/logos-figma.webp",
    logo: "/logos/logos-project.svg",
    logoBandScale: 1.25,
    logoScale: 0.75,
    accent: "#00EADA",
    aiSummary:
      "A collection of logo and identity work spanning clients across consumer, lifestyle, food, and personal branding. Marks range from playful illustrative to clean wordmarks, depending on the audience and how the brand needed to feel in use.",
    overview:
      "Logo and identity work for a mix of paying clients and personal projects. Every mark here was drawn in Illustrator in the early years: no AI, no prompt, just the Pen tool, a graveyard of extra anchor points, and the wild hope that this time the curve would actually land.",
    images: [
      {
        src: "/work/bohemian-hair-bows-card.jpg",
        caption: "Bohemian Hair Bows — logo and product card",
      },
      {
        src: "/legacy/gigglepoo-e4756f.png",
        caption: "Gigglepoo",
      },
      {
        src: "/legacy/babybemine-9fb181.png",
        caption: "Baby Be Mine",
      },
      {
        src: "/legacy/orionleather-d1904d.png",
        caption: "Orion Leather",
      },
      {
        src: "/legacy/bass-9386b0.png",
        caption: "Bass",
      },
      {
        src: "/legacy/dunhamcarr-10ff13.png",
        caption: "Dunham Carr",
      },
      {
        src: "/legacy/chisholmtrail-2a8d9d.png",
        caption: "Chisholm Trail",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-2-11-18-pm-ce293f.png",
      },
      {
        src: "/legacy/circle7-639ac5.png",
        caption: "Circle 7",
      },
      {
        src: "/legacy/sparko-cab190.png",
        caption: "Sparko",
      },
      {
        src: "/legacy/countryhearth-04ac7c.png",
        caption: "Country Hearth",
      },
      {
        src: "/legacy/allah-85ae14.png",
        caption: "Allah",
      },
      {
        src: "/legacy/jessicalynn-210f5e.png",
        caption: "Jessica Lynn",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-51-31-pm-0c0410.png",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-50-18-pm-8e0293.png",
      },
      {
        src: "/legacy/jilli-29116f.png",
        caption: "Jilli",
      },
      {
        src: "/legacy/kristinanderson-61c9e4.png",
        caption: "Kristin Anderson",
      },
      {
        src: "/legacy/malaka-299bcf.png",
        caption: "Malaka",
      },
      {
        src: "/legacy/mylittlejewel-ad7648.png",
        caption: "My Little Jewel",
      },
      {
        src: "/legacy/origami-fa2bbd.png",
        caption: "Origami",
      },
      {
        src: "/legacy/wonkos-b9e715.png",
        caption: "Wonko's",
      },
      {
        src: "/legacy/southernliving-3d9e48.png",
        caption: "Southern Living",
      },
      {
        src: "/legacy/templatetrader-e2f044.png",
        caption: "Template Trader",
      },
      {
        src: "/legacy/usabride-d7fcd1.png",
        caption: "USA Bride",
      },
      {
        src: "/legacy/blackstarr-248154.png",
        caption: "Black Starr",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-42-49-pm-36267d.png",
      },
      {
        src: "/legacy/provencal-thumb-492732.jpg",
        caption: "Eclectic Provencal",
      },
    ],
  },
  {
    slug: "print",
    title: "Print Over the Years",
    subtitle: "Print design across holiday cards, invites, and editorial",
    client: "Various",
    year: "2010–2022",
    role: "Designer",
    tags: ["Print", "Editorial", "Brand"],
    thumbnail: "/work-thumbnails/print-figma.webp",
    logo: "/logos/print.svg",
    accent: "#1EB571",
    aiSummary:
      "Print work over the years — holiday cards and corporate gifts at Volusion, personal stationery, invitations, posters, and seasonal lookbooks. A mix of agency, client, and personal projects that lean illustrative.",
    overview:
      "Selected print design across holiday cards, invitations, posters, and editorial pieces — both client work and personal projects.",
    images: [
      {
        src: "/legacy/holiday1-2-43-23-pm-5fc6cd.jpg",
      },
      {
        src: "/legacy/holiday2-2-43-23-pm-988eb2.jpg",
      },
      {
        src: "/legacy/volusion-holidaycard-2-43-24-pm-03f602.jpg",
        caption: "Volusion holiday card",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-45-29-pm-90bfd0.png",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-45-43-pm-84330e.png",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-46-10-pm-f5e785.png",
      },
      {
        src: "/legacy/print-fromevelyn-2-43-23-pm-89f078.jpg",
        caption: "From Evelyn",
      },
      {
        src: "/legacy/print-madebyjoy-2-43-23-pm-942091.jpg",
        caption: "Made by Joy",
      },
      {
        src: "/legacy/print-vitagals-2-43-23-pm-4c7209.jpg",
        caption: "Vita Gals",
      },
      {
        src: "/legacy/adri-2-43-24-pm-741879.png",
        caption: "Adri",
      },
      {
        src: "/legacy/print-christineinvite-2-43-23-pm-c6bd1c.jpg",
        caption: "Christine — invite",
      },
      {
        src: "/legacy/amor-2-43-23-pm-e2878a.png",
        caption: "Amor",
      },
      {
        src: "/legacy/fakeittilyamakeit-2-43-23-pm-a5e5df.jpg",
        caption: "Fake It 'Til Ya Make It",
      },
      {
        src: "/legacy/print-memyselfi-2-43-23-pm-09f2ab.jpg",
        caption: "Me, Myself, & I",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-52-54-pm-fe9251.png",
      },
      {
        src: "/legacy/screen-shot-2021-12-01-at-12-59-55-pm-e6f3ce.png",
      },
      {
        src: "/legacy/print-shopgrl-copy-17855b.jpg",
        caption: "Shopgrl",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-53-54-pm-285085.png",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-47-45-pm-d9d011.png",
      },
      {
        src: "/legacy/cw-fall-2013-2-43-23-pm-aa62a3.jpg",
        caption: "Fall 2013 lookbook",
      },
      {
        src: "/legacy/cw-winter-2013-specialedition-2-43-23-pm-406d52.jpg",
        caption: "Winter 2013 special edition",
      },
      {
        src: "/legacy/screen-shot-2022-11-03-at-1-55-32-pm-3a7031.png",
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

/** Shared tool icon filenames under /public/icons/tools. */
export type ToolName =
  | "Figma"
  | "Sketch"
  | "InVision"
  | "Zeplin"
  | "Abstract"
  | "Claude"
  | "Gemini"
  | "Cursor"
  | "UserTesting"
  | "Miro"
  | "Jira"
  | "Confluence"
  | "Pendo"
  | "Amplitude"
  | "Validic"
  | "Dovetail"
  | "Adobe"
  | "Apple Health Kit";

export const TOOL_ICONS: Record<ToolName, string> = {
  Figma: "/icons/tools/figma.png",
  Sketch: "/icons/tools/sketch.png",
  InVision: "/icons/tools/invision.png",
  Zeplin: "/icons/tools/zeplin.png",
  Abstract: "/icons/tools/abstract.png",
  Claude: "/icons/tools/claude.png",
  Gemini: "/icons/tools/gemini.png",
  Cursor: "/icons/tools/cursor.svg",
  UserTesting: "/icons/tools/usertesting.png",
  Miro: "/icons/tools/miro.png",
  Jira: "/icons/tools/jira.png",
  Confluence: "/icons/tools/confluence.png",
  Pendo: "/icons/tools/pendo.png",
  Amplitude: "/icons/tools/amplitude.png",
  Validic: "/icons/tools/validic.png",
  Dovetail: "/icons/tools/dovetail.png",
  Adobe: "/icons/tools/adobe.png",
  "Apple Health Kit": "/icons/tools/apple-health.png",
};

export function toolIconSrc(name: ToolName, base?: string) {
  const shared = TOOL_ICONS[name];
  if (!base) return shared;
  return `${base}/${shared.slice(shared.lastIndexOf("/") + 1)}`;
}

export type CaseStudyMeta = {
  team: string[];
  timing: { value: string; label: string }[];
  tools: ToolName[];
  projected: { value: string; label: string }[];
  /** Optional directory of per-project tool marks (same filenames as TOOL_ICONS). */
  toolIconBase?: string;
};

const CASE_STUDY_META: Partial<Record<string, CaseStudyMeta>> = {
  athenaconnect: {
    /* Team and tools per Molly's Figma frame 4649:13876; projected is left
       to the two figures the outcome already states rather than inventing a
       third. */
    team: ["1 Product Designer", "1 Product Manager", "2 Engineers"],
    timing: [{ value: "2018\u20132019", label: "Discovery through rollout" }],
    tools: ["Sketch", "InVision", "Figma", "Jira"],
    projected: [
      { value: "370+", label: "Partner integrations in the Marketplace" },
      { value: "60+", label: "Specialties covered" },
    ],
  },
  netspend: {
    team: [
      "1 Lead UX Designer",
      "1 Product Manager",
      "4 Engineers",
      "Merchandising & ops partners",
    ],
    timing: [
      { value: "5 months", label: "0→1 design to handoff-ready" },
      { value: "June 2026", label: "Development kickoff" },
      { value: "Year End 2026", label: "Target launch" },
    ],
    tools: ["Figma", "Claude", "Gemini", "Cursor", "UserTesting", "Miro", "Jira"],
    projected: [
      { value: "$500K → $10M", label: "Rewards revenue target" },
      { value: "0 → 1", label: "UCM platform in 5 months" },
    ],
  },
  "govos-esubmission": {
    team: [
      "1 Lead Product Designer",
      "1 Product Manager",
      "Engineering partners",
      "County & title stakeholders",
    ],
    timing: [
      { value: "2023–2024", label: "Discovery through launch" },
      { value: "Live", label: "Self-serve product shipped" },
    ],
    tools: ["Figma", "Gemini", "UserTesting", "Miro", "Jira", "Claude"],
    projected: [
      { value: "Direct channel", label: "Submitter → county, no middleman" },
      { value: "1 ACH report", label: "Per submitter per period" },
    ],
  },
  "bright-healthcare": {
    team: [
      "Worked with 5–7 engineers, 1 Product Manager, Director of Product, and 1 Content",
      "Hired and managed 1 designer midway",
      "Worked with clinical teams to understand their workflows and competitors they have used",
    ],
    timing: [
      { value: "March – July 2021", label: "6 months" },
    ],
    tools: ["Figma", "Jira", "Confluence", "Miro", "Pendo", "Dovetail"],
    projected: [
      { value: "$1.9M", label: "Savings at 9–10K monthly usage" },
      { value: "$800K", label: "Clinician review savings (7 min/case)" },
      { value: "4 hrs/day", label: "Saved per provider" },
      { value: "50K", label: "Authorization submissions" },
    ],
  },
  docsquad: {
    team: [
      "1 Principal Designer",
      "Design system lead",
      "Flutter engineering partners",
    ],
    timing: [
      { value: "2022–2023", label: "Rebuild across desktop + native" },
    ],
    tools: [
      "Figma",
      "Jira",
      "Confluence",
      "Miro",
      "Pendo",
      "Amplitude",
      "UserTesting",
    ],
    toolIconBase: "/work/docsquad/tools",
    projected: [
      { value: "Desktop + native", label: "One Flutter UI surface" },
      { value: "Async + sync", label: "Visit modalities in one flow" },
    ],
  },
  "patient-io": {
    team: [
      "1 Solo Product Designer",
      "14-person company team",
    ],
    timing: [
      { value: "2016\u20132017", label: "End-to-end mobile + desktop care platform" },
      { value: "2016", label: "Acquired by athenahealth" },
    ],
    tools: ["Sketch", "InVision", "Zeplin", "UserTesting"],
    projected: [
      { value: "Thousands", label: "Drugs rendered via structured Epocrates data" },
      { value: "1", label: "Framework adopted as athenaWell's design foundation" },
    ],
  },
  athenahealth: {
    team: [
      "1 Senior Product Designer \u00b7 IA lead",
      "2 Product Managers",
      "3 Engineers",
    ],
    timing: [
      { value: "2018\u20132019", label: "IA, dashboard, and responsive nav" },
      { value: "6 weeks", label: "Unmoderated tests + card sort" },
    ],
    tools: ["Figma", "Gemini", "Jira", "Miro", "Pendo", "UserTesting", "Cursor"],
    projected: [
      { value: "25M", label: "Registered patients" },
      { value: "90%", label: "Will switch providers without good digital exp." },
    ],
  },
  athenawell: {
    team: [
      "1 Senior Product Designer",
      "Care team engineering",
      "Clinical content partners",
    ],
    timing: [
      { value: "2017–2018", label: "Care Plan design & validation" },
      { value: "5 interviews", label: "Resonance-testing round" },
    ],
    tools: ["Figma", "Miro", "Jira"],
    projected: [
      { value: "3 personas", label: "Healthy, Rising Risk, High-Risk" },
      { value: "200+ integrations", label: "Wearable partners via Validic" },
    ],
  },
  liveperson: {
    team: [
      "1 Lead Product Designer",
      "Platform product partners",
      "Engineering across 3 teams",
    ],
    timing: [
      { value: "2019–2020", label: "SocialConnect design & vision" },
    ],
    tools: ["Figma", "Miro", "Jira"],
    projected: [
      { value: "1 surface", label: "Every social channel in LiveEngage" },
      { value: "3 teams", label: "Roadmap aligned on end-state vision" },
    ],
  },
  "care-homepay": {
    team: [
      "1 Principal Product Designer",
      "Brand design partners",
      "Mobile engineering",
    ],
    timing: [
      { value: "2020–2021", label: "Paired employee + employer apps" },
      { value: "Phone-first", label: "Hours, approvals, payroll" },
    ],
    tools: ["Figma", "Miro", "Jira", "UserTesting"],
    projected: [
      { value: "2 apps", label: "Shared system, two mental models" },
      { value: "Auto roll-up", label: "Default that cuts payroll edits" },
    ],
  },
  "volusion-admin": {
    team: ["1 Senior Product Designer", "Product & engineering partners"],
    timing: [{ value: "Multi-year", label: "Admin patterns & modules" }],
    /* Figma didn't exist for most of this engagement — Molly's own marks
       for the tools she actually used, in /work/volusion/tools. */
    tools: ["Sketch", "InVision", "Zeplin", "Miro"],
    toolIconBase: "/work/volusion/tools",
    projected: [
      { value: "Scalable admin", label: "Tables, bulk actions, nav" },
    ],
  },
  ecommerce: {
    team: ["1 Senior Product Designer", "Client services partners"],
    timing: [{ value: "Ongoing", label: "Client storefronts & templates" }],
    tools: ["Figma", "Miro"],
    projected: [
      { value: "Flexible themes", label: "Merchant-ready ecommerce" },
    ],
  },
  logos: {
    team: ["1 Designer"],
    timing: [{ value: "Project-based", label: "Identity & brand kits" }],
    tools: ["Figma"],
    projected: [
      { value: "Logo + kit", label: "Wordmark through guidelines" },
    ],
  },
  print: {
    team: ["1 Designer"],
    timing: [{ value: "Project-based", label: "Print & collateral" }],
    tools: ["Figma"],
    projected: [
      { value: "Print-ready", label: "Collateral & special editions" },
    ],
  },
};

/** Meta panel content for a case study — explicit override or sensible defaults. */
export function getCaseStudyMeta(project: Project): CaseStudyMeta {
  const override = CASE_STUDY_META[project.slug];
  if (override) return override;

  return {
    team: [project.role, "Cross-functional partners"],
    timing: [{ value: project.year, label: "Engagement" }],
    tools: ["Figma", "Miro", "Jira"],
    projected:
      project.metrics?.slice(0, 2).map((m) => ({
        value: m.value,
        label: m.label,
      })) ?? [{ value: project.client, label: project.subtitle }],
  };
}
