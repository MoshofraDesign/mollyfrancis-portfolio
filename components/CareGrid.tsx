"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

/**
 * Grid of square project tiles, modeled on Figma's "Care" / "Care - Hover"
 * thumbnail states: just the thumbnail image under a flat accent-colored
 * overlay (project.accent) at partial opacity — no separate logo graphic
 * layered on top. On hover the overlay goes fully opaque and the project
 * title + subtitle fade in. No rounded corners anywhere, by design.
 *
 * Tiles are capped at 375px and separated by gutters (auto-fill/minmax +
 * gap), like mollyfrancis.com's work grid — not edge-to-edge.
 */
export default function CareGrid({ projects }: Props) {
  return (
    <div
      className="grid justify-center gap-6 sm:gap-8"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 375px))" }}
    >
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative block aspect-square w-full max-w-[375px] overflow-hidden"
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

          {/* Hover state: title + subtitle, left-aligned like Care - Hover. */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-8">
            <p className="font-jost text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.05] text-white">
              {project.title}
            </p>
            <p className="mt-3 max-w-[36ch] font-jost text-sm leading-relaxed text-white/85">
              {project.subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
