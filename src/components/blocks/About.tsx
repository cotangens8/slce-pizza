import { storyblokEditable } from "@storyblok/react/rsc";
import PizzaGlyph from "../PizzaGlyph";

export default function About({ blok }: { blok: any }) {
  const stats = blok.stats || [
    { label: "hydration", value: "68%" },
    { label: "oven.temp", value: "900°F" },
    { label: "bake.p99", value: "92s" },
  ];

  return (
    <section {...storyblokEditable(blok)} id="docs" style={{ position: "relative", padding: "100px 0" }}>
      <div className="wrap">
        <div style={{
          borderRadius: 14, border: "1px solid var(--line)",
          background: "rgba(10,12,16,0.72)", backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 420,
        }}>
          <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {blok.eyebrow || "// documentation"}
            </div>
            <h2 style={{
              fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
              whiteSpace: "pre-line",
            }}>
              {blok.title || "One thing.\nDone right."}
            </h2>
            <p className="mono" style={{ fontSize: 12, color: "var(--fg-dim)", lineHeight: 1.8, marginBottom: 28 }}>
              {blok.body || "We don't do whole pies. We don't do delivery."}
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 0,
              border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden",
            }}>
              {stats.map((s: any, i: number) => (
                <div key={i} style={{
                  padding: "12px 14px", textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none",
                }}>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>{s.value}</div>
                  <div className="mono" style={{ fontSize: 9, color: "var(--fg-muted)", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            borderLeft: "1px solid var(--line)", position: "relative",
            background: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}>
            <PizzaGlyph variant={blok.showcase_pizza || "enterprise"} size={240} />
          </div>
        </div>
      </div>
    </section>
  );
}
