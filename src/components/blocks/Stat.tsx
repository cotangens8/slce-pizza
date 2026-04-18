import { storyblokEditable } from "@storyblok/react/rsc";

export default function Stat({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {blok.key || "metric"}
      </span>
      <span className="mono" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>
        {blok.value || "0"}
      </span>
      <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)" }}>
        {blok.subtitle || ""}
      </span>
    </div>
  );
}