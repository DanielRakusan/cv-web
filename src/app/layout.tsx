import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/layout/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
