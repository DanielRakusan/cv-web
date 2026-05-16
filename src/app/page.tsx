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

// Schema.org @graph — Google preferuje propojené entity přes @id
const SITE_URL = "https://www.danielrakusan.cz";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Daniel Rakušan",
      givenName: "Daniel",
      familyName: "Rakušan",
      jobTitle: "Junior Python Developer",
      description:
        "Junior Python backend developer based in Prague. Transitioning from IT support to software development. Building with Python, Django, SQLite and Git.",
      url: SITE_URL,
      email: "rakusan.dev@gmail.com",
      image: {
        "@type": "ImageObject",
        url: `https://github.com/${siteConfig.githubUsername}.png`,
        width: 400,
        height: 400,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Praha",
        addressCountry: "CZ",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Junior Python Developer",
        occupationLocation: {
          "@type": "City",
          name: "Praha",
        },
        skills: "Python, Django, SQLite, SQL, Git, JavaScript, HTML, CSS",
      },
      knowsAbout: ["Python", "Django", "SQLite", "SQL", "Git", "JavaScript", "HTML", "CSS", "OOP", "Backend development"],
      availableLanguage: [
        { "@type": "Language", name: "Czech" },
        { "@type": "Language", name: "English" },
      ],
      sameAs: [
        "https://github.com/DanielRakusan",
        "https://linkedin.com/in/daniel-rakusan",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Daniel Rakušan — Junior Python Developer",
      description: "Osobní portfolio a CV Daniela Rakušana — junior Python backend developer z Prahy.",
      inLanguage: ["cs", "en"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Daniel Rakušan — Junior Python Developer",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      inLanguage: ["cs", "en"],
    },
  ],
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
