import dynamic from "next/dynamic";
import { fetchGitHubProfile } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { BackgroundLayers } from "@/components/background/BackgroundLayers";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyMe } from "@/components/sections/WhyMe";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { AISection } from "@/components/sections/AISection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

// Lazy-loaded sekce — JS chunky se načtou odděleně, nezablokují
// initial render Hero/WhyMe/Experience a sníží TBT.
import { TerminalClient } from "@/components/sections/TerminalClient";
const VibeCoding = dynamic(() =>
  import("@/components/sections/VibeCoding").then(m => ({ default: m.VibeCoding }))
);
const Certifications = dynamic(() =>
  import("@/components/sections/Certifications").then(m => ({ default: m.Certifications }))
);

const SITE_URL = "https://www.danielrakusan.cz";

function buildJsonLd(projects: { id: string; name: string; description: string }[]) {
  const graph: object[] = [
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
        occupationLocation: { "@type": "City", name: "Praha" },
        skills: "Python, Django, FastAPI, SQLite, SQL, Git, JavaScript, HTML, CSS, AI-assisted development, Claude Code, Prompt engineering",
      },
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "Django Foundations for Python", credentialCategory: "certificate" },
        { "@type": "EducationalOccupationalCredential", name: "Python Fundamentals", credentialCategory: "certificate" },
        { "@type": "EducationalOccupationalCredential", name: "SQLite Databases Step by Step", credentialCategory: "certificate" },
      ],
      knowsAbout: [
        "Python", "Django", "SQLite", "SQL", "Git", "JavaScript", "HTML", "CSS", "OOP", "Backend development",
        "AI-assisted development", "Claude Code", "ChatGPT", "Prompt engineering",
        "FastAPI", "Next.js", "Web Push API", "WebSocket", "REST API",
      ],
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
  ];

  graph.push({
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#python-terminal`,
    name: "Živé Python demo",
    description: "Interaktivní Python terminál běžící přímo v prohlížeči. Projekty jsou spouštěny živě na backendu — skutečný spustitelný kód, ne jen ukázka textu. Každý projekt lze spustit, zadat vstup a sledovat výstup v reálném čase.",
    applicationCategory: "DeveloperApplication",
    programmingLanguage: "Python",
    featureList: ["Živé spouštění kódu", "Interaktivní vstup", "WebSocket streaming výstupu", "ANSI barevný výstup"],
    author: { "@id": `${SITE_URL}/#person` },
    url: SITE_URL,
  });

  if (projects.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Python projekty",
      description: "Interaktivní Python projekty spustitelné přímo v prohlížeči.",
      author: { "@id": `${SITE_URL}/#person` },
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          "@id": `${SITE_URL}/#project-${p.id}`,
          name: p.name,
          description: p.description,
          applicationCategory: "DeveloperApplication",
          programmingLanguage: "Python",
          author: { "@id": `${SITE_URL}/#person` },
          url: SITE_URL,
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

async function fetchProjectsSSR(): Promise<{ id: string; name: string; description: string }[]> {
  const apiUrl = process.env.NEXT_PUBLIC_RENDER_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/projects`, {
      next: { revalidate: 3600 }, // max 1x za hodinu, nebo ihned po /api/revalidate
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
  const jsonLd = buildJsonLd(projects);

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

          <AISection />
          <SectionDivider />

          <Experience />
          <SectionDivider />

          <PythonDemoMeta />
          <TerminalClient />
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

        <Footer lastUpdated={(() => {
          const raw = process.env.VERCEL_GIT_COMMIT_CREATED ?? process.env.NEXT_PUBLIC_BUILD_TIME;
          const d = raw ? new Date(raw) : new Date();
          return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
        })()} />
      </div>
    </>
  );
}

function PythonDemoMeta() {
  return (
    <div
      aria-hidden="false"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
      style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
    >
      <h2 itemProp="name">Živé Python demo</h2>
      <meta itemProp="applicationCategory" content="DeveloperApplication" />
      <meta itemProp="programmingLanguage" content="Python" />
      <p itemProp="description">
        Interaktivní Python terminál běžící přímo v prohlížeči. Projekty jsou spouštěny živě na backendu —
        jde o skutečný spustitelný kód, ne jen ukázku textu. Každý projekt lze spustit, zadat vstup a sledovat výstup v reálném čase.
      </p>
    </div>
  );
}

function ProjectsList({ projects }: { projects: { id: string; name: string; description: string }[] }) {
  return (
    <section
      aria-label="Python projekty"
      itemScope
      itemType="https://schema.org/ItemList"
      style={{ maxWidth: 1060, margin: "0 auto", padding: "0 1.5rem 2rem", visibility: "hidden", height: 0, overflow: "hidden" }}
    >
      <meta itemProp="name" content="Python projekty" />
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {projects.map((p, i) => (
          <li
            key={p.id}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
            itemProp="itemListElement"
          >
            <meta itemProp="position" content={String(i + 1)} />
            <h3 itemProp="name" style={{ margin: 0, fontSize: "1rem" }}>{p.name}</h3>
            {p.description && (
              <p itemProp="description" style={{ margin: 0 }}>{p.description}</p>
            )}
            <meta itemProp="applicationCategory" content="DeveloperApplication" />
            <meta itemProp="programmingLanguage" content="Python" />
          </li>
        ))}
      </ol>
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
