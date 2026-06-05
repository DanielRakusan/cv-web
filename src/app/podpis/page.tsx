import type { Metadata } from "next";
import { signatures } from "@/data/signatures";
import { siteConfig } from "@/config/site";
import { BusinessCard } from "@/components/sections/BusinessCard";

export const metadata: Metadata = {
  title: "Daniel Rakušan — Junior Python Backend Developer",
  description: "Junior Python Backend Developer z Prahy. Python, Django, FastAPI. Ihned k dispozici.",
  openGraph: {
    title: "Daniel Rakušan — Junior Python Backend Developer",
    description: "Junior Python Backend Developer z Prahy. Ihned k dispozici.",
    url: "https://www.danielrakusan.cz/podpis",
  },
  alternates: {
    canonical: "https://www.danielrakusan.cz/podpis",
  },
};

export const revalidate = false;

async function getActiveId(): Promise<number> {
  const base = siteConfig.renderApiUrl;
  if (!base) return 1;
  try {
    const res = await fetch(`${base}/api/signature`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6_000),
    });
    if (!res.ok) return 1;
    const data = await res.json() as { id?: number };
    return data.id ?? 1;
  } catch {
    return 1;
  }
}

export default async function PodpisPage() {
  const activeId = await getActiveId();
  const sig = signatures.find(s => s.id === activeId) ?? signatures[0];

  return (
    <main style={{ minHeight: "100vh", background: "#02020a", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <BusinessCard sig={sig} />
    </main>
  );
}
