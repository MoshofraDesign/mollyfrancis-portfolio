import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/lib/projects";
import SlideIn from "@/components/SlideIn";
import { WORK_THUMB_SECTION } from "@/lib/workGrid";

/**
 * The AI Challenges band — Figma 4945:17715.
 *
 * The side work isn't a client project, so it isn't a tile: it's a single
 * strip under the work grid, which is what separates it from the work above
 * without hiding it. The project record carries offGrid, so it's out of the
 * grid and out of the Up-next chain; this is the only way in, and the page it
 * opens is a horizontal-scroll case study like every other one.
 *
 * Frame reference: 131 tall, 32px insets, sparkle then wordmark then the
 * tagline on the left, the button hard right.
 */
export default function AiChallengesBand() {
  const project = getProject("ai-challenges");
  if (!project) return null;

  return (
    /* On the same rail as the work grid, not full-bleed: the charcoal is on
       the box inside the rail, so the strip starts and ends exactly where the
       three columns above it do. It takes the tiles' own 4px radius too — it
       lines up with them, so it should be cut like them. Its horizontal
       padding is the frame's 32px, since the rail's padding now sits outside
       the colour rather than inside it. */
    <section className={WORK_THUMB_SECTION}>
      <SlideIn>
        {/* py-5, down from 7. The button's min-h-11 is the tap-target floor
            and sets the box's inner height, so the padding is the only place
            height comes off without shrinking the target. */}
        <div className="flex flex-col items-start gap-6 rounded-[4px] bg-[#333333] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8">
          {/* One row, all three optically centred on it — the frame has the
              sparkle, the wordmark and the tagline inside a single 50-tall
              row. They were nested in a baseline-aligned pair before, and an
              <img> aligns its BOTTOM edge to a text baseline: the wordmark's
              cut includes the descender on "Challenges", so the tagline sat a
              few pixels low against it. Gaps are the frame's own 16px, and
              the sparkle is 50:42 against the wordmark like the frame — a
              step down from where it started, so the lockup sits under the
              band's own height rather than setting it. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Image
              src="/work/ai-challenges/sparkle-white.svg"
              alt=""
              width={52}
              height={50}
              unoptimized
              className="h-[27px] w-auto shrink-0 sm:h-[34px]"
            />
            <Image
              src="/logos/ai-challenges-wide.svg"
              alt="AI Challenges"
              width={655}
              height={83}
              unoptimized
              className="h-[23px] w-auto sm:h-[29px]"
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
