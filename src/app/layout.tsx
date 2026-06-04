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
    "Daniel Rakušan — junior Python developer z Prahy. Python, Django, SQLite, AI-assisted development. Živé Python projekty ke spuštění přímo v prohlížeči. Ihned k dispozici.",

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
    "AI assisted developer",
    "Claude Code developer",
    "AI workflow developer",
    "Python live demo",
    "interaktivní Python projekty",
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
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Daniel Rakušan — Junior Python Developer",
      },
    ],
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

  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/icon",
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

        {/* Bing Webmaster Tools — ověření vlastnictví */}
        <meta name="msvalidate.01" content="71CD5D7278A7FB493F96B87B54952DDA" />

        {/* Bing — explicitní direktivy pro bingbot (max-snippet, preview) */}
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* hreflang — informuje vyhledávače o jazykových variantách */}
        <link rel="alternate" hrefLang="cs" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

        {/* AI-specific — llms.txt odkaz pro AI crawlery */}
        <link rel="alternate" type="text/plain" title="LLMs.txt" href="/llms.txt" />

        {/* Structured data pro AI — označení obsahu */}
        <meta name="author" content="Daniel Rakušan" />
        <meta name="subject" content="Python developer portfolio, CV, živé demo projekty" />
        <meta name="language" content="cs, en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />

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
                  "Osobní portfolio a CV Daniela Rakušana, junior Python backend developera z Prahy. Python, Django, SQLite.",
                inLanguage: ["cs", "en"],
                mainEntity: {
                  "@type": "Person",
                  "@id": `${SITE_URL}#daniel-rakusan`,

                  // Jméno ve všech variantách
                  name: "Daniel Rakušan",
                  alternateName: [
                    "Daniel Rakusan",      // bez háčků — nejčastější přepis
                    "Rakušan Daniel",      // příjmení napřed
                    "Rakusan Daniel",
                    "D. Rakušan",
                    "D. Rakusan",
                  ],

                  url: SITE_URL,
                  image: "https://github.com/DanielRakusan.png",

                  // Role
                  jobTitle: "Junior Python Backend Developer",
                  description:
                    "Junior Python backend developer z Prahy / Prague. IT background, vlastní projekty v Pythonu, Djangu a SQLite. Hledám první pozici v IT. Looking for first dev role.",

                  // Poloha
                  nationality: "CZ",
                  homeLocation: {
                    "@type": "Place",
                    name: "Praha, Česká republika",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Praha",
                    addressRegion: "Hlavní město Praha",
                    addressCountry: "CZ",
                  },

                  // Technologie a dovednosti
                  knowsAbout: [
                    "Python", "Django", "SQLite", "Git", "GitHub",
                    "Backend Development", "REST API", "OOP",
                    "JavaScript", "HTML", "CSS", "Linux",
                    "IT Support", "Troubleshooting",
                  ],
                  hasOccupation: {
                    "@type": "Occupation",
                    name: "Python Backend Developer",
                    description: "Vývoj backendových aplikací v Pythonu s využitím Django a SQLite.",
                    occupationLocation: {
                      "@type": "City",
                      name: "Praha",
                    },
                    skills: "Python, Django, SQLite, Git, REST API, OOP, JavaScript",
                    estimatedSalary: {
                      "@type": "MonetaryAmountDistribution",
                      currency: "CZK",
                      unitText: "MONTH",
                    },
                  },

                  // Hledám práci
                  seeks: {
                    "@type": "Demand",
                    name: "Junior Python Backend Developer position",
                    description:
                      "Hledám první pozici junior Python / backend developera v Praze nebo remote. Looking for a junior Python backend developer role in Prague or remote.",
                  },

                  // Kontakt a profily
                  email: "daniel@danielrakusan.cz",
                  sameAs: [
                    "https://github.com/DanielRakusan",
                    "https://linkedin.com/in/daniel-rakusan",
                    SITE_URL,
                  ],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_URL}#website`,
                name: "Daniel Rakušan",
                alternateName: "Daniel Rakusan",
                url: SITE_URL,
                description:
                  "Portfolio a CV junior Python backend developera Daniela Rakušana z Prahy.",
                inLanguage: ["cs", "en"],
                author: { "@id": `${SITE_URL}#daniel-rakusan` },
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
