"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { readableOnAccent, readableOn } from "@/lib/contrastColor";
import { WORK_THUMB_GRID_CLASS, WORK_THUMB_TILE } from "@/lib/workGrid";

type Props = {
  projects: Project[];
};


/**
 * Grid of square project tiles, modeled on Figma's "Care" / "Care - Hover"
 * thumbnail states: the thumbnail image sits under a flat accent-colored
 * overlay (project.accent) at partial opacity, with the client's white SVG
 * logo centered over it. On hover the overlay goes fully opaque and the
 * logo is replaced by the project title + subtitle. No rounded corners
 * anywhere, by design.
 *
 * Three up on desktop with gutters between them, like mollyfrancis.com's
 * work grid — not edge-to-edge. Column count and rail live in lib/workGrid.
 */
export default function CareGrid({ projects }: Props) {
  return (
    <div className={WORK_THUMB_GRID_CLASS}>
      {projects.map((project) => {
        /* Two colours, two states — they were one, which is why changing
           the hover changed the tile.

           At REST the tile is the project's own bright accent, untouched:
           that's the colour Molly wants in the grid, with the white logo
           on it.

           On HOVER it becomes the colour of the page it opens, so the tile
           previews where you're going. Where a project hasn't declared a
           page colour, fall back to deriving an accessible one from the
           accent — the hover is where the body copy sits, and several raw
           accents don't clear 4.5:1 with white or ink. */
        const restBg = project.thumbRest ?? project.accent;
        const hoverSource = project.thumbHover ?? project.pageBg;
        const { bg: hoverBg, fg } = hoverSource
          ? { bg: hoverSource, fg: readableOn(hoverSource) }
          : readableOnAccent(project.accent);
        return (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={`group thumb-cq block ${WORK_THUMB_TILE}`}
          /* A wide, low-opacity shadow — not a card lift. It only goes on
             the tiles whose accent is light enough to float against the
             page (today, Bright's yellow). */
          style={
            project.thumbShadow
              ? { boxShadow: "0 26px 70px -28px rgba(20,20,20,0.45), 0 10px 30px -18px rgba(20,20,20,0.22)" }
              : undefined
          }
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="375px"
            className="object-cover"
          />

          {/* Colour-MASTER overlay, in two layers. The accent at 80% is the
              resting tile; the hover colour (the page it opens, or an
              explicit thumbHover) fades in over it, fully opaque so the
              accent underneath doesn't tint it. */}
          <div
            className="absolute inset-0 opacity-80 transition-opacity duration-500 ease-out"
            style={{ backgroundColor: restBg }}
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            style={{ backgroundColor: hoverBg }}
          />

          {/* Default state: client's white SVG logo, centered — only
              rendered once a logo asset actually exists for this project. */}
          {project.logo && (
            <div className="absolute inset-0 flex items-center justify-center p-[7cqw] opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0">
              <div
                className="relative h-full w-full max-h-[33cqw] max-w-[85%]"
                style={{ transform: `scale(${project.logoScale ?? 1})` }}
              >
                {/* unoptimized: the optimizer only passes SVGs through with
                    dangerouslyAllowSVG set, and these are our own trusted
                    assets — same fix as the GovOS case study page. */}
                <Image
                  src={project.logo}
                  alt={`${project.client} logo`}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Hover state: title + subtitle, left-aligned and vertically
              centered in the tile, with sizes that step down at each
              breakpoint rather than scaling continuously. Leading is set
              per line rather than left on `leading-relaxed`: at the 20px
              subtitle that was 32.5px of line height, which read as a gap
              between lines rather than a paragraph. */}
          <div className="absolute inset-0 flex flex-col justify-center p-[7cqw] text-left opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
            {/* Both sizes are up a step for desktop. The middle term is in
                cqw, so it's the tile's own width that drives them and the
                increase lands where the tiles are biggest — a 379px tile at
                the capped rail goes 28px to 36px on the title.

                The subtitle needed its cqw raised, not just its ceiling: at
                4.6cqw it rendered ~17px on a desktop tile and never reached
                the 1.25rem cap, so lifting the cap alone would have changed
                nothing.

                There's room for it. The longest pair on the site — 17
                characters of title over athenahealth's 94-character
                subtitle — comes to about 215px of the 326px a desktop tile
                has inside its 7cqw padding. */}
            <p
              className="font-jost text-[clamp(1.125rem,9.5cqw,2.375rem)] font-bold leading-[1.15]"
              style={{ color: fg }}
            >
              {project.title}
            </p>
            <p
              className="mt-[2.5cqw] max-w-[36ch] font-jost text-[clamp(1rem,6cqw,1.5rem)] leading-[1.35]"
              style={{ color: fg }}
            >
              {project.subtitle}
            </p>
          </div>
        </Link>
        );
      })}
    </div>
  );
}
