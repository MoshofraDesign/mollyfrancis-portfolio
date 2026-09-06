"use client";

import Image from "next/image";
import { useEffect, useRef, useState, CSSProperties } from "react";

interface Hotspot {
  id: string;
  label: string;
  style: CSSProperties;
  bubbleStyle: CSSProperties;
  dotAStyle: CSSProperties;
  dotBStyle: CSSProperties;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "brain",
    label: "🧠 Currently running 123 browser tabs and one very good idea.",
    style: { top: "6%", left: "30%", width: "40%", height: "18%", position: "absolute" },
    bubbleStyle: { top: "-80px", left: "30%", transformOrigin: "bottom left" },
    dotAStyle: { bottom: "-10px", left: "38%", width: 10, height: 10 },
    dotBStyle: { bottom: "-17px", left: "46%", width: 6, height: 6 },
  },
  {
    id: "eye-l",
    label: "👁 That spacing is off by 4px. I can't unsee it.",
    style: { top: "28%", left: "24%", width: "25%", height: "13%", position: "absolute" },
    bubbleStyle: { top: "-70px", right: "0%", left: "auto", transformOrigin: "bottom right" },
    dotAStyle: { bottom: "-10px", right: "20%", width: 10, height: 10 },
    dotBStyle: { bottom: "-17px", right: "12%", width: 6, height: 6 },
  },
  {
    id: "eye-r",
    label: "👁 Is that a drop shadow on a drop shadow?",
    style: { top: "28%", left: "49%", width: "25%", height: "13%", position: "absolute" },
    bubbleStyle: { top: "-70px", left: "30%", transformOrigin: "bottom left" },
    dotAStyle: { bottom: "-10px", left: "20%", width: 10, height: 10 },
    dotBStyle: { bottom: "-17px", left: "12%", width: 6, height: 6 },
  },
  {
    id: "ear",
    label: "👂 \"We'll just add it in dev.\" — heard that before.",
    style: { top: "39%", left: "7%", width: "16%", height: "20%", position: "absolute" },
    bubbleStyle: { top: "0%", left: "110%", transformOrigin: "bottom left" },
    dotAStyle: { top: "50%", left: "-10px", width: 10, height: 10 },
    dotBStyle: { top: "50%", left: "-17px", width: 6, height: 6 },
  },
  {
    id: "mouth",
    label: "💬 \"Can we make the logo bigger?\" No. No we cannot.",
    style: { top: "60%", left: "28%", width: "32%", height: "14%", position: "absolute" },
    bubbleStyle: { bottom: "-80px", top: "auto", left: "10%", transformOrigin: "top left" },
    dotAStyle: { top: "-10px", left: "30%", width: 10, height: 10 },
    dotBStyle: { top: "-17px", left: "40%", width: 6, height: 6 },
  },
];

const headlines = [
  "UX leader and hands-on designer solving complex problems across industries.",
  "I have shaped products from startups like Patient IO to athenahealth, Care.com.",
  "A player-coach who bridges strategy and hands-on execution every day.",
  "I translate complex workflows and compliance data into seamless products.",
  "I lead from the front, mentoring designers while shipping high-impact work.",
  "At my core, I love this work — building products that help real people.",
];

/** Cursor reveal: a hard-edged circle, no falloff — two stops at the same
 *  radius rather than 38% -> 72%. R is the radius both masks share. */
const R = "3.75rem";
const REVEAL = (x: number, y: number) =>
  `radial-gradient(circle ${R} at ${x}% ${y}%, #000 99.5%, transparent 100%)`;
const REVEAL_OFF = "radial-gradient(circle 0px at 50% 50%, #000, transparent)";
/** The same circle, inverted: opaque everywhere except the hole. */
const PUNCH = (x: number, y: number) =>
  `radial-gradient(circle ${R} at ${x}% ${y}%, transparent 99.5%, #000 100%)`;

/** One type spec for the rotating headline, shared by the visible line and
 *  the invisible one that reserves its height. */
const H1_TYPE =
  "max-w-3xl xl:w-[580px] font-jost text-3xl font-medium leading-snug text-ink sm:text-4xl md:max-w-none md:text-5xl lg:text-[55px] lg:leading-[65px]";

const LONGEST_HEADLINE = headlines.reduce(
  (a, b) => (b.length > a.length ? b : a),
  headlines[0],
);

const ROTATE_MS = 3400;

