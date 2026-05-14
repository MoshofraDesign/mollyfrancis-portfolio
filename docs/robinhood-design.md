# Robinhood-Inspired Design Principles

A reference doc for visual and interaction decisions on this portfolio, adapted from Robinhood's design language. Use this as a checklist when adding new pages, components, or styling tweaks.

## Core Philosophy

Robinhood's design solves the same problem a designer portfolio does: take dense, intimidating content and make it feel approachable. Translate that here as:

- **Confidence through restraint.** Show fewer things, well.
- **Information density without overwhelm.** Case studies have a lot to say — present it like a financial dashboard, not a press release.
- **Trust the reader.** Don't pad with marketing language. State what was done.

## Typography

Robinhood pairs a custom geometric sans (Capsule Sans) with judicious display sizing. The portfolio already uses serif (`font-serif`) for emotional moments — keep that contrast.

- **Display headings**: Serif, oversized (80–140px on desktop). Let them dominate.
- **Subheads**: Sans, regular weight, ink/60 opacity for hierarchy.
- **Body**: 16–18px, line-height ~1.6, comfortable for long reads.
- **Mono**: Reserved for numbers, dates, technical tags. Lends a quietly precise feel.
- **Eyebrow labels**: All caps, tracking-[0.25em], text-xs, ink/50. Already in use — keep it consistent.

Avoid mixing more than two weights in a single block. Keep size jumps dramatic (h1 ≫ h2 ≫ body) rather than incremental.

## Color

Robinhood's palette is monochrome with a single vibrant accent. The portfolio's current `cream`/`ink`/`ochre` system already fits this model.

- **Foundation**: Warm cream (`#F5F2EB`-ish) + deep ink black.
- **Single accent**: Ochre — used sparingly for emphasis, links, the occasional callout.
- **No competing accents.** If a section needs a second color, use opacity of the existing palette instead.
- **Subtle washes**: Section backgrounds at 5–10% accent tint. Never flashy.

A rule of thumb: if a page has more than three pops of ochre, remove one.

## Layout & Spacing

- **Hero-driven**: Each page opens with one big claim, breathing room around it, then supporting detail.
- **Grid**: 12-column on desktop, generous gutters (40–80px). Already in place via Tailwind's grid utilities.
- **Asymmetric balance**: Prefer 7/5 or 8/4 splits over centered everything. Asymmetry feels modern; centering feels safe.
- **Whitespace as a feature**: Top/bottom section padding 80–160px. Don't compress.
- **Max-width discipline**: Cap reading columns at `max-w-7xl` (1280px). Longer lines are unreadable.

## Motion

Robinhood's motion is fast, purposeful, and physical.

- **Duration**: 200–400ms for state changes, 600–800ms for entry animations.
- **Easing**: Ease-out (`[0.22, 1, 0.36, 1]`) — feels confident, not bouncy.
- **Page transitions**: Fade + small Y-rise (16–32px). Never slide horizontally.
- **Hover states**: Subtle scale (1.02–1.04) or opacity shifts. No "marketing site" wobble.
- **Stagger reveals**: When a grid loads, stagger by 50–80ms between items. Already done via Reveal/ProjectCard.

## Components

### Cards
- Rounded corners 16–28px (consistent with the existing `rounded-[28px]` system).
- Generous interior padding (24–32px).
- Subtle borders (ink/10) instead of shadows. Shadows can read as dated.

### Project thumbnails
- **Square aspect ratio** (1:1) for grid consistency. Just changed.
- Consistent treatment: same crop logic, same hover behavior across all cards.
- Year/tag pills overlaid in the same corner across the whole site.

### Buttons & links
- Magnetic, pill-shaped (already implemented).
- Two variants only: solid (`MagneticButton`) and ghost. Resist adding a third.
- Link underlines: animated draw-in on hover (the existing `link-underline` class).

### Data presentation
- For case study metrics: large monospace numbers, small descriptive label below.
- Tables: borderless rows, generous row padding (16–20px), monospace for numeric columns only.
- Charts (when added): clean line/bar, minimal axes, ochre for the key data series, ink/30 for context series.

## Imagery

- **Real over stock.** Process photos, sketches, screenshots of actual work — never generic stock.
- **Consistent treatment.** Same color grade, same crop ratio per page.
- **Don't crop tight.** Let images breathe. Subjects rarely need to fill the frame.
- **Square thumbnails** on the work index. Detail pages can use varied aspect ratios.

## Voice & Tone

- **Direct.** State the outcome. "Reduced onboarding time from 12 to 4 days."
- **Specific.** Numbers, names, stakes. Vague generic statements feel like resume filler.
- **Quietly confident.** Don't oversell. The work is the evidence.
- **Avoid**: "passionate," "innovative," "synergy," "world-class," anything a chatbot would write.

## Application Checklist

When building or revising a page, run through these:

- [ ] One big claim above the fold, supported by breathing room.
- [ ] No more than three ochre accents per screen.
- [ ] Section padding ≥ 80px top/bottom on desktop.
- [ ] Display headings use serif; body uses sans.
- [ ] Hover and entry motion ≤ 400ms, ease-out.
- [ ] Cards rounded 16–28px, no shadows.
- [ ] Square thumbnails wherever a project grid appears.
- [ ] Numbers and dates in mono.
- [ ] Copy passes the "would Robinhood say this?" filter — direct, no fluff.

## Anti-patterns

Avoid these — they break the system:

- Multiple competing accent colors in one view.
- Shadows on cards (use borders).
- Centered layouts everywhere (use asymmetric grids).
- Light text on light backgrounds for "subtle" effect (use ink/60 or higher).
- Italic body text (italic is for emphasis, not paragraphs).
- Animation durations > 800ms (feels sluggish).
- Hero claims wider than 8 columns on desktop (becomes a wall of text).
