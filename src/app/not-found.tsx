"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ── Animovaný had na canvasu ────────────────────────────────────── */
function SnakeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = canvas.width;
    const H = canvas.height;
    const CX = W / 2;
    const CY = H / 2;
    const RX = 185;   // vodorovný poloměr elipsy
    const RY = 75;    // svislý poloměr elipsy
    const N  = 30;    // počet článků těla
    const SPEED = 0.021;

    let angle = 0;
    let raf: number;

    // Inicializace článků těla
    const body: { x: number; y: number }[] = Array.from({ length: N }, (_, i) => ({
      x: CX + RX * Math.cos(-i * SPEED * 5),
      y: CY + RY * Math.sin(-i * SPEED * 5),
    }));

    function tick() {
      ctx.clearRect(0, 0, W, H);
      angle += SPEED;

      const hx = CX + RX * Math.cos(angle);
      const hy = CY + RY * Math.sin(angle);
      body.unshift({ x: hx, y: hy });
      body.pop();

      // Tělo (od ocasu ke krku)
      for (let i = N - 1; i >= 1; i--) {
        const t = 1 - i / N;
        const r = 3 + t * 7;
        ctx.beginPath();
        ctx.arc(body[i].x, body[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${0.12 + t * 0.72})`;
        ctx.fill();
      }

      // Hlava
      ctx.beginPath();
      ctx.arc(hx, hy, 13, 0, Math.PI * 2);
      ctx.fillStyle = "#4ade80";
      ctx.fill();

      // Oči
      const dx = hx - body[1].x;
      const dy = hy - body[1].y;
      const ha = Math.atan2(dy, dx);

      [-1, 1].forEach((side) => {
        const ex = hx + 5 * Math.cos(ha + side * 1.2);
        const ey = hy + 5 * Math.sin(ha + side * 1.2);
        ctx.beginPath();
        ctx.arc(ex, ey, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "#02020a";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex + 0.9, ey - 0.9, 0.9, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
      });

      // Jazyk (poblikává)
      if (Math.sin(angle * 4) > 0.55) {
        const tx = hx + 15 * Math.cos(ha);
        const ty = hy + 15 * Math.sin(ha);
        ctx.strokeStyle = "#f87171";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(hx + 11 * Math.cos(ha), hy + 11 * Math.sin(ha));
        ctx.lineTo(tx, ty);
        ctx.stroke();
        [-0.35, 0.35].forEach((fork) => {
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + 6 * Math.cos(ha + fork), ty + 6 * Math.sin(ha + fork));
          ctx.stroke();
        });
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      width={480}
      height={200}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Stránka 404 ─────────────────────────────────────────────────── */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#02020a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono, 'Fira Code', monospace)",
        color: "#4ade80",
        textAlign: "center",
        padding: "2rem",
        userSelect: "none",
      }}
    >
      {/* Had + číslo 404 */}
      <div
        style={{
          position: "relative",
          width: 480,
          height: 200,
          marginBottom: "2.5rem",
        }}
      >
        <SnakeCanvas />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "7.5rem",
            fontWeight: 700,
            lineHeight: 1,
            color: "#4ade80",
            textShadow: "0 0 60px rgba(74,222,128,0.25)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>
      </div>

      {/* Terminálová chybová hláška */}
      <p
        style={{
          fontSize: "0.9rem",
          marginBottom: "0.6rem",
          color: "rgba(74,222,128,0.75)",
        }}
      >
        <span style={{ color: "#f87171" }}>FileNotFoundError</span>
        {": tuhle stránku had spolknul."}
      </p>

      <p
        style={{
          color: "#475569",
          fontSize: "0.82rem",
          marginBottom: "2.8rem",
          maxWidth: "340px",
          lineHeight: 1.6,
        }}
      >
        Stránka neexistuje, ale had existuje.
        <br />
        Jdi a klikni se jinam.
      </p>

      <Link
        href="/"
        style={{
          padding: "0.65rem 1.6rem",
          border: "1px solid rgba(74,222,128,0.3)",
          borderRadius: "6px",
          color: "#4ade80",
          textDecoration: "none",
          fontSize: "0.85rem",
          background: "rgba(74,222,128,0.05)",
          letterSpacing: "0.02em",
          transition: "border-color 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(74,222,128,0.6)";
          (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(74,222,128,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(74,222,128,0.3)";
          (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(74,222,128,0.05)";
        }}
      >
        ← zpět na hlavní stránku
      </Link>
    </main>
  );
}
