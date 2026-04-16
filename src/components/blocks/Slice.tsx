"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import PizzaSVG from "../PizzaSVG";
import { useCart } from "../CartContext";

export default function Slice({ blok }: { blok: any }) {
  const [hovered, setHovered] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  const sliceId = blok._uid;
  const count = cart[sliceId] || 0;

  const handleAdd = () => {
    addToCart({
      id: sliceId,
      name: blok.name || "Slice",
      price: parseFloat(blok.price) || 0,
      toppings: blok.toppings || "pepperoni",
    });
  };

  return (
    <div
      {...storyblokEditable(blok)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 16, padding: 28,
        transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex", flexDirection: "column", minHeight: 380,
      }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4,
      }}>
        <span style={{
          fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>{blok.tag || ""}</span>
        {blok.spice_level > 0 && (
          <span style={{ fontSize: 11, color: "#ef4444" }}>
            {"●".repeat(blok.spice_level)}
          </span>
        )}
      </div>

      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "20px 0 16px",
        transform: hovered ? "rotate(-6deg) scale(1.05)" : "rotate(0) scale(1)",
        transition: "transform 0.5s cubic-bezier(.16,1,.3,1)",
      }}>
        <PizzaSVG toppings={blok.toppings || "pepperoni"} size={150} />
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
        {blok.name || "Slice name"}
      </h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
        {blok.description || ""}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
          €{parseFloat(blok.price || "0").toFixed(2)}
        </span>
        {count > 0 ? (
          <div style={{
            display: "flex", alignItems: "center",
            borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <button onClick={() => removeFromCart(sliceId)} style={{
              width: 36, height: 36, border: "none", background: "rgba(255,255,255,0.04)",
              color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
            }}>−</button>
            <span style={{
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 600, color: "#fff",
              background: "rgba(255,255,255,0.02)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}>{count}</span>
            <button onClick={handleAdd} style={{
              width: 36, height: 36, border: "none", background: "rgba(255,255,255,0.04)",
              color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "inherit",
            }}>+</button>
          </div>
        ) : (
          <button onClick={handleAdd} style={{
            padding: "9px 20px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "rgba(255,255,255,0.7)",
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit",
          }}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}
