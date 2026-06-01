import dynamic from "next/dynamic";
import { fetchGitHubProfile } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { BackgroundLayers } from "@/components/background/BackgroundLayers";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyMe } from "@/components/sections/WhyMe";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

// Lazy-loaded sekce — JS chunky se načtou odděleně, nezablokují
// initial render Hero/WhyMe/Experience a sníží TBT.
const Terminal = dynamic(() =>
  import("@/components/sections/Terminal").then(m => ({ default: m.Terminal }))
);
const VibeCoding = dynamic(() =>
  import("@/components/sections/VibeCoding").then(m => ({ default: m.VibeCoding }))
);
const Certifications = dynamic(() =>
  import("@/components/sections/Certifications").then(m => ({ default: m.Certifications }))
);

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

async function fetchProjectsSSR(): Promise<{ id: string; name: string; description: string }[]> {
  const apiUrl = process.env.NEXT_PUBLIC_RENDER_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/projects`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const [profile, projects] = await Promise.all([
    fetchGitHubProfile(siteConfig.githubUsername),
    fetchProjectsSSR(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundLayers />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero profile={profile} />
          <SectionDivider />

          <WhyMe />
          <SectionDivider />

          <Experience />
          <SectionDivider />

          <Terminal />
          {projects.length > 0 && <ProjectsList projects={projects} />}
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

function ProjectsList({ projects }: { projects: { id: string; name: string; description: string }[] }) {
  return (
    <section
      aria-label="Projekty"
      style={{ maxWidth: 1060, margin: "0 auto", padding: "0 1.5rem 2rem" }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <strong style={{ color: "var(--text)", fontSize: "0.9rem" }}>{p.name}</strong>
            {p.description && (
              <p style={{ margin: "0.2rem 0 0", color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.5 }}>
                {p.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
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
