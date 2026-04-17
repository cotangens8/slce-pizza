"use client";

export default function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid var(--line)", background: "rgba(0,0,0,0.7)" }}>
      <div className="wrap" style={{ padding: "56px 28px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="14" height="14" viewBox="0 0 10 10"><path d="M5 1 L9 9 L1 9 Z" fill="#fff" /></svg>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>slce/pizza</span>
            </div>
            <p className="mono" style={{ fontSize: 11, color: "var(--fg-muted)", lineHeight: 1.7, marginTop: 12, maxWidth: 260 }}>
              Pizza by the slice.<br />Serving Linz since 2024. Built on open crust.
            </p>
          </div>
          {[
            ["product", ["Slices", "Pricing", "Enterprise", "Changelog"]],
            ["company", ["About", "Careers", "Press", "Security"]],
            ["resources", ["Docs", "API", "Status", "Dough recipes"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>{title as string}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {(links as string[]).map(l => <li key={l}><a href="#" className="mono" style={{ fontSize: 12, color: "var(--fg-dim)" }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 22, borderTop: "1px solid var(--line)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>© 2026 SLCE GmbH · Content managed with Storyblok · Deployed on Vercel</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>region: eu-central-1 · build: 4.2.0-a9f3c</span>
        </div>
      </div>
    </footer>
  );
}
