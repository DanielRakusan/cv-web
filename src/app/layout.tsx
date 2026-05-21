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
    "Daniel Rakušan — junior Python developer z Prahy / Prague. Python, Django, SQLite. Hledám první pozici v IT · looking for first dev role. Available now.",

  keywords: [
    "Daniel Rakušan",
    "Daniel Rakusan",
    "junior Python developer",
    "Python developer Praha",
    "Python developer Prague",
    "junior Python developer Prague",
    "backend developer Praha",
    "backend developer Prague",
    "Python Django developer",
    "junior backend developer Czech Republic",
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

        {/* JSON-LD — ProfilePage + Person + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                name: "Daniel Rakušan — Junior Python Developer",
                url: SITE_URL,
                description:
                  "Osobní portfolio a CV Daniela Rakušana, junior Python backend developera z Prahy.",
                mainEntity: {
                  "@type": "Person",
                  "@id": `${SITE_URL}#daniel-rakusan`,
                  name: "Daniel Rakušan",
                  alternateName: [
                    "Daniel Rakusan",
                    "Rakušan Daniel",
                    "Rakusan Daniel",
                  ],
                  url: SITE_URL,
                  image: "https://github.com/DanielRakusan.png",
                  jobTitle: "Junior Python Backend Developer",
                  description:
                    "Junior Python backend developer z Prahy s IT zázemím. Stavím vlastní projekty v Pythonu, Djangu a SQLite.",
                  knowsAbout: [
                    "Python", "Django", "SQLite", "Git",
                    "Backend Development", "REST API", "OOP",
                    "JavaScript", "HTML", "CSS", "Linux",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Praha",
                    addressCountry: "CZ",
                  },
                  sameAs: [
                    "https://github.com/DanielRakusan",
                    "https://linkedin.com/in/daniel-rakusan",
                  ],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Daniel Rakušan",
                url: SITE_URL,
                description:
                  "Portfolio junior Python backend developera Daniela Rakušana z Prahy.",
                inLanguage: ["cs", "en"],
              },
            ]),
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
