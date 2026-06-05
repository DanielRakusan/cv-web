import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { SignatureDisplay } from "@/components/sections/SignatureDisplay";
import { signatures } from "@/data/signatures";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Email podpis — Daniel Rakušan",
  description: "Email podpis — zkopírujte HTML a vložte do Gmailu.",
  robots: { index: false, follow: false },
};

// Stránka se negeneruje průběžně — obnoví se jen když backend
// zavolá /api/revalidate-signature (po změně aktivní varianty).
export const revalidate = false;

async function getActiveId(): Promise<number> {
  const base = siteConfig.renderApiUrl;
  if (!base) return 1;
  try {
    const res = await fetch(`${base}/api/signature`, {
      // při ISR revalidaci se tato hodnota načte čerstvě
      cache: "no-store",
      signal: AbortSignal.timeout(6_000),
    });
    if (!res.ok) return 1;
    const data = await res.json() as { id?: number };
    return data.id ?? 1;
  } catch {
    return 1; // fallback na variantu 1
  }
}

export default async function PodpisPage() {
  const activeId = await getActiveId();
  const sig = signatures.find(s => s.id === activeId) ?? signatures[0];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#02020a", paddingTop: "80px" }}>
        <SignatureDisplay sig={sig} />
      </main>
    </>
  );
}
