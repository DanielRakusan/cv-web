import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/layout/LanguageProvider";

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

export const metadata: Metadata = {
  title: "Daniel Rakušan — Junior Python Developer",
  description:
    "Junior Python Developer. Přecházím z IT podpory do vývoje přes Python, Django, SQLite a JavaScript. Praha. Ihned k dispozici.",
  openGraph: {
    title: "Daniel Rakušan — Junior Python Developer",
    description: "Junior Python Developer. Prague. Immediately available.",
    url: "https://www.danielrakusan.cz",
    siteName: "Daniel Rakušan",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
