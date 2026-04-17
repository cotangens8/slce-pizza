import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Locations({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} id="status" style={{ position: "relative", padding: "100px 0 140px" }}>
      <div className="wrap">
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow">05 / status</div>
          <h2 style={{ margin: "10px 0 6px", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {blok.title || "System status."}
          </h2>
          <p className="mono" style={{ fontSize: 12, color: "var(--fg-muted)", margin: 0 }}>
            {blok.eyebrow || "All regions. Real-time."}
          </p>
        </div>

        <div style={{
          border: "1px solid var(--line)", borderRadius: 14,
          background: "rgba(10,12,16,0.72)", backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)", overflow: "hidden",
        }}>
          {blok.locations?.map((nestedBlok: any) => (
            <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
          <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>last 60 days · updated every 60s</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ color: "var(--ok)", background: "currentColor" }} /> up</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ color: "var(--warn)", background: "currentColor" }} /> degraded</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ color: "var(--err)", background: "currentColor" }} /> down</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
