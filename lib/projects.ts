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
      "Redesigning the app rewards experience and the internal tool that powers it",
    client: "Netspend",
    year: "2024–2026",
    role: "Lead UX Designer",
    tags: ["FinTech", "Rewards", "Design system", "AI-augmented workflow"],
    thumbnail: "/work-thumbnails/netspend.webp",
    logo: "/logos/netspend.svg",
    accent: "#323232",
    featured: true,
    aiSummary:
      "Led design on Netspend's app Rewards program and Unified Commerce Media (UCM) — the internal tool that builds and manages the rewards surfaced on the consumer app. Reworked the consumer rewards layout and information architecture around new features shipped in UCM, using Claude, Gemini, and Figma Make throughout research synthesis and prototyping.",
    overview:
      "Netspend's app Rewards program needed a consumer layout that could keep pace with what the internal Unified Commerce Media tool made possible — new reward types, new merchant partnerships, more configuration — without the experience turning into a junk drawer. UCM is the system of record: it's where the team builds and manages every reward that eventually surfaces to cardholders.",
    approach:
      "I owned design across both sides of this: the UCM internal tool merchandising/ops teams use to build and manage rewards, and the consumer-facing rewards layout and IA that had to scale with it. Heavy use of generative and moderated user testing shaped both. AI tools — Claude, Gemini, and Figma Make — assisted research synthesis and rapid prototyping, letting me test more layout directions per round than a fully manual process would allow.",
    outcome:
      "A consumer rewards experience with an IA that scales as UCM ships new reward types, and an internal tool that lets non-technical teams configure rewards without engineering tickets.",
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
    accent: "#185fa5",
    featured: true,
    aiSummary:
      "Designed an electronic-recording portal that lets title companies submit deeds and recordings directly to county offices — replacing the third-party submitters that traditionally sit between them. AI tooling sped up the research synthesis: Dovetail clustered interview transcripts, and an in-house GPT prompt converted Userbit usability findings into prioritized Jira tickets the day after each session.",
    overview:
      "Recording a deed used to mean handing paper (or fax) to a third-party submitter who relayed it to the county. GovOS eSubmission gave title companies a direct channel: upload documents, validate compliance, and settle payments by ACH — all without leaving the portal. The county side gets clean structured data, drops manual scanning, and serves submitters directly.",
    problem:
      "Electronic recording was indirect and expensive. Title companies paid intermediaries to relay documents, county recorders re-scanned everything by hand, and payment reconciliation was a per-document mess. Submitters had no visibility into status until the recording cleared.",
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
      "I led design across discovery, prototyping, validation, and rollout. Generative interviews with title-company submitters and county recorders shaped a step-by-step submission flow with a persistent progress bar, a built-in document-compliance review assistant, and a checkout that consolidated dozens of recordings into a single ACH transfer. Round-the-loop usability testing in Userbit surfaced 12+ issues per session — synthesized in Dovetail, prioritized with the PM in an AI-assisted impact/effort sort, and queued into Jira ahead of development.",
    outcome:
      "eSubmission shipped as a self-serve product. The Cuyahoga County recorder called it \"a fantastic opportunity to more directly and better serve our title companies,\" and one Berks County title abstractor said they could \"pull someone off the street and show them how to do this in about 20 minutes.\" Counties run a single ACH report per submitter per period; the old reconciliation queue disappeared.",
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
    year: "2021–2022",
    role: "Principal Product Designer",
    tags: ["Healthcare", "Provider tools", "Design system", "0→1"],
    thumbnail: "/work-thumbnails/bright-healthcare-figma.webp",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489640575-FE1X3BSOCUHJVV45MVW0/Landing.jpg",
    logo: "/logos/bright-healthcare.svg",
    accent: "#3a6e8f",
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
      { label: "Monthly active users", value: "100 → 10K" },
      { label: "Operational savings", value: "$1.9M" },
      { label: "Intake time reduction", value: "50%" },
      { label: "2022 forecasted savings", value: "$2.5M" },
    ],
    prototype:
      "https://www.figma.com/proto/cxXiQ6LQOpNNjWi4Auf2DC/Bright-Provider-PreAuthPortal",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/6a83a6f4-3382-4474-a3d6-85c0bad4e6df/BH-PortFax.png",
        caption:
          "The prior authorization fax form providers used before the Portal existed.",
      },
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
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/9049760a-bc08-470b-a819-28ee75091d8a/Provider-Native-Group.png",
    logo: "/logos/docsquad.svg",
    accent: "#2f6e5d",
    featured: true,
    aiSummary:
      "Rebuilt a desktop-only telehealth tool into a unified provider experience across desktop and native mobile (Flutter). Generative research with 'virtual moonlighter' clinicians shaped a workflow that can diagnose a routine visit in under two minutes — without a second video call.",
    overview:
      "Providers already carry heavy clinical schedules and tedious EHR work. DocSquad's old desktop tool added another platform without easing the load. We rebuilt the experience end-to-end — desktop and native mobile in Flutter — around the modern reality of telemedicine: asynchronous intelligent interviews collect symptoms, and providers diagnose, prescribe, or escalate quickly.",
    problem:
      "The legacy product assumed synchronous video for every visit and required heavy data entry. Providers wanted to treat patients in minutes, not maintain a parallel EHR.",
    approach:
      "Led discovery with 'Virtual Moonlighters' — clinicians picking up shifts on the side — to understand what would actually fit into their week. From there I shaped a new design system, refactored the diagnosis flow to support both async and sync modalities, and partnered with engineering on a Flutter implementation that shipped the same UI to web and native.",
    outcome:
      "A single design system spans the patient and provider apps. Providers can complete routine async visits (urgent care, prescription refills) in as little as two minutes. Custom illustration and a calmer visual language replaced a clinical, dated UI.",
    research: [
      "5 generative interviews with practicing virtual clinicians",
      "Power-user comparison with Patient IO veterans",
      "Onboarding teardowns of competing telehealth platforms",
      "Resonance testing of the Digital Diagnosis workflow",
    ],
    prototype:
      "https://www.figma.com/proto/Bx8fqdyIcTj47ecKAdRGXg/DST_DES_Provider_Desktop",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/4b2ec0d1-89e3-4c05-8a23-053303f95c99/Screenshot+2023-01-15+at+2.35.png",
        caption: "Virtual moonlighter research, methods and findings",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/3fd58c3c-6a14-476c-a087-596685afc660/Page-Visit-MASTER-wDrawer.png",
        caption: "Provider visit view with collaborative drawer",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/6d59c7f7-3cea-4a82-b055-737ce5010839/DS-GetCare.jpg",
        caption: "Patient — Get Care modality selection",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/f9c3cb73-9cb5-47d5-8a3d-fc4c84bbacc5/GetCare-Interview-FollowUpCare.jpg",
        caption: "Async intelligent interview and follow-up care",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/0459224a-b153-4792-a831-b71431df373f/DS-LoggedIn.jpg",
        caption: "Patient dashboard — logged in",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/3ae628cf-bbed-4581-878d-f6b77fe14fb0/icons+3.25.22+PM.jpg",
        caption: "Custom illustration set for the new design system",
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
    thumbnail: "/work-thumbnails/liveperson-figma.webp",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580738797928-S404IR0JKTVC5D2VOISQ/Twitter-PublicExample.png",
    logo: "/logos/liveperson.svg",
    accent: "#5b6cff",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580740297879-79PSPSYKH5N02J9ZE1J3/SocialConnect-Logo-Color.png",
        caption: "SocialConnect identity",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580743086322-L6ILER7K3CPFW4WMCO1E/Accounts-Multiple.png",
        caption: "Self-service: connect, assign, and manage social accounts",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580743508177-H3C8QOVWQ7ZX0XAXER1I/Twitter-Landing-01.png",
        caption: "Future vision — SocialConnect inside the agent workspace",
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
    accent: "#c1395c",
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
    slug: "consumer-health",
    title: "Consumer Health Patient Portal",
    subtitle: "Re-architecting a 25M-patient portal around what people actually do",
    client: "athenahealth",
    year: "2018–2019",
    role: "Senior Product Designer · IA lead",
    tags: ["Healthcare", "Information architecture", "Responsive"],
    thumbnail: "/work-thumbnails/athenahealth-figma.webp",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462027297-GRU05DN2D33B2JIOLPDP/CH-Dashboard.png",
    logo: "/logos/athenahealth.svg",
    accent: "#76358f",
    aiSummary:
      "Led the IA and navigation redesign of athenahealth's patient portal — used by 25M registered patients. Cards, scrolls, and category labels were tested with hundreds of users to surface a structure that didn't bury appointments under 'Test Results' and that finally worked on mobile.",
    overview:
      "The legacy portal landed users on Test Results — a single sub-category — and obscured everything else. With 92% of healthcare consumers saying customer experience is a top strategic priority for providers, the structure was costing athena's clients renewals. We rebuilt the IA, dashboard, and navigation for responsive web and laid groundwork for native iOS/Android apps.",
    approach:
      "Card sorts in Optimal Workshop, unmoderated remote testing, and content audits drove a new taxonomy. Designed a consolidated My Health dashboard, mobile-first navigation, and a system that could degrade gracefully across athena's many client deployments.",
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
    subtitle: "Standalone apps for care plans, care teams, and patients",
    client: "athenahealth",
    year: "2017–2018",
    role: "Senior Product Designer",
    tags: ["Healthcare", "Care management", "Native apps", "Personas"],
    thumbnail: "/work-thumbnails/athenahealth-figma.webp",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png",
    logo: "/logos/athenahealth.svg",
    accent: "#1d8a8a",
    aiSummary:
      "Designed an 'untethered' care management system that travels with the patient across the network — coordinating clinicians, partners, and patients around one source-of-truth care plan. Built the experience for three patient personas (healthy, rising risk, high risk) with very different relationships to their own health.",
    overview:
      "athenaWell coordinated care across the athenahealth network — Clinicals, Population Health, Epocrates, and MDP partners — through delightful patient and care-team apps. We turned care plans, problems, goals, and interventions into shared, queryable, regulator-aligned data, so different teams could collaborate without duplicating work.",
    research: [
      "Resonance testing with 5 patients across health profiles",
      "Power-user feedback from Patient IO veterans",
      "Cross-functional reviews with care management leadership",
    ],
    approach:
      "Established three patient personas (Healthy, Rising Risk, High Risk) with distinct values, goals, and pain points. Designed a Care Plan landing, task patterns (numeric, survey, education), and a content surface for assessments, programs, and discharge management.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349531314-89U1IJ39DE46WB88QYI0/Screen+Shot+2017-12-15+at+8.51.43+AM.png",
        caption: "Care Team section — communicate with doctors, video chat",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513347566910-HH68WSGR9O1PVB5XS541/Screen+Shot+2017-12-15+at+8.16.49+AM.png",
        caption: "Timeline — users confused this with a notes section",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349705989-WQ7I6ILZSZLZKCM94VK3/image-asset.png",
        caption: "Education content tied to specific health concerns",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349151416-RF4TP9N5LWQVAAVQGQB7/Screen+Shot+2017-12-15+at+8.44.23+AM.png",
        caption: "Goal charts — patients want device sync (Validic)",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513348975246-YKX6GH1QTGSD7AYQAJJ2/Screen+Shot+2017-12-15+at+8.37.37+AM.png",
        caption: "Patient task header with date scroller and progress heart",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513351438113-EPM17AK9DDN1K1WP606Q/Screen+Shot+2017-12-15+at+9.22.51+AM.png",
        caption: "Care Plans separated into tabs by health concern",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/7ee7afe8-0b05-49b4-945f-c262783bd07a/image+15.png",
        caption: "Three patient personas: Healthy, Rising Risk, High Risk",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511797670597-GC4XEDFX1GCSSHSPBH8T/Screen+Shot+2017-11-27+at+9.47.42+AM.png",
        caption: "Care management services that span the network",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469827169-WR8GVVBZMQ7UK549Z42D/Native-Group.png",
        caption: "Native apps for patient and care team collaboration",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512147964858-EC8HGJ01NLT5B50QQIK9/image-asset.png",
        caption: "Content services for patients and care teams",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511799588851-C976JM5PO3QPNJIZ883Q/Artboard.png",
        caption: "Automation engine — workflow automation, IFTTT editor",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511887822756-7ZM6EN7LRVHC4UP8YMJR/collaboration.png",
        caption: "Standalone apps for care teams to collaborate",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1557770189426-JXHTF1H63USRK1TUB5J7/Tasks-1+12.17.12+PM.png",
        caption: "Patient task patterns: numeric, survey, education",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511882483036-EAJSG05F7LF78N78MFO8/image-asset.png",
        caption: "Style guide",
      },
    ],
  },
  {
    slug: "patient-io",
    title: "Patient IO",
    subtitle: "A patient engagement platform that bridges visit-to-visit",
    client: "athenahealth (acquired)",
    year: "2016–2017",
    role: "Product Designer",
    tags: ["Healthcare", "Mobile", "Behavior change"],
    thumbnail: "/work-thumbnails/athenahealth-figma.webp",
    logo: "/logos/athenahealth.svg",
    accent: "#e07a3c",
    aiSummary:
      "Patient IO gave health professionals a way to track behaviors between visits and helped patients stay on top of complex treatment regimens. I owned medication design — including a generative pill-shape component system drawn from Epocrates data — so every prescription rendered correctly without artwork-per-drug.",
    overview:
      "PatientIO bridged the gap between office visits — tracking medications, vitals, and care plan adherence, and pushing data back to clinicians. The medication module had to scale to thousands of drugs, so we built a component system that drew each pill correctly from structured Epocrates data.",
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
    slug: "athenahealth-marketplace",
    title: "athenahealth Marketplace 2.0",
    subtitle: "A discovery platform for health-tech partners and clinical buyers",
    client: "athenahealth",
    year: "2017",
    role: "Senior Product Designer",
    tags: ["B2B", "Marketplace", "CMS"],
    thumbnail: "/work-thumbnails/athenahealth-figma.webp",
    logo: "/logos/athenahealth.svg",
    accent: "#3b5bdb",
    aiSummary:
      "Rebuilt the MDP marketplace so partners could self-publish, clinicians could find products faster, and athena could measure intent across the funnel. Filtering, partner pages, and tracking were redesigned together — partners maintain their own content; athena curates discovery.",
    overview:
      "The MDP Network connects entrepreneurs, investors, clinicians, and industry experts disrupting healthcare. Marketplace 2.0 improved discovery (search, filtering, partner and product pages), enabled athenaNet integration, gave partners self-service tools, and instrumented the experience for measurement.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511207209997-R12D4EVUIDA0RXGDUX90/athena-MDP-Landing.png",
        caption: "Public marketplace landing",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511208886561-QEYLKEZXK4YNYD3U9EI9/athena-MDP-responsive.png",
        caption: "Responsive partner page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511208615512-TOZSQLS04IT7XF998XIQ/athena-MDP-2.jpg",
        caption: "Filtering and product discovery",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511208983621-R0HR2E9SSSTBL2GHIHBR/image-asset.png",
        caption: "Marketplace detail surfaces",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511209804473-70IPUOD52W9HAPR1DB7A/image-asset.jpeg",
        caption: "athenaNet user self-service tools — partners manage their own content",
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
    accent: "#0a7cff",
    aiSummary:
      "Redesigned the admin used by Volusion's merchant base — order management, catalog, marketing, and storefront tools. Defined patterns for data-heavy tables, bulk actions, and a navigation that scaled as the product added modules.",
    overview:
      "Volusion's ecommerce admin gave small businesses everything they needed to run an online store. I worked across order management, catalog, storefront, and onboarding — defining patterns that could outlive any one feature.",
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
    slug: "mozu",
    title: "Mozu",
    subtitle: "Flexible commerce platform for ambitious merchants",
    client: "Volusion / Mozu",
    year: "2014–2015",
    role: "Senior Product Designer",
    tags: ["Ecommerce", "Platform", "Brand"],
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    accent: "#222",
    aiSummary:
      "Mozu was Volusion's enterprise platform play — flexible storefronts, multi-channel commerce, and a modular admin. I contributed to the product UI, brand surfaces, demo storefronts, and the visual language that positioned Mozu against established players.",
    overview:
      "Mozu provided online merchants with a flexible shopping cart system and control over the look, content, and functionality of their store. Multi-channel marketing, search, and catalog management rounded out the platform.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1445352837378-8FPSDW9COG151VP4RI0M/Mozu-Dashboard.jpg",
        caption: "Mozu dashboard",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1447607206085-XXEGCSJKLL1DMYTPFLG3/Style+Guide+Option+1.png",
        caption: "Style guide exploration",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422380202365-4M7I5HHJHCOJBQHBPOVA/Web-MysticSportsDemo.jpg",
        caption: "Demo storefront — Mystic Sports",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422380355242-98VVE5W07AV1RS05VY0S/FutureOfShopping-molly-final.jpg",
        caption: "Future of shopping — concept",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423167879870-FVGY2CMMRHL0334U07CG/mozuswag.png",
        caption: "Mozu swag",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422380282144-NG5ULUBDWM460PLUKQ2P/Ad-Molly.jpg",
        caption: "Advertisement",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1447607256429-DDF0485AM32PEDNCXW4I/InsideCover-Exploration.jpg",
        caption: "Inside cover exploration",
      },
    ],
  },
  {
    slug: "onboarding",
    title: "Ecommerce Admin Onboarding",
    subtitle: "Helping new Volusion free-trial users sign up and start selling",
    client: "Volusion",
    year: "2015–2016",
    role: "Senior Product Designer",
    tags: ["Ecommerce", "Onboarding", "SaaS"],
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    accent: "#2f6e5d",
    aiSummary:
      "Designed the onboarding flow new Volusion free-trial customers walked through on their way to a live store — competitive research, sketches, three workflow options, prototypes, and user testing. Goal was to bump trial-to-paid conversion by getting merchants past setup faster.",
    overview:
      "An e-commerce software solution for a wide range of businesses needed to convert more free-trial users into paying customers. The team ran competitive research, sketched flows, narrowed to three workflow candidates, and prototyped the winner in InVision for testing.",
    approach:
      "Lots of whiteboarding and collaborative sketching narrowed the flows to three iterations. Product managers, engineers, designers, sales, and support all fed into the process — sales and customer support brought feature requests and reported pain points throughout.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511977251623-DJMYF373QEVG1DTUATTQ/sketch.png",
        caption: "Early whiteboarding and sketches",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511977264098-MEX3I9CMNZMGMBLE6H7V/image-asset.png",
        caption: "Three workflow options after iteration",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1460488316766-9X4EFRWXZ9K56SJVWT4E/image-asset.gif",
        caption: "Prototyped onboarding flow",
      },
    ],
  },
  {
    slug: "storefront-editor",
    title: "Storefront Editor",
    subtitle: "Inline editing so new merchants could customize their store immediately",
    client: "Volusion",
    year: "2015–2016",
    role: "Senior Product Designer",
    tags: ["Ecommerce", "Front-end editor", "SaaS"],
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    accent: "#2f6e5d",
    aiSummary:
      "Built an inline storefront editor so Volusion's free-trial customers could upload a logo, edit navigation, swap content blocks, and manage themes without leaving the front end. 75% of new customers wanted to start customizing immediately — this took the friction out.",
    overview:
      "Volusion's storefront editor let merchants edit their store from the front end with a clear path back into the admin. Research with sales and customer support confirmed the demand. The biggest constraint was the legacy .asp codebase — every interaction had to thread that needle without overwhelming new customers.",
    approach:
      "Competitor research, interviews with sales and customer support, content builder modules for hero, colors, navigation, and logos. Iterated on the editor's open and closed states across many states (theme picker, color options, hero select, logo placement) to keep the UI calm during edit mode.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965376270-XA8FL44C6KYTMIED72QD/00%2BEdit%2BClosed.jpg",
        caption: "Storefront with editor closed",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965372460-FIJQLLVYWY0R6IUBX66U/Content%2BBuilder%2B-%2BColor%2BOptions%2B-%2BComplete.jpg",
        caption: "Content Builder — color options applied",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965373705-04E6JNWMB1UXKU3OZIGA/Content%2BBuilder%2B-%2BHero%2BSelect%2B2.jpg",
        caption: "Content Builder — hero select",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965377412-9YJMP2DFVQXIBU81BB7I/Content%2BBuilder%2B-%2BColor%2BOptions%2B-%2BDropdown.jpg",
        caption: "Content Builder — color options dropdown",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965373140-NU7FOUSCHOLN56Z78MGE/Content%2BBuilder%2B-%2BColor%2BOptions.jpg",
        caption: "Content Builder — color picker",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965373660-QUQ7UOAT2N5W52G6224O/Content%2BBuilder%2B-%2BHero%2BSelect.jpg",
        caption: "Content Builder — hero select state",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965372758-OVBJO6P6YEG4YCYZO7XQ/05-1%2BCB%2B-%2BCB%2BStructure%2BCopy.jpg",
        caption: "Content Builder structure",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965377418-E754Z42RC0AGOBRZ6LK4/Logo-ImageEmpty.jpg",
        caption: "Logo placement — empty state",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965378501-X7HX7OP5Q8B163ZF142F/Logo-ImageAdded.jpg",
        caption: "Logo placement — uploaded",
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
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    accent: "#993556",
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
    slug: "volusion-gallery",
    title: "Volusion",
    subtitle: "Marketing visual design — site, swag, ads, banners, promos",
    client: "Volusion",
    year: "2013–2016",
    role: "Senior Product Designer",
    tags: ["Brand", "Marketing", "Visual design"],
    thumbnail: "/work-thumbnails/volusion-figma.webp",
    accent: "#534ab7",
    aiSummary:
      "A wide gallery of work from Volusion's internal marketing department — Volusion.com pages, the employee swag site, landing pages, advertising, banners, and promos. The swag store was a fully responsive ecommerce experience with photography of products and the people wearing them.",
    overview:
      "Visual design across Volusion's marketing surfaces, including the employee swag store (responsive ecommerce with custom product photography), Volusion.com landing pages, the India landing site, and a range of marketing campaigns.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1446124598217-SMHUMTEN8T4GU22LT4O2/vnext-homepage.jpg",
        caption: "vNext homepage concept",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1446124664197-6C1Q183C10QT00A0Q569/volusion-imac.png",
        caption: "Volusion Swag — responsive employee store",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423153710411-QZJO0C1V58VTCHTN9KYV/Volusion-Services-Landing.jpg",
        caption: "Volusion services landing",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423153632703-DLAKRATJFJOAP1RLJWHQ/Volusion-StoreShowcase.png",
        caption: "Store showcase",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422911303704-3MV613XLG2Q7PN953GIT/web-spotify.jpg",
        caption: "Spotify-inspired marketing page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423153632110-JN8U1JFWS20POST6ICUK/Blog_ResponsiveThemeImprovement.jpg",
        caption: "Blog — responsive theme improvement",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423493717026-GEAKBYS3JNSJ587CGK4M/volusion-indialanding.png",
        caption: "Volusion India landing page",
      },
    ],
  },
  {
    slug: "bohemian-hair-bows",
    title: "Bohemian Hair Bows",
    subtitle: "Logo, brand kit, and style guide for an eclectic bow brand",
    client: "Bohemian Hair Bows",
    year: "2014",
    role: "Designer",
    tags: ["Brand", "Logo", "Style guide"],
    thumbnail: "/work-thumbnails/bohemian-hair-bows.webp",
    accent: "#d4537e",
    aiSummary:
      "A Volusion client purchased a logo, brand kit, and style guide for their eclectic bow brand. The mark was traced from a vintage Valentine character and her cat, then simplified through a series of iterations until the line work felt modern and ownable.",
    overview:
      "Bohemian Hair Bows sells a variety of eclectic bows and wanted a logo built around a vintage Valentine girl character with her cat. I began by tracing the vintage card in Illustrator and then simplified the artwork in steps until the final mark was clean enough to scale across packaging, print, and web.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422913536234-GEZ4TJXBYK6U46ZQWPCB/Logo-BohemianHairBows-2.png",
        caption: "Final logo — Bohemian Hair Bows",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422378919468-M0ZXRYNS18CJHNCYALLF/print-bohemian.jpg",
        caption: "Print collateral",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422918265526-6F32WTQVS9JMV0WHZEVO/Bohemian-Styleguide.jpg",
        caption: "Style guide",
      },
    ],
  },
  {
    slug: "eclectic-provencal",
    title: "Eclectic Provencal",
    subtitle: "Responsive ecommerce + brand for a vintage Provençal furniture store",
    client: "Eclectic Provencal",
    year: "2015",
    role: "Designer",
    tags: ["Ecommerce", "Brand", "Responsive"],
    thumbnail: "/work-thumbnails/eclectic-provencal.webp",
    accent: "#8a5a3b",
    aiSummary:
      "Logo, brand, and responsive ecommerce design for a vintage Provençal furniture store. Built out homepage, category, and product flows for desktop, tablet, and mobile, plus a style guide that kept the warm-mid-century mood consistent across the whole store.",
    overview:
      "Vintage and handcrafted Provençal furniture needed a storefront that felt warm and editorial, not template-y. The work spanned logo, brand kit, full storefront mockups across breakpoints, and a style guide for the merchant to maintain.",
    images: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422398789354-DSYZ3RRADRPU2SL4IDC9/provencal-logo.png",
        caption: "Logo",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909522259-P7GSIEKXJV8IH2KK6MD0/provencal-devicemock.png",
        caption: "Homepage across devices",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909653937-K5YQVCMG51D6IHV1KQ15/desktop-homepage-hover2.jpg",
        caption: "Desktop homepage with hover state",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422910501460-ZJMNVIUA61NXNVRQCNVU/mobile-tablet-homepage.png",
        caption: "Mobile + tablet homepage",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909760933-0WUHOR46B4SW27MZJJ6O/provencal-category-device.png",
        caption: "Category — devices",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909928769-3UI2C0WE464OAOGBQK32/desktop-category.jpg",
        caption: "Desktop category page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1447425094165-7ITXXOPHBLHMTHS7HFPL/mobile-tablet-category.png",
        caption: "Mobile + tablet category",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1447425040529-LGQTEH90FC6HRUL334G5/provencal-product-device.png",
        caption: "Product — devices",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909699126-7TQMEOWNKOJQX76DX2LK/desktop-product.jpg",
        caption: "Desktop product page",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1447425134588-A7HAAQVGEY50FGP6EH6N/mobile-tablet-product.png",
        caption: "Mobile + tablet product",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422909417402-X9849TFTOV7QTSZXCFLV/provencal-styleguide.png",
        caption: "Style guide",
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
    accent: "#1d9e75",
    aiSummary:
      "A collection of logo and identity work spanning clients across consumer, lifestyle, food, and personal branding. Marks range from playful illustrative to clean wordmarks, depending on the audience and how the brand needed to feel in use.",
    overview:
      "Logo and identity work for a mix of paying clients and personal projects — wordmarks, illustrative marks, and full identity systems.",
    images: [
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
    title: "Print",
    subtitle: "Print design across holiday cards, invites, and editorial",
    client: "Various",
    year: "2010–2022",
    role: "Designer",
    tags: ["Print", "Editorial", "Brand"],
    thumbnail: "/work-thumbnails/print-figma.webp",
    logo: "/logos/print.svg",
    accent: "#639922",
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
