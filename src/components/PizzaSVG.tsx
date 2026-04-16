"use client";

export default function PizzaSVG({ toppings = "pepperoni", size = 180 }: { toppings?: string; size?: number }) {
  const colors: Record<string, { base: string; accent: string; cheese: string }> = {
    pepperoni: { base: "#dc2626", accent: "#991b1b", cheese: "#fbbf24" },
    margherita: { base: "#16a34a", accent: "#166534", cheese: "#fde68a" },
    truffle: { base: "#78716c", accent: "#44403c", cheese: "#fef3c7" },
    diavola: { base: "#ea580c", accent: "#9a3412", cheese: "#fbbf24" },
    quattro: { base: "#2563eb", accent: "#1e40af", cheese: "#fde68a" },
    prosciutto: { base: "#e11d48", accent: "#9f1239", cheese: "#fef9c3" },
  };
  const c = colors[toppings] || colors.pepperoni;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <path d="M100 10 L185 170 A90 90 0 0 1 15 170 Z" fill="#f59e0b" opacity="0.9" />
      <path d="M100 10 L185 170 A90 90 0 0 1 15 170 Z" fill={c.cheese} opacity="0.7" />
      <path d="M100 22 L175 162 A80 80 0 0 1 25 162 Z" fill={c.cheese} opacity="0.5" />
      {toppings === "pepperoni" && (
        <>
          <circle cx="90" cy="80" r="12" fill={c.base} opacity="0.85" />
          <circle cx="90" cy="80" r="7" fill={c.accent} opacity="0.4" />
          <circle cx="130" cy="110" r="10" fill={c.base} opacity="0.85" />
          <circle cx="130" cy="110" r="6" fill={c.accent} opacity="0.4" />
          <circle cx="75" cy="130" r="11" fill={c.base} opacity="0.85" />
          <circle cx="75" cy="130" r="6" fill={c.accent} opacity="0.4" />
          <circle cx="115" cy="150" r="9" fill={c.base} opacity="0.85" />
          <circle cx="115" cy="150" r="5" fill={c.accent} opacity="0.4" />
          <circle cx="100" cy="55" r="8" fill={c.base} opacity="0.85" />
          <circle cx="100" cy="55" r="5" fill={c.accent} opacity="0.4" />
        </>
      )}
      {toppings === "margherita" && (
        <>
          <ellipse cx="95" cy="75" rx="14" ry="8" fill={c.base} opacity="0.7" transform="rotate(-15 95 75)" />
          <ellipse cx="130" cy="120" rx="12" ry="7" fill={c.base} opacity="0.7" transform="rotate(20 130 120)" />
          <ellipse cx="70" cy="130" rx="13" ry="7" fill={c.base} opacity="0.7" transform="rotate(-30 70 130)" />
          <circle cx="100" cy="100" r="6" fill="#fff" opacity="0.8" />
          <circle cx="85" cy="140" r="5" fill="#fff" opacity="0.8" />
          <circle cx="120" cy="80" r="5" fill="#fff" opacity="0.8" />
        </>
      )}
      {toppings === "truffle" && (
        <>
          <circle cx="95" cy="80" r="4" fill={c.base} opacity="0.6" />
          <circle cx="110" cy="95" r="3" fill={c.base} opacity="0.6" />
          <circle cx="80" cy="110" r="3.5" fill={c.base} opacity="0.6" />
          <circle cx="120" cy="130" r="3" fill={c.base} opacity="0.6" />
          <circle cx="100" cy="140" r="4" fill={c.base} opacity="0.6" />
          <circle cx="90" cy="60" r="3" fill={c.base} opacity="0.6" />
        </>
      )}
      {toppings === "diavola" && (
        <>
          <circle cx="90" cy="80" r="11" fill={c.base} opacity="0.85" />
          <circle cx="130" cy="115" r="9" fill={c.base} opacity="0.85" />
          <circle cx="75" cy="130" r="10" fill={c.base} opacity="0.85" />
          <circle cx="110" cy="150" r="8" fill={c.base} opacity="0.85" />
          <path d="M105 55 L108 48 L111 55" fill="#ef4444" opacity="0.9" />
          <path d="M85 105 L88 98 L91 105" fill="#ef4444" opacity="0.9" />
          <path d="M125 140 L128 133 L131 140" fill="#ef4444" opacity="0.9" />
        </>
      )}
      {toppings === "quattro" && (
        <>
          <path d="M100 30 L100 160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M40 110 L160 110" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="88" cy="70" r="8" fill="#dc2626" opacity="0.7" />
          <circle cx="120" cy="80" r="10" fill="#16a34a" opacity="0.6" />
          <circle cx="70" cy="130" r="7" fill="#78716c" opacity="0.7" />
          <circle cx="125" cy="135" r="6" fill="#f59e0b" opacity="0.8" />
          <circle cx="115" cy="145" r="8" fill="#f59e0b" opacity="0.6" />
        </>
      )}
      {toppings === "prosciutto" && (
        <>
          <path d="M80 70 Q100 60 110 80 Q95 90 80 70Z" fill={c.base} opacity="0.5" />
          <path d="M115 100 Q135 95 130 120 Q115 115 115 100Z" fill={c.base} opacity="0.5" />
          <path d="M65 120 Q85 115 80 140 Q65 135 65 120Z" fill={c.base} opacity="0.5" />
          <ellipse cx="100" cy="130" rx="10" ry="6" fill="#16a34a" opacity="0.5" transform="rotate(15 100 130)" />
        </>
      )}
      <path d="M100 10 L185 170 A90 90 0 0 1 15 170 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    </svg>
  );
}
