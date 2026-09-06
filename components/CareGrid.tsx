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
        /* At rest the tile is the bright accent. On hover it becomes the
           colour of the page it opens — a preview of where you're going —
           for the projects that declare one. Everywhere else it falls back
           to deriving an accessible pair from the accent, because most page
           colours are still the raw accent and several of those don't clear
           4.5:1 with either white or ink. */
        const { bg, fg } = project.pageBg
          ? { bg: project.pageBg, fg: readableOn(project.pageBg) }
          : readableOnAccent(project.accent);
        return (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={`group thumb-cq block ${WORK_THUMB_TILE}`}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="375px"
            className="object-cover"
          />

          {/* Color-MASTER overlay — 80% by default, fully opaque on hover. */}
          <div
            className="absolute inset-0 opacity-80 transition-opacity duration-500 ease-out group-hover:opacity-100"
            style={{ backgroundColor: bg }}
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
            <p
              className="font-jost text-[clamp(1.125rem,7.5cqw,1.75rem)] font-bold leading-[1.15]"
              style={{ color: fg }}
            >
              {project.title}
            </p>
            <p
              className="mt-[2.5cqw] max-w-[36ch] font-jost text-[clamp(1rem,4.6cqw,1.25rem)] leading-[1.35]"
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
