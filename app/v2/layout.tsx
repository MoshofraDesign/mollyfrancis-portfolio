import type { Metadata } from "next";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Molly Francis — Portfolio",
  description:
    "Lead / Principal UX product designer in Austin, Texas. An alternate, horizontal-scrolling walk through the work.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${anton.variable} font-sans bg-[#f2f1ec] text-[#141414]`}>
      {children}
    </div>
  );
}
