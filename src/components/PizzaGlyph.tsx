"use client";

export default function PizzaGlyph({ variant = "basic", size = 120, rotating = false }: { variant?: string; size?: number; rotating?: boolean }) {
  const strokeBase = "rgba(255,255,255,0.85)";
  const strokeDim = "rgba(255,255,255,0.35)";
  const fill = "rgba(255,255,255,0.04)";
  const toppingFill = "rgba(255,255,255,0.78)";
  const toppingDim = "rgba(255,255,255,0.2)";

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{
      transition: "transform 600ms cubic-bezier(.16,1,.3,1)",
      transform: rotating ? "rotate(-8deg) scale(1.04)" : "rotate(0) scale(1)",
    }}>
      <path d="M100 12 L184 168 A92 92 0 0 1 16 168 Z" fill={fill} stroke={strokeDim} strokeWidth="1.2" />
      <path d="M100 26 L172 158 A80 80 0 0 1 28 158 Z" stroke={strokeDim} strokeDasharray="2 4" strokeWidth="1" />

      {variant === "basic" && (<>
        <circle cx="90" cy="82" r="9" fill={toppingFill} />
        <circle cx="126" cy="112" r="8" fill={toppingFill} />
        <circle cx="78" cy="132" r="9" fill={toppingFill} />
        <circle cx="112" cy="150" r="7" fill={toppingFill} />
        <circle cx="100" cy="58" r="6" fill={toppingFill} />
      </>)}
      {variant === "pro" && (<>
        <line x1="100" y1="28" x2="100" y2="160" stroke={strokeDim} strokeWidth="0.8" />
        <line x1="40" y1="112" x2="160" y2="112" stroke={strokeDim} strokeWidth="0.8" />
        <circle cx="85" cy="76" r="6" fill={toppingFill} />
        <circle cx="122" cy="84" r="7" fill={toppingFill} />
        <circle cx="78" cy="132" r="5" fill={toppingFill} />
        <circle cx="126" cy="140" r="6" fill={toppingFill} />
        <rect x="100" y="100" width="3" height="7" fill={toppingDim} transform="rotate(25 100 100)" />
        <rect x="90" y="120" width="3" height="7" fill={toppingDim} transform="rotate(-18 90 120)" />
        <rect x="115" y="110" width="3" height="7" fill={toppingDim} transform="rotate(40 115 110)" />
      </>)}
      {variant === "enterprise" && (<>
        <circle cx="100" cy="108" r="66" stroke={strokeBase} strokeDasharray="1 5" strokeWidth="0.8" />
        <circle cx="88" cy="78" r="7" fill={toppingFill} />
        <circle cx="124" cy="92" r="8" fill={toppingFill} />
        <circle cx="76" cy="120" r="6" fill={toppingFill} />
        <circle cx="118" cy="128" r="7" fill={toppingFill} />
        <circle cx="96" cy="150" r="6" fill={toppingFill} />
        <circle cx="102" cy="104" r="3" fill={strokeBase} />
      </>)}
    </svg>
  );
}
