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
 * Three columns is the layout. It holds from md (768px) up, so any laptop
 * window — not just a maximised one — gets three across; below that it steps
 * to two, then one on a phone. Three only started at lg (1024px) at first,
 * which meant a window a little under full width quietly dropped to two.
 *
 * A fixed count per breakpoint, rather than the auto-fill this used to be:
 * auto-fill worked the count out from whatever happened to fit, which is why
 * the row came out four up on a desktop and changed size on its own between
 * breakpoints.
 *
 * The columns are 1fr, so inside a breakpoint they divide the rail exactly and
 * scale with it — no capped column width leaving a remainder to centre. Three
 * columns run ~219px at 768px, ~296px at 1000px, and ~379px once the rail caps
 * at 1280px, about the 375px the tiles were originally drawn at.
 */
export const WORK_THUMB_GRID_CLASS =
  "grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3";

/** Square tile that fills its column, with a 4px radius. */
export const WORK_THUMB_TILE =
  "relative aspect-square w-full overflow-hidden rounded-[4px]";
