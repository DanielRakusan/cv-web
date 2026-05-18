import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#02020a",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            width: 138,
            height: 122,
            background: "#0d1117",
            borderRadius: 20,
            border: "2px solid rgba(74,222,128,0.35)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Title bar with traffic lights */}
          <div
            style={{
              width: "100%",
              height: 30,
              background: "rgba(74,222,128,0.08)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,100,100,0.75)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,200,50,0.75)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(74,222,128,0.75)" }} />
          </div>
          {/* Body */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 14,
              paddingRight: 14,
              gap: 10,
            }}
          >
            {/* Prompt line: ▶ in green */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  color: "#4ade80",
                  fontSize: 26,
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
              >
                ▶
              </div>
            </div>
            {/* Cursor bar */}
            <div
              style={{
                width: 44,
                height: 9,
                background: "#22d3ee",
                borderRadius: 4,
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
