import type { Metadata, Viewport } from "next";
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

/* ── Viewport / theme-color ───────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#02020a",          // mobile browser chrome bar matches the site
  width: "device-width",
  initialScale: 1,
};

/* ── SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Daniel Rakušan — Junior Python Developer",
    template: "%s | Daniel Rakušan",
  },

  description:
    "Junior Python backend developer · Praha / Prague. Python, Django, SQLite, Git. IT background, přecházím do vývoje. Ihned k dispozici.",

  keywords: [
    "Daniel Rakušan",
    "junior Python developer",
    "Python backend developer",
    "backend developer Praha",
    "backend developer Prague",
    "Django developer",
    "SQLite developer",
    "IT support to developer",
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
    card: "summary_large_image",
    title: "Daniel Rakušan — Junior Python Developer",
    description:
      "Junior Python backend developer from Prague. Python, Django, SQLite. Available now.",
  },

  alternates: {
    canonical: SITE_URL,
  },
};

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body>
        {/* Skip-to-main — pomáhá screen readerům i Lighthouse skóre */}
        <a
          href="#oMne"
          className="font-mono"
          style={{
            position: "absolute",
            top: -999,
            left: 8,
            zIndex: 9999,
            padding: "4px 12px",
            background: "var(--cyan)",
            color: "#02020a",
            fontSize: ".75rem",
            borderRadius: 4,
            textDecoration: "none",
            fontWeight: 700,
          }}
          onFocus={(e) => (e.currentTarget.style.top = "8px")}
          onBlur={(e) => (e.currentTarget.style.top = "-999px")}
        >
          Přeskočit na obsah
        </a>

        <LanguageProvider>
          <VisitPing />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
