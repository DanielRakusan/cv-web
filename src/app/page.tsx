import { fetchGitHubProfile } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { BackgroundLayers } from "@/components/background/BackgroundLayers";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyMe } from "@/components/sections/WhyMe";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { MasterPlan } from "@/components/sections/MasterPlan";
import { VibeCoding } from "@/components/sections/VibeCoding";
import { AISection } from "@/components/sections/AISection";
import { Terminal } from "@/components/sections/Terminal";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Rakušan",
  jobTitle: "Junior Python Developer",
  url: "https://www.danielrakusan.cz",
  email: "rakusan.dev@gmail.com",
  image: `https://github.com/${siteConfig.githubUsername}.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Praha",
    addressCountry: "CZ",
  },
  sameAs: [
    "https://github.com/DanielRakusan",
    "https://linkedin.com/in/daniel-rakusan",
  ],
  knowsAbout: ["Python", "Django", "SQLite", "SQL", "Git", "JavaScript", "HTML", "CSS"],
  description:
    "Junior Python backend developer based in Prague. Transitioning from IT support to software development.",
};

export default async function Page() {
  const profile = await fetchGitHubProfile(siteConfig.githubUsername);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundLayers />

      <div className="relative z-10">
        <Navbar profile={profile} />

        <main>
          <Hero profile={profile} />
          <SectionDivider />

          <WhyMe />
          <SectionDivider />

          <Experience />
          <SectionDivider />

          <Terminal />
          <SectionDivider />

          <Skills />
          <SectionDivider />

          <VibeCoding />
          <SectionDivider />

          <Certifications />
          <SectionDivider />

          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-4xl px-6">
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
      />
    </div>
  );
}
