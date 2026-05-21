import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { VisitPing } from "@/components/layout/VisitPing";
import { BehaviorTracker } from "@/components/layout/BehaviorTracker";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://danielrakusan.cz";

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
    "Daniel Rakušan — junior Python developer z Prahy. Stavím backend projekty v Pythonu, Djangu a SQLite. Hledám první pozici v IT. Ihned k dispozici.",

  keywords: [
    "Daniel Rakušan",
    "Daniel Rakusan",
    "junior Python developer",
    "Python developer Praha",
    "Python developer Prague",
    "backend developer Praha",
    "Python Django developer",
    "junior backend developer",
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
      "Daniel Rakusan — junior Python developer from Prague. Python, Django, SQLite. Looking for first dev role. Available now.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Daniel Rakušan — Junior Python Developer",
    description:
      "Daniel Rakusan — junior Python developer from Prague. Python, Django, SQLite. Available now.",
  },

  alternates: {
    canonical: SITE_URL,
  },
};

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <head>
        {/* Preconnect — připraví TCP spojení dříve, než je komponenta potřebuje */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        {/* Render backend NENÍ preconnect — free tier spí, timeout by škodil skóre */}

        {/* JSON-LD Person schema — Google bere jako autoritativní zdroj jména a variant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Daniel Rakušan",
              alternateName: [
                "Daniel Rakusan",       // bez háčků — nejčastější přepis
                "Rakušan Daniel",       // příjmení napřed
                "Rakusan Daniel",
              ],
              url: SITE_URL,
              jobTitle: "Junior Python Backend Developer",
              description:
                "Junior Python backend developer z Prahy s IT zázemím. Python, Django, SQLite.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Praha",
                addressCountry: "CZ",
              },
              sameAs: [
                "https://github.com/DanielRakusan",
                "https://linkedin.com/in/daniel-rakusan",
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Skip-to-main — pomáhá screen readerům i Lighthouse skóre */}
        <a href="#oMne" className="skip-to-main">
          Přeskočit na obsah
        </a>

        <LanguageProvider>
          <VisitPing />
          <BehaviorTracker />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
