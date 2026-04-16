"use client";

import { useCart } from "./CartContext";
import PizzaSVG from "./PizzaSVG";

export default function CartDrawer() {
  const { cart, items, drawerOpen, setDrawerOpen } = useCart();
  const entries = Object.entries(cart);
  const total = entries.reduce((a, [id, qty]) => a + (items[id]?.price || 0) * qty, 0);

  return (
    <>
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
          opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 380, zIndex: 201,
        background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.08)",
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(.16,1,.3,1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Your order</span>
          <button onClick={() => setDrawerOpen(false)} style={{
            width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 16,
            cursor: "pointer", fontFamily: "inherit",
          }}>×</button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {entries.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60, color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
              No slices yet. Go grab some.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {entries.map(([id, qty]) => {
                const item = items[id];
                if (!item) return null;
                return (
                  <div key={id} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: 16, borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,255,255,0.02)",
                  }}>
                    <PizzaSVG toppings={item.toppings} size={48} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                        {qty} × €{item.price.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                      €{(item.price * qty).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {entries.length > 0 && (
          <div style={{ padding: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Total</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>€{total.toFixed(2)}</span>
            </div>
            <button style={{
              width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
              background: "#fff", color: "#000", fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              Checkout — €{total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
