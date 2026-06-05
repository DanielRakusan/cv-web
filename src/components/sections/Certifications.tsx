"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

type Cert = {
  file: string;
  titleCz: string;
  titleEn: string;
  categoryCz: string;
  categoryEn: string;
  dateCz: string;
  dateEn: string;
  icon: string;
  iconBg: string;
  courseUrl: string;
};

const CERTS: Cert[] = [
  {
    file: "Certifikat_Zaklady_Django_frameworku_pro_Python.pdf",
    titleCz: "Základy Django frameworku",
    titleEn: "Django Framework Foundations",
    categoryCz: "Webový framework · Python",
    categoryEn: "Web framework · Python",
    dateCz: "Duben 2026",
    dateEn: "April 2026",
    icon: "🐍",
    iconBg: "rgba(34,211,238,.12)",
    courseUrl: "https://www.itnetwork.cz/python/django/zaklady",
  },
  {
    file: "Certifikat_Objektove_orientovane_programovani_v_Pythonu.pdf",
    titleCz: "OOP v Pythonu",
    titleEn: "OOP in Python",
    categoryCz: "Třídy, struktura a logika",
    categoryEn: "Classes, structure & logic",
    dateCz: "Únor 2026",
    dateEn: "February 2026",
    icon: "📦",
    iconBg: "rgba(34,211,238,.12)",
    courseUrl: "https://www.itnetwork.cz/python/oop",
  },
  {
    file: "Certifikat_Zakladni_konstrukce_jazyka_Python.pdf",
    titleCz: "Základy jazyka Python",
    titleEn: "Python Fundamentals",
    categoryCz: "Základ jazyka · Algoritmy",
    categoryEn: "Language basics · Algorithms",
    dateCz: "Únor 2026",
    dateEn: "February 2026",
    icon: "⚡",
    iconBg: "rgba(34,211,238,.12)",
    courseUrl: "https://www.itnetwork.cz/python/zaklady",
  },
  {
    file: "Certifikat_SQLite_databaze_krok_za_krokem.pdf",
    titleCz: "SQLite databáze krok za krokem",
    titleEn: "SQLite Databases Step by Step",
    categoryCz: "Databáze · SQL",
    categoryEn: "Databases · SQL",
    dateCz: "Únor 2026",
    dateEn: "February 2026",
    icon: "🗄️",
    iconBg: "rgba(167,139,250,.12)",
    courseUrl: "https://www.itnetwork.cz/sqlite",
  },
  {
    file: "Certifikat_Kolekce_v_Pythonu.pdf",
    titleCz: "Kolekce v Pythonu",
    titleEn: "Python Collections",
    categoryCz: "Datové struktury",
    categoryEn: "Data structures",
    dateCz: "Únor 2026",
    dateEn: "February 2026",
    icon: "🗂️",
    iconBg: "rgba(34,211,238,.12)",
    courseUrl: "https://www.itnetwork.cz/python/kolekce",
  },
  {
    file: "Certifikat_Zaklady_React.pdf",
    titleCz: "Základy React",
    titleEn: "React Fundamentals",
    categoryCz: "Frontend framework",
    categoryEn: "Frontend framework",
    dateCz: "2026",
    dateEn: "2026",
    icon: "⚛️",
    iconBg: "rgba(74,222,128,.12)",
    courseUrl: "https://www.itnetwork.cz/javascript/react/zaklady",
  },
  {
    file: "Certifikat_Zakladni_konstrukce_jazyka_JavaScript.pdf",
    titleCz: "Základy JavaScriptu",
    titleEn: "JavaScript Fundamentals",
    categoryCz: "Skriptovací jazyk · Web",
    categoryEn: "Scripting · Web",
    dateCz: "2026",
    dateEn: "2026",
    icon: "🟨",
    iconBg: "rgba(251,191,36,.12)",
    courseUrl: "https://www.itnetwork.cz/javascript/zaklady",
  },
  {
    file: "Certifikat_HTML5_od_A_do_Z.pdf",
    titleCz: "HTML5 od A do Z",
    titleEn: "HTML5 from A to Z",
    categoryCz: "Markup · Webová struktura",
    categoryEn: "Markup · Web structure",
    dateCz: "2026",
    dateEn: "2026",
    icon: "🌐",
    iconBg: "rgba(74,222,128,.12)",
    courseUrl: "https://www.itnetwork.cz/html-css/html5",
  },
  {
    file: "Certifikat_Responzivni_webdesign.pdf",
    titleCz: "Responzivní webdesign",
    titleEn: "Responsive Web Design",
    categoryCz: "CSS · Mobile first",
    categoryEn: "CSS · Mobile first",
    dateCz: "2026",
    dateEn: "2026",
    icon: "📱",
    iconBg: "rgba(74,222,128,.12)",
    courseUrl: "https://www.itnetwork.cz/html-css/responzivni-webdesign",
  },
  {
    file: "Certifikat_Moderni_webdesign.pdf",
    titleCz: "Moderní webdesign",
    titleEn: "Modern Web Design",
    categoryCz: "Design · UX principy",
    categoryEn: "Design · UX principles",
    dateCz: "2026",
    dateEn: "2026",
    icon: "🎨",
    iconBg: "rgba(167,139,250,.12)",
    courseUrl: "https://www.itnetwork.cz/html-css/webove-stranky",
  },
];

