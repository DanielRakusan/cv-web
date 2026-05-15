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

export default async function Page() {
  const profile = await fetchGitHubProfile(siteConfig.githubUsername);

  return (
    <>
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
