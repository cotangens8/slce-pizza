

import { storyblokEditable } from "@storyblok/react/rsc";

export default function Location({ blok }: { blok: any }) {
  const isOpen = blok.is_open !== false;
  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        padding: 32, background: "#0a0a0a", minHeight: 180,
        display: "flex", flexDirection: "column",
      }}
    >
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 8 }}>
        {blok.city || "City"}
      </h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>
        {blok.address || ""}
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>
        {blok.hours || ""}
      </p>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: isOpen ? "#22c55e" : "rgba(255,255,255,0.2)",
        }} />
        <span style={{
          fontSize: 12, fontWeight: 500,
          color: isOpen ? "#22c55e" : "rgba(255,255,255,0.3)",
        }}>
          {blok.status_text || (isOpen ? "Open now" : "Closed")}
        </span>
      </div>
    </div>
  );
}
