import type { NextConfig } from "next";

// Dynamicky přidej Render origin do frame-ancestors, pokud se liší od vlastní domény.
// Funguje jak v produkci (api.danielrakusan.cz), tak přes raw Render URL (*.onrender.com).
const ADMIN_DOMAIN = "https://api.danielrakusan.cz";

const extraFrameOrigin = (() => {
  const url = process.env.NEXT_PUBLIC_RENDER_API_URL ?? "";
  if (!url) return "";
  try {
    const origin = new URL(url).origin;
    return origin !== ADMIN_DOMAIN ? ` ${origin}` : "";
  } catch {
    return "";
  }
})();

const securityHeaders = [
  // frame-ancestors: povoluje vložit tento web jako iframe POUZE z vlastní domény
  // a z admin panelu na backendu (api.danielrakusan.cz nebo raw Render URL).
  // frame-ancestors má v moderních prohlížečích přednost před X-Frame-Options.
  {
    key: "Content-Security-Policy",
    value: `frame-ancestors 'self' ${ADMIN_DOMAIN}${extraFrameOrigin}`,
  },
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
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
