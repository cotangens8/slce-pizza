"use client";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)", padding: "36px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
        SLCE — Content managed with Storyblok. Deployed on Vercel.
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {["Instagram", "Twitter"].map((s) => (
          <a key={s} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
