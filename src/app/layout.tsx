import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { VisitPing } from "@/components/layout/VisitPing";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://www.danielrakusan.cz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Daniel Rakušan — Junior Python Developer",
    template: "%s | Daniel Rakušan",
  },

  description:
    "Junior Python backend developer v Praze. Přecházím z IT podpory do vývoje — Python, Django, SQLite, Git. Ihned k dispozici. / Junior Python backend developer in Prague — available now.",

  keywords: [
    "Daniel Rakušan",
    "junior Python developer",
    "Python backend developer",
    "backend developer Praha",
    "backend developer Prague",
    "Django developer",
    "SQLite developer",
    "IT support developer",
    "junior developer Praha",
    "junior developer Prague",
    "Python portfolio",
    "Python Django portfolio",
  ],

  authors: [{ name: "Daniel Rakušan", url: SITE_URL }],
  creator: "Daniel Rakušan",
  publisher: "Daniel Rakušan",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Daniel Rakušan",
    title: "Daniel Rakušan — Junior Python Developer",
    description:
      "Junior Python backend developer from Prague with IT background. Python, Django, SQLite. Available now.",
  },

  twitter: {
    card: "summary",
    title: "Daniel Rakušan — Junior Python Developer",
    description:
      "Junior Python backend developer from Prague. Python, Django, SQLite. Available now.",
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "cs-CZ": `${SITE_URL}/#/cz`,
      "en-US": `${SITE_URL}/#/en`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body>
        <LanguageProvider>
          <VisitPing />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
