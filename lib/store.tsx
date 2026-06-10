"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";

/* ─── Types ─── */
export interface CartItem { id: string; name: string; price: number; seed: number; qty: number; }
export interface WishItem { id: string; name: string; price: string; unit?: string; seed: number; qty: number; }

interface StoreValue {
  cart: CartItem[];
  wishlist: WishItem[];
  cartCount: number;
  wishCount: number;
  toast: string | null;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  addToWish: (item: Omit<WishItem, "qty">, qty?: number) => void;
  removeFromCart: (i: number) => void;
  removeFromWish: (i: number) => void;
}

const Ctx = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  };

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === item.id);
      if (i >= 0) { const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n; }
      return [...c, { ...item, qty }];
    });
    flash("In den Warenkorb gelegt ✓");
  }, []);

  const addToWish = useCallback((item: Omit<WishItem, "qty">, qty = 1) => {
    setWishlist((w) => {
      if (w.some((x) => x.id === item.id)) return w;
      return [...w, { ...item, qty }];
    });
    flash("Auf den Wunschzettel gesetzt ✓");
  }, []);

  const removeFromCart = useCallback((i: number) => setCart((c) => c.filter((_, idx) => idx !== i)), []);
  const removeFromWish = useCallback((i: number) => setWishlist((w) => w.filter((_, idx) => idx !== i)), []);

  return (
    <Ctx.Provider value={{
      cart, wishlist,
      cartCount: cart.reduce((s, x) => s + x.qty, 0),
      wishCount: wishlist.length,
      toast,
      addToCart, addToWish, removeFromCart, removeFromWish,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used within <StoreProvider>");
  return v;
}
