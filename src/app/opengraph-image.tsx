import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daniel Rakušan — Junior Python Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AVATAR_URL = "https://github.com/DanielRakusan.png?size=400";

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
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
            background: "radial-gradient(circle, rgba(34,211,238,.10) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,.09) 0%, transparent 70%)",
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

          {/* Availability badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
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
                gap: 8,
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
              background: "rgba(255,255,255,.08)",
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
