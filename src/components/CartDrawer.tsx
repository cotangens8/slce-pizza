"use client";
import { useCart } from "./CartContext";
import PizzaGlyph from "./PizzaGlyph";

const qtyBtn: React.CSSProperties = {
  width: 32, height: 32, border: "none", background: "rgba(255,255,255,0.04)",
  color: "#fff", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 14,
};

export default function CartDrawer() {
  const { cart, items, addToCart, removeFromCart, drawerOpen, setDrawerOpen } = useCart();
  const entries = Object.entries(cart);
  const subtotal = entries.reduce((a, [id, qty]) => a + (items[id]?.price || 0) * qty, 0);
  const vat = subtotal * 0.19;
  const total = subtotal + vat;

  return (
    <>
      <div onClick={() => setDrawerOpen(false)} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
        opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none", transition: "opacity 240ms",
        backdropFilter: drawerOpen ? "blur(4px)" : "none",
      }} />
      <aside style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "92vw", zIndex: 201,
        background: "#07080a", borderLeft: "1px solid var(--line-strong)",
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 320ms cubic-bezier(.16,1,.3,1)",
        display: "flex", flexDirection: "column",
      }}>
        <header style={{
          padding: "16px 20px", borderBottom: "1px solid var(--line)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>cart.drawer</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Your order</div>
          </div>
          <button className="btn" style={{ padding: "6px 10px" }} onClick={() => setDrawerOpen(false)}>esc</button>
        </header>

        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {entries.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80, color: "var(--fg-muted)" }}>
              <div className="mono" style={{ fontSize: 12 }}>// cart is empty</div>
              <div className="mono" style={{ fontSize: 11, marginTop: 6 }}>add a slice to begin.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {entries.map(([id, qty]) => {
                const item = items[id]; if (!item) return null;
                return (
                  <div key={id} style={{
                    display: "flex", gap: 14, alignItems: "center",
                    padding: 14, border: "1px solid var(--line)", borderRadius: 10, background: "rgba(255,255,255,0.015)",
                  }}>
                    <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", border: "1px solid var(--line)", borderRadius: 8 }}>
                      <PizzaGlyph variant={item.variant} size={40} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{item.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", marginTop: 3 }}>{id} · v{item.version}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 7, overflow: "hidden" }}>
                        <button onClick={() => removeFromCart(id)} style={qtyBtn}>−</button>
                        <span className="mono" style={{ minWidth: 22, textAlign: "center", fontSize: 11 }}>{qty}</span>
                        <button onClick={() => addToCart(item)} style={qtyBtn}>+</button>
                      </div>
                      <span className="mono" style={{ width: 52, textAlign: "right", fontSize: 13, fontWeight: 600 }}>€{(item.price * qty).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {entries.length > 0 && (
          <footer style={{ padding: 20, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>subtotal</span>
              <span className="mono" style={{ fontSize: 12 }}>€{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>tax (19% VAT)</span>
              <span className="mono" style={{ fontSize: 12 }}>€{vat.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--fg-dim)" }}>total</span>
              <span className="mono" style={{ fontSize: 22, fontWeight: 600 }}>€{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 16px" }}>
              $ slce checkout &nbsp;<span style={{ opacity: 0.5 }}>↵</span>
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
