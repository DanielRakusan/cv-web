// ============================================================
//  SITE CONFIG — URL adresy, GitHub username, Render backend
//  Změň hodnoty tady, zbytek webu se aktualizuje automaticky.
// ============================================================

export const siteConfig = {
  // Tvůj GitHub username
  githubUsername: "DanielRakusan",

  // URL Render.com Python backendu (doplň po nasazení)
  // Příklad: "https://daniel-python-api.onrender.com"
  renderApiUrl: process.env.NEXT_PUBLIC_RENDER_API_URL ?? "",

  // Sociální sítě a kontakt
  social: {
    github: "https://github.com/DanielRakusan",
    linkedin: "https://linkedin.com/in/daniel-rakusan",
    email: "daniel@rakusan.cz",
  },

  // Doména webu
  siteUrl: "https://www.danielrakusan.cz",

  // Ping Render backendu při načtení stránky (wake-up)
  // Jak dlouho čekat na odpověď backendu v ms
  renderWakeTimeoutMs: 45_000,

  // Jak often pingovat backend dokud se neprobudí (ms)
  renderPingIntervalMs: 3_000,
} as const;

// ============================================================
//  Python projekty registrované v terminálu
//
//  Jak to funguje:
//  1. Přidej projekt sem (id, name, description, repoUrl...)
//  2. Na Render backendu nastav GITHUB_TOKEN (env var)
//     — token potřebuje read přístup k daným repozitářům
//     — funguje i s privátními repozitáři
//  3. Backend při spuštění projektu:
//     a) Naklonuje / aktualizuje repozitář pomocí GITHUB_TOKEN
//     b) Spustí scriptPath uvnitř toho repozitáře
//     c) Posílá stdout/stderr přes WebSocket zpět do terminálu
//
//  GITHUB_TOKEN nastavíš na Render.com v sekci:
//  Dashboard → Service → Environment → Add Environment Variable
// ============================================================
export const terminalProjects: TerminalProject[] = [
  // Příklad — odkomentuj a uprav po přidání projektu:
  // {
  //   id: "fibonacci",
  //   name: "Fibonacci Generator",
  //   description: "Zadej číslo N, dostaneš prvních N čísel Fibonacciho posloupnosti.",
  //   repoUrl: "https://github.com/DanielRakusan/python-projects",
  //   branch: "main",
  //   scriptPath: "fibonacci/main.py",
  //   acceptsInput: true,
  // },
  //
  // Privátní repozitář — funguje stejně, stačí GITHUB_TOKEN na Render:
  // {
  //   id: "my-private-project",
  //   name: "Tajný projekt",
  //   description: "Kód z privátního repozitáře.",
  //   repoUrl: "https://github.com/DanielRakusan/private-repo",
  //   branch: "main",
  //   scriptPath: "src/main.py",
  //   acceptsInput: false,
  // },
];

export type TerminalProject = {
  // Unikátní ID — musí odpovídat route na backendu: POST /run/{id}
  id: string;

  // Zobrazované jméno v selectu
  name: string;

  // Krátký popis co projekt dělá
  description: string;

  // URL GitHub repozitáře (veřejný i privátní)
  // Příklad: "https://github.com/DanielRakusan/python-projects"
  repoUrl?: string;

  // Branch — výchozí je "main"
  branch?: string;

  // Relativní cesta ke skriptu v repozitáři
  // Příklad: "fibonacci/main.py" nebo "src/main.py"
  scriptPath?: string;

  // Přijímá script vstup od uživatele (stdin)?
  acceptsInput?: boolean;
};
