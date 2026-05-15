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
      pitch: "Python backend developer s IT backgroundem — rozumím systémům zevnitř, stavím je zvenčí.",
      description:
        "Z IT podpory přímo do backendu. Roky v terénu mi ukázaly, kde software selhává a proč — teď tuhle perspektivu přenáším do Pythonu, Djanga a databázové logiky. Debugguji, stavím, iteruji. GitHub jako deník práce.",
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
          title: "Backend thinking",
          body: "Pracuji s Python backendem, Djangem a SQLite. Přemýšlím v pojmech views, modelů, databázových dotazů a serverové logiky — ne jen v prohlížeči.",
        },
        {
          title: "Troubleshooting mindset",
          body: "Roky IT supportu mě naučily systematicky hledat root cause. Tahle perspektiva teď funguje při debuggování kódu — hledám příčinu, ne záplatu.",
        },
        {
          title: "Aktivní builder",
          body: "Nestuduju jen teorii. Stavím projekty, nasazuji, ladím a iteruji. Python terminál na tomto webu běží na reálném backend serveru.",
        },
        {
          title: "AI-augmented workflow",
          body: "AI používám jako součást dev toolkitu — rychlejší debugging, code review, research. Vím, co generuji a proč. Výsledek řídím já.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Silné stránky",
      heading: "Co o mně platí",
      items: [
        "Python, Django, SQLite — backend stack v reálném použití: modely, views, databázové dotazy",
        "IT support background: diagnostika hardware, Windows/macOS systémy, recovery, troubleshooting",
        "Chápám request-response model, API logiku, JSON a tok dat mezi frontendem a backendem",
        "Debugguji systematicky — traceback analýza, izolace problému, iterativní oprava",
        "AI jako součást workflow: prompt engineering, code review s AI, multi-model přístup",
        "Hledám junior Python/backend pozici v Praze — ihned k dispozici, připraven nastoupit",
      ],
    },

    skills: {
      sectionLabel: "Dovednosti",
      heading: "Co umím",
      active: {
        label: "// aktivně stavím s",
        sub: "Denní praxe, reálné projekty, GitHub",
        tags: ["Python", "Django", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// znám · zlepšuji se",
        sub: "Aktivně používám v projektech, posouvám dál",
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
          role: "Python Backend Development",
          company: "Vlastní projekty · ITnetwork · GitHub",
          period: "2025 – nyní",
          location: "Praha",
          tags: ["Python", "Django", "SQLite", "JavaScript", "React", "OOP"],
          bullets: [
            "Stavím Python aplikace s důrazem na backend logiku — Django MVC, OOP architektura, SQLite databáze.",
            "Implementuji serverovou logiku: request-response flow, databázové modely, admin rozhraní, URL routing.",
            "Debugguji systematicky: analýza tracebacků, izolace root cause, iterativní opravy.",
            "Používám AI jako součást workflow — code review, research, refactoring. Kód vždy rozumím a kontroluji.",
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
      heading: "Live backend demo",
      description:
        "Reálný Python backend nasazený na Render.com. Vyber projekt, spusť ho a interaguj s ním přímo — stejně jako v terminálu. Tohle není demo. Je to kód, který skutečně běží.",
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
      sectionLabel: "AI & Učení",
      heading: "AI jako akcelerátor učení",
      description:
        "Nepoužívám AI proto, abych se vyhnul přemýšlení. Používám ho proto, abych se učil rychleji a efektivněji — jako sparring partnera, který mi vysvětlí traceback, porovná dvě řešení nebo ukáže, kde jsem udělal logickou chybu. Výsledky si vždy ověřuji a snažím se jim rozumět.",
      builtWith: "Toto portfolio vzniklo ve spolupráci s AI",
      builtDetail:
        "Design, logika, struktura — navrženo a rozhodováno mnou, implementováno ve spolupráci s Claude. Každý výstup jsem kontroloval, testoval a pochopil. AI urychlil realizaci, porozumění bylo moje.",
      skills: [
        {
          label: "Debugging s AI",
          body: "Vložím traceback, ptám se na příčinu — ne na opravu. AI mi vysvětlí, proč k chybě došlo, já pak problém vyřeším sám. Chápu kód, ne jen záplatu.",
        },
        {
          label: "Učení nových konceptů",
          body: "Nové téma si nechám vysvětlit s příklady, pak ho sám implementuji a ověřuji. AI funguje jako rychlý, trpělivý učitel — dokumentaci si ale vždy dočítám.",
        },
        {
          label: "Code review a porovnávání",
          body: "Napíšu řešení, požádám AI o review. Porovnám přístupy, ptám se na trade-offy. Výsledkem je lepší porozumění — ne jen lepší kód.",
        },
        {
          label: "Research a ověřování",
          body: "AI zrychluje první orientaci v tématu. Vždy ale ověřuji v dokumentaci a vlastními testy. AI je výchozí bod, ne pravda.",
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
      pitch: "Python backend developer with an IT background — I understand systems from the inside, I build them from the outside.",
      description:
        "From IT support straight into backend. Years in the field showed me where software breaks and why — I now bring that perspective to Python, Django, and database logic. I debug, I build, I iterate. GitHub as my work log.",
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
          title: "Backend thinking",
          body: "I work with Python backend, Django, and SQLite. I think in terms of views, models, database queries, and server-side logic — not just the browser.",
        },
        {
          title: "Troubleshooting mindset",
          body: "Years in IT support taught me to systematically hunt for root causes. That same perspective now drives my debugging — I find the cause, not just a patch.",
        },
        {
          title: "Active builder",
          body: "I don't just study theory. I build projects, deploy them, debug them, and iterate. The Python terminal on this site runs on a real backend server.",
        },
        {
          title: "AI-augmented workflow",
          body: "I use AI as part of my dev toolkit — faster debugging, code review, research. I know what I'm generating and why. I'm driving the output.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Highlights",
      heading: "What holds true",
      items: [
        "Python, Django, SQLite — backend stack in real use: models, views, database queries",
        "IT support background: hardware diagnostics, Windows/macOS systems, recovery, troubleshooting",
        "I understand request-response flow, API logic, JSON, and data flow between frontend and backend",
        "I debug systematically — traceback analysis, problem isolation, iterative fixes",
        "AI as part of workflow: prompt engineering, code review with AI, multi-model approach",
        "Looking for a junior Python/backend role in Prague — immediately available",
      ],
    },

    skills: {
      sectionLabel: "Skills",
      heading: "What I know",
      active: {
        label: "// actively building with",
        sub: "Daily practice, real projects, GitHub",
        tags: ["Python", "Django", "SQLite", "OOP", "Git", "GitHub", "HTML", "CSS"],
      },
      growing: {
        label: "// know it · getting better",
        sub: "Actively using in projects, pushing further",
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
          role: "Python Backend Development",
          company: "Personal Projects · ITnetwork · GitHub",
          period: "2025 – Present",
          location: "Prague",
          tags: ["Python", "Django", "SQLite", "JavaScript", "React", "OOP"],
          bullets: [
            "Building Python applications focused on backend logic — Django MVC, OOP architecture, SQLite databases.",
            "Implementing server-side logic: request-response flow, database models, admin interface, URL routing.",
            "Debugging systematically: traceback analysis, root cause isolation, iterative fixes.",
            "Using AI as part of the dev workflow — code review, research, refactoring. I always understand and control the code.",
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
      heading: "Live backend demo",
      description:
        "A real Python backend deployed on Render.com. Select a project, run it, and interact with it directly — just like a real terminal. This isn't a mockup. It's code that actually runs.",
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
      sectionLabel: "AI & Learning",
      heading: "AI as a learning accelerator",
      description:
        "I don't use AI to avoid thinking. I use it to learn faster and more effectively — as a sparring partner that explains a traceback, compares two solutions, or points out where my logic breaks. I always verify the output and make sure I actually understand it.",
      builtWith: "This portfolio was built in collaboration with AI",
      builtDetail:
        "Design, logic, structure — designed and decided by me, implemented in collaboration with Claude. Every output was reviewed, tested, and understood. AI accelerated the execution; the understanding was mine.",
      skills: [
        {
          label: "Debugging with AI",
          body: "I paste a traceback and ask for the cause — not the fix. AI explains why the error happened; I then solve it myself. I understand the code, not just the patch.",
        },
        {
          label: "Learning new concepts",
          body: "I ask AI to explain a new topic with examples, then implement it myself and verify. AI acts as a fast, patient teacher — but I always read the docs too.",
        },
        {
          label: "Code review & comparison",
          body: "I write a solution, then ask AI to review it. I compare approaches and ask about trade-offs. The result is better understanding — not just better code.",
        },
        {
          label: "Research & verification",
          body: "AI speeds up initial orientation in a topic. I always verify in official docs and through my own tests. AI is a starting point, not the source of truth.",
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
