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
