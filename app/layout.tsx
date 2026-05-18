import type { Metadata } from "next";
import { DM_Sans, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";
import PageTransition from "@/components/PageTransition";

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
        <Nav />
        <PageTransition>
          <main className="page-shell pt-28">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
