import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { SignatureDisplay } from "@/components/sections/SignatureDisplay";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Email podpis — Daniel Rakušan",
  description: "Email podpis — zkopírujte HTML a vložte do Gmailu.",
  robots: { index: false, follow: false },
};

// Revalidate každou hodinu — pokud backend změní aktivní variantu,
// Vercel ji při příštím requestu (nebo po hodině) znovu načte.
export const revalidate = 3600;

interface SignatureData {
  id: number;
  name: string;
  theme: "light" | "dark";
  html: string;
}

async function fetchActiveSignature(): Promise<SignatureData | null> {
  const base = siteConfig.renderApiUrl;
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/signature`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return res.json() as Promise<SignatureData>;
  } catch {
    return null;
  }
}

export default async function PodpisPage() {
  const sig = await fetchActiveSignature();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#02020a", paddingTop: "80px" }}>
        <SignatureDisplay sig={sig} />
      </main>
    </>
  );
}
