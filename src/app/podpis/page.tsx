import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { SignatureDisplay } from "@/components/sections/SignatureDisplay";

export const metadata: Metadata = {
  title: "Email podpis — Daniel Rakušan",
  description: "Email podpis — zkopírujte HTML a vložte do Gmailu.",
  robots: { index: false, follow: false },
};

export default function PodpisPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#02020a", paddingTop: "80px" }}>
        <SignatureDisplay />
      </main>
    </>
  );
}
