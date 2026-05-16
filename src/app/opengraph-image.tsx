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
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,.09) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,.07) 0%, transparent 70%)",
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
              top: -4,
              left: -4,
              width: 22,
              height: 22,
              borderTop: "2.5px solid #22d3ee",
              borderLeft: "2.5px solid #22d3ee",
            }}
          />
          {/* Cyan corner frame — bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              width: 22,
              height: 22,
              borderBottom: "2.5px solid #22d3ee",
              borderRight: "2.5px solid #22d3ee",
            }}
          />

          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AVATAR_URL}
            width={220}
            height={220}
            style={{ borderRadius: 10, display: "block", objectFit: "cover" }}
          />
        </div>

        {/* ── RIGHT: Text ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              fontSize: 17,
              color: "#4ade80",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 22,
              fontFamily: "monospace",
            }}
          >
            Praha · Python Backend · IT background
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: "1",
              marginBottom: 18,
            }}
          >
            Daniel&nbsp;
            <span style={{ color: "#22d3ee" }}>Rakušan</span>
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#475569",
              letterSpacing: "0.05em",
              fontFamily: "monospace",
              marginBottom: 32,
            }}
          >
            junior · python · backend · developer
          </div>

          {/* Tech pills */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 40,
            }}
          >
            {["Python", "Django", "SQLite", "Git", "JavaScript"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 15,
                  padding: "6px 16px",
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

          {/* Divider + URL */}
          <div
            style={{
              display: "flex",
              width: 280,
              height: 1,
              background: "rgba(255,255,255,.07)",
              marginBottom: 22,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#334155",
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
