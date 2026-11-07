"use client";

import { useEffect, useRef } from "react";

// Jemná neuronová síť: vrstvy uzlů, každý propojený se sousední vrstvou.
// Chová se jako skutečná síť: občas náhodně "vystřelí" jeden neuron, signál se po spojích
// rozšíří k sousedům a postupně slábne. Když pohneš myší, vystřelí neuron u kurzoru a od něj
// se rozběhnou vlny kolem. Nic nejede v pevném směru. Při "reduced motion" je síť statická.

const CYAN = "34,211,238";

type N = {
  x: number; y: number; dx: number; dy: number; layer: number; ph: number;
  act: number; // aktuální aktivita 0..1 (doznívá)
  nb: { j: number; w: number }[]; // sousedé (vrstva vlevo i vpravo) a váha spoje 0..1
};
type Pulse = { a: number; b: number; p: number; power: number; hops: number };

export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    let nodes: N[] = [];
    let pulses: Pulse[] = [];
    let idleIn = 40;
    let lastFire = 0;
    const mouse = { x: -999, y: -999 };

    const build = () => {
      const sizes = W < 700 ? [3, 5, 5, 3] : W < 1100 ? [3, 6, 7, 6, 3] : [4, 6, 8, 8, 6, 4];
      const layers = sizes.length;
      const padX = W * 0.06, padY = H * 0.14;
      nodes = [];
      sizes.forEach((count, l) => {
        const x = padX + ((W - padX * 2) * l) / (layers - 1);
        for (let i = 0; i < count; i++) {
          const y = padY + ((H - padY * 2) * (i + 0.5)) / count;
          nodes.push({ x, y, dx: x, dy: y, layer: l, ph: Math.random() * 6.28, act: 0, nb: [] });
        }
      });
      // váha spoje je u obou konců stejná (některé spoje jsou výrazně silnější než jiné)
      const w: Record<string, number> = {};
      nodes.forEach((a, i) => nodes.forEach((b, j) => {
        if (Math.abs(a.layer - b.layer) !== 1) return;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        w[key] ??= Math.pow(Math.random(), 1.6);
        a.nb.push({ j, w: w[key] });
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      pulses = [];
    };

    // neuron vystřelí: rozsvítí se a pošle signál několika sousedům
    const fire = (i: number, power: number, hops: number) => {
      const n = nodes[i];
      n.act = Math.max(n.act, power);
      if (hops <= 0 || power < 0.2) return;
      const targets = [...n.nb].sort(() => Math.random() - 0.5).slice(0, 2 + ((Math.random() * 3) | 0));
      for (const t of targets) pulses.push({ a: i, b: t.j, p: 0, power: power * (0.6 + 0.3 * t.w), hops: hops - 1 });
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.dx = n.x + (reduce ? 0 : Math.sin(t / 3800 + n.ph) * 7);
        n.dy = n.y + (reduce ? 0 : Math.cos(t / 4300 + n.ph) * 7);
        n.act *= 0.955;
      }

      // klid: občas náhodný neuron vystřelí sám
      if (!reduce) {
        idleIn -= 1;
        if (idleIn <= 0) {
          fire((Math.random() * nodes.length) | 0, 0.75, 3);
          idleIn = 90 + Math.random() * 120;
        }
      }

      // spoje: základní tenká čára + zvýraznění u kurzoru
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const { j, w } of a.nb) {
          if (j < i) continue;
          const b = nodes[j];
          const m = Math.max(0, 1 - Math.hypot((a.dx + b.dx) / 2 - mouse.x, (a.dy + b.dy) / 2 - mouse.y) / 220);
          const act = Math.max(a.act, b.act);
          ctx.strokeStyle = `rgba(${CYAN},${0.025 + w * 0.085 + act * 0.1 * (0.4 + w) + m * 0.22 * (0.4 + w)})`;
          ctx.lineWidth = 0.4 + w * 0.7 + act * 0.4 + m * 0.4;
          ctx.beginPath(); ctx.moveTo(a.dx, a.dy); ctx.lineTo(b.dx, b.dy); ctx.stroke();
        }
      }

      // signály putující po spojích
      pulses = pulses.filter((k) => {
        k.p += 0.036;
        const a = nodes[k.a], b = nodes[k.b];
        if (k.p >= 1) {
          fire(k.b, k.power, k.hops);
          return false;
        }
        const x = a.dx + (b.dx - a.dx) * k.p, y = a.dy + (b.dy - a.dy) * k.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, `rgba(${CYAN},${0.55 * k.power})`);
        g.addColorStop(1, `rgba(${CYAN},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fill();
        return true;
      });

      for (const n of nodes) {
        const m = Math.max(0, 1 - Math.hypot(n.dx - mouse.x, n.dy - mouse.y) / 170);
        const lit = Math.max(n.act, m * 0.6);
        const alpha = Math.min(1, 0.2 + 0.07 * Math.sin(t / 1500 + n.ph) + lit * 0.5);
        ctx.fillStyle = `rgba(${CYAN},${alpha})`;
        ctx.beginPath(); ctx.arc(n.dx, n.dy, 2.2 + lit * 1.2, 0, 6.283); ctx.fill();
        ctx.strokeStyle = `rgba(${CYAN},${alpha * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.arc(n.dx, n.dy, 5 + lit * 3, 0, 6.283); ctx.stroke();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    // pohyb myši vyvolá výstřel nejbližšího neuronu (nejvýš cca 4x za sekundu)
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (reduce) return;
      const now = performance.now();
      if (now - lastFire < 380) return;
      let best = -1, bd = 150;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.dx - mouse.x, n.dy - mouse.y);
        if (d < bd) { bd = d; best = i; }
      });
      if (best >= 0) { lastFire = now; fire(best, 0.9, 4); }
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      // uprostřed (pod textem) je síť slabší, výraznější je u okrajů
      style={{
        WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 55% 50%, rgba(0,0,0,.4) 0%, #000 100%)",
        maskImage: "radial-gradient(ellipse 55% 60% at 55% 50%, rgba(0,0,0,.4) 0%, #000 100%)",
      }}
    />
  );
}
