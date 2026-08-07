import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import V2Chrome from "@/components/v2/V2Chrome";

// Cycle through cell sizes to get an asymmetric, Mondrian-ish grid like
// karinasirqueira.com's homepage — big blocks for featured work, smaller
// ones filling the gaps.
function sizeFor(index: number, featured?: boolean) {
  if (featured) return "col-span-2 row-span-2";
  if (index % 5 === 2) return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

export default function V2Home() {
  return (
    <main className="relative min-h-screen bg-[#f2f1ec] pt-24 pb-16">
      <V2Chrome />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 auto-rows-[130px] sm:auto-rows-[160px] lg:auto-rows-[190px] gap-3 sm:gap-4">
          {/* INTRO BLOCK — halftone portrait, no card/background, floats
              directly on the page like the rest of the grid's negative space */}
          <div className="col-span-2 row-span-2 relative flex flex-col items-center justify-center gap-3 p-4">
            <div className="relative h-[65%] w-[65%]">
              <Image
                src="/v2/molly-halftone.svg"
                alt="Halftone portrait of Molly Francis"
                fill
                priority
                className="object-contain"
              />
            </div>
            <p className="text-center font-display uppercase leading-[0.9] text-[5vw] sm:text-[1.8vw]">
              Molly Francis
            </p>
            <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#141414]/50">
              Lead Product Designer
            </p>
          </div>

          {/* PROJECT BLOCKS — shape morphs continuously; hover swaps the flat
              color for a heavily zoomed-in crop of the project thumbnail,
              like a logo mark blown up past its frame */}
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/v2/work/${project.slug}`}
              className={`group relative overflow-hidden transition-transform duration-300 hover:scale-[0.97] v2-morph-${
                (i % 4) + 1
              } ${sizeFor(i, project.featured)}`}
              style={{
                background: project.accent,
                animationDelay: `${-(i * 1.4).toFixed(1)}s`,
              }}
            >
              {/* zoomed-in thumbnail reveal on hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover scale-[1.9] transition-transform duration-700 ease-out group-hover:scale-[1.6]"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                  {project.client}
                </p>
                <p className="mt-1 font-display uppercase leading-[0.95] text-[5.5vw] sm:text-[1.6vw]">
                  {project.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
