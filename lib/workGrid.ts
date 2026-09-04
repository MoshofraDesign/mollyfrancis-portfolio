/**
 * Layout tokens for the project thumbnail grid — the homepage work grid and
 * the Logos case study, which share the same tiles.
 *
 * These deliberately live outside components/CareGrid.tsx. CareGrid is a
 * "use client" module, and when a Server Component imports a plain value from
 * a client module it gets a client-reference proxy rather than the value —
 * so `${WORK_THUMB_SECTION}` rendered as the literal string "[object Object]"
 * and both grids silently lost their rail, max width and padding. (Visible in
 * the deployed HTML as class="[object Object] scroll-mt-24 py-16".) Keeping
 * them in a neutral module means the server pages get the real strings.
 */

/** Shared page rail — see .site-rail in globals.css. */
export const WORK_THUMB_SECTION = "site-rail";

/**
 * Three columns at lg, stepping down to two and then one. A fixed count per
 * breakpoint, rather than the auto-fill this used to be: auto-fill worked the
 * count out from whatever happened to fit, which is why the row came out four
 * up on a desktop and changed size on its own between breakpoints.
 *
 * The columns are 1fr, so inside a breakpoint they divide the rail exactly and
 * scale with it — no capped column width leaving a remainder to centre. At the
 * 1280px rail, three columns land at ~379px, about the 375px the tiles were
 * originally drawn at.
 */
export const WORK_THUMB_GRID_CLASS =
  "grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3";

/** Square tile that fills its column. */
export const WORK_THUMB_TILE = "relative aspect-square w-full overflow-hidden";
