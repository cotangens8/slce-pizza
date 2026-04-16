"use client";

import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { cart, setDrawerOpen } = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const total = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>▲</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>SLCE</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontWeight: 500, letterSpacing: "0.1em", marginLeft: 4 }}>PIZZA</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {["Menu", "About", "Locations"].map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`} style={{
            fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s",
          }}>
            {s}
          </a>
        ))}
        <button onClick={() => setDrawerOpen(true)} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
          background: total > 0 ? "#fff" : "transparent",
          color: total > 0 ? "#000" : "rgba(255,255,255,0.6)",
          fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s", fontFamily: "inherit",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
          </svg>
          {total > 0 && total}
        </button>
      </div>
    </nav>
  );
}
