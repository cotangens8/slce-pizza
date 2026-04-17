"use client";
import { useState, useMemo } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import SliceCard from "./Slice";

export default function Menu({ blok }: { blok: any }) {
  const [filter, setFilter] = useState("all");
  const slices = blok.slices || [];
  const filtered = useMemo(() => {
    if (filter === "all") return slices;
    return slices.filter((s: any) => (s.variant || s.toppings || "basic") === filter);
  }, [filter, slices]);

  return (
    <section {...storyblokEditable(blok)} id="slices" style={{ position: "relative", padding: "120px 0 40px" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "rgba(0,0,0,0.28)", backdropFilter: "blur(4px) saturate(110%)",
        maskImage: "linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)",
      }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="eyebrow">02 / slice.catalog</div>
            <h2 style={{ margin: "10px 0 6px", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {blok.title || "Today's catalog."}
            </h2>
            <p className="mono" style={{ fontSize: 12, color: "var(--fg-muted)", maxWidth: 440, margin: 0 }}>
              {blok.description || "Six active builds. Deprecated after sell-out. No rollbacks."}
            </p>
          </div>

          <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, border: "1px solid var(--line)", background: "rgba(0,0,0,0.4)" }}>
            {["all", "basic", "pro", "enterprise"].map(val => (
              <button key={val} onClick={() => setFilter(val)} className="mono" style={{
                padding: "6px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                background: filter === val ? "#fff" : "transparent",
                color: filter === val ? "#000" : "var(--fg-dim)",
                fontSize: 11, letterSpacing: "0.02em", transition: "all 160ms",
              }}>{val}</button>
            ))}
          </div>
        </div>

        <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {filtered.map((nestedBlok: any) => (
            <SliceCard blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
