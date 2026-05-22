import type { NextConfig } from "next";

// ── Adresy admin panelu (backend), ze kterých smí být frontend vložen jako iframe ──
// Bezpečné: obě jsou naše vlastní servery — nikdo jiný na nich stránky nevytvoří.
// Přidej sem každou adresu, přes kterou přistupuješ k /admin/frontend.
const ADMIN_FRAME_ORIGINS = [
  "https://api.danielrakusan.cz",        // vlastní doména na Render
  "https://cv-backend-92jb.onrender.com", // raw Render URL (fallback)
].join(" ");

const securityHeaders = [
  // frame-ancestors: říká prohlížeči, kdo smí vložit tento web do <iframe>.
  // 'self' = danielrakusan.cz sama (pro případné vlastní embedding),
  // + admin panel na backendu.
  // frame-ancestors má v moderních prohlížečích přednost před X-Frame-Options.
  {
    key: "Content-Security-Policy",
    value: `frame-ancestors 'self' ${ADMIN_FRAME_ORIGINS}`,
  },
  { key: "X-Content-Type-Options",     value: "nosniff" },
  { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security",  value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
