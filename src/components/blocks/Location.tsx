import { storyblokEditable } from "@storyblok/react/rsc";

function generateBars() {
  // Generate 60 status bars (past 60 days)
  return Array.from({ length: 60 }, () => {
    const r = Math.random();
    return r > 0.97 ? "var(--err)" : r > 0.93 ? "var(--warn)" : "var(--ok)";
  });
}

export default function Location({ blok }: { blok: any }) {
  const isOpen = blok.is_open !== false;
  const bars = generateBars();
  const uptime = (100 - (bars.filter(b => b !== "var(--ok)").length / 60 * 100)).toFixed(2);

  return (
    <div {...storyblokEditable(blok)} style={{
      padding: "20px 24px", borderBottom: "1px solid var(--line)",
      display: "flex", alignItems: "center", gap: 20,
    }}>
      {/* Name + status */}
      <div style={{ minWidth: 140 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span className="dot" style={{
            color: isOpen ? "var(--ok)" : "var(--err)",
            background: "currentColor",
          }} />
          <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
            {blok.city || "Region"}
          </span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)" }}>
          {blok.address || ""}
        </span>
      </div>

      {/* Uptime bars */}
      <div style={{ flex: 1, display: "flex", gap: 2, alignItems: "center", height: 28 }}>
        {bars.map((color, i) => (
          <div key={i} style={{
            flex: 1, height: "100%", borderRadius: 2,
            background: color, opacity: 0.7,
          }} />
        ))}
      </div>

      {/* Uptime % */}
      <span className="mono" style={{ fontSize: 12, color: "var(--fg-dim)", minWidth: 60, textAlign: "right" }}>
        {uptime}%
      </span>

      {/* Hours + status */}
      <div style={{ minWidth: 100, textAlign: "right" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--fg-dim)" }}>{blok.hours || ""}</div>
        <div className="mono" style={{ fontSize: 10, color: isOpen ? "var(--ok)" : "var(--fg-muted)" }}>
          {blok.status_text || (isOpen ? "operational" : "offline")}
        </div>
      </div>
    </div>
  );
}
