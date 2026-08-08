"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

/**
 * Edge-to-edge grid of square project tiles, modeled on Figma's "Care" /
 * "Care - Hover" thumbnail states: the thumbnail sits under a flat
 * accent-colored overlay (project.accent) at partial opacity, with the
 * client name reading over it like a wordmark. On hover the overlay goes
 * fully opaque and the wordmark is replaced by the project title + subtitle.
 * No rounded corners anywhere, by design — tiles butt up against each other.
 */
export default function CareGrid({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative block aspect-square overflow-hidden"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
            className="object-cover"
          />

          {/* Color-MASTER overlay — 80% by default, fully opaque on hover. */}
          <div
            className="absolute inset-0 opacity-80 transition-opacity duration-500 ease-out group-hover:opacity-100"
            style={{ backgroundColor: project.accent }}
          />

          {/* Default state: client name reads like a wordmark, centered. */}
          <div className="absolute inset-0 flex items-center justify-center p-6 opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0">
            <p className="text-center font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] italic leading-none text-white">
              {project.client}
            </p>
          </div>

          {/* Hover state: title + subtitle, left-aligned like Care - Hover. */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-8">
            <p className="font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] italic leading-[1.05] text-white">
              {project.title}
            </p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-white/85">
              {project.subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
