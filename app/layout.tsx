import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Bodoni_Moda, Jost } from "next/font/google";
import Script from "next/script";
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

// Matches the Figma "Care - Hover" spec (Jost SemiBold headline / Regular
// body) used for the homepage hero + work-grid hover text.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-jost",
  display: "swap",
});

/* metadataBase resolves the relative image paths below — and the ones
   Next generates from app/opengraph-image.png and app/twitter-image.png —
   into the absolute URLs that link scrapers require. Without it a shared
   link falls back to whatever image the crawler finds in the page, which is
   how the portrait on About ended up as the preview. */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mollyfrancis.com"),
  title: "Molly Francis — Product Designer, Researcher and Leader",
  description:
    "Product designer, researcher and leader in Austin, Texas. 20+ years designing healthcare, fintech, and SaaS products with research-driven, AI-augmented workflows.",
  openGraph: {
    title: "Molly Francis — Product Designer, Researcher and Leader",
    description:
      "Product designer, researcher and leader in Austin, Texas. 20+ years designing healthcare, fintech and SaaS products.",
    url: "https://www.mollyfrancis.com",
    siteName: "Molly Francis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Molly Francis — Product Designer, Researcher and Leader",
    description:
      "Product designer, researcher and leader in Austin, Texas. 20+ years designing healthcare, fintech and SaaS products.",
  },
};

// viewport-fit=cover lets full-bleed pages (project case studies, About)
// paint their own background under the iOS status bar / notch instead of
// leaving a strip of the default body background showing above them on
// mobile — without this, each colored project page's background stopped
// short of the true top of the screen.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bodoniModa.variable} ${jost.variable}`}>
      <body>
        {/* Cancels the browser's native instant jump-to-#work on page load
            (that native jump ignores the smooth-scroll CSS below) — see
            components/ScrollToWork.tsx, which does the smooth version once
            the homepage has mounted. beforeInteractive runs before
            hydration, ahead of the browser's own anchor-scroll. */}
        <Script id="cancel-hash-jump" strategy="beforeInteractive">
          {`try{if(window.location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);}}catch(e){}`}
        </Script>
        <CursorBlob />
        <SiteChrome>{children}</SiteChrome>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
