import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/lib/projects";
import SlideIn from "@/components/SlideIn";

/**
 * The AI Challenges band — Figma 4945:17715.
 *
 * The side work isn't a client project, so it isn't a tile: it's a single
 * full-bleed strip under the work grid, which is what separates it from the
 * work above without hiding it. The project record carries offGrid, so it's
 * out of the grid and out of the Up-next chain; this is the only way in, and
 * the page it opens is a horizontal-scroll case study like every other one.
 *
 * Frame reference: 131 tall, 32px insets, sparkle then wordmark then the
 * tagline on the left, the button hard right.
 */
export default function AiChallengesBand() {
  const project = getProject("ai-challenges");
  if (!project) return null;

  return (
    /* Full-bleed on purpose: the grid above sits inside .site-rail, and a
       band that shared that rail would read as a fifteenth tile rather than
       a rule under the set. The content inside still lines up with the rail. */
    <section className="w-full bg-[#333333]">
      <SlideIn className="site-rail">
        <div className="flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7">
          {/* One row, all three optically centred on it — the frame has the
              sparkle, the wordmark and the tagline inside a single 50-tall
              row. They were nested in a baseline-aligned pair before, and an
              <img> aligns its BOTTOM edge to a text baseline: the wordmark's
              cut includes the descender on "Challenges", so the tagline sat a
              few pixels low against it. Gaps are the frame's own 16px, and
              the sparkle is 50:42 against the wordmark like the frame. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Image
              src="/work/ai-challenges/sparkle-white.svg"
              alt=""
              width={52}
              height={50}
              unoptimized
              className="h-[31px] w-auto shrink-0 sm:h-[40px]"
            />
            <Image
              src="/logos/ai-challenges-wide.svg"
              alt="AI Challenges"
              width={655}
              height={83}
              unoptimized
              className="h-[26px] w-auto sm:h-[34px]"
            />
            <p className="font-jost text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.45] text-white/80">
              Learning for fun&nbsp;:)
            </p>
          </div>

          {/* The frame's button is #FF2CD5, which carries white text at
              3.19:1. Same call as the tile hover: the darker cut of the same
              magenta, where white clears AA at 4.72:1. */}
          <Link
            href={`/work/${project.slug}`}
            /* rounded-full and the nav's own padding scale — the frame draws
               a 6px radius, but every other pill on the site (nav items, the
               prototype links) is fully rounded, and this one sits a scroll
               away from the nav. min-h-11 stays as the tap-target floor; the
               pill reads smaller because it's narrower, not shorter. */
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#D600AB] px-5 py-2 font-jost text-[clamp(0.95rem,1.05vw,1.05rem)] font-semibold text-white transition-colors duration-300 ease-out hover:bg-[#FF2CD5] hover:text-[#141414]"
          >
            View Challenges
          </Link>
        </div>
      </SlideIn>
    </section>
  );
}
