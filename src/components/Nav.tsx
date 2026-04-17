"use client";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { cart, setDrawerOpen } = useCart();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h); h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px",
      background: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
      backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background 240ms ease, border-color 240ms ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 22, height: 22, display: "grid", placeItems: "center",
          border: "1px solid var(--line-strong)", borderRadius: 5, background: "rgba(255,255,255,0.04)",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1 L9 9 L1 9 Z" fill="#fff" /></svg>
        </div>
        <span className="mono" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>
          slce<span style={{ color: "var(--fg-muted)" }}>/pizza</span>
        </span>
        <span className="mono" style={{
          fontSize: 10, color: "var(--fg-muted)", padding: "2px 6px",
          border: "1px solid var(--line)", borderRadius: 4, letterSpacing: "0.04em",
        }}>v4.2.0</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {["Slices", "Pricing", "Changelog", "Status", "Docs"].map(label => (
          <a key={label} href={`#${label.toLowerCase()}`} className="mono" style={{
            padding: "6px 10px", fontSize: 12, color: "var(--fg-dim)",
            borderRadius: 6, transition: "color 160ms, background 160ms",
          }}>{label}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="mono" style={{
          display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--fg-dim)",
          padding: "5px 10px", borderRadius: 999, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)",
        }}>
          <span className="dot" style={{ color: "var(--ok)", background: "currentColor" }} />
          all systems operational
        </span>
        <button className="btn" onClick={() => setDrawerOpen(true)} id="cart-btn" style={{ gap: 8 }}>
          <span>cart</span>
          <span className="mono" style={{
            minWidth: 20, padding: "0 5px", borderRadius: 4, fontSize: 11,
            background: cartCount > 0 ? "#fff" : "rgba(255,255,255,0.06)",
            color: cartCount > 0 ? "#000" : "var(--fg-dim)", textAlign: "center",
            transition: "background 200ms, color 200ms",
          }}>{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
