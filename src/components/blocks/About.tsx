

import { storyblokEditable } from "@storyblok/react/rsc";
import PizzaSVG from "../PizzaSVG";

export default function About({ blok }: { blok: any }) {
  const stats = blok.stats || [
    { label: "Dough hydration", value: "68%" },
    { label: "Oven temp", value: "900°F" },
    { label: "Bake time", value: "90s" },
  ];

  return (
    <section
      {...storyblokEditable(blok)}
      id="about"
      style={{ position: "relative", padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div style={{
        borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 420,
      }}>
        <div style={{ padding: 56, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16,
          }}>
            {blok.eyebrow || "Our philosophy"}
          </span>
          <h2 style={{
            fontSize: 36, fontWeight: 800, color: "#fff",
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20,
            whiteSpace: "pre-line",
          }}>
            {blok.title || "One thing.\nDone right."}
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, marginBottom: 28 }}>
            {blok.body || "We don't do whole pies. We don't do delivery."}
          </p>
          <div style={{ display: "flex", gap: 32 }}>
            {stats.map((s: any, i: number) => (
              <div key={i}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.02)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <PizzaSVG toppings={blok.showcase_pizza || "margherita"} size={240} />
        </div>
      </div>
    </section>
  );
}
