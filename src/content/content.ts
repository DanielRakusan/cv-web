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

    journey: {
      sectionLabel: "Pozadí",
      heading: "Moje cesta k programování",
      paragraphs: [
        "U počítačů mě vždycky víc zajímalo, jak věci fungují, než jen to, jak se používají. Nechtěl jsem zůstat u hotového rozhraní. Lákalo mě pochopit, co je pod ním.",
        "Zlom přišel při hraní hry, kde jsem narazil na rozšíření s malým robotem programovaným v Lua. Ze začátku to byla jen zajímavost. Jenže postupně jsem trávil víc času nastavováním robota než samotným hraním. Zkoušel jsem příkazy, opravoval chyby, měnil jeho chování a sledoval, jak pár řádků kódu dokáže ovlivnit celý výsledek.",
        "Právě tam se ze zvědavosti stalo programování. Dnes na tenhle zájem navazuji přes Python, AI-assisted development a IT support. Baví mě rozložit problém na menší části, pochopit souvislosti a postupně vytvořit řešení, které opravdu funguje.",
      ],
      highlight: "Lua",
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
      paused: "Backend je offline",
      pausedDetail: "Backend je momentálně pozastavený. Zkus to za chvíli.",
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
      heading: "Jak používám AI nástroje",
      description:
        "AI používám jako praktickou součást práce, ne jako náhradu vlastního přemýšlení. Každý nástroj mi pomáhá v jiné části workflow.",
      tools: [
        {
          id: "claude",
          name: "Claude",
          maker: "Anthropic",
          role: "Hlavní nástroj",
          usage: "Používám jako hlavní nástroj při práci na projektech. Nejvíc mi sedí u delších úkolů, práce s kódem, úprav napříč soubory a postupného dotahování řešení. Pomáhá mi držet směr projektu, rozdělit větší problém na menší kroky a navrhovat konkrétní změny místo obecných odpovědí. Jeho hlavní výhoda je stabilnější práce s kontextem a schopnost navazovat na předchozí rozhodnutí v projektu.",
          limit: "Výstup nikdy neberu jako hotové řešení bez kontroly. Větší změny v kódu vždy procházím, testuji a upravuji podle toho, co projekt opravdu potřebuje.",
        },
        {
          id: "chatgpt",
          name: "ChatGPT",
          maker: "OpenAI",
          role: "Učení & vysvětlování",
          usage: "Vysvětlování, učení, rychlý rozbor problémů a formulace textů. Pomáhá mi pochopit věci krok za krokem.",
          limit: "U delších projektů je potřeba víc hlídat kontext.",
        },
        {
          id: "gemini",
          name: "Gemini",
          maker: "Google",
          role: "Dlouhý kontext",
          usage: "Dlouhé dokumenty, větší množství textu a orientace v rozsáhlejších materiálech.",
          limit: "Velký kontext neznamená automaticky správný závěr — důležité výstupy ověřuji.",
        },
        {
          id: "wispr",
          name: "Wispr Flow",
          maker: "Wispr",
          role: "Hlasové diktování",
          usage: "Diktování promptů místo psaní. Rychle zachytím první myšlenku hlasem a potom ji upravím do přesnějšího zadání.",
          limit: "",
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
        "Currently building personal projects in Python and SQL, with a focus on functionality, simplicity, and modern workflows.",
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

    journey: {
      sectionLabel: "Background",
      heading: "My path to programming",
      paragraphs: [
        "I've always been more interested in how computers work than just how to use them. I didn't want to stay at the surface of a finished interface — I wanted to understand what lay beneath it.",
        "The turning point came while playing a game where I discovered an extension with a small robot programmed in Lua. At first it was just a curiosity. But gradually I spent more time configuring the robot than actually playing. I tried commands, fixed bugs, changed its behavior and watched how a few lines of code could change the entire outcome.",
        "That's where curiosity turned into programming. Today I build on that curiosity through Python and AI-assisted development. I enjoy breaking problems into smaller pieces, seeing how the parts connect, and gradually building something that actually works.",
      ],
      highlight: "Lua",
    },

    whyMe: {
      sectionLabel: "Why me",
      heading: "What I bring",
      cards: [
        {
          title: "Backend direction",
          body: "Focused on Python, SQL, and backend logic. Concepts like models, views, HTTP, and database queries are starting to click into place as part of the bigger picture.",
        },
        {
          title: "Technical mindset",
          body: "I've been around computers, systems, and problem-solving for a long time. That approach naturally carries over into code — and helps me think systematically.",
        },
        {
          title: "Personal projects",
          body: "I build things I learn from. Personal Python projects, experiments, GitHub as a record of progress.",
        },
        {
          title: "AI workflow",
          body: "I use AI naturally as part of my workflow — faster concept pickup, code review, research. Part of how modern development works.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Highlights",
      heading: "At a glance",
      items: [
        "Python, SQLite, and OOP — backend foundation I actively work with in personal projects",
        "Interest in Django, REST principles, HTTP, and JSON — backend concepts I'm gradually piecing together",
        "Technical background: years of hands-on experience with computers, systems, Windows, macOS, and IT environments",
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
            "AI as a natural part of the workflow — faster understanding of new concepts, code review, refactoring.",
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
            "Consistent track record of reliability across different work environments.",
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
      paused: "Backend is offline",
      pausedDetail: "Backend is currently paused. Try again in a moment.",
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
        "I use AI naturally as part of development and learning — for faster concept pickup, code review, and research. It helps me learn and improve faster as a junior developer.",
      builtWith: "This portfolio was built with Claude",
      builtDetail:
        "Design, logic, structure — designed by me, implemented in collaboration with Claude. A real-world example of AI-assisted development in practice.",
      skills: [
        {
          label: "Debugging with AI",
          body: "When I hit an error, I use AI to help me understand the root cause. The goal is understanding — not just a fixed bug.",
        },
        {
          label: "Learning new concepts",
          body: "I ask AI to explain something with examples, then build it myself to make sure it sticks. AI acts as a fast, patient teacher.",
        },
        {
          label: "Code review",
          body: "I write a solution, then ask AI to review it. I compare approaches and look for a better way — and usually come away with a better understanding.",
        },
        {
          label: "Research",
          body: "AI speeds up how I navigate new topics and documentation. Part of my everyday workflow.",
        },
      ],
    },

    aiSection: {
      sectionLabel: "AI & Work",
      heading: "How I use AI tools",
      description:
        "I use AI as a practical part of my work, not as a replacement for my own thinking. Each tool helps me with a different part of my workflow.",
      tools: [
        {
          id: "claude",
          name: "Claude",
          maker: "Anthropic",
          role: "Primary tool",
          usage: "My primary tool for project work. Works best on longer tasks — coding tasks, cross-file edits, and incremental problem-solving. It helps me keep the project on track, break bigger problems into smaller steps, and suggest concrete changes instead of generic answers. The main advantage is how well it maintains context and builds on earlier decisions.",
          limit: "I never treat the output as a finished solution. I always review larger code changes, test them, and adjust based on what the project actually needs.",
        },
        {
          id: "chatgpt",
          name: "ChatGPT",
          maker: "OpenAI",
          role: "Learning & explanation",
          usage: "Explaining, learning, quick breakdowns, and writing help. Helps me understand things step by step.",
          limit: "Context can get fuzzy on longer tasks.",
        },
        {
          id: "gemini",
          name: "Gemini",
          maker: "Google",
          role: "Long context",
          usage: "Long documents and large amounts of text.",
          limit: "A large context window doesn't guarantee accurate output — I always verify.",
        },
        {
          id: "wispr",
          name: "Wispr Flow",
          maker: "Wispr",
          role: "Voice dictation",
          usage: "Dictating prompts instead of typing. I quickly capture the first idea by voice, then refine it into a precise prompt.",
          limit: "",
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
