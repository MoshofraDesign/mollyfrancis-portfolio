import type { Metadata } from "next";
import { DM_Sans, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import CursorBlob from "@/components/CursorBlob";
import SiteChrome from "@/components/SiteChrome";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Molly Francis — Lead Product Designer",
  description:
    "Lead / Principal UX product designer in Austin, Texas. 20+ years designing healthcare, fintech, and SaaS products with research-driven, AI-augmented workflows.",
  openGraph: {
    title: "Molly Francis — Lead Product Designer",
    description:
      "Lead / Principal UX product designer in Austin, Texas. 20+ years designing healthcare, fintech, and SaaS products.",
    url: "https://www.mollyfrancis.com",
    siteName: "Molly Francis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bodoniModa.variable}`}>
      <body>
        <CursorBlob />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
