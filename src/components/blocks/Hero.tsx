

import { storyblokEditable } from "@storyblok/react/rsc";

export default function Hero({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      id="home"
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px", textAlign: "center", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)", borderRadius: "50%",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
          fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.03em", textTransform: "uppercase",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
          {blok.eyebrow || "Now serving"}
        </span>

        <h1 style={{
          fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 800, color: "#fff",
          lineHeight: 0.95, letterSpacing: "-0.05em", marginTop: 24, marginBottom: 20,
          whiteSpace: "pre-line",
        }}>
          {blok.headline || "Pizza by\nthe slice."}
        </h1>

        <p style={{
          fontSize: 17, color: "rgba(255,255,255,0.38)", lineHeight: 1.6,
          maxWidth: 420, margin: "0 auto 40px", fontWeight: 400,
          whiteSpace: "pre-line",
        }}>
          {blok.subheadline || "Thin crust. Wood-fired. Six rotations daily.\nNo whole pies. No compromises."}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a href={blok.primary_button_link || "#menu"} style={{
            padding: "13px 32px", borderRadius: 10, background: "#fff", color: "#000",
            fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}>
            {blok.primary_button_text || "View Menu"}
          </a>
          <a href={blok.secondary_button_link || "#about"} style={{
            padding: "13px 32px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)",
            fontSize: 14, fontWeight: 500, textDecoration: "none",
          }}>
            {blok.secondary_button_text || "Our Story"}
          </a>
        </div>

        <div style={{ marginTop: 72, display: "flex", justifyContent: "center", gap: 48 }}>
          {(blok.stats || [
            { number: "6", label: "Rotations daily" },
            { number: "48h", label: "Cold fermented" },
            { number: "900°", label: "Wood-fired" },
          ]).map((s: any, i: number) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>{s.number}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
