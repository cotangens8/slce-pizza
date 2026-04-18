"use client";

const DEFAULTS = [
  "DOUGH HYDRATION 68%", "WOOD-FIRED 900°F", "BAKE p99 92s", "COLD FERMENTED 48H",
  "SIX ROTATIONS / DAY", "SOC 2 TYPE II", "NO WHOLE PIES", "NO DELIVERY",
  "HANDMADE IN LINZ", "v4.2.0 STABLE",
];

export default function Marquee({ items }: { items?: string }) {
  const parsed = items
    ? items.split(",").map(s => s.trim()).filter(Boolean)
    : DEFAULTS;
  const row = parsed.concat(parsed);

  return (
    <div style={{
      borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
      overflow: "hidden", background: "rgba(0,0,0,0.45)", position: "relative", zIndex: 2,
    }}>
      <div className="marquee-track" style={{ display: "flex", whiteSpace: "nowrap", padding: "14px 0", width: "max-content" }}>
        {row.map((t, i) => (
          <span key={i} className="mono" style={{
            fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.14em",
            padding: "0 28px", borderRight: "1px solid var(--line)", display: "inline-block",
          }}>— {t}</span>
        ))}
      </div>
    </div>
  );
}