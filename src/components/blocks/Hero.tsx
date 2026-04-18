"use client";
import { useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Marquee from "../Marquee";

export default function Hero({ blok }: { blok: any }) {
  const [animated, setAnimated] = useState(false);
  const [counter, setCounter] = useState({ slices: 0, orders: 0, uptime: 0 });

  useEffect(() => {
    if (blok.stats && blok.stats.length > 0) { setAnimated(true); return; }
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
      else setAnimated(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [blok.stats]);

  const headline = blok.headline || "Enterprise-grade\nslice infrastructure.";
  const lines = headline.split("\n");

  const hasStoryblokStats = blok.stats && blok.stats.length > 0;

  const defaultStats = [
    { key: "slices.shipped", value: counter.slices.toLocaleString(), subtitle: "lifetime" },
    { key: "orders.active", value: String(counter.orders), subtitle: "past 60 min" },
    { key: "crust.uptime", value: counter.uptime.toFixed(2) + "%", subtitle: "trailing 90d" },
    { key: "bake.p99", value: "92s", subtitle: "target: 90s" },
  ];

  return (
    <>
      <section {...storyblokEditable(blok)} id="home" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(20,40,80,0.25) 0%, transparent 70%)",
        }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span className="chip">
              <span className="dot" style={{ color: "var(--ok)", background: "currentColor" }} />
              <span>{blok.eyebrow || "SLCE 4.2 — now with AI-assisted crust"}</span>
              <span style={{ color: "var(--fg-muted)" }}>→</span>
            </span>
          </div>

          <h1 style={{ textAlign: "center", margin: "0 0 20px" }}>
            {lines.map((line: string, i: number) => (
              <span key={i} style={{
                display: "block",
                fontSize: "clamp(48px, 8vw, 82px)",
                fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.0,
                ...(i === 0 ? { color: "#fff" } : {
                  color: "transparent",
                  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.12))",
                  WebkitBackgroundClip: "text", backgroundClip: "text",
                }),
              }}>{line}</span>
            ))}
          </h1>

          <p className="mono" style={{
            textAlign: "center", fontSize: 13, color: "var(--fg-dim)", lineHeight: 1.7,
            maxWidth: 500, margin: "0 auto 36px", whiteSpace: "pre-line",
          }}>
            {blok.subheadline || "Thin crust. Wood-fired. Six rotations daily.\n99.97% crust uptime. SOC 2 Type II dough. Ship slices, not excuses."}
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 56 }}>
            <a href={blok.primary_button_link || "#slices"} className="btn btn-primary">
              <span>{blok.primary_button_text || "$ slce order"}</span>
              <span style={{ opacity: 0.5 }}>↵</span>
            </a>
            <a href={blok.secondary_button_link || "#pricing"} className="btn">
              {blok.secondary_button_text || "view pricing"}
            </a>
          </div>

          <div style={{
            display: "flex", justifyContent: "center", gap: 64, paddingTop: 36,
            borderTop: "1px solid var(--line)",
          }}>
            {hasStoryblokStats
              ? blok.stats.map((stat: any) => (
                <StoryblokComponent blok={stat} key={stat._uid} />
              ))
              : defaultStats.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.key}</span>
                  <span className="mono" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>{m.value}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)" }}>{m.subtitle}</span>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <Marquee items={blok.marquee_items} />
    </>
  );
}