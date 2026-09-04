import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // lib/ holds shared class strings (lib/workGrid.ts). Without it Tailwind
    // never sees them, so the utilities are simply never generated — the
    // markup ships the class name and nothing styles it.
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#141414",
          50: "#f7f6f3",
          100: "#ecebe6",
          200: "#d9d6cc",
          300: "#a8a39a",
          400: "#6e6a62",
          500: "#3a3833",
          900: "#141414",
        },
        cream: "#f5f5f5",
        ochre: "#3DC185",
        sage: "#7a8a6f",
      },
      fontFamily: {
        serif: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        sans: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-jost)", "Jost", "sans-serif"],
        jost: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        hero: ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "marquee": "marquee 40s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
