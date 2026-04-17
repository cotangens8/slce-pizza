"use client";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import PizzaGlyph from "../PizzaGlyph";
import { useCart } from "../CartContext";

const qtyBtnStyle: React.CSSProperties = {
  width: 32, height: 32, border: "none", background: "rgba(255,255,255,0.04)",
  color: "#fff", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 14,
};

export default function SliceCard({ blok }: { blok: any }) {
  const [hovered, setHovered] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  const sliceId = blok.name ? `slce.${blok.name.toLowerCase().replace(/\s+/g, "-")}` : blok._uid;
  const count = cart[sliceId] || 0;
  const price = parseFloat(blok.price) || 0;
  const variant = blok.toppings || blok.variant || "basic";
  const version = blok.tag === "LTS" ? "1.0.12" : blok.tag === "SPICY" ? "2.3.0" : blok.tag === "PRO" ? "3.1.0-rc" : "4.2.0";
  const badge = blok.tag || "STABLE";
  const badgeColor = badge === "SPICY" ? "var(--err)" : badge === "ENTERPRISE" || badge === "Premium" ? "var(--warn)" : undefined;

  // Build specs from description or defaults
  const specs = [
    { k: "toppings", v: variant === "enterprise" ? "premium" : variant === "pro" ? "mixed" : "classic" },
    { k: "heat", v: "900°F" },
    { k: "bake", v: "92s" },
    { k: "calories", v: `${Math.round(price * 60 + 40)}kcal` },
  ];

  const handleAdd = () => {
    addToCart({ id: sliceId, name: blok.name || "Slice", price, variant, version });
  };

  return (
    <div
      {...storyblokEditable(blok)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 14,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "var(--line)"}`,
        background: hovered ? "rgba(16,18,22,0.9)" : "rgba(10,12,16,0.72)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        padding: 22,
        transition: "all 320ms cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px -24px rgba(0,0,0,0.8)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          // {sliceId}
        </span>
        <span className="mono" style={{
          fontSize: 10, color: badgeColor || "var(--fg-muted)",
          padding: "2px 6px", borderRadius: 4,
          border: `1px solid ${badgeColor ? "currentColor" : "var(--line)"}`,
          letterSpacing: "0.06em",
        }}>{badge}</span>
      </div>

      {/* Pizza glyph */}
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 8px" }}>
        <PizzaGlyph variant={variant} size={140} rotating={hovered} />
      </div>

      {/* Name + version */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>{blok.name || "Slice"}</h3>
        <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>v{version}</span>
      </div>

      {/* Tagline */}
      <p className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", lineHeight: 1.65, margin: "0 0 16px", minHeight: 38 }}>
        {blok.description || ""}
      </p>

      {/* Specs grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
        border: "1px solid var(--line)", borderRadius: 8, marginBottom: 16,
      }}>
        {specs.map((s, i) => (
          <div key={i} style={{
            padding: "8px 10px",
            borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
            borderBottom: i < 2 ? "1px solid var(--line)" : "none",
          }}>
            <div className="mono" style={{ fontSize: 9, color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.k}</div>
            <div className="mono" style={{ fontSize: 12, color: "#fff" }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Price + Add */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>
          €{price.toFixed(2)}
          <span style={{ color: "var(--fg-muted)", fontWeight: 400, fontSize: 11, marginLeft: 4 }}>/slice</span>
        </span>
        {count > 0 ? (
          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line-strong)", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => removeFromCart(sliceId)} style={qtyBtnStyle}>−</button>
            <span className="mono" style={{ minWidth: 28, textAlign: "center", fontSize: 12, color: "#fff", padding: "0 4px" }}>{count}</span>
            <button onClick={handleAdd} style={qtyBtnStyle}>+</button>
          </div>
        ) : (
          <button onClick={handleAdd} className="btn" style={{ padding: "8px 14px" }}>
            <span>add</span><span style={{ opacity: 0.5 }}>+</span>
          </button>
        )}
      </div>
    </div>
  );
}
