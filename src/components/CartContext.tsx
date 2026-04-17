"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id: string; name: string; price: number; variant: string; version: string };
type CartContextType = {
  cart: Record<string, number>;
  items: Record<string, CartItem>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Record<string, CartItem>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(c => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }));
    setItems(i => ({ ...i, [item.id]: item }));
  };
  const removeFromCart = (id: string) => {
    setCart(c => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  };

  return (
    <CartContext.Provider value={{ cart, items, addToCart, removeFromCart, drawerOpen, setDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