export function Certifications() {
  const t = useContent();
  const { lang } = useLanguage();
  const [active, setActive] = useState<Cert | null>(null);

  const label = lang === "cz" ? "Dokončeno · klik pro náhled" : "Completed · click to preview";
  const openLabel = lang === "cz" ? "↗ otevřít v nové záložce" : "↗ open in new tab";

  return (
    <SectionWrapper id="certifikaty">
      <SectionHeader
        keyword={`// ${t.certifications.sectionLabel.toLowerCase()}`}
        heading={t.certifications.heading}
        sub={lang === "cz"
          ? "10 dokončených kurzů. Klikni na certifikát pro náhled PDF."
          : "10 completed courses. Click a certificate to preview the PDF."}
      />

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))" }}
      >
        {CERTS.map((cert, i) => {
          const title = lang === "cz" ? cert.titleCz : cert.titleEn;
          const category = lang === "cz" ? cert.categoryCz : cert.categoryEn;
          const date = lang === "cz" ? cert.dateCz : cert.dateEn;

          return (
            <motion.button
              key={cert.file}
              type="button"
              onClick={() => setActive(cert)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-left w-full rounded-xl border p-4 transition-all duration-200"
              style={{
                borderColor: "var(--b1)",
                background: "var(--s1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(74,222,128,.4)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px rgba(74,222,128,.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--b1)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Icon + title row */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                  style={{ background: cert.iconBg, border: "1px solid rgba(255,255,255,.06)" }}
                  aria-hidden="true"
                >
                  {cert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-mono font-bold leading-snug"
                    style={{ fontSize: ".78rem", color: "var(--txt)", letterSpacing: "-.01em" }}
                  >
                    {title}
                  </p>
                  <p
                    className="font-mono mt-0.5"
                    style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".04em" }}
                  >
                    {category}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono"
                  style={{
                    fontSize: ".55rem",
                    padding: "2px 8px",
                    borderRadius: 3,
                    border: "1px solid rgba(74,222,128,.3)",
                    color: "var(--green)",
                    background: "rgba(74,222,128,.06)",
                    letterSpacing: ".04em",
                  }}
                >
                  ✓ {label}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: ".6rem", color: "var(--dim)" }}
                >
                  {date}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2,2,10,.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              key="cert-modal-panel"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full rounded-xl overflow-hidden flex flex-col"
              style={{
                maxWidth: 860,
                height: "min(90vh, 640px)",
                background: "rgba(6,6,20,.98)",
                border: "1px solid var(--b1)",
                boxShadow: "0 32px 80px rgba(0,0,0,.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* macOS-style title bar */}
              <div
                className="flex items-center gap-2 px-4 flex-shrink-0"
                style={{
                  height: 40,
                  borderBottom: "1px solid var(--b0)",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                {/* Traffic lights */}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="w-3 h-3 rounded-full transition-opacity duration-150 hover:opacity-80"
                  style={{ background: "#ff5f57", flexShrink: 0 }}
                />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e", flexShrink: 0 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840", flexShrink: 0 }} />

                {/* Title */}
                <span
                  className="font-mono flex-1 text-center"
                  style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".04em" }}
                >
                  {lang === "cz" ? active.titleCz : active.titleEn}
                </span>

                {/* Přejít na kurz */}
                <a
                  href={active.courseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono transition-colors duration-150"
                  style={{ fontSize: ".6rem", color: "var(--green)", letterSpacing: ".04em", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#86efac")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--green)")}
                >
                  {lang === "cz" ? "→ přejít na kurz" : "→ go to course"}
                </a>

                {/* Open in new tab */}
                <a
                  href={`/certificates/${active.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono transition-colors duration-150"
                  style={{ fontSize: ".6rem", color: "var(--cyan)", letterSpacing: ".04em", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#67e8f9")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
                >
                  {openLabel}
                </a>
              </div>

              {/* Certificate image */}
              <div className="flex-1 overflow-auto flex items-center justify-center p-4" style={{ background: "rgba(255,255,255,.04)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/certificates/preview/${active.file.replace(".pdf", ".jpg")}`}
                  alt={lang === "cz" ? active.titleCz : active.titleEn}
                  style={{ maxWidth: "100%", height: "auto", borderRadius: 6, boxShadow: "0 8px 40px rgba(0,0,0,.5)", display: "block" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
