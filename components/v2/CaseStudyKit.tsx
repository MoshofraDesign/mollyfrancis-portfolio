import SlideIn from "@/components/SlideIn";

/**
 * Shared building blocks for full-viewport horizontal-scroll pages —
 * originally written for the project case-study template
 * (app/work/[slug]/page.tsx) and reused by app/about/page.tsx so both ride
 * the same HorizontalScroll/StickyNav mechanics GovOS introduced. Kept
 * deliberately generic (no project-specific typing) so any page built on
 * HorizontalScroll can pull from here.
 */

export const TEXT_W = "w-full max-w-[950px]";

/** Keeps the last two words together so a line never ends on a lone orphan. */
export function noOrphan(text: string) {
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return text;
  return `${words.slice(0, -1).join(" ")} ${words[words.length - 1]}`;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.25em] opacity-60">{children}</p>
  );
}

/**
 * Fixed-height horizontal slice of the viewport at lg+, snapping and
 * peeking into the next panel — below lg it's a normal full-width block in
 * a vertically scrolling page.
 */
export function Panel({
  children,
  className = "",
  width = "lg:w-[68vw]",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section
      className={`relative flex w-full flex-col justify-center gap-2 px-6 py-20 sm:px-12 sm:py-24 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-center lg:gap-0 lg:overflow-y-auto lg:overscroll-contain lg:px-0 lg:py-12 lg:pl-[100px] lg:pr-[16%] ${className}`}
    >
      {children}
    </section>
  );
}

/** Full-viewport text section. */
export function TextPanel({
  children,
  id,
  width = "lg:w-screen",
}: {
  children: React.ReactNode;
  id?: string;
  width?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex w-full px-6 py-20 sm:px-12 sm:py-24 lg:h-[100dvh] ${width} lg:shrink-0 lg:snap-start lg:items-center lg:overflow-y-auto lg:overscroll-contain lg:px-[100px] lg:py-12`}
    >
      <div className="w-full max-w-[950px]">{children}</div>
    </section>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn className={TEXT_W}>
      <h2 className="text-[clamp(1.75rem,7vw,2.75rem)] font-semibold leading-[1.17] tracking-[-0.01em] sm:text-[clamp(2rem,4.4vw,5.5rem)] [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </h2>
    </SlideIn>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <SlideIn delay={120} className={TEXT_W}>
      <p className="mt-6 text-[clamp(1rem,3.4vw,1.375rem)] font-normal leading-[1.45] opacity-90 sm:text-[clamp(1rem,1.7vw,1.375rem)] [text-wrap:pretty]">
        {typeof children === "string" ? noOrphan(children) : children}
      </p>
    </SlideIn>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={`mt-6 space-y-2 ${TEXT_W}`}>
      {items.map((b, i) => (
        <SlideIn
          key={b}
          as="li"
          delay={120 + i * 90}
          className="text-[clamp(1rem,3.4vw,1.375rem)] font-normal leading-[1.45] opacity-90 sm:text-[clamp(1rem,1.7vw,1.375rem)] [text-wrap:pretty]"
        >
          {noOrphan(b)}
        </SlideIn>
      ))}
    </ul>
  );
}
