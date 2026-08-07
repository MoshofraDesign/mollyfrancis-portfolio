import Image from "next/image";
import Link from "next/link";
import V2Chrome from "@/components/v2/V2Chrome";
import HorizontalScroll from "@/components/v2/HorizontalScroll";

const traits = ["Extraverted", "Intuitive", "Feeling", "Prospecting"];

const principles = [
  "Lead with research, ship with conviction.",
  "Systems beat snowflakes.",
  "Design the seams.",
  "Use AI honestly.",
];

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-white/50">
      <Image src={src} alt={alt} fill sizes="30vw" className="object-cover" />
    </div>
  );
}

export default function V2About() {
  return (
    <main className="relative bg-[#f2f1ec]">
      <V2Chrome />

      <HorizontalScroll>
        {/* INTRO */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[64vw] shrink-0 items-center gap-10 sm:gap-16 px-8 sm:px-16">
          <div className="relative hidden h-64 w-64 shrink-0 overflow-hidden rounded-full sm:block">
            <Image
              src="/about/molly-headshot.jpg"
              alt="Molly Francis"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#141414]/50">
              Hi, I&rsquo;m Molly
            </p>
            <h1 className="mt-4 font-display uppercase leading-[0.88] text-[13vw] sm:text-[6vw]">
              I love what I do.
            </h1>
            <p className="mt-6 max-w-lg text-sm sm:text-base text-[#141414]/70">
              ENFP — {traits.join(", ")}. Lead Product Designer, Austin, TX.
              I embrace big ideas and stay empathetic to the people using what
              I build.
            </p>
          </div>
        </section>

        {/* FAMILY */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[54vw] shrink-0 flex-col justify-center gap-8 px-8 sm:px-16">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Photo src="/about/family-1.jpg" alt="Family group photo" />
            <Photo src="/about/family-2.jpg" alt="Daughter with pink blanket" />
            <Photo src="/about/family-3.jpg" alt="Molly and daughter" />
          </div>
          <div>
            <h2 className="font-display uppercase text-[8vw] sm:text-[3vw] leading-[0.9]">
              A wonderful family
            </h2>
            <p className="mt-3 max-w-md text-sm sm:text-base text-[#141414]/70">
              My dad&rsquo;s a retired architect, my mom ran a preschool — a
              mix of meticulous and empathetic that shaped how I design.
            </p>
          </div>
        </section>

        {/* PETS */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[54vw] shrink-0 flex-col justify-center gap-8 px-8 sm:px-16">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Photo src="/about/pet-1.jpg" alt="Henry on chair" />
            <Photo src="/about/pet-2.jpg" alt="Joey, gray fluffy cat" />
            <Photo src="/about/pet-4.jpg" alt="Saskatoon the dog" />
          </div>
          <div>
            <h2 className="font-display uppercase text-[8vw] sm:text-[3vw] leading-[0.9]">
              I love animals
            </h2>
            <p className="mt-3 max-w-md text-sm sm:text-base text-[#141414]/70">
              Two cats and a dog. They love to crash a good meeting.
            </p>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[58vw] shrink-0 flex-col justify-center gap-8 px-8 sm:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#141414]/50">
            How I show up
          </p>
          <ul className="space-y-5">
            {principles.map((p, i) => (
              <li key={p} className="flex gap-4 sm:gap-6">
                <span className="font-display text-[#141414]/30 text-2xl sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display uppercase leading-[0.95] text-[7vw] sm:text-[2.6vw] max-w-xl">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* FUN FACTS */}
        <section className="flex h-[100dvh] w-[92vw] sm:w-[50vw] shrink-0 flex-col justify-center gap-6 bg-[#141414] px-8 sm:px-16 text-[#f2f1ec]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ec]/50">
            Also true
          </p>
          <p className="font-display uppercase leading-[0.95] text-[8vw] sm:text-[3.2vw]">
            Wanted to find Bigfoot. Collects vintage everything. Buys
            anything with great packaging.
          </p>
        </section>

        {/* CTA */}
        <section className="flex h-[100dvh] w-[86vw] sm:w-[42vw] shrink-0 flex-col items-start justify-center gap-8 px-8 sm:px-16">
          <h2 className="font-display uppercase leading-[0.88] text-[10vw] sm:text-[4vw]">
            Let&rsquo;s talk.
          </h2>
          <Link
            href="/v2/contact"
            className="rounded-full border border-[#141414]/30 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f2f1ec]"
          >
            Get in touch
          </Link>
        </section>
      </HorizontalScroll>
    </main>
  );
}
