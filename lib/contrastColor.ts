/**
 * Given a hex color, returns "#141414" (ink) or "#f5f5f5" (cream) —
 * whichever reads better on top of it. Used on /v2 case-study pages,
 * which paint the project's accent color full-bleed.
 */
export function contrastColor(hex: string): "#141414" | "#f5f5f5" {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  // Perceived luminance (WCAG-ish approximation)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#141414" : "#f5f5f5";
}


/** Relative luminance per WCAG 2.x. */
function relativeLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const channels = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio between two hex colours, 1:1 to 21:1. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function scale(hex: string, k: number): string {
  const clean = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const out = [0, 2, 4]
    .map((i) => Math.max(0, Math.min(255, Math.round(parseInt(clean.slice(i, i + 2), 16) * k))))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
  return `#${out}`;
}

/**
 * A background/foreground pair for text set on a project's accent colour that
 * clears WCAG AA for normal text (4.5:1).
 *
 * White text on the accent fails on most of them — #FFAF00 gives 1.84:1 — so
 * this picks whichever of white or ink reads better, and when neither clears
 * 4.5 (only #8759F2, at 4.43:1 and 4.16:1) it darkens the accent in 4% steps
 * until white does. The returned bg is what the overlay should paint.
 */
export function readableOnAccent(accent: string): { bg: string; fg: string } {
  const WHITE = "#ffffff";
  const INK = "#141414";
  const onWhite = contrastRatio(accent, WHITE);
  const onInk = contrastRatio(accent, INK);
  if (Math.max(onWhite, onInk) >= 4.5) {
    return { bg: accent, fg: onWhite >= onInk ? WHITE : INK };
  }
  for (let k = 0.96; k >= 0.6; k -= 0.04) {
    const bg = scale(accent, k);
    if (contrastRatio(bg, WHITE) >= 4.5) return { bg, fg: WHITE };
  }
  return { bg: scale(accent, 0.6), fg: WHITE };
}

/**
 * White or ink on a given background — whichever actually measures better.
 *
 * Not the same as contrastColor(), which decides from a 0.299/0.587/0.114
 * perceived-luminance threshold rather than a real WCAG ratio, and so picks
 * the WORSE of the two on eight of the site's fourteen accents (#00CCB7:
 * light at 1.87:1 where ink gives 9.05:1). Left alone for now because
 * flipping it changes the text colour on eight project pages, which is a
 * design decision rather than a fix. New code should use this.
 */
export function readableOn(bg: string): string {
  const WHITE = "#ffffff";
  const INK = "#141414";
  return contrastRatio(bg, WHITE) >= contrastRatio(bg, INK) ? WHITE : INK;
}
