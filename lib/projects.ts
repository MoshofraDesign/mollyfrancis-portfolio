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
      "The cardholder Rewards tab, and the 0→1 tool that powers it",
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
    accent: "#70ACF4",
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
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489640575-FE1X3BSOCUHJVV45MVW0/Landing.jpg",
    logo: "/logos/bright-healthcare-vert-2.svg",
    logoScale: 1.7,
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489521988-W8AEB4S7N95NOK3EGATT/01.jpg",
        caption: "Authorization dashboard with status filtering",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489522479-0LRNRNG9G4T94WYVXNX3/02.jpg",
        caption: "Step-by-step submission flow with inline validation",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489523077-U6FA01YB37HK8NWKNHDU/03.jpg",
        caption: "Service details, structured for downstream operations",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489524593-1VI6DO5CFVOIJXS8BCS2/Submit.jpg",
        caption: "Submission confirmation and provider next steps",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/6a83a6f4-3382-4474-a3d6-85c0bad4e6df/BH-PortFax.png",
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
      "Rebuilt the desktop-only Zipnosis app as a unified desktop + native (Flutter) product with a new design system. Now serves urgent-care visits and prescription refills for remote \"Virtual Moonlighter\" providers.",
    research: [
      "5 generative interviews with practicing virtual clinicians",
      "Power-user comparison with Patient IO veterans",
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
    accent: "#F05844",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png",
        caption: "SSO-aware onboarding for new caregivers",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png",
        caption: "Clock in / out — quick, glanceable",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png",
        caption: "Weekly timesheet with zero-state guidance",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png",
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
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462027297-GRU05DN2D33B2JIOLPDP/CH-Dashboard.png",
    logo: "/logos/athenahealth.svg",
    accent: "#1A17B7",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335056852-1WDNMCGCPZAVC7GBU365/CH-Current-MyHealth.png",
        caption: "Current My Health section — landed on Test Results only",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555437931422-FA85FIDWKHIDE0549C67/CH-MyHealth.png",
        caption: "Redesigned My Health landing — consolidated dashboard",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335711321-VWKGE5EMWNE0E69EP9KD/CH-Current-Navigation.png",
        caption: "Current navigation — confusing structure",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462092362-M7ZKRJUT3DHC4SR7NI7H/CH-Navigation-Horz-04.png",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png",
        caption: "Care Plan landing page — the shared source of truth for patients and care teams",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349531314-89U1IJ39DE46WB88QYI0/Screen+Shot+2017-12-15+at+8.51.43+AM.png",
        caption: "Care Team section — testers were especially drawn to the video chat option",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349151416-RF4TP9N5LWQVAAVQGQB7/Screen+Shot+2017-12-15+at+8.44.23+AM.png",
        caption: "Education content mapped to each patient's specific health concerns",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513348975246-YKX6GH1QTGSD7AYQAJJ2/Screen+Shot+2017-12-15+at+8.37.37+AM.png",
        caption: "Daily patient tasks with a progress indicator testers found motivating",
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
    accent: "#0E7C86",
    aiSummary: "Redesigned athenahealth's partner Marketplace discovery experience -- improving search, filtering, and content structure -- contributing to 71%+ customer adoption of partner solutions across 370+ integrations and 60+ specialties.",
    overview: "athenaConnect is athenahealth's partner Marketplace, where clinicians and customers find and evaluate third-party health-tech products.",
    problem: "Weak search and flat filtering made it hard for customers to find the right partner solution among hundreds of options.",
    approach: "Redesigned search, filtering, and content structure so listings surfaced the right partners faster, for both public visitors and athenaNet users evaluating tools mid-workflow.",
    outcome: "Contributed to 71%+ customer adoption of partner solutions across 370+ integrations and 60+ specialties.",
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
    // TODO(molly): swap in the real Patient IO logo SVG once you resend it
    // -- left unset rather than pointing at athenahealth's logo, since that
    // was actively wrong on this tile. CareGrid just skips the logo overlay
    // and shows the photo + accent color until this is set.
    accent: "#00CCB7",
    aiSummary:
      "Patient IO helped patients stick to complex treatment regimens and gave health professionals visibility between visits. As solo designer on a 14-person team, I owned the end-to-end experience -- work that led athenahealth to acquire the company in 2016 and adopt the framework as the design foundation for athenaWell.",
    overview:
      "Patient IO tracked medications, vitals, and care-plan adherence between office visits, pushing data back to clinicians. The medication module had to scale to thousands of drugs, so I built a component system that rendered each pill correctly from structured Epocrates data.",
    outcome:
      "athenahealth acquired Patient IO in 2016 and adopted its adherence-tracking and pill-rendering patterns as the design foundation for athenaWell.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965854643-56K9O8S9XMT6ZK4P38J8/Devices.png",
        caption: "Patient IO across devices",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511967913957-U3LHYLLHH507187LL8WZ/image-asset.png",
        caption: "Tracking medications, vitals, and adherence",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511968056680-OYW7HQTA481IA0KX2EV3/image-asset.png",
        caption: "Medications module",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/0a7d94ff-64a3-4bb9-9202-85911eb02bbc/Screen+Shot+2022-11-02+at+8.03.55+PM.png",
        caption: "Pill-shape design system, generated from Epocrates data",
      },
    ],
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
    accent: "#8759F2",
    aiSummary:
      "Redesigned the admin used by Volusion's merchant base — order management, catalog, marketing, and storefront tools. Defined patterns for data-heavy tables, bulk actions, and a navigation that scaled as the product added modules.",
    overview:
      "Volusion's ecommerce admin gave small businesses everything they needed to run an online store. I worked across order management, catalog, storefront, and onboarding — defining patterns that could outlive any one feature.",
    outcome:
      "Shipped new patterns for products, orders, and admin navigation across Volusion's full merchant base, replacing a legacy admin that hadn't kept pace with the product's growing feature set.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542831010-IXQ56XR6374O1BYZQ6LK/image-asset.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052373839-DA345Q6MBX2L3GTAFUJH/1.png",
        caption: "Persona — Struck out on their own (freedom seekers)",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052602566-26V6KZU2NGIHU07IIP90/2.png",
        caption: "Persona — Family business owners (legacy builders)",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052727029-3KBO4H3QWR38EJZKSGZ3/3.png",
        caption: "Persona — Considering starting or recently started",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512053462663-OQUN662NOW47OD7YADHH/image-asset.png",
        caption: "Top pages, based on Google Analytics",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263562-TPA3IIUV00PKF9KU1J61/OLD-Dashboard-Landing.jpg",
        caption: "Dashboard landing",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264400-VHB0BCUP27M7KI7T7721/01-1+-+Top+Nav+-SubNav.jpg",
        caption: "Top nav with sub-nav",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264133-1HB13QG0TKQ1AL9MLZWO/01-2+-+Top+Nav+-+Account+Dropdown.jpg",
        caption: "Top nav — account dropdown",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263481-GH93PMP36ECBJITKXI97/01-3+-+Admin+Notification.jpg",
        caption: "Admin notification",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847300-J3TO347Y1HC2PGN012V3/02-1+-+Products+Grid.jpg",
        caption: "Products grid",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847163-A8RCW12MLK1L8HF31S19/02-2+-+Products+-+Grid+-Hover+Single.jpg",
        caption: "Products grid — hover, single select",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847913-PTIZDDPSH2LIQXAUL7J2/02-3+-+Products+-+Grid+-+Hover+Multiple.jpg",
        caption: "Products grid — hover, multi-select",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846066-VJ7G4Y7Q70V9DQB2755Y/04-1+-+Products+-+Search+Dropdown.jpg",
        caption: "Products — search dropdown",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846722-JJI1JWGLT9V0AOGIU0T4/04-2+-+Products+-+Search.jpg",
        caption: "Products — search results",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846614-BNH6SJJ0FPR2T6DKHVJV/04-3+-+Products+-+Settings+Dropdown.jpg",
        caption: "Products — settings dropdown",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889690104-X4CR0710EAPEKFKS1GD9/image-asset.jpeg",
        caption: "Product page — list view",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889711347-3CZHI632LG7AJPVYK37G/image-asset.jpeg",
        caption: "Advanced settings",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889728893-PFO6HB9TJDOYN5M0HT7G/image-asset.jpeg",
        caption: "Product page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462890251993-3RRX7PD8KCSM2MB4DXP6/image-asset.jpeg",
        caption: "Process orders",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462933946295-QSEVGLELQHKVKHNKJA2Q/-Order+Page-NEW.jpg",
        caption: "Order page — redesigned",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542691474-54ZUVT0SMV4KUESUG9X6/image-asset.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542909021-QGKA1KCN566886NHKS47/image-asset.png",
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
    accent: "#A3CC00",
    aiSummary:
      "A gallery of Volusion ecommerce designs — each started with a client phone call to align on look, feel, and merchandising goals, plus a set of paid templates flexible enough that clients could swap their own imagery and brand colors without breaking the design.",
    overview:
      "Custom client storefronts and a library of paid templates sold on Volusion.com. The templates were designed for easy upkeep — merchants could change images and design elements without breaking the layout. Designs spanned fashion, home, food, lifestyle, and more.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492582146-8CG7TNOVTMUVBXD8YYV0/web-bombshell.jpg",
        caption: "Bombshell — apparel",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906906-X91PFJ8K71PIR26M5PAK/web-vestidos.jpg",
        caption: "Vestidos",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492886734-FJ69AYIZ87IDZTHDAOZR/combi.png",
        caption: "Combi",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492987626-03RPZRPX9V2U1W6BU9N0/modernliving2.jpg",
        caption: "Modern Living",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117946-E967FF9AR5FE6Z769YRZ/temptaion.png",
        caption: "Temptation",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117511-NYQZT9PR0Y0NULZA2PVF/venetian.png",
        caption: "Venetian",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907630-PKRIA7S5BTR64JOJYT7G/web-express.jpg",
        caption: "Express",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906956-4BBIIG1S5QG8WMVAMVAJ/web-pewter.jpg",
        caption: "Pewter",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907480-F8C5VAWAIOK73SP4ICZZ/web-hillbillystills.jpg",
        caption: "Hillbilly Stills",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422474229873-WVIY6F1FUOJNEB2LIS69/52f2bf9d604c0.jpg",
        caption: "Boutique storefront",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422381428436-R3GEUY7IA5DQY6BXAO4H/web-sweetgrass.jpg",
        caption: "Sweetgrass",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725456-C9Y95F7G9ZJ62SX46B54/Definition-Device-Home.png",
        caption: "Definition — homepage across devices",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725320-HBQC7TAFA1KHYYNWII6T/Definition-Device-product.png",
        caption: "Definition — product page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326780441-08UMYK6WSYKQE5NJ7JMU/StFrancis-Device-Home.png",
        caption: "St. Francis — homepage",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779786-81IQWBLOAPRPKSH3LK1R/StFrancis-Device-Category.png",
        caption: "St. Francis — category",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779753-C3DXSBEL52V7O1YV5E56/StFrancis-Device-Product.png",
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
    logoScale: 0.75,
    accent: "#00EADA",
    aiSummary:
      "A collection of logo and identity work spanning clients across consumer, lifestyle, food, and personal branding. Marks range from playful illustrative to clean wordmarks, depending on the audience and how the brand needed to feel in use.",
    overview:
      "Logo and identity work for a mix of paying clients and personal projects — wordmarks, illustrative marks, and full identity systems. Every mark here was drawn in Illustrator in the early years: no AI, no prompt, just the Pen tool, a graveyard of extra anchor points, and the wild hope that this time the curve would actually land.",
    images: [
      {
        src: "/work/bohemian-hair-bows-card.jpg",
        caption: "Bohemian Hair Bows — logo and product card",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463214-AW8X3YLIHXQIB1GVFWA6/gigglepoo.png",
        caption: "Gigglepoo",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593459897-0H5XDZOLOJNWD1QHTUEQ/babybemine.png",
        caption: "Baby Be Mine",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465947-M92PQ2T8DP9M3I6G6NHE/orionleather.png",
        caption: "Orion Leather",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460738-R59BUTVUBCYPA19EXSLQ/bass.png",
        caption: "Bass",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462820-7LJZAXVEAFTPZKMWD7XZ/dunhamcarr.png",
        caption: "Dunham Carr",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461718-KQL0JND2R1XG9WJBFNIR/chisholmtrail.png",
        caption: "Chisholm Trail",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467310-LC1EG7AQ8F4OTWTVV1G0/Screen%2BShot%2B2022-11-03%2Bat%2B2.11.18%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461933-4GD54TS6L8BLHQ356MAW/circle7.png",
        caption: "Circle 7",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467846-V31NHJHRLP9YB31CKXAZ/sparko.png",
        caption: "Sparko",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462450-K18FXOTL5WC36UWBR8ML/countryhearth.png",
        caption: "Country Hearth",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460100-JGCQW5ZI42N7ERKNAXRR/allah.png",
        caption: "Allah",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463438-H01437G4FTC82RMWEJFE/jessicalynn.png",
        caption: "Jessica Lynn",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466999-H83JWA8KFZ0QYRQH0OCP/Screen%2BShot%2B2022-11-03%2Bat%2B1.51.31%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466845-VEVOKWETUJ91PJBONWDG/Screen%2BShot%2B2022-11-03%2Bat%2B1.50.18%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463885-9Z9XMQ3QPWAX72K8281K/jilli.png",
        caption: "Jilli",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464186-GEEJB3SIXK8CG11V5QL1/kristinanderson.png",
        caption: "Kristin Anderson",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464695-4UFYQVQLPH5CH911VEND/malaka.png",
        caption: "Malaka",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465023-GVM99XE3TSHFU3NXLLJD/mylittlejewel.png",
        caption: "My Little Jewel",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465336-303KAM619OC98GX6XAFT/origami.png",
        caption: "Origami",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593469432-YRO0O6NVTMT6RPUCR9BW/wonkos.png",
        caption: "Wonko's",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467731-14TVIV315JH0H3ZV4VH9/southernliving.png",
        caption: "Southern Living",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468849-3XUNRWTD7XJE87RD1HBD/templatetrader.png",
        caption: "Template Trader",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468958-IGEUTR1VLOFR11UIPKWM/usabride.png",
        caption: "USA Bride",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461261-1FJMQFNCHKCDFEL0CLY1/blackstarr.png",
        caption: "Black Starr",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466025-49K9OCCEH1L707AMJMWE/Screen%2BShot%2B2022-11-03%2Bat%2B1.42.49%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1715958656162-PXTW17VCIIGQ6O2QJWPV/provencal-thumb.jpg",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094175-0ZZBPBUC2XOYMON8UNJC/holiday1+2.43.23+PM.jpg",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094207-HNEM47TFPX4AZ32Z9RH6/Holiday2+2.43.23+PM.jpg",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094816-KPNMAKBPL1DPSNO4SFL7/Volusion-HolidayCard+2.43.24+PM.jpg",
        caption: "Volusion holiday card",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552901-ZUK91M7N582K9KDG5PSF/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.29%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552506-LL9YL5D47JFB4RRLYYCU/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.43%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591553656-FXXC6HMDFLIHM7BHY6I2/Screen%2BShot%2B2022-11-03%2Bat%2B1.46.10%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627485-TVIXZEO42AQLQEV6WBMK/print-fromevelyn+2.43.23+PM.jpg",
        caption: "From Evelyn",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627216-YERG84UEVVK0FQYHOWS3/print-madebyjoy+2.43.23+PM.jpg",
        caption: "Made by Joy",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627963-LAOW14896A4HSFWN1JDC/print-vitagals+2.43.23+PM.jpg",
        caption: "Vita Gals",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686173-DC0V25R1YOFRETGHABIE/Adri+2.43.24+PM.png",
        caption: "Adri",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686493-JJ6K1BAI23L7F1EBO2YQ/print-christineinvite+2.43.23+PM.jpg",
        caption: "Christine — invite",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721541-JO4705XY7T8VL8UG1O7B/Amor+2.43.23+PM.png",
        caption: "Amor",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721618-TO18J4QVCDKMNODTACKH/FakeItTilYaMakeIt+2.43.23+PM.jpg",
        caption: "Fake It 'Til Ya Make It",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591722530-FYH33FRLO67SWQEDTP4M/print-memyselfi+2.43.23+PM.jpg",
        caption: "Me, Myself, & I",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591891691-I9JWERCKS5T60MYBRWJW/Screen%2BShot%2B2022-11-03%2Bat%2B1.52.54%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591895955-V45CCDPTK02VQ0ATLKCR/Screen+Shot+2021-12-01+at+12.59.55+PM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590765493-U248DF258FOBXNGKRNUX/print-shopgrl%2Bcopy.jpg",
        caption: "Shopgrl",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667592293689-0HWYCXINWWPXW3G24UK6/Screen%2BShot%2B2022-11-03%2Bat%2B1.53.54%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590776300-6QQP3A0SGY3E1SSQTW2H/Screen%2BShot%2B2022-11-03%2Bat%2B1.47.45%2BPM.png",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258473-AVMBX10G1K86Y4BEOWMM/cw-fall-2013+2.43.23+PM.jpg",
        caption: "Fall 2013 lookbook",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258255-KMJOCCDALMUWU0T039W0/cw-winter-2013-specialedition+2.43.23+PM.jpg",
        caption: "Winter 2013 special edition",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591260063-M820WMIOE9EAM0IM16XA/Screen%2BShot%2B2022-11-03%2Bat%2B1.55.32%2BPM.png",
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
      { value: "Weeks", label: "15%+ shift to portal after go-live" },
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
      { value: "< 2 min", label: "Routine visit diagnosis target" },
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
      { value: "Self-serve", label: "Brand onboarding unblocked" },
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
    tools: ["Figma", "Miro", "Jira"],
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
