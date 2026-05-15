// ============================================================
//  CONTENT FILE — všechny texty webu / all website texts
//  Jak přeložit: zkopíruj blok "en" nebo "cz", vlož do AI,
//  řekni "přelož do CZ/EN" a vlož zpět.
// ============================================================

export type Lang = "cz" | "en";

export const content = {
  cz: {
    meta: {
      title: "Daniel Rakušan — Junior Python Developer",
      description:
        "Junior Python Developer. Přecházím z IT podpory do vývoje přes Python, Django, SQLite a JavaScript. Praha. Ihned k dispozici.",
    },

    nav: {
      oMne: "O mně",
      dovednosti: "Dovednosti",
      zkusenosti: "Zkušenosti",
      certifikaty: "Certifikáty",
      projekty: "Projekty",
      kontakt: "Kontakt",
    },

    hero: {
      badge: "Ihned k dispozici · Praha",
      role: "Junior Python Developer",
      subRole: "/ Software Developer in Test Candidate",
      tagline: "Přecházím z IT supportu\ndo světa vývoje.",
      pitch: "Junior developer, který přemýšlí jako uživatel — a kóduje, dokud to funguje.",
      description:
        "Z IT podpory přímo do kódu. Každý den jsem viděl, kde software selhává — teď tuhle perspektivu přenáším do Pythonu, Djanga a čistého backendu. Certifikáty hotové, projekty na GitHubu, AI jako nástroj — ne berlička.",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "Django", color: "cyan" },
        { label: "SQLite", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "JavaScript", color: "green" },
        { label: "HTML/CSS", color: "green" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Claude · ChatGPT", color: "amber" },
      ],
      ctaContact: "Napište mi",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
      scrollHint: "Zjistit více",
    },

    whyMe: {
      sectionLabel: "Proč já",
      heading: "Co přináším",
      cards: [
        {
          title: "Python směr",
          body: "Cíleně se rozvíjím v Pythonu, Djangu, SQLite a webových základech přes ITnetwork, projekty a certifikáty.",
        },
        {
          title: "Technický základ",
          body: "Reálné zkušenosti s hardwarem, Windows, macOS, obnovou systémů a každodenním troubleshootingem.",
        },
        {
          title: "Disciplína učení",
          body: "Strukturované studium, certifikáty, GitHub workflow a každodenní zlepšování včetně angličtiny přes Duolingo.",
        },
        {
          title: "Developer mindset",
          body: "Baví mě pochopit, jak věci fungují. Řeším problémy krok za krokem a zlepšuji se pravidelnou praxí.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Silné stránky",
      heading: "Co o mně platí",
      items: [
        "Přechod do vývoje podpořený ITnetwork, certifikáty a projekty",
        "Troubleshooting Windows, macOS, hardware, recovery a konfigurace",
        "Základy Pythonu, OOP, Djanga, SQLite a JavaScriptu",
        "Znalost příkazové řádky, API základů, JSON a request-response modelu",
        "Zájem o Python test automation, kvalitu softwaru a debugging",
        "Otevřen full-time junior příležitostem v Praze",
      ],
    },

    skills: {
      sectionLabel: "Dovednosti",
      heading: "Co umím",
      active: {
        label: "// aktivně používám",
        sub: "Denní praxe, projekty, certifikáty",
        tags: ["Python", "Django", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// rozvíjím",
        sub: "Kurzy, projekty, každodenní učení",
        tags: ["JavaScript", "React", "Next.js", "JSON", "API basics", "Debugging"],
      },
      base: {
        label: "// IT základ",
        sub: "Reálná zkušenost z praxe",
        tags: ["Windows", "macOS", "Hardware", "Troubleshooting", "Linux basics", "System recovery"],
      },
    },

    experience: {
      sectionLabel: "Zkušenosti",
      heading: "Profesní historie",
      items: [
        {
          role: "Python Web Development",
          company: "ITnetwork · Projekty · Certifikáty",
          period: "2025 – nyní",
          location: "Praha",
          tags: ["Python", "Django", "SQLite", "JavaScript", "React", "OOP"],
          bullets: [
            "Python a webový vývoj přes ITnetwork, projekty, certifikáty a průběžné samostudium.",
            "Rozvíjím dovednosti v OOP, Djangu, SQLite, JavaScriptu, Reactu, HTML a webovém designu.",
            "Vytvářím porozumění backendové logice, zpracování dat a request-response modelu.",
            "Využívám AI nástroje jako podporu při učení, výzkumu a debuggingu.",
          ],
        },
        {
          role: "Servisní technik / IT podpora",
          company: "Alza.cz a.s.",
          period: "Led 2018 – Říj 2018",
          location: "Praha",
          tags: ["Hardware", "Windows", "macOS", "Diagnostika"],
          bullets: [
            "Servis a příprava vrácených zařízení k opětovnému prodeji nebo použití.",
            "Práce s notebooky, desktopy, telefony, wearables a spotřební elektronikou.",
            "Přeinstalace systémů, ovladače, obnova, čištění, diagnostika a technické hodnocení.",
          ],
        },
        {
          role: "Další profesní zkušenosti",
          company: "Různé pozice · ČR / UK",
          period: "2011 – nyní",
          location: "ČR / UK",
          tags: ["Zákaznická podpora", "Montáž", "Spolehlivost"],
          bullets: [
            "Zákaznicky orientované role, technické a instalatérské práce.",
            "Prokazují dlouhodobou pracovní kontinuitu, spolehlivost a reálné řešení problémů.",
          ],
        },
      ],
    },

    certifications: {
      sectionLabel: "Certifikáty",
      heading: "Dokázané výsledky",
      completed: "Dokončeno",
      items: [
        {
          title: "Django Foundations for Python",
          date: "Duben 2026",
          category: "Webový framework",
        },
        {
          title: "Object-Oriented Programming in Python",
          date: "Únor 2026",
          category: "Třídy, struktura a logika aplikací",
        },
        {
          title: "Python Fundamentals",
          date: "Únor 2026",
          category: "Základy jazyka a řešení problémů",
        },
        {
          title: "SQLite Databases Step by Step",
          date: "Únor 2026",
          category: "Databázové základy pro prax",
        },
      ],
    },

    terminal: {
      sectionLabel: "Python projekty",
      heading: "Spusť můj kód",
      description:
        "Interaktivní terminál připojený k Python backendu na Render.com. Vyber projekt, spusť ho a zadávej vstup jako v reálném terminálu.",
      waking: "Backend se probouzí",
      wakingDetail: "Render.com free tier spí po nečinnosti. Může to trvat 20–30 sekund.",
      ready: "Backend je připraven",
      error: "Backend nedostupný",
      errorDetail: "Nepodařilo se spojit s backendem. Zkus to za chvíli.",
      selectProject: "Vyber projekt",
      run: "Spustit",
      stop: "Zastavit",
      clear: "Vymazat",
      noProjects: "Zatím žádné projekty. Brzy přibydou.",
      inputPlaceholder: "Zadej vstup...",
      titleBar: "python — daniel@rakusan",
    },

    contact: {
      sectionLabel: "Kontakt",
      heading: "Pojďme si promluvit",
      description:
        "Hledám první junior příležitost v Praze. Pokud tě můj profil zaujal, ozvi se — rád si promluvím.",
      availability: "Ihned k dispozici",
      location: "Praha, Česká republika",
      email: "daniel@rakusan.cz",
      ctaEmail: "Napsat e-mail",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
    },

    vibeSection: {
      sectionLabel: "Vibe Coding",
      heading: "Kóduju s AI",
      description:
        "Vibe coding je přístup, kdy AI stojí po tvém boku jako spoluprogramátor. Nepíšeš každý řádek sám — říkáš, co chceš, AI navrhuje, ty kontroluješ, řídíš a rozhoduješ. Výsledek záleží na tom, jestli tomu rozumíš.",
      builtWith: "Tento web byl vytvořen vibe codingem",
      builtDetail:
        "Celé toto portfolio — design, logika, struktura, nasazení — vzniklo ve spolupráci s Claude od Anthropic. Nepsal jsem každý řádek, ale řídil jsem každé rozhodnutí. Výsledek mluví za sebe.",
      skills: [
        { label: "Prompt engineering", body: "Umím formulovat zadání tak, aby AI pochopila kontext, omezení i záměr." },
        { label: "Code review s AI", body: "Kontroluji, testuju a rozumím kódu, který AI navrhne — nejen kopíruji." },
        { label: "Iterativní vývoj", body: "Pracuji v cyklech: zadám, ověřím, opravím, posunu se dál — stejně jako v reálném projektu." },
        { label: "Multi-model přístup", body: "Pracuji s Claude, ChatGPT i dalšími — a vím, kdy použít který nástroj." },
      ],
    },

    aiSection: {
      sectionLabel: "AI & Práce",
      heading: "Jak pracuji s AI",
      description:
        "Každý den pracuji s nástroji jako Claude a ChatGPT. Nejde o nahrazení přemýšlení — jde o rychlejší řešení problémů, výzkum a ladění kódu.",
      items: [
        {
          title: "Debuggování",
          body: "Procházím chybové zprávy s AI asistencí a učím se chápat kořenové příčiny místo kopírování řešení.",
        },
        {
          title: "Výzkum",
          body: "Rychle zjišťuji koncepty, dokumentaci a best practices — věci si pak ověřuji v praxi.",
        },
        {
          title: "Refactoring",
          body: "Požádám AI o zpětnou vazbu ke kódu, porovnám přístupy a pochopím kompromisy.",
        },
        {
          title: "Psaní",
          body: "E-maily, PR popisy a dokumentace — AI mi slouží jako rychlý editor, ne jako autor.",
        },
      ],
    },

    masterPlan: {
      sectionLabel: "Plán rozvoje",
      heading: "Kam mířím",
      description:
        "Strukturovaná cesta z IT podpory do vývoje softwaru. Každý krok je podpořen certifikáty, projekty a denní praxí.",
      phases: [
        {
          phase: "Fáze 1",
          label: "Základ",
          status: "done" as const,
          items: ["Python fundamentals", "OOP", "SQLite", "Django"],
        },
        {
          phase: "Fáze 2",
          label: "Web & projekty",
          status: "current" as const,
          items: ["JavaScript", "React", "Next.js", "Git workflow"],
        },
        {
          phase: "Fáze 3",
          label: "Kariéra",
          status: "next" as const,
          items: ["Junior Python role", "Test automation", "CI/CD základy"],
        },
      ],
    },

    footer: {
      built: "Postaveno v Next.js · Nasazeno na Vercel",
      available: "Ihned k dispozici",
    },

    github: {
      publicInfo: "Veřejné informace z GitHubu",
      location: "Lokace",
      email: "E-mail",
      website: "Web",
      company: "Firma",
      social: "Sítě",
      avatarAlt: "Profilová fotka {name} z GitHubu",
    },
  },

  // ─────────────────────────────────────────────────────────
  //  ENGLISH VERSION
  // ─────────────────────────────────────────────────────────
  en: {
    meta: {
      title: "Daniel Rakušan — Junior Python Developer",
      description:
        "Junior Python Developer transitioning from IT support into development through Python, Django, SQLite, and JavaScript. Prague. Immediately available.",
    },

    nav: {
      oMne: "About",
      dovednosti: "Skills",
      zkusenosti: "Experience",
      certifikaty: "Certifications",
      projekty: "Projects",
      kontakt: "Contact",
    },

    hero: {
      badge: "Immediately available · Prague",
      role: "Junior Python Developer",
      subRole: "/ Software Developer in Test Candidate",
      tagline: "Transitioning from IT support\ninto development.",
      pitch: "Junior developer who thinks like a user — and codes until it works.",
      description:
        "From IT support straight into code. I saw every day where software really fails — now I bring that perspective to Python, Django, and clean backends. Certifications done, projects on GitHub, AI as a tool — not a crutch.",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "Django", color: "cyan" },
        { label: "SQLite", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "JavaScript", color: "green" },
        { label: "HTML/CSS", color: "green" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Claude · ChatGPT", color: "amber" },
      ],
      ctaContact: "Get in touch",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
      scrollHint: "Learn more",
    },

    whyMe: {
      sectionLabel: "Why me",
      heading: "What I bring",
      cards: [
        {
          title: "Python direction",
          body: "Deliberately growing in Python, Django, SQLite, and web fundamentals through ITnetwork, projects, and certifications.",
        },
        {
          title: "Technical base",
          body: "Real hands-on experience with hardware, Windows, macOS, system recovery, and day-to-day troubleshooting.",
        },
        {
          title: "Learning discipline",
          body: "Structured study, certifications, GitHub workflow, and daily improvement including English through Duolingo.",
        },
        {
          title: "Developer mindset",
          body: "I enjoy understanding how things work. I solve problems step by step and improve through consistent practice.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Highlights",
      heading: "What holds true",
      items: [
        "Transition into development supported by ITnetwork, certifications, and projects",
        "Troubleshooting Windows, macOS, hardware, recovery, and configuration",
        "Foundations in Python, OOP, Django, SQLite, and JavaScript",
        "Understanding of command line, API basics, JSON, and request-response flow",
        "Strong interest in Python test automation, software quality, and debugging",
        "Open to full-time junior opportunities in Prague",
      ],
    },

    skills: {
      sectionLabel: "Skills",
      heading: "What I know",
      active: {
        label: "// actively using",
        sub: "Daily practice, projects, certifications",
        tags: ["Python", "Django", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// developing",
        sub: "Courses, projects, daily learning",
        tags: ["JavaScript", "React", "Next.js", "JSON", "API basics", "Debugging"],
      },
      base: {
        label: "// IT background",
        sub: "Real-world hands-on experience",
        tags: ["Windows", "macOS", "Hardware", "Troubleshooting", "Linux basics", "System recovery"],
      },
    },

    experience: {
      sectionLabel: "Experience",
      heading: "Work history",
      items: [
        {
          role: "Python Web Development",
          company: "ITnetwork · Projects · Certifications",
          period: "2025 – Present",
          location: "Prague",
          tags: ["Python", "Django", "SQLite", "JavaScript", "React", "OOP"],
          bullets: [
            "Python and web development through ITnetwork, projects, certifications, and continuous self-study.",
            "Developing skills in OOP, Django, SQLite, JavaScript, React, HTML, and web design.",
            "Building understanding of backend logic, data handling, and request-response flow.",
            "Using AI tools as support for learning, research, and debugging.",
          ],
        },
        {
          role: "Service Technician / IT Support",
          company: "Alza.cz a.s.",
          period: "Jan 2018 – Oct 2018",
          location: "Prague",
          tags: ["Hardware", "Windows", "macOS", "Diagnostics"],
          bullets: [
            "Serviced and prepared returned devices for resale or reuse.",
            "Worked with notebooks, desktops, phones, wearables, and consumer electronics.",
            "System reinstalls, drivers, recovery, cleaning, diagnostics, and technical evaluation.",
          ],
        },
        {
          role: "Additional Professional Experience",
          company: "Various roles · CZ / UK",
          period: "2011 – Present",
          location: "CZ / UK",
          tags: ["Customer service", "Installation", "Reliability"],
          bullets: [
            "Customer-facing roles and technical installation work.",
            "Demonstrate long-term employment continuity, reliability, and real-world problem solving.",
          ],
        },
      ],
    },

    certifications: {
      sectionLabel: "Certifications",
      heading: "Proven results",
      completed: "Completed",
      items: [
        {
          title: "Django Foundations for Python",
          date: "April 2026",
          category: "Web framework foundations",
        },
        {
          title: "Object-Oriented Programming in Python",
          date: "February 2026",
          category: "Classes, structure, and application logic",
        },
        {
          title: "Python Fundamentals",
          date: "February 2026",
          category: "Language foundations and problem-solving",
        },
        {
          title: "SQLite Databases Step by Step",
          date: "February 2026",
          category: "Database basics for practical applications",
        },
      ],
    },

    terminal: {
      sectionLabel: "Python projects",
      heading: "Run my code",
      description:
        "Interactive terminal connected to a Python backend on Render.com. Select a project, run it, and provide input just like a real terminal.",
      waking: "Backend is waking up",
      wakingDetail: "Render.com free tier sleeps when idle. This may take 20–30 seconds.",
      ready: "Backend is ready",
      error: "Backend unavailable",
      errorDetail: "Could not connect to the backend. Try again in a moment.",
      selectProject: "Select project",
      run: "Run",
      stop: "Stop",
      clear: "Clear",
      noProjects: "No projects yet. More coming soon.",
      inputPlaceholder: "Enter input...",
      titleBar: "python — daniel@rakusan",
    },

    contact: {
      sectionLabel: "Contact",
      heading: "Let's talk",
      description:
        "I'm looking for my first junior opportunity in Prague. If my profile caught your attention, reach out — I'd love to have a conversation.",
      availability: "Immediately available",
      location: "Prague, Czech Republic",
      email: "daniel@rakusan.cz",
      ctaEmail: "Send email",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
    },

    vibeSection: {
      sectionLabel: "Vibe Coding",
      heading: "I code with AI",
      description:
        "Vibe coding means AI stands beside you as a co-programmer. You don't write every line yourself — you describe what you want, AI suggests, you review, steer, and decide. The result depends on whether you actually understand what's happening.",
      builtWith: "This website was built with vibe coding",
      builtDetail:
        "This entire portfolio — design, logic, structure, deployment — was built in collaboration with Claude by Anthropic. I didn't write every line, but I made every decision. The result speaks for itself.",
      skills: [
        { label: "Prompt engineering", body: "I know how to frame a task so AI understands context, constraints, and intent." },
        { label: "Code review with AI", body: "I review, test, and understand the code AI proposes — not just copy-paste." },
        { label: "Iterative development", body: "I work in cycles: describe, verify, fix, move forward — just like in real projects." },
        { label: "Multi-model approach", body: "I work with Claude, ChatGPT, and others — and know when to use which tool." },
      ],
    },

    aiSection: {
      sectionLabel: "AI & Work",
      heading: "How I work with AI",
      description:
        "I use tools like Claude and ChatGPT daily. It's not about replacing thinking — it's about solving problems faster, researching efficiently, and debugging smarter.",
      items: [
        {
          title: "Debugging",
          body: "I walk through error messages with AI assistance and learn to understand root causes instead of just copying fixes.",
        },
        {
          title: "Research",
          body: "Quickly surface concepts, documentation, and best practices — then verify things by actually building.",
        },
        {
          title: "Refactoring",
          body: "Ask AI for code feedback, compare approaches, and understand the trade-offs.",
        },
        {
          title: "Writing",
          body: "Emails, PR descriptions, documentation — AI is a fast editor, not the author.",
        },
      ],
    },

    masterPlan: {
      sectionLabel: "Learning roadmap",
      heading: "Where I'm heading",
      description:
        "A structured path from IT support into software development. Every step is backed by certifications, projects, and daily practice.",
      phases: [
        {
          phase: "Phase 1",
          label: "Foundation",
          status: "done" as const,
          items: ["Python fundamentals", "OOP", "SQLite", "Django"],
        },
        {
          phase: "Phase 2",
          label: "Web & projects",
          status: "current" as const,
          items: ["JavaScript", "React", "Next.js", "Git workflow"],
        },
        {
          phase: "Phase 3",
          label: "Career",
          status: "next" as const,
          items: ["Junior Python role", "Test automation", "CI/CD basics"],
        },
      ],
    },

    footer: {
      built: "Built with Next.js · Deployed on Vercel",
      available: "Immediately available",
    },

    github: {
      publicInfo: "Public GitHub details",
      location: "Location",
      email: "Email",
      website: "Website",
      company: "Company",
      social: "Social",
      avatarAlt: "{name} GitHub profile photo",
    },
  },
} as const;

export type Content = typeof content;
export type LangContent = Content[Lang];
