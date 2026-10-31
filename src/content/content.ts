// ============================================================
//  CONTENT FILE — všechny texty webu / all website texts
//  Jak přeložit: zkopíruj blok "en" nebo "cz", vlož do AI,
//  řekni "přelož do CZ/EN" a vlož zpět.
// ============================================================

export type Lang = "cz" | "en";

export const content = {
  cz: {
    meta: {
      title: "Daniel Rakušan — Junior AI & Python Developer",
      description:
        "Junior AI & Python developer s technickým backgroundem. Python, SQL, backend logika a vlastní projekty. Praha. Ihned k dispozici.",
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
      role: "Junior AI & Python Developer",
      subRole: "/ Backend direction",
      tagline: "Technické přemýšlení, backend logika.",
      pitch: "Programuju v Pythonu, s AI pracuju denně a lokální modely provozuju na vlastním hardwaru. Dlouhodobě pracuju v technických oborech a znám i prostředí, ve kterém kód běží. Hledám první pozici, primárně v Praze, ale jsem otevřený i jiným místům.",
      description:
        "Teď dělám hlavně vlastní projekty v Pythonu a SQL. Snažím se, aby byly jednoduché a fungovaly.",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "SQLite · SQL", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Django", color: "green" },
        { label: "HTML · CSS", color: "green" },
        { label: "Claude · AI", color: "amber" },
      ],
      eyebrow: "Praha · AI-assisted vývoj · Python",
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
        "U počítačů mě vždycky víc zajímalo, jak věci fungují, než jen to, jak se používají. Nechtěl jsem zůstat u hotového rozhraní, chtěl jsem pochopit, co je pod ním.",
        "Zlom přišel při hraní hry, kde jsem narazil na rozšíření s malým robotem programovaným v Lua. Ze začátku to byla jen zajímavost. Jenže postupně jsem trávil víc času nastavováním robota než samotným hraním. Zkoušel jsem příkazy, opravoval chyby, měnil jeho chování a sledoval, jak pár řádků kódu dokáže ovlivnit celý výsledek.",
        "Právě tam se ze zvědavosti stalo programování. Dnes na to navazuju Pythonem, prací s AI a IT podporou. Baví mě rozdělit problém na menší části a postupně z nich poskládat něco, co opravdu funguje.",
      ],
      highlight: "Lua",
    },

    whyMe: {
      sectionLabel: "Proč já",
      heading: "Co přináším",
      cards: [
        {
          title: "Backend směr",
          body: "Dělám hlavně Python, SQL a backend logiku. Modely, views, HTTP a databázové dotazy mi dávají čím dál větší smysl jako části jedné aplikace.",
        },
        {
          title: "Technický mindset",
          body: "S počítači a systémy pracuju dlouho. Ke kódu přistupuju stejně: hledám příčinu a postupuju krok za krokem.",
        },
        {
          title: "Vlastní projekty",
          body: "Učím se tím, že věci stavím. Mám vlastní Python projekty a experimenty a na GitHubu si zapisuju postup.",
        },
        {
          title: "AI workflow",
          body: "AI při práci běžně používám: vysvětlí mi koncepty, projde můj kód a pomůže s research.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Silné stránky",
      heading: "Co o mně platí",
      items: [
        "Python, SQLite a OOP: backend základ, se kterým pracuji ve vlastních projektech",
        "Zajímám se o Django, REST, HTTP a JSON a postupně je propojuju do jednoho celku",
        "Technické zázemí: dlouhodobá práce s počítači, systémy, Windows, macOS a jejich správou",
        "Git a GitHub: verzování, dokumentace postupu, vlastní repozitáře",
        "AI používám při učení, vysvětlování nových konceptů a code review",
        "Hledám první pracovní příležitost, nejraději v Praze, ale jsem otevřený i jinam. Ihned k dispozici",
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
            "Stavím vlastní Python projekty zaměřené na backend logiku: Django, OOP architektura, SQLite databáze.",
            "Postupně implementuji backend koncepty: HTTP flow, databázové modely, šablony a URL routing.",
            "Učím se debuggovat systematicky: rozeberu chybu, najdu příčinu a pokračuju.",
            "S AI si nechávám vysvětlovat koncepty, dělám code review a refactoring.",
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
          ],
        },
      ],
    },

    certifications: {
      sectionLabel: "Certifikáty",
      heading: "Dokončené kurzy",
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
        "Interaktivní Python terminál propojený s backend serverem na Render.com. Vlastní projekty pro živou ukázku teprve připravuji, sekce je rozpracovaná.",
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
        "Hledám první pracovní příležitost, primárně v Praze, ale jsem otevřený i jiným místům. Pokud tě profil zaujal, napiš mi.",
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
        "AI používám při vývoji i učení: na vysvětlení nových konceptů, code review a research.",
      builtWith: "Toto portfolio vzniklo s pomocí Claude",
      builtDetail:
        "Návrh, logiku i strukturu jsem vymyslel já, implementoval jsem je spolu s Claude.",
      skills: [
        {
          label: "Debugging s AI",
          body: "Když narazím na chybu, ptám se AI, co ji způsobilo a proč. Chci jí rozumět, ne ji jen opravit.",
        },
        {
          label: "Učení nových konceptů",
          body: "Nové téma si nechám vysvětlit na příkladech, potom ho sám naprogramuju a ověřím.",
        },
        {
          label: "Code review",
          body: "Napíšu řešení a požádám AI o review. Porovnám oba přístupy a hledám lepší.",
        },
        {
          label: "Research",
          body: "S AI se rychleji zorientuju v nových tématech a dokumentaci.",
        },
      ],
    },

    aiSection: {
      sectionLabel: "AI & Práce",
      heading: "Jak používám AI nástroje",
      description:
        "AI nenahrazuje moje přemýšlení. Používám ji jako nástroj a každý z nich mi slouží k něčemu jinému.",
      tools: [
        {
          id: "claude",
          name: "Claude",
          maker: "Anthropic",
          role: "Hlavní nástroj",
          usage: "Používám jako hlavní nástroj při práci na projektech. Nejvíc mi sedí u delších úkolů, práce s kódem, úprav napříč soubory a postupného dotahování řešení. Pomáhá mi držet směr projektu, rozdělit větší problém na menší kroky a navrhovat konkrétní změny místo obecných odpovědí. Největší výhoda je podle mě stabilnější práce s kontextem a schopnost navazovat na předchozí rozhodnutí v projektu.",
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
          limit: "Velký kontext neznamená správný závěr, proto důležité výstupy ověřuji.",
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

    localAI: {
      sectionLabel: "Lokální AI",
      heading: "Modely na vlastním hardwaru",
      description:
        "U lokálních modelů rozhoduje hlavně paměť: váhy modelu a kontext se musí vejít do VRAM, jinak se část přesune do RAM a běh se výrazně zpomalí.",
      specs: [
        { label: "Grafika", value: "RTX 5060 Ti", hint: "NVIDIA GeForce" },
        { label: "VRAM", value: "16 GB", hint: "paměť grafiky" },
        { label: "RAM", value: "40 GB", hint: "systémová paměť" },
      ],
      how: "Díky kvantizaci se do 16 GB vejdou například gpt-oss-20b nebo Qwen3 14B a běží nejrychleji. Větší modely rozděluju mezi grafiku a procesor. Jsou pomalejší, ale dají se spustit.",
      plan: "Další krok: druhá grafická karta, aby se vešly větší modely. Zatím testuju a učím se.",
    },

    masterPlan: {
      sectionLabel: "Plán rozvoje",
      heading: "Kam mířím",
      description:
        "Moje cesta z IT podpory do vývoje softwaru. Každou fázi doplňují kurzy a vlastní projekty.",
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
          items: ["Junior AI/Python role", "Test automation", "CI/CD základy"],
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
      title: "Daniel Rakušan — Junior AI & Python Developer",
      description:
        "Junior AI & Python developer with a technical background. Python, SQL, backend logic, and personal projects. Prague. Immediately available.",
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
      role: "Junior AI & Python Developer",
      subRole: "/ Backend direction",
      tagline: "Technical thinking, backend logic.",
      pitch: "I program in Python, work with AI daily, and run local models on my own hardware. I have worked in technical fields for years, so I also know the environment code runs in. Looking for my first role, primarily in Prague, but open to other locations.",
      description:
        "Right now I'm building personal projects in Python and SQL. I try to keep them simple and make sure they work.",
      pills: [
        { label: "Python", color: "cyan" },
        { label: "SQLite · SQL", color: "cyan" },
        { label: "OOP", color: "cyan" },
        { label: "Git · GitHub", color: "violet" },
        { label: "Django", color: "green" },
        { label: "HTML · CSS", color: "green" },
        { label: "Claude · AI", color: "amber" },
      ],
      eyebrow: "Prague · AI-assisted development · Python",
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
        "I've always been more interested in how computers work than just how to use them. I didn't want to stay at the surface of a finished interface. I wanted to understand what lay beneath it.",
        "The turning point came while playing a game where I discovered an extension with a small robot programmed in Lua. At first it was just a curiosity. But gradually I spent more time configuring the robot than actually playing. I tried commands, fixed bugs, changed its behavior and watched how a few lines of code could change the entire outcome.",
        "That's where curiosity turned into programming. Today I carry that on with Python, AI tools and IT support. I like breaking a problem into smaller pieces and gradually putting together something that actually works.",
      ],
      highlight: "Lua",
    },

    whyMe: {
      sectionLabel: "Why me",
      heading: "What I bring",
      cards: [
        {
          title: "Backend direction",
          body: "I work mostly with Python, SQL, and backend logic. Models, views, HTTP, and database queries make more and more sense to me as parts of one application.",
        },
        {
          title: "Technical mindset",
          body: "I've worked with computers and systems, and fixed them, for a long time. I approach code the same way: find the cause, then go step by step.",
        },
        {
          title: "Personal projects",
          body: "I learn by building. I have personal Python projects and experiments, and I keep a record of my progress on GitHub.",
        },
        {
          title: "AI workflow",
          body: "I use AI in my work routinely: it explains concepts, reviews my code, and helps with research.",
        },
      ],
    },

    highlights: {
      sectionLabel: "Highlights",
      heading: "At a glance",
      items: [
        "Python, SQLite, and OOP: the backend foundation I use in personal projects",
        "Interested in Django, REST, HTTP, and JSON, which I'm gradually piecing together",
        "Technical background: years of hands-on experience with computers, systems, Windows, macOS, and IT environments",
        "Git and GitHub: version control, progress notes, personal repositories",
        "I use AI for learning, understanding new concepts, and code review",
        "Looking for my first job opportunity, preferably in Prague but open to other locations. Immediately available",
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
            "Building personal Python projects with a backend focus: Django, OOP architecture, SQLite databases.",
            "Gradually applying backend concepts: HTTP flow, database models, templates, and URL routing.",
            "Learning to debug systematically: break the error down, find the cause, move on.",
            "Using AI for concept explanations, code review, and refactoring.",
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
          ],
        },
      ],
    },

    certifications: {
      sectionLabel: "Certifications",
      heading: "Completed courses",
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
        "Interactive Python terminal connected to a backend server on Render.com. I'm still preparing my own projects for the live demo, so this section is a work in progress.",
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
        "Looking for my first job opportunity, primarily in Prague, but open to other locations. If my profile caught your attention, send me a message.",
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
        "I use AI for development and learning: to explain new concepts, review code, and do research.",
      builtWith: "This portfolio was built with Claude",
      builtDetail:
        "I came up with the design, logic, and structure, and built it together with Claude.",
      skills: [
        {
          label: "Debugging with AI",
          body: "When I hit an error, I ask AI what caused it and why. I want to understand the error, not just fix it.",
        },
        {
          label: "Learning new concepts",
          body: "I ask AI to explain something with examples, then build it myself to make sure I got it.",
        },
        {
          label: "Code review",
          body: "I write a solution, then ask AI to review it. I compare the two approaches and look for a better one.",
        },
        {
          label: "Research",
          body: "With AI I find my way around new topics and documentation faster.",
        },
      ],
    },

    aiSection: {
      sectionLabel: "AI & Work",
      heading: "How I use AI tools",
      description:
        "AI does not replace my own thinking. I use it as a tool, and each one serves a different purpose.",
      tools: [
        {
          id: "claude",
          name: "Claude",
          maker: "Anthropic",
          role: "Primary tool",
          usage: "My primary tool for project work. Works best on longer tasks: coding, cross-file edits, and incremental problem-solving. It helps me keep the project on track, break bigger problems into smaller steps, and suggest concrete changes instead of generic answers. What I like most is how well it keeps context and builds on earlier decisions.",
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
          limit: "A large context window doesn't guarantee accurate output, so I always verify.",
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

    localAI: {
      sectionLabel: "Local AI",
      heading: "Models on my own hardware",
      description:
        "With local models, memory is what matters most: the weights and context have to fit in VRAM, otherwise part of the model moves to RAM and inference slows down sharply.",
      specs: [
        { label: "GPU", value: "RTX 5060 Ti", hint: "NVIDIA GeForce" },
        { label: "VRAM", value: "16 GB", hint: "GPU memory" },
        { label: "RAM", value: "40 GB", hint: "system memory" },
      ],
      how: "Thanks to quantization, models like gpt-oss-20b or Qwen3 14B fit in 16 GB and run fastest. I split larger models between the GPU and the CPU. They are slower, but they run.",
      plan: "Next step: a second graphics card, so larger models fit. For now I am testing and learning.",
    },

    masterPlan: {
      sectionLabel: "Learning roadmap",
      heading: "Where I'm heading",
      description:
        "My path from IT support into software development. Each phase comes with courses and personal projects.",
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
          items: ["Junior AI/Python role", "Test automation", "CI/CD basics"],
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
