"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
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
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={`group block ${WORK_THUMB_TILE}`}
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
            style={{ backgroundColor: project.accent }}
          />

          {/* Default state: client's white SVG logo, centered — only
              rendered once a logo asset actually exists for this project. */}
          {project.logo && (
            <div className="absolute inset-0 flex items-center justify-center p-6 opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0 sm:p-8">
              <div
                className="relative h-full w-full max-h-36 max-w-[85%]"
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
              breakpoint rather than scaling continuously. */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 text-left opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-8">
            <p className="font-jost text-lg font-bold leading-[1.15] text-white sm:text-xl md:text-2xl lg:text-[28px]">
              {project.title}
            </p>
            <p className="mt-2 max-w-[36ch] font-jost text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-base md:text-lg lg:text-[20px]">
              {project.subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
