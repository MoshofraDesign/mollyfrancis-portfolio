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
  accent: string;
  // AI-enhanced description (generated, 2-3 sentences)
  aiSummary: string;
  // Longer overview for case-study pages
  overview: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  metrics?: { label: string; value: string }[];
  research?: string[];
  images?: { src: string; caption?: string }[];
  prototype?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bright-healthcare",
    title: "Prior Authorization Portal",
    subtitle: "Replacing fax with a live, validated authorization workflow",
    client: "Bright HealthCare",
    year: "2021–2022",
    role: "Lead Product Designer",
    tags: ["Healthcare", "Provider tools", "Design system", "0→1"],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1619463661666-4EQEUJPCEE6NJ3FFBOP4/Color.png",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489640575-FE1X3BSOCUHJVV45MVW0/Landing.jpg",
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
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/058f8457-5a7d-42b2-867a-29d8140bd99d/Color.png",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/9049760a-bc08-470b-a819-28ee75091d8a/Provider-Native-Group.png",
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
    role: "Senior Product Designer",
    tags: ["SaaS", "Messaging", "Enterprise"],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580736831479-YXDMO1XPMB8T605ZIU72/Liveperson.png",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580738797928-S404IR0JKTVC5D2VOISQ/Twitter-PublicExample.png",
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
    role: "Senior Product Designer",
    tags: ["FinTech", "Mobile", "Two-sided product"],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/531603c8-fd81-48cd-8c4c-04d0dab6b7d1/new+Care_Logo%402x.png",
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
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555258070452-G8YAI2PTZ97S97DNK29J/athenahealthlogo.png",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462027297-GRU05DN2D33B2JIOLPDP/CH-Dashboard.png",
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
  },
  {
    slug: "athenawell",
    title: "athenaWell",
    subtitle: "Standalone apps for care plans, care teams, and patients",
    client: "athenahealth",
    year: "2017–2018",
    role: "Senior Product Designer",
    tags: ["Healthcare", "Care management", "Native apps", "Personas"],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511793259682-744277WLTQWTDUEI3TNF/logo.png",
    hero: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png",
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
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469827169-WR8GVVBZMQ7UK549Z42D/Native-Group.png",
        caption: "Native apps for patient and care team collaboration",
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1557770189426-JXHTF1H63USRK1TUB5J7/Tasks-1+12.17.12+PM.png",
        caption: "Patient task patterns: numeric, survey, education",
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
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965711930-PYJIKQTS3BVVZTDIDD88/PatientIO-Logo-Color.png",
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
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511206680178-HTOXMD682JJ42BBNJ84B/athena-MDP-group.png",
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
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1445352837378-8FPSDW9COG151VP4RI0M/Mozu-Dashboard.jpg",
    accent: "#0a7cff",
    aiSummary:
      "Redesigned the admin used by Volusion's merchant base — order management, catalog, marketing, and storefront tools. Defined patterns for data-heavy tables, bulk actions, and a navigation that scaled as the product added modules.",
    overview:
      "Volusion's ecommerce admin gave small businesses everything they needed to run an online store. I worked across order management, catalog, storefront, and onboarding — defining patterns that could outlive any one feature.",
  },
  {
    slug: "mozu",
    title: "Mozu",
    subtitle: "Flexible commerce platform for ambitious merchants",
    client: "Volusion / Mozu",
    year: "2014–2015",
    role: "Product Designer",
    tags: ["Ecommerce", "Platform", "Brand"],
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1445352837378-8FPSDW9COG151VP4RI0M/Mozu-Dashboard.jpg",
    accent: "#222",
    aiSummary:
      "Mozu was Volusion's enterprise platform play — flexible storefronts, multi-channel commerce, and a modular admin. I contributed to the product UI, brand surfaces, demo storefronts, and the visual language that positioned Mozu against established players.",
    overview:
      "Mozu provided online merchants with a flexible shopping cart system and control over the look, content, and functionality of their store. Multi-channel marketing, search, and catalog management rounded out the platform.",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
