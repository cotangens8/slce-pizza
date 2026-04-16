import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Menu({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      id="menu"
      style={{ position: "relative", padding: "100px 24px 120px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div style={{ marginBottom: 56 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
          fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.03em", textTransform: "uppercase",
        }}>
          {blok.eyebrow || "Menu"}
        </span>
        <h2 style={{
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#fff",
          letterSpacing: "-0.04em", marginTop: 16, lineHeight: 1.05,
        }}>
          {blok.title || "Today's slices."}
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 12, maxWidth: 400 }}>
          {blok.description || "Six rotations. When they're gone, they're gone."}
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16,
      }}>
        {blok.slices?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}