import { ImageResponse } from "next/og";

export const alt = "Alpha Locksmith & Garage: Portland locksmith and garage door repair, open 24/7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#151515",
          color: "#f4f4f2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#ff6700", fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#ff6700" }} />
          OPEN 24/7 · LICENSED CCB#248737
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, textTransform: "uppercase" }}>
            Portland locksmith &amp; garage door repair
          </div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#a8a8a3" }}>Alpha Locksmith &amp; Garage</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", background: "#ff6700", color: "#000000", fontSize: 54, fontWeight: 800, padding: "16px 36px", borderRadius: 14 }}>
            Call 503-505-8560
          </div>
        </div>
      </div>
    ),
    size,
  );
}
