import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <CursorBlob />
        <Nav />
        <PageTransition>
          <main className="page-shell pt-28">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
