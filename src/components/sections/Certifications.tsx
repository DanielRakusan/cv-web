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

const MAIN_BADGE = {
  image: "/certificates/badge_python_web_apps.png",
  verifyUrl: "https://www.itnetwork.cz/portfolio/badge/d582efca-af70-4085-a0fd-730cc79cb10e",
  certId: "d582efca-af70-4085-a0fd-730cc79cb10e",
  titleCz: "Tvorba www aplikací v jazyku Python",
  titleEn: "Python Web Application Development",
  categoryCz: "Akreditovaný rekvalifikační kurz · itnetwork.cz",
  categoryEn: "Accredited retraining course · itnetwork.cz",
  dateCz: "Červen 2026",
  dateEn: "June 2026",
};

const OFFICIAL_CERT = {
  file: "Osvedceni_Python_WWW_aplikace_MSMT.pdf",
  preview1: "/certificates/preview/Osvedceni_Python_WWW_aplikace_MSMT-1.jpg",
  preview2: "/certificates/preview/Osvedceni_Python_WWW_aplikace_MSMT-2.jpg",
  titleCz: "Úřední osvědčení MŠMT",
  titleEn: "Official MŠMT Certificate",
  categoryCz: "Akreditováno Ministerstvem školství ČR · č.j. MSMT-7415/2024-5",
  categoryEn: "Accredited by Czech Ministry of Education · č.j. MSMT-7415/2024-5",
  dateCz: "12. 6. 2026",
  dateEn: "12 June 2026",
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
  const [officialCertOpen, setOfficialCertOpen] = useState(false);

  const label = lang === "cz" ? "Dokončeno" : "Completed";
  const openLabel = lang === "cz" ? "↗ otevřít v nové záložce" : "↗ open in new tab";
  const verifyLabel = lang === "cz" ? "↗ ověřit certifikát" : "↗ verify certificate";

  return (
    <SectionWrapper id="certifikaty">
      <SectionHeader
        keyword={`// ${t.certifications.sectionLabel.toLowerCase()}`}
        heading={t.certifications.heading}
        sub={lang === "cz"
          ? "Akreditovaný rekvalifikační kurz + 10 dokončených kurzů. Klikni na certifikát pro náhled PDF."
          : "Accredited retraining course + 10 completed courses. Click a certificate to preview the PDF."}
      />

      {/* Main certificate pair — digital badge + official MŠMT certificate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" style={{ maxWidth: 540, margin: "0 auto 2rem" }}>

        {/* Digital badge */}
        <motion.a
          href={MAIN_BADGE.verifyUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block rounded-xl border overflow-hidden transition-all duration-200"
          style={{ borderColor: "var(--b1)", background: "var(--s1)", textDecoration: "none" }}
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
          <div className="px-4 pt-4 pb-1 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAIN_BADGE.image}
              alt={lang === "cz" ? MAIN_BADGE.titleCz : MAIN_BADGE.titleEn}
              style={{ width: "100%", maxWidth: 190, height: "auto", display: "block" }}
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 flex-wrap">
            <div className="min-w-0">
              <p className="font-mono font-bold leading-snug" style={{ fontSize: ".78rem", color: "var(--txt)", letterSpacing: "-.01em" }}>
                {lang === "cz" ? MAIN_BADGE.titleCz : MAIN_BADGE.titleEn}
              </p>
              <p className="font-mono mt-0.5" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".04em" }}>
                {lang === "cz" ? MAIN_BADGE.categoryCz : MAIN_BADGE.categoryEn}
                {" · "}{lang === "cz" ? MAIN_BADGE.dateCz : MAIN_BADGE.dateEn}
              </p>
              <p className="font-mono mt-1" style={{ fontSize: ".55rem", letterSpacing: ".02em", wordBreak: "break-all" }}>
                <span style={{ color: "var(--dim)" }}>ID: </span>
                <span style={{ color: "var(--cyan)" }}>{MAIN_BADGE.certId}</span>
              </p>
            </div>
            <span className="font-mono" style={{ fontSize: ".55rem", padding: "2px 8px", borderRadius: 3, border: "1px solid rgba(74,222,128,.3)", color: "var(--green)", background: "rgba(74,222,128,.06)", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
              {verifyLabel}
            </span>
          </div>
        </motion.a>

        {/* Official MŠMT certificate */}
        <motion.button
          type="button"
          onClick={() => setOfficialCertOpen(true)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-left w-full rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer"
          style={{ borderColor: "rgba(34,211,238,.25)", background: "rgba(34,211,238,.04)" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(34,211,238,.5)";
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 8px 24px rgba(34,211,238,.08)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(34,211,238,.25)";
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Certificate page preview */}
          <div className="relative" style={{ background: "rgba(255,255,255,.04)", borderBottom: "1px solid var(--b0)", padding: "10px 10px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={OFFICIAL_CERT.preview1}
              alt={lang === "cz" ? OFFICIAL_CERT.titleCz : OFFICIAL_CERT.titleEn}
              loading="lazy"
              style={{ width: "100%", maxHeight: 180, objectFit: "cover", objectPosition: "top center", display: "block", borderRadius: "4px 4px 0 0", boxShadow: "0 4px 16px rgba(0,0,0,.4)" }}
            />
          </div>
          <div className="px-4 py-3">
            <p className="font-mono font-bold leading-snug" style={{ fontSize: ".78rem", color: "var(--txt)", letterSpacing: "-.01em" }}>
              {lang === "cz" ? OFFICIAL_CERT.titleCz : OFFICIAL_CERT.titleEn}
            </p>
            <p className="font-mono mt-0.5" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".04em", lineHeight: 1.5 }}>
              {lang === "cz" ? OFFICIAL_CERT.categoryCz : OFFICIAL_CERT.categoryEn}
            </p>
            <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
              <span className="font-mono" style={{ fontSize: ".55rem", padding: "2px 8px", borderRadius: 3, border: "1px solid rgba(34,211,238,.3)", color: "var(--cyan)", background: "rgba(34,211,238,.06)", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
                {lang === "cz" ? "↗ zobrazit osvědčení" : "↗ view certificate"}
              </span>
              <span className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", whiteSpace: "nowrap" }}>
                {lang === "cz" ? OFFICIAL_CERT.dateCz : OFFICIAL_CERT.dateEn}
              </span>
            </div>
          </div>
        </motion.button>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))" }}
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
              className="text-left w-full rounded-xl border overflow-hidden transition-all duration-200"
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
              {/* Certificate preview */}
              <div
                className="relative"
                style={{
                  background: "rgba(255,255,255,.04)",
                  borderBottom: "1px solid var(--b0)",
                  padding: "10px 10px 0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/certificates/preview/${cert.file.replace(".pdf", ".jpg")}`}
                  alt={title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px 4px 0 0",
                    boxShadow: "0 4px 16px rgba(0,0,0,.4)",
                  }}
                />
              </div>

              <div className="p-4">
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
              <div className="flex items-center justify-between gap-2">
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
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ {label}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: ".6rem", color: "var(--dim)", whiteSpace: "nowrap" }}
                >
                  {date}
                </span>
              </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Official MŠMT certificate modal */}
      <AnimatePresence>
        {officialCertOpen && (
          <motion.div
            key="official-cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ background: "rgba(2,2,10,.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setOfficialCertOpen(false)}
          >
            <motion.div
              key="official-cert-panel"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full rounded-xl overflow-hidden flex flex-col"
              style={{ maxWidth: 980, height: "calc(100dvh - 24px)", maxHeight: "calc(100dvh - 24px)", background: "rgba(6,6,20,.98)", border: "1px solid rgba(34,211,238,.25)", boxShadow: "0 32px 80px rgba(0,0,0,.7)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ height: 40, borderBottom: "1px solid var(--b0)", background: "rgba(255,255,255,.03)" }}>
                <button type="button" onClick={() => setOfficialCertOpen(false)} aria-label="Close" className="w-3 h-3 rounded-full transition-opacity duration-150 hover:opacity-80" style={{ background: "#ff5f57", flexShrink: 0 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e", flexShrink: 0 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840", flexShrink: 0 }} />
                <span className="font-mono flex-1 text-center truncate" style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".04em", minWidth: 0 }}>
                  {lang === "cz" ? OFFICIAL_CERT.titleCz : OFFICIAL_CERT.titleEn}
                </span>
                <a
                  href={`/certificates/${OFFICIAL_CERT.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono transition-colors duration-150"
                  style={{ fontSize: ".6rem", color: "var(--cyan)", letterSpacing: ".04em", textDecoration: "none", flexShrink: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#67e8f9")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
                >
                  <span className="hidden sm:inline">{lang === "cz" ? "↗ stáhnout PDF" : "↗ download PDF"}</span>
                  <span className="sm:hidden">↗</span>
                </a>
              </div>
              {/* Pages */}
              <div className="min-h-0 flex-1 overflow-auto p-2 sm:p-4 flex flex-col items-center gap-4" style={{ background: "rgba(255,255,255,.04)", overscrollBehavior: "contain" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={OFFICIAL_CERT.preview1} alt={`${lang === "cz" ? OFFICIAL_CERT.titleCz : OFFICIAL_CERT.titleEn} – strana 1`} style={{ width: "100%", maxWidth: 920, height: "auto", borderRadius: 6, boxShadow: "0 8px 40px rgba(0,0,0,.5)", display: "block" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={OFFICIAL_CERT.preview2} alt={`${lang === "cz" ? OFFICIAL_CERT.titleCz : OFFICIAL_CERT.titleEn} – strana 2`} style={{ width: "100%", maxWidth: 920, height: "auto", borderRadius: 6, boxShadow: "0 8px 40px rgba(0,0,0,.5)", display: "block" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
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
                height: "calc(100dvh - 24px)",
                maxHeight: "calc(100dvh - 24px)",
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
                  className="font-mono flex-1 text-center truncate"
                  style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".04em", minWidth: 0 }}
                >
                  {lang === "cz" ? active.titleCz : active.titleEn}
                </span>

                {/* Přejít na kurz — skryto na mobilu */}
                <a
                  href={active.courseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono transition-colors duration-150 hidden sm:block"
                  style={{ fontSize: ".6rem", color: "var(--green)", letterSpacing: ".04em", textDecoration: "none", flexShrink: 0 }}
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
                  style={{ fontSize: ".6rem", color: "var(--cyan)", letterSpacing: ".04em", textDecoration: "none", flexShrink: 0 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#67e8f9")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
                >
                  <span className="hidden sm:inline">{openLabel}</span>
                  <span className="sm:hidden">↗</span>
                </a>
              </div>

              {/* Certificate image */}
              <div className="min-h-0 flex-1 overflow-auto p-2 sm:p-4 flex justify-center" style={{ background: "rgba(255,255,255,.04)", overscrollBehavior: "contain" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/certificates/preview/${active.file.replace(".pdf", ".jpg")}`}
                  alt={lang === "cz" ? active.titleCz : active.titleEn}
                  style={{ width: "100%", maxWidth: 820, height: "auto", alignSelf: "flex-start", borderRadius: 6, boxShadow: "0 8px 40px rgba(0,0,0,.5)", display: "block" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
