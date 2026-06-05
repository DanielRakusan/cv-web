import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daniel Rakušan — Junior Python Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AVATAR_URL = "https://github.com/DanielRakusan.png?size=400";

// Statické hvězdy — deterministické pozice, různé velikosti a průhlednosti
const STARS = [
  { x: 3,   y: 8,   r: 1.5, o: 0.55 }, { x: 11,  y: 32,  r: 1,   o: 0.35 },
  { x: 19,  y: 61,  r: 2,   o: 0.45 }, { x: 7,   y: 85,  r: 1,   o: 0.3  },
  { x: 28,  y: 14,  r: 1.5, o: 0.5  }, { x: 35,  y: 72,  r: 1,   o: 0.4  },
  { x: 42,  y: 41,  r: 2,   o: 0.35 }, { x: 51,  y: 91,  r: 1.5, o: 0.5  },
  { x: 58,  y: 22,  r: 1,   o: 0.4  }, { x: 63,  y: 55,  r: 2,   o: 0.3  },
  { x: 69,  y: 78,  r: 1,   o: 0.45 }, { x: 74,  y: 10,  r: 1.5, o: 0.55 },
  { x: 79,  y: 38,  r: 1,   o: 0.35 }, { x: 84,  y: 67,  r: 2,   o: 0.4  },
  { x: 89,  y: 18,  r: 1,   o: 0.3  }, { x: 93,  y: 82,  r: 1.5, o: 0.5  },
  { x: 96,  y: 47,  r: 1,   o: 0.45 }, { x: 2,   y: 52,  r: 1,   o: 0.4  },
  { x: 16,  y: 95,  r: 1.5, o: 0.35 }, { x: 46,  y: 6,   r: 1,   o: 0.55 },
  { x: 72,  y: 96,  r: 2,   o: 0.3  }, { x: 88,  y: 4,   r: 1,   o: 0.5  },
  { x: 55,  y: 88,  r: 1.5, o: 0.4  }, { x: 31,  y: 48,  r: 1,   o: 0.35 },
  { x: 66,  y: 33,  r: 2,   o: 0.45 }, { x: 48,  y: 75,  r: 1,   o: 0.3  },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#02020a",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "0 80px",
        }}
      >
        {/* Grid overlay — viditelnější */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Statické hvězdy */}
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: "#fff",
              opacity: s.o,
            }}
          />
        ))}

        {/* Vertikální cyan accent čára — levý kraj */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 3,
            height: "100%",
            background: "linear-gradient(to bottom, transparent, #22d3ee 30%, #22d3ee 70%, transparent)",
            opacity: 0.6,
          }}
        />

        {/* Ambient glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -60,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,.12) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -60,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,.11) 0%, transparent 70%)",
          }}
        />

        {/* ── LEFT: Avatar ── */}
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            marginRight: 72,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Cyan corner frame — top-left */}
          <div
            style={{
              position: "absolute",
              top: -6,
              left: -6,
              width: 26,
              height: 26,
              borderTop: "2.5px solid #22d3ee",
              borderLeft: "2.5px solid #22d3ee",
            }}
          />
          {/* Cyan corner frame — bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              right: -6,
              width: 26,
              height: 26,
              borderBottom: "2.5px solid #22d3ee",
              borderRight: "2.5px solid #22d3ee",
            }}
          />

          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AVATAR_URL}
            width={270}
            height={270}
            style={{ borderRadius: 12, display: "block", objectFit: "cover" }}
          />
        </div>

        {/* ── RIGHT: Text ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              fontSize: 15,
              color: "#4ade80",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "monospace",
            }}
          >
            Praha · Python Backend · IT background
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: "1",
              marginBottom: 14,
            }}
          >
            Daniel&nbsp;
            <span style={{ color: "#22d3ee" }}>Rakušan</span>
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#475569",
              letterSpacing: "0.05em",
              fontFamily: "monospace",
              marginBottom: 24,
            }}
          >
            junior · python · backend · developer
          </div>

          {/* Tech pills */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 28,
            }}
          >
            {["Python", "Django", "SQLite", "Git", "JavaScript"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 14,
                  padding: "5px 14px",
                  border: "1px solid rgba(34,211,238,.28)",
                  borderRadius: 4,
                  color: "#22d3ee",
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                  background: "rgba(34,211,238,.04)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Availability badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 18px",
                background: "rgba(74,222,128,.08)",
                border: "1px solid rgba(74,222,128,.3)",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: "#4ade80",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                }}
              >
                Ihned k dispozici
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 18px",
                background: "rgba(34,211,238,.05)",
                border: "1px solid rgba(34,211,238,.18)",
                borderRadius: 20,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                }}
              >
                Praha · remote
              </span>
            </div>
          </div>

          {/* Divider + URL */}
          <div
            style={{
              display: "flex",
              width: 320,
              height: 1,
              background: "rgba(255,255,255,.10)",
              marginBottom: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 16,
              color: "#475569",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
            }}
          >
            danielrakusan.cz
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
