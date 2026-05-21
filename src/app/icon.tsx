import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

// Favicon PNG — Google toto formátu preferuje před SVG
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          background: "#02020a",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            width: 36,
            height: 32,
            background: "#0d1117",
            borderRadius: 6,
            border: "1px solid rgba(74,222,128,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: 9,
              background: "rgba(74,222,128,0.08)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 4,
              gap: 2.5,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "rgba(255,95,87,0.8)" }} />
            <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "rgba(255,189,46,0.8)" }} />
            <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: "rgba(74,222,128,0.8)" }} />
          </div>
          {/* Content: › _ */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              paddingLeft: 4,
              gap: 3,
            }}
          >
            {/* ▶ prompt */}
            <span style={{ color: "#4ade80", fontSize: 10, lineHeight: 1 }}>▶</span>
            {/* _ cursor */}
            <div style={{ width: 8, height: 3, background: "#22d3ee", borderRadius: 1 }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
