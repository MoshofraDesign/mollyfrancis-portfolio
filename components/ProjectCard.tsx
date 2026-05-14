"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index?: number;
  variant?: "grid" | "row";
};

export default function ProjectCard({
  project,
  index = 0,
  variant = "grid",
}: Props) {
  if (variant === "row") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="group block border-t border-ink/10 py-8 lg:py-12"
        >
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-1 font-mono text-xs text-ink/40">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="lg:col-span-5">
              <h3 className="font-serif text-h2 leading-none">
                {project.title}
              </h3>
              <p className="mt-2 text-ink/60 text-sm">{project.subtitle}</p>
            </div>
            <div className="lg:col-span-3 text-sm text-ink/60">
              {project.client} · {project.year}
            </div>
            <div className="lg:col-span-2 flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
            <div className="lg:col-span-1 flex items-center justify-end">
              <span className="inline-grid place-items-center w-10 h-10 rounded-full border border-ink/20 group-hover:bg-ink group-hover:text-cream transition-colors">
                →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="project-card block"
        data-cursor="hover"
      >
        <div
          className="relative aspect-square overflow-hidden"
          style={{ backgroundColor: project.accent + "22" }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="thumb object-cover"
          />
          <span
            className="absolute top-4 left-4 pill backdrop-blur-md"
            style={{ background: "rgba(245,242,235,0.65)" }}
          >
            {project.year}
          </span>
        </div>
        <div className="p-6 lg:p-7">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-2xl leading-tight">
              {project.title}
            </h3>
            <span className="text-ink/40">↗</span>
          </div>
          <p className="text-ink/60 text-sm mb-4">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
