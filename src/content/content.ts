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
        "Junior Python developer s technickým backgroundem. Python, SQL, backend logika a vlastní projekty. Praha. Ihned k dispozici.",
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
      subRole: "/ Backend direction",
      tagline: "Technické přemýšlení, backend logika.",
      pitch: "Technické přemýšlení, backend logika a chuť neustále věci zlepšovat.",
      description:
        "Aktuálně rozvíjím Python, SQL a vlastní projekty s důrazem na funkčnost, jednoduchost a moderní workflow —",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "SQLite · SQL", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Django", color: "green" },
        { label: "HTML · CSS", color: "green" },
        { label: "Claude · AI", color: "amber" },
      ],
      eyebrow: "Praha · Python Backend · IT background",
      ctaContact: "Napište mi",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
      scrollHint: "Zjistit více",
      liveDemo: "spusť si je →",
    },

    whyMe: {
      sectionLabel: "Proč já",
      heading: "Co přináším",
      cards: [
        {
          title: "Backend směr",
          body: "Zaměřuji se na Python, SQL a backend logiku. Koncepty jako modely, views, HTTP a databázové dotazy mi dávají stále větší smysl v kontextu celé aplikace.",
        },
        {
          title: "Technický mindset",
          body: "Dlouhodobě se pohybuji kolem počítačů, systémů a řešení problémů. Tenhle přístup přirozeně přenáším do kódu — a pomáhá mi přemýšlet systematicky.",
        },
        {
          title: "Vlastní projekty",
          body: "Stavím věci, ze kterých se učím. Vlastní Python projekty, experimenty, GitHub jako deník postupu.",
        },
        {
          title: "AI workflow",
          body: "AI používám přirozeně jako součást práce — rychlejší pochopení konceptů, code review, research. Součást moderního vývojového přístupu.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Silné stránky",
      heading: "Co o mně platí",
      items: [
        "Python, SQLite a OOP — backend základ, se kterým aktivně pracuji ve vlastních projektech",
        "Zájem o Django, REST principy, HTTP a JSON — backend koncepty, které postupně propojuji",
        "Technické zázemí: dlouhodobá práce s počítači, systémy, Windows, macOS a jejich správou",
        "Git a GitHub — verzování, dokumentace postupu, vlastní repozitáře",
        "AI jako přirozená součást workflow při učení, pochopení nových konceptů a code review",
        "Hledám junior Python/backend pozici v Praze — ihned k dispozici",
      ],
    },

    skills: {
      sectionLabel: "Dovednosti",
      heading: "Co umím",
      active: {
        label: "// aktivně stavím s",
        sub: "Vlastní projekty, GitHub, pravidelná praxe",
        tags: ["Python", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// znám · přidávám",
        sub: "Backend koncepty, experimenty, integrace",
        tags: ["Django", "JSON", "API basics", "JavaScript", "Debugging"],
      },
      base: {
        label: "// IT základ",
        sub: "Dlouhodobá technická zkušenost",
        tags: ["Windows", "macOS", "Hardware", "Troubleshooting", "Linux basics", "System recovery"],
      },
    },

    experience: {
      sectionLabel: "Zkušenosti",
      heading: "Profesní historie",
      items: [
        {
          role: "Python · Backend · Vlastní projekty",
          company: "Samostatný vývoj · ITnetwork · GitHub",
          period: "2025 – nyní",
          location: "Praha",
          tags: ["Python", "Django", "SQLite", "OOP", "Git"],
          bullets: [
            "Stavím vlastní Python projekty zaměřené na backend logiku — Django, OOP architektura, SQLite databáze.",
            "Postupně implementuji backend koncepty: HTTP flow, databázové modely, šablony a URL routing.",
            "Přibližuji se k systematickému debuggování — analyzuji chyby, hledám příčiny a postupuji dál.",
            "AI jako přirozená součást workflow — rychlejší pochopení konceptů, code review, refactoring.",
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
            "Dlouhodobá pracovní kontinuita a spolehlivost v různých prostředích.",
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
          category: "Jazyk a řešení problémů",
        },
        {
          title: "SQLite Databases Step by Step",
          date: "Únor 2026",
          category: "Databázový základ",
        },
      ],
    },

    terminal: {
      sectionLabel: "Python projekty",
      heading: "Python demo",
      description:
        "Interaktivní Python terminál propojený s backend serverem na Render.com. Aktuálně připravuji vlastní projekty pro live ukázku — sekce je aktivně ve vývoji.",
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
      selectHint: "← Vyber projekt, pak klikni ▶ Spustit.",
      notConfigured: "Backend není nakonfigurován.",
      inputPlaceholder: "Zadej vstup...",
      titleBar: "python — daniel@rakusan",
      projectPrompt: "// ZVOL PROJEKT A SPUSŤ UKÁZKU",
      filesTab: "Soubory",
      noFiles: "Žádné soubory",
      wakingBackend: "Probouzím backend…",
      backendUnavailable: "⚠ Backend nedostupný.",
      tryAgain: "Zkusit znovu",
      readmeNotFound: "README nenalezeno.",
    },

    contact: {
      sectionLabel: "Kontakt",
      heading: "Pojďme si promluvit",
      description:
        "Hledám junior Python/backend pozici v Praze. Pokud tě profil zaujal, ozvi se — rád si promluvím.",
      availability: "Ihned k dispozici",
      location: "Praha, Česká republika",
      email: "rakusan.dev@gmail.com",
      ctaEmail: "Napsat e-mail",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
    },

    vibeSection: {
      sectionLabel: "AI & Učení",
      heading: "AI jako součást workflow",
      description:
        "Přirozeně používám AI jako součást vývoje a učení — rychlejší pochopení nových konceptů, code review, research. Pomáhá mi růst rychleji a efektivněji jako junior developer.",
      builtWith: "Toto portfolio vzniklo s pomocí Claude",
      builtDetail:
        "Design, logika, struktura — navrženo mnou, implementováno ve spolupráci s Claude. Portfolio jako ukázka AI-assisted development v praxi.",
      skills: [
        {
          label: "Debugging s AI",
          body: "Když narazím na chybu, ptám se AI na kontext a příčinu. Výsledkem je lepší pochopení — a ne jen opravená chyba.",
        },
        {
          label: "Učení nových konceptů",
          body: "Nové téma si nechám vysvětlit s příklady, pak ho sám implementuji a ověřuji. AI funguje jako rychlý, trpělivý učitel.",
        },
        {
          label: "Code review",
          body: "Napíšu řešení, požádám AI o review. Porovnám přístupy a hledám lepší způsob — výsledkem je lepší porozumění.",
        },
        {
          label: "Research",
          body: "AI zrychluje orientaci v nových tématech a dokumentaci. Součást každodenního vývojového procesu.",
        },
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
      lastUpdated: "Naposledy aktualizováno:",
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
        "Junior Python developer with a technical background. Python, SQL, backend logic, and personal projects. Prague. Immediately available.",
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
      subRole: "/ Backend direction",
      tagline: "Technical thinking, backend logic.",
      pitch: "Technical thinking, backend logic, and a constant drive to improve things.",
      description:
        "Currently building Python, SQL, and personal projects with a focus on functionality, simplicity, and modern workflow.",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "SQLite · SQL", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Django", color: "green" },
        { label: "HTML · CSS", color: "green" },
        { label: "Claude · AI", color: "amber" },
      ],
      eyebrow: "Prague · Python Backend · IT background",
      ctaContact: "Get in touch",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
      scrollHint: "Learn more",
      liveDemo: "Run them →",
    },

    whyMe: {
      sectionLabel: "Why me",
      heading: "What I bring",
      cards: [
        {
          title: "Backend direction",
          body: "Focused on Python, SQL, and backend logic. Concepts like models, views, HTTP, and database queries are making more and more sense as part of the whole picture.",
        },
        {
          title: "Technical mindset",
          body: "I've been around computers, systems, and problem-solving for a long time. That approach naturally carries over into code — and helps me think systematically.",
        },
        {
          title: "Personal projects",
          body: "I build things I learn from. Personal Python projects, experiments, GitHub as a log of progress.",
        },
        {
          title: "AI workflow",
          body: "I use AI naturally as part of working — faster concept understanding, code review, research. Part of a modern development approach.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Highlights",
      heading: "What holds true",
      items: [
        "Python, SQLite, and OOP — backend foundation I actively work with in personal projects",
        "Interest in Django, REST principles, HTTP, and JSON — backend concepts I'm gradually connecting",
        "Technical background: long-term engagement with computers, systems, Windows, macOS, and their management",
        "Git and GitHub — version control, progress documentation, personal repositories",
        "AI as a natural part of the workflow for learning, understanding new concepts, and code review",
        "Looking for a junior Python/backend role in Prague — immediately available",
      ],
    },

    skills: {
      sectionLabel: "Skills",
      heading: "What I know",
      active: {
        label: "// actively building with",
        sub: "Personal projects, GitHub, regular practice",
        tags: ["Python", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// know it · adding",
        sub: "Backend concepts, experimentation, integration",
        tags: ["Django", "JSON", "API basics", "JavaScript", "Debugging"],
      },
      base: {
        label: "// IT background",
        sub: "Long-term technical experience",
        tags: ["Windows", "macOS", "Hardware", "Troubleshooting", "Linux basics", "System recovery"],
      },
    },

    experience: {
      sectionLabel: "Experience",
      heading: "Work history",
      items: [
        {
          role: "Python · Backend · Personal Projects",
          company: "Self-directed · ITnetwork · GitHub",
          period: "2025 – Present",
          location: "Prague",
          tags: ["Python", "Django", "SQLite", "OOP", "Git"],
          bullets: [
            "Building personal Python projects with a backend focus — Django, OOP architecture, SQLite databases.",
            "Gradually applying backend concepts: HTTP flow, database models, templates, and URL routing.",
            "Developing a systematic approach to debugging — analysing errors, finding patterns, moving forward.",
            "AI as a natural part of the workflow — faster concept understanding, code review, refactoring.",
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
            "Long-term employment continuity and reliability across different environments.",
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
          category: "Web framework",
        },
        {
          title: "Object-Oriented Programming in Python",
          date: "February 2026",
          category: "Classes, structure, and application logic",
        },
        {
          title: "Python Fundamentals",
          date: "February 2026",
          category: "Language and problem-solving",
        },
        {
          title: "SQLite Databases Step by Step",
          date: "February 2026",
          category: "Database foundation",
        },
      ],
    },

    terminal: {
      sectionLabel: "Python projects",
      heading: "Python demo",
      description:
        "Interactive Python terminal connected to a backend server on Render.com. Currently preparing personal projects for a live showcase — actively in development.",
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
      selectHint: "← Select a project, then click ▶ Run.",
      notConfigured: "Backend not configured.",
      inputPlaceholder: "Enter input...",
      titleBar: "python — daniel@rakusan",
      projectPrompt: "// SELECT A PROJECT AND RUN THE DEMO",
      filesTab: "Files",
      noFiles: "No files",
      wakingBackend: "Waking backend…",
      backendUnavailable: "⚠ Backend unavailable.",
      tryAgain: "Try again",
      readmeNotFound: "README not found.",
    },

    contact: {
      sectionLabel: "Contact",
      heading: "Let's talk",
      description:
        "Looking for a junior Python/backend role in Prague. If my profile caught your attention, reach out — happy to talk.",
      availability: "Immediately available",
      location: "Prague, Czech Republic",
      email: "rakusan.dev@gmail.com",
      ctaEmail: "Send email",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
    },

    vibeSection: {
      sectionLabel: "AI & Learning",
      heading: "AI as part of the workflow",
      description:
        "I naturally use AI as part of development and learning — faster understanding of new concepts, code review, research. It helps me grow faster and more effectively as a junior developer.",
      builtWith: "This portfolio was built with Claude",
      builtDetail:
        "Design, logic, structure — designed by me, implemented in collaboration with Claude. The portfolio as a practical example of AI-assisted development.",
      skills: [
        {
          label: "Debugging with AI",
          body: "When I hit an error, I ask AI for context and cause. The result is better understanding — not just a fixed bug.",
        },
        {
          label: "Learning new concepts",
          body: "I ask AI to explain a topic with examples, then implement it myself and verify. AI works as a fast, patient teacher.",
        },
        {
          label: "Code review",
          body: "I write a solution, ask AI to review it. I compare approaches and look for a better way — the result is better understanding.",
        },
        {
          label: "Research",
          body: "AI speeds up orientation in new topics and documentation. Part of an everyday development process.",
        },
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
      lastUpdated: "Last updated:",
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
