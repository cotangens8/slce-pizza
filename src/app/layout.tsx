import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import PlasmaBackground from "@/components/PlasmaBackground";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "@/lib/storyblok";

export const metadata: Metadata = {
  title: "SLCE 4.2 — Enterprise-grade slice infrastructure",
  description: "99.97% crust uptime. SOC 2 Type II dough. Ship slices, not excuses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --bg: #000;
            --fg: #f4f5f7;
            --fg-dim: #9ba1ab;
            --fg-muted: #5c6370;
            --fg-faint: #2a2e36;
            --line: rgba(255,255,255,0.08);
            --line-strong: rgba(255,255,255,0.14);
            --surface: rgba(12,14,18,0.72);
            --surface-solid: #0a0b0d;
            --accent: oklch(0.72 0.09 240);
            --ok: oklch(0.78 0.15 155);
            --warn: oklch(0.82 0.14 80);
            --err: oklch(0.70 0.20 25);
            --sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            --mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            background: var(--bg); color: var(--fg);
            font-family: var(--sans); font-feature-settings: "ss01", "cv11";
            -webkit-font-smoothing: antialiased; overflow-x: hidden; min-height: 100vh;
          }
          a { color: inherit; text-decoration: none; }
          button { font-family: inherit; }
          .mono { font-family: var(--mono); font-feature-settings: "ss02"; }
          .dot {
            width: 6px; height: 6px; border-radius: 999px; display: inline-block;
            box-shadow: 0 0 0 3px color-mix(in oklab, currentColor 22%, transparent);
          }
          .wrap { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
          .chip {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 4px 10px 4px 8px; border-radius: 999px;
            border: 1px solid var(--line); background: rgba(255,255,255,0.02);
            font-family: var(--mono); font-size: 11px; color: var(--fg-dim); letter-spacing: 0.02em;
          }
          .btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 16px; border-radius: 8px;
            font-family: var(--mono); font-size: 12px; font-weight: 500;
            letter-spacing: 0.02em; cursor: pointer;
            border: 1px solid var(--line-strong); background: rgba(255,255,255,0.02); color: var(--fg);
            transition: all 180ms cubic-bezier(.2,.8,.2,1);
          }
          .btn:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.22); }
          .btn-primary { background: #fff; color: #000; border-color: #fff; }
          .btn-primary:hover { background: #e9ebef; }
          .eyebrow {
            font-family: var(--mono); font-size: 11px; font-weight: 500;
            color: var(--fg-muted); letter-spacing: 0.08em; text-transform: uppercase;
          }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-track { animation: marquee 60s linear infinite; }
          ::-webkit-scrollbar { width: 0; height: 0; }
          @media (max-width: 900px) {
            .cols-3 { grid-template-columns: 1fr !important; }
          }
        `}} />
      </head>
      <body>
        <CartProvider>
          <PlasmaBackground />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Nav />
            {children}
            <CartDrawer />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
