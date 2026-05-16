"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block border-t border-ink/10 py-6 lg:py-8"
      >
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-1 font-mono text-xs text-ink/40">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="lg:col-span-2 relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 1024px) 25vw, 160px"
              className="object-contain"
            />
          </div>
          <div className="lg:col-span-4">
            <h3 className="font-serif text-h2 leading-none">
              {project.title}
            </h3>
            <p className="mt-2 text-ink/60 text-sm">{project.subtitle}</p>
          </div>
          <div className="lg:col-span-2 text-sm text-ink/60">
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