export default function RotatingHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  const onPortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = portraitRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % headlines.length);
        setVisible(true);
      }, 400);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[560px] items-center px-6 py-16 sm:min-h-[600px] sm:py-0 lg:min-h-[660px] lg:px-10 xl:min-h-[720px]">
      <div className="mx-auto grid w-full max-w-[96rem] grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16 xl:w-fit xl:grid-cols-[520px_580px] xl:gap-14">
        <div
          ref={portraitRef}
          onMouseMove={onPortraitMove}
          onMouseEnter={onPortraitMove}
          onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
          className="group relative mx-auto aspect-square w-full max-w-[min(88vw,_420px)] sm:max-w-[480px] md:max-w-[560px] lg:mx-0 lg:max-w-[440px] xl:w-[520px] xl:max-w-[520px]"
        >
          {/* Color photo full-bleed (the circular headshot). Soft spotlight
              follows the cursor; gray dots sit inset on top, same as Figma. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
            style={{
              WebkitMaskImage: spot.on ? REVEAL(spot.x, spot.y) : REVEAL_OFF,
              maskImage: spot.on ? REVEAL(spot.x, spot.y) : REVEAL_OFF,
            }}
          >
            <Image
              src="/hero-color.png"
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, 640px"
              className="object-cover"
              priority
            />
          </div>
          <div
            className="pointer-events-none absolute left-[10.4%] top-[8.4%] z-[1] h-[83.2%] w-[82.3%]"
            style={
              spot.on
                ? {
                    WebkitMaskImage: PUNCH(
                      ((spot.x - 10.4) / 82.3) * 100,
                      ((spot.y - 8.4) / 83.2) * 100,
                    ),
                    maskImage: PUNCH(
                      ((spot.x - 10.4) / 82.3) * 100,
                      ((spot.y - 8.4) / 83.2) * 100,
                    ),
                  }
                : undefined
            }
          >
            <Image
              src="/hero-halftone.svg"
              alt="Halftone portrait of Molly Francis"
              fill
              unoptimized
              priority
              className="object-contain [filter:brightness(0)_invert(8%)]"
            />
          </div>
          <div className="absolute left-[10.4%] top-[8.4%] z-[3] h-[83.2%] w-[82.3%]">

          {/* Thought bubble hotspots */}
          {HOTSPOTS.map((h) => {
            const isActive = activeHotspot === h.id;
            return (
              <div
                key={h.id}
                style={h.style}
                className="cursor-pointer"
                onMouseEnter={() => setActiveHotspot(h.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Thought bubble */}
                <div
                  className="absolute z-20 pointer-events-none"
                  style={{
                    ...h.bubbleStyle,
                    position: "absolute",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scale(1) translateY(0)" : "scale(0.88) translateY(4px)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    background: "white",
                    border: "2px solid #1a1a1a",
                    borderRadius: "14px",
                    padding: "9px 13px",
                    fontSize: "13px",
                    lineHeight: 1.45,
                    color: "#1a1a1a",
                    whiteSpace: "normal",
                    boxShadow: "3px 3px 0 #1a1a1a",
                    minWidth: "160px",
                    maxWidth: "220px",
                  }}
                >
                  {h.label}
                </div>
                {/* Connector dots */}
                <div
                  className="absolute z-10 pointer-events-none rounded-full bg-white border-2 border-[#1a1a1a]"
                  style={{
                    ...h.dotAStyle,
                    position: "absolute",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.15s ease",
                  }}
                />
                <div
                  className="absolute z-10 pointer-events-none rounded-full bg-white border-2 border-[#1a1a1a]"
                  style={{
                    ...h.dotBStyle,
                    position: "absolute",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.15s ease 0.05s",
                  }}
                />
              </div>
            );
          })}
          </div>
        </div>

        <div className="text-left">
          <p className="mb-2 flex items-center gap-1.5 text-lg font-normal text-ink sm:mb-3 sm:text-xl md:text-2xl lg:text-[24px]">
            Hello, I&rsquo;m Molly Francis
            <span aria-hidden="true">🖐️</span>
          </p>
          {/* The rotating line holds a constant height: the longest headline
              is rendered invisibly to reserve the space, and the live one sits
              on top of it. Without this, a two-line headline following a
              three-line one collapsed the block and shoved the page around
              every few seconds. */}
          <div className="relative">
            <p aria-hidden className={`${H1_TYPE} invisible`}>
              {LONGEST_HEADLINE}
            </p>
            <h1
              className={`${H1_TYPE} absolute inset-0 transition-opacity duration-[400ms] ease-out`}
              style={{ opacity: visible ? 1 : 0 }}
            >
              {headlines[index]}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
