import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "@/lib/storyblok";

export const metadata: Metadata = {
  title: "SLCE — Pizza by the slice",
  description: "Thin crust. Wood-fired. Six rotations daily.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        background: "#0a0a0a", color: "#fff", margin: 0, overflowX: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        <CartProvider>
          <Nav />
          {children}
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}