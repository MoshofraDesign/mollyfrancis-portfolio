# Molly Francis — Portfolio

A refreshed Next.js portfolio for Molly Francis, Lead / Principal Product Designer.
Built on top of the existing mollyfrancis.com content with AI-generated case-study summaries, modern motion, and a refined visual system.

## Stack

- **Next.js 14** (App Router)
- **React 18 + TypeScript**
- **Tailwind CSS** for styling (custom palette + type scale)
- **Framer Motion** for page transitions, hero animation, and scroll reveals
- **Google Fonts** — Fraunces (serif display) + Inter (sans body)

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build / preview

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx          Root layout — nav, footer, cursor, transitions
  page.tsx            Homepage — hero, marquee, AI workflows, featured + archive
  work/
    page.tsx          Work index — featured grid + full archive list
    [slug]/page.tsx   Case study template
  about/page.tsx      Bio, principles, experience, skills
  contact/page.tsx    Inquiry form + opportunities
  not-found.tsx       404
  globals.css         Variables, grain, custom cursor, magnetic button, etc.
components/
  Nav.tsx             Sticky nav with active state + mobile menu
  Footer.tsx          Footer with sitemap, socials, big CTA
  ProjectCard.tsx     Grid + row variants
  Reveal.tsx          IntersectionObserver-based scroll reveal
  MagneticButton.tsx  Magnetic hover button
  CursorBlob.tsx      Custom blob cursor (hidden on touch)
  PageTransition.tsx  Framer Motion route transitions
lib/
  projects.ts         Project data + AI-generated summaries
tailwind.config.ts    Custom theme: cream/ink palette, Fraunces/Inter
next.config.mjs       Allowlist for Squarespace CDN images
```

## Notes for the content owner

- **AI summaries** live in `lib/projects.ts` under each project's `aiSummary` field. They were drafted by reading the existing case studies on mollyfrancis.com and condensing each into a 2–3 sentence intro. Tweak freely — the case study template renders them in the dark "Generated summary" card on every project page.
- **Adding a new project**: add an entry to the `projects` array in `lib/projects.ts`. Set `featured: true` to surface it on the homepage and Work index.
- **Images** currently point at the original Squarespace CDN. To self-host, swap the URLs and add the new domain to `next.config.mjs > images.remotePatterns`.
- **Contact form** is wired up to a local success state. Plug in Formspree, Resend, or a Next.js Route Handler in `app/contact/page.tsx`'s `onSubmit` to actually send the email.
- **Resume** link still points to the file on mollyfrancis.com. Replace with a hosted copy when ready.

## Deployment

Recommended: [Vercel](https://vercel.com/) — `vercel` from this directory, or connect this repo to a Vercel project. The site is fully static-friendly and works on Netlify, Cloudflare Pages, or any Node host.

## Roadmap ideas

- Add a "writing" or "talks" section
- Move case study content into MDX so writing happens in `app/work/[slug]/content.mdx`
- Add an `og-image.tsx` route handler for shareable card images
- Light/dark toggle (the palette is already split into ink + cream)
