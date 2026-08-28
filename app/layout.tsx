import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Inter, Noto_Sans_Devanagari, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

const display = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-deva",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scan & Report — a proposed public grievance tool",
  description:
    "Point your phone at the office where the problem happened. Independent hackathon prototype, not affiliated with any government body.",
};

export const viewport: Viewport = {
  themeColor: "#6D1B3E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${devanagari.variable} ${tamil.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
