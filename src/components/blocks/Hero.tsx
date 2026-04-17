"use client";
import { useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Marquee from "../Marquee";

export default function Hero({ blok }: { blok: any }) {
  const [counter, setCounter] = useState({ slices: 0, orders: 0, uptime: 0 });
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      const ease = 1 - Math.pow(1 - t, 3);
      setCounter({
        slices: Math.floor(ease * 12847),
        orders: Math.floor(ease * 412),
        uptime: Math.round(ease * 9997) / 100,
      });
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const headline = blok.headline || "Enterprise-grade\nslice infrastructure.";
  const lines = headline.split("\n");

  return (
    <>
      <section {...storyblokEditable(blok)} id="home" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
        }} />
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(20,40,80,0.25) 0%, transparent 70%)",
        }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          {/* Chip */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span className="chip">
              <span className="dot" style={{ color: "var(--ok)", background: "currentColor" }} />
              <span>{blok.eyebrow || "SLCE 4.2 — now with AI-assisted crust"}</span>
              <span style={{ color: "var(--fg-muted)" }}>→</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ textAlign: "center", margin: "0 0 20px" }}>
            {lines.map((line: string, i: number) => (
              <span key={i} style={{
                display: "block",
                fontSize: "clamp(48px, 8vw, 82px)",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 1.0,
                ...(i === 0
                  ? { color: "#fff" }
                  : {
                    color: "transparent",
                    backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.12))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }),
              }}>
                {line}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="mono" style={{
            textAlign: "center", fontSize: 13, color: "var(--fg-dim)", lineHeight: 1.7,
            maxWidth: 500, margin: "0 auto 36px", whiteSpace: "pre-line",
          }}>
            {blok.subheadline || "Thin crust. Wood-fired. Six rotations daily.\n99.97% crust uptime. SOC 2 Type II dough. Ship slices, not excuses."}
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 56 }}>
            <a href={blok.primary_button_link || "#slices"} className="btn btn-primary">
              <span>{blok.primary_button_text || "$ slce order"}</span>
              <span style={{ opacity: 0.5 }}>↵</span>
            </a>
            <a href={blok.secondary_button_link || "#pricing"} className="btn">
              {blok.secondary_button_text || "view pricing"}
            </a>
          </div>

          {/* Metrics row */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 64, paddingTop: 36,
            borderTop: "1px solid var(--line)",
          }}>
            {[
              { k: "slices.shipped", v: counter.slices.toLocaleString(), sub: "lifetime" },
              { k: "orders.active", v: String(counter.orders), sub: "past 60 min" },
              { k: "crust.uptime", v: counter.uptime.toFixed(2) + "%", sub: "trailing 90d" },
              { k: "bake.p99", v: "92s", sub: "target: 90s" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.k}</span>
                <span className="mono" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>{m.v}</span>
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)" }}>{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
}
